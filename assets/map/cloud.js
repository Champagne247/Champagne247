const MAP_URL = "https://xmwqixegyourwhusuhjb.supabase.co";
const MAP_KEY = "sb_publishable_9fMQiHsBWGFZcmQhKeJLdQ_PmBORNrJ"; // Public publishable key; RLS protects user data.
if (!window.supabase?.createClient) throw new Error("Supabase client failed to load.");
const client = window.supabase.createClient(MAP_URL, MAP_KEY);
window.mapCloud = { client };

async function currentUser() {
  const { data, error } = await client.auth.getUser();
  if (error) throw error;
  return data.user;
}
function notice(node, message, error = false) {
  node.textContent = message;
  node.style.color = error ? "#ff8d8d" : "#55e29d";
}
async function cloudMapId(user) {
  const { data, error } = await client.from("maps").select("id,map_state")
    .eq("user_id", user.id).order("created_at", { ascending: true }).limit(1);
  if (error) throw error;
  return data[0] || null;
}
const createKeys = ["map_nova_vision", "map_missions", "map_mvp"];
function localCreateState() {
  const result = {};
  for (const key of createKeys) {
    const raw = localStorage.getItem(key);
    if (raw !== null) {
      try { result[key] = JSON.parse(raw); }
      catch { throw new Error("Local data for " + key + " is invalid. Nothing was uploaded."); }
    }
  }
  return result;
}
async function saveCreate(user) {
  const state = localCreateState();
  if (!Object.keys(state).length) throw new Error("There is no local M.A.P. to save yet.");
  const existing = await cloudMapId(user);
  const vision = state.map_nova_vision?.vision || "";
  const title = state.map_mvp?.name || "My M.A.P.";
  const payload = { user_id: user.id, title, vision, map_state: state, updated_at: new Date().toISOString() };
  const query = existing
    ? client.from("maps").update(payload).eq("id", existing.id).eq("user_id", user.id)
    : client.from("maps").insert(payload);
  const { error } = await query;
  if (error) throw error;
}
async function loadCreate(user) {
  const row = await cloudMapId(user);
  if (!row) throw new Error("This account has no saved M.A.P. yet.");
  const state = row.map_state || {};
  for (const key of createKeys) {
    if (Object.hasOwn(state, key)) localStorage.setItem(key, JSON.stringify(state[key]));
    else localStorage.removeItem(key);
  }
  location.reload();
}
async function saveDraft(user) {
  const raw = localStorage.getItem("mapMasterLifeDraft");
  if (!raw) throw new Error("Save a local draft first.");
  let state;
  try { state = JSON.parse(raw); }
  catch { throw new Error("Local draft is invalid. Nothing was uploaded."); }
  const { error } = await client.from("profiles").upsert({
    user_id: user.id, draft_state: state
  }, { onConflict: "user_id" });
  if (error) throw error;
}
async function loadDraft(user) {
  const { data, error } = await client.from("profiles").select("draft_state")
    .eq("user_id", user.id).maybeSingle();
  if (error) throw error;
  if (!data || !Object.keys(data.draft_state || {}).length)
    throw new Error("This account has no saved draft.");
  localStorage.setItem("mapMasterLifeDraft", JSON.stringify(data.draft_state));
  location.reload();
}
async function mountCloudPanel() {
  if (!/\/(create|manage)\/$/.test(location.pathname)) return;
  const mode = location.pathname.includes("/manage/") ? "draft" : "map";
  const panel = document.createElement("section");
  panel.id = "mapCloudPanel";
  panel.style.cssText = "position:relative;z-index:1001;margin:16px auto;padding:18px;max-width:760px;background:#081a29;color:#fff;border:1px solid #3777a0;border-radius:16px;font:15px Arial,sans-serif";
  panel.innerHTML = '<strong>☁ My private M.A.P.</strong><p id="mapCloudWho">Checking account…</p><div style="display:flex;flex-wrap:wrap;gap:8px"><a href="../account/" style="padding:12px;border:1px solid #58c3ff;border-radius:10px;color:#fff">Account</a><button type="button" id="mapCloudSave" style="padding:12px;border:1px solid #58c3ff;border-radius:10px;background:#126898;color:#fff">Save to account</button><button type="button" id="mapCloudLoad" style="padding:12px;border:1px solid #58c3ff;border-radius:10px;background:#0d2639;color:#fff">Load from account</button></div><p id="mapCloudStatus" role="status" aria-live="polite"></p>';
  document.body.prepend(panel);
  const who = panel.querySelector("#mapCloudWho");
  const status = panel.querySelector("#mapCloudStatus");
  try {
    const user = await currentUser();
    who.textContent = user ? "Signed in as " + user.email : "Create or sign in to an account to sync across devices.";
  } catch (e) { who.textContent = e.message; }
  for (const [id, operation] of [
    ["mapCloudSave", mode === "draft" ? saveDraft : saveCreate],
    ["mapCloudLoad", mode === "draft" ? loadDraft : loadCreate]
  ]) {
    panel.querySelector("#" + id).onclick = async event => {
      const button = event.currentTarget;
      button.disabled = true;
      try {
        const user = await currentUser();
        if (!user) throw new Error("Sign in from the Account page first.");
        if (id === "mapCloudLoad" &&
            !confirm("Replace this device's local " + mode + " with the saved account version?")) return;
        notice(status, id === "mapCloudSave" ? "Saving…" : "Loading…");
        await operation(user);
        notice(status, "Saved privately to your account.");
      } catch (e) { notice(status, e.message, true); }
      finally { button.disabled = false; }
    };
  }
}
if (document.readyState === "loading")
  document.addEventListener("DOMContentLoaded", mountCloudPanel);
else mountCloudPanel();

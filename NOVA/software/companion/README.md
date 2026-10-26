# NOVA Hybrid Companion — first working software foundation

This is a **prototype**, not a physical robot controller. It is a local-first, model-agnostic chat CLI with:
- Local Ollama chat by default; optional cloud OpenAI API on explicit `/cloud` command
- Persistent **local-only** SQLite conversation history across restarts
- No third-party Python packages needed; Python 3.12+ standard library
- No autonomous commands, motors, camera, microphone, or hardware permissions

## Windows quick start

1. Install Ollama from https://ollama.com/download/windows
2. In a new PowerShell terminal: `ollama pull llama3.2:1b`
3. In VS Code, open the repository and run:

```powershell
cd NOVA\software\companion
python main.py
```

If Ollama is not running, launch it from the Start menu. Type `/status` to inspect the mode. Type `/exit` to quit.

## Optional cloud mode (may incur API charges)

The ChatGPT subscription is separate from OpenAI API billing. Obtain an API key from the OpenAI API platform only if you choose cloud mode. **Never paste the key into GitHub, a screenshot, or a chat.**

Set the key in the current PowerShell session (enter it privately at the prompt):

```powershell
$env:OPENAI_API_KEY = Read-Host "OpenAI API key"
python main.py
```

Type `/cloud` to select cloud requests, or `/local` to switch back. The last 20 messages are included in model requests; **when cloud mode is enabled, this includes locally stored conversation history**, so don't use cloud mode for private conversations you do not want sent to the API.

## Data, privacy, and safety

- Conversation data is stored on **your PC only** in `data/nova.sqlite3`. This directory is Git-ignored.
- To reset memory, exit the program and delete the SQLite file (back up first if desired).
- Avoid cloning into an existing nonempty `C:\nova` folder until you back up its working `main.py`.
- This is a first prototype: no automatic cloud fallback, no authentication on local Ollama, no semantic memory, and no robot actuation.
- Never expose Ollama's local port to the public internet.

## Why this structure?

`main.py` holds the interface and provider adapter. The persona and local database are independent of the model, so future voice, vision, robot modules, and BUDDY/PIP can be developed separately. Next: extract providers into modules, add tests and configuration, and introduce explicit permissions for tools.

## NOVA Family knowledge (GitHub-managed)

The versioned `NOVA_FAMILY.md` is loaded automatically into the system context on **every** model request. It describes NOVA, MILO, ZIGGY, the shared docking architecture, current working software, and design-vs-built boundaries. To refresh your Windows checkout while NOVA is not running:

```powershell
cd C:\nova-repo
 git status
 git pull --ff-only origin nova/hybrid-core-starter
cd NOVA\software\companion
python main.py
```

If `git status` reports local changes, stop and review before pulling. The local `data/nova.sqlite3` conversation database is not committed to GitHub and is not reset by this update. Ask NOVA what it knows about MILO and ZIGGY to test knowledge loading. This is static project context, not yet semantic memory.

## Offline regression tests

From `NOVA/software/companion`, run `python -m unittest discover -s . -p "test_*.py" -v`. These checks cover current character names, project knowledge injection, SQLite history persistence, and local/cloud request safeguards. They do not require Ollama, an API key, or network access. They must pass on the user's PC before treating this milestone as verified.

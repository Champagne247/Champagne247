"""NOVA Forever Build: local-first companion CLI (Python standard library only)."""
from __future__ import annotations

import json
import os
import sqlite3
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

BASE = Path(__file__).resolve().parent
DB_PATH = Path(os.environ.get("NOVA_DB_PATH", str(BASE / "data" / "nova.sqlite3")))
OLLAMA_URL = os.environ.get("OLLAMA_URL", "http://127.0.0.1:11434")
OLLAMA_MODEL = os.environ.get("OLLAMA_MODEL", "llama3.2:1b")
CLOUD_MODEL = os.environ.get("OPENAI_MODEL", "gpt-4.1-mini")
SYSTEM = (
    "You are NOVA, the warm, practical companion of the NOVA Forever Build. "
    "You are model-agnostic and may later inhabit modular robot hardware. "
    "Be honest about capabilities. Never claim to operate hardware or access "
    "private information unless a verified tool actually does so."
)


def initialize() -> sqlite3.Connection:
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    connection = sqlite3.connect(DB_PATH)
    connection.execute(
        "CREATE TABLE IF NOT EXISTS messages ("
        "id INTEGER PRIMARY KEY, created_at TEXT NOT NULL, "
        "role TEXT NOT NULL CHECK(role IN ('user','assistant')), content TEXT NOT NULL)"
    )
    connection.commit()
    return connection


def history(connection: sqlite3.Connection, limit: int = 20) -> list[dict[str, str]]:
    rows = connection.execute(
        "SELECT role, content FROM (SELECT id, role, content FROM messages "
        "ORDER BY id DESC LIMIT ?) ORDER BY id", (limit,)
    ).fetchall()
    return [{"role": "system", "content": SYSTEM}] + [
        {"role": role, "content": content} for role, content in rows
    ]


def save(connection: sqlite3.Connection, role: str, content: str) -> None:
    connection.execute(
        "INSERT INTO messages(created_at,role,content) VALUES(?,?,?)",
        (datetime.now(timezone.utc).isoformat(), role, content),
    )
    connection.commit()


def post_json(url: str, payload: dict, headers: dict | None = None) -> dict:
    request = urllib.request.Request(
        url, data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json", **(headers or {})},
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=120) as response:
        return json.load(response)


def respond(messages: list[dict[str, str]], provider: str) -> str:
    if provider == "local":
        result = post_json(
            OLLAMA_URL.rstrip("/") + "/api/chat",
            {"model": OLLAMA_MODEL, "messages": messages, "stream": False},
        )
        return result["message"]["content"]
    if provider == "cloud":
        key = os.environ.get("OPENAI_API_KEY")
        if not key:
            raise RuntimeError("OPENAI_API_KEY is not set. Stay on /local until configured.")
        result = post_json(
            "https://api.openai.com/v1/chat/completions",
            {"model": CLOUD_MODEL, "messages": messages},
            {"Authorization": f"Bearer {key}"},
        )
        return result["choices"][0]["message"]["content"]
    raise ValueError("Unknown provider")


def main() -> None:
    connection = initialize()
    provider = "local"
    print("NOVA • FOREVER BUILD | Local-first companion")
    print("Commands: /local, /cloud, /status, /exit")
    print("Conversation saved ONLY in your local SQLite database.")
    try:
        while True:
            try:
                message = input("\nYou: ").strip()
            except (EOFError, KeyboardInterrupt):
                print("\nNOVA: See you soon.")
                break
            if not message:
                continue
            command = message.lower()
            if command in ("/exit", "exit", "quit"):
                break
            if command in ("/local", "/cloud"):
                provider = command[1:]
                print(f"NOVA: Mode selected: {provider}")
                continue
            if command == "/status":
                print(f"NOVA: Mode={provider}; local model={OLLAMA_MODEL}; database={DB_PATH}")
                continue
            messages = history(connection) + [{"role": "user", "content": message}]
            try:
                answer = respond(messages, provider)
            except (urllib.error.URLError, TimeoutError, KeyError, ValueError, RuntimeError) as error:
                print(f"NOVA: Model request failed: {error}")
                print("Check Ollama is running and the model is downloaded, or switch /local.")
                continue
            save(connection, "user", message)
            save(connection, "assistant", answer)
            print("\nNOVA:", answer)
    finally:
        connection.close()


if __name__ == "__main__":
    main()

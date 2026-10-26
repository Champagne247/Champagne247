"""Offline regression tests: python -m unittest discover -s . -p 'test_*.py' -v"""
import os
import sqlite3
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import main


class CompanionTests(unittest.TestCase):
    def test_current_family_names_and_roles(self):
        knowledge = main.load_project_knowledge()
        for name in ("NOVA", "MILO", "ZIGGY"):
            self.assertIn(name, knowledge)
        self.assertIn("explorer", knowledge.lower())
        self.assertIn("helper", knowledge.lower())
        self.assertIn("inventive maker", knowledge.lower())

    def test_history_loads_current_knowledge_before_old_chat(self):
        with sqlite3.connect(":memory:") as connection:
            connection.execute(
                "CREATE TABLE messages (id INTEGER PRIMARY KEY, created_at TEXT, "
                "role TEXT, content TEXT)"
            )
            connection.execute(
                "INSERT INTO messages (created_at, role, content) VALUES (?, ?, ?)",
                ("2026-01-01", "user", "An old conversation with an outdated name"),
            )
            messages = main.history(connection)
        self.assertEqual(messages[0]["role"], "system")
        self.assertIn("MILO", messages[0]["content"])
        self.assertIn("ZIGGY", messages[0]["content"])
        self.assertEqual(messages[1]["role"], "user")

    def test_local_save_and_reload(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "memory.sqlite3"
            with patch.object(main, "DB_PATH", path):
                connection = main.initialize()
                main.save(connection, "user", "Remember the HOME dock")
                main.save(connection, "assistant", "The HOME dock is planned")
                connection.close()
                reopened = main.initialize()
                messages = main.history(reopened)
                reopened.close()
            self.assertEqual(messages[-2]["content"], "Remember the HOME dock")
            self.assertEqual(messages[-1]["content"], "The HOME dock is planned")
            self.assertTrue(path.exists())

    def test_cloud_requires_explicit_key(self):
        with patch.dict(os.environ, {"OPENAI_API_KEY": ""}):
            with self.assertRaisesRegex(RuntimeError, "OPENAI_API_KEY"):
                main.respond([], "cloud")

    def test_local_model_payload(self):
        with patch.object(main, "post_json", return_value={"message": {"content": "Hi"}}) as post:
            self.assertEqual(main.respond([{"role": "user", "content": "Hi"}], "local"), "Hi")
        self.assertTrue(post.call_args.args[0].endswith("/api/chat"))
        self.assertFalse(post.call_args.args[1]["stream"])


if __name__ == "__main__":
    unittest.main()

import interpreter
import json
import os
import sqlite3

HISTORY_FILE = "open-interpreter/chat_history.json"
DB_FILE = "open-interpreter/chat_memory.db"

# SQLite für stabilen Langzeit-Speicher
conn = sqlite3.connect(DB_FILE)
cursor = conn.cursor()
cursor.execute('''
    CREATE TABLE IF NOT EXISTS chat (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        role TEXT,
        message TEXT
    )
''')
conn.commit()

def save_message(role, message):
    cursor.execute("INSERT INTO chat (role, message) VALUES (?, ?)", (role, message))
    conn.commit()

def load_history():
    cursor.execute("SELECT role, message FROM chat ORDER BY id ASC")
    return "\n".join([f"{row[0]}: {row[1]}" for row in cursor.fetchall()])

def chat_with_interpreter(message):
    history = load_history() + f"\nUser: {message}"
    response = interpreter.chat(history)
    save_message("User", message)
    save_message("AI", response)
    return response

if __name__ == "__main__":
    while True:
        user_input = input("Du: ")
        if user_input.lower() in ["exit", "quit"]:
            break
        print("AI:", chat_with_interpreter(user_input))

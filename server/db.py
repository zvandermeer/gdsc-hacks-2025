import json
import sqlite3

class DB:
    def __init__(self, filename: str):
        createTable = """
                    CREATE TABLE IF NOT EXISTS USERS (
                    uuid            TEXT PRIMARY KEY,
                    subscription    TEXT NOT NULL
                    );
                    """

        self.conn = sqlite3.connect(filename, check_same_thread=False)
        cursor = self.conn.cursor()
        cursor.execute(createTable)
        self.conn.commit()

    def new_user(self, uuid: str, subscription: dict):
        insertUser = "INSERT INTO USERS VALUES(?, ?)"

        cursor = self.conn.cursor()
        try:
            cursor.execute(insertUser, (uuid, json.dumps(subscription)))
            self.conn.commit()
        except sqlite3.IntegrityError:
            pass

    def get_subscription(self, uuid: str) -> dict:
        getUser = "SELECT * FROM USERS WHERE uuid=?"

        cursor = self.conn.cursor()
        cursor.execute(getUser, (uuid,))
        return json.loads(cursor.fetchone()[1])
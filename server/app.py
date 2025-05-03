from urllib.parse import urlparse
from flask import Flask, request, jsonify
from flask_cors import CORS
from pywebpush import webpush, WebPushException
from apscheduler.schedulers.background import BackgroundScheduler
import json
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

app = Flask(__name__)
# CORS(app, resources={r"/subscribe": {"origins": "http://localhost:5173"}})
CORS(app)

# Store subscriptions in-memory (use a DB in production)
subscriptions = []

load_dotenv()

VAPID_PUBLIC_KEY = os.getenv("VAPID_PUBLIC")
VAPID_PRIVATE_KEY = os.getenv("VAPID_PRIVATE")

# Scheduler
scheduler = BackgroundScheduler()
scheduler.start()

def send_push(subscription_info, data):
    endpoint = subscription_info['endpoint']
    audience = f"{urlparse(endpoint).scheme}://{urlparse(endpoint).netloc}"
    
    vapid_claims = {
        "sub": "mailto:your@email.com",
        "aud": audience
    }

    try:
        webpush(
            subscription_info,
            data=json.dumps(data),
            vapid_private_key=VAPID_PRIVATE_KEY,
            vapid_claims=vapid_claims
        )
        print("Notification sent.")
    except WebPushException as ex:
        print("Failed to send notification:", ex)

@app.route("/subscribe", methods=["POST"])
def subscribe():
    subscription = request.get_json()
    subscriptions.append(subscription)
    return jsonify({"status": "subscribed"}), 201

@app.route("/schedule", methods=["POST"])
def schedule_push():
    content = request.get_json()
    delay = content.get("delay", 10)  # in seconds
    data = {
        "title": content.get("title", "Hello!"),
        "body": content.get("body", "This is a scheduled push.")
    }

    run_time = datetime.now() + timedelta(seconds=delay)
    for sub in subscriptions:
        scheduler.add_job(send_push, 'date', run_date=run_time, args=[sub, data])

    print("Scheduled:" + run_time.isoformat())

    return jsonify({"status": "scheduled", "run_at": run_time.isoformat()}), 200

if __name__ == "__main__":
    app.run(port=5151)

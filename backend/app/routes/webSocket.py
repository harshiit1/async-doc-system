from fastapi import APIRouter, WebSocket
import redis
import asyncio
import json

router = APIRouter()

redis_client = redis.Redis(host="localhost", port=6379, db=0)

@router.websocket("/websocket")
async def websocket_application_endpoint(websocket:WebSocket):
    await websocket.accept()

    pubsub = redis_client.pubsub()
    pubsub.subscribe("job_updates")

    try:
        while True:
            message = pubsub.get_message(ignore_subscribe_messages=True)
            if message and message["type"] == "message":
                data = message["data"].decode("utf-8")
                await websocket.send_json(json.loads(data)) 
            await asyncio.sleep(0.1) 

    except Exception as e: 
        print("websocket error", e)
    finally:
        pubsub.close()
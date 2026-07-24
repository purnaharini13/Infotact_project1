from kafka import KafkaProducer
import json
import time
from sensor import generate_sensor_data

producer = KafkaProducer(
    bootstrap_servers='localhost:9092',
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

while True:
    data = generate_sensor_data()
    producer.send("sensor-data", value=data)
    print("Sent:", data)
    time.sleep(5) 
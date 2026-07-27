from kafka import KafkaConsumer
import snowflake.connector
import json
import os
from dotenv import load_dotenv

# ----------------------------
# Load Environment Variables
# ----------------------------
load_dotenv()
# ----------------------------
# Snowflake Connection
# ----------------------------
conn = snowflake.connector.connect(
    user="HARSHITHA",
    password="Nayakaharshitha@1",
    account="WPCUUVA-AH54929",
    warehouse="COMPUTE_WH",
    database="IOT_DB",
    schema="PUBLIC",
    role="ACCOUNTADMIN"
)

cursor = conn.cursor()

# ----------------------------
# Kafka Consumer
# ----------------------------
consumer = KafkaConsumer(
    "sensor-data",
    bootstrap_servers="localhost:9092",
    auto_offset_reset="latest",
    value_deserializer=lambda x: json.loads(x.decode("utf-8"))
)

print("✅ Listening for Kafka messages...\n")

try:
    for message in consumer:
        try:
            data = message.value

            print("📩 Received:", data)

            sensor_id = data.get("sensor_id")
            temperature = data.get("temperature")
            humidity = data.get("humidity")
            pressure = data.get("pressure")
            air_quality = data.get("air_quality")
            timestamp = data.get("timestamp")

            if None in (
                sensor_id,
                temperature,
                humidity,
                pressure,
                air_quality,
                timestamp,
            ):
                print("❌ Missing required fields in message!")
                print("Received:", data)
                continue

            cursor.execute("""
                INSERT INTO SENSOR_DATA
                (SENSOR_ID, TEMPERATURE, HUMIDITY, PRESSURE, AIR_QUALITY, TIMESTAMP)
                VALUES (%s, %s, %s, %s, %s, %s)
            """, (
                sensor_id,
                temperature,
                humidity,
                pressure,
                air_quality,
                timestamp
            ))

            conn.commit()

            print(f"✅ Inserted Sensor ID: {sensor_id}")

        except Exception as e:
            print("❌ Error processing message:", e)

except KeyboardInterrupt:
    print("\n🛑 Consumer stopped.")

finally:
    cursor.close()
    conn.close()
    consumer.close()
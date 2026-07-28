import os
from dotenv import load_dotenv
import snowflake.connector
from datetime import datetime
import random

# Load environment variables
load_dotenv()

try:
    # Connect to Snowflake
    conn = snowflake.connector.connect(
        user=os.getenv("SNOWFLAKE_USER"),
        password=os.getenv("SNOWFLAKE_PASSWORD"),
        account=os.getenv("SNOWFLAKE_ACCOUNT"),
        warehouse=os.getenv("SNOWFLAKE_WAREHOUSE"),
        database=os.getenv("SNOWFLAKE_DATABASE"),
        schema=os.getenv("SNOWFLAKE_SCHEMA"),
        role=os.getenv("SNOWFLAKE_ROLE")
    )

    cursor = conn.cursor()

    # Insert 20 sensor records
    for i in range(1, 21):
        sensor_id = f"SENSOR_{i:03}"
        temperature = round(random.uniform(20, 35), 2)
        humidity = round(random.uniform(40, 80), 2)
        pressure = round(random.uniform(1000, 1025), 2)
        air_quality = round(random.uniform(10, 100), 2)
        timestamp = datetime.now()

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

    print("✅ 20 Sensor Records Inserted Successfully!\n")

    cursor.execute("""
        SELECT *
        FROM SENSOR_DATA
        ORDER BY TIMESTAMP DESC
    """)

    rows = cursor.fetchall()

    print("📊 Sensor Data:\n")

    for row in rows:
        print(row)

except Exception as e:
    print("❌ Error:", e)

finally:
    try:
        cursor.close()
        conn.close()
        print("🔒 Connection Closed.")
    except:
        pass
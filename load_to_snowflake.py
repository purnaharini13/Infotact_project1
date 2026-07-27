import os
from dotenv import load_dotenv
import snowflake.connector
from datetime import datetime

# Load environment variables
load_dotenv()

try:
    # Connect to Snowflake
    conn = snowflake.connector.connect(
        user="HARSHITHA",
        password="Nayakaharshitha@1",
        account="WPCUUVA-AH54929",
        warehouse="COMPUTE_WH",
        database="IOT_DB",
        schema="PUBLIC",
        role="ACCOUNTADMIN"
)

    print("✅ Connected Successfully!")


    cursor = conn.cursor()

    # Sample sensor data
    sensor_id = "SENSOR_001"
    temperature = 28.5
    humidity = 65.2
    pressure = 1013.4
    air_quality = 45.6
    timestamp = datetime.now()

    # Insert data into the table
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
    print("✅ Data inserted successfully!\n")

    # Fetch all records
    cursor.execute("""
        SELECT SENSOR_ID, TEMPERATURE, HUMIDITY, PRESSURE,
               AIR_QUALITY, TIMESTAMP
        FROM SENSOR_DATA
        ORDER BY TIMESTAMP DESC
    """)

    rows = cursor.fetchall()

    print("📋 Sensor Data:")
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
from fastapi import FastAPI
import snowflake.connector
from dotenv import load_dotenv
import os

# Load .env file
load_dotenv()

app = FastAPI()

conn = snowflake.connector.connect(
    user=os.getenv("SNOWFLAKE_USER"),
    password=os.getenv("SNOWFLAKE_PASSWORD"),
    account=os.getenv("SNOWFLAKE_ACCOUNT"),
    warehouse=os.getenv("SNOWFLAKE_WAREHOUSE"),
    database=os.getenv("SNOWFLAKE_DATABASE"),
    schema=os.getenv("SNOWFLAKE_SCHEMA"),
    role=os.getenv("SNOWFLAKE_ROLE")
)

@app.get("/sensor-data")
def get_sensor_data():
    cursor = conn.cursor()
    cursor.execute("""
        SELECT SENSOR_ID, TEMPERATURE, HUMIDITY,
               PRESSURE, AIR_QUALITY, TIMESTAMP
        FROM SENSOR_DATA
        ORDER BY TIMESTAMP DESC
        LIMIT 20
    """)

    rows = cursor.fetchall()

    data = [
        {
            "sensor_id": row[0],
            "temperature": row[1],
            "humidity": row[2],
            "pressure": row[3],
            "air_quality": row[4],
            "timestamp": str(row[5])
        }
        for row in rows
    ]

    cursor.close()
    return data
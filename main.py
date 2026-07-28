#from fastapi import FastAPI
#import snowflake.connector
#from dotenv import load_dotenv
#import os

# Load .env file
#load_dotenv()

#app = FastAPI()

git add main.py
git commit -m "Initial FastAPI backend setup"

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


@app.get("/kpi")
def get_kpis():
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            ROUND(AVG(TEMPERATURE), 2),
            ROUND(AVG(HUMIDITY), 2),
            ROUND(AVG(PRESSURE), 2),
            ROUND(AVG(AIR_QUALITY), 2),
            COUNT(*)
        FROM SENSOR_DATA
    """)

    row = cursor.fetchone()
    cursor.close()

    return {
        "average_temperature": row[0],
        "average_humidity": row[1],
        "average_pressure": row[2],
        "average_air_quality": row[3],
        "total_records": row[4]
    }


@app.get("/alerts")
def get_alerts():
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            SENSOR_ID,
            TEMPERATURE,
            HUMIDITY,
            PRESSURE,
            AIR_QUALITY,
            TIMESTAMP
        FROM SENSOR_DATA
        WHERE TEMPERATURE > 35
           OR HUMIDITY > 80
           OR AIR_QUALITY > 150
        ORDER BY TIMESTAMP DESC
    """)

    rows = cursor.fetchall()
    cursor.close()

    alerts = []

    for row in rows:
        alerts.append({
            "sensor_id": row[0],
            "temperature": row[1],
            "humidity": row[2],
            "pressure": row[3],
            "air_quality": row[4],
            "timestamp": str(row[5])
        })

    return alerts
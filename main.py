from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import snowflake.connector

app = FastAPI(
    title="IoT Backend API",
    version="1.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Snowflake Connection
conn = snowflake.connector.connect(
    user="HARSHITHA",
    password="Nayakaharshitha@1",
    account="WPCUUVA-AH54929",
    warehouse="COMPUTE_WH",
    database="IOT_DB",
    schema="PUBLIC",
    role="ACCOUNTADMIN"
)

@app.get("/")
def home():
    return {"message": "IoT Backend Running Successfully"}

@app.get("/sensor-data")
def get_sensor_data():
    
    cursor = conn.cursor()

    cursor.execute("""
        SELECT SENSOR_ID,
               TEMPERATURE,
               HUMIDITY,
               PRESSURE,
               AIR_QUALITY,
               TIMESTAMP
        FROM SENSOR_DATA
        ORDER BY TIMESTAMP DESC
        LIMIT 20
    """)

    rows = cursor.fetchall()

    data = []

    for row in rows:
        data.append({
            "sensor_id": row[0],
            "temperature": row[1],
            "humidity": row[2],
            "pressure": row[3],
            "air_quality": row[4],
            "timestamp": str(row[5])
        })

    cursor.close()
    return data

@app.get("/kpi")
def get_kpi():

    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            AVG(TEMPERATURE),
            AVG(HUMIDITY),
            AVG(PRESSURE),
            AVG(AIR_QUALITY),
            COUNT(*)
        FROM SENSOR_DATA
    """)

    row = cursor.fetchone()

    cursor.close()

    return {
        "average_temperature": round(row[0], 2),
        "average_humidity": round(row[1], 2),
        "average_pressure": round(row[2], 2),
        "average_air_quality": round(row[3], 2),
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
        WHERE TEMPERATURE > 30
           OR HUMIDITY > 70
           OR AIR_QUALITY > 80
        ORDER BY TIMESTAMP DESC
    """)

    rows = cursor.fetchall()

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

    cursor.close()

    return alerts

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
        WHERE TEMPERATURE > 30
           OR HUMIDITY > 70
           OR AIR_QUALITY > 80
        ORDER BY TIMESTAMP DESC
    """)

    rows = cursor.fetchall()

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

    cursor.close()

    return alerts
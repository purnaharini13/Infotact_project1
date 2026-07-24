import random 
import datetime
import json
import time 

def generate_sensor_data():
    temperature = round(random.uniform(20, 40), 2)
    humidity = random.randint(30, 90)
    pressure = random.randint(980, 1030)
    air_quality = random.randint(0, 500)

    sensor_data = {
    "sensor_id": "S001",
    "temperature": temperature,
    "humidity": humidity,
    "pressure": pressure,
    "air_quality": air_quality,
    "timestamp": datetime.datetime.now().isoformat()
}
    return sensor_data

if __name__ == "__main__":
    while True:
        data = generate_sensor_data()
        print(json.dumps(data, indent=4))
        print("-" * 40)
        time.sleep(5) 
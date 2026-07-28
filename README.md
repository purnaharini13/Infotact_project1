# 🌍 AtmoSync – Real-Time IoT Environmental Monitoring System

## 📌 Project Overview

AtmoSync is a Real-Time IoT Environmental Monitoring System designed to collect, process, analyze, and visualize environmental sensor data.

The system simulates IoT sensor readings, processes the data through FastAPI APIs, performs KPI calculations, and presents live insights through an interactive React dashboard.

---

## 🚀 Features

### IoT Data Simulation

- Simulates multiple environmental sensors
- Generates Temperature, Humidity, Pressure, and Air Quality data
- Timestamp-based sensor readings

### Backend (FastAPI)

- REST APIs for sensor data
- KPI API
- Alert API
- Real-time data integration

### Analytics

- Temperature Trend Chart
- Humidity Trend Chart
- Pressure Trend Chart
- Air Quality Trend Chart

### Dashboard

- KPI Cards
- Today's Summary
- Live Sensor Table
- Search by Sensor ID
- Refresh Button
- Alert Panel
- Loading Screen
- Error Handling

---

# 🛠 Tech Stack

## Frontend

- React.js
- Axios
- Recharts
- CSS3

## Backend

- FastAPI
- Python

## Database

- Snowflake

## Data Transformation

- SQL
- dbt

## Messaging

- Apache Kafka

---

# 📂 Project Structure

```
AtmoSync
│
├── frontend/
│   ├── React
│   ├── Components
│   ├── Charts
│   └── Dashboard
│
├── backend/
│   ├── FastAPI
│   ├── APIs
│   └── KPI Services
│
├── database/
│   ├── Snowflake
│   ├── SQL
│   └── dbt
│
└── iot-simulator/
    ├── Kafka Producer
    └── Sensor Simulation
```

---

# 📊 Dashboard Modules

- Dashboard Overview
- KPI Cards
- Analytics Dashboard
- Sensor Monitoring
- Alert Management

---

# ⚙ Installation

### Clone Repository

```bash
git clone https://github.com/<username>/<repository>.git
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

---

# API Endpoints

| Endpoint       | Description             |
| -------------- | ----------------------- |
| `/sensor-data` | Returns sensor readings |
| `/kpi`         | Returns dashboard KPIs  |
| `/alerts`      | Returns active alerts   |

---

# Team Members

| Member                | Responsibility                                                        |
| --------------------- | --------------------------------------------------------------------- |
| Member 1              | IoT Sensor Simulation & Kafka                                         |
| Member 2              | Snowflake, SQL & dbt                                                  |
| Member 3              | FastAPI Backend & APIs                                                |
| **Member 4 (Yasmin)** | React Dashboard, Analytics Charts, Sensor Table, Search, Refresh & UI |

---

# Future Enhancements

- User Authentication
- Email Alerts
- Real-time WebSocket Updates
- Export Reports (CSV/PDF)
- Mobile Dashboard

---

# License

This project was developed for academic purposes as part of an IoT Environmental Monitoring System.

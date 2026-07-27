import snowflake.connector

conn = snowflake.connector.connect(
    user="HARSHITHA",
    password="Nayakaharshitha@1",
    account="WPCUUVA-AH54929",
    warehouse="COMPUTE_WH",
    database="IOT_DB",
    schema="PUBLIC",
    role="ACCOUNTADMIN"
)

print("✅ Connected to Snowflake Successfully!")

conn.close()
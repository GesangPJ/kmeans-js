# Dummy Data Generator

# (c)2023 GESANG TECHNOLOGY

# Var :
# Tanggaljam ; suhu ; pH ; kelembaban
# Sortir berdasarkan tanggal terbaru

import random
import csv
import pandas as pd
from datetime import datetime, timedelta

# Function to generate a random datetime within a given range
def random_datetime(start_date, end_date):
    return start_date + timedelta(
        seconds=random.randint(0, int((end_date - start_date).total_seconds()))
    )

# Function to generate random data based on your criteria
def generate_data():
    tanggaljam = random_datetime(datetime(2023, 1, 1), datetime(2023, 12, 31))
    suhu = random.randint(15, 35)
    pH = random.randint(0, 14)
    kelembaban = random.randint(30, 80)
    kondisi = random.randint(1, 3)

    return tanggaljam, suhu, pH, kelembaban, kondisi

# Generate data
data = []
for _ in range(50):  # You can change the number of rows as needed
    data.append(generate_data())

# Create a pandas DataFrame from the generated data
df = pd.DataFrame(data, columns=["tanggaljam", "suhu", "pH", "kelembaban", "kondisi"])

# Sort the DataFrame by the "tanggaljam" column from newest to oldest
# To sort from oldest to newest, replace "ascending=False" with "ascending=True"
df = df.sort_values(by="tanggaljam", ascending=False)

# Save the DataFrame to a CSV file
df.to_csv("data/dummy_data.csv", index=False)

print("Dummy data has been generated and saved to dummy_data.csv.")


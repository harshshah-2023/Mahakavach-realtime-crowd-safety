import csv
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data" / "harbour_line"


print("DATA_DIR =", DATA_DIR)
print("Exists:", DATA_DIR.exists())
print("Files:", list(DATA_DIR.glob("*")))

def open_csv(path):
    return csv.DictReader(
        open(path, "r", encoding="utf-8-sig", newline=""),
        delimiter=","
    )



def load_station_master():
    stations = {}
    reader = open_csv(DATA_DIR / "station_master.csv")

    if "station" not in reader.fieldnames:
        raise ValueError(f"'station' column not found: {reader.fieldnames}")

    for row in reader:
        stations[row["station"].strip()] = row

    return stations


def load_station_aliases():
    aliases = {}
    reader = open_csv(DATA_DIR / "station_alias_map.csv")

    if "raw" not in reader.fieldnames or "canonical" not in reader.fieldnames:
        raise ValueError(f"Expected ['raw','canonical'], found {reader.fieldnames}")

    for row in reader:
        aliases[row["raw"].strip()] = row["canonical"].strip()

    return aliases

    

def load_train_master():
    trains = {}
    reader = open_csv(DATA_DIR / "train_master.csv")

    possible_keys = ["train_id", "train_no", "train_number"]
    train_key = next((k for k in possible_keys if k in reader.fieldnames), None)

    if not train_key:
        raise ValueError(f"No train id column found: {reader.fieldnames}")

    for row in reader:
        trains[row[train_key]] = row

    return trains


def load_train_schedule():
    schedule = []
    reader = open_csv(DATA_DIR / "train_schedule.csv")

    for row in reader:
        schedule.append(row)

    return schedule

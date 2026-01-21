from sqlalchemy import Column, String, Text, BigInteger
from app.database import Base

class Station(Base):
    __tablename__ = "stations"
    station = Column(Text, primary_key=True)

class StationAlias(Base):
    __tablename__ = "station_aliases"
    alias = Column(Text, primary_key=True)
    station_code = Column(Text)

class Train(Base):
    __tablename__ = "trains"
    train_no = Column(Text, primary_key=True)
    train_name = Column(Text)

class TrainSchedule(Base):
    __tablename__ = "train_schedule"
    id = Column(BigInteger, primary_key=True)
    train_no = Column(Text)
    station = Column(Text)
    time_raw = Column(Text)

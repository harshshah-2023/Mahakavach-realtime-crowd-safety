# MahaKavach – Real-Time City-Scale Crowd Platform for Mumbai Suburban Railways      

MahaKavach is a real-time crowd and safety intelligence platform designed for high-density public transport systems.  
It uses computer vision, real-time streaming, and AI-assisted reporting to provide live crowd visibility, safety risk signals, and emergency workflows.

The project focuses on **end-to-end system design** rather than UI polish, simulating how large-scale safety systems operate in real-world conditions.

---

## Problem

High-density transport systems operate without:
- Real-time coach-level crowd visibility
- Predictive indicators for safety risks
- Instant, structured emergency reporting

Crowd conditions change every minute, but safety systems react too late.

---

## Solution

MahaKavach treats crowd movement as a **live data stream** and converts it into actionable safety intelligence using real-time pipelines and AI models.

---

## Core Features

- **Live Crowd Density Monitoring**  
  Computer vision-based people counting with coach-level density estimation.

- **Real-Time Dashboard**  
  WebSocket-powered dashboard showing live crowd heatmaps and train metadata.

- **Women’s Safety Risk Scoring**  
  Rule-based risk indicators using time, crowd density, and historical patterns.

- **Panic & Emergency Alerts**  
  One-tap panic flow with train, coach, and location context.

- **AI Voice Complaint System (Prototype)**  
  Converts short voice inputs into structured incident reports.

- **Offline-First Design**  
  Supports limited functionality during low or no connectivity.

---

## Architecture Overview

Video Input / Dataset
↓
YOLO Crowd Detection
↓
Density Aggregation
↓
FastAPI WebSocket Server
↓
React Real-Time Dashboard


Each layer is decoupled to reflect production-style system design.

---

## Tech Stack

**Frontend**
- React + Vite
- Tailwind CSS
- MapLibre GL
- Progressive Web App (PWA)

**Backend**
- FastAPI (Python)
- Native WebSockets

**ML / AI**
- YOLO-based people detection
- Crowd density estimation
- Whisper + LLM (prototype)

**Data**
- PostgreSQL (Supabase – free tier)
- In-memory real-time state

---

Getting Started

1️ Clone the Repository
git clone https://github.com/your-username/mahakavach.git
cd mahakavach

2️ Frontend Setup
cd frontend
npm install
npm run dev

3️ Backend Setup
cd backend
npm install
npm start

 Environment Variables
Backend
DATABASE_URL=postgresql://user:password@host:port/db
PORT=8000

Frontend
VITE_API_BASE_URL=https://mahakavach-backend.onrender.com
VITE_WS_URL=wss://mahakavach-backend.onrender.com/ws/crowd

⚠️ Known Limitations

Real-time accuracy depends on data freshness
Cold-start latency on free hosting tiers
Crowd classification currently rule-based (ML-ready design)
 Engineering Highlights

Event-driven WebSocket architecture
Stateless frontend with live state hydration
Performance-first UX decisions
Clean separation of concerns
Scalable, city-level system design

---

 Planned Enhancements

Machine learning-based crowd prediction
IoT / camera-based crowd inputs
Authority dashboards
Offline-first mobile experience
Multi-city support

## Project Status

🚧 **MVP in active development**

Current focus:
- Real-time WebSocket pipeline
- Live crowd heatmap rendering
- End-to-end data flow validation

---

## Purpose

This project was built to:
- Demonstrate real-time system design
- Combine AI with streaming architectures
- Simulate safety-critical data pipelines
- Serve as a high-quality engineering portfolio project

---
## Author 
Harsh Shah

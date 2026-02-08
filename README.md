## MahaKavach – Real-Time City-Scale Crowd Platform for Mumbai Suburban Railways      

MahaKavach is a real-time crowd and safety intelligence platform designed for high-density public transport systems.  
It uses computer vision, real-time streaming, and AI-assisted reporting to provide live crowd visibility, safety risk signals, and emergency workflows.

The project focuses on **end-to-end system design** rather than UI polish, simulating how large-scale safety systems operate in real-world conditions.

**LIVE**
```
https://www.mahakavach.in
```

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

- **Station Crowd Intelligence**

1. Image-driven crowd density analysis using computer vision–based people detection (no live video streaming).
2.  Real-time station congestion classification using traffic-style severity indicators:
Green → Low congestion
Yellow → Moderate congestion
Red → High congestion / saturation risk
3. Crowd state is continuously refreshed and pushed via WebSocket streams, enabling near real-time visibility across clients.
4. Designed to function as a decision-support signal rather than raw data visualization.
   
- **Real-Time Dashboard**  
  WebSocket-powered dashboard showing live crowd heatmaps and train metadata.

- **Incoming Train Crowd Visibility**

1. Provides pre-arrival crowd estimates for approaching trains at a given station.
2. Enables commuters to make informed boarding decisions before train arrival, reducing last-minute congestion.
3. Crowd signals are derived from aggregated station context and historical arrival patterns.
4. System architecture is coach-level extensible, allowing future expansion without core redesign.

- **Community Chat (Line-wise Communication Layer)**

1. Real-time, line-segmented communication channels for:
-Western Line
-Central Line
-Harbour Line
2. Acts as a distributed human-sensor network, complementing automated crowd signals.
Supports sharing of:
-Live crowd conditions
-Delays and service disruptions
-Platform or routing changes
-Safety-related observations
3. Designed as a human-in-the-loop feedback system to improve situational awareness in dynamic environments.

- **Safety & Risk Indicators**

1. Rule-based safety scoring engine combining:
-Temporal factors (time of day)
-Real-time crowd intensity
-Station and line context
2. Produces lightweight risk signals, not alerts, to avoid notification fatigue.
3. Architecture is ML-ready, enabling seamless transition to predictive risk models as data maturity improves.
4. Designed for integration into authority dashboards and incident workflows.

---

## Architecture Overview
```

Image Input / Dataset
↓
YOLO Crowd Detection
↓
Density Aggregation
↓
FastAPI WebSocket Server
↓
React Real-Time Dashboard
```


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
```
git clone https://github.com/your-username/mahakavach.git
cd mahakavach
```
2️ Frontend Setup
```
cd frontend
npm install
npm run dev
```

3️ Backend Setup
```
cd backend
npm install
npm start
```

 Environment Variables
 ```
Backend
DATABASE_URL=postgresql://user:password@host:port/db
PORT=8000

Frontend
VITE_API_BASE_URL=https://mahakavach-backend.onrender.com
VITE_WS_URL=wss://mahakavach-backend.onrender.com/ws/crowd
```

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
<img width="1801" height="885" alt="Screenshot 2026-02-07 220851" src="https://github.com/user-attachments/assets/632b90d2-4d0c-4c86-8a5c-46535c59ef02" />

## Author 
Harsh Shah

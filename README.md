🛡️ MahaKavach
Real-Time Crowd & Safety Intelligence Platform

What if public transport could see danger before it happens?

MahaKavach is an experimental, real-time safety intelligence system built for extreme crowd density environments like the Mumbai Suburban Railway.
It transforms live crowd movement into actionable safety signals — before incidents escalate.

This project is not a mobile app.
It is a distributed real-time system combining computer vision, streaming, and AI-driven decision logic.

🚨 The Problem

Mumbai local trains carry ~80 lakh passengers daily — yet:

No real-time visibility into coach or platform crowding

No predictive signals for women’s safety risk

Emergency response depends on delayed, manual reporting

Crowds are dynamic. Safety systems are static.
That gap costs time — and sometimes lives.

💡 The Idea

MahaKavach treats crowd density as a live data stream, not a static statistic.

Instead of asking “what happened?”, it asks:

Where is crowd pressure building right now?

Which coach is safest to board?

Which situations require immediate intervention?

⚙️ What MahaKavach Does

Live Crowd Intelligence
Computer vision detects people count and density at coach level and streams updates every few seconds.

Real-Time Safety Dashboard
An interactive map visualizes trains, stations, and crowd heatmaps using low-latency WebSockets.

Women’s Safety Risk Scoring
A rule-based + data-driven risk score estimates safety levels based on time, density, and historical patterns.

Panic & Emergency Flow
One-tap panic actions broadcast train, coach, and location metadata instantly.

AI Voice Complaints (Prototype)
Short voice inputs are converted into structured incident reports using speech-to-text and LLMs.

Offline-First Design
The system continues to function inside tunnels using cached state and background sync.

🧠 System Philosophy

Event-driven, not request-driven

Streaming over polling

Real-time > perfect accuracy

Prototype realism over mock demos

This project prioritizes architecture clarity and scalability thinking over cosmetic features.

🏗️ High-Level Architecture
Video Feed / Dataset
        ↓
YOLO-based Crowd Detection
        ↓
Crowd Density Aggregation
        ↓
FastAPI WebSocket Server
        ↓
React Real-Time Dashboard (PWA)


Each layer is intentionally decoupled to reflect production-grade system design.

🧰 Tech Stack

Frontend

React + Vite

Tailwind CSS

MapLibre GL

PWA (offline-first)

Backend

FastAPI (async)

Native WebSockets

ML / AI

YOLO-based people detection

Density estimation logic

Whisper + LLM (prototype)

Data

PostgreSQL (Supabase – free tier)

In-memory streaming state

Dev

GitHub-based monorepo

CI/CD ready structure

🚧 Project Status

MVP under active development

Current focus:

Real-time WebSocket pipeline

Live crowd heatmap rendering

End-to-end data flow correctness

This is a working system, not a UI mock.

🎯 Why This Project Exists

MahaKavach was built to:

Explore real-time system design at scale

Combine AI with streaming architectures

Simulate safety-critical decision pipelines

Demonstrate engineering depth beyond CRUD apps

It is designed as a learning + portfolio system, not a commercial product.

👨‍💻 Author

Built with an engineering-first mindset — focusing on clarity, trade-offs, and execution.

If you’re reviewing this repo as an interviewer:
Feel free to dive into the architecture, not just the UI.

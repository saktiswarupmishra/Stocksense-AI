# 🧠 StockSense AI

**AI-Powered Stock Market Analysis & Portfolio Management Platform**

[![CI Pipeline](https://github.com/your-org/stocksense-ai/actions/workflows/ci.yml/badge.svg)](https://github.com/your-org/stocksense-ai/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

![Next.js](https://img.shields.io/badge/Next.js_14-black?logo=next.js)
![Spring Boot](https://img.shields.io/badge/Spring_Boot_3-6DB33F?logo=spring-boot&logoColor=white)
![Python](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?logo=kubernetes&logoColor=white)

---

## 📋 Overview

StockSense AI is a production-ready platform combining real-time market data, AI/ML models, and modern portfolio management into a unified experience. It features 12 integrated modules powered by LSTM, Transformer, and NLP models.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Next.js 14)                 │
│              TypeScript • Tailwind CSS • Redux           │
│              Recharts • TradingView • WebSocket          │
├─────────────────────────────────────────────────────────┤
│                         Nginx / Ingress                  │
├──────────────────┬────────────────┬──────────────────────┤
│  Backend (Java)  │  AI Service    │  Message Queue       │
│  Spring Boot 3   │  FastAPI       │  Apache Kafka        │
│  Spring Security │  TensorFlow    │                      │
│  Spring Data     │  PyTorch       │                      │
│  WebFlux         │  Transformers  │                      │
├──────────────────┴────────────────┴──────────────────────┤
│  MongoDB     │  Redis      │  Weaviate     │  Prometheus  │
│  (Database)  │  (Cache)    │  (Vector DB)  │  (Metrics)   │
└──────────────┴─────────────┴───────────────┴──────────────┘
```

## 🚀 Modules

| # | Module | Description |
|---|--------|-------------|
| 1 | **Authentication** | JWT + Google OAuth2 login/register |
| 2 | **Stock Dashboard** | Real-time prices, interactive charts, search |
| 3 | **Portfolio Management** | Holdings, transactions, P&L tracking |
| 4 | **Watchlists & Alerts** | Custom lists with price alert notifications |
| 5 | **AI Pattern Detection** | CNN-based candlestick pattern recognition |
| 6 | **Insider Trading** | SEC Form 4 insider transaction tracker |
| 7 | **Mutual Fund Analyzer** | Fund comparison, returns, ratings |
| 8 | **IPO Engine** | AI-scored upcoming IPO recommendations |
| 9 | **AI Chatbot (RAG)** | Vector-search powered financial Q&A |
| 10 | **Portfolio Rebalancing** | MPT-based AI allocation optimization |
| 11 | **Voice Assistant** | Speech-to-text stock queries |
| 12 | **Stock Predictions** | LSTM & Transformer price forecasting |

## 🛠️ Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for frontend dev)
- Java 21+ (for backend dev)
- Python 3.11+ (for AI service dev)

### One-Command Launch (Docker)
```bash
cd infra/docker
docker-compose up --build
```

Services will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **AI Service**: http://localhost:8000
- **Prometheus**: http://localhost:9090
- **Grafana**: http://localhost:3001 (admin/admin)

### Development Mode

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Backend:**
```bash
cd backend
mvn spring-boot:run
```

**AI Service:**
```bash
cd ai-service
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## 📁 Project Structure

```
stocksense-ai/
├── frontend/          # Next.js 14 + TypeScript + Tailwind CSS
│   ├── src/app/       # App Router pages (12 modules)
│   ├── src/components/# Reusable UI components
│   ├── src/store/     # Redux Toolkit state management
│   └── src/lib/       # API client, utilities
├── backend/           # Spring Boot 3 + Java 21
│   └── src/main/java/com/stocksense/
│       ├── controller/# REST & WebSocket endpoints
│       ├── service/   # Business logic
│       ├── model/     # MongoDB documents
│       ├── security/  # JWT + OAuth2
│       └── config/    # Security, WebSocket, Kafka
├── ai-service/        # Python FastAPI + ML models
│   └── app/
│       ├── api/       # Prediction, pattern, chat endpoints
│       ├── models/    # LSTM, Transformer, RAG, Pattern detector
│       └── core/      # Configuration
├── infra/
│   ├── docker/        # docker-compose.yml
│   ├── k8s/           # Kubernetes manifests
│   └── monitoring/    # Prometheus + Grafana
└── .github/workflows/ # CI/CD pipelines
```

## 🔒 Security

- **JWT Authentication** with access + refresh tokens
- **Google OAuth2** social login
- **BCrypt** password hashing
- **Rate Limiting** (100 req/min per user via Bucket4j)
- **CORS** configured for frontend origin
- **Method-level** security with `@PreAuthorize`
- **Input Validation** on all endpoints

## 📊 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/login` | JWT login |
| POST | `/api/auth/google` | Google OAuth |
| GET | `/api/auth/me` | Current user info |

### Stocks & Portfolio
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/stocks/search?q=` | Search stocks |
| GET | `/api/stocks/{symbol}` | Stock details |
| GET | `/api/stocks/{symbol}/history` | Historical prices |
| GET/POST | `/api/portfolio` | CRUD portfolios |
| POST | `/api/portfolio/transaction` | Buy/sell |

### AI Service
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/predict/{symbol}` | LSTM/Transformer prediction |
| POST | `/api/patterns/detect` | Candlestick patterns |
| POST | `/api/chat` | RAG chatbot |
| POST | `/api/rebalance` | Portfolio optimization |
| POST | `/api/sentiment` | News sentiment |

## 🧪 Testing

```bash
# Backend (JUnit 5 + Mockito)
cd backend && mvn test

# AI Service (pytest)
cd ai-service && pytest tests/ -v

# Frontend (Jest + React Testing Library)
cd frontend && npm test
```

## ☁️ Deployment (AWS EKS)

```bash
# Apply Kubernetes manifests
kubectl apply -f infra/k8s/namespace.yml
kubectl apply -f infra/k8s/ingress.yml
kubectl apply -f infra/k8s/backend-deployment.yml
kubectl apply -f infra/k8s/frontend-deployment.yml
kubectl apply -f infra/k8s/ai-service-deployment.yml
```

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/stocksense` |
| `REDIS_HOST` | Redis host | `localhost` |
| `JWT_SECRET` | JWT signing secret | (required) |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | (optional) |
| `AI_SERVICE_URL` | AI service URL | `http://localhost:8000` |
| `KAFKA_SERVERS` | Kafka bootstrap servers | `localhost:9092` |

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

**Built with ❤️ by StockSense AI Team**

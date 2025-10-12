# 📊 Family Heights Tracker

A full‑stack web application to record, visualize, and track the growth of family members over time.  
The project provides a clean dashboard with interactive charts, a secure form for entering new height data, and a backend API connected to Supabase for persistent storage.

---

## 🌐 Live Demo

👉 [View the app here](https://fam-height.netlify.app/)

---

## ✨ Features

- **Interactive Dashboard**  
  - Line chart of height history for each family member  
  - Toggle visibility of individual lines with a custom checkbox legend  
  - Smooth animations and responsive layout  

- **Data Entry Form**  
  - Record today’s height for one or more family members  
  - Shows the **latest recorded height** per person for quick reference  
  - PIN verification step before submission  

- **Backend API**  
  - Express server with REST endpoints (`/heights`)  
  - Supabase database integration for secure storage  
  - CORS enabled for frontend → backend communication  

- **Deployment**  
  - Frontend hosted on **Netlify**  
  - Backend hosted on **Render**  
  - Environment variables used for API URLs and Supabase credentials  

---

## 🛠️ Tech Stack

### Frontend
- **React + TypeScript**
- **Vite** (build tool)
- **TailwindCSS** (styling)
- **Recharts** (interactive charts)
- **Netlify** (deployment)

### Backend
- **Node.js + Express**
- **TypeScript**
- **Supabase** (Postgres + auth)
- **Render** (deployment)
- **dotenv** for environment variables
- **CORS** middleware

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js (>= 18)
- npm or yarn
- Supabase project (with a `heights` table)

### Clone the repo
```bash
git clone https://github.com/yourusername/family-heights.git
cd family-heights

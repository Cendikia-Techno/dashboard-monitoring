# 🚢 QA Digital Platform (QDP) V2 Blueprint

## Project Information

**Project Name**
QA Digital Platform (QDP)

**Version**
v2.0.0-dev

**Development Branch**
dashboard-v2

**Platform**
Web Application

**Purpose**
Digitalisasi monitoring aktivitas Quality Assurance pada proyek pembangunan kapal PT PAL Indonesia.

---

# Vision

Membangun platform monitoring QA yang modern, modular, cepat, mudah dikembangkan, dan mampu menampilkan kondisi proyek secara real-time dalam satu dashboard terintegrasi.

---

# Main Architecture

QA Digital Platform
│
├── Login (Disable sementara)
│
├── Dashboard
│
│ ├── Landing Dock Project #1
│ │ ├── Summary (Executive Dashboard)
│ │ ├── ITP
│ │ ├── Quality Plan
│ │ ├── Summary Inspection
│ │ ├── Launching
│ │ ├── Monitoring Material
│ │ ├── TPTR
│ │ └── HAT/SAT
│ │
│ ├── Landing Dock Project #2
│ ├── FMP #1
│ ├── FMP #2
│ └── Project berikutnya
│
└── Settings

---

# Dashboard Structure

Setiap dashboard memiliki struktur yang sama.

Hero
↓

KPI

↓

Chart / Progress

↓

Filter

↓

Data Table

---

# Executive Dashboard

Summary merupakan Command Center.

Summary hanya menampilkan:

- Overall Project Progress
- KPI Semua Modul
- Progress Seluruh Dashboard
- Need Attention
- Recent Activity
- Last Update

Summary tidak menampilkan tabel data lengkap.

---

# Dashboard Modules

1. Summary

Executive Dashboard seluruh project.

2. ITP

Monitoring Inspection Test Plan.

3. Quality Plan

Monitoring Quality Plan.

4. Summary Inspection

Monitoring hasil inspeksi.

5. Launching

Monitoring kesiapan launching.

6. Monitoring Material

Monitoring kesiapan material.

7. TPTR

Monitoring dokumen TPTR.

8. HAT/SAT

Monitoring kesiapan HAT/SAT sebelum delivery.

---

# Folder Structure

v2/

assets/
components/
modules/
docs/

---

# Component Architecture

Dashboard Layout

↓

Hero

↓

KPI Card

↓

Section Card

↓

Chart

↓

Table

Semua dashboard menggunakan component yang sama.

---

# Data Flow

Google Sheet

↓

Apps Script API

↓

api.js

↓

dashboardData.js

↓

Project State

↓

Dashboard Module

↓

Component

---

# Development Rules

- Semua dashboard menggunakan Dashboard Layout.
- Tidak membuat HTML panjang secara langsung.
- Semua UI menggunakan Component.
- Data tidak boleh langsung diambil oleh Component.
- Semua parsing data dilakukan pada dashboardData.js.
- Semua project menggunakan Project State.
- Routing menggunakan Router.

---

# Design Principles

QDP V2 dikembangkan berdasarkan prinsip berikut:

1. Simple
Antarmuka sederhana dan mudah dipahami.

2. Consistent
Semua dashboard memiliki pola tampilan yang sama.

3. Modular
Setiap fitur dipisahkan menjadi component.

4. Scalable
Mudah menambahkan project atau dashboard baru.

5. Reusable
Component dapat digunakan kembali pada semua dashboard.

6. Responsive
Mendukung desktop dan perangkat mobile.

7. Maintainable
Kode mudah dibaca, dirawat, dan dikembangkan.

# Git Workflow

dashboard-v2

↓

Coding

↓

Live Server Test

↓

Console Clean

↓

Commit

↓

Push Origin

---

# Development Roadmap

Sprint 7.1
- Clean Architecture

Sprint 7.2
- Executive Summary Dashboard

Sprint 8
- ITP Dashboard

Sprint 9
- Quality Plan Dashboard

Sprint 10
- Summary Inspection Dashboard

Sprint 11
- Monitoring Material Dashboard

Sprint 12
- TPTR Dashboard

Sprint 13
- HAT/SAT Dashboard

Sprint 14
- Notification Center

Sprint 15
- Authentication (Optional)

---

# Future Features

- Login Authentication
- Dark Mode
- Notification Center
- User Management
- Multi Project
- Multi Role
- Export PDF
- Export Excel
- Dashboard Analytics
- Mobile Responsive
- PWA Support

---

# Status

Blueprint Approved

Tanggal Persetujuan:
18 Juli 2026

Status:
Development
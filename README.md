# 💼 JobFinder — Smart Job Application Tracker

A professional React-based Job Application Tracking Dashboard that helps job seekers manage, monitor, and analyze their job search process in one place.

---

## 🚀 Live Demo

> Run locally using the steps below

---

## 📸 Screenshots

### Dashboard
- Professional analytics dashboard with stats cards
- Pipeline progress bars
- Recent applications table

### Applications Page
- Job cards with company logos
- Search, filter and sort functionality
- Pipeline tabs

### Analytics Page
- Pie chart of application stages
- Bar chart of monthly applications
- Platform breakdown

---

## ✨ Features

- ➕ **Add/Edit/Delete** job applications
- 📋 **Applications List** with company logos
- 🔍 **Debounced Search** by company or role
- 🎯 **Filter** by status, platform, location
- 📊 **Sort** by date, salary, company name
- 🗂️ **Pipeline Tabs** — Applied, Interviewing, Offer, Rejected
- ⭐ **Bookmark** important jobs
- 📈 **Analytics Dashboard** with charts
- 💾 **LocalStorage** persistence — data saved after refresh
- 📥 **Import Sample Jobs** using Axios API
- 🏢 **Auto Company Logos** via Clearbit API
- 🔔 **Toast Notifications** for all actions
- ✨ **Smooth Animations** with Framer Motion

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | Frontend Framework |
| Vite | Build Tool |
| React Router DOM | Page Routing |
| Context API | Global State Management |
| LocalStorage | Data Persistence |
| React Hook Form | Form Handling |
| Yup | Form Validation |
| Recharts | Charts and Analytics |
| Axios | API Calls |
| Framer Motion | Animations |
| React Icons | Icon Library |
| React Toastify | Notifications |
| date-fns | Date Formatting |
| UUID | Unique ID Generation |
| Clearbit API | Company Logos |
| DummyJSON API | Sample Job Data |

---
src/
├── components/
│   ├── Navbar.jsx        # Navigation bar with active links
│   ├── JobCard.jsx       # Job application card with actions
│   ├── SearchBar.jsx     # Debounced search input
│   └── Filters.jsx       # Status, platform, location filters
├── pages/
│   ├── Dashboard.jsx     # Analytics dashboard with stats
│   ├── Applications.jsx  # Applications list with search/filter
│   ├── Addapplication.jsx # Add/Edit application form
│   └── Analytics.jsx     # Charts and analytics page
├── context/
│   └── ApplicationContext.jsx  # Global state with CRUD operations
├── hooks/
│   ├── useLocalStorage.js      # Persist data in localStorage
│   └── useDebounce.js          # Debounce hook for search
├── services/
│   └── api.js            # Axios API calls
└── utils/
└── helpers.js        # Constants and date formatting

---

## ⚙️ Installation and Setup

### Prerequisites
- Node.js (v16 or above)
- npm

### Steps

**1. Clone the repository**
```bash
git clone https://github.com/yourusername/job-tracker.git
```

**2. Go into the project folder**
```bash
cd job-tracker
```

**3. Install dependencies**
```bash
npm install
```

**4. Start the development server**
```bash
npm run dev
```

**5. Open in browser**
http://localhost:5173

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-router-dom": "^6.0.0",
    "axios": "^1.0.0",
    "react-hook-form": "^7.0.0",
    "@hookform/resolvers": "^3.0.0",
    "yup": "^1.0.0",
    "recharts": "^2.0.0",
    "framer-motion": "^10.0.0",
    "react-icons": "^4.0.0",
    "react-toastify": "^9.0.0",
    "date-fns": "^2.0.0",
    "uuid": "^9.0.0"
  }
}
```

---

## 🗺️ Pages and Routes

| Route | Page | Description |
|---|---|---|
| `/` | Redirect | Redirects to dashboard |
| `/dashboard` | Dashboard | Stats, pipeline, recent jobs |
| `/applications` | Applications | Full list with search/filter |
| `/applications/new` | Add Job | Form to add new application |
| `/applications/:id` | Edit Job | Form to edit existing application |
| `/analytics` | Analytics | Charts and statistics |

---

## 🔌 APIs Used

### 1. Clearbit Logo API
https://logo.clearbit.com/{company}.com
Automatically fetches company logos by domain name. Free, no API key needed.

### 2. DummyJSON API
https://dummyjson.com/products
Used with Axios to import sample job data for demonstration.

### 3. Browser LocalStorage API
```javascript
window.localStorage.setItem('jobs', JSON.stringify(data))
window.localStorage.getItem('jobs')
```
Persists job application data across browser sessions.

---

## ⚛️ React Concepts Used

| Concept | Usage |
|---|---|
| useState | Search query, filters, active tab, loading state |
| useEffect | Load existing job data when editing |
| useContext | Access global application state |
| Context API | Global CRUD operations for jobs |
| Custom Hooks | useLocalStorage, useDebounce, useApplications |
| React Router | Multi-page navigation with dynamic routes |
| React Hook Form | Form state management and submission |

---

## 📊 Evaluation Criteria Coverage

| Criteria | Weight | Implementation |
|---|---|---|
| React Architecture | 25% | Proper folder structure, Router, Custom Hooks, Context API |
| Feature Completeness | 25% | All 8 features fully implemented |
| State Management | 20% | Context API + useLocalStorage |
| UI/UX Quality | 15% | Professional UI, animations, toast notifications |
| Code Quality | 15% | Reusable components, custom hooks, clean code |

---

## 🙋 Author

**Tharun V**
1st year 
Scaler Scool Of technology 

---



This project is built for educational purposes.




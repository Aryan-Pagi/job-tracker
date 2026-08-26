# Job Tracker

A responsive job application tracking web application that helps users organize their job search, track application progress, manage follow-ups, and keep track of scheduled interviews in one place.

## Overview

Keeping track of multiple job applications across different companies can quickly become difficult. Job Tracker provides a centralized dashboard where users can record applications, monitor their status, schedule follow-ups, and keep track of interviews.

The application focuses on simplicity and practical job-search management without unnecessary complexity.

## Features
## 🚀 Live Demo

[View Job Tracker](https://job-tracker-kappa-snowy.vercel.app/)

### Dashboard

- Overview of total job applications
- Application status statistics
- Recent applications
- Follow-ups requiring attention
- Application progress breakdown
- Responsive dashboard layout

### Application Management

- Add new job applications
- Edit existing applications
- Delete applications
- View complete application details
- Search applications
- Filter applications by status
- Sort applications
- Pagination for application lists

### Interview Tracking

- Track scheduled interviews
- View upcoming interviews
- Identify interviews scheduled for the current week
- Automatically identify completed interviews
- Highlight interviews scheduled for today

### Follow-ups

- Add follow-up dates to applications
- Identify follow-ups due today
- Highlight overdue follow-ups
- Display applications requiring attention directly on the dashboard

### Profile

- Manage personal information
- Store contact information
- Set desired job role
- Select employment type
- Set preferred location
- Store expected salary

### Settings

- Manage application data
- Clear stored application data

### Responsive Design

- Desktop sidebar navigation
- Mobile navigation drawer
- Responsive dashboard layout
- Mobile-friendly application management

## Application Status Flow

The application follows a simple job-search lifecycle:

```text
Applied
   |
   v
Interview
   |
   +--------------> Rejected
   |
   v
Offer
```

Applications can also remain in the Applied stage while waiting for a response.

## Tech Stack

### Frontend

- React
- JavaScript
- Tailwind CSS
- React Router

### State Management

- React Context API
- React Hooks

### Data Persistence

- Browser LocalStorage

### Development Tools

- Vite
- Git
- GitHub

## Project Structure

```text
src/
├── components/
│   ├── ApplicationForm.jsx
│   ├── Searchbar.jsx
│   └── Sidebar.jsx
│
├── context/
│   └── ApplicationContext.jsx
│
├── pages/
│   ├── Applications.jsx
│   ├── Dashboard.jsx
│   ├── Interviews.jsx
│   ├── Profile.jsx
│   └── Settings.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

## How It Works

The application uses React Context to manage application and profile data across the application.

Application data is stored in the browser's LocalStorage, allowing information to remain available after refreshing or reopening the application.

The main data flow is:

```text
User Action
     |
     v
React Component
     |
     v
ApplicationContext
     |
     v
State Update
     |
     v
LocalStorage
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/Aryan-Pagi/job-tracker.git
```

Navigate into the project:

```bash
cd job-tracker
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at the local development URL shown by Vite.

## Build for Production

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Data Storage

This version of Job Tracker uses browser LocalStorage instead of a backend database.

The following information is persisted locally:

- Job applications
- Profile information

Because LocalStorage is browser-specific, application data is not synchronized between different devices or browsers.

## Future Improvements

Possible future improvements include:

- Backend API and database integration
- User authentication
- Cloud data synchronization
- Email or browser notifications for follow-ups
- Advanced analytics
- Application activity history
- Calendar integration
- Export applications to CSV
- Dark mode

## Screenshots

Add screenshots of the Dashboard, Applications, Interviews, and Profile pages here.

## What I Learned

Building this project helped strengthen my understanding of:

- React component architecture
- React Hooks
- Context API
- State management
- Form handling
- CRUD operations
- Client-side data persistence
- React Router
- Responsive UI development
- Tailwind CSS
- Date-based application logic
- Search, filtering, sorting, and pagination
- Git and GitHub workflows

## License

This project is open source and available under the MIT License.

Create:

```text
README.md
```

# Job Application Tracker

A modern, responsive web application built with Next.js that helps job seekers organize and track their job applications efficiently.

## Features

### 📊 Dashboard
- **Application Overview**: View all your job applications in an organized grid layout
- **Smart Statistics**: Real-time counters showing applications by status (Applied, Interviewing, Offer, Rejected)
- **Search & Filter**: Quickly find applications by company name or job title
- **Status Filtering**: Filter applications by their current status
- **Responsive Design**: Optimized for both desktop and mobile devices

### ➕ Add New Applications
- **Comprehensive Form**: Add new job applications with company name, job title, status, application date, and notes
- **Form Validation**: Real-time validation ensures all required fields are completed
- **Date Picker**: Easy-to-use date selection for application dates
- **Status Selection**: Choose from predefined status options

### 📝 Application Details & Management
- **Detailed View**: Click any application to view complete details
- **Inline Editing**: Edit application details directly from the details page
- **Delete Functionality**: Remove applications with confirmation dialog
- **Navigation**: Seamless navigation between dashboard and detail views

## Tech Stack

- **Framework**: React with App Router
- **Language**: JavaScript
- **Styling**: Tailwind CSS with custom design token
- **State Management**: React Context API
- **Data Persistence**: localStorage
- **Icons**: Lucide React

## Installation

1. **Clone or download** the project files
2. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`
3. **Start the development server**:
   \`\`\`bash
   npm run dev
   \`\`\`
4. **Open your browser** and navigate to `http://localhost:3000`

## Usage

### Getting Started
1. **Dashboard**: The main page displays all your job applications
2. **Add Application**: Click the "Add New Application" button to create a new entry
3. **View Details**: Click on any application card to view full details
4. **Edit/Delete**: Use the edit button to modify applications or delete button to remove them

### Application Status Options
- **Applied**: Initial application submitted
- **Interviewing**: In the interview process
- **Offer**: Received a job offer
- **Rejected**: Application was declined

## Project Structure

\`\`\`
elevvo_task_8/
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── vite.config.js
├── public/            # Static assets (images, icons, etc.)
└── src/
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── components/
    │   ├── Layout.jsx
    │   └── Navbar.jsx
    ├── context/
    │   ├── JobContext.jsx
    │   ├── jobConstants.js
    │   ├── jobContext.js
    │   └── useJobs.js
    ├── pages/
    │   ├── AddJobPage.jsx
    │   ├── DashboardPage.jsx
    │   ├── EditJobPage.jsx
    │   └── JobPage.jsx
    └── utils/
        └── localStorage.js
\`\`\`

## Color Schema

The application uses a professional emerald green theme:

- **Primary**: `#059669` - Main brand color
- **Accent**: `#10b981` - Highlights and notifications  
- **Secondary**: `#475569` - Secondary text and elements
- **Background**: `#ffffff` (light) / Dark mode supported
- **Cards**: `#f1f5f9` - Form and card backgrounds

## Data Storage

All job application data is stored locally in your browser's localStorage, ensuring your information stays private and accessible offline. Data persists between browser sessions.

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

This is a personal job tracking tool. Feel free to customize the code to fit your specific needs.

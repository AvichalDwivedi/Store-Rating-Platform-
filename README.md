# Store-Rating-Platform

A React.js web application that allows users to submit ratings for stores. Features role-based access with three user types: System Administrators, Normal Users, and Store Owners. Administrators can manage users and stores, users can browse and rate stores, and store owners can view their ratings and customer feedback.

## 🛠️ Tech Stack

1) Frontend: React.js, Vite    
2) Routing: React Router DOM
3) State Management: React Context API + Custom Hooks
4) Storage: Browser LocalStorage
5) Styling: CSS
6) Build Tool: Vite
7) Language: JavaScript

## ✨ Key Features

1) User authentication with role-based access control
2) Store rating system (1-5 stars)
3) Responsive design
4) Form validation
5) Real-time rating updates

## Description 

### 👨‍💼 System Administrator
1) Dashboard Analytics: View total users, stores, and ratings statistics
2)User Management: Add new users (normal users and admin users)
3) Store Management: Add and manage store listings
4) Advanced Filtering: Filter users and stores by name, email, address, and role
5) Comprehensive Overview: View detailed information about all users and stores

### 👤 Normal User
1) User Registration: Sign up with validated form fields
2) Store Browsing: View all registered stores with search functionality
3) Rating System: Submit and modify ratings (1-5 stars) for stores
4) Password Management: Update account password after login
5)Personalized Experience: View personal rating history

### 🏪 Store Owner
1) Performance Analytics: View average store rating
2) Customer Feedback: See list of users who rated their store
3) Account Management: Update password and manage profile

## 🚀 Getting Started
### Prerequisites
1) Node.js (v14 or higher)
2) npm or yarn package manager

### Installation
1) Clone the repository
2) Install dependencies: npm install
3) Start development server: npm run dev
4) Open browser to http://localhost:3000

### Default Login Credentials
    Admin: email: admin@example.com
    Password: Admin@123

## 🏗️ Project Structure

    src/
    ├── components/         # Reusable UI components
    │   ├── admin/          # Administrator components
    │   ├── user/           # Normal user components
    │   ├── owner/          # Store owner components
    │   └── common/         # Shared components
    ├── hooks/              # Custom React hooks
    ├── pages/              # Page components
    ├── utils/              # Utility functions
    └── App.jsx             # Main application component

## Overview of Store-Rating-Platform:

### Login Page
<img width="1919" height="666" alt="image" src="https://github.com/user-attachments/assets/c96cddc5-4b88-4672-9d0b-004d7c17a600" />
### Register Page
<img width="1919" height="863" alt="image" src="https://github.com/user-attachments/assets/6bba5b24-7757-4e6c-97a7-ad118e097331" />

### Admin Dashboard
<img width="1919" height="535" alt="image" src="https://github.com/user-attachments/assets/0fd157a6-43ee-47e3-9119-fe51cf6b7662" />
<img width="1582" height="756" alt="image" src="https://github.com/user-attachments/assets/fab43525-872c-4665-bb89-fe6fc9c1b546" />
<img width="1585" height="875" alt="image" src="https://github.com/user-attachments/assets/94feeb85-74fe-493b-9952-868288f9ca24" />
<img width="1489" height="612" alt="image" src="https://github.com/user-attachments/assets/5b224324-38bd-42b8-baa2-da0613f285b5" />
<img width="1436" height="631" alt="image" src="https://github.com/user-attachments/assets/bfe9e971-3bf2-4709-b5e9-fc44ed6735ea" />

### User Dashboard
<img width="1559" height="773" alt="image" src="https://github.com/user-attachments/assets/844625d8-92a6-4b06-bf7d-32367870a751" />
#### Updated the Rating
<img width="1497" height="768" alt="image" src="https://github.com/user-attachments/assets/bd286a76-3cea-4c31-b480-fab17f566983" />
#### User can change the password
<img width="1286" height="818" alt="image" src="https://github.com/user-attachments/assets/60523377-4f07-4db0-a408-c7bd0d11fb26" />


## Deployment Link
https://store-rating-platform-nine.vercel.app/login







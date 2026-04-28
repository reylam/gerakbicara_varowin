# Gerak Bicara API - Postman Collection

## 📋 Overview

This Postman collection contains all API endpoints for the **Gerak Bicara** platform - an Indonesian Sign Language (BISINDO/SIBI) learning application.

## 🚀 Getting Started

### Prerequisites

- Laravel backend running on `http://localhost:8000`
- Database seeded with sample data
- Postman application installed

### Setup Instructions

1. **Import the Collection**
   - Open Postman
   - Click "Import" button
   - Select "File" tab
   - Choose `GerakBicara_Postman_Collection.json`
   - Click "Import"

2. **Configure Environment Variables**
   - Create a new environment in Postman
   - Set these variables:
     - `base_url`: `http://localhost:8000/api`
     - `auth_token`: (will be set automatically after login)
     - `user_id`: (will be set automatically after login)

3. **Start Testing**
   - Begin with **Authentication > Login User** to get your token
   - All subsequent requests will use the token automatically

## 📁 Collection Structure

### 🔐 Authentication

- **Register User** - Create new user account
- **Login User** - Authenticate and get JWT token
- **Get Current User** - Get authenticated user info
- **Logout User** - Invalidate current session

### 📊 Dashboard

- **Get Dashboard Stats** - User statistics and progress

### 📚 Learning Paths

- **Get All Paths** - List all learning paths
- **Get Path Modules** - Get modules for specific path
- **Get Module Lessons** - Get lessons for specific module

### 📖 Lessons

- **Get Lesson Detail** - Get detailed lesson information
- **Complete Lesson** - Mark lesson as completed
- **Get User Progress** - Get user's learning progress

### 🔍 Sign Dictionary

- **Get All Signs** - Browse all BISINDO signs
- **Search Signs** - Search signs by keyword

### 🎯 Quizzes & Challenges

- **Get Lesson Quizzes** - Get quizzes for a lesson
- **Submit Quiz Answer** - Submit answer to quiz question
- **Get User Quiz Attempts** - View quiz attempt history
- **Get All Challenges** - List available challenges
- **Participate in Challenge** - Join a challenge
- **Complete Challenge** - Mark challenge as completed

### 🏆 Achievements

- **Get All Achievements** - List all achievements
- **Get User Achievements** - Get user's earned achievements

### 🏅 Leaderboard

- **Get Top Users** - View top users by XP

### 👤 Profile

- **Get Profile** - Get user profile information
- **Update Profile** - Update user profile
- **Get User Streak** - Get user's learning streak

### 🤖 SignBot Chat

- **Get Chat History** - Get conversation history with SignBot
- **Send Message to SignBot** - Send message to AI assistant

### ⚙️ Admin Panel

Complete CRUD operations for:

- **Paths Management** - Create/edit learning paths
- **Modules Management** - Manage course modules
- **Lessons Management** - Create/edit lessons
- **Signs Management** - Manage BISINDO signs
- **Quizzes Management** - Create/edit quizzes
- **Achievements Management** - Manage achievements
- **Challenges Management** - Create/edit challenges

## 🔑 Authentication Notes

- All protected routes require Bearer token authentication
- Token is automatically set after successful login
- Admin routes require admin role (not implemented in current seeders)

## 📝 Sample Data

The collection includes sample data for testing:

- **Users**: Ahmad Rahman, Siti Nurhaliza, Budi Santoso, Maya Sari
- **Paths**: "Dasar Bahasa Isyarat Indonesia"
- **Modules**: Alfabet, Sapaan, Angka, Keluarga, Aktivitas
- **Signs**: 13 BISINDO signs across categories
- **Quizzes**: Multiple choice and gesture-based questions
- **Achievements**: 8 gamification achievements
- **Challenges**: Weekly challenges

## 🧪 Testing Tips

1. **Start with Authentication** - Always login first to get token
2. **Test User Flows** - Follow typical user journey: login → dashboard → lessons → quizzes
3. **Check Responses** - All endpoints return consistent JSON format with `success`, `message`, and `data` fields
4. **Admin Testing** - Use admin endpoints to create new content
5. **Error Handling** - Test with invalid data to see error responses

## 📊 Response Format

All API responses follow this structure:

```json
{
  "success": true|false,
  "message": "Response description",
  "data": { ... } | null
}
```

## 🆘 Troubleshooting

- **401 Unauthorized**: Check if token is set and valid
- **404 Not Found**: Verify endpoint URL and parameters
- **422 Validation Error**: Check request body format
- **500 Server Error**: Check Laravel logs for backend issues

## 📞 Support

For issues with the API or collection:

1. Check Laravel backend logs
2. Verify database is seeded
3. Ensure all migrations are run
4. Test with different user accounts

---

**Gerak Bicara** - Making sign language accessible for everyone! 🇮🇩🤟

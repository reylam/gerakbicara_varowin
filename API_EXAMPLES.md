# Laravel Sign Language Learning Platform API Examples

## Authentication

### Register

```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "xp": 0,
      "level": 0
    },
    "token": "1|abc123..."
  }
}
```

### Login

```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "xp": 0,
      "level": 0
    },
    "token": "1|abc123..."
  }
}
```

### Get Profile

```json
GET /api/profile
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Profile retrieved",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "xp": 0,
    "level": 0
  }
}
```

## Learning Paths

### Get All Paths

```json
GET /api/sign-path/paths
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Sign paths retrieved",
  "data": [
    {
      "id": 1,
      "title": "Basic Signs",
      "description": "Learn basic sign language signs",
      "order": 1,
      "modules_count": 3
    }
  ]
}
```

### Get Modules by Path

```json
GET /api/sign-path/paths/1/modules
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Path modules retrieved",
  "data": [
    {
      "id": 1,
      "path_id": 1,
      "title": "Greetings",
      "description": "Basic greeting signs",
      "order": 1,
      "lessons_count": 5
    }
  ]
}
```

## Lessons

### Get Lesson Detail

```json
GET /api/lesson-simulation/lessons/1
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Lesson detail retrieved",
  "data": {
    "id": 1,
    "module_id": 1,
    "title": "Hello Sign",
    "content": "Learn how to sign 'hello'",
    "order": 1,
    "video_url": "https://example.com/hello.mp4",
    "module": {
      "id": 1,
      "title": "Greetings",
      "path": {
        "id": 1,
        "title": "Basic Signs"
      }
    },
    "quizzes": [
      {
        "id": 1,
        "question": "What is the correct sign for hello?",
        "type": "multiple_choice",
        "quiz_answers": [
          {
            "id": 1,
            "answer": "Wave hand",
            "is_correct": true
          },
          {
            "id": 2,
            "answer": "Point finger",
            "is_correct": false
          }
        ]
      }
    ]
  }
}
```

### Complete Lesson

```json
POST /api/lesson-simulation/complete
Authorization: Bearer {token}
{
  "lesson_id": 1
}

Response:
{
  "success": true,
  "message": "Lesson completed successfully",
  "data": {
    "lesson": {
      "id": 1,
      "title": "Hello Sign"
    },
    "xp_awarded": 10,
    "total_xp": 10,
    "level": 0
  }
}
```

## Challenges & Quizzes

### Get Quizzes by Lesson

```json
GET /api/challenge/lesson/1/quizzes
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Quizzes retrieved",
  "data": [
    {
      "id": 1,
      "lesson_id": 1,
      "question": "What is the correct sign for hello?",
      "type": "multiple_choice",
      "quiz_answers": [
        {
          "id": 1,
          "answer": "Wave hand",
          "is_correct": true
        }
      ]
    }
  ]
}
```

### Submit Quiz Answer

```json
POST /api/challenge/submit
Authorization: Bearer {token}
{
  "quiz_id": 1,
  "selected_answer_id": 1
}

Response:
{
  "success": true,
  "message": "Answer submitted",
  "data": {
    "quiz_id": 1,
    "is_correct": true,
    "xp_awarded": 5
  }
}
```

## SignPedia

### Get All Signs

```json
GET /api/sign-pedia/signs
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Signs retrieved",
  "data": {
    "current_page": 1,
    "data": [
      {
        "id": 1,
        "word": "Hello",
        "description": "Greeting sign",
        "category": "Greetings",
        "model_3d_url": "https://example.com/hello.glb",
        "video_url": "https://example.com/hello.mp4"
      }
    ],
    "per_page": 15,
    "total": 1
  }
}
```

### Search Signs

```json
GET /api/sign-pedia/search?q=hello
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Search results retrieved",
  "data": {
    "current_page": 1,
    "data": [
      {
        "id": 1,
        "word": "Hello",
        "description": "Greeting sign",
        "category": "Greetings"
      }
    ],
    "per_page": 15,
    "total": 1
  }
}
```

## Leaderboard

### Get Top Users

```json
GET /api/leaderboard/top
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Top users retrieved",
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "xp": 100,
      "level": 1,
      "rank": 1
    }
  ]
}
```

## Dashboard

### Get Stats

```json
GET /api/dashboard/stats
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Dashboard stats retrieved",
  "data": {
    "total_xp": 100,
    "current_level": 1,
    "current_streak": 5,
    "recent_progress": [
      {
        "lesson_id": 1,
        "lesson_title": "Hello Sign",
        "completed_at": "2024-01-01T10:00:00Z"
      }
    ]
  }
}
```

## Achievements

### Get All Achievements

```json
GET /api/achievements
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Achievements retrieved",
  "data": [
    {
      "id": 1,
      "title": "First Lesson",
      "description": "Complete your first lesson",
      "xp_reward": 10,
      "icon": "trophy"
    }
  ]
}
```

### Get User Achievements

```json
GET /api/my-achievements
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "User achievements retrieved",
  "data": [
    {
      "id": 1,
      "achievement": {
        "id": 1,
        "title": "First Lesson",
        "description": "Complete your first lesson",
        "xp_reward": 10
      },
      "earned_at": "2024-01-01T10:00:00Z"
    }
  ]
}
```

## Challenges

### Get All Challenges

```json
GET /api/challenges
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Challenges retrieved",
  "data": [
    {
      "id": 1,
      "title": "Speed Challenge",
      "description": "Complete 5 lessons quickly",
      "xp_reward": 50
    }
  ]
}
```

### Participate in Challenge

```json
POST /api/challenges/1/participate
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Challenge participation started",
  "data": {
    "id": 1,
    "user_id": 1,
    "challenge_id": 1,
    "is_completed": false,
    "challenge": {
      "id": 1,
      "title": "Speed Challenge",
      "xp_reward": 50
    }
  }
}
```

### Complete Challenge

```json
POST /api/challenges/1/complete
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Challenge completed",
  "data": {
    "challenge": {
      "id": 1,
      "title": "Speed Challenge"
    },
    "xp_awarded": 50
  }
}
```

## SignBot

### Get Chat History

```json
GET /api/sign-bot/history
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Chat history retrieved",
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "message": "How do I sign 'thank you'?",
      "response": "To sign 'thank you', place your dominant hand near your chin and move it forward and down.",
      "created_at": "2024-01-01T10:00:00Z"
    }
  ]
}
```

### Send Message to SignBot

```json
POST /api/sign-bot/message
Authorization: Bearer {token}
{
  "message": "How do I sign 'please'?"
}

Response:
{
  "success": true,
  "message": "Message sent",
  "data": {
    "response": "To sign 'please', rub your chest in a circular motion with your dominant hand."
  }
}
```

## Admin Routes (Require admin role)

### Create Path

```json
POST /api/admin/paths
Authorization: Bearer {admin_token}
{
  "title": "Advanced Signs",
  "description": "Learn advanced sign language signs",
  "order": 2
}

Response:
{
  "success": true,
  "message": "Path created",
  "data": {
    "id": 2,
    "title": "Advanced Signs",
    "description": "Learn advanced sign language signs",
    "order": 2
  }
}
```

### Create Achievement

```json
POST /api/admin/achievements
Authorization: Bearer {admin_token}
{
  "title": "Streak Master",
  "description": "Maintain a 7-day learning streak",
  "xp_reward": 25,
  "icon": "fire"
}

Response:
{
  "success": true,
  "message": "Achievement created",
  "data": {
    "id": 2,
    "title": "Streak Master",
    "description": "Maintain a 7-day learning streak",
    "xp_reward": 25,
    "icon": "fire"
  }
}
```

### Award Achievement

```json
POST /api/admin/achievements/award
Authorization: Bearer {admin_token}
{
  "user_id": 1,
  "achievement_id": 2
}

Response:
{
  "success": true,
  "message": "Achievement awarded",
  "data": {
    "id": 1,
    "user_id": 1,
    "achievement_id": 2,
    "earned_at": "2024-01-01T10:00:00Z",
    "achievement": {
      "id": 2,
      "title": "Streak Master",
      "xp_reward": 25
    }
  }
}
```

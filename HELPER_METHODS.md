# Laravel Sign Language Learning Platform - Helper Methods

## Helper Methods Used in Controllers

### Validation Error Response

```php
private function validationErrorResponse(string $message): JsonResponse
{
    return response()->json([
        'success' => false,
        'message' => $message,
        'data' => null,
    ], 422);
}
```

### Exception Response

```php
private function exceptionResponse(string $message, Exception $exception): JsonResponse
{
    return response()->json([
        'success' => false,
        'message' => $message,
        'data' => null,
    ], 500);
}
```

### Calculate User Level

```php
private function calculateLevel(int $xp): int
{
    return (int) floor($xp / 100);
}
```

## XP Reward System

### Lesson Completion XP

- **XP Reward**: 10 XP per lesson
- **Calculation**: `floor(total_xp / 100)` for level

### Quiz Correct Answer XP

- **XP Reward**: 5 XP per correct answer
- **Validation**: Prevents duplicate attempts per user/quiz

### Challenge Completion XP

- **XP Reward**: Variable based on challenge (`xp_reward` field)
- **Validation**: One-time completion per user/challenge

### Achievement XP

- **XP Reward**: Variable based on achievement (`xp_reward` field)
- **Trigger**: Manual awarding by admin or automatic based on conditions

## Authentication & Authorization

### Sanctum Token Authentication

- **Registration**: Creates user with default 'user' role
- **Login**: Returns user data + access token
- **Protected Routes**: Uses `auth:sanctum` middleware

### Role-Based Access Control

- **Middleware**: `RoleMiddleware` checks user role
- **Admin Routes**: Protected with `role:admin` middleware
- **User Roles**: 'admin' | 'user' (enum in users table)

## Data Validation Rules

### User Registration

```php
[
    'name' => 'required|string|max:255',
    'email' => 'required|email|unique:users,email',
    'password' => 'required|string|min:6',
]
```

### Lesson Completion

```php
[
    'lesson_id' => 'required|integer|exists:lessons,id',
]
```

### Quiz Submission

```php
[
    'quiz_id' => 'required|integer|exists:quizzes,id',
    'selected_answer_id' => 'required|integer|exists:quiz_answers,id',
]
```

### Path Creation (Admin)

```php
[
    'title' => 'required|string|max:255',
    'description' => 'required|string',
    'order' => 'required|integer|min:0',
]
```

### Achievement Creation (Admin)

```php
[
    'title' => 'required|string|max:255',
    'description' => 'required|string',
    'xp_reward' => 'required|integer|min:0',
    'icon' => 'nullable|string',
]
```

## Database Relationships

### User Progress Tracking

- **UserProgress**: Tracks lesson completion
- **UserQuizAttempt**: Prevents duplicate quiz attempts
- **UserChallenge**: Tracks challenge participation/completion
- **UserAchievement**: Tracks earned achievements
- **UserStreak**: Tracks daily learning streaks

### Content Hierarchy

- **Path** → **Module** → **Lesson** → **Quiz** → **QuizAnswer**
- **Sign**: Independent content for SignPedia
- **Challenge**: Independent challenges for users
- **Achievement**: Independent achievements for users

## Error Handling

### Consistent Response Format

All API responses follow this structure:

```json
{
    "success": boolean,
    "message": string,
    "data": object|null
}
```

### HTTP Status Codes

- **200**: Success
- **201**: Created
- **400**: Bad Request
- **404**: Not Found
- **409**: Conflict (duplicate actions)
- **422**: Validation Error
- **500**: Server Error

## Security Features

### Input Validation

- All inputs validated using Laravel Validator
- SQL injection prevention via Eloquent ORM
- Mass assignment protection via `$fillable`

### Authentication

- Sanctum tokens for API authentication
- Password hashing with `Hash::make()`
- Token-based authorization

### Authorization

- Role-based access control
- Admin-only routes for content management
- User isolation for personal data

## Performance Optimizations

### Eager Loading

- Relationships loaded with `with()` to prevent N+1 queries
- Example: `Path::with(['modules' => function ($query) { $query->withCount('lessons'); }])`

### Database Transactions

- Used for data integrity in complex operations
- Example: Quiz submission with XP updates

### Pagination

- SignPedia uses pagination for large datasets
- Configurable page size (currently 15 items)

## File Structure

```
app/
├── Http/
│   ├── Controllers/
│   │   ├── Auth/
│   │   │   └── AuthController.php
│   │   ├── Dashboard/
│   │   │   └── DashboardController.php
│   │   ├── SignPath/
│   │   │   └── SignPathController.php
│   │   ├── LessonSimulation/
│   │   │   └── LessonSimulationController.php
│   │   ├── SignPedia/
│   │   │   └── SignPediaController.php
│   │   ├── Challange/
│   │   │   └── ChallengeController.php
│   │   ├── Leaderboard/
│   │   │   └── LeaderboardController.php
│   │   ├── Profile/
│   │   │   └── ProfileController.php
│   │   ├── SignBot/
│   │   │   └── SignBotController.php
│   │   └── Achievement/
│       └── AchievementController.php
│   └── Middleware/
│       └── RoleMiddleware.php
├── Models/
│   ├── User.php
│   ├── Path.php
│   ├── Module.php
│   ├── Lesson.php
│   ├── Quiz.php
│   ├── QuizAnswer.php
│   ├── UserProgress.php
│   ├── UserQuizAttempt.php
│   ├── Achievement.php
│   ├── UserAchievement.php
│   ├── Sign.php
│   ├── ChatMessage.php
│   ├── Leaderboard.php
│   ├── LeaderboardEntry.php
│   ├── Challenge.php
│   ├── UserChallenge.php
│   └── UserStreak.php
routes/
└── api.php
```

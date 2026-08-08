# Authentication System Setup Guide

## Overview
This project includes a complete authentication system with:
- User registration and login
- JWT-based authentication
- SQLite database
- Admin panel for user management
- Admin action logging

## Backend Setup (Python Flask)

### 1. Install Python Dependencies

Navigate to the server directory and install requirements:

```bash
cd server
pip install -r requirements.txt
```

### 2. Configure Environment Variables

Create/edit `.env` file in the `server/` directory:

```env
SECRET_KEY=your-secret-key-change-in-production-12345
FLASK_ENV=development
FLASK_DEBUG=True
DATABASE=auth.db
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

#### Optional: AI chat assistant

The site's chat widget works without any of this — it falls back to a scripted
knowledge base (`src/services/chatKnowledge.js`) whenever the backend is absent
or unconfigured. Add these to turn on real Claude-powered answers:

```env
ANTHROPIC_API_KEY=sk-ant-...
CHAT_MODEL=claude-opus-5      # optional; this is the default
CHAT_RATE_LIMIT=20            # messages per IP per window (default 20)
CHAT_RATE_WINDOW=3600         # window in seconds (default 1 hour)
```

Claude Opus 5 is billed at $5 per million input tokens and $25 per million
output tokens. Chat replies are capped at 1024 output tokens and the system
brief is prompt-cached, so a typical exchange costs well under a cent — but the
endpoint is public, hence the per-IP rate limit. Lower `CHAT_RATE_LIMIT` to
tighten it, or drop `CHAT_MODEL` to `claude-haiku-4-5` for roughly a fifth of
the cost at lower answer quality.

Check it is live with `GET /api/chat`, which reports `{"ready": true}` once the
key is set. The widget calls this once on page load and only offers AI answers
when it returns true.

### 3. Start the Backend Server

```bash
python app.py
```

The server will run on `http://localhost:5000` and automatically initialize the SQLite database.

**Default Admin Account:**
- Username: `admin`
- Password: `admin123`

## Frontend Setup (React)

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Features

### Authentication Pages
- **Login** (`/login`) - Sign in with username and password
- **Register** (`/register`) - Create a new account
- **Admin Panel** (`/admin`) - Manage users and view admin logs (admin only)

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

#### Admin Only
- `GET /api/admin/users` - List all users
- `DELETE /api/admin/users/<id>` - Delete user
- `PUT /api/admin/users/<id>/toggle-admin` - Toggle admin status
- `GET /api/admin/logs` - View admin action logs

### Authentication Flow

1. User registers or logs in
2. Server returns JWT token
3. Token stored in localStorage
4. Frontend includes token in Authorization header for protected routes
5. Protected routes require valid token

### Database Schema

**users table:**
- id (PRIMARY KEY)
- username (UNIQUE)
- email (UNIQUE)
- password (hashed with werkzeug)
- is_admin (0 or 1)
- created_at
- updated_at

**admin_logs table:**
- id (PRIMARY KEY)
- admin_id (FOREIGN KEY)
- action (DELETE_USER, PROMOTE_TO_ADMIN, DEMOTE_FROM_ADMIN)
- target_user_id
- details
- created_at

## Production Deployment

### Backend (Vercel, Heroku, etc.)

1. Update `SECRET_KEY` in environment variables
2. Set `FLASK_DEBUG=False`
3. Use production database (consider PostgreSQL instead of SQLite)
4. Update CORS_ORIGINS to match your domain

### Frontend (Already on Vercel)

Update the API base URL in `src/services/apiClient.js`:
```javascript
const API_BASE = 'https://your-api.vercel.app/api'
```

## Security Notes

⚠️ **Important for Production:**
- Change the default admin password immediately
- Use strong SECRET_KEY (min 32 characters, random)
- Enable HTTPS only in production
- Set CORS_ORIGINS to specific domains only
- Consider using PostgreSQL instead of SQLite for production
- Implement rate limiting on authentication endpoints
- Use environment variables for all sensitive data

## Testing

### Test User Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"test123"}'
```

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test123"}'
```

### Test Protected Endpoint (with token)
```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Troubleshooting

**CORS Error:** Make sure Flask backend is running and CORS_ORIGINS matches your frontend URL

**Database Error:** Delete `auth.db` file and restart server to reinitialize

**Login Failing:** Verify username/password are correct. Check that user exists in database

**Admin Panel Not Showing:** Ensure user has `is_admin=1` in database

## File Structure

```
team_website/
├── server/
│   ├── app.py              # Flask backend
│   ├── requirements.txt     # Python dependencies
│   ├── .env               # Environment variables
│   └── auth.db            # SQLite database (created on first run)
├── src/
│   ├── context/
│   │   └── AuthContext.jsx # Auth state management
│   ├── services/
│   │   └── apiClient.js   # API client for backend
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   └── AdminPage.jsx
│   ├── components/
│   │   ├── Navbar.jsx     # Updated with auth UI
│   │   └── ProtectedRoute.jsx
│   └── App.jsx            # Updated with auth routes
```

## Support

For issues or questions, refer to:
- Flask-JWT-Extended docs: https://flask-jwt-extended.readthedocs.io/
- React docs: https://react.dev/

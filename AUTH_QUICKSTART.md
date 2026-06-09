# Quick Start Guide - Authentication System

## What's Been Set Up

✅ **Python Flask Backend** - User authentication, SQLite database, JWT tokens, admin panel
✅ **React Frontend** - Login/Register pages, Admin dashboard, Protected routes
✅ **Database** - SQLite with user management and admin logging
✅ **Security** - JWT token-based authentication, password hashing

## Start the Backend

```bash
cd server
pip install -r requirements.txt
python app.py
```

Server runs on `http://localhost:5000`

**Default Admin Login:**
- Username: `admin`
- Password: `admin123`

⚠️ Change this password immediately in production!

## Start the Frontend

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

## Access the App

- **Home Page**: http://localhost:5173/
- **Login**: http://localhost:5173/login
- **Register**: http://localhost:5173/register
- **Admin Panel**: http://localhost:5173/admin (admin only)

## Features

### For Users
- ✅ Register new account
- ✅ Login with credentials
- ✅ Persistent session (stored in localStorage)
- ✅ Logout

### For Admins
- ✅ View all users
- ✅ Delete users
- ✅ Promote/Demote user to admin
- ✅ View admin action logs

## File Structure

```
team_website/
├── server/
│   ├── app.py              # Flask backend with all routes
│   ├── requirements.txt     # Dependencies: Flask, JWT, CORS
│   ├── .env               # Configuration
│   └── auth.db            # Database (auto-created)
│
├── src/
│   ├── context/
│   │   ├── AuthContext.jsx # Auth state & methods
│   │   └── ContactContext.jsx
│   │
│   ├── services/
│   │   └── apiClient.js   # API client for backend
│   │
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   └── AdminPage.jsx
│   │
│   ├── components/
│   │   ├── Navbar.jsx     # Shows login/logout buttons
│   │   └── ProtectedRoute.jsx
│   │
│   └── App.jsx            # Routes for auth pages
```

## API Endpoints

### Auth Endpoints
```
POST   /api/auth/register       # Create account
POST   /api/auth/login          # Sign in
GET    /api/auth/me             # Get current user (requires token)
```

### Admin Endpoints (require admin token)
```
GET    /api/admin/users         # List all users
DELETE /api/admin/users/<id>    # Delete user
PUT    /api/admin/users/<id>/toggle-admin  # Toggle admin status
GET    /api/admin/logs          # View action logs
```

## Testing with curl

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john","email":"john@example.com","password":"secure123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"john","password":"secure123"}'
```

### Use Token (copy token from login response)
```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Environment Variables

Edit `server/.env`:
```env
SECRET_KEY=your-secret-key-change-in-production-12345
FLASK_ENV=development
FLASK_DEBUG=True
DATABASE=auth.db
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

For production:
- Generate strong SECRET_KEY (32+ random characters)
- Set `FLASK_DEBUG=False`
- Update CORS_ORIGINS to your domain

## Database Schema

**users table:**
- id (PRIMARY KEY)
- username (UNIQUE)
- email (UNIQUE)
- password (hashed)
- is_admin (0 or 1)
- created_at, updated_at

**admin_logs table:**
- id (PRIMARY KEY)
- admin_id, action, target_user_id
- details, created_at

## Common Issues

**CORS Error?**
- Make sure backend is running on port 5000
- Check CORS_ORIGINS in `.env`

**Login fails?**
- Verify username/password are correct
- Check user exists in database

**Admin panel blank?**
- Ensure user has `is_admin=1`
- Check browser console for errors

**Database errors?**
- Delete `server/auth.db` and restart backend to reset

## Next Steps

1. Change the default admin password
2. Test user registration and login
3. Test admin panel features
4. Prepare for deployment
5. Update API base URL in production

See `AUTHENTICATION_SETUP.md` for detailed docs.

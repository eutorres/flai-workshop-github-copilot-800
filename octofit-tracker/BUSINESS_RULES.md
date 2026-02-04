# OctoFit Tracker - Business Rules (Regras de Negócio)

## User Management (Gestão de Usuários)

### User Registration and Profile

#### BR-001: User Without Team
**Rule:** Users can be created and exist without being assigned to a team.

**Details:**
- The `team` field is **optional** for all users
- Users can be added to the system without selecting a team
- Users can be removed from a team (set team to "No Team")
- The system will display "No Team" badge for users without team assignment

**Implementation:**
- Backend: `team` field in User model is `blank=True, null=True`
- API: UserSerializer allows `team` to be null or empty string
- Frontend: Dropdown includes "No Team" option with empty value
- Database: Team field can be NULL

**Validation:**
- ✅ User can have `team = null`
- ✅ User can have `team = ""`
- ✅ User must have valid `email` (required, unique)
- ✅ User must have valid `name` (required)

---

#### BR-002: User Email Uniqueness
**Rule:** Each user must have a unique email address.

**Details:**
- Email addresses must be unique across all users
- Email validation follows standard email format
- Duplicate emails are not allowed

**Validation:**
- ✅ Email is required
- ✅ Email must be unique
- ✅ Email format must be valid

---

#### BR-003: User Team Assignment
**Rule:** Users can be assigned to existing teams only.

**Details:**
- If a team is selected, it must exist in the Teams table
- Team assignment can be changed at any time
- Removing team assignment is allowed (set to "No Team")

**Validation:**
- ✅ Team name must exist if provided
- ✅ Empty team value is valid (No Team)

---

## Team Management (Gestão de Equipes)

#### BR-004: Team Member Count
**Rule:** Teams display the count of members assigned to them.

**Details:**
- Member count is calculated automatically
- Users without teams are not counted in any team
- Count updates when users join or leave teams

---

## Activity Management (Gestão de Atividades)

#### BR-005: Activity User Association
**Rule:** Activities must be associated with a user email.

**Details:**
- Activities are linked to users via email
- Users can log activities regardless of team assignment
- Activities track calories, duration, and type

---

## Leaderboard (Classificação)

#### BR-006: Leaderboard Ranking
**Rule:** Users are ranked by total calories burned.

**Details:**
- Ranking considers all activities from a user
- Users without teams can appear on the leaderboard
- Team affiliation is displayed but not required for ranking

---

## Data Validation Rules

### User Fields
| Field | Required | Unique | Type | Constraints |
|-------|----------|--------|------|-------------|
| email | ✅ Yes | ✅ Yes | EmailField | Valid email format |
| name | ✅ Yes | ❌ No | CharField(200) | Max 200 characters |
| team | ❌ No | ❌ No | CharField(100) | Max 100 characters, can be null/empty |
| created_at | Auto | N/A | DateTimeField | Auto-generated |

### Team Fields
| Field | Required | Unique | Type | Constraints |
|-------|----------|--------|------|-------------|
| name | ✅ Yes | ✅ Yes | CharField(100) | Max 100 characters |
| description | ✅ Yes | ❌ No | TextField | No limit |
| created_at | Auto | N/A | DateTimeField | Auto-generated |

---

## API Behavior

### User Endpoints

#### POST /api/users/
Create new user - team is optional
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "team": ""  // Empty string or null is valid
}
```

#### PUT /api/users/{id}/
Update user - team can be set to null
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "team": null  // Remove team assignment
}
```

#### GET /api/users/
List all users - displays team or null
```json
{
  "id": "1",
  "name": "John Doe",
  "email": "john@example.com",
  "team": null,  // User without team
  "created_at": "2026-02-04T12:00:00Z"
}
```

---

## Frontend Behavior

### User Form
- Team dropdown includes "No Team" option as first item
- Selecting "No Team" sets team value to empty string
- Empty string is converted to null before sending to API
- Users without teams display "No Team" badge (gray)
- Users with teams display team name badge (blue)

### Display Rules
- User list shows all users regardless of team assignment
- "No Team" badge is displayed for users without teams
- Team badges use different colors:
  - **No Team**: Gray badge
  - **With Team**: Blue/Info badge

---

## Migration Notes

### Database Schema Changes
- Migration `0002_alter_user_team.py` made team field optional
- Existing users with empty team values are valid
- No data migration required for existing records

---

## Testing Scenarios

### User Creation
- ✅ Create user without team
- ✅ Create user with team
- ✅ Update user to remove team
- ✅ Update user to add team
- ✅ Update user to change team

### Validation
- ✅ Duplicate email rejection
- ✅ Empty email rejection
- ✅ Empty name rejection
- ✅ Invalid email format rejection
- ✅ Non-existent team acceptance (team is free text, not FK)

---

**Last Updated:** February 4, 2026
**Version:** 1.0

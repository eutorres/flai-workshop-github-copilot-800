from django.test import TestCase
from django.utils import timezone
from .models import User, Team, Activity, Leaderboard, Workout


class UserModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            name='Test Hero',
            email='test.hero@test.com',
            team='Team Test'
        )

    def test_user_creation(self):
        self.assertEqual(self.user.name, 'Test Hero')
        self.assertEqual(self.user.email, 'test.hero@test.com')
        self.assertEqual(self.user.team, 'Team Test')
        self.assertIsNotNone(self.user.created_at)


class TeamModelTest(TestCase):
    def setUp(self):
        self.team = Team.objects.create(
            name='Team Test',
            description='Test team for testing'
        )

    def test_team_creation(self):
        self.assertEqual(self.team.name, 'Team Test')
        self.assertEqual(self.team.description, 'Test team for testing')
        self.assertIsNotNone(self.team.created_at)


class ActivityModelTest(TestCase):
    def setUp(self):
        self.activity = Activity.objects.create(
            user_email='test.hero@test.com',
            activity_type='Running',
            duration=30,
            distance=5.0,
            calories=300,
            date=timezone.now()
        )

    def test_activity_creation(self):
        self.assertEqual(self.activity.user_email, 'test.hero@test.com')
        self.assertEqual(self.activity.activity_type, 'Running')
        self.assertEqual(self.activity.duration, 30)
        self.assertEqual(self.activity.distance, 5.0)
        self.assertEqual(self.activity.calories, 300)


class LeaderboardModelTest(TestCase):
    def setUp(self):
        self.entry = Leaderboard.objects.create(
            user_email='test.hero@test.com',
            user_name='Test Hero',
            team='Team Test',
            total_calories=1000,
            total_activities=5,
            rank=1
        )

    def test_leaderboard_creation(self):
        self.assertEqual(self.entry.user_email, 'test.hero@test.com')
        self.assertEqual(self.entry.user_name, 'Test Hero')
        self.assertEqual(self.entry.total_calories, 1000)
        self.assertEqual(self.entry.total_activities, 5)
        self.assertEqual(self.entry.rank, 1)


class WorkoutModelTest(TestCase):
    def setUp(self):
        self.workout = Workout.objects.create(
            name='Test Workout',
            description='A test workout routine',
            activity_type='HIIT',
            duration=45,
            difficulty='Medium',
            calories_estimate=400
        )

    def test_workout_creation(self):
        self.assertEqual(self.workout.name, 'Test Workout')
        self.assertEqual(self.workout.activity_type, 'HIIT')
        self.assertEqual(self.workout.duration, 45)
        self.assertEqual(self.workout.difficulty, 'Medium')
        self.assertEqual(self.workout.calories_estimate, 400)

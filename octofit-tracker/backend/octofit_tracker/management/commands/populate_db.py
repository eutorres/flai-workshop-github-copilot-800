from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
import random


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Clearing existing data...')
        
        # Delete existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()
        
        self.stdout.write('Creating teams...')
        
        # Create teams
        team_marvel = Team.objects.create(
            name='Team Marvel',
            description='Earth\'s Mightiest Heroes united for fitness excellence'
        )
        
        team_dc = Team.objects.create(
            name='Team DC',
            description='Justice League members striving for peak physical performance'
        )
        
        self.stdout.write(self.style.SUCCESS(f'Created teams: {team_marvel.name} and {team_dc.name}'))
        
        # Create users - Marvel heroes
        marvel_heroes = [
            {'name': 'Iron Man', 'email': 'tony.stark@marvel.com'},
            {'name': 'Captain America', 'email': 'steve.rogers@marvel.com'},
            {'name': 'Thor', 'email': 'thor.odinson@marvel.com'},
            {'name': 'Black Widow', 'email': 'natasha.romanoff@marvel.com'},
            {'name': 'Hulk', 'email': 'bruce.banner@marvel.com'},
            {'name': 'Spider-Man', 'email': 'peter.parker@marvel.com'},
        ]
        
        # Create users - DC heroes
        dc_heroes = [
            {'name': 'Batman', 'email': 'bruce.wayne@dc.com'},
            {'name': 'Superman', 'email': 'clark.kent@dc.com'},
            {'name': 'Wonder Woman', 'email': 'diana.prince@dc.com'},
            {'name': 'Flash', 'email': 'barry.allen@dc.com'},
            {'name': 'Aquaman', 'email': 'arthur.curry@dc.com'},
            {'name': 'Green Lantern', 'email': 'hal.jordan@dc.com'},
        ]
        
        self.stdout.write('Creating users...')
        
        marvel_users = []
        for hero in marvel_heroes:
            user = User.objects.create(
                name=hero['name'],
                email=hero['email'],
                team='Team Marvel'
            )
            marvel_users.append(user)
            self.stdout.write(f'  Created user: {user.name}')
        
        dc_users = []
        for hero in dc_heroes:
            user = User.objects.create(
                name=hero['name'],
                email=hero['email'],
                team='Team DC'
            )
            dc_users.append(user)
            self.stdout.write(f'  Created user: {user.name}')
        
        all_users = marvel_users + dc_users
        
        # Create activities
        self.stdout.write('Creating activities...')
        
        activity_types = ['Running', 'Cycling', 'Swimming', 'Weightlifting', 'Yoga', 'Boxing', 'HIIT']
        
        for user in all_users:
            # Create 5-10 activities per user
            num_activities = random.randint(5, 10)
            for i in range(num_activities):
                activity_type = random.choice(activity_types)
                duration = random.randint(20, 120)
                distance = round(random.uniform(2, 20), 2) if activity_type in ['Running', 'Cycling', 'Swimming'] else None
                calories = duration * random.randint(5, 12)
                date = timezone.now() - timedelta(days=random.randint(0, 30))
                
                Activity.objects.create(
                    user_email=user.email,
                    activity_type=activity_type,
                    duration=duration,
                    distance=distance,
                    calories=calories,
                    date=date
                )
        
        self.stdout.write(self.style.SUCCESS(f'Created activities for all users'))
        
        # Create leaderboard entries
        self.stdout.write('Creating leaderboard entries...')
        
        for idx, user in enumerate(all_users):
            activities = Activity.objects.filter(user_email=user.email)
            total_calories = sum([a.calories for a in activities])
            total_activities = activities.count()
            
            Leaderboard.objects.create(
                user_email=user.email,
                user_name=user.name,
                team=user.team,
                total_calories=total_calories,
                total_activities=total_activities,
                rank=idx + 1
            )
            self.stdout.write(f'  Created leaderboard entry for {user.name}')
        
        # Create workouts
        self.stdout.write('Creating workouts...')
        
        workouts_data = [
            {
                'name': 'Iron Man Circuit',
                'description': 'High-tech endurance training inspired by Tony Stark\'s suit capabilities',
                'activity_type': 'HIIT',
                'duration': 45,
                'difficulty': 'Hard',
                'calories_estimate': 550
            },
            {
                'name': 'Captain America Strength Training',
                'description': 'Classic strength and conditioning workout for peak human performance',
                'activity_type': 'Weightlifting',
                'duration': 60,
                'difficulty': 'Hard',
                'calories_estimate': 480
            },
            {
                'name': 'Thor\'s Thunder Run',
                'description': 'Powerful running workout to build godlike stamina',
                'activity_type': 'Running',
                'duration': 40,
                'difficulty': 'Medium',
                'calories_estimate': 400
            },
            {
                'name': 'Black Widow Agility Training',
                'description': 'Stealth and agility focused workout for speed and flexibility',
                'activity_type': 'Boxing',
                'duration': 50,
                'difficulty': 'Medium',
                'calories_estimate': 450
            },
            {
                'name': 'Hulk Smash Power Lifting',
                'description': 'Intense power lifting routine for maximum strength gains',
                'activity_type': 'Weightlifting',
                'duration': 75,
                'difficulty': 'Hard',
                'calories_estimate': 600
            },
            {
                'name': 'Spider-Man Wall Climbing',
                'description': 'Dynamic climbing and bodyweight exercises for superhuman agility',
                'activity_type': 'HIIT',
                'duration': 35,
                'difficulty': 'Medium',
                'calories_estimate': 420
            },
            {
                'name': 'Batman Night Patrol',
                'description': 'Tactical training combining cardio and combat techniques',
                'activity_type': 'Boxing',
                'duration': 55,
                'difficulty': 'Hard',
                'calories_estimate': 520
            },
            {
                'name': 'Superman Flight Simulation',
                'description': 'Full-body conditioning to achieve superhuman endurance',
                'activity_type': 'HIIT',
                'duration': 50,
                'difficulty': 'Hard',
                'calories_estimate': 600
            },
            {
                'name': 'Wonder Woman Warrior Training',
                'description': 'Amazonian warrior workout combining strength and grace',
                'activity_type': 'Weightlifting',
                'duration': 65,
                'difficulty': 'Hard',
                'calories_estimate': 540
            },
            {
                'name': 'Flash Speed Training',
                'description': 'Lightning-fast interval training for maximum speed',
                'activity_type': 'Running',
                'duration': 30,
                'difficulty': 'Hard',
                'calories_estimate': 500
            },
            {
                'name': 'Aquaman Ocean Swim',
                'description': 'Underwater endurance training for aquatic excellence',
                'activity_type': 'Swimming',
                'duration': 45,
                'difficulty': 'Medium',
                'calories_estimate': 380
            },
            {
                'name': 'Green Lantern Willpower Yoga',
                'description': 'Focused yoga session to strengthen mind and body',
                'activity_type': 'Yoga',
                'duration': 60,
                'difficulty': 'Easy',
                'calories_estimate': 240
            },
        ]
        
        for workout_data in workouts_data:
            workout = Workout.objects.create(**workout_data)
            self.stdout.write(f'  Created workout: {workout.name}')
        
        self.stdout.write(self.style.SUCCESS('Database population complete!'))
        self.stdout.write(f'Total users: {User.objects.count()}')
        self.stdout.write(f'Total teams: {Team.objects.count()}')
        self.stdout.write(f'Total activities: {Activity.objects.count()}')
        self.stdout.write(f'Total leaderboard entries: {Leaderboard.objects.count()}')
        self.stdout.write(f'Total workouts: {Workout.objects.count()}')

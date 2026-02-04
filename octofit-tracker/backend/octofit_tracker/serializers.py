from rest_framework import serializers
from .models import User, Team, Activity, Leaderboard, Workout


class UserSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    team = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    
    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'team', 'created_at']
    
    def validate_email(self, value):
        """Ensure email is unique when creating or updating"""
        user_id = self.instance.id if self.instance else None
        if User.objects.filter(email=value).exclude(id=user_id).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value


class TeamSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    member_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Team
        fields = ['id', 'name', 'description', 'created_at', 'member_count']
    
    def get_member_count(self, obj):
        """Calculate the number of users assigned to this team"""
        return User.objects.filter(team=obj.name).count()


class ActivitySerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    
    class Meta:
        model = Activity
        fields = ['id', 'user_email', 'activity_type', 'duration', 'distance', 'calories', 'date', 'created_at']


class LeaderboardSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    
    class Meta:
        model = Leaderboard
        fields = ['id', 'user_email', 'user_name', 'team', 'total_calories', 'total_activities', 'rank', 'updated_at']


class WorkoutSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    
    class Meta:
        model = Workout
        fields = ['id', 'name', 'description', 'activity_type', 'duration', 'difficulty', 'calories_estimate', 'created_at']

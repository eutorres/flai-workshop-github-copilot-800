from rest_framework import serializers
from .models import User, Team, Activity, Leaderboard, Workout


class UserSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    team = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    
    class Meta:
        model = User
        fields = '__all__'


class TeamSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    member_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Team
        fields = '__all__'
    
    def get_member_count(self, obj):
        return User.objects.filter(team=obj.name).count()


class ActivitySerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    
    class Meta:
        model = Activity
        fields = '__all__'


class LeaderboardSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    
    class Meta:
        model = Leaderboard
        fields = '__all__'


class WorkoutSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    
    class Meta:
        model = Workout
        fields = '__all__'

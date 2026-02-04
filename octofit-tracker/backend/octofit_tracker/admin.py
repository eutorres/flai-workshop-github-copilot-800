from django.contrib import admin
from .models import User, Team, Activity, Leaderboard, Workout


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'team', 'created_at')
    list_filter = ('team', 'created_at')
    search_fields = ('name', 'email')
    ordering = ('id',)


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'created_at')
    search_fields = ('name',)
    ordering = ('id',)


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ('id', 'user_email', 'activity_type', 'duration', 'calories', 'date')
    list_filter = ('activity_type', 'date')
    search_fields = ('user_email',)
    ordering = ('-date',)


@admin.register(Leaderboard)
class LeaderboardAdmin(admin.ModelAdmin):
    list_display = ('id', 'rank', 'user_name', 'team', 'total_calories', 'total_activities')
    list_filter = ('team',)
    search_fields = ('user_name', 'user_email')
    ordering = ('rank',)


@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'activity_type', 'duration', 'difficulty', 'calories_estimate')
    list_filter = ('activity_type', 'difficulty')
    search_fields = ('name', 'description')
    ordering = ('id',)

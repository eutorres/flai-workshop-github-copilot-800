import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navigation
      "appName": "OctoFit Tracker",
      "users": "Users",
      "teams": "Teams",
      "activities": "Activities",
      "workouts": "Workouts",
      "leaderboard": "Leaderboard",
      
      // Home Page
      "welcome": "Welcome to OctoFit Tracker",
      "welcomeSubtitle": "Track your fitness journey with your team!",
      "viewUsers": "View Users",
      "viewUsersDesc": "View all registered users and their profiles",
      "viewTeams": "View Teams",
      "viewTeamsDesc": "Browse fitness teams and join the community",
      "viewActivities": "View Activities",
      "viewActivitiesDesc": "Track and log your fitness activities",
      "viewWorkouts": "View Workouts",
      "viewWorkoutsDesc": "Discover recommended workout plans",
      "viewLeaderboard": "View Leaderboard",
      "viewLeaderboardDesc": "See who's leading the fitness challenge",
      
      // Users Page
      "usersTitle": "Users",
      "registered": "Registered",
      "noUsersFound": "No Users Found",
      "noUsersFoundDesc": "There are no registered users yet.",
      "id": "ID",
      "name": "Name",
      "email": "Email",
      "team": "Team",
      "memberSince": "Member Since",
      "actions": "Actions",
      "noTeam": "No Team",
      "teamOptional": "Team assignment is optional",
      "edit": "Edit",
      "save": "Save",
      "cancel": "Cancel",
      "success": "Success!",
      "userUpdatedSuccess": "User details updated successfully.",
      "error": "Error!",
      "loading": "Loading...",
      "loadingUsers": "Loading users...",
      
      // Teams Page
      "teamsTitle": "Teams",
      "teamsRegistered": "Teams",
      "noTeamsFound": "No Teams Found",
      "noTeamsFoundDesc": "There are no registered teams yet.",
      "description": "Description",
      "members": "Members",
      "createdOn": "Created On",
      
      // Activities Page
      "activitiesTitle": "Activities",
      "activitiesLogged": "Logged",
      "noActivitiesFound": "No Activities Found",
      "noActivitiesFoundDesc": "No activities have been logged yet.",
      "user": "User",
      "activityType": "Activity Type",
      "duration": "Duration",
      "distance": "Distance",
      "calories": "Calories",
      "date": "Date",
      "minutes": "min",
      "km": "km",
      "kcal": "kcal",
      
      // Workouts Page
      "workoutsTitle": "Workouts",
      "workoutsAvailable": "Available",
      "noWorkoutsFound": "No Workouts Found",
      "noWorkoutsFoundDesc": "There are no workout plans available yet.",
      "difficulty": "Difficulty",
      "caloriesEstimate": "Calories Estimate",
      
      // Leaderboard Page
      "leaderboardTitle": "Leaderboard",
      "rank": "Rank",
      "userName": "User Name",
      "totalCalories": "Total Calories",
      "totalActivities": "Total Activities",
      "lastUpdated": "Last Updated",
      "noLeaderboardData": "No Leaderboard Data",
      "noLeaderboardDataDesc": "The leaderboard is currently empty."
    }
  },
  pt: {
    translation: {
      // Navigation
      "appName": "OctoFit Rastreador",
      "users": "Usuários",
      "teams": "Equipes",
      "activities": "Atividades",
      "workouts": "Treinos",
      "leaderboard": "Classificação",
      
      // Home Page
      "welcome": "Bem-vindo ao OctoFit Rastreador",
      "welcomeSubtitle": "Acompanhe sua jornada fitness com sua equipe!",
      "viewUsers": "Ver Usuários",
      "viewUsersDesc": "Visualize todos os usuários registrados e seus perfis",
      "viewTeams": "Ver Equipes",
      "viewTeamsDesc": "Navegue pelas equipes de fitness e junte-se à comunidade",
      "viewActivities": "Ver Atividades",
      "viewActivitiesDesc": "Rastreie e registre suas atividades fitness",
      "viewWorkouts": "Ver Treinos",
      "viewWorkoutsDesc": "Descubra planos de treino recomendados",
      "viewLeaderboard": "Ver Classificação",
      "viewLeaderboardDesc": "Veja quem está liderando o desafio fitness",
      
      // Users Page
      "usersTitle": "Usuários",
      "registered": "Registrados",
      "noUsersFound": "Nenhum Usuário Encontrado",
      "noUsersFoundDesc": "Ainda não há usuários registrados.",
      "id": "ID",
      "name": "Nome",
      "email": "E-mail",
      "team": "Equipe",
      "memberSince": "Membro Desde",
      "actions": "Ações",
      "noTeam": "Sem Equipe",
      "teamOptional": "A atribuição de equipe é opcional",
      "edit": "Editar",
      "save": "Salvar",
      "cancel": "Cancelar",
      "success": "Sucesso!",
      "userUpdatedSuccess": "Detalhes do usuário atualizados com sucesso.",
      "error": "Erro!",
      "loading": "Carregando...",
      "loadingUsers": "Carregando usuários...",
      
      // Teams Page
      "teamsTitle": "Equipes",
      "teamsRegistered": "Equipes",
      "noTeamsFound": "Nenhuma Equipe Encontrada",
      "noTeamsFoundDesc": "Ainda não há equipes registradas.",
      "description": "Descrição",
      "members": "Membros",
      "createdOn": "Criado Em",
      
      // Activities Page
      "activitiesTitle": "Atividades",
      "activitiesLogged": "Registradas",
      "noActivitiesFound": "Nenhuma Atividade Encontrada",
      "noActivitiesFoundDesc": "Nenhuma atividade foi registrada ainda.",
      "user": "Usuário",
      "activityType": "Tipo de Atividade",
      "duration": "Duração",
      "distance": "Distância",
      "calories": "Calorias",
      "date": "Data",
      "minutes": "min",
      "km": "km",
      "kcal": "kcal",
      
      // Workouts Page
      "workoutsTitle": "Treinos",
      "workoutsAvailable": "Disponíveis",
      "noWorkoutsFound": "Nenhum Treino Encontrado",
      "noWorkoutsFoundDesc": "Ainda não há planos de treino disponíveis.",
      "difficulty": "Dificuldade",
      "caloriesEstimate": "Estimativa de Calorias",
      
      // Leaderboard Page
      "leaderboardTitle": "Classificação",
      "rank": "Posição",
      "userName": "Nome do Usuário",
      "totalCalories": "Total de Calorias",
      "totalActivities": "Total de Atividades",
      "lastUpdated": "Última Atualização",
      "noLeaderboardData": "Sem Dados de Classificação",
      "noLeaderboardDataDesc": "A classificação está atualmente vazia."
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

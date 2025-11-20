"use client";

import { useState } from "react";
import { Dumbbell, Flame, Target, TrendingUp, Play, Clock, Award, ChevronRight, Menu, X } from "lucide-react";

export default function FitversePage() {
  const [activeTab, setActiveTab] = useState<"home" | "workouts" | "progress">("home");
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const workouts = [
    {
      id: "1",
      title: "HIIT Intenso",
      duration: "30 min",
      calories: "450 kcal",
      level: "Avançado",
      category: "Cardio",
      gradient: "from-orange-500 to-red-600",
      exercises: [
        { name: "Burpees", sets: "4x15", rest: "30s" },
        { name: "Mountain Climbers", sets: "4x20", rest: "30s" },
        { name: "Jump Squats", sets: "4x15", rest: "30s" },
        { name: "High Knees", sets: "4x30s", rest: "30s" },
      ]
    },
    {
      id: "2",
      title: "Força Total",
      duration: "45 min",
      calories: "380 kcal",
      level: "Intermediário",
      category: "Força",
      gradient: "from-blue-500 to-cyan-600",
      exercises: [
        { name: "Supino Reto", sets: "4x10", rest: "60s" },
        { name: "Agachamento", sets: "4x12", rest: "60s" },
        { name: "Levantamento Terra", sets: "4x8", rest: "90s" },
        { name: "Desenvolvimento", sets: "4x10", rest: "60s" },
      ]
    },
    {
      id: "3",
      title: "Yoga Flow",
      duration: "40 min",
      calories: "200 kcal",
      level: "Iniciante",
      category: "Flexibilidade",
      gradient: "from-purple-500 to-pink-600",
      exercises: [
        { name: "Saudação ao Sol", sets: "3x", rest: "0s" },
        { name: "Guerreiro I e II", sets: "3x cada lado", rest: "0s" },
        { name: "Prancha", sets: "3x30s", rest: "15s" },
        { name: "Alongamento Final", sets: "1x5min", rest: "0s" },
      ]
    },
    {
      id: "4",
      title: "Core Killer",
      duration: "25 min",
      calories: "280 kcal",
      level: "Intermediário",
      category: "Abdômen",
      gradient: "from-emerald-500 to-teal-600",
      exercises: [
        { name: "Prancha", sets: "4x45s", rest: "30s" },
        { name: "Russian Twist", sets: "4x20", rest: "30s" },
        { name: "Leg Raises", sets: "4x15", rest: "30s" },
        { name: "Bicycle Crunches", sets: "4x20", rest: "30s" },
      ]
    },
  ];

  const stats = [
    { label: "Treinos Completos", value: "47", icon: Dumbbell, color: "from-blue-500 to-cyan-600" },
    { label: "Calorias Queimadas", value: "18.5k", icon: Flame, color: "from-orange-500 to-red-600" },
    { label: "Dias Consecutivos", value: "12", icon: Target, color: "from-purple-500 to-pink-600" },
    { label: "Progresso Mensal", value: "+23%", icon: TrendingUp, color: "from-emerald-500 to-teal-600" },
  ];

  const recentWorkouts = [
    { name: "HIIT Intenso", date: "Hoje", duration: "30 min", completed: true },
    { name: "Força Total", date: "Ontem", duration: "45 min", completed: true },
    { name: "Yoga Flow", date: "2 dias atrás", duration: "40 min", completed: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header/Navbar */}
      <nav className="bg-slate-900/50 backdrop-blur-lg border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-2 rounded-xl">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Fitverse
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => setActiveTab("home")}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === "home"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Início
              </button>
              <button
                onClick={() => setActiveTab("workouts")}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === "workouts"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Treinos
              </button>
              <button
                onClick={() => setActiveTab("progress")}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === "progress"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Progresso
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-2">
              <button
                onClick={() => {
                  setActiveTab("home");
                  setMobileMenuOpen(false);
                }}
                className={`w-full px-4 py-2 rounded-lg transition-all text-left ${
                  activeTab === "home"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Início
              </button>
              <button
                onClick={() => {
                  setActiveTab("workouts");
                  setMobileMenuOpen(false);
                }}
                className={`w-full px-4 py-2 rounded-lg transition-all text-left ${
                  activeTab === "workouts"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Treinos
              </button>
              <button
                onClick={() => {
                  setActiveTab("progress");
                  setMobileMenuOpen(false);
                }}
                className={`w-full px-4 py-2 rounded-lg transition-all text-left ${
                  activeTab === "progress"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Progresso
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* HOME TAB */}
        {activeTab === "home" && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 p-8 md:p-12">
              <div className="relative z-10">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                  Bem-vindo ao Fitverse
                </h1>
                <p className="text-xl text-white/90 mb-6 max-w-2xl">
                  Transforme seu corpo, mente e vida com treinos personalizados e acompanhamento inteligente.
                </p>
                <button
                  onClick={() => setActiveTab("workouts")}
                  className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-slate-100 transition-all flex items-center gap-2 shadow-xl"
                >
                  Começar Treino
                  <Play className="w-5 h-5" />
                </button>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-slate-600 transition-all"
                >
                  <div className={`bg-gradient-to-r ${stat.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Recent Workouts */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Treinos Recentes</h2>
              <div className="space-y-4">
                {recentWorkouts.map((workout, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-700 hover:border-slate-600 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 w-10 h-10 rounded-lg flex items-center justify-center">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">{workout.name}</p>
                        <p className="text-slate-400 text-sm">{workout.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400 text-sm flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {workout.duration}
                      </span>
                      <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-lg text-sm font-semibold">
                        Completo
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* WORKOUTS TAB */}
        {activeTab === "workouts" && (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Biblioteca de Treinos</h1>
              <p className="text-slate-400">Escolha seu treino e comece agora mesmo</p>
            </div>

            {selectedWorkout ? (
              <div className="space-y-6">
                <button
                  onClick={() => setSelectedWorkout(null)}
                  className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 transition-all"
                >
                  ← Voltar aos treinos
                </button>

                {workouts
                  .filter((w) => w.id === selectedWorkout)
                  .map((workout) => (
                    <div key={workout.id} className="space-y-6">
                      {/* Workout Header */}
                      <div className={`bg-gradient-to-r ${workout.gradient} rounded-3xl p-8 md:p-12`}>
                        <div className="flex items-start justify-between mb-6">
                          <div>
                            <h2 className="text-4xl font-bold text-white mb-2">{workout.title}</h2>
                            <p className="text-white/90 text-lg">{workout.category}</p>
                          </div>
                          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-white font-semibold">
                            {workout.level}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center gap-2 text-white">
                            <Clock className="w-5 h-5" />
                            <span className="font-semibold">{workout.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-white">
                            <Flame className="w-5 h-5" />
                            <span className="font-semibold">{workout.calories}</span>
                          </div>
                        </div>
                      </div>

                      {/* Exercises List */}
                      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
                        <h3 className="text-2xl font-bold text-white mb-6">Exercícios</h3>
                        <div className="space-y-4">
                          {workout.exercises.map((exercise, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-700"
                            >
                              <div className="flex items-center gap-4">
                                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold">
                                  {index + 1}
                                </div>
                                <div>
                                  <p className="text-white font-semibold">{exercise.name}</p>
                                  <p className="text-slate-400 text-sm">Descanso: {exercise.rest}</p>
                                </div>
                              </div>
                              <div className="text-cyan-400 font-semibold">{exercise.sets}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Start Button */}
                      <button className={`w-full bg-gradient-to-r ${workout.gradient} text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all flex items-center justify-center gap-2`}>
                        <Play className="w-6 h-6" />
                        Iniciar Treino
                      </button>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {workouts.map((workout) => (
                  <div
                    key={workout.id}
                    className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden hover:border-slate-600 transition-all group cursor-pointer"
                    onClick={() => setSelectedWorkout(workout.id)}
                  >
                    <div className={`bg-gradient-to-r ${workout.gradient} p-6`}>
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-2xl font-bold text-white">{workout.title}</h3>
                        <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
                      </div>
                      <p className="text-white/90 mb-4">{workout.category}</p>
                      <div className="flex flex-wrap gap-3">
                        <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg text-white text-sm font-semibold">
                          {workout.level}
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg text-white text-sm flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {workout.duration}
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg text-white text-sm flex items-center gap-1">
                          <Flame className="w-4 h-4" />
                          {workout.calories}
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-slate-400 text-sm mb-4">
                        {workout.exercises.length} exercícios
                      </p>
                      <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2">
                        Ver Detalhes
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* PROGRESS TAB */}
        {activeTab === "progress" && (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Seu Progresso</h1>
              <p className="text-slate-400">Acompanhe sua evolução e conquistas</p>
            </div>

            {/* Monthly Progress */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Progresso Mensal</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300">Treinos Completos</span>
                    <span className="text-white font-bold">47/60</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-600 h-3 rounded-full" style={{ width: "78%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300">Meta de Calorias</span>
                    <span className="text-white font-bold">18.5k/25k</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3">
                    <div className="bg-gradient-to-r from-orange-500 to-red-600 h-3 rounded-full" style={{ width: "74%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300">Dias Ativos</span>
                    <span className="text-white font-bold">23/30</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-600 h-3 rounded-full" style={{ width: "77%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Conquistas</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: "Primeira Semana", desc: "Complete 7 dias seguidos", unlocked: true, color: "from-cyan-500 to-blue-600" },
                  { title: "Guerreiro", desc: "Complete 50 treinos", unlocked: true, color: "from-orange-500 to-red-600" },
                  { title: "Queimador", desc: "Queime 20k calorias", unlocked: false, color: "from-purple-500 to-pink-600" },
                  { title: "Consistente", desc: "30 dias consecutivos", unlocked: false, color: "from-emerald-500 to-teal-600" },
                  { title: "Mestre HIIT", desc: "Complete 25 treinos HIIT", unlocked: true, color: "from-yellow-500 to-orange-600" },
                  { title: "Força Máxima", desc: "Complete 30 treinos de força", unlocked: false, color: "from-blue-500 to-indigo-600" },
                ].map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border transition-all ${
                      achievement.unlocked
                        ? "bg-slate-900/50 border-slate-600"
                        : "bg-slate-900/20 border-slate-800 opacity-50"
                    }`}
                  >
                    <div className={`bg-gradient-to-r ${achievement.color} w-12 h-12 rounded-xl flex items-center justify-center mb-3`}>
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white font-bold mb-1">{achievement.title}</h3>
                    <p className="text-slate-400 text-sm">{achievement.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

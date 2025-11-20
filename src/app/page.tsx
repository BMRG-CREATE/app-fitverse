"use client";

import { useState } from "react";
import { Dumbbell, Zap, Heart, Users, Target, Flower2, Activity } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    id: "forca",
    name: "Exercícios de Força",
    icon: Dumbbell,
    description: "Com peso do corpo, halteres, barra ou máquinas",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "hiit",
    name: "HIIT",
    icon: Zap,
    description: "Alta intensidade, intervalos curtos e explosivos",
    color: "from-orange-500 to-red-500",
  },
  {
    id: "cardio",
    name: "Cardio",
    icon: Heart,
    description: "Para resistência e queima calórica",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "funcional",
    name: "Funcionais",
    icon: Users,
    description: "Movimentos naturais do corpo, habilidade e agilidade",
    color: "from-purple-500 to-indigo-500",
  },
  {
    id: "crossfit",
    name: "CrossFit",
    icon: Target,
    description: "Alta intensidade com força, técnica e condicionamento",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "yoga",
    name: "Yoga",
    icon: Flower2,
    description: "Controle da respiração, mobilidade e alongamento",
    color: "from-violet-500 to-purple-500",
  },
  {
    id: "pilates",
    name: "Pilates",
    icon: Activity,
    description: "Força do core, estabilidade e mobilidade",
    color: "from-cyan-500 to-blue-500",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Treinoteca
              </h1>
            </div>
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Explorar Exercícios
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
          Sua Biblioteca de Exercícios com IA
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-8">
          Descubra como fazer qualquer exercício com descrições detalhadas geradas por inteligência artificial e imagens ilustrativas
        </p>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                href={`/dashboard?category=${category.id}`}
                className="group relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${category.color} mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-slate-800 dark:text-white">
                    {category.name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {category.description}
                  </p>
                </div>

                {/* Arrow Icon */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    className="w-6 h-6 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4 text-center text-slate-600 dark:text-slate-400">
          <p>Treinoteca - Sua biblioteca de exercícios com IA</p>
        </div>
      </footer>
    </div>
  );
}

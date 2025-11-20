"use client";

import { useState } from "react";
import { Dumbbell, ChevronRight, ChevronDown, Folder, FolderOpen, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

type SubCategory = "Com Halteres ou Barra" | "Peso Corporal" | "Com Máquina";

interface Category {
  name: string;
  icon: string;
  subcategories: SubCategory[];
  exercises: {
    [key in SubCategory]: string[];
  };
}

const categories: Category[] = [
  {
    name: "Força",
    icon: "💪",
    subcategories: ["Com Halteres ou Barra", "Peso Corporal", "Com Máquina"],
    exercises: {
      "Com Halteres ou Barra": [
        "Supino Reto com Barra",
        "Agachamento com Barra",
        "Levantamento Terra",
        "Desenvolvimento com Halteres",
        "Rosca Direta com Barra",
        "Remada Curvada com Barra",
      ],
      "Peso Corporal": [
        "Flexões",
        "Pull-ups",
        "Dips",
        "Agachamento Livre",
        "Prancha",
        "Burpees",
      ],
      "Com Máquina": [
        "Leg Press",
        "Puxada Alta",
        "Extensora",
        "Flexora",
        "Cadeira Abdutora",
        "Cadeira Adutora",
      ],
    },
  },
  {
    name: "HIIT",
    icon: "⚡",
    subcategories: ["Com Halteres ou Barra", "Peso Corporal", "Com Máquina"],
    exercises: {
      "Com Halteres ou Barra": [
        "Thrusters com Barra",
        "Swing com Kettlebell",
        "Clean and Press",
        "Snatch com Halteres",
        "Farmer's Walk",
        "Devil Press",
      ],
      "Peso Corporal": [
        "Burpees",
        "Mountain Climbers",
        "Jump Squats",
        "High Knees",
        "Jumping Jacks",
        "Tuck Jumps",
      ],
      "Com Máquina": [
        "Remo Ergométrico",
        "Assault Bike",
        "Ski Erg",
        "Esteira Inclinada Sprint",
        "Battle Ropes",
        "Sled Push",
      ],
    },
  },
  {
    name: "Cardio",
    icon: "🏃",
    subcategories: ["Com Halteres ou Barra", "Peso Corporal", "Com Máquina"],
    exercises: {
      "Com Halteres ou Barra": [
        "Caminhada com Halteres",
        "Step-ups com Halteres",
        "Lunges com Halteres",
        "Farmer's Walk",
        "Overhead Carry",
        "Renegade Rows",
      ],
      "Peso Corporal": [
        "Corrida",
        "Jumping Jacks",
        "High Knees",
        "Butt Kicks",
        "Skipping",
        "Shadow Boxing",
      ],
      "Com Máquina": [
        "Esteira",
        "Bicicleta Ergométrica",
        "Elíptico",
        "Remo Ergométrico",
        "Stepper",
        "Assault Bike",
      ],
    },
  },
  {
    name: "Funcional",
    icon: "🎯",
    subcategories: ["Com Halteres ou Barra", "Peso Corporal", "Com Máquina"],
    exercises: {
      "Com Halteres ou Barra": [
        "Turkish Get-up",
        "Windmill com Kettlebell",
        "Single Leg Deadlift",
        "Overhead Squat",
        "Lunges com Rotação",
        "Wood Chops",
      ],
      "Peso Corporal": [
        "Bear Crawl",
        "Crab Walk",
        "Inchworm",
        "Spider-Man Push-ups",
        "Pistol Squats",
        "Handstand Hold",
      ],
      "Com Máquina": [
        "TRX Rows",
        "TRX Push-ups",
        "Cable Rotations",
        "Cable Chops",
        "Bosu Ball Squats",
        "Suspension Lunges",
      ],
    },
  },
  {
    name: "CrossFit",
    icon: "🔥",
    subcategories: ["Com Halteres ou Barra", "Peso Corporal", "Com Máquina"],
    exercises: {
      "Com Halteres ou Barra": [
        "Clean and Jerk",
        "Snatch",
        "Thrusters",
        "Overhead Squat",
        "Front Squat",
        "Sumo Deadlift High Pull",
      ],
      "Peso Corporal": [
        "Muscle-ups",
        "Handstand Push-ups",
        "Pistol Squats",
        "Toes to Bar",
        "Box Jumps",
        "Double Unders",
      ],
      "Com Máquina": [
        "Remo Ergométrico",
        "Assault Bike",
        "Ski Erg",
        "GHD Sit-ups",
        "Wall Ball",
        "Sled Push/Pull",
      ],
    },
  },
  {
    name: "Yoga",
    icon: "🧘",
    subcategories: ["Com Halteres ou Barra", "Peso Corporal", "Com Máquina"],
    exercises: {
      "Com Halteres ou Barra": [
        "Warrior Pose com Halteres",
        "Goddess Pose com Peso",
        "Chair Pose com Halteres",
        "Lunge com Twist e Peso",
        "Side Bend com Haltere",
        "Squat com Haltere Overhead",
      ],
      "Peso Corporal": [
        "Saudação ao Sol",
        "Warrior I, II, III",
        "Downward Dog",
        "Upward Dog",
        "Tree Pose",
        "Child's Pose",
      ],
      "Com Máquina": [
        "Yoga com Blocos",
        "Yoga com Strap",
        "Yoga com Roda",
        "Yoga com Bolster",
        "Yoga Wall",
        "Aerial Yoga",
      ],
    },
  },
  {
    name: "Pilates",
    icon: "🤸",
    subcategories: ["Com Halteres ou Barra", "Peso Corporal", "Com Máquina"],
    exercises: {
      "Com Halteres ou Barra": [
        "Chest Press com Halteres",
        "Leg Circles com Peso",
        "Side Leg Lifts com Caneleira",
        "Arm Circles com Halteres",
        "Standing Roll Down com Peso",
        "Plank com Halteres",
      ],
      "Peso Corporal": [
        "The Hundred",
        "Roll Up",
        "Single Leg Stretch",
        "Double Leg Stretch",
        "Spine Stretch",
        "Swan Dive",
      ],
      "Com Máquina": [
        "Reformer Footwork",
        "Reformer Long Stretch",
        "Cadillac Roll Down",
        "Wunda Chair Pike",
        "Ladder Barrel Stretch",
        "Magic Circle Squeeze",
      ],
    },
  },
];

export default function BibliotecaPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedSubcategory, setExpandedSubcategory] = useState<{
    category: string;
    subcategory: SubCategory;
  } | null>(null);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategory(expandedCategory === categoryName ? null : categoryName);
    setExpandedSubcategory(null);
  };

  const toggleSubcategory = (categoryName: string, subcategoryName: SubCategory) => {
    if (
      expandedSubcategory?.category === categoryName &&
      expandedSubcategory?.subcategory === subcategoryName
    ) {
      setExpandedSubcategory(null);
    } else {
      setExpandedSubcategory({ category: categoryName, subcategory: subcategoryName });
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F0F0]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#FFFFFF] backdrop-blur-lg border-b border-[#2C3E50]/10 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-[#2C3E50] p-2 rounded-xl">
                <Dumbbell className="w-6 h-6 text-[#FFFFFF]" />
              </div>
              <span className="text-2xl font-bold text-[#2C3E50]">FitVerse</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-[#2C3E50] hover:text-[#ADD8E6] transition-colors">
                Início
              </Link>
              <Link
                href="/treinoteca"
                className="text-[#2C3E50] hover:text-[#ADD8E6] transition-colors"
              >
                Treinoteca
              </Link>
              <Link
                href="/biblioteca"
                className="text-[#ADD8E6] font-semibold transition-colors"
              >
                Biblioteca
              </Link>
              <Link href="/auth">
                <Button className="bg-[#ADD8E6] hover:bg-[#ADD8E6]/80 text-[#2C3E50] font-semibold">
                  Começar Grátis
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-[#2C3E50]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FFFFFF] border-t border-[#2C3E50]/10">
            <div className="px-4 py-4 space-y-3">
              <Link
                href="/"
                className="block text-[#2C3E50] hover:text-[#ADD8E6] transition-colors py-2"
              >
                Início
              </Link>
              <Link
                href="/treinoteca"
                className="block text-[#2C3E50] hover:text-[#ADD8E6] transition-colors py-2"
              >
                Treinoteca
              </Link>
              <Link
                href="/biblioteca"
                className="block text-[#ADD8E6] font-semibold transition-colors py-2"
              >
                Biblioteca
              </Link>
              <Link href="/auth">
                <Button className="w-full bg-[#ADD8E6] hover:bg-[#ADD8E6]/80 text-[#2C3E50] font-semibold">
                  Começar Grátis
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-[#2C3E50] mb-4">
              Biblioteca de Treinos
            </h1>
            <p className="text-lg text-[#2C3E50]/70 max-w-2xl mx-auto">
              Explore exercícios organizados por categoria e tipo de equipamento
            </p>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            {categories.map((category) => (
              <Card
                key={category.name}
                className="bg-[#FFFFFF] border-[#ADD8E6] overflow-hidden"
              >
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.name)}
                  className="w-full p-6 flex items-center justify-between hover:bg-[#F0F0F0] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {expandedCategory === category.name ? (
                      <FolderOpen className="w-6 h-6 text-[#ADD8E6]" />
                    ) : (
                      <Folder className="w-6 h-6 text-[#2C3E50]" />
                    )}
                    <span className="text-2xl">{category.icon}</span>
                    <h2 className="text-xl font-bold text-[#2C3E50]">{category.name}</h2>
                  </div>
                  {expandedCategory === category.name ? (
                    <ChevronDown className="w-6 h-6 text-[#2C3E50]" />
                  ) : (
                    <ChevronRight className="w-6 h-6 text-[#2C3E50]" />
                  )}
                </button>

                {/* Subcategories */}
                {expandedCategory === category.name && (
                  <div className="border-t border-[#ADD8E6]/30">
                    {category.subcategories.map((subcategory) => (
                      <div key={subcategory} className="border-b border-[#ADD8E6]/20 last:border-b-0">
                        {/* Subcategory Header */}
                        <button
                          onClick={() => toggleSubcategory(category.name, subcategory)}
                          className="w-full p-4 pl-16 flex items-center justify-between hover:bg-[#F0F0F0] transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <Folder className="w-5 h-5 text-[#FFDAB9]" />
                            <span className="text-lg font-semibold text-[#2C3E50]">
                              {subcategory}
                            </span>
                            <span className="text-sm text-[#2C3E50]/60">
                              ({category.exercises[subcategory].length} exercícios)
                            </span>
                          </div>
                          {expandedSubcategory?.category === category.name &&
                          expandedSubcategory?.subcategory === subcategory ? (
                            <ChevronDown className="w-5 h-5 text-[#2C3E50]" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-[#2C3E50]" />
                          )}
                        </button>

                        {/* Exercises List */}
                        {expandedSubcategory?.category === category.name &&
                          expandedSubcategory?.subcategory === subcategory && (
                            <div className="bg-[#F0F0F0] p-4 pl-20">
                              <ul className="space-y-2">
                                {category.exercises[subcategory].map((exercise, index) => (
                                  <li
                                    key={index}
                                    className="flex items-center gap-3 p-3 bg-[#FFFFFF] rounded-lg hover:bg-[#ADD8E6]/10 transition-colors cursor-pointer"
                                  >
                                    <div className="w-2 h-2 bg-[#ADD8E6] rounded-full"></div>
                                    <span className="text-[#2C3E50]">{exercise}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* Info Card */}
          <Card className="bg-[#ADD8E6] border-[#ADD8E6] p-8 text-center mt-12">
            <h3 className="text-2xl font-bold text-[#2C3E50] mb-3">
              Mais de 120 Exercícios Organizados
            </h3>
            <p className="text-[#2C3E50]/80 mb-6">
              Cada categoria possui exercícios específicos para diferentes tipos de equipamento
            </p>
            <Link href="/auth">
              <Button className="bg-[#2C3E50] hover:bg-[#2C3E50]/90 text-[#FFFFFF] font-semibold">
                Começar a Treinar Agora
              </Button>
            </Link>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#2C3E50]/10 py-8 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto text-center text-sm text-[#2C3E50]/70">
          <p>© 2025 FitVerse. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

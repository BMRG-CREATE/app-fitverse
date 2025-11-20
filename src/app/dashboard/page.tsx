"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Sparkles, Loader2, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const exercisesByCategory = {
  forca: {
    "Pernas e glúteos": [
      "Agachamento (Squat)",
      "Agachamento sumô",
      "Afundo / Lunge",
      "Agachamento búlgaro",
      "Leg press",
      "Cadeira extensora",
      "Cadeira abdutora",
      "Levantamento terra (Deadlift)",
      "Terra romeno (RDL)",
      "Elevação pélvica / Hip Thrust",
      "Ponte de glúteo (Glute Bridge)",
      "Panturrilha (Sentado ou em pé)",
    ],
    Peito: [
      "Supino reto, inclinado, declinado",
      "Flexões (Push-ups)",
      "Crucifixo com halteres",
      "Cross-over",
      "Peck Deck",
    ],
    Costas: [
      "Remada curvada",
      "Remada unilateral",
      "Remada baixa",
      "Barra fixa / Pull-ups",
      "Lat Pulldown",
      "Levantamento terra tradicional",
    ],
    Ombros: [
      "Desenvolvimento com halteres / Arnold press",
      "Elevação lateral",
      "Elevação frontal",
      "Remada alta",
    ],
    Braços: [
      "Bíceps rosca direta / martelo / concentrada",
      "Tríceps pulley",
      "Tríceps testa",
      "Tríceps banco",
      "Paralelas",
    ],
    Abdômen: [
      "Prancha",
      "Elevação de pernas",
      "Abdominal crunch",
      "Abdominal bicicleta",
      "Abdominal infra",
      "Abdominal com peso",
    ],
  },
  hiit: {
    "Todos os exercícios": [
      "Burpees",
      "Jumping jacks",
      "Mountain climbers",
      "Corrida parada / Skipping",
      "Saltos no banco (Box jumps)",
      "High knees",
      "Sprint",
      "Agachamento com salto (Squat jump)",
      "Sprawl",
      "Polichinelo com toque de solo",
      "Sprint com paragem brusca",
      "Battle rope (cordas)",
    ],
  },
  cardio: {
    "Todos os exercícios": [
      "Correr / Trotar",
      "Caminhada",
      "Bicicleta / Spinning",
      "Elíptico",
      "Subida de escada / Stairmaster",
      "Pular corda",
      "Natação",
      "Remo / Rowing",
      "Step",
      "Dança aeróbica",
      "Boxe / Saco de pancada",
    ],
  },
  funcional: {
    "Todos os exercícios": [
      "Kettlebell swing",
      "Farmer walk (caminhada com pesos)",
      "Puxar trenó (Sled pull) ou empurrar",
      "Medicine ball slam",
      "Agilidade com escada de chão (Agility ladder)",
      "Caminhada do urso (Bear crawl)",
      "Caminhada do caranguejo (Crab walk)",
      "Turkish get-up",
      "Wall ball (bola na parede)",
      "Step lateral com banda elástica",
      "Sprints em zig-zag",
      "Levantamento de peso do chão (pegada funcional)",
    ],
  },
  crossfit: {
    "Todos os exercícios": [
      "Thruster",
      "Clean & Jerk",
      "Snatch",
      "Wall ball",
      "Toes to bar",
      "Kettlebell swing",
      "Box jump",
      "Double unders (corda dupla)",
      "Handstand push-ups",
      "Pull-ups / Kipping pull-ups",
      "Muscle-up",
      "Deadlift",
      "Front Squat",
      "Overhead Squat",
      "Burpee box jump",
      "Rope climb (subida na corda)",
      "Row (remo)",
    ],
  },
  yoga: {
    "Todos os exercícios": [
      "Saudação ao Sol (Surya Namaskar)",
      "Postura da montanha (Tadasana)",
      "Cão olhando para baixo (Adho Mukha Svanasana)",
      "Guerreiro I / II / III (Virabhadrasana)",
      "Árvore (Vrikshasana)",
      "Posição da criança (Balasana)",
      "Posição da cobra (Bhujangasana)",
      "Posição da ponte (Setu Bandha)",
      "Posição do pombo (Kapotasana)",
      "Posição do barco (Navasana)",
      "Posição do camelo (Ustrasana)",
      "Posição da prancha",
      "Posição do cadáver / relaxamento final (Savasana)",
    ],
  },
  pilates: {
    "Todos os exercícios": [
      "100s (The Hundred)",
      "Roll up",
      "Roll over",
      "Saw",
      "Teaser",
      "Swan",
      "Swimming",
      "Side kick series",
      "Single leg stretch",
      "Double leg stretch",
      "Spine stretch forward",
      "Bridge com elevação de quadril",
      "Prancha com mobilização",
      "Círculo de pernas (Leg circles)",
      "Pilates com bola — extensão e flexão",
      "Pilates com elástico — puxadas e aberturas",
    ],
  },
};

const categoryNames = {
  forca: "Exercícios de Força",
  hiit: "HIIT",
  cardio: "Cardio",
  funcional: "Funcionais",
  crossfit: "CrossFit",
  yoga: "Yoga",
  pilates: "Pilates",
};

interface ExerciseResult {
  description: string;
  imageUrl?: string;
}

export default function Dashboard() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || "forca";
  
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedExercise, setSelectedExercise] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ExerciseResult | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setSelectedCategory(categoryParam);
    setSelectedSubcategory("");
    setSelectedExercise("");
    setResult(null);
  }, [categoryParam]);

  const subcategories = exercisesByCategory[selectedCategory as keyof typeof exercisesByCategory] || {};
  const exercises = selectedSubcategory ? subcategories[selectedSubcategory] || [] : [];

  const handleSearch = async () => {
    if (!selectedExercise) {
      setError("Por favor, selecione um exercício");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/exercise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          exercise: selectedExercise,
          category: categoryNames[selectedCategory as keyof typeof categoryNames],
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar informações do exercício");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Erro ao buscar informações. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold">
              {categoryNames[selectedCategory as keyof typeof categoryNames]}
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Search Section */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">Buscar Exercício com IA</h2>
            </div>

            <div className="space-y-4">
              {/* Subcategory Select */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Selecione a subcategoria
                </label>
                <div className="relative">
                  <select
                    value={selectedSubcategory}
                    onChange={(e) => {
                      setSelectedSubcategory(e.target.value);
                      setSelectedExercise("");
                      setResult(null);
                    }}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Escolha uma subcategoria...</option>
                    {Object.keys(subcategories).map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Exercise Select */}
              {selectedSubcategory && (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Selecione o exercício
                  </label>
                  <div className="relative">
                    <select
                      value={selectedExercise}
                      onChange={(e) => {
                        setSelectedExercise(e.target.value);
                        setResult(null);
                      }}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Escolha um exercício...</option>
                      {exercises.map((exercise) => (
                        <option key={exercise} value={exercise}>
                          {exercise}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              )}

              {/* Search Button */}
              <button
                onClick={handleSearch}
                disabled={!selectedExercise || loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Gerando com IA...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Buscar com IA
                  </>
                )}
              </button>

              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Results Section */}
          {result && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8 space-y-6">
              <h3 className="text-2xl font-bold mb-4">{selectedExercise}</h3>

              {/* Image */}
              {result.imageUrl && (
                <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <Image
                    src={result.imageUrl}
                    alt={selectedExercise}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              )}

              {/* Description */}
              <div className="prose dark:prose-invert max-w-none">
                <div
                  className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: result.description }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

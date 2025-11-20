"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Dumbbell,
  Copy,
  ArrowLeft,
  Flame,
  Clock,
  Trophy,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

interface Workout {
  id: string;
  exercise: string;
  sets: number;
  reps: number;
  weight: number;
  date: string;
  calories?: number;
}

export default function SharedWorkoutPage() {
  const params = useParams();
  const router = useRouter();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const id = params.id as string;
      // Decodificar o ID do treino compartilhado
      const decodedData = atob(id);
      const parsedWorkouts = JSON.parse(decodedData);
      setWorkouts(parsedWorkouts);
      setLoading(false);
    } catch (err) {
      console.error("Erro ao carregar treino:", err);
      setError(true);
      setLoading(false);
    }
  }, [params.id]);

  const calculateTotalCalories = () => {
    return workouts.reduce((sum, w) => sum + (w.calories || 0), 0);
  };

  const calculateDuration = () => {
    return Math.round(workouts.length * 10);
  };

  const handleCopyWorkout = () => {
    // Copiar treino para área de transferência em formato texto
    const workoutText = workouts
      .map(
        (w) =>
          `${w.exercise}: ${w.sets} séries × ${w.reps} reps × ${w.weight}kg${
            w.calories ? ` (${w.calories} kcal)` : ""
          }`
      )
      .join("\n");

    const fullText = `🏋️ Treino Compartilhado\n\n${workoutText}\n\n📊 Total: ${workouts.length} exercícios | ${calculateDuration()} min | ${calculateTotalCalories()} kcal`;

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F0F0F0] flex items-center justify-center">
        <div className="text-center">
          <div className="bg-[#2C3E50] p-4 rounded-xl inline-block mb-4 animate-pulse">
            <Dumbbell className="w-8 h-8 text-[#FFFFFF]" />
          </div>
          <p className="text-[#2C3E50] font-medium">A carregar treino...</p>
        </div>
      </div>
    );
  }

  if (error || workouts.length === 0) {
    return (
      <div className="min-h-screen bg-[#F0F0F0] flex items-center justify-center p-4">
        <Card className="bg-[#FFFFFF] border-[#ADD8E6] p-8 max-w-md w-full text-center">
          <div className="bg-[#2C3E50] p-4 rounded-xl inline-block mb-4">
            <Dumbbell className="w-8 h-8 text-[#FFFFFF]" />
          </div>
          <h1 className="text-2xl font-bold text-[#2C3E50] mb-2">
            Treino não encontrado
          </h1>
          <p className="text-[#2C3E50]/70 mb-6">
            O link que tentaste aceder é inválido ou expirou.
          </p>
          <Link href="/">
            <Button className="bg-[#2C3E50] hover:bg-[#2C3E50]/90 text-[#FFFFFF]">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Início
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F0F0]">
      {/* Header */}
      <header className="bg-[#FFFFFF] border-b border-[#2C3E50]/10 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-[#2C3E50] p-2 rounded-xl">
                <Dumbbell className="w-5 h-5 text-[#FFFFFF]" />
              </div>
              <span className="text-xl font-bold text-[#2C3E50]">FitVerse</span>
            </Link>
            <Link href="/">
              <Button
                variant="outline"
                className="border-[#2C3E50] text-[#2C3E50] hover:bg-[#2C3E50] hover:text-[#FFFFFF]"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#2C3E50] mb-2">
            Treino Compartilhado 💪
          </h1>
          <p className="text-[#2C3E50]/70">
            Visualiza e copia este treino para a tua rotina
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <Card className="bg-[#FFFFFF] border-[#ADD8E6] p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-[#ADD8E6] p-2 rounded-lg">
                <Trophy className="w-5 h-5 text-[#2C3E50]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#2C3E50]">
                  {workouts.length}
                </p>
                <p className="text-xs text-[#2C3E50]/70">Exercícios</p>
              </div>
            </div>
          </Card>

          <Card className="bg-[#FFFFFF] border-[#ADD8E6] p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-[#2C3E50] p-2 rounded-lg">
                <Clock className="w-5 h-5 text-[#FFFFFF]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#2C3E50]">
                  {calculateDuration()} min
                </p>
                <p className="text-xs text-[#2C3E50]/70">Duração estimada</p>
              </div>
            </div>
          </Card>

          <Card className="bg-[#FFFFFF] border-[#ADD8E6] p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-[#FFDAB9] p-2 rounded-lg">
                <Flame className="w-5 h-5 text-[#2C3E50]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#2C3E50]">
                  {calculateTotalCalories()}
                </p>
                <p className="text-xs text-[#2C3E50]/70">Calorias totais</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Workout List */}
        <Card className="bg-[#FFFFFF] border-[#ADD8E6] p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#2C3E50]">
              Exercícios do Treino
            </h2>
            <Button
              onClick={handleCopyWorkout}
              className={`${
                copied
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-[#ADD8E6] hover:bg-[#ADD8E6]/80"
              } text-[#2C3E50] font-semibold transition-all`}
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar Treino
                </>
              )}
            </Button>
          </div>

          <div className="space-y-4">
            {workouts.map((workout, index) => (
              <div
                key={workout.id}
                className="flex items-center gap-4 p-4 bg-[#F0F0F0] rounded-lg hover:bg-[#ADD8E6]/30 transition-all"
              >
                <div className="bg-[#ADD8E6] p-3 rounded-lg flex-shrink-0">
                  <span className="font-bold text-[#2C3E50]">#{index + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-[#2C3E50] text-lg">
                      {workout.exercise}
                    </h3>
                    {workout.calories && (
                      <span className="inline-flex items-center gap-1 bg-[#FFDAB9] px-2 py-0.5 rounded-full text-xs font-semibold text-[#2C3E50]">
                        <Flame className="w-3 h-3" />
                        {workout.calories} kcal
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[#2C3E50]/70">
                    <span className="font-medium">
                      {workout.sets} séries
                    </span>
                    <span>•</span>
                    <span className="font-medium">
                      {workout.reps} repetições
                    </span>
                    <span>•</span>
                    <span className="font-medium">
                      {workout.weight}kg
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Call to Action */}
        <Card className="bg-[#ADD8E6] border-[#ADD8E6] p-8 text-center">
          <h3 className="text-2xl font-bold text-[#2C3E50] mb-3">
            Gostaste deste treino?
          </h3>
          <p className="text-[#2C3E50]/80 mb-6">
            Cria a tua conta no FitVerse e começa a registar os teus próprios treinos!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/auth">
              <Button className="bg-[#2C3E50] hover:bg-[#2C3E50]/90 text-[#FFFFFF] font-semibold w-full sm:w-auto">
                Criar Conta Grátis
              </Button>
            </Link>
            <Link href="/">
              <Button
                variant="outline"
                className="border-[#2C3E50] text-[#2C3E50] hover:bg-[#2C3E50] hover:text-[#FFFFFF] w-full sm:w-auto"
              >
                Saber Mais
              </Button>
            </Link>
          </div>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-[#FFFFFF] border-t border-[#2C3E50]/10 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 text-center">
          <p className="text-sm text-[#2C3E50]/70">
            © 2024 FitVerse. Transforma o teu corpo, transforma a tua vida.
          </p>
        </div>
      </footer>
    </div>
  );
}

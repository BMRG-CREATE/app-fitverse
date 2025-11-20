"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Dumbbell, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [view, setView] = useState<"sign_in" | "sign_up">("sign_in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      if (view === "sign_in") {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        if (data.session) {
          setMessage("Login bem-sucedido! A redirecionar...");
          // Aguarda um pouco para garantir que a sessão foi salva
          await new Promise(resolve => setTimeout(resolve, 500));
          router.push("/dashboard");
          router.refresh(); // Força atualização da rota
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        if (data.user) {
          setMessage("Conta criada! Verifica o teu email para confirmares.");
        }
      }
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro. Tenta novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-red-600 p-2 rounded-xl shadow-lg">
            <Dumbbell className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            FitVerse
          </span>
        </Link>

        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-orange-200">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {view === "sign_in" ? "Bem-vindo de volta!" : "Cria a tua conta"}
            </h1>
            <p className="text-gray-600">
              {view === "sign_in"
                ? "Entra para continuar a tua jornada fitness"
                : "Junta-te à comunidade FitVerse"}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 bg-orange-50 p-1 rounded-lg">
            <button
              onClick={() => {
                setView("sign_in");
                setError("");
                setMessage("");
              }}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                view === "sign_in"
                  ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Entrar
            </button>
            <button
              onClick={() => {
                setView("sign_up");
                setError("");
                setMessage("");
              }}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                view === "sign_up"
                  ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Registar
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleAuth} className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="O teu email"
                required
                className="w-full px-4 py-2 border-2 border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 bg-white placeholder-gray-400"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Palavra-passe
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="A tua palavra-passe"
                  required
                  minLength={6}
                  className="w-full px-4 py-2 border-2 border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 bg-white placeholder-gray-400 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border-2 border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {message && (
              <div className="p-3 bg-green-50 border-2 border-green-200 rounded-lg">
                <p className="text-sm text-green-600">{message}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {view === "sign_in" ? "A entrar..." : "A registar..."}
                </>
              ) : (
                <>{view === "sign_in" ? "Entrar" : "Registar"}</>
              )}
            </button>

            {/* Forgot Password */}
            {view === "sign_in" && (
              <div className="text-center">
                <Link
                  href="/auth/reset-password"
                  className="text-sm text-orange-600 hover:text-orange-700 transition-colors font-medium"
                >
                  Esqueceste-te da palavra-passe?
                </Link>
              </div>
            )}
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              Ao continuar, concordas com os nossos{" "}
              <Link
                href="/terms"
                className="text-orange-600 hover:text-orange-700 transition-colors font-medium"
              >
                Termos de Serviço
              </Link>{" "}
              e{" "}
              <Link
                href="/privacy"
                className="text-orange-600 hover:text-orange-700 transition-colors font-medium"
              >
                Política de Privacidade
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-800 transition-colors text-sm font-medium"
          >
            ← Voltar à página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}

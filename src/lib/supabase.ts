import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Validação para evitar erro em tempo de execução
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Variáveis de ambiente do Supabase não configuradas. Configure em: Configurações do Projeto → Integrações → Supabase');
}

// Cliente Supabase com persistência de sessão habilitada
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true, // ✅ HABILITADO: Mantém sessão após login
        autoRefreshToken: true, // ✅ HABILITADO: Renova token automaticamente
        detectSessionInUrl: true, // ✅ HABILITADO: Detecta sessão na URL
        storage: typeof window !== 'undefined' ? window.localStorage : undefined, // Usa localStorage no browser
      }
    })
  : null;

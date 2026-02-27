import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const getRequiredEnvVar = (name: 'VITE_SUPABASE_URL' | 'VITE_SUPABASE_ANON_KEY'): string => {
  const value = import.meta.env[name];

  if (!value) {
    throw new Error(
      `[supabase] Missing required environment variable: ${name}. ` +
        'Set it in your .env file (or hosting provider env settings) and restart the app.',
    );
  }

  return value;
};

const supabaseUrl = getRequiredEnvVar('VITE_SUPABASE_URL');
const supabaseAnonKey = getRequiredEnvVar('VITE_SUPABASE_ANON_KEY');

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

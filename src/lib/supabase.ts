import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qjzjfecpixnpkrilxcel.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqempmZWNwaXhucGtyaWx4Y2VsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNzc4NjIsImV4cCI6MjA3ODY1Mzg2Mn0.G0Dx5zRWJi4E-TeLaNdFaaw1YBaAHBj1OhH6NpAAOzY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

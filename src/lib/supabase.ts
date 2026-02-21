import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://isbicrdzbyxeckyckrmg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzYmljcmR6Ynl4ZWNreWNrcm1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2NTY5OTYsImV4cCI6MjA4NjIzMjk5Nn0.M4avMb2K21Dvub6lyYuvDbN_6lIXB_8Z9GR83D5lifc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

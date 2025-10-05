import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://slaqlygrjlkhuxrfxtjq.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsYXFseWdyamxraHV4cmZ4dGpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2NTUzMDksImV4cCI6MjA3NTIzMTMwOX0.tS3NfNsX6mZNER9uROkR3EYzkDSwmRbOZpFTWYXTh58';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

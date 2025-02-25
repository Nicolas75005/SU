import { createClient } from '@supabase/supabase-js';
import { Database } from '../../types/database';

const supabaseUrl = 'https://xeljwohleuetiggezshn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlbGp3b2hsZXVldGlnZ2V6c2huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4Mzk5OTgsImV4cCI6MjA0OTQxNTk5OH0.NvRZ5USNxLmAX4Bv5cZ_OWSgnSebV1zicqdfj0Obv_4';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  return session;
};

export const onAuthStateChange = (callback: (session: any) => void) => {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });
};
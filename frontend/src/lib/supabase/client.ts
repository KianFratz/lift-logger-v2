import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;


export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  // store token in local storage so that users stays logged in even after refresh, 
  // User stays logged in even if browser is closed and reopened
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});

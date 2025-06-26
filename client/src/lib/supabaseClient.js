import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://zgmlaxypbaqjyxeppwxw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpnbWxheHlwYmFxanl4ZXBwd3h3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5MjUyMzQsImV4cCI6MjA2NjUwMTIzNH0.1UqGAtavkUuIhuKxw_vYmF6IjMI90Ts8VHb_FiG4ZnM'
)
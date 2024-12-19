import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://cdjzuzmndmrccqykrtfu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkanp1em1uZG1yY2NxeWtydGZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ0NjEzNjUsImV4cCI6MjA1MDAzNzM2NX0.jA9x1PJxAyGNGrVTvoa3GZzsJ_4DxkjVBvkfG3MTuzs'
);

export { supabase };

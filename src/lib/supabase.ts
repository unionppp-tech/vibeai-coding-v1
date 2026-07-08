import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase 환경변수가 설정되지 않았습니다. .env.local 파일의 NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY 값을 확인해주세요."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const COURSE_OPTIONS = ["입문반", "실전반", "심화반"] as const;
export type Course = (typeof COURSE_OPTIONS)[number];

export type Application = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  department: string | null;
  course: Course;
  message: string | null;
};

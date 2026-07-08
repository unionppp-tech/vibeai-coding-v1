import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cachedClient: SupabaseClient | null = null;

// 모듈이 import되는 시점(빌드 중 페이지 데이터 수집 포함)에는 아무 것도 하지 않고,
// 실제로 Supabase에 접근하는 순간에만 클라이언트를 생성한다.
export function getSupabase(): SupabaseClient {
  if (cachedClient) return cachedClient;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Supabase 환경변수가 설정되지 않았습니다. NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY 값을 확인해주세요."
    );
  }

  cachedClient = createClient(supabaseUrl, supabaseAnonKey);
  return cachedClient;
}

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

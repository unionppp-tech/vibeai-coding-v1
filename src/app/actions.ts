"use server";

import { COURSE_OPTIONS, getSupabase, type Course } from "@/lib/supabase";
import type { ApplicationFormState } from "@/lib/application-form";

export async function submitApplication(
  _prevState: ApplicationFormState,
  formData: FormData
): Promise<ApplicationFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const department = String(formData.get("department") ?? "").trim();
  const course = String(formData.get("course") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email) {
    return { status: "error", message: "이름과 이메일은 필수 입력 항목입니다." };
  }

  if (!COURSE_OPTIONS.includes(course as Course)) {
    return { status: "error", message: "신청 과정을 올바르게 선택해주세요." };
  }

  try {
    const { error } = await getSupabase().from("applications").insert({
      name,
      email,
      department: department || null,
      course,
      message: message || null,
    });

    if (error) {
      return {
        status: "error",
        message: "신청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      };
    }

    return { status: "success" };
  } catch {
    return {
      status: "error",
      message: "신청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    };
  }
}
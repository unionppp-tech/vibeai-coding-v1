"use client";

import { useActionState } from "react";
import { COURSE_OPTIONS } from "@/lib/supabase";
import {
  initialApplicationFormState,
  submitApplication,
} from "./actions";

export default function Home() {
  const [state, formAction, pending] = useActionState(
    submitApplication,
    initialApplicationFormState
  );

  return (
    <main className="flex min-h-screen flex-1 items-center justify-center bg-gradient-to-b from-blue-50 via-white to-white px-4 py-10">
      <div className="w-full max-w-md">
        <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-xl shadow-blue-100/50">
          <div className="bg-blue-600 px-6 py-8 text-center">
            <h1 className="text-2xl font-bold text-white">
              바이브 AI 교육 신청
            </h1>
            <p className="mt-2 text-sm text-blue-100">
              아래 정보를 입력하고 신청을 완료해주세요.
            </p>
          </div>

          <div className="px-6 py-8">
            {state.status === "success" ? (
              <SuccessMessage />
            ) : (
              <form action={formAction} className="space-y-5">
                <Field label="이름" htmlFor="name" required>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="홍길동"
                    className="input"
                  />
                </Field>

                <Field label="이메일" htmlFor="email" required>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="example@email.com"
                    className="input"
                  />
                </Field>

                <Field label="소속 부서" htmlFor="department">
                  <input
                    id="department"
                    name="department"
                    type="text"
                    placeholder="예: 기획팀"
                    className="input"
                  />
                </Field>

                <Field label="신청 과정" htmlFor="course" required>
                  <select
                    id="course"
                    name="course"
                    required
                    defaultValue={COURSE_OPTIONS[0]}
                    className="input"
                  >
                    {COURSE_OPTIONS.map((course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="하고 싶은 말" htmlFor="message">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="궁금한 점이나 전달하고 싶은 내용을 자유롭게 적어주세요."
                    className="input resize-none"
                  />
                </Field>

                {state.status === "error" && (
                  <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                    {state.message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={pending}
                  className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {pending ? "신청 처리 중..." : "신청하기"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span className="ml-0.5 text-blue-600">*</span>}
      </label>
      {children}
    </div>
  );
}

function SuccessMessage() {
  return (
    <div className="flex flex-col items-center py-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-7 w-7 text-blue-600"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>
      <h2 className="mt-4 text-lg font-semibold text-gray-900">
        신청이 완료되었습니다
      </h2>
      <p className="mt-2 text-sm text-gray-500">
        담당자 확인 후 안내드리겠습니다. 감사합니다.
      </p>
    </div>
  );
}

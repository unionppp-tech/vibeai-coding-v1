import { getSupabase, type Application } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  let applications: Application[] = [];
  let errorMessage: string | null = null;

  try {
    const { data, error } = await getSupabase()
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      errorMessage = error.message;
    } else {
      applications = (data ?? []) as Application[];
    }
  } catch (err) {
    errorMessage =
      err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.";
  }

  const total = applications.length;

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white px-4 py-10">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-6 flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-gray-900">
            교육 신청 내역 관리
          </h1>
          <p className="text-sm text-gray-500">
            바이브 AI 교육 신청 현황을 확인할 수 있습니다.
          </p>
        </div>

        <div className="mb-6 inline-flex items-center gap-2 rounded-xl border border-blue-100 bg-white px-5 py-4 shadow-sm">
          <span className="text-sm font-medium text-gray-500">
            총 신청 인원
          </span>
          <span className="text-2xl font-bold text-blue-600">{total}</span>
          <span className="text-sm font-medium text-gray-500">명</span>
        </div>

        {errorMessage && (
          <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            신청 내역을 불러오는 중 오류가 발생했습니다: {errorMessage}
          </p>
        )}

        <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-blue-100 bg-blue-50 text-gray-600">
                  <th className="whitespace-nowrap px-4 py-3 font-semibold">
                    신청일시
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 font-semibold">
                    이름
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 font-semibold">
                    이메일
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 font-semibold">
                    소속 부서
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 font-semibold">
                    신청 과정
                  </th>
                  <th className="px-4 py-3 font-semibold">하고 싶은 말</th>
                </tr>
              </thead>
              <tbody>
                {applications.length === 0 && !errorMessage ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-10 text-center text-gray-400"
                    >
                      아직 접수된 신청이 없습니다.
                    </td>
                  </tr>
                ) : (
                  applications.map((app) => (
                    <tr
                      key={app.id}
                      className="border-b border-gray-100 last:border-0 hover:bg-blue-50/40"
                    >
                      <td className="whitespace-nowrap px-4 py-3 text-gray-500">
                        {formatDate(app.created_at)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">
                        {app.name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-gray-600">
                        {app.email}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-gray-600">
                        {app.department || "-"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700">
                          {app.course}
                        </span>
                      </td>
                      <td className="max-w-xs px-4 py-3 text-gray-600">
                        {app.message || "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

function formatDate(value: string) {
  return new Date(value).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

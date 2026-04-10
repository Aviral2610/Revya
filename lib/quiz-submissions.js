import { ensurePortalProfileForUser, normalizePortalEmail } from "@/lib/portal-profile";
import { getEligibilityRoute } from "@/lib/quiz/routing";
import { createSupabaseAdminClient, isSupabaseAdminConfigured } from "@/lib/supabase/server";

const QUIZ_SUBMISSIONS_TABLE = "quiz_submissions";

function sanitizeAnswers(answers) {
  if (!answers || typeof answers !== "object" || Array.isArray(answers)) {
    return null;
  }

  return JSON.parse(JSON.stringify(answers));
}

export async function createQuizSubmissionForUser({ answers, user }) {
  if (!isSupabaseAdminConfigured()) {
    throw new Error("Supabase admin client is not configured.");
  }

  const sanitizedAnswers = sanitizeAnswers(answers);

  if (!sanitizedAnswers) {
    throw new Error("Quiz answers are required.");
  }

  const result = getEligibilityRoute(sanitizedAnswers);
  const patientProfile = await ensurePortalProfileForUser({ user });
  const supabase = createSupabaseAdminClient();
  const insertResult = await supabase.from(QUIZ_SUBMISSIONS_TABLE).insert({
    patient_profile_id: patientProfile?.id ?? null,
    auth_user_id: user?.id ?? null,
    email: normalizePortalEmail(user?.email),
    answers: sanitizedAnswers,
    route_result: result,
    eligibility_route: result.route,
    submitted_at: new Date().toISOString()
  });

  if (insertResult.error) {
    throw insertResult.error;
  }

  const submission = Array.isArray(insertResult.data)
    ? (insertResult.data[0] ?? null)
    : insertResult.data;

  return {
    patientProfileId: patientProfile?.id ?? null,
    result,
    submission
  };
}

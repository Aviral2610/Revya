import { NextResponse } from "next/server";

import { requireLivePortalData, requireProtectedPortalSession } from "@/lib/portal-auth";
import { createQuizSubmissionForUser } from "@/lib/quiz-submissions";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request) {
  const auth = await requireProtectedPortalSession();

  if (auth.response) {
    return auth.response;
  }

  const liveDataResponse = requireLivePortalData();

  if (liveDataResponse) {
    return liveDataResponse;
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: "INVALID_JSON",
        message: "Request body must be valid JSON."
      },
      { status: 400 }
    );
  }

  if (!body?.answers || typeof body.answers !== "object" || Array.isArray(body.answers)) {
    return NextResponse.json(
      {
        error: "INVALID_QUIZ_ANSWERS",
        message: "Provide quiz answers as an object under the `answers` key."
      },
      { status: 400 }
    );
  }

  try {
    const { patientProfileId, result, submission } = await createQuizSubmissionForUser({
      answers: body.answers,
      user: auth.session.user
    });

    return NextResponse.json(
      {
        patientProfileId,
        result,
        submissionId: submission?.id ?? null
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Unable to save quiz submission.", error);

    return NextResponse.json(
      {
        error: "QUIZ_SUBMISSION_FAILED",
        message: "Unable to save the quiz submission."
      },
      { status: 500 }
    );
  }
}

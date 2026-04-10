import { NextResponse } from "next/server";

import { requireLivePortalData, requireProtectedPortalSession } from "@/lib/portal-auth";
import { buildPortalSummary, getRequiredPortalProfileForUser } from "@/lib/portal-profile";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const auth = await requireProtectedPortalSession();

  if (auth.response) {
    return auth.response;
  }

  const liveDataResponse = requireLivePortalData();

  if (liveDataResponse) {
    return liveDataResponse;
  }

  try {
    const patient = await getRequiredPortalProfileForUser(auth.session.user);

    return NextResponse.json({
      summary: buildPortalSummary(patient)
    });
  } catch (error) {
    console.error("Unable to load portal summary.", error);

    return NextResponse.json(
      {
        error: "PORTAL_SUMMARY_LOAD_FAILED",
        message: "Unable to load the portal summary from Supabase."
      },
      { status: 500 }
    );
  }
}

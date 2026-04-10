import { NextResponse } from "next/server";

import { getServerAuthSession, isGoogleAuthEnabled } from "@/lib/auth";
import { isSupabaseAdminConfigured } from "@/lib/supabase/server";

export async function requireProtectedPortalSession() {
  if (!isGoogleAuthEnabled()) {
    return {
      response: NextResponse.json(
        {
          error: "AUTH_PROVIDER_NOT_CONFIGURED",
          message:
            "Protected portal APIs stay disabled until GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and NEXTAUTH_SECRET are configured."
        },
        { status: 503 }
      )
    };
  }

  const session = await getServerAuthSession();

  if (!session?.user?.email) {
    return {
      response: NextResponse.json(
        {
          error: "UNAUTHORIZED",
          message: "Sign in to access this portal resource."
        },
        { status: 401 }
      )
    };
  }

  return { session };
}

export function requireLivePortalData() {
  if (isSupabaseAdminConfigured()) {
    return null;
  }

  return NextResponse.json(
    {
      error: "SUPABASE_NOT_CONFIGURED",
      message:
        "NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required for live portal data."
    },
    { status: 503 }
  );
}

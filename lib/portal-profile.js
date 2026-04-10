import { createSupabaseAdminClient, isSupabaseAdminConfigured } from "@/lib/supabase/server";
import { mockPatient } from "@/lib/site-data";

const PATIENT_PROFILES_TABLE = "patient_profiles";

function formatMemberSince(dateValue = new Date()) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC"
  }).format(dateValue);
}

function buildPatientFallback(user = {}) {
  const normalizedEmail = normalizePortalEmail(user.email);

  return {
    id: user.id ?? "demo-preview",
    authUserId: user.id ?? null,
    email: normalizedEmail || null,
    name: user.name ?? mockPatient.name,
    image: user.image ?? null,
    memberSince: mockPatient.memberSince,
    medication: mockPatient.medication,
    dosage: mockPatient.dosage,
    startWeight: mockPatient.startWeight,
    currentWeight: mockPatient.currentWeight,
    targetWeight: mockPatient.targetWeight,
    lossToDate: mockPatient.lossToDate,
    nextRefillDate: mockPatient.nextRefillDate,
    refillEligible: mockPatient.refillEligible,
    shipmentStatus: mockPatient.shipmentStatus,
    nextAppointment: mockPatient.nextAppointment,
    labsStatus: mockPatient.labsStatus,
    billingAmount: mockPatient.billingAmount
  };
}

function mapPatientProfile(row = {}, user = {}) {
  const fallback = buildPatientFallback(user);

  return {
    ...fallback,
    id: row.id ?? fallback.id,
    authUserId: row.auth_user_id ?? fallback.authUserId,
    email: row.email ?? fallback.email,
    name: row.full_name ?? fallback.name,
    image: row.avatar_url ?? fallback.image,
    memberSince: row.member_since ?? fallback.memberSince,
    medication: row.medication ?? fallback.medication,
    dosage: row.dosage ?? fallback.dosage,
    startWeight: row.start_weight ?? fallback.startWeight,
    currentWeight: row.current_weight ?? fallback.currentWeight,
    targetWeight: row.target_weight ?? fallback.targetWeight,
    lossToDate: row.loss_to_date ?? fallback.lossToDate,
    nextRefillDate: row.next_refill_date ?? fallback.nextRefillDate,
    refillEligible: row.refill_eligible ?? fallback.refillEligible,
    shipmentStatus: row.shipment_status ?? fallback.shipmentStatus,
    nextAppointment: row.next_appointment ?? fallback.nextAppointment,
    labsStatus: row.labs_status ?? fallback.labsStatus,
    billingAmount: row.billing_amount ?? fallback.billingAmount
  };
}

export function normalizePortalEmail(email) {
  if (typeof email !== "string") {
    return "";
  }

  return email.trim().toLowerCase();
}

async function findPatientProfileRowByUser(user = {}) {
  const authUserId = typeof user.id === "string" && user.id.trim() ? user.id.trim() : null;
  const normalizedEmail = normalizePortalEmail(user.email);
  const supabase = createSupabaseAdminClient();

  if (authUserId) {
    const byAuthUserId = await supabase.from(PATIENT_PROFILES_TABLE).maybeSingle({
      filters: {
        auth_user_id: authUserId
      }
    });

    if (byAuthUserId.error || byAuthUserId.data) {
      return byAuthUserId;
    }
  }

  if (!normalizedEmail) {
    return {
      data: null,
      error: null
    };
  }

  return supabase.from(PATIENT_PROFILES_TABLE).maybeSingle({
    filters: {
      email: normalizedEmail
    }
  });
}

export async function ensurePortalProfileForUser({ account, user }) {
  if (!user?.email || !isSupabaseAdminConfigured()) {
    return null;
  }

  const existingProfile = await findPatientProfileRowByUser(user);

  if (existingProfile.error) {
    throw existingProfile.error;
  }

  const normalizedEmail = normalizePortalEmail(user.email);
  const supabase = createSupabaseAdminClient();
  const payload = {
    auth_user_id:
      account?.providerAccountId ??
      existingProfile.data?.auth_user_id ??
      user.id ??
      null,
    email: normalizedEmail,
    full_name: user.name ?? existingProfile.data?.full_name ?? normalizedEmail,
    avatar_url: user.image ?? existingProfile.data?.avatar_url ?? null,
    member_since: existingProfile.data?.member_since ?? formatMemberSince()
  };
  const result = await supabase.from(PATIENT_PROFILES_TABLE).upsert(payload, {
    onConflict: "email"
  });

  if (result.error) {
    throw result.error;
  }

  return result.data?.[0] ?? null;
}

export async function getRequiredPortalProfileForUser(user) {
  if (!user?.email) {
    throw new Error("A signed-in user email is required to load the portal profile.");
  }

  if (!isSupabaseAdminConfigured()) {
    throw new Error("Supabase admin client is not configured.");
  }

  const result = await findPatientProfileRowByUser(user);

  if (result.error) {
    throw result.error;
  }

  if (result.data) {
    return mapPatientProfile(result.data, user);
  }

  const createdProfile = await ensurePortalProfileForUser({ user });

  if (createdProfile) {
    return mapPatientProfile(createdProfile, user);
  }

  const refreshedResult = await findPatientProfileRowByUser(user);

  if (refreshedResult.error) {
    throw refreshedResult.error;
  }

  if (!refreshedResult.data) {
    throw new Error("Patient profile could not be created.");
  }

  return mapPatientProfile(refreshedResult.data, user);
}

export async function getPortalProfileForUser(user) {
  if (!user?.email) {
    return buildPatientFallback(user);
  }

  if (!isSupabaseAdminConfigured()) {
    return buildPatientFallback(user);
  }

  try {
    return await getRequiredPortalProfileForUser(user);
  } catch (error) {
    console.error("Unable to load patient profile from Supabase.", error);
    return buildPatientFallback(user);
  }
}

export function buildPortalSummary(patient) {
  return {
    patientId: patient.id,
    name: patient.name,
    email: patient.email,
    memberSince: patient.memberSince,
    currentDose: patient.dosage.replace(/^Current dose:\s*/i, ""),
    medication: patient.medication,
    currentWeight: patient.currentWeight,
    targetWeight: patient.targetWeight,
    lossToDate: patient.lossToDate,
    refillEligible: patient.refillEligible,
    nextReviewDate: patient.nextRefillDate,
    shipmentStatus: patient.shipmentStatus,
    nextAppointment: patient.nextAppointment,
    billingAmount: patient.billingAmount
  };
}

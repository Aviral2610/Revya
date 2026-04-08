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
  return {
    id: user.id ?? "demo-preview",
    authUserId: user.id ?? null,
    email: user.email ?? null,
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

export async function ensurePortalProfileForUser({ account, user }) {
  if (!user?.email || !isSupabaseAdminConfigured()) {
    return null;
  }

  const supabase = createSupabaseAdminClient();
  const payload = {
    auth_user_id: account?.providerAccountId ?? user.id ?? null,
    email: user.email,
    full_name: user.name ?? user.email,
    avatar_url: user.image ?? null,
    member_since: formatMemberSince()
  };
  const result = await supabase.from(PATIENT_PROFILES_TABLE).upsert(payload, {
    onConflict: "email"
  });

  if (result.error) {
    throw result.error;
  }

  return result.data?.[0] ?? null;
}

export async function getPortalProfileForUser(user) {
  if (!user?.email) {
    return buildPatientFallback(user);
  }

  if (!isSupabaseAdminConfigured()) {
    return buildPatientFallback(user);
  }

  const supabase = createSupabaseAdminClient();
  const result = await supabase.from(PATIENT_PROFILES_TABLE).maybeSingle({
    filters: {
      email: user.email
    }
  });

  if (result.error) {
    console.error("Unable to load patient profile from Supabase.", result.error);
    return buildPatientFallback(user);
  }

  return mapPatientProfile(result.data, user);
}

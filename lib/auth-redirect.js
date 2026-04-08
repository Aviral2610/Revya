export function normalizeCallbackPath(value, fallback = "/dashboard") {
  if (typeof value !== "string") {
    return fallback;
  }

  if (!value.startsWith("/") || value.startsWith("//")) {
    return fallback;
  }

  return value;
}

export function buildPreviewPath(callbackPath = "/dashboard") {
  const url = new URL(normalizeCallbackPath(callbackPath), "https://revya.local");
  url.searchParams.set("preview", "1");
  return `${url.pathname}${url.search}${url.hash}`;
}

export function getAuthErrorMessage(errorCode) {
  if (!errorCode) {
    return "";
  }

  if (errorCode === "AccessDenied") {
    return "Google sign-in was denied. Try again with an allowed Revya account.";
  }

  if (errorCode === "Configuration") {
    return "Google sign-in is not fully configured yet. Add the auth env vars and try again.";
  }

  if (errorCode === "OAuthAccountNotLinked") {
    return "This Google account is already linked to a different sign-in method.";
  }

  return "We could not complete sign-in. Try again in a moment.";
}

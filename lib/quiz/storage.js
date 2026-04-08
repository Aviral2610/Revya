const STORAGE_KEY = "revya-quiz-session-v3";
const LEGACY_STORAGE_KEYS = ["revya-quiz-session-v2"];

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function loadQuizSession() {
  if (!canUseStorage()) {
    return null;
  }

  try {
    const storageKeys = [STORAGE_KEY, ...LEGACY_STORAGE_KEYS];

    for (const key of storageKeys) {
      const raw = window.localStorage.getItem(key);

      if (!raw) {
        continue;
      }

      const parsed = JSON.parse(raw);

      if (!parsed || typeof parsed !== "object") {
        continue;
      }

      return {
        answers: typeof parsed.answers === "object" && parsed.answers ? parsed.answers : {},
        currentStepId: typeof parsed.currentStepId === "string" ? parsed.currentStepId : null,
        updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : null
      };
    }

    return null;
  } catch (error) {
    console.error("Unable to load saved quiz session.", error);
    return null;
  }
}

export function saveQuizSession({ answers, currentStepId }) {
  if (!canUseStorage()) {
    return null;
  }

  const updatedAt = new Date().toISOString();

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        answers,
        currentStepId,
        updatedAt
      })
    );
  } catch (error) {
    console.error("Unable to save quiz session.", error);
  }

  return updatedAt;
}

export function clearQuizSession() {
  if (!canUseStorage()) {
    return;
  }

  try {
    [STORAGE_KEY, ...LEGACY_STORAGE_KEYS].forEach((key) => {
      window.localStorage.removeItem(key);
    });
  } catch (error) {
    console.error("Unable to clear quiz session.", error);
  }
}

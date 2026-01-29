export type ExpiryStatus = 'expired' | 'soon' | 'fresh';

const DAY_MS = 24 * 60 * 60 * 1000;

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/**
 * Calculates item status based on expiresAt (ISO string).
 * - expired: expiresAt is before today
 * - soon: expires within `soonThresholdDays` days (inclusive)
 * - fresh: otherwise
 */
export function getExpiryStatus(
  expiresAtISO: string,
  soonThresholdDays = 3,
  now = new Date(),
): ExpiryStatus {
  const expiresAt = new Date(expiresAtISO);

  if (Number.isNaN(expiresAt.getTime())) {
    // If parsing fails, treat as fresh to avoid falsely alarming the user.
    return 'fresh';
  }

  const today = startOfDay(now);
  const expDay = startOfDay(expiresAt);

  const diffDays = Math.floor((expDay.getTime() - today.getTime()) / DAY_MS);

  if (diffDays < 0) return 'expired';
  if (diffDays <= soonThresholdDays) return 'soon';
  return 'fresh';
}

export function formatExpiryLabel(status: ExpiryStatus, expiresAtISO: string) {
  // For now: keep it simple and show the ISO date part (YYYY-MM-DD).
  // Later we can format using Intl.DateTimeFormat based on locale.
  const short = expiresAtISO.split('T')[0];

  if (status === 'expired') return `Expired: ${short}`;
  return `Expires: ${short}`;
}

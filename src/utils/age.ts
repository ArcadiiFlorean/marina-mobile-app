// src/utils/age.ts
// -----------------------------------------------------------------------------
// CALCULUL VÂRSTEI BEBELUȘULUI din data nașterii.
// Returnează atât valori numerice (pentru logică) cât și un text prietenos
// ("3 luni și 2 săptămâni") în RO și EN. Refolosit în onboarding + dashboard.
// -----------------------------------------------------------------------------

export interface BabyAge {
  totalDays: number;
  months: number;
  weeks: number; // săptămâni rămase după luni întregi
  days: number; // zile rămase după săptămâni
}

// Calculează vârsta din data nașterii (string ISO) până azi.
export function calculateAge(birthDateISO: string): BabyAge {
  const birth = new Date(birthDateISO);
  const now = new Date();

  // Diferența totală în zile.
  const msPerDay = 1000 * 60 * 60 * 24;
  const totalDays = Math.max(
    0,
    Math.floor((now.getTime() - birth.getTime()) / msPerDay),
  );

  // Luni întregi (aproximativ, pentru afișare).
  let months =
    (now.getFullYear() - birth.getFullYear()) * 12 +
    (now.getMonth() - birth.getMonth());
  if (now.getDate() < birth.getDate()) {
    months -= 1;
  }
  months = Math.max(0, months);

  // Zilele rămase după lunile întregi.
  const afterMonths = new Date(birth);
  afterMonths.setMonth(afterMonths.getMonth() + months);
  const remainingDays = Math.max(
    0,
    Math.floor((now.getTime() - afterMonths.getTime()) / msPerDay),
  );

  const weeks = Math.floor(remainingDays / 7);
  const days = remainingDays % 7;

  return { totalDays, months, weeks, days };
}

// Transformă vârsta într-un text prietenos, în limba dată.
export function formatAge(age: BabyAge, lang: string): string {
  const isRo = lang === "ro";

  // Bebeluș foarte mic — sub o lună.
  if (age.months === 0) {
    if (age.weeks === 0) {
      const d = age.days;
      if (isRo) return d === 1 ? "1 zi" : `${d} zile`;
      return d === 1 ? "1 day" : `${d} days`;
    }
    const w = age.weeks;
    if (isRo) return w === 1 ? "1 săptămână" : `${w} săptămâni`;
    return w === 1 ? "1 week" : `${w} weeks`;
  }

  // Partea cu luni.
  const m = age.months;
  const monthsText = isRo
    ? m === 1
      ? "1 lună"
      : `${m} luni`
    : m === 1
      ? "1 month"
      : `${m} months`;

  // Dacă nu mai sunt săptămâni în plus, afișăm doar lunile.
  if (age.weeks === 0) return monthsText;

  // Luni + săptămâni.
  const w = age.weeks;
  const weeksText = isRo
    ? w === 1
      ? "1 săptămână"
      : `${w} săptămâni`
    : w === 1
      ? "1 week"
      : `${w} weeks`;

  return isRo ? `${monthsText} și ${weeksText}` : `${monthsText} and ${weeksText}`;
}
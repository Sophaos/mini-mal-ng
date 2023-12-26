export function getCurrentSeason(): string {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Month is zero-indexed, so we add 1

  if (currentMonth >= 3 && currentMonth <= 5) {
    return 'spring';
  } else if (currentMonth >= 6 && currentMonth <= 8) {
    return 'summer';
  } else if (currentMonth >= 9 && currentMonth <= 11) {
    return 'fall';
  } else {
    return 'winter';
  }
}

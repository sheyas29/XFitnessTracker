// src/seedEntries.js
// Sample data for testing. Dates are relative to today, so the
// "last 7 days" chart is always populated. A few older entries are
// included on purpose to show they get filtered out of the chart.

const pad = (n) => String(n).padStart(2, '0');

// local YYYY-MM-DD (not toISOString, which uses UTC and can shift the day)
function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// [daysAgo, caloriesIntake, caloriesBurned, description]
const SAMPLE = [
  [21, 2350, 450, 'Weekend hike'],
  [14, 2100, 380, 'Yoga + light lunch'],
  [9, 2280, 320, 'Office day, evening walk'],
  [8, 2450, 520, 'Gym: upper body'],
  [7, 2050, 610, '5k run + salad'],
  [6, 2600, 300, 'Birthday dinner'],
  [5, 1980, 540, 'Cycling to work'],
  [4, 2200, 430, 'Swim 40 min'],
  [3, 1850, 680, 'HIIT session'],
  [3, 320, 0, 'Late-night snack'],
  [2, 2320, 360, 'Meal prep + walk'],
  [1, 2150, 590, 'Morning run + oat bowl'],
  [0, 2400, 470, 'Leg day'],
  [0, 380, 120, 'Smoothie + stretching'],
];

export function seedEntries() {
  return SAMPLE.map(([ago, caloriesIntake, caloriesBurned, description]) => ({
    id: crypto.randomUUID(),
    date: daysAgo(ago),
    caloriesIntake,
    caloriesBurned,
    description,
  }));
}

// Writes the sample data into localStorage (replaces what is there).
export function loadSeedData() {
  localStorage.setItem('healthAndFitness', JSON.stringify(seedEntries()));
}

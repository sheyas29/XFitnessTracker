import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const AMBER = '#FFB547';
const MINT = '#4ADE9C';

// "2026-10-14" -> local Date at midnight (avoids timezone shifts)
function parseLocalDate(str) {
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
}

// Keep only today + the 6 days before it (7 calendar days), merged per day
function getLast7DaysData(entries) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(today);
  start.setDate(today.getDate() - 6);

  const byDay = new Map();

  for (const entry of entries) {
    if (!entry.date) continue;
    const day = parseLocalDate(entry.date);
    if (day < start || day > today) continue;

    const key = entry.date;
    const row = byDay.get(key) ?? {
      time: day.getTime(),
      label: day.toLocaleString('en-US', { day: 'numeric', month: 'short' }),
      caloriesIn: 0,
      caloriesBurnt: 0,
    };
    row.caloriesIn += Number(entry.caloriesIntake) || 0;
    row.caloriesBurnt += Number(entry.caloriesBurned) || 0;
    byDay.set(key, row);
  }

  return [...byDay.values()].sort((a, b) => a.time - b.time);
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-[#2E3B4D] bg-[#0E1318] px-4 py-3 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.7)]">
      <div className="mb-2 text-sm font-bold text-[#F2F5F9]">{label}</div>
      {payload.map((p) => (
        <div
          key={p.dataKey}
          className="flex items-center gap-2 text-[13px] font-semibold text-[#C5CEDA]"
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: p.color }}
            aria-hidden="true"
          />
          {p.name}
          <span
            className="ml-auto pl-4 tabular-nums"
            style={{ color: p.color }}
          >
            {p.value} kcal
          </span>
        </div>
      ))}
    </div>
  );
}

function WeeklyChart({ entries }) {
  const data = getLast7DaysData(entries ?? []);

  // hidden until there is data to show
  if (data.length === 0) return null;

  return (
    <section className="rounded-[22px] border border-[#263243] bg-[#171E27] px-7 py-6">
      <h2 className="mb-5 text-xl font-extrabold tracking-tight text-[#F2F5F9]">
        Weekly Health Trends
      </h2>

      <BarChart
        responsive
        data={data}
        style={{ width: '100%', aspectRatio: 2, maxHeight: '60vh' }}
        margin={{ top: 8, right: 0, left: 0, bottom: 0 }}
        barCategoryGap="28%"
      >
        <CartesianGrid
          stroke="#263243"
          strokeDasharray="4 6"
          vertical={false}
        />
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          tick={{ fill: '#8794A6', fontSize: 12, fontWeight: 600 }}
          tickMargin={10}
        />
        <YAxis
          width="auto"
          tickLine={false}
          axisLine={false}
          tick={{ fill: '#8794A6', fontSize: 12, fontWeight: 600 }}
        />
        <Tooltip
          content={<ChartTooltip />}
          cursor={{ fill: 'rgba(255,255,255,0.04)' }}
        />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ paddingTop: 16 }}
          formatter={(value) => (
            <span style={{ color: '#C5CEDA', fontSize: 13, fontWeight: 600 }}>
              {value}
            </span>
          )}
        />
        <Bar
          dataKey="caloriesIn"
          name="Calories in"
          fill={AMBER}
          radius={[8, 8, 0, 0]}
          maxBarSize={28}
        />
        <Bar
          dataKey="caloriesBurnt"
          name="Calories burnt"
          fill={MINT}
          radius={[8, 8, 0, 0]}
          maxBarSize={28}
        />
      </BarChart>
    </section>
  );
}

export default WeeklyChart;

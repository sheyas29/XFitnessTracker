import { Cell, Pie, PieChart, Tooltip } from 'recharts';

const AMBER = '#FFB547';
const MINT = '#4ADE9C';
const EMPTY = '#263243';

function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const p = payload[0];
  return (
    <div className="rounded-xl border border-[#2E3B4D] bg-[#0E1318] px-4 py-3 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.7)]">
      <div className="flex items-center gap-2 text-[13px] font-semibold text-[#C5CEDA]">
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: p.payload.fill }}
          aria-hidden="true"
        />
        {p.name}
        <span
          className="ml-auto pl-4 tabular-nums"
          style={{ color: p.payload.fill }}
        >
          {p.value.toLocaleString()} kcal
        </span>
      </div>
    </div>
  );
}

function LegendItem({ color, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="h-2.5 w-2.5 rounded-full"
        style={{ background: color }}
        aria-hidden="true"
      />
      <div className="flex flex-col">
        <span className="text-xs font-semibold text-[#9AA7B8]">{label}</span>
        <span className="text-lg font-extrabold leading-tight tabular-nums text-[#F2F5F9]">
          {value.toLocaleString()}{' '}
          <span className="text-xs font-semibold text-[#9AA7B8]">kcal</span>
        </span>
      </div>
    </div>
  );
}

function OverallData({ entries = [] }) {
  const totalIn = entries.reduce(
    (sum, e) => sum + (Number(e.caloriesIntake) || 0),
    0
  );
  const totalBurnt = entries.reduce(
    (sum, e) => sum + (Number(e.caloriesBurned) || 0),
    0
  );
  const hasData = totalIn + totalBurnt > 0;

  // with no data, draw a single grey ring so the chart is still on screen
  const data = hasData
    ? [
        { name: 'Calories in', value: totalIn, fill: AMBER },
        { name: 'Calories burnt', value: totalBurnt, fill: MINT },
      ]
    : [{ name: 'No data', value: 1, fill: EMPTY }];

  return (
    <section className="rounded-[22px] border border-[#263243] bg-[#171E27] px-7 py-6">
      <h2 className="mb-5 text-xl font-extrabold tracking-tight text-[#F2F5F9]">
        Overall Data
      </h2>

      <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-around">
        <div className="relative">
          <PieChart responsive style={{ width: 220, height: 220 }}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius="66%"
              outerRadius="100%"
              paddingAngle={hasData ? 4 : 0}
              cornerRadius={8}
              stroke="none"
              isAnimationActive={hasData}
            >
              {data.map((d) => (
                <Cell key={d.name} fill={d.fill} />
              ))}
            </Pie>
            {hasData && <Tooltip content={<ChartTooltip />} />}
          </PieChart>

          {!hasData && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-10 text-center text-sm font-semibold text-[#8794A6]">
              No data yet
            </div>
          )}
        </div>

        <div className="flex gap-8 sm:flex-col sm:gap-5">
          <LegendItem color={AMBER} label="Calories in" value={totalIn} />
          <LegendItem color={MINT} label="Calories burnt" value={totalBurnt} />
        </div>
      </div>
    </section>
  );
}

export default OverallData;

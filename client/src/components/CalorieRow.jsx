import { GRID } from '../ui/GRID';
import { Icon } from '../ui/ICON';

const iconBtn =
  'flex h-11 w-11 items-center justify-center rounded-[14px] border border-[#2E3B4D] bg-[#1F2833] text-[#C5CEDA] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

export function CalorieRow({
  date,
  description,
  caloriesIn,
  caloriesBurnt,
  onEdit,
  onDelete,
}) {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const weekday = d.toLocaleString('en-US', { weekday: 'short' }).toUpperCase();

  return (
    <div
      className={`flex flex-wrap items-center gap-x-6 gap-y-4 rounded-[22px] border border-[#263243] bg-[#171E27] px-7 py-[22px] ${GRID}`}
    >
      <div className="flex w-[110px] flex-col gap-0.5">
        <div className="text-[38px] font-extrabold leading-none text-[#F2F5F9]">
          {day}
        </div>
        <div className="text-xs font-bold tracking-[0.14em] text-[#8794A6]">
          {month} · {weekday}
        </div>
      </div>

      <div className="min-w-[200px] flex-1 text-xl font-bold text-[#F2F5F9]">
        {description}
      </div>

      <div className="flex items-center gap-3.5">
        <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#2B2314]">
          <Icon color="#FFB547">
            <path d="M7 3v8a2 2 0 0 0 2 2v8M11 3v8a2 2 0 0 1-2 2M17 21V3c-2.2 1.2-3.5 3.6-3.5 7 0 2 1.3 3 3.5 3" />
          </Icon>
        </div>
        <div className="flex flex-col">
          <div className="text-[26px] font-extrabold leading-[1.05] tabular-nums text-[#FFB547]">
            {caloriesIn}
          </div>
          <div className="text-xs font-semibold text-[#9AA7B8]">kcal eaten</div>
        </div>
      </div>

      <div className="flex items-center gap-3.5">
        <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#10261E]">
          <Icon color="#4ADE9C">
            <path d="M12 22c4 0 7-2.8 7-7 0-3-1.6-5-3.2-6.6C14.4 7 13.5 5.5 13 3c-3 2-5 5-5 8-1.2-.4-2-1.2-2.4-2.4C4.6 10.2 5 12 5 15c0 4.2 3 7 7 7z" />
          </Icon>
        </div>
        <div className="flex flex-col">
          <div className="text-[26px] font-extrabold leading-[1.05] tabular-nums text-[#4ADE9C]">
            {caloriesBurnt}
          </div>
          <div className="text-xs font-semibold text-[#9AA7B8]">kcal burnt</div>
        </div>
      </div>

      {/* Actions */}
      <div className="ml-auto flex gap-2 md:ml-0">
        <button
          type="button"
          aria-label="Edit entry"
          onClick={onEdit}
          className={`${iconBtn} hover:bg-[#283443] focus-visible:outline-[#4ADE9C]`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Delete entry"
          onClick={onDelete}
          className={`${iconBtn} hover:border-[#FF8A8A]/60 hover:bg-[#2A1618] hover:text-[#FF8A8A] focus-visible:outline-[#FF8A8A]`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 6h18" />
            <path d="M8 6V4h8v2" />
            <path d="M19 6l-1 14H6L5 6" />
            <path d="M10 11v6M14 11v6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

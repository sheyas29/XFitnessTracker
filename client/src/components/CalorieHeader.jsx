import { GRID } from '../ui/GRID';

export function CalorieRowHeader() {
  return (
    <div
      className={`hidden px-7 text-[11px] font-bold uppercase tracking-[0.16em] text-[#8794A6] ${GRID}`}
    >
      <div>Date</div>
      <div>Description</div>
      <div>Calories in</div>
      <div>Calories burnt</div>
      <div />
    </div>
  );
}

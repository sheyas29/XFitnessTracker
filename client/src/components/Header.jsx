function Header({ setIsOpen }) {
  return (
    <header className="border-b border-[#263243] bg-[#0E1318] text-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-6">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          Health and Fitness Tracker
        </h1>

        <button
          type="button"
          className="inline-flex h-12 items-center gap-2 rounded-full bg-[#4ADE9C] px-6 text-[15px] font-extrabold text-[#07140E] shadow-[0_8px_24px_-8px_rgba(74,222,156,0.55)] transition hover:-translate-y-0.5 hover:bg-[#6AE9B0] focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[#4ADE9C] active:scale-95"
          onClick={() => setIsOpen(true)}
        >
          + Add data
        </button>
      </div>
    </header>
  );
}

export default Header;

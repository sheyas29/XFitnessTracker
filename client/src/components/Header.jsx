function Header({ setIsOpen }) {
  return (
    <header className="border-b border-[#263243] bg-[#0E1318] text-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-8">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          Health And Fitness Tracker
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 rounded-[22px] border border-[#263243] bg-[#171E27] px-6 py-5">
          <div>
            <h2 className="text-lg font-extrabold">{"Update Today's Data"}</h2>
            <p className="mt-1 text-sm font-medium text-[#9AA7B8]">
              Log what you ate and burned today.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="inline-flex h-12 items-center rounded-full bg-[#4ADE9C] px-6 text-[15px] font-extrabold text-[#07140E] shadow-[0_8px_24px_-8px_rgba(74,222,156,0.55)] transition hover:-translate-y-0.5 hover:bg-[#6AE9B0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4ADE9C] active:scale-95"
          >
            + Add data
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;

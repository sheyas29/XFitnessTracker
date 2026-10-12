import { useEffect, useState } from 'react';
import { CalorieRowHeader } from './components/CalorieHeader';
import { CalorieRow } from './components/CalorieRow';
import ConfirmDialog from './components/ConfirmDialog';
import Form from './components/Form';
import Header from './components/header';
import OverallData from './components/OverallData';
import WeeklyChart from './components/WeeklyChart';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState(null); // the entry being edited, or null when adding
  const [deleting, setDeleting] = useState(null); // the entry waiting for delete confirmation
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('healthAndFitness');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('healthAndFitness', JSON.stringify(entries));
  }, [entries]);

  // closing the form always forgets which entry was being edited
  function setFormOpen(open) {
    setIsOpen(open);
    if (!open) setEditing(null);
  }

  function handleSubmit(data) {
    if (editing) {
      setEntries((prev) =>
        prev.map((x) => (x === editing ? { ...x, ...data } : x))
      );
    } else {
      setEntries((prev) => [...prev, { id: crypto.randomUUID(), ...data }]);
    }
  }

  function confirmDelete() {
    setEntries((prev) => prev.filter((x) => x !== deleting));
    setDeleting(null);
  }

  return (
    <div className="min-h-screen bg-[#0E1318] font-[Manrope,system-ui,sans-serif]">
      <Header setIsOpen={setFormOpen} />

      <main className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-10">
        {/* Charts: side by side on wide screens, stacked on small ones.
            empty:hidden collapses a wrapper when its chart renders nothing,
            so the other chart grows to fill the row. */}
        <div className="flex flex-wrap gap-4">
          <div className="min-w-0 flex-[1_1_320px] empty:hidden [&>section]:h-full">
            <OverallData entries={entries} />
          </div>
          <div className="min-w-0 flex-[2_1_440px] empty:hidden [&>section]:h-full">
            <WeeklyChart entries={entries} />
          </div>
        </div>

        {/* Entries */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-extrabold tracking-tight text-[#F2F5F9]">
              Recent Health Statistics
            </h2>
            <span className="rounded-full border border-[#263243] bg-[#171E27] px-2.5 py-0.5 text-xs font-bold tabular-nums text-[#9AA7B8]">
              {entries.length}
            </span>
          </div>

          {entries.length === 0 ? (
            <div className="flex flex-col items-center gap-2 rounded-[22px] border border-dashed border-[#2E3B4D] px-6 py-16 text-center">
              <h3 className="text-xl font-extrabold text-[#F2F5F9]">
                No entries yet
              </h3>
              <p className="max-w-xs text-sm font-medium text-[#9AA7B8]">
                Add your first meal or workout to start your log.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3.5">
              <CalorieRowHeader />
              <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
                {entries.map((e, i) => (
                  <li key={e.id ?? i}>
                    <CalorieRow
                      date={e.date}
                      description={e.description || 'Untitled entry'}
                      caloriesIn={e.caloriesIntake}
                      caloriesBurnt={e.caloriesBurned}
                      onEdit={() => {
                        setEditing(e);
                        setIsOpen(true);
                      }}
                      onDelete={() => setDeleting(e)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </main>

      <Form
        isOpen={isOpen}
        setIsOpen={setFormOpen}
        addMode={!editing}
        initialValues={editing ?? {}}
        onSubmit={handleSubmit}
      />

      {deleting && (
        <ConfirmDialog
          title="Delete this entry?"
          message={`"${deleting.description || 'Untitled entry'}" will be removed. This can't be undone.`}
          onConfirm={confirmDelete}
          onCancel={() => setDeleting(null)}
        />
      )}
    </div>
  );
}

export default App;

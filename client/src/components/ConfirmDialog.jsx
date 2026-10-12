// components/ConfirmDialog.jsx
import { useEffect } from 'react';

function ConfirmDialog({
  title,
  message,
  confirmLabel = 'Delete',
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onCancel();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onCancel]);

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onCancel()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-message"
        className="w-full max-w-sm rounded-[26px] border border-[#263243] bg-[#171E27] p-7 text-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
      >
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2A1618] text-[#FF8A8A]">
          <svg
            width="22"
            height="22"
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
          </svg>
        </div>
        <h2
          id="confirm-title"
          className="text-xl font-extrabold tracking-tight"
        >
          {title}
        </h2>
        <p
          id="confirm-message"
          className="mt-2 text-sm font-medium text-[#9AA7B8]"
        >
          {message}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            autoFocus
            onClick={onCancel}
            className="h-12 rounded-full px-5 text-[15px] font-bold text-[#C5CEDA] transition-colors hover:bg-[#1F2833] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4ADE9C]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="h-12 rounded-full bg-[#FF8A8A] px-7 text-[15px] font-extrabold text-[#2A0B0B] transition hover:-translate-y-0.5 hover:bg-[#FFA3A3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF8A8A] active:scale-95"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;

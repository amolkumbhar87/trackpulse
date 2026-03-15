import { useState, useEffect, useRef } from "react";
import '../../styles/DatePicker.css';

const MONTHS = ["January","February","March","April","May","June",
  "July","August","September","October","November","December"];

interface RaceDatePickerProps {
  value: Date | null;
  onChange: (date: Date) => void;
}

export function RaceDatePicker({ value, onChange }: RaceDatePickerProps) {
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(new Date().getMonth());
  const ref = useRef<HTMLDivElement>(null);
  const today = new Date(); today.setHours(0, 0, 0, 0);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const changeMonth = (dir: number) => {
    let m = viewMonth + dir, y = viewYear;
    if (m > 11) { m = 0; y++; }
    if (m < 0)  { m = 11; y--; }
    setViewMonth(m); setViewYear(y);
  };

  const goToday = () => {
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
    onChange(today);
  };

  const firstDow = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrev = new Date(viewYear, viewMonth, 0).getDate();

  const cells: { day: number; type: "prev" | "curr" | "next" }[] = [];
  for (let i = 0; i < firstDow; i++)
    cells.push({ day: daysInPrev - firstDow + 1 + i, type: "prev" });
  for (let d = 1; d <= daysInMonth; d++)
    cells.push({ day: d, type: "curr" });
  const rem = (firstDow + daysInMonth) % 7;
  if (rem > 0)
    for (let i = 1; i <= 7 - rem; i++) cells.push({ day: i, type: "next" });

  const fmt = (d: Date) => d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div ref={ref} style={{ position: "relative", maxWidth: 320 }}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(o => !o)}
        className={`dp-trigger ${open ? "open" : ""}`}
      >
        <CalendarIcon />
        <span className="dp-val">{value ? fmt(value) : "Select a date"}</span>
        <ChevronIcon open={open} />
      </button>

      {/* Popover */}
      {open && (
        <div className="dp-popover">
          <div className="dp-header">
            <button className="dp-nav" onClick={() => changeMonth(-1)}><ChevronLeft /></button>
            <span className="dp-month-title">{MONTHS[viewMonth]} {viewYear}</span>
            <button className="dp-nav" onClick={() => changeMonth(1)}><ChevronRight /></button>
          </div>

          <div className="dp-dow">
            {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => <span key={d}>{d}</span>)}
          </div>

          <div className="dp-grid">
            {cells.map((c, i) => {
              const date = new Date(
                c.type === "prev" ? viewYear : c.type === "next" ? viewYear : viewYear,
                c.type === "prev" ? viewMonth - 1 : c.type === "next" ? viewMonth + 1 : viewMonth,
                c.day
              );
              const isToday = date.getTime() === today.getTime();
              const isSelected = value && date.getTime() === value.getTime();
              return (
                <button
                  key={i}
                  className={[
                    "dp-day",
                    c.type !== "curr" ? "other-month" : "",
                    isToday ? "today" : "",
                    isSelected ? "selected" : "",
                  ].join(" ").trim()}
                  onClick={() => c.type === "curr" && onChange(date)}
                >
                  {c.day}
                </button>
              );
            })}
          </div>

          <div className="dp-footer">
            <span className="dp-selected-display">
              {value ? <strong>{fmt(value)}</strong> : "No date selected"}
            </span>
            <button className="dp-today-btn" onClick={goToday}>Today</button>
          </div>
        </div>
      )}
    </div>
  );
}

 function CalendarIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="1" y="3" width="14" height="12" rx="2" />
      <path d="M1 7h14M5 1v4M11 1v4" />
    </svg>
  );
}

 function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
    >
      <path d="M2 4l4 4 4-4" />
    </svg>
  );
}

 function ChevronLeft() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2L3 5l3 3" />
    </svg>
  );
}

 function ChevronRight() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 2l3 3-3 3" />
    </svg>
  );
}
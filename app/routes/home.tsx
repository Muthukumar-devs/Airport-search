import { useState, useEffect, useRef } from "react";
import type { Route } from "./+types/home";

interface Airport {
  code: string;
  city: string;
  country: string;
  name: string;
}

export function meta({}: Route.MetaArgs) {
  return [{ title: "Airport Search" }];
}

export default function Home() {
  const [airports, setAirports] = useState<Airport[]>([]);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Airport | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/airports.json")
      .then((r) => r.json())
      .then(setAirports);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered =
    query.trim().length === 0
      ? []
      : airports.filter((a) => {
          const q = query.toLowerCase();
          return (
            a.code.toLowerCase().includes(q) ||
            a.city.toLowerCase().includes(q) ||
            a.name.toLowerCase().includes(q)
          );
        });

  function handleSelect(airport: Airport) {
    setSelected(airport);
    setQuery(`${airport.city} (${airport.code})`);
    setOpen(false);
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center pt-20 px-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">
        Airport Search
      </h1>

      <div ref={containerRef} className="relative w-full max-w-md">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelected(null);
            setOpen(true);
          }}
          onFocus={() => query.trim() && setOpen(true)}
          placeholder="Search by city, code or airport name…"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
        />

        {open && filtered.length > 0 && (
          <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
            {filtered.map((airport) => (
              <li
                key={airport.code}
                onMouseDown={() => handleSelect(airport)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 cursor-pointer"
              >
                <span className="text-xs font-bold text-blue-600 bg-blue-100 rounded px-2 py-0.5 shrink-0">
                  {airport.code}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {airport.city}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{airport.name}</p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {open && query.trim().length > 0 && filtered.length === 0 && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-3 text-sm text-gray-500">
            No airports found.
          </div>
        )}
      </div>

      {selected && (
        <div className="mt-8 w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-sm p-5 space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-blue-600 bg-blue-100 rounded px-3 py-1">
              {selected.code}
            </span>
            <h2 className="text-base font-semibold text-gray-800">
              {selected.city}
            </h2>
          </div>
          <p className="text-sm text-gray-600">{selected.name}</p>
          <p className="text-xs text-gray-400">{selected.country}</p>
        </div>
      )}
    </main>
  );
}

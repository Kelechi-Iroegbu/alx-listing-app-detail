// pages/index.tsx
import React, { useMemo, useState } from "react";
import { HERO_BG, FILTER_LABELS, PROPERTYLISTINGSAMPLE } from "@/constants";
import type { PropertyProps } from "@/interfaces";
import Pill from "@/components/common/Pill";
import PropertyCard from "@/components/common/PropertyCard";

const Home: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = PROPERTYLISTINGSAMPLE.filter((p) => {
      const matchesQuery =
        q.length === 0 ||
        p.name.toLowerCase().includes(q) ||
        p.address.city.toLowerCase().includes(q) ||
        p.address.country.toLowerCase().includes(q);

      const matchesFilter =
        !activeFilter ||
        p.category.some((c) => c.toLowerCase().includes(activeFilter.toLowerCase())) ||
        activeFilter.toLowerCase() === "top villa" && p.name.toLowerCase().includes("villa");

      return matchesQuery && matchesFilter;
    });

    return list;
  }, [activeFilter, query]);

  return (
    <div>
      {/* HERO */}
      <section
        className="relative bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.25)), url(${HERO_BG})`,
        }}
        aria-label="Hero"
      >
        <div className="max-w-7xl mx-auto px-4 py-20 sm:py-28 lg:py-32">
          <div className="text-white max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
              Find your favorite place here!
            </h1>
            <p className="mt-4 text-sm sm:text-base">
              The best prices for over 2 million properties worldwide.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search city, country or property name..."
                className="w-full sm:w-auto px-4 py-3 rounded-md text-gray-900"
              />
              <button
                onClick={() => { /* intentionally simple for this milestone */ }}
                className="px-4 py-3 bg-indigo-600 text-white rounded-md"
              >
                Explore
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Discover places</h2>
          <div className="text-sm text-gray-600">{filtered.length} results</div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Pill
            label="All"
            active={activeFilter === null}
            onClick={() => setActiveFilter(null)}
          />
          {FILTER_LABELS.map((label) => (
            <Pill
              key={label}
              label={label}
              active={activeFilter === label}
              onClick={() => setActiveFilter((prev) => (prev === label ? null : label))}
            />
          ))}
        </div>
      </section>

      {/* LISTINGS */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item: PropertyProps) => (
            <PropertyCard key={item.name + item.address.city} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

"use client";

interface Restaurant {
  id: string;
  name: string;
}

interface Props {
  restaurants: Restaurant[];
  onDelete: (id: string) => void;
  highlightedIndex: number | null;
}

export default function RestaurantList({
  restaurants,
  onDelete,
  highlightedIndex,
}: Props) {
  if (restaurants.length === 0) {
    return (
      <p className="text-center text-sm text-gray-400 py-6">
        No restaurants yet. Add some above!
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {restaurants.map((r, i) => (
        <li
          key={r.id}
          className={`flex items-center justify-between rounded-lg px-4 py-3 text-sm transition-all duration-100 ${
            highlightedIndex === i
              ? "bg-orange-500 text-white font-semibold scale-[1.02] shadow-md"
              : "bg-gray-50 text-gray-700 hover:bg-gray-100"
          }`}
        >
          <span>{r.name}</span>
          <button
            onClick={() => onDelete(r.id)}
            className={`ml-4 text-xs transition-colors ${
              highlightedIndex === i
                ? "text-orange-100 hover:text-white"
                : "text-gray-400 hover:text-red-500"
            }`}
            aria-label={`Remove ${r.name}`}
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}

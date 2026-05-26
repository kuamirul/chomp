"use client";

import { useState } from "react";

interface Props {
  onAdd: (name: string) => void;
}

export default function AddRestaurantForm({ onAdd }: Props) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;

    setLoading(true);
    try {
      const res = await fetch("/api/restaurants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmed }),
      });
      if (res.ok) {
        onAdd(trimmed);
        setValue("");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add a restaurant..."
        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
        disabled={loading}
        maxLength={80}
      />
      <button
        type="submit"
        disabled={loading || !value.trim()}
        className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Add
      </button>
    </form>
  );
}

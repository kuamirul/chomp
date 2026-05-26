"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import AddRestaurantForm from "@/components/AddRestaurantForm";
import RestaurantList from "@/components/RestaurantList";
import RandomPicker from "@/components/RandomPicker";

interface Restaurant {
  id: string;
  name: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/restaurants")
        .then((r) => r.json())
        .then(setRestaurants);
    }
  }, [status]);

  async function handleAdd(name: string) {
    const res = await fetch("/api/restaurants");
    const data = await res.json();
    setRestaurants(data);
  }

  async function handleDelete(id: string) {
    await fetch(`/api/restaurants/${id}`, { method: "DELETE" });
    setRestaurants((prev) => prev.filter((r) => r.id !== id));
    setHighlightedIndex(null);
  }

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white px-6 py-4">
        <div className="mx-auto flex max-w-xl items-center justify-between">
          <span className="text-xl font-bold text-orange-500">chomp 🍽️</span>
          <div className="flex items-center gap-3">
            {session?.user?.image && (
              <img
                src={session.user.image}
                alt={session.user.name ?? "User"}
                className="h-8 w-8 rounded-full"
              />
            )}
            <span className="text-sm text-gray-600">{session?.user?.name}</span>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-xl px-4 py-8 space-y-8">
        <RandomPicker
          restaurants={restaurants}
          onHighlight={setHighlightedIndex}
        />

        <div className="rounded-xl bg-white shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Your restaurants
          </h2>
          <AddRestaurantForm onAdd={handleAdd} />
          <RestaurantList
            restaurants={restaurants}
            onDelete={handleDelete}
            highlightedIndex={highlightedIndex}
          />
        </div>
      </main>
    </div>
  );
}

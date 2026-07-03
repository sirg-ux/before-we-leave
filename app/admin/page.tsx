"use client";

import { useEffect, useState } from "react";

type RSVP = {
  id: string;
  name: string;
  email: string;
  created_at: string;
};

export default function AdminPage() {
  const [guests, setGuests] = useState<RSVP[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/rsvp");

      const data = await res.json();

      setGuests(data);
    }

    load();
  }, []);

  return (
    <main
      className="
        min-h-screen

        bg-background

        p-16
      "
    >
      <div className="mx-auto max-w-5xl">

        <p
          className="
            text-xs

            uppercase

            tracking-[0.45em]

            text-accent-blue
          "
        >
          MEMORY ADMIN
        </p>

        <h1
          className="
            mt-3

            text-5xl

            font-bold
          "
        >
          RSVP Dashboard
        </h1>

        <p
          className="
            mt-4

            text-chrome-dark
          "
        >
          {guests.length} confirmed guest(s)
        </p>

        <div
          className="
            mt-12

            overflow-hidden

            rounded-3xl

            border
            border-border

            bg-white/70

            backdrop-blur-xl
          "
        >
          <table className="w-full">

            <thead>
              <tr className="border-b border-border">
                <th className="p-5 text-left">
                  Name
                </th>

                <th className="p-5 text-left">
                  Email
                </th>

                <th className="p-5 text-left">
                  Time
                </th>
              </tr>
            </thead>

            <tbody>

              {guests.map((guest) => (
                <tr
                  key={guest.id}
                  className="border-b border-border/50"
                >
                  <td className="p-5">
                    {guest.name}
                  </td>

                  <td className="p-5">
                    {guest.email}
                  </td>

                  <td className="p-5">
                    {new Date(
                      guest.created_at
                    ).toLocaleString()}
                  </td>
                </tr>
              ))}

            </tbody>

          </table>
        </div>

      </div>
    </main>
  );
}
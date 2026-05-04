"use client";

import { motion } from "framer-motion";
import type { JobApplication } from "@/lib/api";

type Props = {
  applications: JobApplication[];
};

const statusMap = ["Ansökt", "Intervju", "Erbjudande", "Nekad"];

const statusStyles = [
  "bg-blue-500/15 text-blue-300 border-blue-500/30",
  "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
  "bg-green-500/15 text-green-300 border-green-500/30",
  "bg-red-500/15 text-red-300 border-red-500/30",
];

export default function ApplicationsList({ applications }: Props) {
  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
            Job Application Tracker
          </p>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
            Följ dina jobbansökningar med stil
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-slate-300">
            Se alla dina ansökningar, följ status och håll koll på nästa steg i
            din jobbsökarprocess.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.75, ease: "easeOut" }}
          className="mb-10 rounded-3xl border border-slate-700/70 bg-slate-900/70 p-7 shadow-2xl shadow-cyan-950/30 backdrop-blur"
        >
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
            Totalt antal
          </p>

          <div className="mt-3 flex items-end gap-4">
            <p className="text-6xl font-bold text-cyan-300">
              {applications.length}
            </p>
            <p className="mb-2 text-slate-400">ansökningar registrerade</p>
          </div>
        </motion.div>

        {applications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.7, ease: "easeOut" }}
            className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/60 p-12 text-center shadow-xl shadow-black/20"
          >
            <p className="text-2xl font-semibold">Inga ansökningar ännu</p>
            <p className="mt-3 text-slate-400">
              När du lägger till en ansökan visas den här.
            </p>
          </motion.div>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2">
            {applications.map((app, index) => (
              <motion.li
                key={app.id}
                initial={{ opacity: 0, y: 90, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: index * 0.14,
                  duration: 0.75,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -12,
                  scale: 1.025,
                }}
                className="group transform-gpu rounded-3xl border border-slate-700/70 bg-slate-900/80 p-6 shadow-xl shadow-black/25 transition hover:border-cyan-400/60 hover:bg-slate-900 hover:shadow-2xl hover:shadow-cyan-500/10"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold transition group-hover:text-cyan-300">
                      {app.company}
                    </h2>
                    <p className="mt-1 text-slate-300">{app.role}</p>
                  </div>

                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                      statusStyles[app.status]
                    }`}
                  >
                    {statusMap[app.status]}
                  </span>
                </div>

                <div className="mb-5 h-px bg-gradient-to-r from-cyan-400/40 via-slate-700 to-transparent" />

                <div className="space-y-3 text-sm text-slate-300">
                  <p>
                    <span className="text-slate-500">Datum:</span>{" "}
                    {new Date(app.appliedAt).toLocaleDateString("sv-SE")}
                  </p>

                  <p>
                    <span className="text-slate-500">Anteckning:</span>{" "}
                    {app.notes || "Ingen anteckning"}
                  </p>
                </div>

                <div className="mt-6 flex gap-2">
                  {statusMap.map((status, stepIndex) => (
                    <div
                      key={status}
                      className={`h-2 flex-1 rounded-full ${
                        stepIndex <= app.status
                          ? "bg-cyan-400"
                          : "bg-slate-700"
                      }`}
                    />
                  ))}
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
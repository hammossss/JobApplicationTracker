import { getApplications } from "@/lib/api";

export default async function ApplicationsPage() {
  const applications = await getApplications();

  console.log("APPLICATIONS:", applications);

  const statusMap = ["Ansökt", "Intervju", "Erbjudande", "Nekad"];

  return (
    <main className="min-h-screen p-8 bg-slate-950 text-white">
      <h1 className="text-3xl font-bold mb-6">Mina ansökningar</h1>

      <p className="mb-6 text-slate-300">
        Antal ansökningar: {applications.length}
      </p>

      {applications.length === 0 ? (
        <p>Inga ansökningar ännu...</p>
      ) : (
        <ul className="space-y-4">
          {applications.map((app) => (
            <li
              key={app.id}
              className="rounded-xl border border-slate-700 bg-slate-900 p-5"
            >
              <h2 className="text-xl font-semibold">{app.company}</h2>
              <p className="text-slate-300">{app.role}</p>
              <p>Status: {statusMap[app.status]}</p>
              <p>Datum: {app.appliedAt}</p>
              <p>Anteckning: {app.notes}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
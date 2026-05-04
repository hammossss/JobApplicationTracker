// app/applications/page.tsx

import { getApplications } from "@/lib/api";

export default async function ApplicationsPage() {
  const applications = await getApplications();

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-6">Mina ansökningar</h1>

      {applications.length === 0 ? (
        <p>Inga ansökningar ännu...</p>
      ) : (
        <ul className="space-y-4">
          {applications.map((app) => (
            <li key={app.id} className="p-4 border border-gray-700 rounded-lg">
              <p className="font-semibold">{app.company}</p>
              <p>{app.role}</p>
              <p>Status: {app.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

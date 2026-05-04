// src/lib/api.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL;

console.log("API_URL:", process.env.NEXT_PUBLIC_API_URL);

export type ApplicationStatus = 0 | 1 | 2 | 3;

export type JobApplication = {
  id: number;
  company: string;
  role: string;
  status: ApplicationStatus;
  appliedAt: string;
  notes: string;
};

export type CreateApplicationData = {
  company: string;
  role: string;
  status: ApplicationStatus;
  appliedAt: string;
  notes: string;
};

export async function getApplications(): Promise<JobApplication[]> {
  const res = await fetch(`${API_URL}/api/applications`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Kunde inte hämta ansökningar");
  }

  return res.json();
}

export async function createApplication(
  data: CreateApplicationData,
): Promise<JobApplication> {
  const res = await fetch(`${API_URL}/api/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Kunde inte skapa ansökan");
  }

  return res.json();
}

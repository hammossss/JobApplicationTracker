import { getApplications } from "@/lib/api";
import ApplicationsList from "./ApplicationsList";

export default async function ApplicationsPage() {
  const applications = await getApplications();

  return <ApplicationsList applications={applications} />;
}
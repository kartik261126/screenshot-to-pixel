import { createFileRoute } from "@tanstack/react-router";
import { PortalPage } from "@/components/portal-page";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Employee workspace · ACME Mail Portal" },
      { name: "description", content: "Your company email account, directory and service notifications." },
      { property: "og:title", content: "Employee workspace · ACME Mail Portal" },
      { property: "og:description", content: "Your company email account, directory and service notifications." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <PortalPage page="dashboard" />,
});

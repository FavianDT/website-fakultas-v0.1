import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth";

export default async function Home() {
  const user = await getSession();

  if (!user) {
    redirect("/login");
  }

  switch (user.role) {
    case "student":
      redirect("/dashboard/student");
    case "tendik":
      redirect("/dashboard/staff");
    case "prodi":
      redirect("/dashboard/executive/prodi");
    case "fakultas":
      redirect("/dashboard/executive/fakultas");
  }
}

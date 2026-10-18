import ProfileView from "@/components/profile/ProfileView";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "প্রোফাইল — Bangla News 24",
};

const ProfilePage = async () => {
  // Get current session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // If user is not logged in
  if (!session) {
    redirect("/sign-in");
  }

  const { name, email, emailVerified } = session.user;

  return (
    <ProfileView
      name={name}
      email={email}
      emailVerified={Boolean(emailVerified)}
    />
  );
};

export default ProfilePage;

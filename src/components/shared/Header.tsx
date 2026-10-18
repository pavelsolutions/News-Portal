"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TranslateButton from "./TranslateButton";

const Header = () => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
          router.refresh();
        },
      },
    });
  };

  const user = session?.user;
  const initial = (user?.name?.trim().charAt(0) || "?").toUpperCase();

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">

        {/* ================= Logo ================= */}
        <Link href="/" className="flex items-center gap-2">
          {/* Logo Icon */}
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-black text-sm font-bold text-white">
            B
          </div>

          {/* Logo Text */}
          <div>
            <h1 className="text-xl font-bold text-red-600">
              Bangla News 24
            </h1>

            <p className="text-xs text-gray-400">
              সত্য ও বস্তুনিষ্ঠ সংবাদ
            </p>
          </div>
        </Link>

        {/* ================= Authentication ================= */}
        <div className="flex items-center gap-2">

          {/* Translate */}
          <TranslateButton />

          {/* Loading (placeholder, avoids a text flash) */}
          {isPending ? (
            <span
              className="h-9 w-28 animate-pulse rounded-full bg-gray-100"
              aria-hidden="true"
            />
          ) : user ? (
            <>
              {/* Profile */}
              <Link
                href="/profile"
                className="flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-2 transition hover:bg-gray-100 sm:pr-3"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">
                  {initial}
                </span>

                <span className="hidden max-w-[10rem] truncate text-sm font-semibold text-gray-900 sm:block">
                  {user.name}
                </span>
              </Link>

              {/* Logout */}
              <Button
                size="sm"
                className="rounded-full bg-red-600 px-4 font-semibold text-white transition hover:bg-red-700"
                onPress={handleSignOut}
              >
                লগআউট
              </Button>
            </>
          ) : (
            <>
              {/* Sign In */}
              <Link
                href="/sign-in"
                className="rounded-full px-3 py-1.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
              >
                সাইন ইন
              </Link>

              {/* Sign Up */}
              <Link
                href="/sign-up"
                className="rounded-full bg-red-600 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                সাইন আপ
              </Link>
            </>
          )}

        </div>
      </div>
    </header>
  );
};

export default Header;

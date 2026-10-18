"use client";

import AuthShell from "@/components/auth/AuthShell";
import { authClient } from "@/lib/auth-client";
import { friendlyAuthError } from "@/lib/auth-error";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.58-5.17 3.58-8.81Z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.96-1.08 7.94-2.91l-3.88-3c-1.08.72-2.45 1.15-4.06 1.15-3.12 0-5.77-2.11-6.72-4.95H1.28v3.1A12 12 0 0 0 12 24Z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.29a7.2 7.2 0 0 1 0-4.58v-3.1H1.28a12 12 0 0 0 0 10.79l4-3.11Z"
    />
    <path
      fill="#EA4335"
      d="M12 4.77c1.76 0 3.34.61 4.59 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.28 6.6l4 3.11C6.23 6.88 8.88 4.77 12 4.77Z"
    />
  </svg>
);

const GithubIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.21 3.44 9.63 8.21 11.19.6.11.82-.25.82-.56 0-.28-.01-1.02-.02-2-3.34.71-4.04-1.58-4.04-1.58-.55-1.37-1.34-1.74-1.34-1.74-1.09-.73.08-.72.08-.72 1.21.08 1.84 1.22 1.84 1.22 1.07 1.8 2.81 1.28 3.5.98.11-.76.42-1.28.76-1.58-2.67-.3-5.47-1.31-5.47-5.82 0-1.29.47-2.34 1.24-3.17-.13-.3-.54-1.5.12-3.12 0 0 1.01-.32 3.3 1.21a11.6 11.6 0 0 1 3-.4c1.02 0 2.05.13 3 .4 2.29-1.53 3.3-1.21 3.3-1.21.66 1.62.25 2.82.12 3.12.77.83 1.24 1.88 1.24 3.17 0 4.52-2.8 5.52-5.48 5.81.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .31.22.68.83.56A12.02 12.02 0 0 0 24 12.29C24 5.78 18.63.5 12 .5Z" />
  </svg>
);

const SignIn = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await authClient.signIn.email({
      email,
      password,
      rememberMe: true,
      callbackURL: "/",
    });

    if (error) {
      setErrorMessage(friendlyAuthError(error.message));
      setIsLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  };

  const handleSocial = async (provider: "google" | "github") => {
    setErrorMessage("");

    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });

    if (error) {
      setErrorMessage(friendlyAuthError(error.message));
    }
  };

  return (
    <AuthShell
      kicker="স্বাগতম"
      title="আপনার অ্যাকাউন্টে সাইন ইন করুন"
      subtitle="সর্বশেষ সংবাদ ও আপনার প্রোফাইলে প্রবেশ করতে সাইন ইন করুন।"
    >
      <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
        {/* Email */}
        <TextField
          isRequired
          name="email"
          type="email"
          className="w-full"
          validate={(value) =>
            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
              ? null
              : "সঠিক ইমেইল ঠিকানা দিন"
          }
        >
          <Label className="mb-1 text-sm font-semibold text-gray-700">
            ইমেইল
          </Label>

          <Input
            placeholder="আপনার ইমেইল লিখুন"
            className="w-full rounded-xl"
          />

          <FieldError />
        </TextField>

        {/* Password */}
        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          className="w-full"
          validate={(value) => {
            if (value.length < 8) {
              return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
            }

            if (!/[A-Z]/.test(value)) {
              return "পাসওয়ার্ডে কমপক্ষে ১টি বড় হাতের অক্ষর থাকতে হবে";
            }

            if (!/[0-9]/.test(value)) {
              return "পাসওয়ার্ডে কমপক্ষে ১টি সংখ্যা থাকতে হবে";
            }

            return null;
          }}
        >
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold text-gray-700">
              পাসওয়ার্ড
            </Label>

            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-red-600 transition hover:text-red-700"
            >
              পাসওয়ার্ড ভুলে গেছেন?
            </Link>
          </div>

          <Input
            placeholder="আপনার পাসওয়ার্ড লিখুন"
            className="mt-1 w-full rounded-xl"
          />

          <Description className="text-xs leading-5 text-gray-400">
            কমপক্ষে ৮ অক্ষর, ১টি বড় হাতের অক্ষর এবং ১টি সংখ্যা থাকতে হবে।
          </Description>

          <FieldError />
        </TextField>

        {/* Error */}
        {errorMessage && (
          <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600 ring-1 ring-red-100">
            {errorMessage}
          </div>
        )}

        {/* Submit */}
        <Button
          type="submit"
          size="lg"
          isDisabled={isLoading}
          className="w-full rounded-full bg-red-600 font-semibold text-white transition hover:bg-red-700"
        >
          {isLoading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-3 py-1">
          <div className="h-px flex-1 bg-gray-200" />

          <span className="text-xs text-gray-400">অথবা</span>

          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Google */}
        <Button
          type="button"
          variant="outline"
          size="lg"
          isDisabled={isLoading}
          onPress={() => handleSocial("google")}
          className="w-full rounded-full border-gray-200 bg-white font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          <span className="flex items-center justify-center gap-3">
            <GoogleIcon />
            Google দিয়ে সাইন ইন
          </span>
        </Button>

        {/* GitHub */}
        <Button
          type="button"
          variant="outline"
          size="lg"
          isDisabled={isLoading}
          onPress={() => handleSocial("github")}
          className="w-full rounded-full border-gray-200 bg-white font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          <span className="flex items-center justify-center gap-3">
            <GithubIcon />
            GitHub দিয়ে সাইন ইন
          </span>
        </Button>

        {/* Reset */}
        <Button
          type="reset"
          variant="ghost"
          className="w-full text-sm font-medium text-gray-500 transition hover:text-gray-900"
        >
          ফর্ম রিসেট করুন
        </Button>
      </Form>

      {/* Sign up */}
      <div className="mt-7 border-t border-gray-100 pt-6 text-center">
        <p className="text-sm text-gray-500">
          আপনার কোনো অ্যাকাউন্ট নেই?
          <Link
            href="/sign-up"
            className="ml-1 font-semibold text-red-600 transition hover:text-red-700"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </div>
    </AuthShell>
  );
};

export default SignIn;

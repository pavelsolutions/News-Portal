"use client";

import AuthShell from "@/components/auth/AuthShell";
import { authClient } from "@/lib/auth-client";
import { friendlyAuthError } from "@/lib/auth-error";
import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

const SignUp = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
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

  return (
    <AuthShell
      kicker="নতুন অ্যাকাউন্ট"
      title="অ্যাকাউন্ট তৈরি করুন"
      subtitle="বাংলা নিউজ ২৪-এর সাথে যুক্ত হতে আপনার তথ্য দিয়ে একটি নতুন অ্যাকাউন্ট তৈরি করুন।"
    >
      <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
        <FieldGroup className="w-full">
          {/* Name */}
          <TextField
            isRequired
            name="name"
            className="w-full"
            validate={(value) =>
              value.trim().length < 3
                ? "নাম কমপক্ষে ৩ অক্ষরের হতে হবে"
                : null
            }
          >
            <Label className="mb-1 text-sm font-semibold text-gray-700">
              নাম
            </Label>

            <Input
              placeholder="আপনার পুরো নাম"
              className="w-full rounded-xl"
            />

            <FieldError />
          </TextField>

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
            <Label className="mb-1 text-sm font-semibold text-gray-700">
              পাসওয়ার্ড
            </Label>

            <Input
              placeholder="আপনার পাসওয়ার্ড লিখুন"
              className="w-full rounded-xl"
            />

            <Description className="text-xs leading-5 text-gray-400">
              কমপক্ষে ৮ অক্ষর, ১টি বড় হাতের অক্ষর এবং ১টি সংখ্যা থাকতে হবে।
            </Description>

            <FieldError />
          </TextField>
        </FieldGroup>

        {/* Terms */}
        <p className="text-xs leading-5 text-gray-400">
          অ্যাকাউন্ট তৈরি করার মাধ্যমে আপনি আমাদের{" "}
          <Link
            href="/terms"
            className="font-semibold text-red-600 transition hover:text-red-700"
          >
            শর্তাবলি
          </Link>{" "}
          মেনে নিচ্ছেন।
        </p>

        {/* Error */}
        {errorMessage && (
          <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600 ring-1 ring-red-100">
            {errorMessage}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Button
            type="submit"
            size="lg"
            isDisabled={isLoading}
            className="w-full rounded-full bg-red-600 font-semibold text-white transition hover:bg-red-700"
          >
            {isLoading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
          </Button>

          <Button
            type="reset"
            variant="ghost"
            className="w-full text-sm font-medium text-gray-500 transition hover:text-gray-900"
          >
            ফর্ম রিসেট করুন
          </Button>
        </div>
      </Form>

      {/* Sign in */}
      <div className="mt-7 border-t border-gray-100 pt-6 text-center">
        <p className="text-sm text-gray-500">
          ইতোমধ্যে আপনার অ্যাকাউন্ট আছে?
          <Link
            href="/sign-in"
            className="ml-1 font-semibold text-red-600 transition hover:text-red-700"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </div>
    </AuthShell>
  );
};

export default SignUp;

"use client";

import { authClient } from "@/lib/auth-client";
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
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

interface ProfileUpdateFormProps {
  name: string;
  email: string;
}

const ProfileUpdateForm = ({ name, email }: ProfileUpdateFormProps) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);

    const updatedName = (formData.get("name") as string) ?? "";
    const updatedEmail = (formData.get("email") as string) ?? "";

    try {
      // =========================
      // Update Name
      // =========================

      if (updatedName !== name) {
        const { error } = await authClient.updateUser({
          name: updatedName,
        });

        if (error) {
          setErrorMessage(error.message || "নাম আপডেট করা যায়নি।");
          return;
        }
      }

      // =========================
      // Update Email
      // =========================

      if (updatedEmail !== email) {
        const { error } = await authClient.changeEmail({
          newEmail: updatedEmail,
          callbackURL: "/profile",
        });

        if (error) {
          setErrorMessage(error.message || "ইমেইল আপডেট করা যায়নি।");
          return;
        }

        setSuccessMessage("নতুন ইমেইলে ভেরিফিকেশন লিংক পাঠানো হয়েছে।");
      } else {
        setSuccessMessage("প্রোফাইল সফলভাবে আপডেট হয়েছে।");
      }

      // Refresh server components.
      router.refresh();
    } catch (error) {
      console.error("Profile update error:", error);

      setErrorMessage("কিছু ভুল হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form className="flex w-full flex-col gap-6" onSubmit={handleSubmit}>
      <FieldGroup>
        {/* Name */}
        <TextField
          isRequired
          name="name"
          defaultValue={name}
          validate={(value) =>
            value.trim().length < 3
              ? "নাম কমপক্ষে ৩ অক্ষরের হতে হবে"
              : null
          }
        >
          <Label className="text-sm font-semibold text-gray-700">নাম</Label>

          <Input placeholder="আপনার নাম লিখুন" className="w-full rounded-xl" />

          <FieldError />
        </TextField>

        {/* Email */}
        <TextField
          isRequired
          name="email"
          type="email"
          defaultValue={email}
          validate={(value) =>
            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
              ? null
              : "সঠিক ইমেইল ঠিকানা দিন"
          }
        >
          <Label className="text-sm font-semibold text-gray-700">ইমেইল</Label>

          <Input
            placeholder="আপনার ইমেইল লিখুন"
            className="w-full rounded-xl"
          />

          <Description className="text-xs text-gray-400">
            নতুন ইমেইল দিলে ভেরিফাই করতে হবে।
          </Description>

          <FieldError />
        </TextField>
      </FieldGroup>

      {/* Success message */}
      {successMessage && (
        <div className="rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700 ring-1 ring-green-100">
          {successMessage}
        </div>
      )}

      {/* Error message */}
      {errorMessage && (
        <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600 ring-1 ring-red-100">
          {errorMessage}
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button
          type="submit"
          isDisabled={isLoading}
          className="rounded-full bg-red-600 px-6 font-semibold text-white transition hover:bg-red-700"
        >
          {isLoading ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
        </Button>

        <Button
          type="reset"
          variant="secondary"
          isDisabled={isLoading}
          className="rounded-full px-6 font-semibold"
        >
          রিসেট
        </Button>
      </div>
    </Form>
  );
};

export default ProfileUpdateForm;

"use client";

import React from "react";
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

interface ProfileFormProps {
  name: string;
  email: string;
}

const ProfileForm = ({ name, email }: ProfileFormProps) => {
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const updatedName = formData.get("name") as string;
    const updatedEmail = formData.get("email") as string;

    console.log({
      name: updatedName,
      email: updatedEmail,
    });

    // এখানে পরে Better Auth update API call করবেন
  };

  return (
    <Form
      className="flex w-full flex-col gap-6"
      onSubmit={handleSubmit}
    >
      <FieldGroup>
        {/* Name */}
        <TextField
          isRequired
          name="name"
          defaultValue={name}
          validate={(value) => {
            if (value.trim().length < 3) {
              return "Name must be at least 3 characters";
            }

            return null;
          }}
        >
          <Label className="text-sm font-semibold text-gray-700">
            Name
          </Label>

          <Input
            placeholder="Enter your name"
            className="w-full"
          />

          <FieldError />
        </TextField>

        {/* Email */}
        <TextField
          isRequired
          name="email"
          type="email"
          defaultValue={email}
          validate={(value) => {
            if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                value
              )
            ) {
              return "Please enter a valid email address";
            }

            return null;
          }}
        >
          <Label className="text-sm font-semibold text-gray-700">
            Email
          </Label>

          <Input
            placeholder="Enter your email"
            className="w-full"
          />

          <Description className="text-xs text-gray-400">
            Update your account email address.
          </Description>

          <FieldError />
        </TextField>
      </FieldGroup>

      {/* Buttons */}
      <div className="flex gap-3">
        <Button
          type="submit"
          className="bg-red-600 font-semibold text-white hover:bg-red-700"
        >
          Update Profile
        </Button>

        <Button
          type="reset"
          variant="secondary"
        >
          Reset
        </Button>
      </div>
    </Form>
  );
};

export default ProfileForm;
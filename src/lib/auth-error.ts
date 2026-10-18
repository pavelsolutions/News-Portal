/** Maps better-auth error messages to friendly Bengali copy. */
export const friendlyAuthError = (message?: string | null): string => {
  const value = (message ?? "").toLowerCase();

  if (value.includes("already") || value.includes("exist")) {
    return "এই ইমেইল দিয়ে ইতোমধ্যে একটি অ্যাকাউন্ট আছে।";
  }

  if (value.includes("verif")) {
    return "আপনার ইমেইল এখনো ভেরিফাই করা হয়নি।";
  }

  if (value.includes("invalid") || value.includes("credential")) {
    return "ইমেইল বা পাসওয়ার্ড সঠিক নয়।";
  }

  if (value.includes("password")) {
    return "পাসওয়ার্ড শর্ত পূরণ করছে না।";
  }

  return "কিছু ভুল হয়েছে। আবার চেষ্টা করুন।";
};

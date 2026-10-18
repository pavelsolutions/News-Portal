import Link from "next/link";
import ProfileUpdateForm from "./ProfileUpdateForm";

interface ProfileViewProps {
  name: string;
  email: string;
  emailVerified: boolean;
}

const InfoItem = ({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "green" | "red";
}) => (
  <div className="rounded-xl bg-gray-50 px-4 py-3">
    <dt className="text-xs text-gray-400">{label}</dt>

    <dd
      className={`mt-1 text-sm font-semibold ${
        tone === "green"
          ? "text-green-600"
          : tone === "red"
            ? "text-red-600"
            : "text-gray-900"
      }`}
    >
      {value}
    </dd>
  </div>
);

const ProfileView = ({ name, email, emailVerified }: ProfileViewProps) => {
  const initial = (name?.trim().charAt(0) || "?").toUpperCase();

  return (
    <main className="min-h-[calc(100vh-80px)] bg-gray-50 px-4 py-8 sm:py-10">
      <div className="mx-auto max-w-3xl">
        {/* Breadcrumb */}
        <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="font-medium transition hover:text-red-600">
            হোম
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-400">প্রোফাইল</span>
        </nav>

        {/* Heading */}
        <div className="mb-6 flex items-start gap-3">
          <span className="mt-1 h-7 w-1.5 shrink-0 rounded-full bg-red-600" />

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-red-600">
              আমার অ্যাকাউন্ট
            </p>

            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              প্রোফাইল
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              আপনার অ্যাকাউন্টের তথ্য দেখুন এবং আপডেট করুন।
            </p>
          </div>
        </div>

        {/* Identity card */}
        <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-card">
          <div className="h-20 bg-gradient-to-r from-red-600 to-red-400" />

          <div className="px-5 pb-6 sm:px-6">
            <div className="-mt-10 flex items-end justify-between gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white bg-red-600 text-3xl font-bold text-white shadow-card">
                {initial}
              </div>

              {emailVerified ? (
                <span className="mb-1 inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600 ring-1 ring-green-100">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  সক্রিয়
                </span>
              ) : (
                <span className="mb-1 inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600 ring-1 ring-amber-100">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  ভেরিফাই করা হয়নি
                </span>
              )}
            </div>

            <h2 className="mt-4 text-xl font-bold text-gray-900">{name}</h2>

            <p className="mt-0.5 text-sm text-gray-500">{email}</p>
          </div>
        </section>

        {/* Account information */}
        <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-card sm:p-6">
          <h3 className="text-lg font-bold text-gray-900">অ্যাকাউন্টের তথ্য</h3>

          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <InfoItem label="নাম" value={name} />
            <InfoItem label="ইমেইল" value={email} />
            <InfoItem
              label="ইমেইল ভেরিফিকেশন"
              value={emailVerified ? "ভেরিফাইড" : "ভেরিফাই করা হয়নি"}
              tone={emailVerified ? "green" : "red"}
            />
          </dl>
        </section>

        {/* Update profile */}
        <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-card sm:p-6">
          <h3 className="text-lg font-bold text-gray-900">
            প্রোফাইল আপডেট করুন
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            আপনার নাম এবং ইমেইল ঠিকানা পরিবর্তন করুন।
          </p>

          <div className="mt-5">
            <ProfileUpdateForm name={name} email={email} />
          </div>
        </section>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center rounded-full bg-red-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            হোমপেজে যান
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ProfileView;

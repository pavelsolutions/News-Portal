import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-white px-4">
      <div className="mx-auto w-full max-w-2xl text-center">
        {/* 404 */}
        <h1 className="font-bold text-[100px] leading-none text-red-600 sm:text-[140px]">
          ৪০৪
        </h1>

        {/* Title */}
        <h2 className="mt-5 text-2xl font-bold text-gray-900 sm:text-3xl">
          দুঃখিত, পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
        </h2>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-gray-500">
          আপনি যে সংবাদ বা পৃষ্ঠাটি খুঁজছেন সেটি হয়তো সরিয়ে ফেলা হয়েছে,
          পরিবর্তন করা হয়েছে অথবা এই মুহূর্তে পাওয়া যাচ্ছে না।
        </p>

        {/* Divider */}
        <div className="mx-auto mt-7 h-[2px] w-16 bg-red-600" />

        {/* Button */}
        <Link
          href="/"
          className="mt-7 inline-flex items-center rounded-md bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          হোমপেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
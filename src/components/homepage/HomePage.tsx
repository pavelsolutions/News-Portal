import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">

      {/* ================= HEADER ================= */}



      {/* ================= NAVBAR ================= */}



      {/* ================= BREAKING NEWS ================= */}


      {/* ================= MAIN CONTENT ================= */}
      <main className="mx-auto max-w-5xl px-3 py-5">

        {/* ================= TOP NEWS ================= */}
        <section className="grid grid-cols-1 gap-3 md:grid-cols-[1.6fr_1fr]">

          {/* Main News */}
          <article className="overflow-hidden rounded border border-gray-200 bg-white">

            <div className="relative h-[250px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1504711434969-e33886168f5c"
                alt=""
                className="h-full w-full object-cover transition duration-300 hover:scale-105"
              />
            </div>

            <div className="p-3">
              <p className="mb-1 text-[9px] font-semibold text-red-600">
                জাতীয়
              </p>

              <h2 className="text-lg font-bold leading-6 text-gray-900">
                দেশের উন্নয়নে নতুন পরিকল্পনা ঘোষণা
              </h2>

              <p className="mt-2 text-[10px] leading-4 text-gray-500">
                দেশের বিভিন্ন খাতে উন্নয়ন কার্যক্রম আরও গতিশীল করতে নতুন
                পরিকল্পনা নেওয়া হয়েছে।
              </p>

              <p className="mt-2 text-[9px] text-gray-400">
                ১০ মিনিট আগে
              </p>
            </div>

          </article>


          {/* Latest News */}
          <aside className="overflow-hidden rounded border border-gray-200 bg-white">

            <div className="border-b-2 border-red-600 px-3 py-2">
              <h2 className="text-sm font-bold">
                সর্বশেষ খবর
              </h2>
            </div>

            <div>

              {[
                "রাজধানীতে নতুন ট্রাফিক ব্যবস্থা কার্যকর",
                "দেশের বিভিন্ন অঞ্চলে বৃষ্টির পূর্বাভাস",
                "নতুন শিক্ষা নীতিমালা নিয়ে আলোচনা",
                "বাংলাদেশের অর্থনীতিতে নতুন পরিবর্তন",
                "জাতীয় দলের গুরুত্বপূর্ণ সিদ্ধান্ত",
                "বিদেশি বিনিয়োগ বাড়াতে নতুন উদ্যোগ",
                "স্বাস্থ্য খাতে নতুন পরিকল্পনা ঘোষণা",
                "ঢাকায় শুরু হচ্ছে নতুন প্রকল্প",
                "শিক্ষার্থীদের জন্য নতুন সুযোগ",
                "বাজারে পণ্যের দামে পরিবর্তন",
              ].map((news, index) => (
                <div
                  key={index}
                  className="flex gap-2 border-b border-gray-100 px-3 py-2 last:border-0"
                >

                  <span className="text-xs font-bold text-red-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="text-[10px] leading-4 text-gray-700">
                    {news}
                  </p>

                </div>
              ))}

            </div>

          </aside>

        </section>


        {/* ================= SECTION 1 ================= */}
        <section className="mt-8">

          <div className="mb-3 flex items-center gap-2">
            <h2 className="text-sm font-bold text-gray-800">
              জাতীয়
            </h2>

            <div className="h-[2px] flex-1 bg-red-600" />
          </div>


          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">

            {/* Card */}
            <article className="overflow-hidden rounded border border-gray-200 bg-white">

              <div className="relative h-36 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620"
                  alt=""
                  className="h-full w-full object-cover transition hover:scale-105"
                />
              </div>

              <div className="p-2.5">

                <p className="text-[9px] font-semibold text-red-600">
                  জাতীয়
                </p>

                <h3 className="mt-1 line-clamp-2 text-xs font-bold leading-5">
                  দেশের বিভিন্ন অঞ্চলে নতুন উন্নয়ন কার্যক্রম শুরু
                </h3>

                <p className="mt-1 text-[9px] text-gray-400">
                  ২০ মিনিট আগে
                </p>

              </div>

            </article>


            {/* Card */}
            <article className="overflow-hidden rounded border border-gray-200 bg-white">

              <div className="relative h-36 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1495020689067-958852a7765e"
                  alt=""
                  className="h-full w-full object-cover transition hover:scale-105"
                />
              </div>

              <div className="p-2.5">

                <p className="text-[9px] font-semibold text-red-600">
                  জাতীয়
                </p>

                <h3 className="mt-1 line-clamp-2 text-xs font-bold leading-5">
                  গুরুত্বপূর্ণ সিদ্ধান্ত জানাল সংশ্লিষ্ট কর্তৃপক্ষ
                </h3>

                <p className="mt-1 text-[9px] text-gray-400">
                  ৩০ মিনিট আগে
                </p>

              </div>

            </article>


            {/* Card */}
            <article className="overflow-hidden rounded border border-gray-200 bg-white">

              <div className="relative h-36 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da"
                  alt=""
                  className="h-full w-full object-cover transition hover:scale-105"
                />
              </div>

              <div className="p-2.5">

                <p className="text-[9px] font-semibold text-red-600">
                  জাতীয়
                </p>

                <h3 className="mt-1 line-clamp-2 text-xs font-bold leading-5">
                  নতুন প্রকল্প নিয়ে সরকারের গুরুত্বপূর্ণ আলোচনা
                </h3>

                <p className="mt-1 text-[9px] text-gray-400">
                  ৪০ মিনিট আগে
                </p>

              </div>

            </article>


            {/* Card */}
            <article className="overflow-hidden rounded border border-gray-200 bg-white">

              <div className="relative h-36 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1500534623283-312aade485b7"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-2.5">

                <p className="text-[9px] font-semibold text-red-600">
                  জাতীয়
                </p>

                <h3 className="mt-1 text-xs font-bold leading-5">
                  দেশের বিভিন্ন স্থানে সচেতনতামূলক কর্মসূচি
                </h3>

                <p className="mt-1 text-[9px] text-gray-400">
                  ১ ঘণ্টা আগে
                </p>

              </div>

            </article>


            {/* Card */}
            <article className="overflow-hidden rounded border border-gray-200 bg-white">

              <div className="relative h-36 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1473445361085-b9a07f55608b"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-2.5">

                <p className="text-[9px] font-semibold text-red-600">
                  জাতীয়
                </p>

                <h3 className="mt-1 text-xs font-bold leading-5">
                  দেশের মানুষের জন্য নতুন উদ্যোগ
                </h3>

                <p className="mt-1 text-[9px] text-gray-400">
                  ২ ঘণ্টা আগে
                </p>

              </div>

            </article>

          </div>

        </section>


        {/* ================= SECTION 2 ================= */}
        <section className="mt-8">

          <div className="mb-3 flex items-center gap-2">
            <h2 className="text-sm font-bold text-gray-800">
              রাজনীতি
            </h2>

            <div className="h-[2px] flex-1 bg-red-600" />
          </div>


          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">

            {[1, 2, 3, 4].map((item) => (
              <article
                key={item}
                className="overflow-hidden rounded border border-gray-200 bg-white"
              >

                <div className="relative h-36 overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/photo-${[
                      "1529107386315-e1a2ed48a620",
                      "1555848962-6e79363ec58f",
                      "1495020689067-958852a7765e",
                      "1500534623283-312aade485b7",
                    ][item - 1]}`}
                    alt=""
                    className="h-full w-full object-cover transition hover:scale-105"
                  />
                </div>

                <div className="p-2.5">

                  <p className="text-[9px] font-semibold text-red-600">
                    রাজনীতি
                  </p>

                  <h3 className="mt-1 line-clamp-2 text-xs font-bold leading-5">
                    রাজনৈতিক অঙ্গনে নতুন আলোচনা ও গুরুত্বপূর্ণ সিদ্ধান্ত
                  </h3>

                  <p className="mt-1 text-[9px] text-gray-400">
                    ১ ঘণ্টা আগে
                  </p>

                </div>

              </article>
            ))}

          </div>

        </section>


        {/* ================= SECTION 3 ================= */}
        <section className="mt-8">

          <div className="mb-3 flex items-center gap-2">
            <h2 className="text-sm font-bold text-gray-800">
              আন্তর্জাতিক
            </h2>

            <div className="h-[2px] flex-1 bg-red-600" />
          </div>


          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">

            {[1, 2, 3, 4].map((item) => (
              <article
                key={item}
                className="overflow-hidden rounded border border-gray-200 bg-white"
              >

                <div className="relative h-36 overflow-hidden bg-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1521292270410-a8c4d7169bd1"
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-2.5">

                  <p className="text-[9px] font-semibold text-red-600">
                    আন্তর্জাতিক
                  </p>

                  <h3 className="mt-1 line-clamp-2 text-xs font-bold leading-5">
                    আন্তর্জাতিক অঙ্গনে নতুন গুরুত্বপূর্ণ ঘটনা
                  </h3>

                  <p className="mt-1 text-[9px] text-gray-400">
                    ২ ঘণ্টা আগে
                  </p>

                </div>

              </article>
            ))}

          </div>

        </section>


        {/* ================= SECTION 4 ================= */}
        <section className="mt-8">

          <div className="mb-3 flex items-center gap-2">
            <h2 className="text-sm font-bold text-gray-800">
              খেলা
            </h2>

            <div className="h-[2px] flex-1 bg-red-600" />
          </div>


          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">

            {[1, 2, 3, 4].map((item) => (
              <article
                key={item}
                className="overflow-hidden rounded border border-gray-200 bg-white"
              >

                <div className="relative h-36 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211"
                    alt=""
                    className="h-full w-full object-cover transition hover:scale-105"
                  />
                </div>

                <div className="p-2.5">

                  <p className="text-[9px] font-semibold text-red-600">
                    খেলা
                  </p>

                  <h3 className="mt-1 line-clamp-2 text-xs font-bold leading-5">
                    আজকের ম্যাচ নিয়ে বাড়ছে দর্শকদের আগ্রহ
                  </h3>

                  <p className="mt-1 text-[9px] text-gray-400">
                    ৩ ঘণ্টা আগে
                  </p>

                </div>

              </article>
            ))}

          </div>

        </section>

      </main>


      {/* ================= FOOTER ================= */}
      

    </div>
  );
};

export default HomePage;
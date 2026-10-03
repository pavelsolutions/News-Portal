import React from 'react';

const BreakingNews = () => {
    return (
        <section className="w-full overflow-hidden bg-red-700">
            <div className="mx-auto flex h-9 max-w-7xl items-center">

                {/* Breaking News */}
                <div className="z-10 flex h-full shrink-0 items-center bg-red-800 px-5">
                    <span className="text-xs font-semibold text-white">
                        সর্বশেষ
                    </span>
                </div>

                {/* News Ticker */}
                <div className="flex-1 overflow-hidden">
                    <div className="flex w-max animate-[ticker_30s_linear_infinite] whitespace-nowrap items-center">

                        <span className="px-4 text-xs text-white">
                            এইচপিতে বিনোদন জগতে নতুন খবর
                        </span>

                        <span className="text-white">•</span>

                        <span className="px-4 text-xs text-white">
                            বিনোদনের কোন ঘটনায় গ্রেফতার আতঙ্কে?
                        </span>

                        <span className="text-white">•</span>

                        <span className="px-4 text-xs text-white">
                            বাংলাদেশের ক্রীড়ায় ও কেন কোরিয়ান সংস্কৃতি এত জনপ্রিয় হয়ে উঠলো?
                        </span>

                        <span className="text-white">•</span>

                        <span className="px-4 text-xs text-white">
                            মুসলিম যে নারীর হাত ধরে বিশ্বের প্রাচীনতম বিশ্ববিদ্যালয় গড়ে উঠেছিল
                        </span>

                        <span className="text-white">•</span>

                        <span className="px-4 text-xs text-white">
                            সাংবাদিক বৈঠকে নতুন তথ্য প্রকাশ
                        </span>

                    </div>
                </div>

            </div>
        </section>

    );
};

export default BreakingNews;
import React from 'react';

const Header = () => {
    return (

        <header className="border-b border-gray-200 bg-white">
            <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-4">

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-black text-sm font-bold text-white">
                        B
                    </div>

                    <div>
                        <h1 className="text-xl font-bold text-red-600">
                            Bangla News 24
                        </h1>

                        <p className="text-[9px] text-gray-400">
                            সত্য ও বস্তুনিষ্ঠ সংবাদ
                        </p>
                    </div>
                </div>

                {/* Language */}
                <button className="rounded bg-red-600 px-3 py-1 text-[10px] font-semibold text-white">
                    বাংলা
                </button>

            </div>
        </header>
    );
};

export default Header;
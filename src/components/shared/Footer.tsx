import { toBnDigits } from "@/lib/bn";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-8 text-xs text-gray-500 sm:flex-row sm:px-6">
        <p>© {toBnDigits(new Date().getFullYear())} Bangla Bulletin</p>

        <p>Source: BBC Bangla</p>
      </div>
    </footer>
  );
};

export default Footer;

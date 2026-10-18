import Link from "next/link";

const SectionHeader = ({
  title,
  href,
  actionLabel = "সব দেখুন",
}: {
  title: string;
  href?: string;
  actionLabel?: string;
}) => {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="h-5 w-1.5 rounded-full bg-red-600" />

      <h2 className="shrink-0 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
        {title}
      </h2>

      <div className="h-px flex-1 bg-gray-200" />

      {href && (
        <Link
          href={href}
          className="shrink-0 text-xs font-semibold text-red-600 transition hover:text-red-700"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;

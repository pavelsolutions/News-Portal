import MainNews from "./MainNews";
import MostReadingNews from "./MostReadingNews";
import RelatedNews from "./RelatedNews";
import SelectedNews from "./SelectedNews";

const HomePage = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      {/* ================= HERO ================= */}
      <div className="grid items-start gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* Main / Featured */}
        <MainNews />

        {/* Latest */}
        <RelatedNews />
      </div>

      {/* ================= MOST READ ================= */}
      <div className="mt-10">
        <MostReadingNews />
      </div>

      {/* ================= SECTIONS ================= */}
      <div className="mt-10">
        <SelectedNews />
      </div>
    </div>
  );
};

export default HomePage;

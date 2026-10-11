import {
  BookOpen,
  Car,
  Dumbbell,
  Gamepad2,
  Home,
  Laptop,
  Shirt,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const icons = {
  electronics: Laptop,
  gaming: Gamepad2,
  home: Home,
  fashion: Shirt,
  beauty: Sparkles,
  sport: Dumbbell,
  auto: Car,
  books: BookOpen,
};

function CategoryCard({ category }) {
  const { language } = useLanguage();

  const Icon = icons[category.id] || Laptop;

  return (
    <Link
      to={`/products?category=${category.id}`}
      className="group rounded-[24px] border border-white/[0.07] bg-white/[0.035] p-5 transition duration-300 hover:-translate-y-1 hover:border-emerald-400/25 hover:bg-white/[0.055]"
    >
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-400/[0.09] text-emerald-400 transition group-hover:bg-emerald-400 group-hover:text-black">
        <Icon size={22} />
      </div>

      <h3 className="mt-5 text-lg font-black">
        {category.name[language]}
      </h3>

      <p className="mt-2 text-sm leading-6 text-zinc-500">
        {category.description[language]}
      </p>
    </Link>
  );
}

export default CategoryCard;
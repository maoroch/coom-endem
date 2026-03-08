import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// ── Mock categories (replace with WooCommerce categories API) ──
const CATEGORIES = [
  {
    slug: 'breakfast',
    title: 'Wholesome Breakfast',
    description: 'Granolas, oats, cereals and more to start your day right.',
    image: '/img/catalog/WholesomeBreakfast.png',
    count: 12,
    accent: 'bg-[#FFCAB3]',
  },
  {
    slug: 'juices',
    title: 'Organic Juices',
    description: 'Cold-pressed and naturally sweetened fruit and veggie juices.',
    image: '/img/catalog/OrganicJuices.png',
    count: 8,
    accent: 'bg-[#B3E5C9]',
  },
  {
    slug: 'fruits',
    title: 'Dried & Fresh Fruits',
    description: 'Sun-dried, freeze-dried and fresh seasonal fruits.',
    image: '/img/catalog/DriedFreshFruits.png',
    count: 15,
    accent: 'bg-yellow-100',
  },
  {
    slug: 'nuts',
    title: 'Organic Nuts',
    description: 'Raw, roasted and mixed nut selections from trusted farms.',
    image: '/img/catalog/OrganicNuts.png',
    count: 10,
    accent: 'bg-[#FFCAB3]',
  },
  {
    slug: 'oils',
    title: 'Oils & Spreads',
    description: 'Cold-pressed oils, nut butters and organic honey.',
    image: '/img/catalog/WholesomeBreakfast.png',
    count: 7,
    accent: 'bg-[#B3E5C9]',
  },
  {
    slug: 'superfoods',
    title: 'Superfoods',
    description: 'Chia, flax, spirulina and other nutrient-dense essentials.',
    image: '/img/catalog/DriedFreshFruits.png',
    count: 9,
    accent: 'bg-yellow-100',
  },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-white mt-40">
      <div className="px-4 sm:px-6 lg:px-15 py-8 sm:py-12 lg:py-16 mt-8 sm:mt-12 lg:mt-16">

        {/* ── Header ── */}
        <div className="mb-10 sm:mb-12 lg:mb-16 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
              All Categories
            </h2>
            <p className="text-sm sm:text-base text-gray-500 mt-3 leading-relaxed max-w-xl">
              Browse our full range of organic product categories — find exactly what you're looking for.
            </p>
          </div>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 text-base font-semibold text-black hover:text-gray-600 transition-colors"
          >
            View All Products
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </Link>
        </div>

        {/* ── Featured top row — 2 large cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-5 sm:mb-6">
          {CATEGORIES.slice(0, 2).map(cat => (
            <Link key={cat.slug} href={`/shop?category=${cat.slug}`}>
              <div
                className="relative rounded-2xl sm:rounded-3xl overflow-hidden min-h-[280px] sm:min-h-[340px] flex items-end p-8 group cursor-pointer"
                style={{
                  backgroundImage: `url('${cat.image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />
                <div className="relative z-10 flex items-end justify-between w-full gap-4">
                  <div>
                    <span className={`inline-block px-3 py-1 ${cat.accent} text-gray-800 text-xs font-semibold rounded-full mb-3`}>
                      {cat.count} products
                    </span>
                    <h3 className="text-2xl font-bold text-white leading-tight">{cat.title}</h3>
                    <p className="text-white/70 text-sm mt-1 max-w-xs">{cat.description}</p>
                  </div>
                  <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center flex-shrink-0 group-hover:bg-black transition-colors duration-300">
                    <ArrowRight size={18} className="text-black group-hover:text-white transition-colors duration-300 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Remaining grid — 4 cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {CATEGORIES.slice(2).map(cat => (
            <Link key={cat.slug} href={`/shop?category=${cat.slug}`}>
              <div className="group flex flex-col rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 bg-white">

                {/* Image */}
                <div
                  className="relative h-44 overflow-hidden"
                  style={{
                    backgroundImage: `url('${cat.image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300" />
                  <span className={`absolute top-3 left-3 px-3 py-1 ${cat.accent} text-gray-800 text-xs font-semibold rounded-full`}>
                    {cat.count} products
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-gray-900 text-base mb-1.5 group-hover:text-yellow-500 transition-colors leading-snug">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed flex-1 line-clamp-2">
                    {cat.description}
                  </p>
                  <div className="flex items-center gap-1.5 mt-4 text-sm font-semibold text-black group-hover:gap-2.5 transition-all duration-200">
                    Shop now
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="flex justify-center mt-16 sm:mt-20">
          <Link
            href="/shop"
            className="group w-full sm:w-auto sm:min-w-80 border border-black rounded-full flex items-center justify-between pl-6 sm:pl-8 pr-2 py-2 sm:py-3 transition-all duration-300 ease-out hover:bg-black hover:text-white hover:shadow-xl active:scale-95"
          >
            <span className="text-sm sm:text-base font-bold tracking-wide">Browse All Products</span>
            <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-black flex items-center justify-center group-hover:bg-white transition-all duration-300 group-hover:scale-110 flex-shrink-0">
              <ArrowRight className="text-white group-hover:text-black transition-all duration-300 group-hover:translate-x-1" size={20} strokeWidth={2.5} />
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
}
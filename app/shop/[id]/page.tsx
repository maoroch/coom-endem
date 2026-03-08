import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart, ArrowLeft, Star, Package, Tag } from "lucide-react";
import productsData from "@/data/products.json";
import type { Product } from "@/types/product";

interface Props {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return productsData.map((p) => ({ id: String(p.id) }));
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product: Product | undefined = productsData.find(
    (p) => p.id === Number(id)
  );

  if (!product) return notFound();

  const isOrganic = product.tags?.includes("organic");

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 sm:px-6 lg:px-15 pt-48 pb-16 sm:pb-20">

        {/* ── Back link ── */}
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors mb-10 group font-medium"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Shop
        </Link>

        {/* ── Main Card ── */}
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,500px)_1fr] rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-100 shadow-lg">

          {/* Image */}
          <div className="flex items-center justify-center bg-gray-50 p-6 sm:p-10">
            <div className="relative w-full max-w-[420px] aspect-square rounded-2xl overflow-hidden bg-gray-100 mx-auto">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />

            {/* Organic badge — #B3E5C9 from Blog */}
            {isOrganic && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-[#B3E5C9] text-gray-800 text-xs font-semibold rounded-full">
                Organic
              </span>
            )}

            {/* Category badge */}
            {!isOrganic && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-white text-gray-700 text-xs font-semibold rounded-full shadow-sm uppercase tracking-wide">
                {product.category}
              </span>
            )}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-between gap-6 p-8 sm:p-10 bg-white">
            <div className="flex flex-col gap-5">

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < Math.round(product.rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-200 fill-gray-200"
                      }
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-800">{product.rating}</span>
                <span className="text-gray-300">·</span>
                <span className="text-gray-400 text-sm">{product.reviews} reviews</span>
              </div>

              {/* Name */}
              <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-gray-900">
                {product.name}
              </h1>

              {/* Description */}
              <p className="text-gray-600 text-base leading-relaxed">
                {product.description}
              </p>

              {/* Tags */}
              <div className="flex items-center gap-2 flex-wrap">
                {product.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="h-px bg-gray-100" />

            {/* Price & Actions */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-1">Price</span>
                <span className="text-4xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
              </div>

              <div className="flex items-center gap-3">
                {/* Favorite — pill style matching landing */}
                <button
                  className="p-3 rounded-full border border-gray-200 hover:border-red-200 hover:bg-[#FFCAB3]/30 hover:text-red-500 transition-all duration-200 text-gray-400 active:scale-95"
                  aria-label="Add to favorites"
                >
                  <Heart size={19} />
                </button>

                {/* Add to Cart — same pill CTA as Banner / Catalog */}
                <button className="group inline-flex items-center gap-2 px-6 py-3.5 bg-black text-white text-sm font-bold rounded-full hover:bg-gray-900 hover:shadow-lg active:scale-95 transition-all duration-300">
                  <ShoppingCart size={17} />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Details Section ── */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* About — 2 cols */}
          <div className="md:col-span-2 bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-full bg-[#B3E5C9] flex items-center justify-center">
                <Tag size={15} className="text-gray-700" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">About this product</h2>
            </div>
            <p className="text-gray-500 leading-[1.85] text-base">
              {product.fullDescription}
            </p>
          </div>

          {/* Meta — 1 col */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm p-8 sm:p-10 flex flex-col gap-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-full bg-[#FFCAB3] flex items-center justify-center">
                <Package size={15} className="text-gray-700" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Product Info</h2>
            </div>

            {[
              { label: "Category", value: product.category },
              { label: "Rating", value: `${product.rating} / 5` },
              { label: "Reviews", value: `${product.reviews}` },
              { label: "Price", value: `$${product.price.toFixed(2)}` },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center py-3.5 border-b border-gray-50 last:border-0">
                <span className="text-gray-400 text-sm">{label}</span>
                <span className="text-sm font-semibold text-gray-800">{value}</span>
              </div>
            ))}

            <div className="pt-4 flex flex-col gap-2">
              <span className="text-gray-400 text-sm">Tags</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {product.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA pill — same style as Catalog "See Products" */}
            <div className="mt-6">
              <Link
                href="/shop"
                className="group w-full border border-black rounded-full flex items-center justify-between pl-5 pr-2 py-2 transition-all duration-300 ease-out hover:bg-black hover:text-white active:scale-95"
              >
                <span className="text-sm font-bold tracking-wide">Browse More</span>
                <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center group-hover:bg-white transition-all duration-300 flex-shrink-0">
                  <ArrowLeft
                    size={16}
                    className="text-white group-hover:text-black transition-colors duration-300 rotate-180 group-hover:translate-x-0.5 transition-transform"
                  />
                </div>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock, Calendar } from 'lucide-react';
import postsData from '@/data/blog.json';
import type { BlogPost } from '@/types/blog';

// При интеграции с WordPress замени на:
// const res = await fetch(`https://your-site.com/wp-json/wp/v2/posts?slug=${slug}&_embed`);
// const [post] = await res.json();

const posts: BlogPost[] = postsData as BlogPost[];

const CATEGORY_COLORS: Record<string, string> = {
  Health:    'bg-[#B3E5C9] text-gray-800',
  Recipes:   'bg-[#FFCAB3] text-gray-800',
  Education: 'bg-yellow-100 text-gray-800',
  Nutrition: 'bg-[#B3E5C9] text-gray-800',
  Lifestyle: 'bg-[#FFCAB3] text-gray-800',
};

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find(p => p.slug === slug);

  if (!post) return notFound();

  const related = posts.filter(p => p.slug !== slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-white mt-40">
      <div className="px-4 sm:px-6 lg:px-15 py-8 sm:py-12 lg:py-16 mt-8 sm:mt-12 lg:mt-16">

        {/* ── Back link ── */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors mb-10 group font-medium"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Blog
        </Link>

        {/* ── Article + Sidebar ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 lg:gap-16 items-start">

          {/* ── Article ── */}
          <article>

            {/* Hero image */}
            <div className="relative w-full h-64 sm:h-80 md:h-[420px] rounded-2xl sm:rounded-3xl overflow-hidden mb-8">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 1024px) 100vw, 70vw"
                className="object-cover"
                priority
              />
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className={`px-3 py-1.5 text-xs font-semibold rounded-full ${CATEGORY_COLORS[post.category] ?? 'bg-gray-100 text-gray-700'}`}>
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-400">
                <Calendar size={12} /> {post.date}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-400">
                <Clock size={12} /> {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              {post.title}
            </h1>

            {/* Excerpt lead */}
            <p className="text-base sm:text-lg text-gray-500 leading-relaxed mb-8 border-l-4 border-[#B3E5C9] pl-5">
              {post.excerpt}
            </p>

            {/* Body — content is string[] in JSON, each item = paragraph */}
            <div className="space-y-5 text-gray-700 text-base leading-[1.9]">
              {post.content.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-gray-100">
              {post.tags.map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </article>

          {/* ── Sidebar ── */}
          <aside className="flex flex-col gap-6">

            {/* About */}
            <div className="bg-[#B3E5C9] rounded-2xl p-6">
              <p className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-3">About the blog</p>
              <p className="text-sm text-gray-700 leading-relaxed">
                Tips, recipes and stories from the world of organic living — written for curious, health-conscious people.
              </p>
            </div>

            {/* Related posts */}
            {related.length > 0 && (
              <div>
                <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-5">Related Articles</p>
                <div className="flex flex-col gap-4">
                  {related.map(p => (
                    <Link key={p.id} href={`/blog/${p.slug}`}>
                      <div className="group flex gap-4 items-start">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                          <Image
                            src={p.image}
                            alt={p.title}
                            fill
                            sizes="64px"
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-400 mb-1">{p.date}</p>
                          <h4 className="text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-yellow-500 transition-colors leading-snug">
                            {p.title}
                          </h4>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Shop CTA */}
            <div className="bg-[#FFCAB3] rounded-2xl p-6 flex flex-col gap-4">
              <p className="text-xs font-bold tracking-widest text-gray-500 uppercase">Shop Organic</p>
              <p className="text-sm text-gray-700 leading-relaxed">
                Put these tips into practice — browse our curated range of organic products.
              </p>
              <Link
                href="/shop"
                className="group inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white text-xs font-bold rounded-full hover:bg-gray-900 active:scale-95 transition-all duration-300 w-fit"
              >
                Visit Shop
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>

          </aside>
        </div>

        {/* ── Bottom CTA ── */}
        <div className="flex justify-center mt-16 sm:mt-20">
          <Link
            href="/blog"
            className="group w-full sm:w-auto sm:min-w-80 border border-black rounded-full flex items-center justify-between pl-6 sm:pl-8 pr-2 py-2 sm:py-3 transition-all duration-300 ease-out hover:bg-black hover:text-white hover:shadow-xl active:scale-95"
          >
            <span className="text-sm sm:text-base font-bold tracking-wide">More Articles</span>
            <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-black flex items-center justify-center group-hover:bg-white transition-all duration-300 group-hover:scale-110 flex-shrink-0">
              <ArrowRight className="text-white group-hover:text-black transition-all duration-300 group-hover:translate-x-1" size={20} strokeWidth={2.5} />
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
}
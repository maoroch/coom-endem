'use client'
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Search, ChevronDown, LogOut, Package, Heart, ShoppingCart } from "lucide-react";
import type { SearchResult } from "@/types/product";
import { useAuth } from "@/context/Authcontext";
import { useCart } from "@/context/Cartcontext";

// ── SearchBox вынесен наружу ──
interface SearchBoxProps {
  query: string;
  results: SearchResult[];
  isLoading: boolean;
  isDropdownOpen: boolean;
  mobile?: boolean;
  searchRef?: React.RefObject<HTMLDivElement | null>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  onResultClick: () => void;
  onFocus: () => void;
}

function SearchBox({
  query, results, isLoading, isDropdownOpen,
  mobile, searchRef, onChange, onSearch, onResultClick, onFocus,
}: SearchBoxProps) {
  return (
    <div ref={searchRef} className="relative w-full">
      <button type="button" onClick={onSearch}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10" aria-label="Search">
        {isLoading
          ? <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
          : <img src="/icons/search.svg" alt="" className="w-5 h-5 opacity-60 hover:opacity-100 transition-opacity" />
        }
      </button>
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={onChange}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
        onFocus={onFocus}
        className={`w-full pl-12 pr-4 rounded-full bg-[#F7F6F4] focus:outline-none focus:ring-2 focus:ring-black/10 transition-all ${mobile ? "h-[45px]" : "h-[50px]"}`}
      />
      {query.length > 0 && query.length < 3 && (
        <p className="absolute top-full left-4 mt-1.5 text-xs text-gray-400">
          Type {3 - query.length} more character{3 - query.length !== 1 ? 's' : ''}…
        </p>
      )}
      {isDropdownOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
          {results.length === 0 && !isLoading ? (
            <div className="flex items-center gap-3 px-4 py-5 text-sm text-gray-400">
              <Search size={16} className="shrink-0" />
              No products found for &quot;{query}&quot;
            </div>
          ) : (
            <>
              <ul>
                {results.map((product) => (
                  <li key={product.id} className="border-b border-gray-50 last:border-0">
                    <Link href={`/shop/${product.slug}`} onClick={onResultClick}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                      <div className="w-11 h-11 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                        {product.image
                          ? <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                          : <div className="w-full h-full flex items-center justify-center text-lg">🌿</div>
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{product.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">${product.price}</p>
                      </div>
                      <span className="text-gray-300 text-sm">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <button onClick={onSearch}
                className="w-full text-center text-sm font-medium text-gray-500 hover:text-black py-3 hover:bg-gray-50 transition-colors border-t border-gray-100">
                See all results for &quot;{query}&quot;
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ── CartIcon — иконка корзины с бейджем ──
function CartIcon() {
  const { totalItems } = useCart();
  return (
    <li className="grid w-15 place-items-center text-center cursor-pointer group">
      <Link href="/cart">
        <div className="relative p-2 rounded-lg group-hover:bg-gray-100 flex items-center justify-center transition-colors">
          <ShoppingCart size={20} className="text-gray-700 group-hover:text-black transition-colors" />
          {totalItems > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
              {totalItems > 99 ? '99+' : totalItems}
            </span>
          )}
        </div>
        <span className="text-xs font-medium hover:text-black transition-colors">Cart</span>
      </Link>
    </li>
  );
}

// ── UserMenu — десктопный дропдаун ──
function UserMenu() {
  const { user, logout, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (loading) {
    return <li><div className="w-20 h-8 bg-gray-100 animate-pulse rounded-full" /></li>;
  }

  if (!user) {
    return (
      <li className="grid w-15 place-items-center text-center cursor-pointer group">
        <Link href="/login">
          <div className="p-2 rounded-lg group-hover:bg-gray-100 flex items-center justify-center transition-colors">
            <img src="/icons/auth.svg" alt="Sign in" width={20} height={20} />
          </div>
          <span className="text-xs font-medium hover:text-black transition-colors">Sign in</span>
        </Link>
      </li>
    );
  }

  const initials = (user.firstName?.[0] ?? user.email[0]).toUpperCase();
  const displayName = user.firstName || user.displayName.split(' ')[0];

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(p => !p)}
        className="flex items-center gap-1 p-1 rounded-full hover:bg-gray-100 transition-colors">
        <div className="w-8 h-8 rounded-full bg-[#B3E5C9] flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-bold text-gray-800">{initials}</span>
        </div>
        <ChevronDown size={13} className={`text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-gray-50">
            <p className="text-sm font-bold text-gray-900 truncate">{user.firstName} {user.lastName}</p>
            <p className="text-xs text-gray-400 truncate mt-0.5">{user.email}</p>
          </div>
          <div className="py-1.5">
            {[
              { href: '/orders',     Icon: Package, label: 'My Orders'     },
              { href: '/favourites', Icon: Heart,   label: 'My Favourites' },
            ].map(({ href, Icon, label }) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors">
                <Icon size={15} className="text-gray-400" />
                {label}
              </Link>
            ))}
          </div>
          <div className="border-t border-gray-50 py-1.5">
            <button onClick={() => { logout(); setOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-[#FFCAB3]/30 transition-colors">
              <LogOut size={15} />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Основной компонент ──
export default function NavbarMain() {
  const { user, logout } = useAuth();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortController = useRef<AbortController | null>(null);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Products" },
    { href: "/categories", label: "Categories" },
    { href: "/discounts", label: "Discounts" },
    { href: "/blog", label: "Blog" },
  ];

  const staticLinks = [
    { href: "/favourites", label: "Favourite", icon: "/icons/favourite.svg" },
    { href: "/orders",     label: "Orders",    icon: "/icons/orders.svg"    },
  ];

  const fetchResults = useCallback(async (q: string) => {
    if (q.trim().length < 3) { setResults([]); setIsDropdownOpen(false); setIsLoading(false); return; }
    if (abortController.current) abortController.current.abort();
    abortController.current = new AbortController();
    setIsLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, { signal: abortController.current.signal });
      const data: SearchResult[] = await res.json();
      setResults(data); setIsDropdownOpen(true);
    } catch (e: any) {
      if (e?.name !== 'AbortError') setResults([]);
    } finally { setIsLoading(false); }
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim().length >= 3) setIsLoading(true);
    else { setIsLoading(false); setResults([]); setIsDropdownOpen(false); }
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => fetchResults(val), 500);
  }, [fetchResults]);

  const handleSearch = useCallback(() => {
    if (!query.trim()) return;
    setIsDropdownOpen(false);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    if (abortController.current) abortController.current.abort();
    router.push(`/search?q=${encodeURIComponent(query)}`);
    setQuery("");
  }, [query, router]);

  const handleResultClick = useCallback(() => {
    setIsDropdownOpen(false); setQuery(""); setIsMenuOpen(false);
  }, []);

  const handleFocus = useCallback(() => {
    if (results.length > 0) setIsDropdownOpen(true);
  }, [results.length]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!searchRef.current?.contains(t) && !mobileSearchRef.current?.contains(t))
        setIsDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y < lastScrollY || y < 50) setIsVisible(true);
      else if (y > lastScrollY && y > 50) setIsVisible(false);
      setLastScrollY(y);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const sharedProps = {
    query, results, isLoading, isDropdownOpen,
    onChange: handleInputChange, onSearch: handleSearch,
    onResultClick: handleResultClick, onFocus: handleFocus,
  };

  return (
    <header className={`fixed top-0 left-0 right-0 bg-white text-gray-800 border-b border-gray-100 z-50 transition-transform duration-300 ease-out ${isVisible ? "translate-y-0" : "-translate-y-full"}`}>

      <nav className="navbar flex px-4 md:px-15 py-6 gap-6 items-center justify-between md:justify-start">
        <div className="logo">
          <Link href="/">
            <Image src="/img/logos/logo.svg" className="w-[80px] md:w-[100px]" alt="Logo" width={100} height={50} />
          </Link>
        </div>

        <div className="hidden md:block relative w-full">
          <SearchBox {...sharedProps} searchRef={searchRef} />
        </div>

        <div className="hidden md:flex nav-links justify-end">
          <ul className="flex gap-5 items-center">
            {staticLinks.map((link) => (
              <li key={link.href} className="grid w-15 place-items-center text-center cursor-pointer group">
                <Link href={link.href}>
                  <div className="p-2 rounded-lg group-hover:bg-gray-100 flex items-center justify-center transition-colors">
                    <img src={link.icon} alt={link.label} width={20} height={20} />
                  </div>
                  <span className="text-xs font-medium hover:text-black transition-colors">{link.label}</span>
                </Link>
              </li>
            ))}
            <CartIcon />
            <UserMenu />
          </ul>
        </div>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 ml-auto p-2" aria-label="Toggle menu">
          <span className={`w-6 h-0.5 bg-black transition-all duration-300 origin-center ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`} />
          <span className={`w-6 h-0.5 bg-black transition-all duration-300 origin-center ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      <div className="links hidden md:block border-t border-gray-100">
        <ul className="flex gap-8 px-15 py-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-black transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-black after:transition-all after:duration-300 hover:after:w-full">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {isMenuOpen && <div className="fixed inset-0 z-40 md:hidden" onClick={() => setIsMenuOpen(false)} />}

      {/* Mobile Drawer */}
      <div className={`fixed top-0 left-0 h-screen w-72 bg-white shadow-xl z-40 md:hidden transform transition-transform duration-300 ease-in-out overflow-y-auto ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="pt-5 px-6 pb-6">
          <div className="mb-8">
            <div className="logo mb-5">
              <Link href="/"><Image src="/img/logos/logo.svg" className="w-[80px]" alt="Logo" width={100} height={50} /></Link>
            </div>
            <SearchBox {...sharedProps} mobile searchRef={mobileSearchRef} />
          </div>

          <nav className="mb-8">
            <h3 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-wider">Menu</h3>
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} onClick={() => setIsMenuOpen(false)}
                    className="block py-3 px-3 text-gray-700 font-medium rounded-lg hover:bg-gray-100 hover:text-black transition-all duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-wider">Account</h3>

            {user ? (
              <div className="flex flex-col gap-1">
                {/* Профиль */}
                <div className="flex items-center gap-3 px-3 py-3 mb-1">
                  <div className="w-9 h-9 rounded-full bg-[#B3E5C9] flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-gray-800">
                      {(user.firstName?.[0] ?? user.email[0]).toUpperCase()}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  </div>
                </div>
                {[
                  { href: '/cart',       icon: '/icons/cart.svg',      label: 'Cart'          },
                  { href: '/orders',     icon: '/icons/orders.svg',    label: 'My Orders'     },
                  { href: '/favourites', icon: '/icons/favourite.svg', label: 'My Favourites' },
                ].map(link => (
                  <Link key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 py-3 px-3 text-gray-700 font-medium rounded-lg hover:bg-gray-100 hover:text-black transition-all duration-200">
                    <img src={link.icon} alt={link.label} width={20} height={20} />
                    {link.label}
                  </Link>
                ))}
                <button onClick={() => { logout(); setIsMenuOpen(false); }}
                  className="flex items-center gap-3 py-3 px-3 text-red-500 font-medium rounded-lg hover:bg-[#FFCAB3]/30 transition-all duration-200 mt-1">
                  <LogOut size={20} />
                  Sign Out
                </button>
              </div>
            ) : (
              <ul className="flex flex-col gap-1">
                {[
                  { href: "/favourites", label: "Favourite", icon: "/icons/favourite.svg" },
                  { href: "/cart",       label: "Cart",      icon: "/icons/cart.svg"      },
                  { href: "/orders",     label: "Orders",    icon: "/icons/orders.svg"    },
                  { href: "/login",      label: "Sign in",   icon: "/icons/auth.svg"      },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 py-3 px-3 text-gray-700 font-medium rounded-lg hover:bg-gray-100 hover:text-black transition-all duration-200">
                      <img src={link.icon} alt={link.label} width={20} height={20} />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
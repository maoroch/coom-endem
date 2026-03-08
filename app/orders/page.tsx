'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Package, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';

// ── Types (will map to WooCommerce order object later) ──
type OrderStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface OrderItem {
  id: number;
  name: string;
  image: string;
  price: number;
  qty: number;
}

interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  shippingAddress: string;
}

// ── Mock data (replace with WooCommerce API response) ──
const MOCK_ORDERS: Order[] = [
  {
    id: '#10482',
    date: 'March 5, 2025',
    status: 'delivered',
    total: 47.97,
    shippingAddress: '12 Green Lane, London, UK',
    items: [
      { id: 1, name: 'Organic Almonds 500g', image: '/img/instagram/1.png', price: 14.99, qty: 2 },
      { id: 2, name: 'Cold-pressed Orange Juice', image: '/img/instagram/2.png', price: 7.99, qty: 1 },
      { id: 3, name: 'Mixed Berry Granola', image: '/img/instagram/3.png', price: 9.99, qty: 1 },
    ],
  },
  {
    id: '#10391',
    date: 'February 18, 2025',
    status: 'delivered',
    total: 29.98,
    shippingAddress: '12 Green Lane, London, UK',
    items: [
      { id: 4, name: 'Dried Mango Strips', image: '/img/instagram/4.png', price: 12.99, qty: 1 },
      { id: 5, name: 'Organic Cashews 250g', image: '/img/instagram/1.png', price: 16.99, qty: 1 },
    ],
  },
  {
    id: '#10502',
    date: 'March 8, 2025',
    status: 'processing',
    total: 34.97,
    shippingAddress: '12 Green Lane, London, UK',
    items: [
      { id: 6, name: 'Organic Green Tea', image: '/img/instagram/2.png', price: 11.99, qty: 1 },
      { id: 7, name: 'Chia Seeds 400g', image: '/img/instagram/3.png', price: 8.99, qty: 1 },
      { id: 8, name: 'Coconut Oil 300ml', image: '/img/instagram/4.png', price: 13.99, qty: 1 },
    ],
  },
];

const STATUS_CONFIG: Record<OrderStatus, { label: string; bg: string; text: string }> = {
  processing: { label: 'Processing',  bg: 'bg-yellow-100',       text: 'text-yellow-700' },
  shipped:    { label: 'Shipped',     bg: 'bg-[#B3E5C9]/60',     text: 'text-green-700'  },
  delivered:  { label: 'Delivered',   bg: 'bg-[#B3E5C9]',        text: 'text-green-800'  },
  cancelled:  { label: 'Cancelled',   bg: 'bg-[#FFCAB3]',        text: 'text-red-700'    },
};

function OrderCard({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);
  const status = STATUS_CONFIG[order.status];

  return (
    <div className="bg-white border border-gray-100 rounded-2xl sm:rounded-3xl shadow-sm overflow-hidden transition-shadow duration-200 hover:shadow-md">

      {/* ── Order header ── */}
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 sm:px-8 py-5 cursor-pointer select-none"
        onClick={() => setExpanded(p => !p)}
      >
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
            <Package size={18} className="text-gray-500" />
          </div>
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-gray-900 text-sm">{order.id}</span>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${status.bg} ${status.text}`}>
                {status.label}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">{order.date} · {order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <span className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</span>
          <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-gray-400 transition-colors">
            {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </div>
        </div>
      </div>

      {/* ── Expanded items ── */}
      {expanded && (
        <div className="border-t border-gray-50 px-6 sm:px-8 py-5 flex flex-col gap-4">

          {/* Items list */}
          {order.items.map(item => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 line-clamp-1">{item.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">Qty: {item.qty}</p>
              </div>
              <span className="text-sm font-bold text-gray-900 flex-shrink-0">
                ${(item.price * item.qty).toFixed(2)}
              </span>
            </div>
          ))}

          {/* Divider */}
          <div className="h-px bg-gray-50 my-1" />

          {/* Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs text-gray-400">Delivered to</p>
              <p className="text-sm text-gray-700 font-medium mt-0.5">{order.shippingAddress}</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Reorder — pill CTA style */}
              {order.status === 'delivered' && (
                <button
                  onClick={() => console.log('Reorder:', order.id)}
                  className="group inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white text-xs font-bold rounded-full hover:bg-gray-900 active:scale-95 transition-all duration-200"
                >
                  <RotateCcw size={13} />
                  Reorder
                </button>
              )}
              <Link
                href={`/orders/${order.id.replace('#', '')}`}
                className="text-xs font-semibold text-gray-500 hover:text-black underline underline-offset-2 transition-colors"
              >
                View details
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function OrdersPage() {
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all');

  const statuses: { key: OrderStatus | 'all'; label: string }[] = [
    { key: 'all',        label: 'All' },
    { key: 'processing', label: 'Processing' },
    { key: 'shipped',    label: 'Shipped' },
    { key: 'delivered',  label: 'Delivered' },
    { key: 'cancelled',  label: 'Cancelled' },
  ];

  const filtered = filter === 'all'
    ? MOCK_ORDERS
    : MOCK_ORDERS.filter(o => o.status === filter);

  return (
    <div className="min-h-screen bg-white mt-40">
      <div className="px-4 sm:px-6 lg:px-15 py-8 sm:py-12 lg:py-16 mt-8 sm:mt-12 lg:mt-16">

        {/* ── Header ── */}
        <div className="mb-10 sm:mb-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">My Orders</h2>
            <p className="text-sm text-gray-500 mt-3">
              {MOCK_ORDERS.length} order{MOCK_ORDERS.length !== 1 ? 's' : ''} total
            </p>
          </div>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 text-base font-semibold text-black hover:text-gray-600 transition-colors"
          >
            Continue Shopping
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </Link>
        </div>

        {/* ── Filter tabs ── */}
        <div className="flex gap-2 flex-wrap mb-8">
          {statuses.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                filter === key
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── Empty state ── */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-full bg-[#B3E5C9]/40 flex items-center justify-center mb-6">
              <Package size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No orders here</h3>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed mb-8">
              {filter === 'all'
                ? "You haven't placed any orders yet."
                : `No ${filter} orders found.`}
            </p>
            <Link
              href="/shop"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-black text-white text-sm font-bold rounded-full hover:bg-gray-900 hover:shadow-lg active:scale-95 transition-all duration-300"
            >
              Start Shopping
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        )}

        {/* ── Orders list ── */}
        {filtered.length > 0 && (
          <div className="flex flex-col gap-4">
            {filtered.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}

        {/* ── Bottom CTA ── */}
        {filtered.length > 0 && (
          <div className="flex justify-center mt-16 sm:mt-20">
            <Link
              href="/shop"
              className="group w-full sm:w-auto sm:min-w-80 border border-black rounded-full flex items-center justify-between pl-6 sm:pl-8 pr-2 py-2 sm:py-3 transition-all duration-300 ease-out hover:bg-black hover:text-white hover:shadow-xl active:scale-95"
            >
              <span className="text-sm sm:text-base font-bold tracking-wide">Shop Again</span>
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-black flex items-center justify-center group-hover:bg-white transition-all duration-300 group-hover:scale-110 flex-shrink-0">
                <ArrowRight className="text-white group-hover:text-black transition-all duration-300 group-hover:translate-x-1" size={20} strokeWidth={2.5} />
              </div>
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
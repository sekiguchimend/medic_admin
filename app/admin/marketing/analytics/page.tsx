"use client";

import { useState } from "react";
import Link from "next/link";

const pageViews = [
  { page: "/", name: "トップページ", views: 12450, uniqueUsers: 8920 },
  { page: "/about", name: "協会について", views: 3420, uniqueUsers: 2890 },
  { page: "/plans", name: "保険プラン", views: 2890, uniqueUsers: 2340 },
  { page: "/contact", name: "お問い合わせ", views: 1560, uniqueUsers: 1320 },
  { page: "/members", name: "会員ページ", views: 980, uniqueUsers: 780 },
];

const trafficSources = [
  { source: "検索エンジン", sessions: 5620, percentage: 45 },
  { source: "ダイレクト", sessions: 3120, percentage: 25 },
  { source: "リファラル", sessions: 2480, percentage: 20 },
  { source: "ソーシャル", sessions: 1240, percentage: 10 },
];

const stats = {
  totalUsers: 12480,
  newUsers: 3420,
  sessions: 18960,
  avgSessionDuration: "3:24",
  bounceRate: 42.5,
  pageViewsPerSession: 2.8,
};

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("30days");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/marketing" className="text-[#0073aa] hover:underline text-sm">
            戻る
          </Link>
          <div>
            <h1 className="text-2xl font-medium text-gray-600">アクセス解析</h1>
            <p className="text-gray-500 mt-1">サイトのアクセス状況を確認します</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
          >
            <option value="7days">過去7日間</option>
            <option value="30days">過去30日間</option>
            <option value="90days">過去90日間</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">ユーザー数</p>
          <p className="text-xl font-bold text-[#323232]">{stats.totalUsers.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">新規ユーザー</p>
          <p className="text-xl font-bold text-[#0073aa]">{stats.newUsers.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">セッション数</p>
          <p className="text-xl font-bold text-[#323232]">{stats.sessions.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">平均滞在時間</p>
          <p className="text-xl font-bold text-[#323232]">{stats.avgSessionDuration}</p>
        </div>
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">直帰率</p>
          <p className="text-xl font-bold text-[#323232]">{stats.bounceRate}%</p>
        </div>
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">ページ/セッション</p>
          <p className="text-xl font-bold text-[#323232]">{stats.pageViewsPerSession}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Page views */}
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-[#323232] mb-4">ページ別アクセス</h2>
          <div className="space-y-4">
            {pageViews.map((page) => (
              <div key={page.page} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#323232]">{page.name}</p>
                  <p className="text-xs text-gray-500">{page.page}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-[#323232]">{page.views.toLocaleString()} PV</p>
                  <p className="text-xs text-gray-500">{page.uniqueUsers.toLocaleString()} UU</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic sources */}
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-[#323232] mb-4">流入元</h2>
          <div className="space-y-4">
            {trafficSources.map((source) => (
              <div key={source.source}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-700">{source.source}</span>
                  <span className="text-sm font-medium text-[#323232]">
                    {source.sessions.toLocaleString()} ({source.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#0073aa] h-2 rounded-full"
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chart placeholder */}
      <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-[#323232] mb-4">アクセス推移</h2>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-[3px] border border-gray-200">
          <p className="text-gray-500">グラフエリア（Google Analytics連携で表示）</p>
        </div>
      </div>
    </div>
  );
}

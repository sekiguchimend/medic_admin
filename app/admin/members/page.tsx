"use client";

import { useState } from "react";
import Link from "next/link";

// ダミーデータ
const members = [
  {
    id: 1,
    name: "田中 太郎",
    email: "tanaka@example.com",
    phone: "03-1234-5678",
    clinic: "田中美容クリニック",
    societies: ["日本美容外科学会", "日本形成外科学会"],
    plan: "Aプラン",
    status: "アクティブ",
    joinDate: "2022-04-15",
    lastUpdated: "2024-01-10",
  },
  {
    id: 2,
    name: "佐藤 花子",
    email: "sato@example.com",
    phone: "03-2345-6789",
    clinic: "さくら皮膚科クリニック",
    societies: ["日本皮膚科学会", "日本美容皮膚科学会"],
    plan: "Bプラン",
    status: "アクティブ",
    joinDate: "2021-08-20",
    lastUpdated: "2024-01-08",
  },
  {
    id: 3,
    name: "山田 次郎",
    email: "yamada@example.com",
    phone: "06-3456-7890",
    clinic: "やまだ形成外科",
    societies: ["日本形成外科学会"],
    plan: "Cプラン",
    status: "アクティブ",
    joinDate: "2023-01-10",
    lastUpdated: "2024-01-05",
  },
  {
    id: 4,
    name: "鈴木 美咲",
    email: "suzuki@example.com",
    phone: "052-4567-8901",
    clinic: "スズキビューティークリニック",
    societies: ["日本美容医療協会", "日本美容外科学会"],
    plan: "Aプラン",
    status: "保留中",
    joinDate: "2023-06-01",
    lastUpdated: "2024-01-03",
  },
  {
    id: 5,
    name: "高橋 健一",
    email: "takahashi@example.com",
    phone: "011-5678-9012",
    clinic: "高橋美容外科クリニック",
    societies: ["日本美容外科学会（JSAPS）"],
    plan: "Bプラン",
    status: "アクティブ",
    joinDate: "2020-03-15",
    lastUpdated: "2024-01-01",
  },
  {
    id: 6,
    name: "伊藤 直美",
    email: "ito@example.com",
    phone: "092-6789-0123",
    clinic: "伊藤皮膚科美容クリニック",
    societies: ["日本皮膚科学会", "日本美容皮膚科学会"],
    plan: "Cプラン",
    status: "アクティブ",
    joinDate: "2021-11-20",
    lastUpdated: "2023-12-28",
  },
  {
    id: 7,
    name: "渡辺 裕介",
    email: "watanabe@example.com",
    phone: "078-7890-1234",
    clinic: "わたなべ美容形成クリニック",
    societies: ["日本形成外科学会", "日本美容外科学会"],
    plan: "Aプラン",
    status: "期限切れ",
    joinDate: "2019-05-10",
    lastUpdated: "2023-12-25",
  },
  {
    id: 8,
    name: "中村 由美",
    email: "nakamura@example.com",
    phone: "045-8901-2345",
    clinic: "なかむら美容皮膚科",
    societies: ["日本美容皮膚科学会"],
    plan: "Bプラン",
    status: "アクティブ",
    joinDate: "2022-09-01",
    lastUpdated: "2023-12-20",
  },
];

const societies = [
  "日本美容医療協会",
  "日本皮膚科学会",
  "日本美容皮膚科学会",
  "日本形成外科学会",
  "日本美容外科学会（JSAPS）",
];

export default function MembersPage() {
  const [viewMode, setViewMode] = useState<"list" | "card">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSocieties, setSelectedSocieties] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.clinic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSociety =
      selectedSocieties.length === 0 ||
      member.societies.some((s) => selectedSocieties.includes(s));

    const matchesStatus =
      statusFilter === "all" || member.status === statusFilter;

    return matchesSearch && matchesSociety && matchesStatus;
  });

  const toggleSociety = (society: string) => {
    setSelectedSocieties((prev) =>
      prev.includes(society)
        ? prev.filter((s) => s !== society)
        : [...prev, society]
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-medium text-gray-600">会員管理</h1>
          <p className="text-gray-500 mt-1">
            登録会員数: {members.length}名
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-[3px] text-sm font-medium text-gray-700 hover:bg-gray-50">
            CSV出力
          </button>
          <Link
            href="/admin/members/new"
            className="px-4 py-2 bg-[#0073aa] text-white rounded-[3px] text-sm font-medium hover:bg-[#005f8a]"
          >
            新規登録
          </Link>
        </div>
      </div>

      {/* Search and filters */}
      <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="会員名、クリニック名、メールアドレスで検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa] focus:border-transparent"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa] focus:border-transparent"
            >
              <option value="all">すべてのステータス</option>
              <option value="アクティブ">アクティブ</option>
              <option value="保留中">保留中</option>
              <option value="期限切れ">期限切れ</option>
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 border rounded-[3px] ${
                showFilters || selectedSocieties.length > 0
                  ? "bg-[#0073aa] text-white border-[#0073aa]"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              学会フィルター
              {selectedSocieties.length > 0 && (
                <span className="ml-2 bg-white text-[#0073aa] text-xs px-1.5 py-0.5 rounded">
                  {selectedSocieties.length}
                </span>
              )}
            </button>
            <div className="flex border border-gray-300 rounded-[3px] overflow-hidden">
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-2 text-sm ${
                  viewMode === "list"
                    ? "bg-[#0073aa] text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                一覧
              </button>
              <button
                onClick={() => setViewMode("card")}
                className={`px-3 py-2 text-sm ${
                  viewMode === "card"
                    ? "bg-[#0073aa] text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                カード
              </button>
            </div>
          </div>
        </div>

        {/* Society filter */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-2">
              所属学会でフィルター:
            </p>
            <div className="flex flex-wrap gap-2">
              {societies.map((society) => (
                <button
                  key={society}
                  onClick={() => toggleSociety(society)}
                  className={`px-3 py-1.5 text-sm rounded-[3px] border transition-colors ${
                    selectedSocieties.includes(society)
                      ? "bg-[#0073aa] text-white border-[#0073aa]"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {society}
                </button>
              ))}
              {selectedSocieties.length > 0 && (
                <button
                  onClick={() => setSelectedSocieties([])}
                  className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700"
                >
                  クリア
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* List view */}
      {viewMode === "list" && (
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    会員
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    クリニック
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    プラン
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    所属学会
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ステータス
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-[#0073aa] rounded-full flex items-center justify-center text-white font-medium">
                          {member.name.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-[#323232]">
                            {member.name}
                          </p>
                          <p className="text-sm text-gray-500">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-[#323232]">{member.clinic}</p>
                      <p className="text-sm text-gray-500">{member.phone}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700">
                        {member.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {member.societies.slice(0, 2).map((society) => (
                          <span
                            key={society}
                            className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded"
                          >
                            {society.length > 10
                              ? society.slice(0, 10) + "..."
                              : society}
                          </span>
                        ))}
                        {member.societies.length > 2 && (
                          <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                            +{member.societies.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${
                          member.status === "アクティブ"
                            ? "bg-gray-100 text-gray-700"
                            : member.status === "保留中"
                            ? "bg-gray-100 text-gray-500"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/admin/members/${member.id}`}
                          className="text-sm text-[#0073aa] hover:underline"
                        >
                          詳細
                        </Link>
                        <Link
                          href={`/admin/members/${member.id}/edit`}
                          className="text-sm text-gray-500 hover:text-gray-700"
                        >
                          編集
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {filteredMembers.length}件中 1-{Math.min(10, filteredMembers.length)}件を表示
            </p>
            <div className="flex items-center gap-1">
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50">
                前へ
              </button>
              <button className="px-3 py-1 bg-[#0073aa] text-white rounded text-sm">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                3
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                次へ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Card view */}
      {viewMode === "card" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#0073aa] rounded-full flex items-center justify-center text-white font-medium text-lg">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium text-[#323232]">{member.name}</h3>
                    <p className="text-sm text-gray-500">{member.clinic}</p>
                  </div>
                </div>
                <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700">
                  {member.status}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600">{member.email}</p>
                <p className="text-sm text-gray-600">{member.phone}</p>
              </div>

              <div className="mt-4">
                <p className="text-xs text-gray-500 mb-2">所属学会:</p>
                <div className="flex flex-wrap gap-1">
                  {member.societies.map((society) => (
                    <span
                      key={society}
                      className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded"
                    >
                      {society}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700">
                  {member.plan}
                </span>
                <div className="flex items-center gap-3">
                  <Link
                    href={`/admin/members/${member.id}`}
                    className="text-sm text-[#0073aa] hover:underline"
                  >
                    詳細
                  </Link>
                  <Link
                    href={`/admin/members/${member.id}/edit`}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    編集
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

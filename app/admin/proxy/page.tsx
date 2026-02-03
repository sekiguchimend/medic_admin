"use client";

import { useState } from "react";

// ダミーデータ
const proxySubmissions = [
  {
    id: 1,
    memberName: "田中 太郎",
    clinic: "田中美容クリニック",
    submittedAt: "2024-01-15 10:30",
    proxyType: "委任",
    status: "提出済",
  },
  {
    id: 2,
    memberName: "佐藤 花子",
    clinic: "さくら皮膚科クリニック",
    submittedAt: "2024-01-14 14:20",
    proxyType: "出席",
    status: "提出済",
  },
  {
    id: 3,
    memberName: "山田 次郎",
    clinic: "やまだ形成外科",
    submittedAt: null,
    proxyType: null,
    status: "未提出",
  },
  {
    id: 4,
    memberName: "鈴木 美咲",
    clinic: "スズキビューティークリニック",
    submittedAt: "2024-01-12 09:15",
    proxyType: "委任",
    status: "提出済",
  },
  {
    id: 5,
    memberName: "高橋 健一",
    clinic: "高橋美容外科クリニック",
    submittedAt: null,
    proxyType: null,
    status: "未提出",
  },
];

const stats = {
  totalMembers: 2847,
  submitted: 1845,
  attending: 312,
  proxy: 1533,
  notSubmitted: 1002,
};

export default function ProxyPage() {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSubmissions = proxySubmissions.filter((item) => {
    const matchesSearch =
      item.memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.clinic.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || item.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-medium text-gray-600">委任状管理</h1>
          <p className="text-gray-500 mt-1">
            社員総会の出欠・委任状提出状況を管理します
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-[3px] text-sm font-medium text-gray-700 hover:bg-gray-50">
            リマインダー送信
          </button>
          <button className="px-4 py-2 bg-[#0073aa] text-white rounded-[3px] text-sm font-medium hover:bg-[#005f8a]">
            集計データ出力
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">対象会員数</p>
          <p className="text-2xl font-bold text-[#323232]">
            {stats.totalMembers.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">提出済</p>
          <p className="text-2xl font-bold text-[#0073aa]">
            {stats.submitted.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500">
            ({Math.round((stats.submitted / stats.totalMembers) * 100)}%)
          </p>
        </div>
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">出席予定</p>
          <p className="text-2xl font-bold text-[#323232]">
            {stats.attending.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">委任状</p>
          <p className="text-2xl font-bold text-[#323232]">
            {stats.proxy.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">未提出</p>
          <p className="text-2xl font-bold text-[#323232]">
            {stats.notSubmitted.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500">
            ({Math.round((stats.notSubmitted / stats.totalMembers) * 100)}%)
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">提出状況</span>
          <span className="text-sm text-gray-500">
            {stats.submitted.toLocaleString()} / {stats.totalMembers.toLocaleString()}名
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div className="h-full flex">
            <div
              className="bg-[#0073aa] h-full"
              style={{
                width: `${(stats.attending / stats.totalMembers) * 100}%`,
              }}
            />
            <div
              className="bg-[#4a9bc7] h-full"
              style={{
                width: `${(stats.proxy / stats.totalMembers) * 100}%`,
              }}
            />
          </div>
        </div>
        <div className="flex items-center gap-4 mt-2 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-[#0073aa] rounded" />
            <span>出席</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-[#4a9bc7] rounded" />
            <span>委任</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-200 rounded" />
            <span>未提出</span>
          </div>
        </div>
      </div>

      {/* Filters and table */}
      <div className="bg-white rounded-[3px] shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="会員名、クリニック名で検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
              />
            </div>
            <div className="flex gap-2">
              {["all", "提出済", "未提出"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-[3px] text-sm font-medium ${
                    filter === status
                      ? "bg-[#0073aa] text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {status === "all" ? "すべて" : status}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  会員
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  提出日時
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  出欠区分
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  ステータス
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSubmissions.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4">
                    <p className="font-medium text-[#323232]">{item.memberName}</p>
                    <p className="text-sm text-gray-500">{item.clinic}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {item.submittedAt || "-"}
                  </td>
                  <td className="px-6 py-4">
                    {item.proxyType ? (
                      <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700">
                        {item.proxyType}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {item.status === "未提出" && (
                      <button className="text-sm text-[#0073aa] hover:underline">
                        リマインド
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

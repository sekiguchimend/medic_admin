"use client";

import { useState } from "react";
import Link from "next/link";

const renewalMembers = [
  {
    id: 1,
    name: "山田 次郎",
    clinic: "やまだ形成外科",
    currentPlan: "Cプラン",
    premium: 360000,
    endDate: "2024-12-31",
    status: "確認中",
    sentAt: "2024-11-15",
  },
  {
    id: 2,
    name: "鈴木 美咲",
    clinic: "スズキビューティークリニック",
    currentPlan: "Aプラン",
    premium: 180000,
    endDate: "2024-12-31",
    status: "未確認",
    sentAt: null,
  },
  {
    id: 3,
    name: "伊藤 直美",
    clinic: "伊藤皮膚科美容クリニック",
    currentPlan: "Cプラン",
    premium: 360000,
    endDate: "2024-12-31",
    status: "未確認",
    sentAt: null,
  },
];

export default function ContractRenewalPage() {
  const [filter, setFilter] = useState("all");

  const filteredMembers = renewalMembers.filter((member) => {
    if (filter === "all") return true;
    return member.status === filter;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-medium text-gray-600">契約更新確認</h1>
          <p className="text-gray-500 mt-1">
            12月更新の会員確認を行います
          </p>
        </div>
        <button className="mt-4 md:mt-0 px-4 py-2 bg-[#0073aa] text-white rounded-[3px] text-sm font-medium hover:bg-[#005f8a]">
          一括リマインダー送信
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">更新対象</p>
          <p className="text-2xl font-bold text-[#323232]">{renewalMembers.length}名</p>
        </div>
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">更新済</p>
          <p className="text-2xl font-bold text-[#323232]">
            {renewalMembers.filter((m) => m.status === "更新済").length}名
          </p>
        </div>
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">確認中</p>
          <p className="text-2xl font-bold text-[#323232]">
            {renewalMembers.filter((m) => m.status === "確認中").length}名
          </p>
        </div>
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">未確認</p>
          <p className="text-2xl font-bold text-[#323232]">
            {renewalMembers.filter((m) => m.status === "未確認").length}名
          </p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {["all", "未確認", "確認中", "更新済"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-[3px] text-sm font-medium transition-colors ${
              filter === status
                ? "bg-[#0073aa] text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {status === "all" ? "すべて" : status}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">会員</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">現在のプラン</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">年間保険料</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">契約終了日</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ステータス</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredMembers.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <Link href={`/admin/members/${member.id}`} className="hover:text-[#0073aa]">
                    <p className="font-medium text-[#323232]">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.clinic}</p>
                  </Link>
                </td>
                <td className="px-6 py-4 text-[#323232]">
                  {member.currentPlan}
                </td>
                <td className="px-6 py-4 font-medium text-[#323232]">
                  ¥{member.premium.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{member.endDate}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700">
                    {member.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="text-sm text-[#0073aa] hover:underline">
                      更新確認
                    </button>
                    <button className="text-sm text-gray-500 hover:text-gray-700">
                      リマインダー
                    </button>
                    <button className="text-sm text-gray-500 hover:text-gray-700">
                      辞退
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

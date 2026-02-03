"use client";

import { useState } from "react";
import Link from "next/link";

// ダミーデータ
const billingData = [
  {
    id: 1,
    memberName: "田中 太郎",
    clinic: "田中美容クリニック",
    amount: 15000,
    dueDate: "2024-01-05",
    status: "完了",
    method: "口座振替",
    actualAmount: 15000,
  },
  {
    id: 2,
    memberName: "佐藤 花子",
    clinic: "さくら皮膚科クリニック",
    amount: 20000,
    dueDate: "2024-01-05",
    status: "完了",
    method: "口座振替",
    actualAmount: 20000,
  },
  {
    id: 3,
    memberName: "山田 次郎",
    clinic: "やまだ形成外科",
    amount: 30000,
    dueDate: "2024-01-05",
    status: "エラー",
    method: "口座振替",
    actualAmount: 0,
  },
  {
    id: 4,
    memberName: "鈴木 美咲",
    clinic: "スズキビューティークリニック",
    amount: 15000,
    dueDate: "2024-01-05",
    status: "保留",
    method: "口座振替",
    actualAmount: 0,
  },
  {
    id: 5,
    memberName: "高橋 健一",
    clinic: "高橋美容外科クリニック",
    amount: 20000,
    dueDate: "2024-01-05",
    status: "完了",
    method: "口座振替",
    actualAmount: 20000,
  },
];

const monthlySummary = {
  expected: 4523000,
  actual: 4450000,
  completed: 2340,
  pending: 15,
  errors: 2,
};

export default function BillingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("2024-01");

  const filteredBilling = billingData.filter((item) => {
    const matchesSearch =
      item.memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.clinic.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-medium text-gray-600">請求・決済管理</h1>
          <p className="text-gray-500 mt-1">
            月次請求と引落状況を管理します
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-[3px] text-sm font-medium text-gray-700 hover:bg-gray-50">
            請求データ出力
          </button>
        </div>
      </div>

      {/* Monthly summary */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500 mb-1">請求予定額</p>
          <p className="text-xl font-bold text-[#323232]">
            ¥{monthlySummary.expected.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500 mb-1">引落完了額</p>
          <p className="text-xl font-bold text-[#0073aa]">
            ¥{monthlySummary.actual.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500 mb-1">完了</p>
          <p className="text-xl font-bold text-[#323232]">
            {monthlySummary.completed}件
          </p>
        </div>
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500 mb-1">保留</p>
          <p className="text-xl font-bold text-[#323232]">
            {monthlySummary.pending}件
          </p>
        </div>
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500 mb-1">エラー</p>
          <p className="text-xl font-bold text-[#323232]">
            {monthlySummary.errors}件
          </p>
        </div>
      </div>

      {/* Difference alert */}
      {monthlySummary.expected !== monthlySummary.actual && (
        <div className="bg-gray-50 border border-gray-200 rounded-[3px] p-4">
          <p className="font-medium text-gray-700">
            請求額と引落額に差額があります
          </p>
          <p className="text-sm text-gray-600 mt-1">
            差額: ¥{(monthlySummary.expected - monthlySummary.actual).toLocaleString()}
            （{monthlySummary.pending + monthlySummary.errors}件の未処理があります）
          </p>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
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
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
            >
              <option value="2024-01">2024年1月</option>
              <option value="2023-12">2023年12月</option>
              <option value="2023-11">2023年11月</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
            >
              <option value="all">すべてのステータス</option>
              <option value="完了">完了</option>
              <option value="保留">保留</option>
              <option value="エラー">エラー</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  会員
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  請求額
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  引落額
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  差額
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  引落日
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  方法
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  ステータス
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBilling.map((item) => {
                const diff = item.amount - item.actualAmount;
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/members/${item.id}`}
                        className="hover:text-[#0073aa]"
                      >
                        <p className="text-sm font-medium text-[#323232]">
                          {item.memberName}
                        </p>
                        <p className="text-sm text-gray-500">{item.clinic}</p>
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-[#323232]">
                      ¥{item.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-[#323232]">
                      ¥{item.actualAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      {diff !== 0 ? (
                        <span className="text-sm font-medium text-gray-700">
                          -¥{diff.toLocaleString()}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.dueDate}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.method}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

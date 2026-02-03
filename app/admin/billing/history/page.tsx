"use client";

import { useState } from "react";
import Link from "next/link";

const paymentHistory = [
  { id: 1, date: "2024-01-05", memberName: "田中 太郎", clinic: "田中美容クリニック", amount: 15000, method: "口座振替", status: "完了", transactionId: "TXN20240105001" },
  { id: 2, date: "2024-01-05", memberName: "佐藤 花子", clinic: "さくら皮膚科クリニック", amount: 20000, method: "口座振替", status: "完了", transactionId: "TXN20240105002" },
  { id: 3, date: "2024-01-05", memberName: "山田 次郎", clinic: "やまだ形成外科", amount: 30000, method: "口座振替", status: "エラー", transactionId: "TXN20240105003" },
  { id: 4, date: "2024-01-05", memberName: "鈴木 美咲", clinic: "スズキビューティークリニック", amount: 15000, method: "口座振替", status: "保留", transactionId: "TXN20240105004" },
  { id: 5, date: "2024-01-05", memberName: "高橋 健一", clinic: "高橋美容外科クリニック", amount: 20000, method: "口座振替", status: "完了", transactionId: "TXN20240105005" },
  { id: 6, date: "2023-12-05", memberName: "田中 太郎", clinic: "田中美容クリニック", amount: 15000, method: "口座振替", status: "完了", transactionId: "TXN20231205001" },
  { id: 7, date: "2023-12-05", memberName: "佐藤 花子", clinic: "さくら皮膚科クリニック", amount: 20000, method: "口座振替", status: "完了", transactionId: "TXN20231205002" },
  { id: 8, date: "2023-12-05", memberName: "山田 次郎", clinic: "やまだ形成外科", amount: 30000, method: "口座振替", status: "完了", transactionId: "TXN20231205003" },
];

export default function BillingHistoryPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  const filteredHistory = paymentHistory.filter((item) => {
    if (statusFilter === "all") return true;
    return item.status === statusFilter;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-medium text-gray-600">決済履歴</h1>
          <p className="text-gray-500 mt-1">すべての決済トランザクションを確認します</p>
        </div>
        <button className="mt-4 md:mt-0 px-4 py-2 bg-[#0073aa] text-white rounded-[3px] text-sm font-medium hover:bg-[#005f8a]">
          履歴をエクスポート
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex gap-2">
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
            />
            <span className="flex items-center text-gray-500">~</span>
            <input
              type="date"
              value={dateRange.to}
              onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
            />
          </div>
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

      {/* Table */}
      <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">取引ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">日付</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">会員</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">金額</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">方法</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ステータス</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredHistory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-mono text-gray-500">{item.transactionId}</td>
                  <td className="px-6 py-4 text-sm text-[#323232]">{item.date}</td>
                  <td className="px-6 py-4">
                    <Link href={`/admin/members/${item.id}`} className="hover:text-[#0073aa]">
                      <p className="text-sm font-medium text-[#323232]">{item.memberName}</p>
                      <p className="text-sm text-gray-500">{item.clinic}</p>
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-[#323232]">
                    ¥{item.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.method}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-500">{filteredHistory.length}件中 1-{filteredHistory.length}件を表示</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded-[3px] text-sm text-gray-500 hover:bg-gray-50">
              前へ
            </button>
            <button className="px-3 py-1 bg-[#0073aa] text-white rounded-[3px] text-sm">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded-[3px] text-sm text-gray-500 hover:bg-gray-50">
              次へ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

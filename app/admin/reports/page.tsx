"use client";

import { useState } from "react";

// ダミーデータ - プラン別集計
const planSummary = [
  {
    plan: "Aプラン",
    unitPrice: 15000,
    memberCount: 856,
    breakdown: [
      { price: 15000, count: 700 },
      { price: 18000, count: 100 },
      { price: 20000, count: 56 },
    ],
    totalAmount: 13140000,
  },
  {
    plan: "Bプラン",
    unitPrice: 20000,
    memberCount: 1024,
    breakdown: [
      { price: 20000, count: 800 },
      { price: 25000, count: 150 },
      { price: 30000, count: 74 },
    ],
    totalAmount: 21980000,
  },
  {
    plan: "Cプラン",
    unitPrice: 30000,
    memberCount: 576,
    breakdown: [
      { price: 30000, count: 400 },
      { price: 40000, count: 120 },
      { price: 50000, count: 56 },
    ],
    totalAmount: 19600000,
  },
];

// 月次推移データ
const monthlyData = [
  { month: "2024-01", newMembers: 15, renewals: 45, cancellations: 3, revenue: 4523000 },
  { month: "2023-12", newMembers: 8, renewals: 120, cancellations: 5, revenue: 4480000 },
  { month: "2023-11", newMembers: 12, renewals: 35, cancellations: 2, revenue: 4510000 },
  { month: "2023-10", newMembers: 18, renewals: 28, cancellations: 4, revenue: 4450000 },
  { month: "2023-09", newMembers: 10, renewals: 22, cancellations: 1, revenue: 4420000 },
  { month: "2023-08", newMembers: 6, renewals: 15, cancellations: 3, revenue: 4380000 },
];

export default function ReportsPage() {
  const [selectedMonth, setSelectedMonth] = useState("2024-01");
  const [reportType, setReportType] = useState<"monthly" | "plan">("monthly");

  const totalMembers = planSummary.reduce((sum, p) => sum + p.memberCount, 0);
  const totalRevenue = planSummary.reduce((sum, p) => sum + p.totalAmount, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-medium text-gray-600">レポート・集計</h1>
          <p className="text-gray-500 mt-1">
            月次報告書やプラン別集計を生成・ダウンロードできます
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-[3px] text-sm font-medium text-gray-700 hover:bg-gray-50">
            データ更新
          </button>
          <button className="px-4 py-2 bg-[#0073aa] text-white rounded-[3px] text-sm font-medium hover:bg-[#005f8a]">
            レポート出力
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">総会員数</p>
          <p className="text-xl font-bold text-[#323232]">
            {totalMembers.toLocaleString()}名
          </p>
        </div>
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">月額保険料合計</p>
          <p className="text-xl font-bold text-[#323232]">
            ¥{totalRevenue.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">今月の新規</p>
          <p className="text-xl font-bold text-[#323232]">
            {monthlyData[0].newMembers}名
          </p>
        </div>
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">今月の更新</p>
          <p className="text-xl font-bold text-[#323232]">
            {monthlyData[0].renewals}名
          </p>
        </div>
      </div>

      {/* Report type tabs */}
      <div className="bg-white rounded-[3px] shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setReportType("monthly")}
              className={`px-6 py-3 text-sm font-medium border-b-2 -mb-px ${
                reportType === "monthly"
                  ? "border-[#0073aa] text-[#0073aa]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              月次報告書
            </button>
            <button
              onClick={() => setReportType("plan")}
              className={`px-6 py-3 text-sm font-medium border-b-2 -mb-px ${
                reportType === "plan"
                  ? "border-[#0073aa] text-[#0073aa]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              プラン別集計
            </button>
          </div>
        </div>

        <div className="p-6">
          {reportType === "monthly" && (
            <div className="space-y-6">
              {/* Month selector */}
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700">
                  対象月:
                </label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
                >
                  {monthlyData.map((data) => (
                    <option key={data.month} value={data.month}>
                      {data.month}
                    </option>
                  ))}
                </select>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-[3px] text-sm hover:bg-gray-200">
                  印刷プレビュー
                </button>
              </div>

              {/* Monthly summary */}
              <div className="border border-gray-200 rounded-[3px] overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <h3 className="font-semibold text-[#323232]">
                    {selectedMonth} 月次報告書
                  </h3>
                </div>
                <div className="p-6">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                          項目
                        </th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">
                          件数/金額
                        </th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">
                          前月比
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 text-sm text-[#323232]">
                          新規加入
                        </td>
                        <td className="py-3 px-4 text-sm text-[#323232] text-right font-medium">
                          {monthlyData[0].newMembers}件
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 text-right">
                          +{monthlyData[0].newMembers - monthlyData[1].newMembers}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 text-sm text-[#323232]">
                          契約更新
                        </td>
                        <td className="py-3 px-4 text-sm text-[#323232] text-right font-medium">
                          {monthlyData[0].renewals}件
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 text-right">
                          {monthlyData[0].renewals - monthlyData[1].renewals}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 text-sm text-[#323232]">
                          解約・退会
                        </td>
                        <td className="py-3 px-4 text-sm text-[#323232] text-right font-medium">
                          {monthlyData[0].cancellations}件
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 text-right">
                          {monthlyData[0].cancellations - monthlyData[1].cancellations}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 text-sm text-[#323232]">
                          月間保険料収入
                        </td>
                        <td className="py-3 px-4 text-sm text-[#323232] text-right font-medium">
                          ¥{monthlyData[0].revenue.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 text-right">
                          +¥{(monthlyData[0].revenue - monthlyData[1].revenue).toLocaleString()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Monthly trend */}
              <div className="border border-gray-200 rounded-[3px] overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <h3 className="font-semibold text-[#323232]">月次推移</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          月
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                          新規
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                          更新
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                          解約
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                          収入
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {monthlyData.map((data) => (
                        <tr
                          key={data.month}
                          className={
                            data.month === selectedMonth ? "bg-blue-50" : ""
                          }
                        >
                          <td className="px-6 py-4 text-sm font-medium text-[#323232]">
                            {data.month}
                          </td>
                          <td className="px-6 py-4 text-sm text-[#323232] text-right">
                            {data.newMembers}件
                          </td>
                          <td className="px-6 py-4 text-sm text-[#323232] text-right">
                            {data.renewals}件
                          </td>
                          <td className="px-6 py-4 text-sm text-[#323232] text-right">
                            {data.cancellations}件
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-[#323232] text-right">
                            ¥{data.revenue.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {reportType === "plan" && (
            <div className="space-y-6">
              {/* Plan summary - matching the format requested */}
              <div className="border border-gray-200 rounded-[3px] overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="font-semibold text-[#323232]">
                    プラン別集計表
                  </h3>
                  <button className="px-3 py-1.5 bg-[#0073aa] text-white rounded text-sm hover:bg-[#005f8a]">
                    Excel出力
                  </button>
                </div>
                <div className="p-6 space-y-6">
                  {planSummary.map((plan) => (
                    <div
                      key={plan.plan}
                      className="border border-gray-200 rounded-[3px] p-4"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 font-medium rounded-[3px]">
                            {plan.plan}
                          </span>
                          <span className="text-lg font-bold text-[#323232]">
                            合計 ¥{plan.totalAmount.toLocaleString()}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {plan.memberCount}名
                        </span>
                      </div>
                      <div className="bg-gray-50 rounded-[3px] p-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          内訳:
                        </p>
                        <div className="space-y-1">
                          {plan.breakdown.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between text-sm"
                            >
                              <span className="text-gray-600">
                                ¥{item.price.toLocaleString()} × {item.count}名
                              </span>
                              <span className="font-medium text-[#323232]">
                                ¥{(item.price * item.count).toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Total */}
                  <div className="border-t-2 border-gray-300 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-[#323232]">
                        総合計
                      </span>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#0073aa]">
                          ¥{totalRevenue.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">
                          {totalMembers.toLocaleString()}名
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

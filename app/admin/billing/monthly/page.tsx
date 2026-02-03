"use client";

import { useState } from "react";

const monthlyData = [
  { month: "2024-01", expected: 4523000, actual: 4450000, completed: 2340, errors: 17, pending: 15 },
  { month: "2023-12", expected: 4480000, actual: 4420000, completed: 2320, errors: 12, pending: 8 },
  { month: "2023-11", expected: 4510000, actual: 4480000, completed: 2335, errors: 8, pending: 5 },
  { month: "2023-10", expected: 4450000, actual: 4430000, completed: 2310, errors: 10, pending: 6 },
  { month: "2023-09", expected: 4420000, actual: 4400000, completed: 2298, errors: 7, pending: 4 },
  { month: "2023-08", expected: 4380000, actual: 4350000, completed: 2280, errors: 15, pending: 10 },
];

export default function BillingMonthlyPage() {
  const [year, setYear] = useState("2024");

  const totalExpected = monthlyData.reduce((sum, m) => sum + m.expected, 0);
  const totalActual = monthlyData.reduce((sum, m) => sum + m.actual, 0);
  const collectionRate = ((totalActual / totalExpected) * 100).toFixed(1);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-medium text-gray-600">月次比較</h1>
          <p className="text-gray-500 mt-1">月ごとの請求・入金状況を比較します</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
          >
            <option value="2024">2024年</option>
            <option value="2023">2023年</option>
            <option value="2022">2022年</option>
          </select>
          <button className="px-4 py-2 bg-[#0073aa] text-white rounded-[3px] text-sm font-medium hover:bg-[#005f8a]">
            レポート出力
          </button>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">請求総額（期間）</p>
          <p className="text-xl font-bold text-[#323232]">¥{totalExpected.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">入金総額（期間）</p>
          <p className="text-xl font-bold text-[#0073aa]">¥{totalActual.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">回収率</p>
          <p className="text-xl font-bold text-[#0073aa]">{collectionRate}%</p>
        </div>
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">未回収額</p>
          <p className="text-xl font-bold text-[#323232]">¥{(totalExpected - totalActual).toLocaleString()}</p>
        </div>
      </div>

      {/* Chart placeholder */}
      <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-medium text-[#323232] mb-4">月次推移グラフ</h2>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-[3px] border border-gray-200">
          <p className="text-gray-500">グラフエリア</p>
        </div>
      </div>

      {/* Monthly table */}
      <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-[#323232]">月別詳細</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">月</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">請求額</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">入金額</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">差額</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">完了件数</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">エラー</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">保留</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">回収率</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {monthlyData.map((data) => {
                const diff = data.expected - data.actual;
                const rate = ((data.actual / data.expected) * 100).toFixed(1);
                return (
                  <tr key={data.month} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-[#323232]">{data.month}</td>
                    <td className="px-6 py-4 text-right text-[#323232]">¥{data.expected.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right text-[#0073aa] font-medium">¥{data.actual.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right">
                      {diff > 0 ? (
                        <span className="text-gray-700">-¥{diff.toLocaleString()}</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right text-[#323232]">{data.completed}</td>
                    <td className="px-6 py-4 text-right text-[#323232]">{data.errors}</td>
                    <td className="px-6 py-4 text-right text-[#323232]">{data.pending}</td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-medium text-[#0073aa]">{rate}%</span>
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

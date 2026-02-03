"use client";

import { useState } from "react";

const exportOptions = [
  { id: "members_csv", name: "会員一覧", format: "CSV" },
  { id: "members_excel", name: "会員一覧", format: "Excel" },
  { id: "contracts_csv", name: "契約一覧", format: "CSV" },
  { id: "contracts_excel", name: "契約一覧", format: "Excel" },
  { id: "billing_csv", name: "請求データ", format: "CSV" },
  { id: "monthly_report_pdf", name: "月次報告書", format: "PDF" },
  { id: "monthly_report_excel", name: "月次報告書", format: "Excel" },
  { id: "plan_summary_pdf", name: "プラン別集計", format: "PDF" },
  { id: "plan_summary_excel", name: "プラン別集計", format: "Excel" },
];

const recentExports = [
  { id: 1, name: "会員一覧", format: "CSV", date: "2024-01-15 10:30", size: "245KB" },
  { id: 2, name: "月次報告書", format: "PDF", date: "2024-01-14 15:20", size: "1.2MB" },
  { id: 3, name: "請求データ", format: "CSV", date: "2024-01-10 09:15", size: "128KB" },
  { id: 4, name: "契約一覧", format: "Excel", date: "2024-01-08 14:00", size: "356KB" },
];

export default function ReportExportPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedExport, setSelectedExport] = useState("");

  const handleExport = (id: string) => {
    setSelectedExport(id);
    // 実際のエクスポート処理
    setShowModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-medium text-gray-600">データエクスポート</h1>
          <p className="text-gray-500 mt-1">各種データをエクスポートします</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="mt-4 md:mt-0 px-4 py-2 bg-[#0073aa] text-white rounded-[3px] text-sm font-medium hover:bg-[#005f8a]"
        >
          エクスポート
        </button>
      </div>

      {/* Recent exports */}
      <div className="bg-white rounded-[3px] shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-[#323232]">最近のエクスポート</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ファイル名</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">形式</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">日時</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">サイズ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentExports.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-[#323232]">{item.name}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700">
                      {item.format}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.size}</td>
                  <td className="px-6 py-4">
                    <button className="text-sm text-[#0073aa] hover:underline">
                      再ダウンロード
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[3px] shadow-xl w-full max-w-md">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#323232]">エクスポート形式を選択</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700 text-xl leading-none">
                &times;
              </button>
            </div>
            <div className="p-4 max-h-96 overflow-y-auto">
              <div className="space-y-2">
                {exportOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleExport(option.id)}
                    className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-[3px] hover:border-[#0073aa] hover:bg-blue-50 transition-colors text-left"
                  >
                    <span className="text-sm text-[#323232]">{option.name}</span>
                    <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700">
                      {option.format}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

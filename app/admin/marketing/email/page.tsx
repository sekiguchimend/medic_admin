"use client";

import { useState } from "react";
import Link from "next/link";

const templates = [
  { id: "newsletter", name: "ニュースレター" },
  { id: "renewal", name: "更新のお知らせ" },
  { id: "seminar", name: "セミナー案内" },
  { id: "custom", name: "カスタム" },
];

const segments = [
  { id: "all", name: "全会員", count: 2847 },
  { id: "active", name: "アクティブ会員", count: 2456 },
  { id: "plan_a", name: "Aプラン会員", count: 856 },
  { id: "plan_b", name: "Bプラン会員", count: 1024 },
  { id: "plan_c", name: "Cプラン会員", count: 576 },
];

export default function EmailMarketingPage() {
  const [formData, setFormData] = useState({
    template: "",
    segment: "all",
    subject: "",
    content: "",
    scheduleType: "now",
    scheduleDate: "",
  });

  const selectedSegment = segments.find((s) => s.id === formData.segment);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/marketing" className="text-[#0073aa] hover:underline text-sm">
          戻る
        </Link>
        <div>
          <h1 className="text-2xl font-medium text-gray-600">メルマガ配信</h1>
          <p className="text-gray-500 mt-1">メールマガジンを作成・配信します</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-[#323232] mb-4">メール作成</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  テンプレート
                </label>
                <select
                  value={formData.template}
                  onChange={(e) => setFormData({ ...formData, template: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
                >
                  <option value="">テンプレートを選択</option>
                  {templates.map((t) => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  件名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="メールの件名を入力"
                  className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  本文 <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={12}
                  placeholder="メール本文を入力..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Segment */}
          <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-[#323232] mb-4">配信先</h2>
            <div className="space-y-2">
              {segments.map((segment) => (
                <label
                  key={segment.id}
                  className={`flex items-center justify-between p-3 border rounded-[3px] cursor-pointer transition-colors ${
                    formData.segment === segment.id
                      ? "border-[#0073aa] bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="segment"
                      value={segment.id}
                      checked={formData.segment === segment.id}
                      onChange={(e) => setFormData({ ...formData, segment: e.target.value })}
                      className="w-4 h-4 text-[#0073aa]"
                    />
                    <span className="text-sm text-[#323232]">{segment.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">{segment.count}名</span>
                </label>
              ))}
            </div>
          </div>

          {/* Schedule */}
          <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-[#323232] mb-4">配信設定</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="schedule"
                  value="now"
                  checked={formData.scheduleType === "now"}
                  onChange={() => setFormData({ ...formData, scheduleType: "now" })}
                  className="w-4 h-4 text-[#0073aa]"
                />
                <span className="text-sm text-gray-700">すぐに配信</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="schedule"
                  value="schedule"
                  checked={formData.scheduleType === "schedule"}
                  onChange={() => setFormData({ ...formData, scheduleType: "schedule" })}
                  className="w-4 h-4 text-[#0073aa]"
                />
                <span className="text-sm text-gray-700">日時を指定</span>
              </label>
              {formData.scheduleType === "schedule" && (
                <input
                  type="datetime-local"
                  value={formData.scheduleDate}
                  onChange={(e) => setFormData({ ...formData, scheduleDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
                />
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6">
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-white border border-gray-300 rounded-[3px] text-sm font-medium text-gray-700 hover:bg-gray-50">
                プレビュー
              </button>
              <button className="w-full px-4 py-2 bg-white border border-gray-300 rounded-[3px] text-sm font-medium text-gray-700 hover:bg-gray-50">
                下書き保存
              </button>
              <button className="w-full px-4 py-2 bg-[#0073aa] text-white rounded-[3px] text-sm font-medium hover:bg-[#005f8a]">
                {selectedSegment?.count}名に配信
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

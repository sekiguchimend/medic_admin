"use client";

import { useState } from "react";
import Link from "next/link";

const members = [
  { id: 1, name: "田中 太郎", clinic: "田中美容クリニック" },
  { id: 2, name: "佐藤 花子", clinic: "さくら皮膚科クリニック" },
  { id: 3, name: "山田 次郎", clinic: "やまだ形成外科" },
];

const plans = [
  { id: "a", name: "Aプラン", price: 180000, description: "基本補償プラン" },
  { id: "b", name: "Bプラン", price: 240000, description: "標準補償プラン" },
  { id: "c", name: "Cプラン", price: 360000, description: "充実補償プラン" },
];

export default function NewContractPage() {
  const [formData, setFormData] = useState({
    memberId: "",
    plan: "",
    startDate: "",
    paymentMethod: "bank_transfer",
    notes: "",
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/contracts" className="text-gray-500 hover:text-gray-700">
          戻る
        </Link>
        <div>
          <h1 className="text-2xl font-medium text-gray-600">新規契約作成</h1>
          <p className="text-gray-500 mt-1">契約情報を入力してください</p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              会員選択 <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.memberId}
              onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
            >
              <option value="">会員を選択してください</option>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name} - {member.clinic}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              プラン選択 <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => setFormData({ ...formData, plan: plan.id })}
                  className={`border rounded-[3px] p-4 cursor-pointer transition-colors ${
                    formData.plan === plan.id
                      ? "border-[#0073aa] bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-[#323232]">{plan.name}</span>
                    <input
                      type="radio"
                      checked={formData.plan === plan.id}
                      onChange={() => {}}
                      className="w-4 h-4 text-[#0073aa]"
                    />
                  </div>
                  <p className="text-2xl font-bold text-[#0073aa]">
                    ¥{plan.price.toLocaleString()}
                    <span className="text-sm text-gray-500 font-normal">/年</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                契約開始日 <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                支払方法 <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
              >
                <option value="bank_transfer">口座振替</option>
                <option value="credit_card">クレジットカード（準備中）</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              備考
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
              placeholder="特記事項があれば入力してください"
            />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-end gap-4">
          <Link
            href="/admin/contracts"
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-[3px] hover:bg-gray-50"
          >
            キャンセル
          </Link>
          <button className="px-6 py-2 bg-[#0073aa] text-white rounded-[3px] hover:bg-[#005f8a]">
            契約を作成
          </button>
        </div>
      </div>
    </div>
  );
}

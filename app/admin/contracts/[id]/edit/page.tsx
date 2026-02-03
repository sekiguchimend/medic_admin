"use client";

import { useState } from "react";
import Link from "next/link";
import { use } from "react";

const plans = [
  { id: "a", name: "Aプラン", price: 180000 },
  { id: "b", name: "Bプラン", price: 240000 },
  { id: "c", name: "Cプラン", price: 360000 },
];

export default function EditContractPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [formData, setFormData] = useState({
    plan: "a",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    paymentMethod: "bank_transfer",
    status: "有効",
    notes: "",
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href={`/admin/contracts/${id}`} className="text-gray-500 hover:text-gray-700">
          戻る
        </Link>
        <div>
          <h1 className="text-2xl font-medium text-gray-600">契約編集</h1>
          <p className="text-gray-500 mt-1">契約ID: {id}</p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              プラン <span className="text-red-500">*</span>
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
                  <p className="text-xl font-bold text-[#0073aa]">
                    ¥{plan.price.toLocaleString()}/年
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                契約開始日
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
                契約終了日
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                支払方法
              </label>
              <select
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
              >
                <option value="bank_transfer">口座振替</option>
                <option value="credit_card">クレジットカード</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ステータス
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
              >
                <option value="有効">有効</option>
                <option value="保留">保留</option>
                <option value="期限切れ">期限切れ</option>
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
            />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-end gap-4">
          <Link
            href={`/admin/contracts/${id}`}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-[3px] hover:bg-gray-50"
          >
            キャンセル
          </Link>
          <button className="px-6 py-2 bg-[#0073aa] text-white rounded-[3px] hover:bg-[#005f8a]">
            保存
          </button>
        </div>
      </div>
    </div>
  );
}

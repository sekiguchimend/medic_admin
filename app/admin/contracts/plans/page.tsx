"use client";

import { useState } from "react";

const plans = [
  {
    id: "a",
    name: "Aプラン",
    description: "基本補償プラン",
    annualPremium: 180000,
    monthlyPremium: 15000,
    coverage: 50000000,
    members: 856,
    features: ["基本医療過誤補償", "施設賠償責任", "24時間相談窓口"],
    status: "アクティブ",
  },
  {
    id: "b",
    name: "Bプラン",
    description: "標準補償プラン",
    annualPremium: 240000,
    monthlyPremium: 20000,
    coverage: 100000000,
    members: 1024,
    features: ["基本医療過誤補償", "施設賠償責任", "24時間相談窓口", "弁護士費用特約", "風評被害対策"],
    status: "アクティブ",
  },
  {
    id: "c",
    name: "Cプラン",
    description: "充実補償プラン",
    annualPremium: 360000,
    monthlyPremium: 30000,
    coverage: 200000000,
    members: 576,
    features: ["基本医療過誤補償", "施設賠償責任", "24時間相談窓口", "弁護士費用特約", "風評被害対策", "休業補償", "サイバーリスク補償"],
    status: "アクティブ",
  },
];

export default function ContractPlansPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const totalMembers = plans.reduce((sum, p) => sum + p.members, 0);
  const totalRevenue = plans.reduce((sum, p) => sum + p.annualPremium * p.members, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-medium text-gray-600">プラン管理</h1>
          <p className="text-gray-500 mt-1">保険プランの設定・管理を行います</p>
        </div>
        <button className="mt-4 md:mt-0 px-4 py-2 bg-[#0073aa] text-white rounded-[3px] text-sm font-medium hover:bg-[#005f8a]">
          新規プラン作成
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">プラン数</p>
          <p className="text-2xl font-bold text-[#323232]">{plans.length}</p>
        </div>
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">総会員数</p>
          <p className="text-2xl font-bold text-[#323232]">{totalMembers.toLocaleString()}名</p>
        </div>
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">年間保険料合計</p>
          <p className="text-2xl font-bold text-[#0073aa]">¥{totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">最人気プラン</p>
          <p className="text-2xl font-bold text-[#323232]">Bプラン</p>
        </div>
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white rounded-[3px] shadow-sm border-2 transition-colors ${
              selectedPlan === plan.id ? "border-[#0073aa]" : "border-gray-200"
            }`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#323232]">{plan.name}</h3>
                  <p className="text-sm text-gray-500">{plan.description}</p>
                </div>
                <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700">
                  {plan.status}
                </span>
              </div>

              <div className="mb-6">
                <p className="text-3xl font-bold text-[#0073aa]">
                  ¥{plan.annualPremium.toLocaleString()}
                  <span className="text-sm text-gray-500 font-normal">/年</span>
                </p>
                <p className="text-sm text-gray-500">
                  月額 ¥{plan.monthlyPremium.toLocaleString()}
                </p>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-1">補償限度額</p>
                <p className="font-semibold text-[#323232]">
                  ¥{plan.coverage.toLocaleString()}
                </p>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2">補償内容</p>
                <ul className="space-y-1">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#0073aa] rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">加入者数</span>
                  <span className="font-semibold text-[#323232]">{plan.members}名</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-[3px] hover:bg-gray-50 text-gray-700">
                    編集
                  </button>
                  <button className="px-3 py-2 text-sm text-gray-500 border border-gray-200 rounded-[3px] hover:bg-gray-50">
                    削除
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

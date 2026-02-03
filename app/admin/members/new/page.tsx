"use client";

import { useState } from "react";
import Link from "next/link";

const societies = [
  "日本美容医療協会",
  "日本皮膚科学会",
  "日本美容皮膚科学会",
  "日本形成外科学会",
  "日本美容外科学会（JSAPS）",
];

const plans = [
  { id: "a", name: "Aプラン", price: 180000, description: "基本補償プラン" },
  { id: "b", name: "Bプラン", price: 240000, description: "標準補償プラン" },
  { id: "c", name: "Cプラン", price: 360000, description: "充実補償プラン" },
];

export default function NewMemberPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    nameKana: "",
    email: "",
    phone: "",
    mobile: "",
    licenseNumber: "",
    specialty: "",
    societies: [] as string[],
    clinicName: "",
    clinicAddress: "",
    clinicPhone: "",
    clinicWebsite: "",
    plan: "",
    startDate: "",
    agreeTerms: false,
  });

  const handleSocietyChange = (society: string) => {
    setFormData((prev) => ({
      ...prev,
      societies: prev.societies.includes(society)
        ? prev.societies.filter((s) => s !== society)
        : [...prev.societies, society],
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/members" className="text-gray-500 hover:text-gray-700">
          ← 戻る
        </Link>
        <div>
          <h1 className="text-2xl font-medium text-gray-600">新規会員登録</h1>
          <p className="text-gray-500 mt-1">会員情報を入力してください</p>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          {[
            { num: 1, label: "基本情報" },
            { num: 2, label: "クリニック情報" },
            { num: 3, label: "契約情報" },
          ].map((s, index) => (
            <div key={s.num} className="flex items-center">
              <div
                className={`flex items-center gap-2 ${
                  step >= s.num ? "text-[#0073aa]" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= s.num ? "bg-[#0073aa] text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step > s.num ? "✓" : s.num}
                </div>
                <span className="font-medium hidden md:block">{s.label}</span>
              </div>
              {index < 2 && (
                <div
                  className={`w-20 md:w-32 h-0.5 mx-4 ${
                    step > s.num ? "bg-[#0073aa]" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-[#323232]">
              基本情報
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  氏名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="田中 太郎"
                  className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  フリガナ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.nameKana}
                  onChange={(e) =>
                    setFormData({ ...formData, nameKana: e.target.value })
                  }
                  placeholder="タナカ タロウ"
                  className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="tanaka@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  電話番号
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="03-1234-5678"
                  className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  携帯電話
                </label>
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData({ ...formData, mobile: e.target.value })
                  }
                  placeholder="090-1234-5678"
                  className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  医籍番号 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.licenseNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, licenseNumber: e.target.value })
                  }
                  placeholder="医籍第123456号"
                  className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  専門
                </label>
                <select
                  value={formData.specialty}
                  onChange={(e) =>
                    setFormData({ ...formData, specialty: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
                >
                  <option value="">選択してください</option>
                  <option value="美容外科">美容外科</option>
                  <option value="美容皮膚科">美容皮膚科</option>
                  <option value="形成外科">形成外科</option>
                  <option value="皮膚科">皮膚科</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                所属学会 <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                {societies.map((society) => (
                  <label key={society} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.societies.includes(society)}
                      onChange={() => handleSocietyChange(society)}
                      className="w-4 h-4 text-[#0073aa] border-gray-300 rounded focus:ring-[#0073aa]"
                    />
                    <span className="text-sm text-gray-700">{society}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-[#323232]">
              クリニック情報
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  クリニック名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.clinicName}
                  onChange={(e) =>
                    setFormData({ ...formData, clinicName: e.target.value })
                  }
                  placeholder="田中美容クリニック"
                  className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  住所 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.clinicAddress}
                  onChange={(e) =>
                    setFormData({ ...formData, clinicAddress: e.target.value })
                  }
                  placeholder="東京都港区赤坂1-2-3 赤坂ビル5F"
                  className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  電話番号 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.clinicPhone}
                  onChange={(e) =>
                    setFormData({ ...formData, clinicPhone: e.target.value })
                  }
                  placeholder="03-1234-5678"
                  className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ウェブサイト
                </label>
                <input
                  type="url"
                  value={formData.clinicWebsite}
                  onChange={(e) =>
                    setFormData({ ...formData, clinicWebsite: e.target.value })
                  }
                  placeholder="https://example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-[#323232]">
              契約情報
            </h2>

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
                      <span className="font-medium text-[#323232]">
                        {plan.name}
                      </span>
                      <input
                        type="radio"
                        checked={formData.plan === plan.id}
                        onChange={() => {}}
                        className="w-4 h-4 text-[#0073aa]"
                      />
                    </div>
                    <p className="text-2xl font-semibold text-[#0073aa]">
                      ¥{plan.price.toLocaleString()}
                      <span className="text-sm text-gray-500 font-normal">
                        /年
                      </span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {plan.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                契約開始日 <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
              />
            </div>

            <div className="pt-4 border-t border-gray-200">
              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={(e) =>
                    setFormData({ ...formData, agreeTerms: e.target.checked })
                  }
                  className="w-4 h-4 mt-1 text-[#0073aa] border-gray-300 rounded focus:ring-[#0073aa]"
                />
                <span className="text-sm text-gray-700">
                  <span className="text-red-500">*</span>{" "}
                  重要事項説明書を確認し、利用規約に同意します
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-[3px] hover:bg-gray-50"
            >
              前へ
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-2 bg-[#0073aa] text-white rounded-[3px] hover:bg-[#005f8a]"
            >
              次へ
            </button>
          ) : (
            <button
              disabled={!formData.agreeTerms}
              className="px-6 py-2 bg-[#0073aa] text-white rounded-[3px] hover:bg-[#005f8a] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              登録する
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

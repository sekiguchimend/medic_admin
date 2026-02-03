"use client";

import { useState } from "react";
import Link from "next/link";
import { use } from "react";

const societies = [
  "日本美容医療協会",
  "日本皮膚科学会",
  "日本美容皮膚科学会",
  "日本形成外科学会",
  "日本美容外科学会（JSAPS）",
];

export default function EditMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [formData, setFormData] = useState({
    name: "田中 太郎",
    nameKana: "タナカ タロウ",
    email: "tanaka@example.com",
    phone: "03-1234-5678",
    mobile: "090-1234-5678",
    licenseNumber: "医籍第123456号",
    specialty: "美容外科",
    societies: ["日本美容外科学会", "日本形成外科学会"],
    clinicName: "田中美容クリニック",
    clinicAddress: "東京都港区赤坂1-2-3 赤坂ビル5F",
    clinicPhone: "03-1234-5678",
    clinicWebsite: "https://tanaka-clinic.jp",
    status: "アクティブ",
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
        <Link href={`/admin/members/${id}`} className="text-gray-500 hover:text-gray-700">
          ← 戻る
        </Link>
        <div>
          <h1 className="text-2xl font-medium text-gray-600">会員情報編集</h1>
          <p className="text-gray-500 mt-1">ID: {id}</p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-medium text-[#323232] mb-6">基本情報</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">氏名</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">フリガナ</label>
            <input
              type="text"
              value={formData.nameKana}
              onChange={(e) => setFormData({ ...formData, nameKana: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">電話番号</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">携帯電話</label>
            <input
              type="tel"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">医籍番号</label>
            <input
              type="text"
              value={formData.licenseNumber}
              onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">専門</label>
            <select
              value={formData.specialty}
              onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
            >
              <option value="美容外科">美容外科</option>
              <option value="美容皮膚科">美容皮膚科</option>
              <option value="形成外科">形成外科</option>
              <option value="皮膚科">皮膚科</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ステータス</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
            >
              <option value="アクティブ">アクティブ</option>
              <option value="保留中">保留中</option>
              <option value="期限切れ">期限切れ</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">所属学会</label>
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

      <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-medium text-[#323232] mb-6">クリニック情報</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">クリニック名</label>
            <input
              type="text"
              value={formData.clinicName}
              onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">住所</label>
            <input
              type="text"
              value={formData.clinicAddress}
              onChange={(e) => setFormData({ ...formData, clinicAddress: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">電話番号</label>
            <input
              type="tel"
              value={formData.clinicPhone}
              onChange={(e) => setFormData({ ...formData, clinicPhone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ウェブサイト</label>
            <input
              type="url"
              value={formData.clinicWebsite}
              onChange={(e) => setFormData({ ...formData, clinicWebsite: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4">
        <Link
          href={`/admin/members/${id}`}
          className="px-4 py-2 text-gray-700 border border-gray-300 rounded-[3px] hover:bg-gray-50"
        >
          キャンセル
        </Link>
        <button className="px-6 py-2 bg-[#0073aa] text-white rounded-[3px] hover:bg-[#005f8a]">
          保存
        </button>
      </div>
    </div>
  );
}

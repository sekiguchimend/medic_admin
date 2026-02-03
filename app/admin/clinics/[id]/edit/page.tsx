"use client";

import { useState } from "react";
import Link from "next/link";
import { use } from "react";

export default function EditClinicPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [formData, setFormData] = useState({
    name: "田中美容クリニック",
    address: "東京都港区赤坂1-2-3 赤坂ビル5F",
    phone: "03-1234-5678",
    fax: "03-1234-5679",
    email: "info@tanaka-clinic.jp",
    website: "https://tanaka-clinic.jp",
    representative: "田中 太郎",
    establishedDate: "2015-04-01",
    status: "アクティブ",
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <Link
          href={`/admin/clinics/${id}`}
          className="text-sm text-[#0073aa] hover:underline"
        >
          詳細ページに戻る
        </Link>
        <h1 className="text-2xl font-medium text-gray-600 mt-4">クリニック編集</h1>
        <p className="text-gray-500 mt-1">ID: {id}</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-[#323232] mb-6">基本情報</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              クリニック名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              代表者名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.representative}
              onChange={(e) => setFormData({ ...formData, representative: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">設立日</label>
            <input
              type="date"
              value={formData.establishedDate}
              onChange={(e) => setFormData({ ...formData, establishedDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              住所 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              電話番号 <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">FAX</label>
            <input
              type="tel"
              value={formData.fax}
              onChange={(e) => setFormData({ ...formData, fax: e.target.value })}
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
            <label className="block text-sm font-medium text-gray-700 mb-1">ウェブサイト</label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
            />
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
              <option value="非アクティブ">非アクティブ</option>
            </select>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-end gap-4">
          <Link
            href={`/admin/clinics/${id}`}
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

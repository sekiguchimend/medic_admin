"use client";

import { useState } from "react";
import Link from "next/link";

// ダミーデータ
const clinics = [
  {
    id: 1,
    name: "田中美容クリニック",
    address: "東京都港区赤坂1-2-3 赤坂ビル5F",
    phone: "03-1234-5678",
    doctors: 3,
    representative: "田中 太郎",
    status: "アクティブ",
  },
  {
    id: 2,
    name: "さくら皮膚科クリニック",
    address: "東京都渋谷区恵比寿1-2-3",
    phone: "03-2345-6789",
    doctors: 2,
    representative: "佐藤 花子",
    status: "アクティブ",
  },
  {
    id: 3,
    name: "やまだ形成外科",
    address: "大阪府大阪市北区梅田1-2-3",
    phone: "06-3456-7890",
    doctors: 4,
    representative: "山田 次郎",
    status: "アクティブ",
  },
  {
    id: 4,
    name: "スズキビューティークリニック",
    address: "愛知県名古屋市中区栄1-2-3",
    phone: "052-4567-8901",
    doctors: 2,
    representative: "鈴木 美咲",
    status: "保留中",
  },
  {
    id: 5,
    name: "高橋美容外科クリニック",
    address: "北海道札幌市中央区大通1-2-3",
    phone: "011-5678-9012",
    doctors: 5,
    representative: "高橋 健一",
    status: "アクティブ",
  },
];

export default function ClinicsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClinics = clinics.filter(
    (clinic) =>
      clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clinic.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clinic.representative.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-medium text-gray-600">クリニック管理</h1>
          <p className="text-gray-500 mt-1">
            登録クリニック数: {clinics.length}件
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-[3px] text-sm font-medium text-gray-700 hover:bg-gray-50">
            CSV出力
          </button>
          <button className="px-4 py-2 bg-[#0073aa] text-white rounded-[3px] text-sm font-medium hover:bg-[#005f8a]">
            新規登録
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">総クリニック数</p>
          <p className="text-xl font-bold text-[#323232]">{clinics.length}</p>
        </div>
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">総医師数</p>
          <p className="text-xl font-bold text-[#323232]">
            {clinics.reduce((sum, c) => sum + c.doctors, 0)}
          </p>
        </div>
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">平均医師数/クリニック</p>
          <p className="text-xl font-bold text-[#323232]">
            {(
              clinics.reduce((sum, c) => sum + c.doctors, 0) / clinics.length
            ).toFixed(1)}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
        <input
          type="text"
          placeholder="クリニック名、住所、代表者名で検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                クリニック名
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                代表者
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                電話番号
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                医師数
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ステータス
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredClinics.map((clinic) => (
              <tr key={clinic.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-[#323232]">{clinic.name}</p>
                    <p className="text-sm text-gray-500">{clinic.address}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-[#323232]">
                  {clinic.representative}
                </td>
                <td className="px-6 py-4 text-[#323232]">{clinic.phone}</td>
                <td className="px-6 py-4 text-[#323232]">{clinic.doctors}名</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700">
                    {clinic.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/clinics/${clinic.id}`}
                      className="text-sm text-[#0073aa] hover:underline"
                    >
                      詳細
                    </Link>
                    <Link
                      href={`/admin/clinics/${clinic.id}/edit`}
                      className="text-sm text-[#0073aa] hover:underline"
                    >
                      編集
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

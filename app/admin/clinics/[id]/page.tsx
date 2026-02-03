"use client";

import Link from "next/link";
import { use } from "react";

const clinicData = {
  id: 1,
  name: "田中美容クリニック",
  address: "東京都港区赤坂1-2-3 赤坂ビル5F",
  phone: "03-1234-5678",
  fax: "03-1234-5679",
  email: "info@tanaka-clinic.jp",
  website: "https://tanaka-clinic.jp",
  representative: "田中 太郎",
  establishedDate: "2015-04-01",
  status: "アクティブ",
  doctors: [
    { id: 1, name: "田中 太郎", role: "院長", plan: "Aプラン" },
    { id: 2, name: "田中 花子", role: "副院長", plan: "Aプラン" },
    { id: 3, name: "山田 一郎", role: "勤務医", plan: "Bプラン" },
  ],
};

export default function ClinicDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/clinics"
            className="text-sm text-[#0073aa] hover:underline"
          >
            クリニック一覧に戻る
          </Link>
        </div>
        <Link
          href={`/admin/clinics/${id}/edit`}
          className="px-4 py-2 bg-[#0073aa] text-white rounded-[3px] text-sm font-medium hover:bg-[#005f8a]"
        >
          編集
        </Link>
      </div>

      {/* Title */}
      <div>
        <h1 className="text-2xl font-medium text-gray-600">クリニック詳細</h1>
        <p className="text-gray-500 mt-1">ID: {id}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Basic info */}
          <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-[#323232] mb-6">基本情報</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">クリニック名</p>
                <p className="text-[#323232] mt-1">{clinicData.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">代表者</p>
                <p className="text-[#323232] mt-1">{clinicData.representative}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">住所</p>
                <p className="text-[#323232] mt-1">{clinicData.address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">電話番号</p>
                <p className="text-[#323232] mt-1">{clinicData.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">FAX</p>
                <p className="text-[#323232] mt-1">{clinicData.fax}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">メールアドレス</p>
                <p className="text-[#323232] mt-1">{clinicData.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">ウェブサイト</p>
                <a
                  href={clinicData.website}
                  className="text-[#0073aa] hover:underline mt-1 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {clinicData.website}
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-500">設立日</p>
                <p className="text-[#323232] mt-1">{clinicData.establishedDate}</p>
              </div>
            </div>
          </div>

          {/* Doctors */}
          <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-[#323232]">所属医師</h2>
              <span className="text-sm text-gray-500">{clinicData.doctors.length}名</span>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    氏名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    役職
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    プラン
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {clinicData.doctors.map((doctor) => (
                  <tr key={doctor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/members/${doctor.id}`}
                        className="font-medium text-[#323232] hover:text-[#0073aa]"
                      >
                        {doctor.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-[#323232]">{doctor.role}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700">
                        {doctor.plan}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Status */}
          <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-[#323232] mb-4">ステータス</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">状態</span>
                <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700">
                  {clinicData.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">所属医師数</span>
                <span className="text-sm font-medium text-[#323232]">{clinicData.doctors.length}名</span>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-[#323232] mb-4">アクション</h2>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 text-left text-sm border border-gray-200 rounded-[3px] hover:bg-gray-50 text-gray-700">
                医師を追加
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

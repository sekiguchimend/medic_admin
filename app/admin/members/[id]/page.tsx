"use client";

import Link from "next/link";
import { use } from "react";

// ダミーデータ
const memberData = {
  id: 1,
  name: "田中 太郎",
  nameKana: "タナカ タロウ",
  email: "tanaka@example.com",
  phone: "03-1234-5678",
  mobile: "090-1234-5678",
  clinic: "田中美容クリニック",
  clinicAddress: "東京都港区赤坂1-2-3 赤坂ビル5F",
  website: "https://tanaka-clinic.jp",
  societies: ["日本美容外科学会", "日本形成外科学会"],
  plan: "Aプラン",
  status: "アクティブ",
  joinDate: "2022-04-15",
  lastUpdated: "2024-01-10",
  licenseNumber: "医籍第123456号",
  specialty: "美容外科",
};

const contractHistory = [
  {
    id: 1,
    year: "2024",
    plan: "Aプラン",
    premium: 180000,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "有効",
    changes: ["基本補償額の増額"],
  },
  {
    id: 2,
    year: "2023",
    plan: "Aプラン",
    premium: 165000,
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    status: "完了",
    changes: [],
  },
  {
    id: 3,
    year: "2022",
    plan: "Bプラン",
    premium: 120000,
    startDate: "2022-04-15",
    endDate: "2022-12-31",
    status: "完了",
    changes: ["新規加入"],
  },
];

const paymentHistory = [
  { id: 1, date: "2024-01-05", amount: 15000, method: "口座振替", status: "完了" },
  { id: 2, date: "2023-12-05", amount: 15000, method: "口座振替", status: "完了" },
  { id: 3, date: "2023-11-05", amount: 15000, method: "口座振替", status: "完了" },
  { id: 4, date: "2023-10-05", amount: 15000, method: "口座振替", status: "完了" },
];

export default function MemberDetailPage({
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
            href="/admin/members"
            className="text-gray-500 hover:text-gray-700"
          >
            ← 戻る
          </Link>
          <div>
            <h1 className="text-2xl font-medium text-gray-600">会員詳細</h1>
            <p className="text-gray-500 mt-1">ID: {id}</p>
          </div>
        </div>
        <Link
          href={`/admin/members/${id}/edit`}
          className="px-4 py-2 bg-[#0073aa] text-white rounded-[3px] text-sm font-medium hover:bg-[#005f8a]"
        >
          編集
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Member info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Basic info */}
          <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-[#323232] mb-6">
              基本情報
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">氏名</p>
                <p className="text-[#323232] font-medium">{memberData.name}</p>
                <p className="text-sm text-gray-500">{memberData.nameKana}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">医籍番号</p>
                <p className="text-[#323232]">{memberData.licenseNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">専門</p>
                <p className="text-[#323232]">{memberData.specialty}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">入会日</p>
                <p className="text-[#323232]">{memberData.joinDate}</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-2">所属学会</p>
              <div className="flex flex-wrap gap-2">
                {memberData.societies.map((society) => (
                  <span
                    key={society}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                  >
                    {society}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact info */}
          <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-[#323232] mb-6">
              連絡先・クリニック情報
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">メールアドレス</p>
                <p className="text-[#323232]">{memberData.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">電話番号</p>
                <p className="text-[#323232]">
                  {memberData.phone} / {memberData.mobile}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">クリニック名</p>
                <p className="text-[#323232]">{memberData.clinic}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">住所</p>
                <p className="text-[#323232]">{memberData.clinicAddress}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">ウェブサイト</p>
                <a
                  href={memberData.website}
                  className="text-[#0073aa] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {memberData.website}
                </a>
              </div>
            </div>
          </div>

          {/* Contract history */}
          <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-[#323232]">
                契約履歴（年度別）
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {contractHistory.map((contract) => (
                <div
                  key={contract.id}
                  className="p-6"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-medium text-[#323232]">
                        {contract.year}年度
                      </span>
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded ${
                          contract.status === "有効"
                            ? "bg-gray-100 text-gray-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {contract.status}
                      </span>
                    </div>
                    <span className="text-sm font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {contract.plan}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">保険料</p>
                      <p className="font-medium text-[#323232]">
                        ¥{contract.premium.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">契約期間</p>
                      <p className="font-medium text-[#323232]">
                        {contract.startDate} - {contract.endDate}
                      </p>
                    </div>
                    {contract.changes.length > 0 && (
                      <div>
                        <p className="text-gray-500">変更内容</p>
                        <p className="font-medium text-gray-700">
                          {contract.changes.join(", ")}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Status card */}
          <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-[#323232]">ステータス</h2>
              <span className="px-3 py-1 text-sm font-medium rounded bg-gray-100 text-gray-700">
                {memberData.status}
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">現在のプラン</span>
                <span className="font-medium text-[#0073aa]">
                  {memberData.plan}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">最終更新</span>
                <span className="font-medium text-[#323232]">{memberData.lastUpdated}</span>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-[#323232] mb-4">
              クイックアクション
            </h2>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 text-left text-sm border border-gray-200 rounded-[3px] hover:bg-gray-50 text-gray-700">
                メール送信
              </button>
              <button className="w-full px-4 py-2 text-left text-sm border border-gray-200 rounded-[3px] hover:bg-gray-50 text-gray-700">
                会員証発行
              </button>
              <button className="w-full px-4 py-2 text-left text-sm border border-gray-200 rounded-[3px] hover:bg-gray-50 text-gray-700">
                契約更新
              </button>
            </div>
          </div>

          {/* Payment history */}
          <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-[#323232] mb-4">
              直近の請求
            </h2>
            <div className="space-y-3">
              {paymentHistory.slice(0, 4).map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between text-sm"
                >
                  <div>
                    <p className="text-[#323232]">{payment.date}</p>
                    <p className="text-xs text-gray-500">{payment.method}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-[#323232]">
                      ¥{payment.amount.toLocaleString()}
                    </p>
                    <span className="text-xs text-gray-500">
                      {payment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href={`/admin/billing?member=${id}`}
              className="block mt-4 text-center text-sm text-[#0073aa] hover:underline"
            >
              すべての請求を見る
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { use } from "react";

const contractData = {
  id: 1,
  memberId: 1,
  memberName: "田中 太郎",
  clinic: "田中美容クリニック",
  plan: "Aプラン",
  premium: 180000,
  monthlyPayment: 15000,
  startDate: "2024-01-01",
  endDate: "2024-12-31",
  status: "有効",
  renewalStatus: "更新済",
  paymentMethod: "口座振替",
  bankName: "三菱UFJ銀行",
  branchName: "渋谷支店",
  accountType: "普通",
  accountNumber: "1234567",
  createdAt: "2023-12-15",
  updatedAt: "2024-01-10",
};

const paymentHistory = [
  { id: 1, date: "2024-01-05", amount: 15000, status: "完了" },
  { id: 2, date: "2023-12-05", amount: 15000, status: "完了" },
  { id: 3, date: "2023-11-05", amount: 15000, status: "完了" },
];

export default function ContractDetailPage({
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
          <Link href="/admin/contracts" className="text-gray-500 hover:text-gray-700">
            戻る
          </Link>
          <div>
            <h1 className="text-2xl font-medium text-gray-600">契約詳細</h1>
            <p className="text-gray-500 mt-1">契約ID: {id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-[3px] text-sm font-medium text-gray-700 hover:bg-gray-50">
            契約書出力
          </button>
          <Link
            href={`/admin/contracts/${id}/edit`}
            className="px-4 py-2 bg-[#0073aa] text-white rounded-[3px] text-sm font-medium hover:bg-[#005f8a]"
          >
            編集
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Contract info */}
          <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-[#323232] mb-4">契約情報</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">会員名</p>
                <Link href={`/admin/members/${contractData.memberId}`} className="text-[#0073aa] hover:underline font-medium">
                  {contractData.memberName}
                </Link>
              </div>
              <div>
                <p className="text-sm text-gray-500">クリニック</p>
                <p className="text-[#323232]">{contractData.clinic}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">プラン</p>
                <p className="text-[#323232]">{contractData.plan}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">年間保険料</p>
                <p className="text-[#323232] font-medium">¥{contractData.premium.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">月額</p>
                <p className="text-[#323232]">¥{contractData.monthlyPayment.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">契約期間</p>
                <p className="text-[#323232]">{contractData.startDate} 〜 {contractData.endDate}</p>
              </div>
            </div>
          </div>

          {/* Payment info */}
          <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-[#323232] mb-4">支払情報</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">支払方法</p>
                <p className="text-[#323232]">{contractData.paymentMethod}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">金融機関</p>
                <p className="text-[#323232]">{contractData.bankName} {contractData.branchName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">口座種別</p>
                <p className="text-[#323232]">{contractData.accountType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">口座番号</p>
                <p className="text-[#323232]">****{contractData.accountNumber.slice(-4)}</p>
              </div>
            </div>
          </div>

          {/* Payment history */}
          <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-[#323232] mb-4">支払履歴</h2>
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">日付</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">金額</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ステータス</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paymentHistory.map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-4 py-3 text-sm text-[#323232]">{payment.date}</td>
                    <td className="px-4 py-3 text-sm font-medium text-[#323232]">¥{payment.amount.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700">
                        {payment.status}
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
                <span className="text-sm text-gray-500">契約状態</span>
                <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700">
                  {contractData.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">更新状況</span>
                <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700">
                  {contractData.renewalStatus}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">作成日</span>
                <span className="text-sm text-[#323232]">{contractData.createdAt}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">更新日</span>
                <span className="text-sm text-[#323232]">{contractData.updatedAt}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-[#323232] mb-4">アクション</h2>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 text-left text-sm border border-gray-200 rounded-[3px] hover:bg-gray-50 text-gray-700">
                契約書を再発行
              </button>
              <button className="w-full px-4 py-2 text-left text-sm border border-gray-200 rounded-[3px] hover:bg-gray-50 text-gray-700">
                プラン変更
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

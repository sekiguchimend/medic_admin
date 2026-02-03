"use client";

import { useState } from "react";
import Link from "next/link";

// ダミーデータ
const contracts = [
  {
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
  },
  {
    id: 2,
    memberId: 2,
    memberName: "佐藤 花子",
    clinic: "さくら皮膚科クリニック",
    plan: "Bプラン",
    premium: 240000,
    monthlyPayment: 20000,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "有効",
    renewalStatus: "更新済",
  },
  {
    id: 3,
    memberId: 3,
    memberName: "山田 次郎",
    clinic: "やまだ形成外科",
    plan: "Cプラン",
    premium: 360000,
    monthlyPayment: 30000,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "有効",
    renewalStatus: "確認中",
  },
  {
    id: 4,
    memberId: 4,
    memberName: "鈴木 美咲",
    clinic: "スズキビューティークリニック",
    plan: "Aプラン",
    premium: 180000,
    monthlyPayment: 15000,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "保留",
    renewalStatus: "未確認",
  },
  {
    id: 5,
    memberId: 5,
    memberName: "高橋 健一",
    clinic: "高橋美容外科クリニック",
    plan: "Bプラン",
    premium: 240000,
    monthlyPayment: 20000,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "有効",
    renewalStatus: "更新済",
  },
];

const plans = ["Aプラン", "Bプラン", "Cプラン"];

export default function ContractsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [planFilter, setPlanFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("2024");

  const filteredContracts = contracts.filter((contract) => {
    const matchesSearch =
      contract.memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.clinic.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPlan =
      planFilter === "all" || contract.plan === planFilter;

    const matchesStatus =
      statusFilter === "all" || contract.status === statusFilter;

    return matchesSearch && matchesPlan && matchesStatus;
  });

  const totalPremium = filteredContracts.reduce(
    (sum, c) => sum + c.premium,
    0
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-medium text-gray-600">契約管理</h1>
          <p className="text-gray-500 mt-1">
            アクティブ契約: {contracts.filter((c) => c.status === "有効").length}件
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-[3px] text-sm font-medium text-gray-700 hover:bg-gray-50">
            CSV出力
          </button>
          <Link
            href="/admin/contracts/new"
            className="px-4 py-2 bg-[#0073aa] text-white rounded-[3px] text-sm font-medium hover:bg-[#005f8a]"
          >
            新規契約
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">契約総数</p>
          <p className="text-2xl font-bold text-[#323232]">{filteredContracts.length}</p>
        </div>
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">有効契約</p>
          <p className="text-2xl font-bold text-[#323232]">
            {filteredContracts.filter((c) => c.status === "有効").length}
          </p>
        </div>
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">更新確認中</p>
          <p className="text-2xl font-bold text-[#323232]">
            {filteredContracts.filter((c) => c.renewalStatus === "確認中").length}
          </p>
        </div>
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">年間保険料合計</p>
          <p className="text-2xl font-bold text-[#0073aa]">
            ¥{totalPremium.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Renewal alert */}
      <div className="bg-gray-50 border border-gray-200 rounded-[3px] p-4">
        <p className="font-medium text-gray-700">更新確認が必要な契約があります</p>
        <p className="text-sm text-gray-600 mt-1">
          12月更新の確認が必要な会員が{" "}
          {contracts.filter((c) => c.renewalStatus !== "更新済").length}名います。
          <Link href="/admin/contracts/renewal" className="text-[#0073aa] hover:underline ml-1">
            確認する
          </Link>
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="会員名、クリニック名で検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa] focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa] focus:border-transparent"
            >
              <option value="2024">2024年度</option>
              <option value="2023">2023年度</option>
              <option value="2022">2022年度</option>
            </select>
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa] focus:border-transparent"
            >
              <option value="all">すべてのプラン</option>
              {plans.map((plan) => (
                <option key={plan} value={plan}>
                  {plan}
                </option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa] focus:border-transparent"
            >
              <option value="all">すべてのステータス</option>
              <option value="有効">有効</option>
              <option value="保留">保留</option>
              <option value="期限切れ">期限切れ</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  会員
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  プラン
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  年間保険料
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  月額
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  契約期間
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  ステータス
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  更新状況
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredContracts.map((contract) => (
                <tr key={contract.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/members/${contract.memberId}`}
                      className="hover:text-[#0073aa]"
                    >
                      <p className="text-sm font-medium text-[#323232]">
                        {contract.memberName}
                      </p>
                      <p className="text-sm text-gray-500">{contract.clinic}</p>
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[#323232]">
                      {contract.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-[#323232]">
                    ¥{contract.premium.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#323232]">
                    ¥{contract.monthlyPayment.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {contract.startDate} 〜 {contract.endDate}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700">
                      {contract.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700">
                      {contract.renewalStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/contracts/${contract.id}`}
                        className="text-sm text-[#0073aa] hover:underline"
                      >
                        詳細
                      </Link>
                      <Link
                        href={`/admin/contracts/${contract.id}/edit`}
                        className="text-sm text-gray-500 hover:text-gray-700"
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

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {filteredContracts.length}件中 1-{filteredContracts.length}件を表示
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50">
              前へ
            </button>
            <button className="px-3 py-1 bg-[#0073aa] text-white rounded text-sm">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
              次へ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

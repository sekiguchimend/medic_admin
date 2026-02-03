"use client";

import { useState } from "react";
import Link from "next/link";

// ダミーデータ - 年度別契約履歴
const contractHistories = [
  {
    memberId: 1,
    memberName: "田中 太郎",
    clinic: "田中美容クリニック",
    histories: [
      { year: 2024, plan: "Aプラン", premium: 180000, status: "有効", changes: ["基本補償額増額"] },
      { year: 2023, plan: "Aプラン", premium: 165000, status: "完了", changes: [] },
      { year: 2022, plan: "Bプラン", premium: 120000, status: "完了", changes: ["新規加入"] },
    ],
  },
  {
    memberId: 2,
    memberName: "佐藤 花子",
    clinic: "さくら皮膚科クリニック",
    histories: [
      { year: 2024, plan: "Bプラン", premium: 240000, status: "有効", changes: [] },
      { year: 2023, plan: "Bプラン", premium: 240000, status: "完了", changes: [] },
      { year: 2022, plan: "Aプラン", premium: 150000, status: "完了", changes: [] },
      { year: 2021, plan: "Aプラン", premium: 150000, status: "完了", changes: ["新規加入"] },
    ],
  },
  {
    memberId: 3,
    memberName: "山田 次郎",
    clinic: "やまだ形成外科",
    histories: [
      { year: 2024, plan: "Cプラン", premium: 360000, status: "有効", changes: ["プラン変更"] },
      { year: 2023, plan: "Bプラン", premium: 240000, status: "完了", changes: ["新規加入"] },
    ],
  },
  {
    memberId: 4,
    memberName: "鈴木 美咲",
    clinic: "スズキビューティークリニック",
    histories: [
      { year: 2024, plan: "Aプラン", premium: 180000, status: "保留", changes: [] },
      { year: 2023, plan: "Aプラン", premium: 165000, status: "完了", changes: ["新規加入"] },
    ],
  },
  {
    memberId: 5,
    memberName: "高橋 健一",
    clinic: "高橋美容外科クリニック",
    histories: [
      { year: 2024, plan: "Bプラン", premium: 240000, status: "有効", changes: [] },
      { year: 2023, plan: "Bプラン", premium: 240000, status: "完了", changes: [] },
      { year: 2022, plan: "Bプラン", premium: 220000, status: "完了", changes: [] },
      { year: 2021, plan: "Aプラン", premium: 150000, status: "完了", changes: [] },
      { year: 2020, plan: "Aプラン", premium: 150000, status: "完了", changes: ["新規加入"] },
    ],
  },
];

const years = [2024, 2023, 2022, 2021, 2020];

export default function ContractHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");
  const [expandedMembers, setExpandedMembers] = useState<number[]>([]);

  const toggleMember = (memberId: number) => {
    setExpandedMembers((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId]
    );
  };

  const filteredHistories = contractHistories.filter((member) => {
    const matchesSearch =
      member.memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.clinic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // 年度別集計
  const yearlyStats = years.map((year) => {
    const count = contractHistories.filter((m) =>
      m.histories.some((h) => h.year === year)
    ).length;
    const total = contractHistories.reduce((sum, m) => {
      const yearHistory = m.histories.find((h) => h.year === year);
      return sum + (yearHistory?.premium || 0);
    }, 0);
    return { year, count, total };
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-medium text-gray-600">契約履歴</h1>
          <p className="text-gray-500 mt-1">
            会員ごとの年度別契約履歴を確認できます
          </p>
        </div>
        <button className="mt-4 md:mt-0 px-4 py-2 bg-white border border-gray-300 rounded-[3px] text-sm font-medium text-gray-700 hover:bg-gray-50">
          履歴をエクスポート
        </button>
      </div>

      {/* Year stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {yearlyStats.map((stat) => (
          <div
            key={stat.year}
            className={`bg-white rounded-[3px] shadow-sm border p-4 cursor-pointer transition-colors ${
              selectedYear === stat.year
                ? "border-[#0073aa] bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() =>
              setSelectedYear(selectedYear === stat.year ? "all" : stat.year)
            }
          >
            <p className="text-lg font-bold text-[#323232]">{stat.year}年度</p>
            <p className="text-sm text-gray-500 mt-1">{stat.count}件</p>
            <p className="text-sm font-medium text-[#0073aa] mt-1">
              ¥{stat.total.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
        <input
          type="text"
          placeholder="会員名、クリニック名で検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa] focus:border-transparent"
        />
      </div>

      {/* History list */}
      <div className="space-y-4">
        {filteredHistories.map((member) => {
          const isExpanded = expandedMembers.includes(member.memberId);
          const filteredYearHistories =
            selectedYear === "all"
              ? member.histories
              : member.histories.filter((h) => h.year === selectedYear);

          if (filteredYearHistories.length === 0) return null;

          return (
            <div
              key={member.memberId}
              className="bg-white rounded-[3px] shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* Member header */}
              <button
                onClick={() => toggleMember(member.memberId)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#0073aa] rounded-full flex items-center justify-center text-white font-medium">
                    {member.memberName.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-[#323232]">
                      {member.memberName}
                    </p>
                    <p className="text-sm text-gray-500">{member.clinic}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">契約年数</p>
                    <p className="font-medium text-[#323232]">
                      {member.histories.length}年
                    </p>
                  </div>
                  <span className="text-gray-400 text-sm">
                    {isExpanded ? "閉じる" : "開く"}
                  </span>
                </div>
              </button>

              {/* Expanded history */}
              {isExpanded && (
                <div className="border-t border-gray-200">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          年度
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          プラン
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          年間保険料
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          前年比
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          変更内容
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          ステータス
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredYearHistories.map((history, index) => {
                        const prevHistory = member.histories[index + 1];
                        const diff = prevHistory
                          ? history.premium - prevHistory.premium
                          : 0;

                        return (
                          <tr key={history.year} className="hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-[#323232]">
                              {history.year}年度
                            </td>
                            <td className="px-6 py-4 text-[#323232]">
                              {history.plan}
                            </td>
                            <td className="px-6 py-4 font-medium text-[#323232]">
                              ¥{history.premium.toLocaleString()}
                            </td>
                            <td className="px-6 py-4">
                              {diff !== 0 && (
                                <span className="text-sm text-gray-600">
                                  {diff > 0 ? "+" : ""}¥{diff.toLocaleString()}
                                </span>
                              )}
                              {diff === 0 && prevHistory && (
                                <span className="text-sm text-gray-400">-</span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              {history.changes.length > 0 ? (
                                <div className="flex flex-wrap gap-1">
                                  {history.changes.map((change, i) => (
                                    <span
                                      key={i}
                                      className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded"
                                    >
                                      {change}
                                    </span>
                                  ))}
                                </div>
                              ) : (
                                <span className="text-sm text-gray-400">
                                  変更なし
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700">
                                {history.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                    <Link
                      href={`/admin/members/${member.memberId}`}
                      className="text-sm text-[#0073aa] hover:underline"
                    >
                      会員詳細を見る
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

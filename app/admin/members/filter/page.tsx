"use client";

import { useState } from "react";
import Link from "next/link";

const societies = [
  { id: "jsaps", name: "日本美容外科学会（JSAPS）", count: 856 },
  { id: "jsprs", name: "日本形成外科学会", count: 724 },
  { id: "jda", name: "日本皮膚科学会", count: 612 },
  { id: "jcad", name: "日本美容皮膚科学会", count: 534 },
  { id: "jaam", name: "日本美容医療協会", count: 421 },
];

const members = [
  { id: 1, name: "田中 太郎", clinic: "田中美容クリニック", societies: ["日本美容外科学会（JSAPS）", "日本形成外科学会"], plan: "Aプラン" },
  { id: 2, name: "佐藤 花子", clinic: "さくら皮膚科クリニック", societies: ["日本皮膚科学会", "日本美容皮膚科学会"], plan: "Bプラン" },
  { id: 3, name: "山田 次郎", clinic: "やまだ形成外科", societies: ["日本形成外科学会"], plan: "Cプラン" },
  { id: 4, name: "鈴木 美咲", clinic: "スズキビューティークリニック", societies: ["日本美容医療協会", "日本美容外科学会（JSAPS）"], plan: "Aプラン" },
  { id: 5, name: "高橋 健一", clinic: "高橋美容外科クリニック", societies: ["日本美容外科学会（JSAPS）"], plan: "Bプラン" },
];

export default function MemberFilterPage() {
  const [selectedSocieties, setSelectedSocieties] = useState<string[]>([]);

  const toggleSociety = (name: string) => {
    setSelectedSocieties((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  };

  const filteredMembers = members.filter((member) => {
    if (selectedSocieties.length === 0) return true;
    return member.societies.some((s) => selectedSocieties.includes(s));
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-medium text-gray-600">学会別フィルター</h1>
        <p className="text-gray-500 mt-1">所属学会で会員を絞り込みます</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filter sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
            <h2 className="font-medium text-[#323232] mb-4">学会を選択</h2>
            <div className="space-y-2">
              {societies.map((society) => (
                <label
                  key={society.id}
                  className={`flex items-center justify-between p-3 border rounded-[3px] cursor-pointer transition-colors ${
                    selectedSocieties.includes(society.name)
                      ? "border-[#0073aa] bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedSocieties.includes(society.name)}
                      onChange={() => toggleSociety(society.name)}
                      className="w-4 h-4 text-[#0073aa] border-gray-300 rounded"
                    />
                    <span className="text-sm text-[#323232]">{society.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">{society.count}</span>
                </label>
              ))}
            </div>
            {selectedSocieties.length > 0 && (
              <button
                onClick={() => setSelectedSocieties([])}
                className="mt-4 w-full px-4 py-2 text-sm text-gray-500 border border-gray-200 rounded-[3px] hover:bg-gray-50"
              >
                フィルターをクリア
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-[3px] shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <p className="text-sm text-gray-500">
                {filteredMembers.length}件の結果
                {selectedSocieties.length > 0 && (
                  <span className="ml-2">
                    （{selectedSocieties.length}つの学会でフィルター中）
                  </span>
                )}
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">会員</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">所属学会</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">プラン</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <p className="font-medium text-[#323232]">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.clinic}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {member.societies.map((society) => (
                            <span
                              key={society}
                              className={`px-2 py-0.5 text-xs rounded ${
                                selectedSocieties.includes(society)
                                  ? "bg-gray-200 text-gray-800"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {society.length > 15 ? society.slice(0, 15) + "..." : society}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700">
                          {member.plan}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Link href={`/admin/members/${member.id}`} className="text-sm text-[#0073aa] hover:underline">
                            詳細
                          </Link>
                          <Link href={`/admin/members/${member.id}/edit`} className="text-sm text-gray-500 hover:text-gray-700">
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
        </div>
      </div>
    </div>
  );
}

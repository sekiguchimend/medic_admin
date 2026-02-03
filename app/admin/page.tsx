"use client";

import { ArrowRight, TrendingUp, TrendingDown } from "lucide-react";
import Link from "next/link";

// ダミーデータ
const stats = [
  {
    title: "総会員数",
    value: "2,847",
    change: "+12",
    changePercent: 0.4,
    changeType: "increase",
    sparkline: [65, 72, 68, 74, 78, 82, 85, 88, 84, 90, 92, 100],
  },
  {
    title: "アクティブ契約",
    value: "2,456",
    change: "+8",
    changePercent: 0.3,
    changeType: "increase",
    sparkline: [70, 72, 75, 73, 78, 80, 82, 79, 85, 88, 90, 92],
  },
  {
    title: "今月請求額",
    value: "¥4,523万",
    change: "+5.2%",
    changePercent: 5.2,
    changeType: "increase",
    sparkline: [60, 65, 58, 70, 75, 72, 80, 85, 78, 88, 92, 95],
  },
  {
    title: "クリニック数",
    value: "1,234",
    change: "+3",
    changePercent: 0.2,
    changeType: "increase",
    sparkline: [80, 82, 81, 83, 85, 84, 86, 87, 88, 89, 90, 91],
  },
];

const recentMembers = [
  { id: 1, name: "田中 太郎", clinic: "田中美容クリニック", date: "2024-01-15", status: "新規" },
  { id: 2, name: "佐藤 花子", clinic: "さくら皮膚科", date: "2024-01-14", status: "更新" },
  { id: 3, name: "山田 次郎", clinic: "やまだ形成外科", date: "2024-01-14", status: "新規" },
  { id: 4, name: "鈴木 美咲", clinic: "スズキビューティー", date: "2024-01-13", status: "変更" },
  { id: 5, name: "高橋 健一", clinic: "高橋クリニック", date: "2024-01-12", status: "新規" },
];

const notifications = [
  { id: 1, type: "warning", message: "12月更新の確認が必要な会員が15名います", time: "1時間前" },
  { id: 2, type: "info", message: "新規申込が3件届いています", time: "2時間前" },
  { id: 3, type: "success", message: "月次レポートが生成されました", time: "3時間前" },
  { id: 4, type: "warning", message: "口座振替エラーが2件発生しています", time: "5時間前" },
];

const upcomingTasks = [
  { id: 1, task: "12月更新確認の締切", date: "2024-01-20", priority: "high" },
  { id: 2, task: "保険会社への月次報告", date: "2024-01-25", priority: "high" },
  { id: 3, task: "セミナー開催準備", date: "2024-02-01", priority: "medium" },
  { id: 4, task: "四半期レビューミーティング", date: "2024-02-15", priority: "low" },
];

const planStats = [
  { name: "Aプラン", count: 856, amount: 12840000, color: "bg-[#0073aa]", stroke: "#0073aa" },
  { name: "Bプラン", count: 1024, amount: 20480000, color: "bg-[#0073aa]/70", stroke: "#0073aa" },
  { name: "Cプラン", count: 576, amount: 11520000, color: "bg-[#0073aa]/40", stroke: "#0073aa" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-medium text-gray-600">ダッシュボード</h1>
          <p className="text-gray-500 mt-1">
            おかえりなさい、管理者さん。システムの概要をご確認ください。
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Link
            href="/admin/reports"
            className="px-4 py-2 bg-white border border-gray-300 rounded-[3px] text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            レポート表示
          </Link>
          <Link
            href="/admin/members/new"
            className="px-4 py-2 bg-[#0073aa] text-white rounded-[3px] text-sm font-medium hover:bg-[#005f8a]"
          >
            新規会員登録
          </Link>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white p-4 rounded-[3px] shadow-sm border border-gray-200">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs text-gray-500">{stat.title}</p>
                <p className="text-xl font-semibold text-[#323232] mt-0.5">{stat.value}</p>
              </div>
              <span
                className={`text-xs font-medium px-1.5 py-0.5 rounded ${
                  stat.changeType === "increase"
                    ? "text-emerald-700 bg-emerald-50"
                    : "text-red-700 bg-red-50"
                }`}
              >
                {stat.change}
              </span>
            </div>
            {/* Sparkline */}
            <div className="mt-3 h-8">
              <svg className="w-full h-full" viewBox="0 0 100 32" preserveAspectRatio="none">
                <defs>
                  <linearGradient id={`gradient-${stat.title}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0073aa" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#0073aa" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d={`M0,${32 - (stat.sparkline[0] / 100) * 32} ${stat.sparkline
                    .map((v, i) => `L${(i / (stat.sparkline.length - 1)) * 100},${32 - (v / 100) * 32}`)
                    .join(" ")} L100,32 L0,32 Z`}
                  fill={`url(#gradient-${stat.title})`}
                />
                <path
                  d={`M0,${32 - (stat.sparkline[0] / 100) * 32} ${stat.sparkline
                    .map((v, i) => `L${(i / (stat.sparkline.length - 1)) * 100},${32 - (v / 100) * 32}`)
                    .join(" ")}`}
                  fill="none"
                  stroke="#0073aa"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent members */}
        <div className="lg:col-span-2 bg-white rounded-[3px] shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#323232]">最近の会員動向</h2>
              <Link
                href="/admin/members"
                className="text-[#0073aa] text-sm hover:underline flex items-center gap-1"
              >
                すべて表示 <ArrowRight size={14} />
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    会員名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    クリニック
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    日付
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    ステータス
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">
                            {member.name.charAt(0)}
                          </span>
                        </div>
                        <span className="ml-3 text-sm font-medium text-[#323232]">
                          {member.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {member.clinic}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {member.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          member.status === "新規"
                            ? "bg-green-100 text-green-800"
                            : member.status === "更新"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {member.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#323232]">通知</h2>
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                {notifications.length}件
              </span>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {notifications.map((notification) => (
              <div key={notification.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      notification.type === "warning"
                        ? "bg-yellow-500"
                        : notification.type === "success"
                        ? "bg-green-500"
                        : "bg-blue-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-[#323232]">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Plan stats */}
        <div className="lg:col-span-2 bg-white rounded-[3px] shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-[#323232] mb-6">プラン別集計</h2>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Donut Chart */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <div className="relative w-36 h-36">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#f3f4f6"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#0073aa"
                    strokeWidth="8"
                    strokeDasharray={`${(856 / 2456) * 251.2} 251.2`}
                    strokeDashoffset="0"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#3b9fc9"
                    strokeWidth="8"
                    strokeDasharray={`${(1024 / 2456) * 251.2} 251.2`}
                    strokeDashoffset={`${-(856 / 2456) * 251.2}`}
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#a3d4e8"
                    strokeWidth="8"
                    strokeDasharray={`${(576 / 2456) * 251.2} 251.2`}
                    strokeDashoffset={`${-((856 + 1024) / 2456) * 251.2}`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-semibold text-[#323232]">2,456</span>
                  <span className="text-xs text-gray-400">総会員数</span>
                </div>
              </div>
            </div>

            {/* Plan Table */}
            <div className="flex-1">
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-gray-400 uppercase">
                    <th className="text-left font-medium pb-3">プラン</th>
                    <th className="text-right font-medium pb-3">会員数</th>
                    <th className="text-right font-medium pb-3">売上</th>
                    <th className="text-right font-medium pb-3">構成比</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {planStats.map((plan, index) => (
                    <tr key={plan.name} className="border-t border-gray-100">
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{
                              backgroundColor: index === 0 ? '#0073aa' : index === 1 ? '#3b9fc9' : '#a3d4e8'
                            }}
                          />
                          <span className="text-gray-700">{plan.name}</span>
                        </div>
                      </td>
                      <td className="text-right text-[#323232] font-medium py-3">
                        {plan.count.toLocaleString()}
                      </td>
                      <td className="text-right text-gray-500 py-3">
                        ¥{(plan.amount / 10000).toLocaleString()}万
                      </td>
                      <td className="text-right text-gray-400 py-3">
                        {((plan.count / 2456) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-gray-200">
                    <td className="py-3 text-gray-500 font-medium">合計</td>
                    <td className="text-right text-[#323232] font-semibold py-3">2,456</td>
                    <td className="text-right text-[#323232] font-semibold py-3">
                      ¥{((12840000 + 20480000 + 11520000) / 10000).toLocaleString()}万
                    </td>
                    <td className="text-right text-gray-400 py-3">100%</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        {/* Upcoming tasks */}
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-[#323232]">今後のタスク</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      task.priority === "high"
                        ? "bg-red-500"
                        : task.priority === "medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#323232]">{task.task}</p>
                    <p className="text-xs text-gray-500 mt-1">{task.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

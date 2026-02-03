"use client";

import Link from "next/link";

// ダミーデータ
const campaigns = [
  {
    id: 1,
    title: "2024年新年のご挨拶",
    sentAt: "2024-01-05",
    recipients: 2847,
    opened: 1823,
    clicked: 456,
    status: "送信済",
  },
  {
    id: 2,
    title: "12月更新のお知らせ",
    sentAt: "2023-12-01",
    recipients: 2800,
    opened: 1960,
    clicked: 672,
    status: "送信済",
  },
  {
    id: 3,
    title: "美容医療セミナーのご案内",
    sentAt: "2023-11-15",
    recipients: 2750,
    opened: 1650,
    clicked: 523,
    status: "送信済",
  },
  {
    id: 4,
    title: "2月セミナー開催のお知らせ",
    scheduledAt: "2024-01-20",
    recipients: 2847,
    status: "予約済",
  },
];

const stats = {
  totalSubscribers: 2847,
  averageOpenRate: 68.5,
  averageClickRate: 21.3,
  unsubscribeRate: 0.3,
};

export default function MarketingPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-medium text-gray-600">マーケティング</h1>
          <p className="text-gray-500 mt-1">
            メルマガ配信とマーケティング施策を管理します
          </p>
        </div>
        <button className="mt-4 md:mt-0 px-4 py-2 bg-[#0073aa] text-white rounded-[3px] text-sm font-medium hover:bg-[#005f8a]">
          新規キャンペーン作成
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500 mb-1">購読者数</p>
          <p className="text-2xl font-bold text-[#323232]">
            {stats.totalSubscribers.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500 mb-1">平均開封率</p>
          <p className="text-2xl font-bold text-[#0073aa]">
            {stats.averageOpenRate}%
          </p>
        </div>
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500 mb-1">平均クリック率</p>
          <p className="text-2xl font-bold text-[#323232]">
            {stats.averageClickRate}%
          </p>
        </div>
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500 mb-1">解除率</p>
          <p className="text-2xl font-bold text-[#323232]">
            {stats.unsubscribeRate}%
          </p>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/admin/marketing/email"
          className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6 hover:border-[#0073aa] transition-colors"
        >
          <h3 className="font-medium text-[#323232]">メルマガ配信</h3>
          <p className="text-sm text-gray-500">メール配信の管理</p>
        </Link>
        <Link
          href="/admin/marketing/hubspot"
          className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6 hover:border-[#0073aa] transition-colors"
        >
          <h3 className="font-medium text-[#323232]">HubSpot連携</h3>
          <p className="text-sm text-gray-500">CRM連携設定</p>
        </Link>
        <Link
          href="/admin/marketing/analytics"
          className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6 hover:border-[#0073aa] transition-colors"
        >
          <h3 className="font-medium text-[#323232]">アクセス解析</h3>
          <p className="text-sm text-gray-500">サイト分析</p>
        </Link>
      </div>

      {/* Recent campaigns */}
      <div className="bg-white rounded-[3px] shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-[#323232]">
            最近のキャンペーン
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  キャンペーン
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  送信日
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  配信数
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  開封
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  クリック
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  ステータス
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-[#323232]">{campaign.title}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {campaign.sentAt || campaign.scheduledAt}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#323232]">
                    {campaign.recipients.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {campaign.opened ? (
                      <div>
                        <span className="font-medium text-[#323232]">
                          {campaign.opened.toLocaleString()}
                        </span>
                        <span className="text-gray-500 ml-1">
                          ({Math.round((campaign.opened / campaign.recipients) * 100)}%)
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {campaign.clicked ? (
                      <div>
                        <span className="font-medium text-[#323232]">
                          {campaign.clicked.toLocaleString()}
                        </span>
                        <span className="text-gray-500 ml-1">
                          ({Math.round((campaign.clicked / campaign.recipients) * 100)}%)
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700">
                      {campaign.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

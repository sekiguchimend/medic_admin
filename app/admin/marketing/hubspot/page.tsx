"use client";

import Link from "next/link";

const syncStatus = {
  lastSync: "2024-01-15 10:30",
  contacts: { synced: 2847, total: 2847, status: "success" },
  companies: { synced: 1234, total: 1234, status: "success" },
  deals: { synced: 456, total: 460, status: "warning" },
};

const recentActivity = [
  { id: 1, action: "連絡先同期", count: 15, time: "10分前", status: "success" },
  { id: 2, action: "会社情報更新", count: 3, time: "30分前", status: "success" },
  { id: 3, action: "取引同期", count: 2, time: "1時間前", status: "warning" },
  { id: 4, action: "連絡先同期", count: 28, time: "2時間前", status: "success" },
];

export default function HubSpotPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/marketing" className="text-[#0073aa] hover:underline text-sm">
            戻る
          </Link>
          <div>
            <h1 className="text-2xl font-medium text-gray-600">HubSpot連携</h1>
            <p className="text-gray-500 mt-1">CRMデータの同期設定を管理します</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-[#0073aa] text-white rounded-[3px] text-sm font-medium hover:bg-[#005f8a]">
          今すぐ同期
        </button>
      </div>

      {/* Connection status */}
      <div className="bg-gray-50 border border-gray-200 rounded-[3px] p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#0073aa] rounded-[3px] flex items-center justify-center">
            <span className="text-white font-bold">H</span>
          </div>
          <div>
            <p className="font-medium text-[#323232]">HubSpotに接続中</p>
            <p className="text-sm text-gray-500">最終同期: {syncStatus.lastSync}</p>
          </div>
        </div>
        <button className="px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-[3px] hover:bg-gray-100">
          設定
        </button>
      </div>

      {/* Sync status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">連絡先</p>
          </div>
          <p className="text-2xl font-bold text-[#323232]">
            {syncStatus.contacts.synced.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-1">同期完了</p>
        </div>
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">会社</p>
          </div>
          <p className="text-2xl font-bold text-[#323232]">
            {syncStatus.companies.synced.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-1">同期完了</p>
        </div>
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">取引</p>
          </div>
          <p className="text-2xl font-bold text-[#323232]">
            {syncStatus.deals.synced} / {syncStatus.deals.total}
          </p>
          <p className="text-sm text-gray-500 mt-1">4件の同期エラー</p>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-[#323232] mb-4">同期設定</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <p className="font-medium text-[#323232]">自動同期</p>
              <p className="text-sm text-gray-500">1時間ごとに自動同期を実行</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0073aa]"></div>
            </label>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <p className="font-medium text-[#323232]">連絡先の双方向同期</p>
              <p className="text-sm text-gray-500">HubSpotの変更も取り込む</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0073aa]"></div>
            </label>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-[#323232]">エラー通知</p>
              <p className="text-sm text-gray-500">同期エラー時にメール通知</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0073aa]"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-[#323232] mb-4">最近のアクティビティ</h2>
        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-gray-400" />
                <div>
                  <p className="text-sm text-[#323232]">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.count}件 - {activity.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

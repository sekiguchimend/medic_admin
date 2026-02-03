"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "一般設定" },
    { id: "notifications", label: "通知設定" },
    { id: "payment", label: "決済設定" },
    { id: "email", label: "メール設定" },
    { id: "security", label: "セキュリティ" },
    { id: "integrations", label: "外部連携" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium text-gray-600">設定</h1>
          <p className="text-gray-500 mt-1">システム設定を管理します</p>
        </div>
        <button className="px-4 py-2 bg-[#0073aa] text-white rounded-[3px] text-sm font-medium hover:bg-[#005f8a]">
          保存
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <nav className="bg-white rounded-[3px] shadow-sm border border-gray-200 overflow-hidden">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors ${
                  activeTab === tab.id
                    ? "bg-[#0073aa] text-white"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6">
            {activeTab === "general" && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-[#323232]">一般設定</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      組織名
                    </label>
                    <input
                      type="text"
                      defaultValue="一般社団法人日本美容医療リスクマネジメント協会"
                      className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      管理者メールアドレス
                    </label>
                    <input
                      type="email"
                      defaultValue="admin@jbrm.jp"
                      className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      契約更新月
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]">
                      <option value="12">12月</option>
                      <option value="1">1月</option>
                      <option value="4">4月</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      タイムゾーン
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]">
                      <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-[#323232]">通知設定</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <p className="font-medium text-[#323232]">新規申込通知</p>
                      <p className="text-sm text-gray-500">
                        新規会員申込があった際に通知を受け取る
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0073aa]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <p className="font-medium text-[#323232]">会員情報変更通知</p>
                      <p className="text-sm text-gray-500">
                        会員が情報を変更した際に通知を受け取る
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0073aa]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <p className="font-medium text-[#323232]">契約更新リマインダー</p>
                      <p className="text-sm text-gray-500">
                        契約更新期限が近づいた際に通知を受け取る
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0073aa]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <p className="font-medium text-[#323232]">決済エラー通知</p>
                      <p className="text-sm text-gray-500">
                        口座振替エラーが発生した際に通知を受け取る
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0073aa]"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "payment" && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-[#323232]">決済設定</h2>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-[3px]">
                    <span className="font-medium">口座振替設定:</span>
                    <span>現在、口座振替での決済が有効になっています</span>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      振替日
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]">
                      <option value="5">毎月5日</option>
                      <option value="10">毎月10日</option>
                      <option value="15">毎月15日</option>
                      <option value="25">毎月25日</option>
                      <option value="27">毎月27日</option>
                    </select>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="font-medium text-[#323232] mb-3">
                      オンライン決済（準備中）
                    </h3>
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-medium text-[#323232]">
                          クレジットカード決済
                        </p>
                        <p className="text-sm text-gray-500">
                          Stripe連携で実装予定
                        </p>
                      </div>
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                        準備中
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "email" && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-[#323232]">メール設定</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      送信元メールアドレス
                    </label>
                    <input
                      type="email"
                      defaultValue="noreply@jbrm.jp"
                      className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      送信者名
                    </label>
                    <input
                      type="text"
                      defaultValue="日本美容医療リスクマネジメント協会"
                      className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      メール配信サービス
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]">
                      <option value="hubspot">HubSpot</option>
                      <option value="sendgrid">SendGrid</option>
                      <option value="ses">Amazon SES</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-[#323232]">セキュリティ設定</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <p className="font-medium text-[#323232]">二段階認証</p>
                      <p className="text-sm text-gray-500">
                        管理者ログイン時に二段階認証を要求する
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0073aa]"></div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      セッションタイムアウト
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]">
                      <option value="30">30分</option>
                      <option value="60">1時間</option>
                      <option value="120">2時間</option>
                      <option value="480">8時間</option>
                    </select>
                  </div>

                  <div className="pt-4">
                    <button className="px-4 py-2 border border-gray-300 rounded-[3px] text-sm font-medium text-gray-700 hover:bg-gray-50">
                      APIキーを管理
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "integrations" && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-[#323232]">外部連携設定</h2>

                <div className="divide-y divide-gray-200">
                  <div className="py-4 first:pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#0073aa] rounded-[3px] flex items-center justify-center">
                          <span className="text-white font-bold">H</span>
                        </div>
                        <div>
                          <p className="font-medium text-[#323232]">HubSpot</p>
                          <p className="text-sm text-gray-500">
                            CRM・メルマガ配信連携
                          </p>
                        </div>
                      </div>
                      <span className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded">
                        接続中
                      </span>
                    </div>
                    <div className="mt-4 ml-13 flex gap-2">
                      <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-[3px] hover:bg-gray-50">
                        設定
                      </button>
                      <button className="px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-[3px] hover:bg-gray-50">
                        切断
                      </button>
                    </div>
                  </div>

                  <div className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-[3px] flex items-center justify-center">
                          <span className="text-gray-600 font-bold">L</span>
                        </div>
                        <div>
                          <p className="font-medium text-[#323232]">
                            LINE公式アカウント
                          </p>
                          <p className="text-sm text-gray-500">
                            LINE通知・配信連携
                          </p>
                        </div>
                      </div>
                      <span className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded">
                        未接続
                      </span>
                    </div>
                    <div className="mt-4 ml-13">
                      <button className="px-3 py-1.5 text-sm bg-[#0073aa] text-white rounded-[3px] hover:bg-[#005f8a]">
                        接続する
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Bell, Calendar, CreditCard, FileText, ChevronRight, User } from "lucide-react";

// ダミーデータ
const userData = {
  name: "山田 太郎",
  email: "yamada@example.com",
};

const contractData = {
  plan: "スタンダードプラン",
  status: "契約中",
  renewalDate: "2026年3月15日",
};

const billingData = {
  nextBillingDate: "2026年2月28日",
  nextBillingAmount: "¥12,800",
};

const notifications = [
  {
    id: 1,
    title: "システムメンテナンスのお知らせ",
    date: "2026年2月1日",
    isNew: true,
  },
  {
    id: 2,
    title: "2月度セミナーの参加受付を開始しました",
    date: "2026年1月28日",
    isNew: true,
  },
  {
    id: 3,
    title: "年会費の請求書を発行しました",
    date: "2026年1月15日",
    isNew: false,
  },
  {
    id: 4,
    title: "新機能リリースのご案内",
    date: "2026年1月10日",
    isNew: false,
  },
];

const upcomingSeminars = [
  {
    id: 1,
    title: "美容医療リスクマネジメント基礎講座",
    date: "2026年2月20日",
    time: "14:00〜16:00",
    location: "オンライン",
    status: "参加予定",
  },
  {
    id: 2,
    title: "医療安全対策セミナー",
    date: "2026年3月5日",
    time: "10:00〜12:00",
    location: "東京会場",
    status: "参加予定",
  },
];

export default function MyPageDashboard() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`space-y-8 transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
          {/* ウェルカムメッセージ */}
          <section>
            <h2 className="text-2xl font-semibold text-[#323232] mb-2">
              こんにちは、{userData.name}さん
            </h2>
            <p className="text-gray-600">
              本日もご利用いただきありがとうございます。
            </p>
          </section>

          {/* 契約情報と請求情報 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 契約情報サマリー */}
            <section className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText size={20} className="text-[#0073aa]" />
                <h3 className="text-base font-medium text-gray-600">契約情報</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">現在のプラン</span>
                  <span className="text-sm font-medium text-[#323232]">{contractData.plan}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">契約状態</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    {contractData.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">次回更新日</span>
                  <span className="text-sm text-[#323232]">{contractData.renewalDate}</span>
                </div>
              </div>
              <button className="mt-4 w-full text-sm text-[#0073aa] hover:underline flex items-center justify-center gap-1">
                詳細を見る
                <ChevronRight size={16} />
              </button>
            </section>

            {/* 請求情報サマリー */}
            <section className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard size={20} className="text-[#0073aa]" />
                <h3 className="text-base font-medium text-gray-600">請求情報</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">次回請求日</span>
                  <span className="text-sm text-[#323232]">{billingData.nextBillingDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">次回請求額</span>
                  <span className="text-lg font-semibold text-[#323232]">{billingData.nextBillingAmount}</span>
                </div>
              </div>
              <button className="mt-4 w-full text-sm text-[#0073aa] hover:underline flex items-center justify-center gap-1">
                請求履歴を見る
                <ChevronRight size={16} />
              </button>
            </section>
          </div>

          {/* お知らせ一覧 */}
          <section className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bell size={20} className="text-[#0073aa]" />
                <h3 className="text-base font-medium text-gray-600">お知らせ</h3>
              </div>
              <button className="text-sm text-[#0073aa] hover:underline">
                すべて見る
              </button>
            </div>
            <ul className="divide-y divide-gray-100">
              {notifications.map((notification) => (
                <li key={notification.id} className="py-3 flex items-start gap-3 hover:bg-gray-50 -mx-2 px-2 rounded transition-colors cursor-pointer">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {notification.isNew && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                          NEW
                        </span>
                      )}
                      <p className="text-sm text-[#323232] truncate">{notification.title}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{notification.date}</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-400 flex-shrink-0 mt-1" />
                </li>
              ))}
            </ul>
          </section>

          {/* 今後のセミナー情報 */}
          <section className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar size={20} className="text-[#0073aa]" />
                <h3 className="text-base font-medium text-gray-600">参加予定のセミナー</h3>
              </div>
              <button className="text-sm text-[#0073aa] hover:underline">
                セミナー一覧
              </button>
            </div>
            {upcomingSeminars.length > 0 ? (
              <div className="space-y-4">
                {upcomingSeminars.map((seminar) => (
                  <div
                    key={seminar.id}
                    className="p-4 border border-gray-100 rounded-[3px] hover:border-gray-200 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-[#323232] mb-2">
                          {seminar.title}
                        </h4>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                          <span>{seminar.date}</span>
                          <span>{seminar.time}</span>
                          <span>{seminar.location}</span>
                        </div>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 flex-shrink-0 ml-4">
                        {seminar.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-8">
                参加予定のセミナーはありません
              </p>
            )}
          </section>
        </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";

const notifications = [
  {
    id: 1,
    title: "新規会員登録",
    message: "田中太郎さんが会員登録しました",
    time: "5分前",
    date: "2024-01-15 10:30",
    unread: true,
    category: "member",
  },
  {
    id: 2,
    title: "契約更新",
    message: "3件の契約が更新時期です",
    time: "1時間前",
    date: "2024-01-15 09:30",
    unread: true,
    category: "contract",
  },
  {
    id: 3,
    title: "請求完了",
    message: "1月分の請求処理が完了しました",
    time: "3時間前",
    date: "2024-01-15 07:30",
    unread: false,
    category: "billing",
  },
  {
    id: 4,
    title: "システム通知",
    message: "メンテナンスは正常に完了しました",
    time: "昨日",
    date: "2024-01-14 18:00",
    unread: false,
    category: "system",
  },
  {
    id: 5,
    title: "新規会員登録",
    message: "佐藤花子さんが会員登録しました",
    time: "昨日",
    date: "2024-01-14 15:20",
    unread: false,
    category: "member",
  },
  {
    id: 6,
    title: "契約更新完了",
    message: "山田次郎さんの契約更新が完了しました",
    time: "2日前",
    date: "2024-01-13 14:00",
    unread: false,
    category: "contract",
  },
  {
    id: 7,
    title: "請求エラー",
    message: "2件の請求処理でエラーが発生しました",
    time: "2日前",
    date: "2024-01-13 11:30",
    unread: false,
    category: "billing",
  },
  {
    id: 8,
    title: "セミナー申込",
    message: "新規セミナーに5名が申し込みました",
    time: "3日前",
    date: "2024-01-12 16:45",
    unread: false,
    category: "seminar",
  },
  {
    id: 9,
    title: "システム通知",
    message: "定期バックアップが完了しました",
    time: "3日前",
    date: "2024-01-12 03:00",
    unread: false,
    category: "system",
  },
  {
    id: 10,
    title: "新規クリニック登録",
    message: "新しいクリニックが登録されました",
    time: "4日前",
    date: "2024-01-11 09:15",
    unread: false,
    category: "clinic",
  },
];

const categories = [
  { key: "all", label: "すべて" },
  { key: "member", label: "会員" },
  { key: "contract", label: "契約" },
  { key: "billing", label: "請求" },
  { key: "system", label: "システム" },
];

export default function NotificationsPage() {
  const [filter, setFilter] = useState("all");
  const [notificationList, setNotificationList] = useState(notifications);

  const filteredNotifications =
    filter === "all"
      ? notificationList
      : notificationList.filter((n) => n.category === filter);

  const unreadCount = notificationList.filter((n) => n.unread).length;

  const markAllAsRead = () => {
    setNotificationList((prev) =>
      prev.map((n) => ({ ...n, unread: false }))
    );
  };

  const markAsRead = (id: number) => {
    setNotificationList((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-medium text-gray-600">通知</h1>
          <p className="text-gray-500 mt-1">
            {unreadCount > 0
              ? `${unreadCount}件の未読通知があります`
              : "未読の通知はありません"}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 text-sm text-[#0073aa] border border-[#0073aa] rounded-[3px] hover:bg-[#0073aa]/5"
          >
            すべて既読にする
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-2 border-b border-gray-200">
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => setFilter(category.key)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
              filter === category.key
                ? "border-[#0073aa] text-[#0073aa]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="bg-white rounded-[3px] shadow-sm border border-gray-200">
        {filteredNotifications.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            通知はありません
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
                className={`px-6 py-4 hover:bg-gray-50 cursor-pointer ${
                  notification.unread ? "bg-blue-50/30" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  {notification.unread && (
                    <span className="w-2 h-2 bg-[#0073aa] rounded-full mt-2 flex-shrink-0" />
                  )}
                  <div className={`flex-1 ${notification.unread ? "" : "ml-6"}`}>
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm font-medium text-[#323232]">
                        {notification.title}
                      </p>
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        {notification.date}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {notification.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

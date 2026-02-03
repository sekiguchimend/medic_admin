"use client";

import { useState } from "react";

// ダミーデータ
const seminars = [
  {
    id: 1,
    title: "美容医療リスクマネジメント基礎セミナー",
    date: "2024-02-15",
    time: "14:00-17:00",
    location: "東京会場（オンライン同時配信）",
    capacity: 100,
    registered: 78,
    status: "受付中",
    price: 0,
    type: "会員向け",
  },
  {
    id: 2,
    title: "医療訴訟対策セミナー 〜事例から学ぶ〜",
    date: "2024-03-10",
    time: "13:00-16:00",
    location: "大阪会場",
    capacity: 50,
    registered: 35,
    status: "受付中",
    price: 5000,
    type: "一般向け",
  },
  {
    id: 3,
    title: "2024年度 定期総会",
    date: "2024-04-20",
    time: "10:00-12:00",
    location: "東京会場",
    capacity: 200,
    registered: 145,
    status: "準備中",
    price: 0,
    type: "会員限定",
  },
  {
    id: 4,
    title: "新入会員オリエンテーション",
    date: "2024-01-20",
    time: "15:00-16:30",
    location: "オンライン",
    capacity: 30,
    registered: 30,
    status: "満席",
    price: 0,
    type: "新規会員",
  },
];

export default function SeminarsPage() {
  const [filter, setFilter] = useState("all");

  const filteredSeminars = seminars.filter((seminar) => {
    if (filter === "all") return true;
    return seminar.status === filter;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-medium text-gray-600">セミナー管理</h1>
          <p className="text-gray-500 mt-1">
            セミナーの企画・参加者管理を行います
          </p>
        </div>
        <button className="mt-4 md:mt-0 px-4 py-2 bg-[#0073aa] text-white rounded-[3px] text-sm font-medium hover:bg-[#005f8a]">
          新規セミナー作成
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">開催予定</p>
          <p className="text-2xl font-bold text-[#323232]">
            {seminars.filter((s) => s.status !== "終了").length}件
          </p>
        </div>
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">総参加予定者</p>
          <p className="text-2xl font-bold text-[#0073aa]">
            {seminars.reduce((sum, s) => sum + s.registered, 0)}名
          </p>
        </div>
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">有料セミナー</p>
          <p className="text-2xl font-bold text-[#323232]">
            {seminars.filter((s) => s.price > 0).length}件
          </p>
        </div>
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">満席</p>
          <p className="text-2xl font-bold text-[#323232]">
            {seminars.filter((s) => s.status === "満席").length}件
          </p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {["all", "受付中", "準備中", "満席", "終了"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-[3px] text-sm font-medium transition-colors ${
              filter === status
                ? "bg-[#0073aa] text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {status === "all" ? "すべて" : status}
          </button>
        ))}
      </div>

      {/* Seminar cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSeminars.map((seminar) => (
          <div
            key={seminar.id}
            className="bg-white rounded-[3px] shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 text-xs font-medium rounded bg-gray-100 text-gray-700">
                      {seminar.type}
                    </span>
                    <span className="px-2 py-0.5 text-xs font-medium rounded bg-gray-100 text-gray-700">
                      {seminar.status}
                    </span>
                  </div>
                  <h3 className="font-semibold text-[#323232]">{seminar.title}</h3>
                </div>
                {seminar.price > 0 && (
                  <span className="text-lg font-bold text-[#0073aa]">
                    ¥{seminar.price.toLocaleString()}
                  </span>
                )}
              </div>

              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600">{seminar.date}</p>
                <p className="text-sm text-gray-600">{seminar.time}</p>
                <p className="text-sm text-gray-600">{seminar.location}</p>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-500">参加者</span>
                  <span className="font-medium">
                    {seminar.registered} / {seminar.capacity}名
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-[#0073aa]"
                    style={{
                      width: `${Math.min(
                        (seminar.registered / seminar.capacity) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button className="text-sm text-[#0073aa] hover:underline">
                  詳細
                </button>
                <button className="text-sm text-[#0073aa] hover:underline">
                  編集
                </button>
                <button className="text-sm text-[#0073aa] hover:underline">
                  参加者
                </button>
              </div>
              <button className="text-sm text-gray-500 hover:text-gray-700">
                削除
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

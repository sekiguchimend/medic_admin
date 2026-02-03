"use client";

import { useState } from "react";
import { Calendar, MapPin, Clock, ChevronRight } from "lucide-react";

// ダミーデータ：参加予定のセミナー
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
  {
    id: 3,
    title: "クリニック経営者向け法務セミナー",
    date: "2026年3月15日",
    time: "13:00〜15:00",
    location: "オンライン",
    status: "参加確定",
  },
];

// ダミーデータ：過去に参加したセミナー
const pastSeminars = [
  {
    id: 101,
    title: "2025年度 年次総会",
    date: "2025年12月10日",
    time: "10:00〜12:00",
    location: "東京会場",
    status: "参加済み",
  },
  {
    id: 102,
    title: "医療訴訟対策セミナー 〜事例から学ぶ〜",
    date: "2025年11月20日",
    time: "14:00〜17:00",
    location: "大阪会場",
    status: "参加済み",
  },
  {
    id: 103,
    title: "新入会員オリエンテーション",
    date: "2025年10月15日",
    time: "15:00〜16:30",
    location: "オンライン",
    status: "参加済み",
  },
];

// ダミーデータ：開催予定のセミナー（申し込み可能）
const availableSeminars = [
  {
    id: 201,
    title: "美容医療における患者対応セミナー",
    date: "2026年4月10日",
    time: "14:00〜16:00",
    location: "オンライン",
    status: "申込受付中",
    capacity: 100,
    registered: 45,
  },
  {
    id: 202,
    title: "医療広告ガイドライン解説セミナー",
    date: "2026年4月25日",
    time: "13:00〜15:00",
    location: "東京会場",
    status: "申込受付中",
    capacity: 50,
    registered: 32,
  },
  {
    id: 203,
    title: "クリニックDX推進セミナー",
    date: "2026年5月8日",
    time: "10:00〜12:00",
    location: "オンライン",
    status: "申込受付中",
    capacity: 80,
    registered: 15,
  },
  {
    id: 204,
    title: "美容医療安全管理者講習",
    date: "2026年5月20日",
    time: "09:00〜17:00",
    location: "名古屋会場",
    status: "近日公開",
    capacity: 30,
    registered: 0,
  },
];

type Seminar = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  status: string;
  capacity?: number;
  registered?: number;
};

function SeminarCard({
  seminar,
  showApplyButton = false,
}: {
  seminar: Seminar;
  showApplyButton?: boolean;
}) {
  return (
    <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-[#323232] mb-3">
            {seminar.title}
          </h4>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Calendar size={14} className="text-gray-400 flex-shrink-0" />
              <span>{seminar.date}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock size={14} className="text-gray-400 flex-shrink-0" />
              <span>{seminar.time}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <MapPin size={14} className="text-gray-400 flex-shrink-0" />
              <span>{seminar.location}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            {seminar.status}
          </span>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
        {showApplyButton ? (
          <>
            {seminar.status === "申込受付中" ? (
              <button className="px-4 py-1.5 bg-[#0073aa] text-white text-xs font-medium rounded-[3px] hover:bg-[#005f8a] transition-colors">
                申し込む
              </button>
            ) : (
              <span className="text-xs text-gray-400">準備中</span>
            )}
          </>
        ) : (
          <div />
        )}
        <button className="text-xs text-[#0073aa] hover:underline flex items-center gap-0.5">
          詳細
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

export default function MySeminarsPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "available">(
    "upcoming"
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-medium text-gray-600">セミナー</h1>
        <p className="text-gray-500 mt-1">
          セミナーの参加状況確認・申し込みができます
        </p>
      </div>

      {/* Tab navigation */}
      <div className="flex gap-2 border-b border-gray-200 pb-0">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
            activeTab === "upcoming"
              ? "border-[#0073aa] text-[#0073aa]"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          参加予定 ({upcomingSeminars.length})
        </button>
        <button
          onClick={() => setActiveTab("past")}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
            activeTab === "past"
              ? "border-[#0073aa] text-[#0073aa]"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          参加履歴 ({pastSeminars.length})
        </button>
        <button
          onClick={() => setActiveTab("available")}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
            activeTab === "available"
              ? "border-[#0073aa] text-[#0073aa]"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          開催予定 ({availableSeminars.length})
        </button>
      </div>

      {/* Tab content */}
      {activeTab === "upcoming" && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-medium text-gray-600">
              参加予定のセミナー
            </h2>
          </div>
          {upcomingSeminars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingSeminars.map((seminar) => (
                <SeminarCard key={seminar.id} seminar={seminar} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-8 text-center">
              <p className="text-sm text-gray-500">
                参加予定のセミナーはありません
              </p>
              <button
                onClick={() => setActiveTab("available")}
                className="mt-4 text-sm text-[#0073aa] hover:underline"
              >
                開催予定のセミナーを見る
              </button>
            </div>
          )}
        </section>
      )}

      {activeTab === "past" && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-medium text-gray-600">
              過去に参加したセミナー
            </h2>
          </div>
          {pastSeminars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pastSeminars.map((seminar) => (
                <SeminarCard key={seminar.id} seminar={seminar} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-8 text-center">
              <p className="text-sm text-gray-500">
                参加履歴はありません
              </p>
            </div>
          )}
        </section>
      )}

      {activeTab === "available" && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-medium text-gray-600">
              開催予定のセミナー
            </h2>
          </div>
          {availableSeminars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableSeminars.map((seminar) => (
                <SeminarCard
                  key={seminar.id}
                  seminar={seminar}
                  showApplyButton
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-8 text-center">
              <p className="text-sm text-gray-500">
                現在申し込み可能なセミナーはありません
              </p>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";

// ダミーデータ
const faqItems = [
  {
    id: 1,
    question: "保険の加入条件を教えてください",
    answer:
      "日本美容外科学会、日本形成外科学会、日本皮膚科学会、日本美容皮膚科学会、日本美容医療協会のいずれかに所属する医師が加入条件となります。",
    category: "加入条件",
    views: 245,
    helpful: 89,
    status: "公開中",
  },
  {
    id: 2,
    question: "保険料の支払い方法は何がありますか？",
    answer:
      "現在は口座振替のみとなっております。今後、クレジットカード決済の導入を予定しております。",
    category: "支払い",
    views: 189,
    helpful: 72,
    status: "公開中",
  },
  {
    id: 3,
    question: "契約内容の変更はどうすればいいですか？",
    answer:
      "マイページから変更申請を行うことができます。変更内容によっては、事務局での確認が必要な場合があります。",
    category: "契約変更",
    views: 156,
    helpful: 45,
    status: "公開中",
  },
  {
    id: 4,
    question: "会員証はどこで確認できますか？",
    answer:
      "マイページにログイン後、「会員証」メニューからダウンロードが可能です。",
    category: "会員証",
    views: 134,
    helpful: 67,
    status: "公開中",
  },
];

const unansweredQuestions = [
  {
    id: 1,
    question: "海外での医療行為も補償対象になりますか？",
    askedAt: "2024-01-15 14:30",
    count: 3,
  },
  {
    id: 2,
    question: "美容外科以外の診療科目でも加入できますか？",
    askedAt: "2024-01-14 10:15",
    count: 2,
  },
];

const chatStats = {
  totalQuestions: 1245,
  answeredByAI: 1180,
  escalatedToHuman: 65,
  avgResponseTime: "2.3秒",
  satisfactionRate: 94,
};

export default function ChatbotPage() {
  const [activeTab, setActiveTab] = useState<"faq" | "unanswered" | "stats">(
    "faq"
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaq = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-medium text-gray-600">AIチャットボット管理</h1>
          <p className="text-gray-500 mt-1">
            FAQ管理と回答品質の改善を行います
          </p>
        </div>
        <button className="mt-4 md:mt-0 px-4 py-2 bg-[#0073aa] text-white rounded-[3px] text-sm font-medium hover:bg-[#005f8a]">
          FAQ追加
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500 mb-1">総質問数</p>
          <p className="text-xl font-bold text-[#323232]">
            {chatStats.totalQuestions.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500 mb-1">AI回答</p>
          <p className="text-xl font-bold text-[#0073aa]">
            {chatStats.answeredByAI.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500 mb-1">有人対応</p>
          <p className="text-xl font-bold text-[#323232]">
            {chatStats.escalatedToHuman}
          </p>
        </div>
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500 mb-1">平均応答時間</p>
          <p className="text-xl font-bold text-[#323232]">
            {chatStats.avgResponseTime}
          </p>
        </div>
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500 mb-1">満足度</p>
          <p className="text-xl font-bold text-[#323232]">
            {chatStats.satisfactionRate}%
          </p>
        </div>
      </div>

      {/* Unanswered alert */}
      {unansweredQuestions.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-[3px] p-4">
          <p className="font-medium text-[#323232]">
            回答が必要な質問があります
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {unansweredQuestions.length}件の質問にAIが回答できませんでした。FAQを追加してください。
          </p>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-[3px] shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab("faq")}
              className={`px-6 py-3 text-sm font-medium border-b-2 -mb-px ${
                activeTab === "faq"
                  ? "border-[#0073aa] text-[#0073aa]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              FAQ管理
            </button>
            <button
              onClick={() => setActiveTab("unanswered")}
              className={`px-6 py-3 text-sm font-medium border-b-2 -mb-px flex items-center gap-2 ${
                activeTab === "unanswered"
                  ? "border-[#0073aa] text-[#0073aa]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              未回答の質問
              {unansweredQuestions.length > 0 && (
                <span className="bg-gray-200 text-gray-700 text-xs px-1.5 py-0.5 rounded">
                  {unansweredQuestions.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("stats")}
              className={`px-6 py-3 text-sm font-medium border-b-2 -mb-px ${
                activeTab === "stats"
                  ? "border-[#0073aa] text-[#0073aa]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              統計・分析
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === "faq" && (
            <div className="space-y-4">
              {/* Search */}
              <input
                type="text"
                placeholder="FAQを検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa]"
              />

              {/* FAQ list */}
              <div className="space-y-4">
                {filteredFaq.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-[3px] p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded">
                            {item.category}
                          </span>
                          <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded">
                            {item.status}
                          </span>
                        </div>
                        <p className="font-medium text-[#323232] mb-2">
                          Q: {item.question}
                        </p>
                        <p className="text-sm text-gray-600">A: {item.answer}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button className="text-sm text-[#0073aa] hover:underline">
                          編集
                        </button>
                        <button className="text-sm text-gray-500 hover:text-gray-700">
                          削除
                        </button>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-4 text-xs text-gray-500">
                      <span>閲覧数: {item.views}</span>
                      <span>役に立った: {item.helpful}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "unanswered" && (
            <div className="space-y-4">
              {unansweredQuestions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  未回答の質問はありません
                </div>
              ) : (
                unansweredQuestions.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 bg-gray-50 rounded-[3px] p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-[#323232]">
                          {item.question}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {item.askedAt} に質問 - {item.count}回質問されました
                        </p>
                      </div>
                      <button className="px-3 py-1.5 bg-[#0073aa] text-white text-sm rounded-[3px] hover:bg-[#005f8a]">
                        回答を追加
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "stats" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-[3px] p-4">
                  <h3 className="font-medium text-[#323232] mb-4">
                    カテゴリ別質問数
                  </h3>
                  <div className="space-y-3">
                    {[
                      { category: "加入条件", count: 420 },
                      { category: "支払い", count: 380 },
                      { category: "契約変更", count: 250 },
                      { category: "会員証", count: 195 },
                    ].map((item) => (
                      <div key={item.category}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">{item.category}</span>
                          <span className="font-medium">{item.count}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#0073aa] h-2 rounded-full"
                            style={{ width: `${(item.count / 420) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-gray-200 rounded-[3px] p-4">
                  <h3 className="font-medium text-[#323232] mb-4">
                    回答品質
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">AI回答率</span>
                      <span className="text-2xl font-bold text-[#0073aa]">
                        {Math.round(
                          (chatStats.answeredByAI / chatStats.totalQuestions) *
                            100
                        )}
                        %
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">ユーザー満足度</span>
                      <span className="text-2xl font-bold text-[#323232]">
                        {chatStats.satisfactionRate}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">
                        ハルシネーション報告
                      </span>
                      <span className="text-2xl font-bold text-[#323232]">0件</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

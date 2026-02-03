"use client";

import { useState } from "react";
import {
  CreditCard,
  Calendar,
  Download,
  ChevronRight,
  FileText,
} from "lucide-react";

// ダミーデータ: 次回請求情報
const nextBillingInfo = {
  billingDate: "2026年2月28日",
  amount: "¥12,800",
  paymentMethod: "クレジットカード（VISA **** 1234）",
};

// ダミーデータ: 支払い方法
const paymentMethodInfo = {
  type: "クレジットカード",
  brand: "VISA",
  lastFour: "1234",
  expiryDate: "12/2028",
  holderName: "TARO YAMADA",
};

// ダミーデータ: 請求履歴
const billingHistory = [
  {
    id: 1,
    date: "2026年1月31日",
    description: "月額会費（2026年1月分）",
    amount: "¥12,800",
    status: "支払済",
    invoiceUrl: "#",
  },
  {
    id: 2,
    date: "2025年12月31日",
    description: "月額会費（2025年12月分）",
    amount: "¥12,800",
    status: "支払済",
    invoiceUrl: "#",
  },
  {
    id: 3,
    date: "2025年11月30日",
    description: "月額会費（2025年11月分）",
    amount: "¥12,800",
    status: "支払済",
    invoiceUrl: "#",
  },
  {
    id: 4,
    date: "2025年10月31日",
    description: "月額会費（2025年10月分）",
    amount: "¥12,800",
    status: "支払済",
    invoiceUrl: "#",
  },
  {
    id: 5,
    date: "2025年9月30日",
    description: "月額会費（2025年9月分）",
    amount: "¥12,800",
    status: "支払済",
    invoiceUrl: "#",
  },
  {
    id: 6,
    date: "2025年8月31日",
    description: "月額会費（2025年8月分）+ セミナー参加費",
    amount: "¥17,800",
    status: "支払済",
    invoiceUrl: "#",
  },
];

export default function BillingPage() {
  const [showAllHistory, setShowAllHistory] = useState(false);

  const displayedHistory = showAllHistory
    ? billingHistory
    : billingHistory.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* ページタイトル */}
      <div>
        <h1 className="text-2xl font-semibold text-[#323232]">
          請求・お支払い
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          請求情報とお支払い履歴を確認できます
        </p>
      </div>

      {/* 次回請求情報 */}
      <section className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Calendar size={20} className="text-[#0073aa]" />
          <h2 className="text-base font-medium text-gray-600">次回請求情報</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">請求日</p>
            <p className="text-lg font-medium text-[#323232]">
              {nextBillingInfo.billingDate}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">請求額</p>
            <p className="text-2xl font-semibold text-[#323232]">
              {nextBillingInfo.amount}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">支払い方法</p>
            <p className="text-sm text-[#323232]">
              {nextBillingInfo.paymentMethod}
            </p>
          </div>
        </div>
      </section>

      {/* 支払い方法の設定 */}
      <section className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <CreditCard size={20} className="text-[#0073aa]" />
            <h2 className="text-base font-medium text-gray-600">
              支払い方法の設定
            </h2>
          </div>
          <button className="text-sm text-[#0073aa] hover:underline flex items-center gap-1">
            変更する
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="bg-gray-50 rounded-[3px] p-4 border border-gray-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">VISA</span>
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">カード番号</p>
                  <p className="text-sm text-[#323232]">
                    **** **** **** {paymentMethodInfo.lastFour}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">有効期限</p>
                  <p className="text-sm text-[#323232]">
                    {paymentMethodInfo.expiryDate}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">カード名義</p>
                  <p className="text-sm text-[#323232]">
                    {paymentMethodInfo.holderName}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">カードブランド</p>
                  <p className="text-sm text-[#323232]">
                    {paymentMethodInfo.brand}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 請求履歴一覧 */}
      <section className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FileText size={20} className="text-[#0073aa]" />
            <h2 className="text-base font-medium text-gray-600">請求履歴</h2>
          </div>
          <span className="text-sm text-gray-500">
            全{billingHistory.length}件
          </span>
        </div>

        {/* テーブルヘッダー（デスクトップ） */}
        <div className="hidden md:grid md:grid-cols-12 gap-4 px-4 py-3 bg-gray-50 rounded-[3px] text-xs font-medium text-gray-500 mb-2">
          <div className="col-span-2">日付</div>
          <div className="col-span-5">内容</div>
          <div className="col-span-2 text-right">金額</div>
          <div className="col-span-2 text-center">ステータス</div>
          <div className="col-span-1 text-center">領収書</div>
        </div>

        {/* 請求履歴リスト */}
        <div className="divide-y divide-gray-100">
          {displayedHistory.map((item) => (
            <div
              key={item.id}
              className="py-4 px-4 hover:bg-gray-50 transition-colors rounded-[3px]"
            >
              {/* デスクトップ表示 */}
              <div className="hidden md:grid md:grid-cols-12 gap-4 items-center">
                <div className="col-span-2 text-sm text-[#323232]">
                  {item.date}
                </div>
                <div className="col-span-5 text-sm text-[#323232]">
                  {item.description}
                </div>
                <div className="col-span-2 text-sm font-medium text-[#323232] text-right">
                  {item.amount}
                </div>
                <div className="col-span-2 text-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    {item.status}
                  </span>
                </div>
                <div className="col-span-1 text-center">
                  <a
                    href={item.invoiceUrl}
                    className="inline-flex items-center justify-center w-8 h-8 text-[#0073aa] hover:bg-[#0073aa]/10 rounded-[3px] transition-colors"
                    title="領収書をダウンロード"
                  >
                    <Download size={16} />
                  </a>
                </div>
              </div>

              {/* モバイル表示 */}
              <div className="md:hidden space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#323232]">
                      {item.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    {item.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-[#323232]">
                    {item.amount}
                  </p>
                  <a
                    href={item.invoiceUrl}
                    className="inline-flex items-center gap-1 text-xs text-[#0073aa] hover:underline"
                  >
                    <Download size={14} />
                    領収書
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* もっと見るボタン */}
        {billingHistory.length > 5 && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setShowAllHistory(!showAllHistory)}
              className="text-sm text-[#0073aa] hover:underline"
            >
              {showAllHistory
                ? "閉じる"
                : `すべての履歴を表示（残り${billingHistory.length - 5}件）`}
            </button>
          </div>
        )}
      </section>

      {/* お問い合わせリンク */}
      <div className="text-center text-sm text-gray-500">
        <p>
          請求に関するお問い合わせは
          <a href="#" className="text-[#0073aa] hover:underline mx-1">
            こちら
          </a>
          からお願いいたします。
        </p>
      </div>
    </div>
  );
}

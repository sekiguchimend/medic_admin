"use client";

import { useState } from "react";
import { FileText, Calendar, CreditCard, RefreshCw, X, ChevronRight, Check } from "lucide-react";

// ダミーデータ：現在の契約情報
const currentContract = {
  planName: "スタンダードプラン",
  startDate: "2025年4月1日",
  nextRenewalDate: "2026年3月31日",
  status: "契約中",
  monthlyFee: "¥12,800",
  features: [
    "オンラインセミナー無制限参加",
    "会員限定コンテンツ閲覧",
    "月次レポート配信",
    "メールサポート",
  ],
};

// ダミーデータ：利用可能なプラン
const availablePlans = [
  {
    id: "basic",
    name: "ベーシックプラン",
    monthlyFee: "¥5,800",
    features: [
      "オンラインセミナー月2回まで",
      "会員限定コンテンツ閲覧",
      "メールサポート",
    ],
    recommended: false,
  },
  {
    id: "standard",
    name: "スタンダードプラン",
    monthlyFee: "¥12,800",
    features: [
      "オンラインセミナー無制限参加",
      "会員限定コンテンツ閲覧",
      "月次レポート配信",
      "メールサポート",
    ],
    recommended: true,
    current: true,
  },
  {
    id: "premium",
    name: "プレミアムプラン",
    monthlyFee: "¥24,800",
    features: [
      "オンラインセミナー無制限参加",
      "対面セミナー優先参加",
      "会員限定コンテンツ閲覧",
      "月次レポート配信",
      "電話・メールサポート",
      "個別相談（月1回）",
    ],
    recommended: false,
  },
];

// ダミーデータ：契約履歴
const contractHistory = [
  {
    id: 1,
    date: "2025年4月1日",
    action: "新規契約",
    planName: "スタンダードプラン",
    description: "スタンダードプランでの新規契約を開始しました。",
  },
  {
    id: 2,
    date: "2025年1月15日",
    action: "プラン変更",
    planName: "ベーシックプラン → スタンダードプラン",
    description: "ベーシックプランからスタンダードプランへアップグレードしました。",
  },
  {
    id: 3,
    date: "2024年10月1日",
    action: "新規契約",
    planName: "ベーシックプラン",
    description: "ベーシックプランでの新規契約を開始しました。",
  },
];

export default function ContractsPage() {
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handlePlanSelect = (planId: string) => {
    if (planId !== "standard") {
      setSelectedPlan(planId);
      setShowConfirmModal(true);
    }
  };

  const handleConfirmChange = () => {
    // プラン変更の処理（デモ用）
    setShowConfirmModal(false);
    setShowPlanModal(false);
    setSelectedPlan(null);
    alert("プラン変更のリクエストを受け付けました。");
  };

  const getSelectedPlanInfo = () => {
    return availablePlans.find((p) => p.id === selectedPlan);
  };

  return (
    <div className="space-y-8">
      {/* ページタイトル */}
      <div>
        <h1 className="text-2xl font-semibold text-[#323232]">契約情報</h1>
        <p className="mt-1 text-sm text-gray-500">
          現在のご契約内容と契約履歴をご確認いただけます。
        </p>
      </div>

      {/* 現在の契約情報 */}
      <section className="bg-white rounded-[3px] shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <FileText size={20} className="text-[#0073aa]" />
            <h2 className="text-base font-medium text-gray-600">現在の契約情報</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* プラン名 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#0073aa]/10 rounded-[3px] flex items-center justify-center flex-shrink-0">
                <FileText size={20} className="text-[#0073aa]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">プラン名</p>
                <p className="text-lg font-medium text-[#323232]">{currentContract.planName}</p>
              </div>
            </div>

            {/* 契約状態 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#0073aa]/10 rounded-[3px] flex items-center justify-center flex-shrink-0">
                <RefreshCw size={20} className="text-[#0073aa]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">契約状態</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 mt-1">
                  {currentContract.status}
                </span>
              </div>
            </div>

            {/* 契約開始日 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#0073aa]/10 rounded-[3px] flex items-center justify-center flex-shrink-0">
                <Calendar size={20} className="text-[#0073aa]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">契約開始日</p>
                <p className="text-base text-[#323232]">{currentContract.startDate}</p>
              </div>
            </div>

            {/* 次回更新日 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#0073aa]/10 rounded-[3px] flex items-center justify-center flex-shrink-0">
                <Calendar size={20} className="text-[#0073aa]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">次回更新日</p>
                <p className="text-base text-[#323232]">{currentContract.nextRenewalDate}</p>
              </div>
            </div>

            {/* 月額料金 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#0073aa]/10 rounded-[3px] flex items-center justify-center flex-shrink-0">
                <CreditCard size={20} className="text-[#0073aa]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">月額料金</p>
                <p className="text-xl font-semibold text-[#323232]">{currentContract.monthlyFee}</p>
                <p className="text-xs text-gray-400 mt-0.5">（税込）</p>
              </div>
            </div>
          </div>

          {/* 現在のプランの特典 */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="text-sm font-medium text-gray-600 mb-3">プラン特典</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {currentContract.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-[#323232]">
                  <Check size={16} className="text-[#0073aa] flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* プラン変更ボタン */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={() => setShowPlanModal(true)}
              className="px-6 py-2.5 bg-[#0073aa] text-white rounded-[3px] text-sm font-medium hover:bg-[#005f8a] transition-colors"
            >
              プランを変更する
            </button>
            <p className="mt-2 text-xs text-gray-500">
              プラン変更は次回更新日から適用されます。
            </p>
          </div>
        </div>
      </section>

      {/* 契約履歴 */}
      <section className="bg-white rounded-[3px] shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <RefreshCw size={20} className="text-[#0073aa]" />
            <h2 className="text-base font-medium text-gray-600">契約履歴</h2>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {contractHistory.map((history) => (
            <div key={history.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      {history.action}
                    </span>
                    <span className="text-sm font-medium text-[#323232]">{history.planName}</span>
                  </div>
                  <p className="text-sm text-gray-500">{history.description}</p>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <p className="text-sm text-gray-400">{history.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {contractHistory.length === 0 && (
          <div className="px-6 py-8 text-center">
            <p className="text-sm text-gray-500">契約履歴はありません。</p>
          </div>
        )}
      </section>

      {/* プラン変更モーダル */}
      {showPlanModal && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowPlanModal(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-[3px] shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              {/* モーダルヘッダー */}
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
                <h2 className="text-lg font-medium text-[#323232]">プラン変更</h2>
                <button
                  onClick={() => setShowPlanModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* プラン一覧 */}
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-6">
                  ご希望のプランをお選びください。プラン変更は次回更新日から適用されます。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {availablePlans.map((plan) => (
                    <div
                      key={plan.id}
                      className={`relative rounded-[3px] border p-6 ${
                        plan.current
                          ? "border-[#0073aa] bg-[#0073aa]/5"
                          : "border-gray-200 hover:border-gray-300"
                      } transition-colors`}
                    >
                      {plan.recommended && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-[#0073aa] text-white">
                          おすすめ
                        </span>
                      )}
                      {plan.current && (
                        <span className="absolute -top-3 right-4 inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                          現在のプラン
                        </span>
                      )}
                      <h3 className="text-lg font-medium text-[#323232] mb-2">{plan.name}</h3>
                      <p className="text-2xl font-bold text-[#323232] mb-4">
                        {plan.monthlyFee}
                        <span className="text-sm font-normal text-gray-500">/月</span>
                      </p>
                      <ul className="space-y-2 mb-6">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-[#323232]">
                            <Check size={16} className="text-[#0073aa] flex-shrink-0 mt-0.5" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => handlePlanSelect(plan.id)}
                        disabled={plan.current}
                        className={`w-full py-2.5 rounded-[3px] text-sm font-medium transition-colors ${
                          plan.current
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-[#0073aa] text-white hover:bg-[#005f8a]"
                        }`}
                      >
                        {plan.current ? "現在のプラン" : "このプランに変更"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* 確認モーダル */}
      {showConfirmModal && selectedPlan && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setShowConfirmModal(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-[3px] shadow-xl w-full max-w-md">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-medium text-[#323232]">プラン変更の確認</h2>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-4">
                  以下のプランに変更してもよろしいですか？
                </p>
                <div className="bg-gray-50 rounded-[3px] p-4 mb-6">
                  <p className="text-sm text-gray-500 mb-1">変更後のプラン</p>
                  <p className="text-lg font-medium text-[#323232]">
                    {getSelectedPlanInfo()?.name}
                  </p>
                  <p className="text-lg font-bold text-[#323232]">
                    {getSelectedPlanInfo()?.monthlyFee}
                    <span className="text-sm font-normal text-gray-500">/月</span>
                  </p>
                </div>
                <p className="text-xs text-gray-500 mb-6">
                  ※ プラン変更は次回更新日（{currentContract.nextRenewalDate}）から適用されます。
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-[3px] text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    キャンセル
                  </button>
                  <button
                    onClick={handleConfirmChange}
                    className="flex-1 py-2.5 bg-[#0073aa] text-white rounded-[3px] text-sm font-medium hover:bg-[#005f8a] transition-colors"
                  >
                    変更する
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

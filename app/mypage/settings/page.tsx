"use client";

import { useState } from "react";
import { Bell, Globe, UserX, ChevronRight } from "lucide-react";
import Link from "next/link";

// トグルスイッチコンポーネント
function ToggleSwitch({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? "bg-[#0073aa]" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

export default function SettingsPage() {
  // 通知設定の状態
  const [emailNotification, setEmailNotification] = useState(true);
  const [newsNotification, setNewsNotification] = useState(true);
  const [billingNotification, setBillingNotification] = useState(true);
  const [seminarNotification, setSeminarNotification] = useState(false);

  // 言語設定
  const [language] = useState("ja");

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-[#323232] mb-8">設定</h1>

      <div className="space-y-8">
        {/* 通知設定 */}
        <section className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Bell size={20} className="text-[#0073aa]" />
            <h2 className="text-base font-medium text-gray-600">通知設定</h2>
          </div>

          <div className="space-y-6">
            {/* メール通知 */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#323232]">
                  メール通知
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  重要なお知らせをメールで受け取る
                </p>
              </div>
              <ToggleSwitch
                enabled={emailNotification}
                onChange={setEmailNotification}
              />
            </div>

            {/* お知らせ通知 */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#323232]">
                  お知らせ通知
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  システムからのお知らせを受け取る
                </p>
              </div>
              <ToggleSwitch
                enabled={newsNotification}
                onChange={setNewsNotification}
              />
            </div>

            {/* 請求通知 */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#323232]">
                  請求通知
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  請求書発行や支払い期限のお知らせを受け取る
                </p>
              </div>
              <ToggleSwitch
                enabled={billingNotification}
                onChange={setBillingNotification}
              />
            </div>

            {/* セミナー通知 */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#323232]">
                  セミナー通知
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  セミナー開催や申込締切のお知らせを受け取る
                </p>
              </div>
              <ToggleSwitch
                enabled={seminarNotification}
                onChange={setSeminarNotification}
              />
            </div>
          </div>
        </section>

        {/* 表示設定 */}
        <section className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Globe size={20} className="text-[#0073aa]" />
            <h2 className="text-base font-medium text-gray-600">表示設定</h2>
          </div>

          <div className="space-y-6">
            {/* 言語設定 */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#323232]">
                  言語設定
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  表示言語を選択
                </p>
              </div>
              <select
                value={language}
                disabled
                className="text-sm border border-gray-200 rounded-[3px] px-3 py-2 bg-gray-50 text-[#323232] cursor-not-allowed"
              >
                <option value="ja">日本語</option>
              </select>
            </div>
          </div>
        </section>

        {/* アカウント設定 */}
        <section className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <UserX size={20} className="text-[#0073aa]" />
            <h2 className="text-base font-medium text-gray-600">アカウント設定</h2>
          </div>

          <div className="space-y-6">
            {/* 退会申請 */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#323232]">
                  退会申請
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  会員の退会手続きを行う
                </p>
              </div>
              <Link
                href="/mypage/settings/withdrawal"
                className="flex items-center gap-1 text-sm text-[#0073aa] hover:underline"
              >
                申請する
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

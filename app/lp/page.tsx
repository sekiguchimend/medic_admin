"use client";

import Link from "next/link";
import { useState } from "react";

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white text-[#323232]">
      {/* ヒーローセクション */}
      <section className="bg-gradient-to-b from-[#0073aa]/5 to-white">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-32">
          <div className="text-center">
            <p className="text-[#0073aa] font-medium mb-4">
              一般社団法人 日本美容医療リスクマネジメント協会
            </p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
              美容医療の安全と信頼を
              <br />
              共に築く
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              医療事故の予防から患者対応まで、
              <br className="hidden md:block" />
              美容医療に特化したリスクマネジメントをサポートします。
            </p>
            <Link
              href="/register"
              className="inline-block bg-[#0073aa] text-white font-semibold px-10 py-4 rounded-lg hover:bg-[#005f8a] transition-colors"
            >
              会員登録する
            </Link>
          </div>
        </div>
      </section>

      {/* サービスの特徴 */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-16">
            サービスの特徴
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-4 text-[#0073aa]">
                専門家による相談対応
              </h3>
              <p className="text-gray-600 leading-relaxed">
                美容医療に精通した弁護士・医師が、トラブル発生時の対応から予防策まで、専門的な観点からアドバイスいたします。
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-4 text-[#0073aa]">
                リスクマネジメント研修
              </h3>
              <p className="text-gray-600 leading-relaxed">
                定期的なオンラインセミナーや勉強会を通じて、最新の法規制や判例、リスク対策のノウハウを学べます。
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-4 text-[#0073aa]">
                同意書・説明文書のテンプレート
              </h3>
              <p className="text-gray-600 leading-relaxed">
                法的に有効な同意書や説明文書のテンプレートを提供。施術ごとにカスタマイズ可能で、トラブル予防に役立ちます。
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-4 text-[#0073aa]">
                会員限定の情報共有
              </h3>
              <p className="text-gray-600 leading-relaxed">
                業界の最新動向やトラブル事例の共有など、会員限定のニュースレターやコミュニティで有益な情報を得られます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 料金プラン */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
            料金プラン
          </h2>
          <p className="text-center text-gray-600 mb-16">
            クリニックの規模やニーズに合わせて最適なプランをお選びください
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Aプラン */}
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold mb-2">Aプラン</h3>
              <p className="text-gray-500 text-sm mb-6">個人クリニック向け</p>
              <p className="mb-6">
                <span className="text-4xl font-bold">¥30,000</span>
                <span className="text-gray-500">/月</span>
              </p>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#0073aa] mr-2">-</span>
                  メール相談（月3回まで）
                </li>
                <li className="flex items-start">
                  <span className="text-[#0073aa] mr-2">-</span>
                  オンラインセミナー参加
                </li>
                <li className="flex items-start">
                  <span className="text-[#0073aa] mr-2">-</span>
                  テンプレート利用（基本セット）
                </li>
                <li className="flex items-start">
                  <span className="text-[#0073aa] mr-2">-</span>
                  会員限定ニュースレター
                </li>
              </ul>
              <Link
                href="/register"
                className="block text-center border-2 border-[#0073aa] text-[#0073aa] font-semibold px-6 py-3 rounded-lg hover:bg-[#0073aa] hover:text-white transition-colors"
              >
                このプランで登録
              </Link>
            </div>

            {/* Bプラン */}
            <div className="bg-white rounded-xl p-8 border-2 border-[#0073aa] relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#0073aa] text-white text-sm px-4 py-1 rounded-full">
                おすすめ
              </div>
              <h3 className="text-xl font-bold mb-2">Bプラン</h3>
              <p className="text-gray-500 text-sm mb-6">中規模クリニック向け</p>
              <p className="mb-6">
                <span className="text-4xl font-bold">¥80,000</span>
                <span className="text-gray-500">/月</span>
              </p>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#0073aa] mr-2">-</span>
                  電話・メール相談（無制限）
                </li>
                <li className="flex items-start">
                  <span className="text-[#0073aa] mr-2">-</span>
                  オンラインセミナー参加
                </li>
                <li className="flex items-start">
                  <span className="text-[#0073aa] mr-2">-</span>
                  テンプレート利用（全セット）
                </li>
                <li className="flex items-start">
                  <span className="text-[#0073aa] mr-2">-</span>
                  月1回の定期ミーティング
                </li>
                <li className="flex items-start">
                  <span className="text-[#0073aa] mr-2">-</span>
                  緊急時の優先対応
                </li>
              </ul>
              <Link
                href="/register"
                className="block text-center bg-[#0073aa] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#005f8a] transition-colors"
              >
                このプランで登録
              </Link>
            </div>

            {/* Cプラン */}
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold mb-2">Cプラン</h3>
              <p className="text-gray-500 text-sm mb-6">大規模・チェーン向け</p>
              <p className="mb-6">
                <span className="text-4xl font-bold">¥200,000</span>
                <span className="text-gray-500">/月</span>
              </p>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#0073aa] mr-2">-</span>
                  Bプランの全機能
                </li>
                <li className="flex items-start">
                  <span className="text-[#0073aa] mr-2">-</span>
                  専任担当者によるサポート
                </li>
                <li className="flex items-start">
                  <span className="text-[#0073aa] mr-2">-</span>
                  院内研修の実施（年4回）
                </li>
                <li className="flex items-start">
                  <span className="text-[#0073aa] mr-2">-</span>
                  リスク監査レポート（年2回）
                </li>
                <li className="flex items-start">
                  <span className="text-[#0073aa] mr-2">-</span>
                  複数拠点対応
                </li>
              </ul>
              <Link
                href="/register"
                className="block text-center border-2 border-[#0073aa] text-[#0073aa] font-semibold px-6 py-3 rounded-lg hover:bg-[#0073aa] hover:text-white transition-colors"
              >
                このプランで登録
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* よくある質問 */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-16">
            よくある質問
          </h2>
          <div className="space-y-4">
            {[
              {
                question: "入会に必要な資格や条件はありますか？",
                answer:
                  "美容医療に従事する医師、看護師、クリニック経営者の方が対象となります。医療機関単位でのご入会も、個人でのご入会も可能です。入会審査がございますので、まずはお問い合わせください。",
              },
              {
                question: "相談内容の秘密は守られますか？",
                answer:
                  "はい、すべての相談内容は厳重に管理され、第三者に開示されることはありません。また、相談対応にあたる専門家は守秘義務を負っています。",
              },
              {
                question: "プランの変更は可能ですか？",
                answer:
                  "可能です。月単位でのプラン変更を承っております。クリニックの規模拡大やニーズの変化に合わせて、最適なプランをお選びいただけます。",
              },
              {
                question: "解約する場合の手続きを教えてください",
                answer:
                  "解約をご希望の場合は、解約希望月の前月15日までにマイページまたは事務局へご連絡ください。違約金等は発生いたしません。",
              },
              {
                question: "緊急時の相談は可能ですか？",
                answer:
                  "Bプラン以上の会員様には、緊急時の優先対応サービスをご提供しております。重大なトラブル発生時には、専門家が迅速に対応いたします。",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium pr-4">{faq.question}</span>
                  <span className="text-[#0073aa] text-2xl flex-shrink-0">
                    {openFaq === index ? "−" : "+"}
                  </span>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="py-20 md:py-28 bg-[#0073aa]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            美容医療の安全な未来を
            <br className="md:hidden" />
            一緒に作りましょう
          </h2>
          <p className="text-white/90 mb-10 leading-relaxed">
            リスクマネジメントは、患者様との信頼関係を築く第一歩です。
            <br className="hidden md:block" />
            まずは会員登録から始めてみませんか。
          </p>
          <Link
            href="/register"
            className="inline-block bg-white text-[#0073aa] font-semibold px-10 py-4 rounded-lg hover:bg-gray-100 transition-colors"
          >
            無料で会員登録する
          </Link>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-[#323232] text-white py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="md:flex md:justify-between md:items-start">
            <div className="mb-8 md:mb-0">
              <p className="font-bold text-lg mb-2">
                一般社団法人
                <br />
                日本美容医療リスクマネジメント協会
              </p>
              <p className="text-gray-400 text-sm">
                Japan Aesthetic Medicine Risk Management Association
              </p>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-gray-300">
              <Link href="/register" className="hover:text-white transition-colors">
                会員登録
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                プライバシーポリシー
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                利用規約
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                お問い合わせ
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-400 text-sm">
            &copy; 2024 Japan Aesthetic Medicine Risk Management Association. All
            rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

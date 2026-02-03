"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, ArrowLeft, CheckCircle } from "lucide-react";

type FormData = {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  clinicName: string;
  plan: string;
  agreeTerms: boolean;
};

type FormErrors = {
  [key in keyof FormData]?: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>({
    lastName: "",
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    clinicName: "",
    plan: "",
    agreeTerms: false,
  });

  const plans = [
    { value: "A", label: "Aプラン - ベーシック", description: "基本的なサポート" },
    { value: "B", label: "Bプラン - スタンダード", description: "充実したサポート" },
    { value: "C", label: "Cプラン - プレミアム", description: "フルサポート" },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // 氏名のバリデーション
    if (!formData.lastName.trim()) {
      newErrors.lastName = "姓を入力してください";
    }
    if (!formData.firstName.trim()) {
      newErrors.firstName = "名を入力してください";
    }

    // メールアドレスのバリデーション
    if (!formData.email.trim()) {
      newErrors.email = "メールアドレスを入力してください";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "有効なメールアドレスを入力してください";
    }

    // パスワードのバリデーション
    if (!formData.password) {
      newErrors.password = "パスワードを入力してください";
    } else if (formData.password.length < 8) {
      newErrors.password = "パスワードは8文字以上で入力してください";
    }

    // パスワード確認のバリデーション
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "パスワード確認を入力してください";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "パスワードが一致しません";
    }

    // 電話番号のバリデーション
    if (!formData.phone.trim()) {
      newErrors.phone = "電話番号を入力してください";
    } else if (!/^[0-9-]+$/.test(formData.phone)) {
      newErrors.phone = "有効な電話番号を入力してください";
    }

    // クリニック名のバリデーション
    if (!formData.clinicName.trim()) {
      newErrors.clinicName = "クリニック名を入力してください";
    }

    // プラン選択のバリデーション
    if (!formData.plan) {
      newErrors.plan = "プランを選択してください";
    }

    // 利用規約同意のバリデーション
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "利用規約に同意してください";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // デモ用：簡易的な登録処理
    setTimeout(() => {
      router.push("/mypage");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1d2327] to-[#0073aa] flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-lg">
        {/* Back to LP link */}
        <Link
          href="/"
          className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" />
          トップページへ戻る
        </Link>

        {/* Registration form */}
        <div className="bg-white rounded-[3px] shadow-xl p-8">
          <h2 className="text-xl font-semibold text-[#323232] mb-2 text-center">
            会員登録
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            日本美容医療リスクマネジメント協会への会員登録
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 氏名 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  姓 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="山田"
                  className={`w-full px-4 py-2.5 border rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa] focus:border-transparent ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="太郎"
                  className={`w-full px-4 py-2.5 border rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa] focus:border-transparent ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                )}
              </div>
            </div>

            {/* メールアドレス */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                メールアドレス <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@clinic.jp"
                className={`w-full px-4 py-2.5 border rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa] focus:border-transparent ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* パスワード */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                パスワード <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="8文字以上"
                  className={`w-full px-4 pr-10 py-2.5 border rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa] focus:border-transparent ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* パスワード確認 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                パスワード確認 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="パスワードを再入力"
                  className={`w-full px-4 pr-10 py-2.5 border rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa] focus:border-transparent ${
                    errors.confirmPassword ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>

            {/* 電話番号 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                電話番号 <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="03-1234-5678"
                className={`w-full px-4 py-2.5 border rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa] focus:border-transparent ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
              )}
            </div>

            {/* クリニック名 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                クリニック名 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="clinicName"
                value={formData.clinicName}
                onChange={handleChange}
                placeholder="○○クリニック"
                className={`w-full px-4 py-2.5 border rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa] focus:border-transparent ${
                  errors.clinicName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.clinicName && (
                <p className="mt-1 text-sm text-red-500">{errors.clinicName}</p>
              )}
            </div>

            {/* プラン選択 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                希望プラン <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                {plans.map((plan) => (
                  <label
                    key={plan.value}
                    className={`flex items-center p-3 border rounded-[3px] cursor-pointer transition-colors ${
                      formData.plan === plan.value
                        ? "border-[#0073aa] bg-[#0073aa]/5"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="plan"
                      value={plan.value}
                      checked={formData.plan === plan.value}
                      onChange={handleChange}
                      className="w-4 h-4 text-[#0073aa] border-gray-300 focus:ring-[#0073aa]"
                    />
                    <div className="ml-3">
                      <span className="text-sm font-medium text-[#323232]">
                        {plan.label}
                      </span>
                      <span className="ml-2 text-xs text-gray-500">
                        {plan.description}
                      </span>
                    </div>
                    {formData.plan === plan.value && (
                      <CheckCircle
                        size={18}
                        className="ml-auto text-[#0073aa]"
                      />
                    )}
                  </label>
                ))}
              </div>
              {errors.plan && (
                <p className="mt-1 text-sm text-red-500">{errors.plan}</p>
              )}
            </div>

            {/* 利用規約同意 */}
            <div>
              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="w-4 h-4 mt-0.5 text-[#0073aa] border-gray-300 rounded focus:ring-[#0073aa]"
                />
                <span className="ml-2 text-sm text-gray-600">
                  <a
                    href="/terms"
                    target="_blank"
                    className="text-[#0073aa] hover:underline"
                  >
                    利用規約
                  </a>
                  および
                  <a
                    href="/privacy"
                    target="_blank"
                    className="text-[#0073aa] hover:underline"
                  >
                    プライバシーポリシー
                  </a>
                  に同意する <span className="text-red-500">*</span>
                </span>
              </label>
              {errors.agreeTerms && (
                <p className="mt-1 text-sm text-red-500">{errors.agreeTerms}</p>
              )}
            </div>

            {/* 登録ボタン */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#0073aa] text-white rounded-[3px] font-medium hover:bg-[#005f8a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "登録中..." : "会員登録する"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-500">
              既に会員の方は
              <Link href="/" className="text-[#0073aa] hover:underline ml-1">
                ログイン
              </Link>
              してください
            </p>
          </div>
        </div>

        {/* Demo hint */}
        <div className="mt-6 p-4 bg-white/10 rounded-[3px]">
          <p className="text-white/80 text-sm text-center">
            デモ環境：フォームを入力して登録ボタンを押すとマイページに遷移します
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-8">
          &copy; 2026 一般社団法人日本美容医療リスクマネジメント協会
        </p>
      </div>
    </div>
  );
}

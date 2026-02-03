"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // デモ用：簡易的なログイン処理
    setTimeout(() => {
      if (email && password) {
        router.push("/admin");
      } else {
        setError("メールアドレスとパスワードを入力してください");
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1d2327] to-[#0073aa] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <p className="text-gray-300">会員管理システム</p>
        </div>

        {/* Login form */}
        <div className="bg-white rounded-[3px] shadow-xl p-8">
          <h2 className="text-xl font-semibold text-[#323232] mb-6 text-center">
            ログイン
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-[3px] text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                メールアドレス
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@jbrm.jp"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                パスワード
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 pr-10 py-2.5 border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa] focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-[#0073aa] border-gray-300 rounded focus:ring-[#0073aa]"
                />
                <span className="ml-2 text-sm text-gray-600">
                  ログイン状態を保持
                </span>
              </label>
              <a href="#" className="text-sm text-[#0073aa] hover:underline">
                パスワードを忘れた方
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-[#0073aa] text-white rounded-[3px] font-medium hover:bg-[#005f8a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "ログイン中..." : "ログイン"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-500">
              会員の方は
              <a href="/mypage" className="text-[#0073aa] hover:underline ml-1">
                マイページ
              </a>
              からログインしてください
            </p>
          </div>
        </div>

        {/* Demo hint */}
        <div className="mt-6 p-4 bg-white/10 rounded-[3px]">
          <p className="text-white/80 text-sm text-center">
            デモ環境：任意のメールアドレスとパスワードでログインできます
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-8">
          © 2026 一般社団法人日本美容医療リスクマネジメント協会
        </p>
      </div>
    </div>
  );
}

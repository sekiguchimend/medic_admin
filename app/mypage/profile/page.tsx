"use client";

import { useState } from "react";
import { Eye, EyeOff, Save, CheckCircle } from "lucide-react";

type ProfileFormData = {
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  clinicName: string;
  address: string;
};

type PasswordFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type ProfileFormErrors = {
  [key in keyof ProfileFormData]?: string;
};

type PasswordFormErrors = {
  [key in keyof PasswordFormData]?: string;
};

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileErrors, setProfileErrors] = useState<ProfileFormErrors>({});
  const [passwordErrors, setPasswordErrors] = useState<PasswordFormErrors>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // プロフィールフォームデータ（デモ用初期値）
  const [profileData, setProfileData] = useState<ProfileFormData>({
    lastName: "山田",
    firstName: "太郎",
    email: "yamada@example.com",
    phone: "03-1234-5678",
    clinicName: "山田美容クリニック",
    address: "東京都港区赤坂1-2-3 赤坂ビル5F",
  });

  // パスワードフォームデータ
  const [passwordData, setPasswordData] = useState<PasswordFormData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (profileErrors[name as keyof ProfileFormData]) {
      setProfileErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (passwordErrors[name as keyof PasswordFormData]) {
      setPasswordErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateProfileForm = (): boolean => {
    const newErrors: ProfileFormErrors = {};

    if (!profileData.lastName.trim()) {
      newErrors.lastName = "姓を入力してください";
    }
    if (!profileData.firstName.trim()) {
      newErrors.firstName = "名を入力してください";
    }
    if (!profileData.email.trim()) {
      newErrors.email = "メールアドレスを入力してください";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.email)) {
      newErrors.email = "有効なメールアドレスを入力してください";
    }
    if (!profileData.phone.trim()) {
      newErrors.phone = "電話番号を入力してください";
    } else if (!/^[0-9-]+$/.test(profileData.phone)) {
      newErrors.phone = "有効な電話番号を入力してください";
    }
    if (!profileData.clinicName.trim()) {
      newErrors.clinicName = "クリニック名を入力してください";
    }
    if (!profileData.address.trim()) {
      newErrors.address = "住所を入力してください";
    }

    setProfileErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = (): boolean => {
    const newErrors: PasswordFormErrors = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = "現在のパスワードを入力してください";
    }
    if (!passwordData.newPassword) {
      newErrors.newPassword = "新しいパスワードを入力してください";
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = "パスワードは8文字以上で入力してください";
    }
    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = "パスワード確認を入力してください";
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "パスワードが一致しません";
    }

    setPasswordErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateProfileForm()) {
      return;
    }

    setIsLoading(true);
    setSuccessMessage(null);

    // デモ用：簡易的な保存処理
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage("プロフィールを保存しました");
      setTimeout(() => setSuccessMessage(null), 3000);
    }, 1000);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePasswordForm()) {
      return;
    }

    setIsLoading(true);
    setSuccessMessage(null);

    // デモ用：簡易的な保存処理
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage("パスワードを変更しました");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setTimeout(() => setSuccessMessage(null), 3000);
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-medium text-gray-600">プロフィール設定</h1>
        <p className="text-gray-500 mt-1">アカウント情報を管理できます</p>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-[3px] p-4 flex items-center gap-3">
          <CheckCircle className="text-green-500" size={20} />
          <span className="text-green-700">{successMessage}</span>
        </div>
      )}

      {/* Basic Information Form */}
      <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-medium text-gray-600 mb-6">基本情報</h2>

        <form onSubmit={handleProfileSubmit} className="space-y-5">
          {/* 氏名 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                姓 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={profileData.lastName}
                onChange={handleProfileChange}
                placeholder="山田"
                className={`w-full px-4 py-2.5 border rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa] focus:border-transparent ${
                  profileErrors.lastName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {profileErrors.lastName && (
                <p className="mt-1 text-sm text-red-500">{profileErrors.lastName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                名 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={profileData.firstName}
                onChange={handleProfileChange}
                placeholder="太郎"
                className={`w-full px-4 py-2.5 border rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa] focus:border-transparent ${
                  profileErrors.firstName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {profileErrors.firstName && (
                <p className="mt-1 text-sm text-red-500">{profileErrors.firstName}</p>
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
              value={profileData.email}
              onChange={handleProfileChange}
              placeholder="example@clinic.jp"
              className={`w-full px-4 py-2.5 border rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa] focus:border-transparent ${
                profileErrors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {profileErrors.email && (
              <p className="mt-1 text-sm text-red-500">{profileErrors.email}</p>
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
              value={profileData.phone}
              onChange={handleProfileChange}
              placeholder="03-1234-5678"
              className={`w-full px-4 py-2.5 border rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa] focus:border-transparent ${
                profileErrors.phone ? "border-red-500" : "border-gray-300"
              }`}
            />
            {profileErrors.phone && (
              <p className="mt-1 text-sm text-red-500">{profileErrors.phone}</p>
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
              value={profileData.clinicName}
              onChange={handleProfileChange}
              placeholder="○○クリニック"
              className={`w-full px-4 py-2.5 border rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa] focus:border-transparent ${
                profileErrors.clinicName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {profileErrors.clinicName && (
              <p className="mt-1 text-sm text-red-500">{profileErrors.clinicName}</p>
            )}
          </div>

          {/* 住所 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              住所 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={profileData.address}
              onChange={handleProfileChange}
              placeholder="東京都港区赤坂1-2-3"
              className={`w-full px-4 py-2.5 border rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa] focus:border-transparent ${
                profileErrors.address ? "border-red-500" : "border-gray-300"
              }`}
            />
            {profileErrors.address && (
              <p className="mt-1 text-sm text-red-500">{profileErrors.address}</p>
            )}
          </div>

          {/* 保存ボタン */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0073aa] text-white rounded-[3px] font-medium hover:bg-[#005f8a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={18} />
              {isLoading ? "保存中..." : "プロフィールを保存"}
            </button>
          </div>
        </form>
      </div>

      {/* Password Change Form */}
      <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-medium text-gray-600 mb-6">パスワード変更</h2>

        <form onSubmit={handlePasswordSubmit} className="space-y-5">
          {/* 現在のパスワード */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              現在のパスワード <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                placeholder="現在のパスワードを入力"
                className={`w-full px-4 pr-10 py-2.5 border rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa] focus:border-transparent ${
                  passwordErrors.currentPassword ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {passwordErrors.currentPassword && (
              <p className="mt-1 text-sm text-red-500">{passwordErrors.currentPassword}</p>
            )}
          </div>

          {/* 新しいパスワード */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              新しいパスワード <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder="8文字以上"
                className={`w-full px-4 pr-10 py-2.5 border rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa] focus:border-transparent ${
                  passwordErrors.newPassword ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {passwordErrors.newPassword && (
              <p className="mt-1 text-sm text-red-500">{passwordErrors.newPassword}</p>
            )}
          </div>

          {/* 新しいパスワード（確認） */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              新しいパスワード（確認） <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="パスワードを再入力"
                className={`w-full px-4 pr-10 py-2.5 border rounded-[3px] focus:outline-none focus:ring-2 focus:ring-[#0073aa] focus:border-transparent ${
                  passwordErrors.confirmPassword ? "border-red-500" : "border-gray-300"
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
            {passwordErrors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">{passwordErrors.confirmPassword}</p>
            )}
          </div>

          {/* 保存ボタン */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0073aa] text-white rounded-[3px] font-medium hover:bg-[#005f8a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={18} />
              {isLoading ? "変更中..." : "パスワードを変更"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

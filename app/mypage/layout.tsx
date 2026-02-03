"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  CreditCard,
  Calendar,
  User,
  Settings,
  Bell,
  Menu,
  X,
  ChevronDown,
  LogOut,
  UserCircle,
} from "lucide-react";
import { useState } from "react";

const menuItems = [
  {
    title: "ダッシュボード",
    href: "/mypage",
    icon: LayoutDashboard,
  },
  {
    title: "契約情報",
    href: "/mypage/contracts",
    icon: FileText,
  },
  {
    title: "請求・お支払い",
    href: "/mypage/billing",
    icon: CreditCard,
  },
  {
    title: "セミナー",
    href: "/mypage/seminars",
    icon: Calendar,
  },
  {
    title: "プロフィール設定",
    href: "/mypage/profile",
    icon: User,
  },
  {
    title: "設定",
    href: "/mypage/settings",
    icon: Settings,
  },
];

export default function MypageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "契約更新のお知らせ",
      message: "ご契約の更新時期が近づいています",
      time: "1時間前",
      unread: true,
    },
    {
      id: 2,
      title: "セミナー開催のお知らせ",
      message: "2月のオンラインセミナーの申込受付を開始しました",
      time: "3時間前",
      unread: true,
    },
    {
      id: 3,
      title: "請求書発行",
      message: "1月分の請求書が発行されました",
      time: "昨日",
      unread: false,
    },
    {
      id: 4,
      title: "お知らせ",
      message: "利用規約が更新されました",
      time: "3日前",
      unread: false,
    },
  ];

  const isActive = (href: string) => {
    if (href === "/mypage") {
      return pathname === "/mypage";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full bg-[#1d2327] text-gray-300 transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        } ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/20">
          <Link href="/mypage" className="flex items-center gap-2">
            {sidebarOpen ? (
              <span className="text-white font-semibold text-sm">
                美容医療リスク管理協会
              </span>
            ) : (
              <span className="text-white font-bold text-sm mx-auto">JB</span>
            )}
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-4 px-2 overflow-y-auto h-[calc(100vh-4rem)]">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                isActive(item.href)
                  ? "bg-[#0073aa] text-white"
                  : "hover:bg-white/10 hover:text-white"
              }`}
            >
              <item.icon size={20} />
              {sidebarOpen && <span>{item.title}</span>}
            </Link>
          ))}

          {/* Logout */}
          <div className="mt-8 pt-4 border-t border-white/20">
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors hover:bg-white/10 hover:text-white"
            >
              <LogOut size={20} />
              {sidebarOpen && <span>ログアウト</span>}
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "lg:ml-64" : "lg:ml-20"
        }`}
      >
        {/* Top bar */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden text-gray-600 hover:text-[#323232]"
            >
              <Menu size={24} />
            </button>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:block text-gray-600 hover:text-[#323232]"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-lg font-medium text-[#323232] hidden md:block">
              マイページ
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotificationOpen(!notificationOpen);
                  setProfileOpen(false);
                }}
                className="relative text-gray-600 hover:text-[#323232]"
              >
                <Bell size={24} />
                {notifications.filter((n) => n.unread).length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#0073aa] text-white text-xs rounded-full flex items-center justify-center">
                    {notifications.filter((n) => n.unread).length}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {notificationOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setNotificationOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-[3px] shadow-lg border border-gray-200 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-[#323232]">
                          通知
                        </h3>
                        <button className="text-xs text-[#0073aa] hover:underline">
                          すべて既読にする
                        </button>
                      </div>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer ${
                            notification.unread ? "bg-blue-50/30" : ""
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            {notification.unread && (
                              <span className="w-2 h-2 bg-[#0073aa] rounded-full mt-1.5 flex-shrink-0" />
                            )}
                            <div className={notification.unread ? "" : "ml-5"}>
                              <p className="text-sm font-medium text-[#323232]">
                                {notification.title}
                              </p>
                              <p className="text-xs text-gray-500 mt-0.5">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-3 border-t border-gray-100">
                      <Link
                        href="/mypage/notifications"
                        className="text-xs text-[#0073aa] hover:underline"
                        onClick={() => setNotificationOpen(false)}
                      >
                        すべての通知を見る
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => {
                  setProfileOpen(!profileOpen);
                  setNotificationOpen(false);
                }}
                className="flex items-center gap-2 pl-4 border-l hover:opacity-80"
              >
                <div className="w-8 h-8 bg-[#0073aa] rounded-full flex items-center justify-center">
                  <UserCircle size={20} className="text-white" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-[#323232]">山田 太郎</p>
                  <p className="text-xs text-gray-500">会員</p>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-gray-400 transition-transform ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setProfileOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-[3px] shadow-lg border border-gray-200 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-[#323232]">
                        山田 太郎
                      </p>
                      <p className="text-xs text-gray-500">
                        yamada@example.com
                      </p>
                    </div>
                    <div className="py-1">
                      <Link
                        href="/mypage/profile"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setProfileOpen(false)}
                      >
                        <User size={16} className="text-gray-400" />
                        プロフィール設定
                      </Link>
                      <Link
                        href="/mypage/contracts"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setProfileOpen(false)}
                      >
                        <FileText size={16} className="text-gray-400" />
                        契約情報
                      </Link>
                      <Link
                        href="/mypage/settings"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setProfileOpen(false)}
                      >
                        <Settings size={16} className="text-gray-400" />
                        設定
                      </Link>
                    </div>
                    <div className="border-t border-gray-100 py-1">
                      <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <LogOut size={16} className="text-gray-400" />
                        ログアウト
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

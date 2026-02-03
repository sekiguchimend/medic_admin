"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  Building2,
  Calendar,
  Mail,
  CreditCard,
  HelpCircle,
  LogOut,
  UserCircle,
  ClipboardList,
  TrendingUp,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";

const menuItems = [
  {
    title: "ダッシュボード",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "会員管理",
    href: "/admin/members",
    icon: Users,
    submenu: [
      { title: "会員一覧", href: "/admin/members" },
      { title: "新規登録", href: "/admin/members/new" },
      { title: "学会別フィルター", href: "/admin/members/filter" },
    ],
  },
  {
    title: "クリニック管理",
    href: "/admin/clinics",
    icon: Building2,
  },
  {
    title: "契約管理",
    href: "/admin/contracts",
    icon: FileText,
    submenu: [
      { title: "契約一覧", href: "/admin/contracts" },
      { title: "契約履歴", href: "/admin/contracts/history" },
      { title: "プラン管理", href: "/admin/contracts/plans" },
    ],
  },
  {
    title: "請求・決済",
    href: "/admin/billing",
    icon: CreditCard,
    submenu: [
      { title: "請求一覧", href: "/admin/billing" },
      { title: "月次比較", href: "/admin/billing/monthly" },
      { title: "決済履歴", href: "/admin/billing/history" },
    ],
  },
  {
    title: "レポート・集計",
    href: "/admin/reports",
    icon: BarChart3,
    submenu: [
      { title: "月次報告書", href: "/admin/reports" },
      { title: "プラン別集計", href: "/admin/reports/plans" },
      { title: "CSV出力", href: "/admin/reports/export" },
    ],
  },
  {
    title: "セミナー管理",
    href: "/admin/seminars",
    icon: Calendar,
  },
  {
    title: "マーケティング",
    href: "/admin/marketing",
    icon: TrendingUp,
    submenu: [
      { title: "メルマガ配信", href: "/admin/marketing/email" },
      { title: "HubSpot連携", href: "/admin/marketing/hubspot" },
      { title: "アクセス解析", href: "/admin/marketing/analytics" },
    ],
  },
  {
    title: "委任状管理",
    href: "/admin/proxy",
    icon: ClipboardList,
  },
  {
    title: "AIチャットボット",
    href: "/admin/chatbot",
    icon: MessageSquare,
  },
  {
    title: "設定",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notifications = [
    { id: 1, title: "新規会員登録", message: "田中太郎さんが会員登録しました", time: "5分前", unread: true },
    { id: 2, title: "契約更新", message: "3件の契約が更新時期です", time: "1時間前", unread: true },
    { id: 3, title: "請求完了", message: "1月分の請求処理が完了しました", time: "3時間前", unread: false },
    { id: 4, title: "システム通知", message: "メンテナンスは正常に完了しました", time: "昨日", unread: false },
  ];

  const toggleSubmenu = (title: string) => {
    setExpandedMenus((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
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
        } ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/20">
          <Link href="/admin" className="flex items-center gap-2">
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
        <nav className="mt-4 px-2 overflow-y-auto h-[calc(100vh-4rem)] scrollbar-hide">
          {menuItems.map((item) => (
            <div key={item.title}>
              {item.submenu ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.title)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                      isActive(item.href)
                        ? "text-[#0073aa]"
                        : "hover:text-white"
                    }`}
                  >
                    <item.icon size={20} />
                    {sidebarOpen && (
                      <>
                        <span className="flex-1 text-left">{item.title}</span>
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${
                            expandedMenus.includes(item.title) ? "rotate-180" : ""
                          }`}
                        />
                      </>
                    )}
                  </button>
                  {sidebarOpen && expandedMenus.includes(item.title) && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.href}
                          href={subitem.href}
                          className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                            pathname === subitem.href
                              ? "text-[#0073aa]"
                              : "hover:text-white"
                          }`}
                        >
                          {subitem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                    isActive(item.href)
                      ? "text-[#0073aa]"
                      : "hover:text-white"
                  }`}
                >
                  <item.icon size={20} />
                  {sidebarOpen && <span>{item.title}</span>}
                </Link>
              )}
            </div>
          ))}
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
              className="lg:hidden"
            >
              <Menu size={24} />
            </button>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:block text-gray-600 hover:text-[#323232]"
            >
              <Menu size={24} />
            </button>
            <div className="relative hidden md:block">
              <Search
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="会員・クリニックを検索..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-[3px] w-80 focus:outline-none focus:ring-2 focus:ring-[#0073aa] focus:border-transparent"
              />
            </div>
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
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#0073aa] text-white text-xs rounded-full flex items-center justify-center">
                  {notifications.filter(n => n.unread).length}
                </span>
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
                        <h3 className="text-sm font-medium text-[#323232]">通知</h3>
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
                              <p className="text-sm font-medium text-[#323232]">{notification.title}</p>
                              <p className="text-xs text-gray-500 mt-0.5">{notification.message}</p>
                              <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-3 border-t border-gray-100">
                      <Link
                        href="/admin/notifications"
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

            <button className="text-gray-600 hover:text-[#323232]">
              <HelpCircle size={24} />
            </button>

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
                  <p className="text-sm font-medium text-[#323232]">管理者</p>
                  <p className="text-xs text-gray-500">admin@jbrm.jp</p>
                </div>
                <ChevronDown size={16} className={`text-gray-400 transition-transform ${profileOpen ? "rotate-180" : ""}`} />
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
                      <p className="text-sm font-medium text-[#323232]">管理者</p>
                      <p className="text-xs text-gray-500">admin@jbrm.jp</p>
                    </div>
                    <div className="py-1">
                      <Link
                        href="/admin/settings"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setProfileOpen(false)}
                      >
                        <UserCircle size={16} className="text-gray-400" />
                        プロフィール設定
                      </Link>
                      <Link
                        href="/admin/settings"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setProfileOpen(false)}
                      >
                        <Settings size={16} className="text-gray-400" />
                        システム設定
                      </Link>
                      <Link
                        href="/admin/settings"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setProfileOpen(false)}
                      >
                        <Mail size={16} className="text-gray-400" />
                        メール設定
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

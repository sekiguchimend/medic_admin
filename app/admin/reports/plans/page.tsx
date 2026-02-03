"use client";

const planStats = [
  {
    plan: "Aプラン",
    unitPrice: 15000,
    memberCount: 856,
    breakdown: [
      { price: 15000, count: 700, total: 10500000 },
      { price: 18000, count: 100, total: 1800000 },
      { price: 20000, count: 56, total: 1120000 },
    ],
    totalAmount: 13420000,
    percentage: 24.5,
  },
  {
    plan: "Bプラン",
    unitPrice: 20000,
    memberCount: 1024,
    breakdown: [
      { price: 20000, count: 800, total: 16000000 },
      { price: 25000, count: 150, total: 3750000 },
      { price: 30000, count: 74, total: 2220000 },
    ],
    totalAmount: 21970000,
    percentage: 40.1,
  },
  {
    plan: "Cプラン",
    unitPrice: 30000,
    memberCount: 576,
    breakdown: [
      { price: 30000, count: 400, total: 12000000 },
      { price: 40000, count: 120, total: 4800000 },
      { price: 50000, count: 56, total: 2800000 },
    ],
    totalAmount: 19600000,
    percentage: 35.4,
  },
];

export default function ReportPlansPage() {
  const totalMembers = planStats.reduce((sum, p) => sum + p.memberCount, 0);
  const totalRevenue = planStats.reduce((sum, p) => sum + p.totalAmount, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-medium text-gray-600">プラン別集計</h1>
          <p className="text-gray-500 mt-1">プラン別の会員数・保険料を集計します</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-[3px] text-sm font-medium text-gray-700 hover:bg-gray-50">
            PDF出力
          </button>
          <button className="px-4 py-2 bg-[#0073aa] text-white rounded-[3px] text-sm font-medium hover:bg-[#005f8a]">
            Excel出力
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">総会員数</p>
          <p className="text-xl font-bold text-[#323232]">{totalMembers.toLocaleString()}名</p>
        </div>
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">月額保険料合計</p>
          <p className="text-xl font-bold text-[#323232]">¥{totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">平均月額</p>
          <p className="text-xl font-bold text-[#323232]">¥{Math.round(totalRevenue / totalMembers).toLocaleString()}</p>
        </div>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {planStats.map((plan) => (
          <div
            key={plan.plan}
            className="bg-white rounded-[3px] shadow-sm border border-gray-200 p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-[#323232]">{plan.plan}</span>
              <span className="text-sm font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                {plan.percentage}%
              </span>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">会員数</p>
                <p className="text-xl font-bold text-[#323232]">{plan.memberCount.toLocaleString()}名</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">月額合計</p>
                <p className="text-xl font-bold text-[#0073aa]">
                  ¥{plan.totalAmount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">平均単価</p>
                <p className="text-base font-medium text-[#323232]">
                  ¥{Math.round(plan.totalAmount / plan.memberCount).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed breakdown - Single table */}
      <div className="bg-white rounded-[3px] shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-[#323232]">金額別内訳</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">プラン</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">月額</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">人数</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">小計</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">プラン内構成比</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {planStats.map((plan) =>
                plan.breakdown.map((item, index) => (
                  <tr key={`${plan.plan}-${index}`} className="hover:bg-gray-50">
                    {index === 0 ? (
                      <td
                        className="px-6 py-3 text-sm font-medium"
                        rowSpan={plan.breakdown.length}
                      >
                        <span className="px-2 py-1 rounded text-sm bg-gray-100 text-gray-700">
                          {plan.plan}
                        </span>
                      </td>
                    ) : null}
                    <td className="px-6 py-3 text-sm text-[#323232]">¥{item.price.toLocaleString()}</td>
                    <td className="px-6 py-3 text-sm text-[#323232] text-right">{item.count}名</td>
                    <td className="px-6 py-3 text-sm font-medium text-[#323232] text-right">
                      ¥{item.total.toLocaleString()}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-500 text-right">
                      {((item.total / plan.totalAmount) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr className="font-medium">
                <td className="px-6 py-3 text-sm text-[#323232]">合計</td>
                <td className="px-6 py-3 text-sm text-gray-500">-</td>
                <td className="px-6 py-3 text-sm text-[#323232] text-right">{totalMembers.toLocaleString()}名</td>
                <td className="px-6 py-3 text-sm font-bold text-[#323232] text-right">
                  ¥{totalRevenue.toLocaleString()}
                </td>
                <td className="px-6 py-3 text-sm text-[#323232] text-right">100%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

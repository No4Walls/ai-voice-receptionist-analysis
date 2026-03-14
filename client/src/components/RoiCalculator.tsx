/**
 * ROI Calculator Component
 * Design: Futurist SaaS Dashboard
 * Calculates personalized savings based on call volume and current staff cost
 */

import { useState, useEffect } from "react";
import { TrendingUp, DollarSign, Phone, Clock, Zap, BarChart3 } from "lucide-react";

interface CalculatorState {
  monthlyCallVolume: number;
  currentStaffCost: number;
  aiCostPerCall: number;
  implementationCost: number;
}

interface Results {
  monthlyHumanCost: number;
  monthlyAiCost: number;
  monthlySavings: number;
  annualSavings: number;
  paybackMonths: number;
  firstYearRoi: number;
  threeYearRoi: number;
}

export default function RoiCalculator() {
  const [state, setState] = useState<CalculatorState>({
    monthlyCallVolume: 2000,
    currentStaffCost: 4500,
    aiCostPerCall: 0.35,
    implementationCost: 500,
  });

  const [results, setResults] = useState<Results | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Calculate ROI whenever inputs change
  useEffect(() => {
    const monthlyHumanCost = state.currentStaffCost;
    const monthlyAiCost = state.monthlyCallVolume * state.aiCostPerCall;
    const monthlySavings = monthlyHumanCost - monthlyAiCost;
    const annualSavings = monthlySavings * 12;
    const paybackMonths = state.implementationCost > 0 
      ? Math.ceil(state.implementationCost / Math.max(monthlySavings, 1))
      : 0;
    const firstYearRoi = state.implementationCost > 0
      ? ((annualSavings - state.implementationCost) / state.implementationCost) * 100
      : 0;
    const threeYearRoi = state.implementationCost > 0
      ? ((annualSavings * 3 - state.implementationCost) / state.implementationCost) * 100
      : 0;

    setResults({
      monthlyHumanCost,
      monthlyAiCost,
      monthlySavings,
      annualSavings,
      paybackMonths,
      firstYearRoi,
      threeYearRoi,
    });
  }, [state]);

  const handleInputChange = (key: keyof CalculatorState, value: number) => {
    setState(prev => ({ ...prev, [key]: Math.max(0, value) }));
  };

  const presets = [
    { label: "Small Office (500 calls/mo)", volume: 500, cost: 3000 },
    { label: "Medium Business (2,000 calls/mo)", volume: 2000, cost: 4500 },
    { label: "Large Enterprise (10,000 calls/mo)", volume: 10000, cost: 8000 },
    { label: "High-Volume (50,000 calls/mo)", volume: 50000, cost: 15000 },
  ];

  if (!results) return null;

  const savingsPercentage = state.currentStaffCost > 0 
    ? (results.monthlySavings / state.currentStaffCost) * 100
    : 0;

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* ── Input Section ── */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Phone size={14} className="inline mr-1.5" />
              Monthly Call Volume
            </label>
            <div className="relative">
              <input
                type="number"
                value={state.monthlyCallVolume}
                onChange={(e) => handleInputChange("monthlyCallVolume", parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-sm"
                min="0"
                step="100"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-medium">calls</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Total inbound calls your business receives per month</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <DollarSign size={14} className="inline mr-1.5" />
              Current Monthly Staff Cost
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">$</span>
              <input
                type="number"
                value={state.currentStaffCost}
                onChange={(e) => handleInputChange("currentStaffCost", parseInt(e.target.value) || 0)}
                className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-sm"
                min="0"
                step="100"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Salary + benefits for receptionist(s) handling calls</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Zap size={14} className="inline mr-1.5" />
              AI Cost Per Call
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">$</span>
              <input
                type="number"
                value={state.aiCostPerCall}
                onChange={(e) => handleInputChange("aiCostPerCall", parseFloat(e.target.value) || 0)}
                className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-sm"
                min="0"
                step="0.05"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Industry average: $0.25–$0.50 per call (adjustable)</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Clock size={14} className="inline mr-1.5" />
              Implementation Cost
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">$</span>
              <input
                type="number"
                value={state.implementationCost}
                onChange={(e) => handleInputChange("implementationCost", parseInt(e.target.value) || 0)}
                className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-sm"
                min="0"
                step="100"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Setup, training, and integration (typically $0–$2,000)</p>
          </div>

          {/* Quick Presets */}
          <div className="pt-2">
            <p className="text-xs font-semibold text-gray-600 mb-2">Quick Presets</p>
            <div className="grid grid-cols-2 gap-2">
              {presets.map((preset, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setState(prev => ({
                      ...prev,
                      monthlyCallVolume: preset.volume,
                      currentStaffCost: preset.cost,
                    }));
                  }}
                  className="px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 border border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600"
                >
                  {preset.label.split("(")[0].trim()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Results Section ── */}
        <div className="space-y-4">
          {/* Main Metrics */}
          <div className="grid grid-cols-2 gap-3">
            {/* Monthly Savings */}
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200">
              <p className="text-xs text-emerald-600 font-medium uppercase tracking-wider mb-1">Monthly Savings</p>
              <p className="text-2xl font-bold text-emerald-700" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                ${results.monthlySavings.toLocaleString("en-US", { maximumFractionDigits: 0 })}
              </p>
              <p className="text-xs text-emerald-600 mt-1">{savingsPercentage.toFixed(0)}% reduction</p>
            </div>

            {/* Annual Savings */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
              <p className="text-xs text-blue-600 font-medium uppercase tracking-wider mb-1">Annual Savings</p>
              <p className="text-2xl font-bold text-blue-700" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                ${results.annualSavings.toLocaleString("en-US", { maximumFractionDigits: 0 })}
              </p>
              <p className="text-xs text-blue-600 mt-1">vs. current staff</p>
            </div>

            {/* Payback Period */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
              <p className="text-xs text-purple-600 font-medium uppercase tracking-wider mb-1">Payback Period</p>
              <p className="text-2xl font-bold text-purple-700" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {results.paybackMonths <= 0 ? "Immediate" : `${results.paybackMonths} mo`}
              </p>
              <p className="text-xs text-purple-600 mt-1">until ROI positive</p>
            </div>

            {/* First Year ROI */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200">
              <p className="text-xs text-orange-600 font-medium uppercase tracking-wider mb-1">Year 1 ROI</p>
              <p className="text-2xl font-bold text-orange-700" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {results.firstYearRoi > 0 ? "+" : ""}{results.firstYearRoi.toFixed(0)}%
              </p>
              <p className="text-xs text-orange-600 mt-1">return on investment</p>
            </div>
          </div>

          {/* Cost Comparison Chart */}
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <p className="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wider">Monthly Cost Comparison</p>
            <div className="space-y-3">
              {/* Human Cost Bar */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-600">Current Staff</span>
                  <span className="text-xs font-bold text-gray-800">
                    ${results.monthlyHumanCost.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="h-3 bg-red-100 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: "100%" }} />
                </div>
              </div>

              {/* AI Cost Bar */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-600">AI Receptionist</span>
                  <span className="text-xs font-bold text-gray-800">
                    ${results.monthlyAiCost.toLocaleString("en-US", { maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="h-3 bg-emerald-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{
                      width: `${Math.min(
                        (results.monthlyAiCost / results.monthlyHumanCost) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>

              {/* Savings Bar */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-600">Net Savings</span>
                  <span className="text-xs font-bold text-emerald-700">
                    ${results.monthlySavings.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="h-3 bg-emerald-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full"
                    style={{
                      width: `${Math.min(
                        (results.monthlySavings / results.monthlyHumanCost) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3-Year Projection */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition-colors text-sm font-medium text-indigo-700"
          >
            <span className="flex items-center gap-2">
              <BarChart3 size={14} />
              3-Year Projection
            </span>
            <span className="text-xs font-bold">
              {results.threeYearRoi > 0 ? "+" : ""}{results.threeYearRoi.toFixed(0)}% ROI
            </span>
          </button>

          {showDetails && (
            <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200 space-y-2 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <span className="text-xs text-indigo-700 font-medium">Year 1 Savings</span>
                <span className="text-sm font-bold text-indigo-900">
                  ${(results.annualSavings - state.implementationCost).toLocaleString("en-US", { maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-indigo-700 font-medium">Year 2 Savings</span>
                <span className="text-sm font-bold text-indigo-900">
                  ${(results.annualSavings * 2 - state.implementationCost).toLocaleString("en-US", { maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-indigo-700 font-medium">Year 3 Savings</span>
                <span className="text-sm font-bold text-indigo-900">
                  ${(results.annualSavings * 3 - state.implementationCost).toLocaleString("en-US", { maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="border-t border-indigo-300 pt-2 mt-2 flex items-center justify-between">
                <span className="text-xs text-indigo-700 font-semibold">Total 3-Year Benefit</span>
                <span className="text-sm font-bold text-indigo-900">
                  ${(results.annualSavings * 3 - state.implementationCost).toLocaleString("en-US", { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <p className="text-xs text-gray-500 leading-relaxed">
            💡 <strong>Disclaimer:</strong> This calculator provides estimates based on industry averages. Actual savings may vary based on call complexity, integration requirements, and specific business needs. Consult with AI receptionist vendors for precise quotes.
          </p>
        </div>
      </div>
    </div>
  );
}

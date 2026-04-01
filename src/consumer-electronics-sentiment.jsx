import { useState } from "react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend, Cell } from "recharts";

const sentimentData = [
  { month: "Jan '25", michigan: 73.2, conference: 104.1, label: "Optimistic start", phase: "optimism" },
  { month: "Feb '25", michigan: 71.7, conference: 100.1, label: "", phase: "optimism" },
  { month: "Mar '25", michigan: 68.5, conference: 93.9, label: "Early cracks", phase: "decline" },
  { month: "Apr '25", michigan: 52.2, conference: 85.7, label: '"Liberation Day" shock', phase: "shock" },
  { month: "May '25", michigan: 50.8, conference: 80.6, label: "Near historic lows", phase: "shock" },
  { month: "Jun '25", michigan: 53.4, conference: 82.3, label: "", phase: "trough" },
  { month: "Jul '25", michigan: 56.1, conference: 86.0, label: "Brief rebound", phase: "trough" },
  { month: "Aug '25", michigan: 55.7, conference: 84.1, label: "New tariffs hit", phase: "trough" },
  { month: "Sep '25", michigan: 54.2, conference: 83.5, label: "", phase: "trough" },
  { month: "Oct '25", michigan: 53.8, conference: 82.9, label: "", phase: "trough" },
  { month: "Nov '25", michigan: 53.1, conference: 81.5, label: "Holiday caution", phase: "erosion" },
  { month: "Dec '25", michigan: 52.9, conference: 79.8, label: "Year-end low", phase: "erosion" },
  { month: "Jan '26", michigan: 56.4, conference: 89.0, label: "Slight uptick", phase: "stabilize" },
  { month: "Feb '26", michigan: 56.6, conference: 91.0, label: "Stagnation", phase: "stabilize" },
  { month: "Mar '26", michigan: 53.3, conference: 91.8, label: "Iran conflict shock", phase: "reversal" },
];

const ceSpendingData = [
  { quarter: "Q1 '25", growth: 1.5, label: "Pull-forward buying", color: "#10b981" },
  { quarter: "Q2 '25", growth: 0.8, label: "Slowing", color: "#f59e0b" },
  { quarter: "Q3 '25", growth: -1.1, label: "Pullback begins", color: "#ef4444" },
  { quarter: "Q4 '25", growth: -2.2, label: "Demand softens", color: "#ef4444" },
  { quarter: "Q1 '26*", growth: 0.2, label: "Near-flat forecast", color: "#6b7280" },
];

const categoryImpactData = [
  { category: "Smartphones", priceIncrease: 26, purchaseDecline: 37, share: 53.3 },
  { category: "Laptops/Tablets", priceIncrease: 45, purchaseDecline: 68, share: 18.2 },
  { category: "TVs", priceIncrease: 31, purchaseDecline: 42, share: 8.7 },
  { category: "Game Consoles", priceIncrease: 69, purchaseDecline: 55, share: 4.1 },
  { category: "Smart Home", priceIncrease: 18, purchaseDecline: 28, share: 6.4 },
  { category: "Audio/Wearables", priceIncrease: 22, purchaseDecline: 31, share: 9.3 },
];

const expectationsData = [
  { month: "Jan '25", expectations: 86.4, present: 120.6 },
  { month: "Feb '25", expectations: 82.2, present: 118.8 },
  { month: "Mar '25", expectations: 74.0, present: 110.2 },
  { month: "Apr '25", expectations: 67.3, present: 105.1 },
  { month: "May '25", expectations: 64.5, present: 100.8 },
  { month: "Jun '25", expectations: 66.8, present: 102.1 },
  { month: "Jul '25", expectations: 70.2, present: 105.3 },
  { month: "Aug '25", expectations: 67.1, present: 103.5 },
  { month: "Sep '25", expectations: 66.0, present: 102.8 },
  { month: "Oct '25", expectations: 65.2, present: 101.5 },
  { month: "Nov '25", expectations: 64.1, present: 100.0 },
  { month: "Dec '25", expectations: 63.8, present: 98.2 },
  { month: "Jan '26", expectations: 72.0, present: 120.0 },
  { month: "Feb '26", expectations: 72.6, present: 118.7 },
  { month: "Mar '26", expectations: 70.9, present: 123.3 },
];

const timelineEvents = [
  { date: "Jan 2025", event: "Stable start - 46% of consumers optimistic, low unemployment, steady inflation", type: "positive" },
  { date: "Apr 2, 2025", event: '"Liberation Day" - sweeping 25% tariffs on imports from China, Canada, Mexico announced', type: "negative" },
  { date: "Apr-May 2025", event: "Consumer pull-forward: rush purchases in electronics ahead of price hikes", type: "neutral" },
  { date: "May 2025", event: "Net sentiment drops 32%. Tariffs become #2 consumer concern after inflation. Michigan index near pandemic lows.", type: "negative" },
  { date: "Jun-Jul 2025", event: "Brief rebound as trade deal negotiations begin; 90-day pause on some tariffs", type: "positive" },
  { date: "Aug 2025", event: "New tariffs on ~70 countries; consumer sentiment reverses gains. Year-ahead inflation expectations hit 4.9%.", type: "negative" },
  { date: "H2 2025", event: "CE sales decline 2.2% YoY. Lower/middle-income buyers pull back sharply. Best Buy lowers FY26 guidance.", type: "negative" },
  { date: "Q4 2025", event: "Holiday season cautious. 50% of consumers delay electronics purchases. Tariff awareness wanes slightly.", type: "negative" },
  { date: "Jan 2026", event: "CTA forecasts $565B US consumer tech revenue. Circana projects just 0.2% growth to $112B. Michigan inches up to 56.4.", type: "neutral" },
  { date: "Feb 2026", event: "Michigan at 56.6 - 21% below Jan '25. Deep wealth divide persists: stockholders recover, others stagnate.", type: "neutral" },
  { date: "Feb 28, 2026", event: "US military conflict with Iran begins. Oil prices surge to $110-120/barrel. Gas approaches $4.00/gallon.", type: "negative" },
  { date: "Mar 2026", event: "Michigan plunges 6% to 53.3 - bottom 1st percentile historically. Expectations Index falls to 51.7. Year-ahead inflation expectations jump to 3.8%.", type: "negative" },
  { date: "Mar 31, 2026", event: "Conference Board edges up to 91.8, but Expectations Index drops to 70.9 (below 80 recession threshold since Feb '25). Electronics purchase plans improve on 6-mo basis.", type: "neutral" },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "rgba(15, 15, 20, 0.95)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 8,
        padding: "12px 16px",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 13,
      }}>
        <p style={{ color: "#94a3b8", margin: 0, marginBottom: 6, fontWeight: 600 }}>{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color, margin: "3px 0", fontSize: 12 }}>
            {p.name}: <span style={{ fontWeight: 700 }}>{p.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const StatCard = ({ value, label, delta, deltaLabel, color = "#e2e8f0" }) => (
  <div style={{
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 12,
    padding: "20px 24px",
    flex: 1,
    minWidth: 180,
  }}>
    <div style={{ fontSize: 32, fontWeight: 800, color, fontFamily: "'Space Mono', monospace", letterSpacing: "-1px" }}>
      {value}
    </div>
    <div style={{ fontSize: 12, color: "#64748b", marginTop: 4, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.5px" }}>
      {label}
    </div>
    {delta && (
      <div style={{
        fontSize: 12,
        color: delta.startsWith("+") ? "#10b981" : "#ef4444",
        marginTop: 8,
        fontWeight: 600,
      }}>
        {delta} <span style={{ color: "#475569", fontWeight: 400 }}>{deltaLabel}</span>
      </div>
    )}
  </div>
);

const PhaseLabel = ({ phase, color }) => (
  <span style={{
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: 100,
    fontSize: 11,
    fontWeight: 600,
    background: `${color}18`,
    color: color,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  }}>
    {phase}
  </span>
);

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "sentiment", label: "Sentiment Index" },
    { id: "divergence", label: "The Divergence" },
    { id: "spending", label: "CE Spending" },
    { id: "categories", label: "Category Impact" },
    { id: "timeline", label: "Event Timeline" },
  ];

  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      background: "#0a0a0f",
      color: "#e2e8f0",
      minHeight: "100vh",
      padding: "32px 24px",
      maxWidth: 960,
      margin: "0 auto",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", boxShadow: "0 0 12px #ef444480" }} />
          <span style={{ fontSize: 11, fontWeight: 600, color: "#ef4444", textTransform: "uppercase", letterSpacing: "1.5px" }}>
            Case Study &middot; Updated 4/1/2026
          </span>
        </div>
        <h1 style={{
          fontSize: 28,
          fontWeight: 800,
          margin: 0,
          lineHeight: 1.2,
          background: "linear-gradient(135deg, #e2e8f0, #94a3b8)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          US Consumer Electronics Sentiment
        </h1>
        <p style={{ color: "#64748b", fontSize: 14, margin: "8px 0 0", lineHeight: 1.5 }}>
          Jan 2025 - Apr 2026 | From tariff shock to geopolitical conflict: the compounding confidence crisis in consumer electronics
        </p>
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex",
        gap: 4,
        marginBottom: 28,
        background: "rgba(255,255,255,0.03)",
        borderRadius: 10,
        padding: 4,
        flexWrap: "wrap",
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
              transition: "all 0.2s",
              background: activeTab === tab.id ? "rgba(255,255,255,0.1)" : "transparent",
              color: activeTab === tab.id ? "#e2e8f0" : "#64748b",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
            <StatCard value="53.3" label="Michigan Sentiment (Mar '26)" delta="-27%" deltaLabel="vs Jan 2025" color="#ef4444" />
            <StatCard value="70.9" label="CB Expectations Index" delta="-15.5" deltaLabel="vs Jan '25 &middot; Below 80 recession signal" color="#f59e0b" />
            <StatCard value="3.8%" label="Year-Ahead Inflation Expected" delta="+0.4pp" deltaLabel="vs Feb '26 &middot; largest jump since Apr '25" color="#ef4444" />
            <StatCard value="0.2%" label="2026 CE sales growth forecast" delta="-1.3pp" deltaLabel="vs H1 2025 pace" color="#6b7280" />
          </div>

          <div style={{
            background: "linear-gradient(135deg, rgba(234,88,12,0.08), rgba(239,68,68,0.04))",
            border: "1px solid rgba(234,88,12,0.18)",
            borderRadius: 14,
            padding: "20px 24px",
            marginBottom: 20,
            display: "flex",
            gap: 14,
            alignItems: "flex-start",
          }}>
            <div style={{ fontSize: 22, marginTop: 2 }}>{"\u26A0"}</div>
            <div>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: "#ea580c", margin: "0 0 6px" }}>
                New Headwind: US-Iran Conflict (Feb 28, 2026-Present)
              </h4>
              <p style={{ fontSize: 12, color: "#94a3b8", margin: 0, lineHeight: 1.6 }}>
                The US military conflict with Iran has introduced a second major shock on top of ongoing tariff pressure. Oil prices surged to $110-120/barrel, pushing gas toward $4/gallon nationally. Two-thirds of March Michigan survey responses were collected after the conflict began - those respondents showed sharply higher inflation expectations and weaker sentiment. The short-run economic outlook plunged 14% and year-ahead personal finance expectations fell 10%. Middle and higher-income consumers with stock wealth - previously the most resilient cohort - exhibited the steepest drops.
              </p>
            </div>
          </div>

          <div style={{
            background: "linear-gradient(135deg, rgba(239,68,68,0.06), rgba(245,158,11,0.04))",
            border: "1px solid rgba(239,68,68,0.12)",
            borderRadius: 14,
            padding: "24px 28px",
            marginBottom: 28,
          }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: "#f59e0b" }}>
              The Story in Six Phases
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { phase: "Cautious Optimism", period: "Jan\u2013Feb '25", color: "#10b981", desc: "46% of consumers felt optimistic. Electronics spending intentions muted but stable." },
                { phase: "Tariff Shock", period: "Apr\u2013May '25", color: "#ef4444", desc: '"Liberation Day" tariffs triggered the steepest sentiment drop since the pandemic. Net sentiment fell 32% in May.' },
                { phase: "Bifurcated Trough", period: "Jun\u2013Aug '25", color: "#f59e0b", desc: "Brief rebound in July collapsed as new tariffs hit in August. High-income shoppers sustained spending; lower-income pulled back sharply." },
                { phase: "Holiday Erosion", period: "Sep\u2013Dec '25", color: "#ef4444", desc: "H2 CE sales fell 2.2%. 50% planned to delay electronics purchases. Michigan sentiment hit year-end low of 52.9." },
                { phase: "False Dawn", period: "Jan\u2013Feb '26", color: "#6b7280", desc: "Modest uptick to 56.6 raised stabilization hopes. But gains concentrated among stockholders; non-stock households stagnant at depressed levels." },
                { phase: "Geopolitical Reversal", period: "Mar '26\u2013Now", color: "#ea580c", desc: "Iran conflict erased recovery. Michigan plunged 6% to 53.3 (bottom 1st percentile). Inflation expectations jumped to 3.8%. The resilient high-income cohort now cracking under gas prices and market volatility." },
              ].map((p, i) => (
                <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ minWidth: 130, paddingTop: 2 }}>
                    <PhaseLabel phase={p.phase} color={p.color} />
                  </div>
                  <div>
                    <span style={{ fontSize: 11, color: "#64748b", fontWeight: 600 }}>{p.period}</span>
                    <p style={{ fontSize: 13, color: "#94a3b8", margin: "2px 0 0", lineHeight: 1.5 }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 14,
            padding: "20px 20px 8px",
          }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, margin: "0 0 16px", color: "#94a3b8" }}>
              Michigan Consumer Sentiment Index | Jan 2025-Mar 2026
            </h3>
            <ResponsiveContainer width="100%" height={220}>    
              <AreaChart data={sentimentData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <defs>
                  <linearGradient id="sentGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: "#475569", fontSize: 10 }} tickLine={false} axisLine={{ stroke: "rgba(255,255,255,0.06)" }} />
                <YAxis domain={[45, 80]} tick={{ fill: "#475569", fontSize: 10 }} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="michigan" stroke="#f59e0b" strokeWidth={2.5} fill="url(#sentGrad)" name="Michigan Index" dot={{ r: 3, fill: "#f59e0b", stroke: "#0a0a0f", strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Sentiment Index Tab */}
      {activeTab === "sentiment" && (
        <div>
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 14,
            padding: "24px 24px 12px",
            marginBottom: 20,
          }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 4px" }}>Dual Confidence Indices</h3>
            <p style={{ fontSize: 12, color: "#64748b", margin: "0 0 20px" }}>
              University of Michigan vs Conference Board &middot; Mar '26: Michigan reverses, CB edges up &mdash; a rare divergence driven by conflicting signals
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sentimentData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: "#475569", fontSize: 10 }} tickLine={false} axisLine={{ stroke: "rgba(255,255,255,0.06)" }} />
                <YAxis yAxisId="left" domain={[45, 80]} tick={{ fill: "#475569", fontSize: 10 }} tickLine={false} axisLine={false} label={{ value: "Michigan", angle: -90, position: "insideLeft", fill: "#f59e0b80", fontSize: 10 }} />
                <YAxis yAxisId="right" orientation="right" domain={[70, 110]} tick={{ fill: "#475569", fontSize: 10 }} tickLine={false} axisLine={false} label={{ value: "Conf. Board", angle: 90, position: "insideRight", fill: "#3b82f680", fontSize: 10 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11, color: "#64748b" }} />
                <Line yAxisId="left" type="monotone" dataKey="michigan" stroke="#f59e0b" strokeWidth={2.5} name="Michigan Sentiment" dot={{ r: 3, fill: "#f59e0b", stroke: "#0a0a0f", strokeWidth: 2 }} />
                <Line yAxisId="right" type="monotone" dataKey="conference" stroke="#3b82f6" strokeWidth={2.5} name="Conference Board" dot={{ r: 3, fill: "#3b82f6", stroke: "#0a0a0f", strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              { title: "Peak-to-Current Drop", value: "-27%", detail: "Michigan index fell from 73.2 (Jan '25) to 53.3 (Mar '26) - bottom 1st percentile of historical readings", color: "#ef4444" },
              { title: "Mar '26 Divergence", value: "Split", detail: "Michigan fell 6% on gas/geopolitical anxiety. Conference Board edged up on resilient labor market. Different survey weights explain the gap.", color: "#f59e0b" },
              { title: "Inflation Expectations", value: "3.8%", detail: "Year-ahead expected inflation jumped in March - largest monthly increase since April 2025, driven by Iran conflict energy shock", color: "#ef4444" },
              { title: "Wealth Divide Cracking", value: "New", detail: "In March, middle/higher-income consumers and stockholders - previously resilient - exhibited the steepest sentiment drops for the first time", color: "#8b5cf6" },
            ].map((card, i) => (
              <div key={i} style={{
                flex: "1 1 200px",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 12,
                padding: "16px 20px",
              }}>
                <div style={{ fontSize: 11, color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  {card.title}
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, color: card.color, fontFamily: "'Space Mono', monospace", margin: "4px 0" }}>
                  {card.value}
                </div>
                <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.4 }}>{card.detail}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Divergence Tab */}
      {activeTab === "divergence" && (
        <div>
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 14,
            padding: "24px 24px 12px",
            marginBottom: 20,
          }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 4px" }}>The Present vs. Expectations Divergence</h3>
            <p style={{ fontSize: 12, color: "#64748b", margin: "0 0 20px" }}>
              Conference Board sub-indices | The widening gap between "now is OK" and "the future looks bad" is one of the widest on record
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={expectationsData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: "#475569", fontSize: 10 }} tickLine={false} axisLine={false} />
                <YAxis domain={[55, 130]} tick={{ fill: "#475569", fontSize: 10 }} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11, color: "#64748b" }} />
                <ReferenceLine y={80} stroke="rgba(239,68,68,0.4)" strokeDasharray="4 4" label={{ value: "80 = Recession Signal", fill: "#ef444480", fontSize: 9, position: "insideTopRight" }} />
                <Line type="monotone" dataKey="present" stroke="#10b981" strokeWidth={2.5} name="Present Situation" dot={{ r: 3, fill: "#10b981", stroke: "#0a0a0f", strokeWidth: 2 }} />
                <Line type="monotone" dataKey="expectations" stroke="#ef4444" strokeWidth={2.5} name="Expectations Index" dot={{ r: 3, fill: "#ef4444", stroke: "#0a0a0f", strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <div style={{
              flex: "1 1 280px",
              background: "linear-gradient(135deg, rgba(239,68,68,0.06), rgba(239,68,68,0.02))",
              border: "1px solid rgba(239,68,68,0.12)",
              borderRadius: 14,
              padding: "20px 24px",
            }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: "#ef4444", margin: "0 0 8px" }}>The Recession Signal</h4>
              <p style={{ fontSize: 12, color: "#94a3b8", margin: 0, lineHeight: 1.6 }}>
                The Expectations Index has been below 80 since February 2025 - 13 consecutive months. Historically, sustained readings below 80 have preceded recessions. At 70.9 in March 2026, it sits well inside the danger zone. The Michigan Expectations component is even worse at 51.7.
              </p>
            </div>
            <div style={{
              flex: "1 1 280px",
              background: "linear-gradient(135deg, rgba(16,185,129,0.06), rgba(16,185,129,0.02))",
              border: "1px solid rgba(16,185,129,0.12)",
              borderRadius: 14,
              padding: "20px 24px",
            }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: "#10b981", margin: "0 0 8px" }}>The Labor Market Buffer</h4>
              <p style={{ fontSize: 12, color: "#94a3b8", margin: 0, lineHeight: 1.6 }}>
                The Present Situation Index actually rose to 123.3 in March - its highest of 2026. Jobs remain "plentiful," and consumers assess current conditions as manageable. This buffer is why the headline CB number edged up even as future expectations deteriorated sharply.
              </p>
            </div>
            <div style={{
              flex: "1 1 280px",
              background: "linear-gradient(135deg, rgba(234,88,12,0.06), rgba(234,88,12,0.02))",
              border: "1px solid rgba(234,88,12,0.12)",
              borderRadius: 14,
              padding: "20px 24px",
            }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: "#ea580c", margin: "0 0 8px" }}>What It Means for CE</h4>
              <p style={{ fontSize: 12, color: "#94a3b8", margin: 0, lineHeight: 1.6 }}>
                This "OK today, worried about tomorrow" dynamic is uniquely bad for electronics - a category where big-ticket purchases are easily deferred. Conference Board noted electronics purchase plans improved on a 6-month rolling basis in March, but that metric lags. Consumer spending trends remain focused on "cheap thrills" and necessities, not discretionary tech.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CE Spending Tab */}
      {activeTab === "spending" && (
        <div>
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 14,
            padding: "24px 24px 12px",
            marginBottom: 20,
          }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 4px" }}>Consumer Electronics Sales Growth (YoY %)</h3>
            <p style={{ fontSize: 12, color: "#64748b", margin: "0 0 20px" }}>
              Pull-forward buying in H1 masked a sharper H2 decline | *Q1 '26 = Circana forecast | Source: Circana POS data
            </p>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={ceSpendingData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="quarter" tick={{ fill: "#94a3b8", fontSize: 12 }} tickLine={false} axisLine={{ stroke: "rgba(255,255,255,0.06)" }} />
                <YAxis tick={{ fill: "#475569", fontSize: 10 }} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={0} stroke="rgba(255,255,255,0.15)" />
                <Bar dataKey="growth" name="YoY Growth %" radius={[6, 6, 0, 0]} barSize={56}>
                  {ceSpendingData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} fillOpacity={0.85} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <div style={{
              flex: "1 1 280px",
              background: "linear-gradient(135deg, rgba(16,185,129,0.06), rgba(16,185,129,0.02))",
              border: "1px solid rgba(16,185,129,0.12)",
              borderRadius: 14,
              padding: "20px 24px",
            }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: "#10b981", margin: "0 0 8px" }}>H1 2025: The Pull-Forward Effect</h4>
              <p style={{ fontSize: 12, color: "#94a3b8", margin: 0, lineHeight: 1.6 }}>
                Consumers rushed to buy electronics in March-April ahead of expected tariff price hikes. H1 retail dollar sales grew 1.5%. Computers and PCs were the primary growth driver. Best Buy initially maintained guidance despite tariff uncertainty.
              </p>
            </div>
            <div style={{
              flex: "1 1 280px",
              background: "linear-gradient(135deg, rgba(239,68,68,0.06), rgba(239,68,68,0.02))",
              border: "1px solid rgba(239,68,68,0.12)",
              borderRadius: 14,
              padding: "20px 24px",
            }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: "#ef4444", margin: "0 0 8px" }}>H2 2025: The Pullback</h4>
              <p style={{ fontSize: 12, color: "#94a3b8", margin: 0, lineHeight: 1.6 }}>
                Sales declined 2.2% YoY. Pull-forward spending left a demand vacuum. Best Buy missed Q1 revenue expectations and cut FY26 guidance to $41.1-41.9B. China import share at Best Buy dropped from 55% to 30-35% as supply chains shifted. Comps fell 0.7%.
              </p>
            </div>
            <div style={{
              flex: "1 1 280px",
              background: "linear-gradient(135deg, rgba(234,88,12,0.06), rgba(234,88,12,0.02))",
              border: "1px solid rgba(234,88,12,0.12)",
              borderRadius: 14,
              padding: "20px 24px",
            }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: "#ea580c", margin: "0 0 8px" }}>2026 Outlook: Risks Mounting</h4>
              <p style={{ fontSize: 12, color: "#94a3b8", margin: 0, lineHeight: 1.6 }}>
                Circana forecasts just 0.2% growth to $112B. Avg prices climbing ~3%. Now the Iran conflict adds energy cost pressure on top of tariffs. Consumer spending trend is "cheap thrills and necessary services" - electronics fall squarely in the deferrable category. Pockets of growth: PCs (Win 10 EOL), tablets (+$200M), smart glasses.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Category Impact Tab */}
      {activeTab === "categories" && (
        <div>
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 14,
            padding: "24px 24px 12px",
            marginBottom: 20,
          }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 4px" }}>Tariff-Driven Price Increases vs Projected Purchase Decline</h3>
            <p style={{ fontSize: 12, color: "#64748b", margin: "0 0 20px" }}>
              By CE product category | Source: CTA/Trade Partnership Worldwide analysis
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryImpactData} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
                <XAxis type="number" tick={{ fill: "#475569", fontSize: 10 }} tickLine={false} axisLine={false} unit="%" />
                <YAxis type="category" dataKey="category" tick={{ fill: "#94a3b8", fontSize: 11 }} tickLine={false} axisLine={false} width={100} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11, color: "#64748b" }} />
                <Bar dataKey="priceIncrease" name="Avg Price Increase %" fill="#f59e0b" fillOpacity={0.85} radius={[0, 4, 4, 0]} barSize={14} />
                <Bar dataKey="purchaseDecline" name="Projected Purchase Decline %" fill="#ef4444" fillOpacity={0.85} radius={[0, 4, 4, 0]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 14,
            padding: "20px 24px",
          }}>
            <h4 style={{ fontSize: 13, fontWeight: 700, margin: "0 0 14px", color: "#94a3b8" }}>Key Category Dynamics</h4>
            <div style={{ display: "grid", gap: 12 }}>
              {[
                { cat: "Smartphones", insight: "Largest segment at 53% revenue share. Prices up ~26% under full tariffs. Buying plans still trending upward on 6-month CB basis in March - driven by upgrade cycles and BNPL financing. But Iran-driven gas costs are squeezing disposable income.", color: "#3b82f6" },
                { cat: "Laptops & Tablets", insight: "Most exposed category with potential 68% purchase decline. Windows 10 end-of-support driving some replacement demand. Tablets expected to add $200M+ in 2026. Best Buy saw computing/mobile growth even as overall comps fell.", color: "#8b5cf6" },
                { cat: "Game Consoles", insight: "Steepest projected price increase at 69%. Low-margin products forced to pass tariff costs directly to consumers. Secondhand/resale market surging. CTA projects $123B in reduced consumer purchasing power from tariffs.", color: "#ef4444" },
                { cat: "Smart Home & Wearables", insight: "More resilient with lower tariff exposure. Smart glasses emerging as growth area - Circana highlights as an innovation pocket. Matter standard driving multi-brand interoperability. Conference Board noted electronics purchase plans improved on 6-mo rolling basis in March.", color: "#10b981" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 3, minHeight: 40, borderRadius: 2, background: item.color, marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: item.color }}>{item.cat}</div>
                    <p style={{ fontSize: 12, color: "#94a3b8", margin: "2px 0 0", lineHeight: 1.5 }}>{item.insight}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Timeline Tab */}
      {activeTab === "timeline" && (
        <div>
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 14,
            padding: "24px 28px",
          }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 20px" }}>Key Events Shaping CE Sentiment | Jan 2025-Apr 2026</h3>
            <div style={{ position: "relative", paddingLeft: 24 }}>
              <div style={{
                position: "absolute",
                left: 6,
                top: 6,
                bottom: 6,
                width: 2,
                background: "rgba(255,255,255,0.06)",
                borderRadius: 1,
              }} />
              {timelineEvents.map((evt, i) => {
                const dotColor = evt.type === "positive" ? "#10b981" : evt.type === "negative" ? "#ef4444" : "#f59e0b";
                return (
                  <div key={i} style={{ position: "relative", marginBottom: 20, paddingLeft: 20 }}>
                    <div style={{
                      position: "absolute",
                      left: -21,
                      top: 5,
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: dotColor,
                      border: "3px solid #0a0a0f",
                      boxShadow: `0 0 8px ${dotColor}60`,
                    }} />
                    <div style={{ fontSize: 11, fontWeight: 700, color: dotColor, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      {evt.date}
                    </div>
                    <p style={{ fontSize: 13, color: "#cbd5e1", margin: "4px 0 0", lineHeight: 1.5 }}>
                      {evt.event}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{
            marginTop: 20,
            padding: "16px 20px",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 12,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>
              Data Sources
            </div>
            <p style={{ fontSize: 11, color: "#64748b", margin: 0, lineHeight: 1.6 }}>
              University of Michigan Surveys of Consumers (final Mar '26: 53.3, released 3/27/26) |
              The Conference Board Consumer Confidence Index (Mar '26: 91.8, released 3/31/26) |
              McKinsey ConsumerWise Quarterly Surveys | Circana Future of Technology Report (Jan 2026) |
              CTA U.S. Consumer Technology Industry Forecast (Jan 2026) | Deloitte Consumer Products Outlook 2026 |
              CTA/Trade Partnership Worldwide Tariff Impact Analysis | Morning Consult Tariff Sentiment Tracker |
              NielsenIQ Global Tech Market Outlook 2026 | Best Buy FY26 Q1 Earnings (May 2025)
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{
        marginTop: 32,
        paddingTop: 16,
        borderTop: "1px solid rgba(255,255,255,0.04)",
        fontSize: 10,
        color: "#334155",
        textAlign: "center",
      }}>
        Analysis compiled April 1, 2026 | Data from multiple industry sources | Some projections based on partial tariff scenarios
      </div>
    </div>
  );
}

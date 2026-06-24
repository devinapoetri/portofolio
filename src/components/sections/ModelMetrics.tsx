"use client"
import * as React from "react"
import { motion } from "framer-motion"
import { ModelMetrics } from "@/types"

/* ─────────────────────────────────────────────
   Shared helpers
───────────────────────────────────────────── */

/** Map a value in [0,1] to an SVG arc path segment on a circle. */
function arcPath(
  cx: number,
  cy: number,
  r: number,
  startAngle: number, // radians
  endAngle: number,
): string {
  const x1 = cx + r * Math.cos(startAngle)
  const y1 = cy + r * Math.sin(startAngle)
  const x2 = cx + r * Math.cos(endAngle)
  const y2 = cy + r * Math.sin(endAngle)
  const large = endAngle - startAngle > Math.PI ? 1 : 0
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`
}



/* ─────────────────────────────────────────────
   1. ACCURACY BAR CHART
───────────────────────────────────────────── */

const CHART_PALETTE = {
  before: "#ef4444",   // red-500
  after:  "#f97316",   // orange-500 (slightly warmer to distinguish)
  grid:   "rgba(255,255,255,0.06)",
  text:   "#a1a1aa",   // zinc-400
  glow:   "rgba(239,68,68,0.25)",
}

interface AccuracyBarChartProps {
  beforeAccuracy: number
  afterAccuracy: number
}

export function AccuracyBarChart({ beforeAccuracy, afterAccuracy }: AccuracyBarChartProps) {
  const W = 380
  const H = 220
  const padL = 48
  const padR = 24
  const padT = 20
  const padB = 48

  const chartW = W - padL - padR
  const chartH = H - padT - padB

  const bars = [
    { label: "Before HPO", value: beforeAccuracy, color: CHART_PALETTE.before },
    { label: "After HPO",  value: afterAccuracy,  color: CHART_PALETTE.after  },
  ]

  const barW = chartW / (bars.length * 2) - 8
  const gap = chartW / bars.length

  const yLines = [0, 0.25, 0.5, 0.75, 1.0]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ overflow: "visible" }}>
      {/* Grid lines */}
      {yLines.map((v) => {
        const y = padT + chartH * (1 - v)
        return (
          <g key={v}>
            <line
              x1={padL} y1={y} x2={padL + chartW} y2={y}
              stroke={CHART_PALETTE.grid} strokeWidth={1}
            />
            <text x={padL - 6} y={y + 4} textAnchor="end" fontSize={10} fill={CHART_PALETTE.text}>
              {Math.round(v * 100)}%
            </text>
          </g>
        )
      })}

      {/* Bars */}
      {bars.map((bar, i) => {
        const x = padL + gap * i + gap / 2 - barW / 2
        const barH = chartH * bar.value
        const y = padT + chartH - barH

        return (
          <g key={bar.label}>
            {/* Glow */}
            <motion.rect
              x={x - 3} y={y - 3}
              width={barW + 6} height={barH + 6}
              rx={8}
              fill={bar.color}
              opacity={0.15}
              initial={{ scaleY: 0, originY: "bottom" }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
            />
            {/* Bar */}
            <motion.rect
              x={x} y={y}
              width={barW} rx={6}
              fill={bar.color}
              initial={{ height: 0, y: padT + chartH }}
              animate={{ height: barH, y }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
            />
            {/* Value label */}
            <motion.text
              x={x + barW / 2} y={y - 8}
              textAnchor="middle" fontSize={13} fontWeight="700" fill={bar.color}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.9 + i * 0.15 }}
            >
              {(bar.value * 100).toFixed(0)}%
            </motion.text>
            {/* X label */}
            <text
              x={x + barW / 2} y={padT + chartH + 18}
              textAnchor="middle" fontSize={11} fill={CHART_PALETTE.text}
            >
              {bar.label}
            </text>
          </g>
        )
      })}

      {/* Y axis line */}
      <line
        x1={padL} y1={padT} x2={padL} y2={padT + chartH}
        stroke={CHART_PALETTE.grid} strokeWidth={1}
      />
    </svg>
  )
}

/* ─────────────────────────────────────────────
   2. DONUT (PIE) CHART
───────────────────────────────────────────── */

interface DonutSegment { label: string; value: number; color: string }

interface DonutChartProps {
  segments: DonutSegment[]
  title: string
  centerLabel: string
  centerValue: string
}

function DonutChart({ segments, title, centerLabel, centerValue }: DonutChartProps) {
  const SIZE = 180
  const cx = SIZE / 2
  const cy = SIZE / 2
  const outerR = 72
  const innerR = 46
  const total = segments.reduce((s, d) => s + d.value, 0)

  let cursor = -Math.PI / 2  // start from top

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width={SIZE} height={SIZE} style={{ overflow: "visible" }}>
        {segments.map((seg, i) => {
          const sweep = (seg.value / total) * 2 * Math.PI
          const startAngle = cursor
          const endAngle = cursor + sweep
          cursor += sweep

          const midAngle = startAngle + sweep / 2
          const midR = (outerR + innerR) / 2

          const d =
            arcPath(cx, cy, outerR, startAngle, endAngle) +
            ` L ${cx + innerR * Math.cos(endAngle)} ${cy + innerR * Math.sin(endAngle)}` +
            ` A ${innerR} ${innerR} 0 ${sweep > Math.PI ? 1 : 0} 0 ${cx + innerR * Math.cos(startAngle)} ${cy + innerR * Math.sin(startAngle)} Z`

          return (
            <motion.path
              key={seg.label}
              d={d}
              fill={seg.color}
              stroke="#09090b"
              strokeWidth={2}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            />
          )
        })}
        {/* Center label */}
        <text x={cx} y={cy - 7} textAnchor="middle" fontSize={18} fontWeight="800" fill="#f4f4f5">
          {centerValue}
        </text>
        <text x={cx} y={cy + 11} textAnchor="middle" fontSize={9} fill="#a1a1aa">
          {centerLabel}
        </text>
      </svg>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 w-full max-w-[190px]">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: seg.color }} />
            <span className="text-[10px] text-zinc-400 leading-none">{seg.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

interface ModelPerformancePieProps {
  beforeHPO: { class0: { precision: number; recall: number }; class1: { precision: number; recall: number } }
  afterHPO:  { class0: { precision: number; recall: number }; class1: { precision: number; recall: number } }
}

export function ModelPerformancePie({ beforeHPO, afterHPO }: ModelPerformancePieProps) {
  const makeSegments = (snap: typeof beforeHPO): DonutSegment[] => [
    { label: "C0 Prec",   value: snap.class0.precision, color: "#ef4444" },
    { label: "C0 Recall", value: snap.class0.recall,    color: "#f97316" },
    { label: "C1 Prec",   value: snap.class1.precision, color: "#a855f7" },
    { label: "C1 Recall", value: snap.class1.recall,    color: "#06b6d4" },
  ]

  const beforeTotal = (beforeHPO.class0.precision + beforeHPO.class0.recall + beforeHPO.class1.precision + beforeHPO.class1.recall)
  const afterTotal  = (afterHPO.class0.precision  + afterHPO.class0.recall  + afterHPO.class1.precision  + afterHPO.class1.recall)

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
      <DonutChart
        segments={makeSegments(beforeHPO)}
        title="Before HPO"
        centerLabel="total score"
        centerValue={beforeTotal.toFixed(2)}
      />
      <DonutChart
        segments={makeSegments(afterHPO)}
        title="After HPO"
        centerLabel="total score"
        centerValue={afterTotal.toFixed(2)}
      />
    </div>
  )
}

/* ─────────────────────────────────────────────
   3. RADAR / SPIDER CHART
   ───────────────────────────────────────────── */

interface RadarMetric {
  label: string
  beforeValue: number
  afterValue: number
}

interface RadarChartProps {
  metrics: RadarMetric[]
}

function RadarChartSVG({ metrics }: RadarChartProps) {
  const SIZE = 260
  const cx = SIZE / 2
  const cy = SIZE / 2
  const maxR = 95
  const levels = [0.25, 0.5, 0.75, 1.0]
  const n = metrics.length
  const step = (2 * Math.PI) / n

  /** Cartesian point for metric i at radius fraction r */
  const pt = (i: number, r: number) => {
    const angle = -Math.PI / 2 + step * i
    return {
      x: cx + maxR * r * Math.cos(angle),
      y: cy + maxR * r * Math.sin(angle),
    }
  }

  const webPoints = (r: number) =>
    Array.from({ length: n }, (_, i) => pt(i, r))
      .map((p) => `${p.x},${p.y}`)
      .join(" ")

  const beforePolygon = metrics
    .map((m, i) => pt(i, m.beforeValue))
    .map((p) => `${p.x},${p.y}`)
    .join(" ")

  const afterPolygon = metrics
    .map((m, i) => pt(i, m.afterValue))
    .map((p) => `${p.x},${p.y}`)
    .join(" ")

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full max-w-[280px]" style={{ overflow: "visible" }}>
      {/* Web grid */}
      {levels.map((l) => (
        <polygon
          key={l}
          points={webPoints(l)}
          fill="none"
          stroke={CHART_PALETTE.grid}
          strokeWidth={1}
        />
      ))}

      {/* Spoke lines */}
      {Array.from({ length: n }, (_, i) => {
        const end = pt(i, 1)
        return (
          <line
            key={i}
            x1={cx} y1={cy} x2={end.x} y2={end.y}
            stroke={CHART_PALETTE.grid} strokeWidth={1}
          />
        )
      })}

      {/* BEFORE HPO: Data polygon (glow fill) */}
      <motion.polygon
        points={beforePolygon}
        fill={CHART_PALETTE.before}
        fillOpacity={0.07}
        stroke="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />
      {/* BEFORE HPO: Data polygon stroke */}
      <motion.polygon
        points={beforePolygon}
        fill="none"
        stroke={CHART_PALETTE.before}
        strokeWidth={1.5}
        strokeDasharray="4 3"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{ duration: 1 }}
      />

      {/* AFTER HPO: Data polygon (glow fill) */}
      <motion.polygon
        points={afterPolygon}
        fill={CHART_PALETTE.after}
        fillOpacity={0.15}
        stroke="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />
      {/* AFTER HPO: Data polygon stroke */}
      <motion.polygon
        points={afterPolygon}
        fill="none"
        stroke={CHART_PALETTE.after}
        strokeWidth={2.5}
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Before Data dots */}
      {metrics.map((m, i) => {
        const p = pt(i, m.beforeValue)
        return (
          <motion.circle
            key={`before-${m.label}`}
            cx={p.x} cy={p.y} r={3.5}
            fill={CHART_PALETTE.before}
            stroke="#09090b"
            strokeWidth={1.5}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 + i * 0.08, duration: 0.3 }}
            style={{ transformOrigin: `${p.x}px ${p.y}px` }}
          />
        )
      })}

      {/* After Data dots */}
      {metrics.map((m, i) => {
        const p = pt(i, m.afterValue)
        return (
          <motion.circle
            key={`after-${m.label}`}
            cx={p.x} cy={p.y} r={5}
            fill={CHART_PALETTE.after}
            stroke="#09090b"
            strokeWidth={2}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 + i * 0.08, duration: 0.3 }}
            style={{ transformOrigin: `${p.x}px ${p.y}px` }}
          />
        )
      })}

      {/* Labels */}
      {metrics.map((m, i) => {
        const labelR = maxR + 22
        const angle = -Math.PI / 2 + step * i
        const lx = cx + labelR * Math.cos(angle)
        const ly = cy + labelR * Math.sin(angle)
        const anchor = Math.abs(lx - cx) < 4 ? "middle" : lx < cx ? "end" : "start"

        return (
          <g key={m.label}>
            <text
              x={lx} y={ly - 6}
              textAnchor={anchor}
              fontSize={10}
              fontWeight="600"
              fill="#f4f4f5"
            >
              {m.label}
            </text>
            <text
              x={lx} y={ly + 8}
              textAnchor={anchor}
              fontSize={10}
              fontWeight="700"
            >
              <tspan fill={CHART_PALETTE.before}>{(m.beforeValue * 100).toFixed(0)}%</tspan>
              <tspan fill="#71717a"> → </tspan>
              <tspan fill={CHART_PALETTE.after}>{(m.afterValue * 100).toFixed(0)}%</tspan>
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export function MetricsRadar({ beforeHPO, afterHPO }: { beforeHPO: ModelMetrics["beforeHPO"]; afterHPO: ModelMetrics["afterHPO"] }) {
  const metrics: RadarMetric[] = [
    { label: "Accuracy",    beforeValue: beforeHPO.accuracy, afterValue: afterHPO.accuracy },
    { label: "W.Precision", beforeValue: beforeHPO.weightedAvg.precision, afterValue: afterHPO.weightedAvg.precision },
    { label: "W.Recall",    beforeValue: beforeHPO.weightedAvg.recall, afterValue: afterHPO.weightedAvg.recall },
    { label: "W.F1",        beforeValue: beforeHPO.weightedAvg.f1, afterValue: afterHPO.weightedAvg.f1 },
    { label: "Macro F1",    beforeValue: beforeHPO.macroAvg.f1, afterValue: afterHPO.macroAvg.f1 },
    { label: "Macro Rec.",  beforeValue: beforeHPO.macroAvg.recall, afterValue: afterHPO.macroAvg.recall },
  ]

  return (
    <div className="flex flex-col items-center gap-4">
      <RadarChartSVG metrics={metrics} />
    </div>
  )
}

/* ─────────────────────────────────────────────
   Master wrapper
   ───────────────────────────────────────────── */

interface ModelMetricsBlockProps { metrics: ModelMetrics }

export function ModelMetricsBlock({ metrics }: ModelMetricsBlockProps) {
  return (
    <div className="bg-surface rounded-2xl border border-border p-8 space-y-10">
      <h2 className="font-semibold text-lg text-foreground">Model Performance Metrics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

        {/* ── 1. Bar chart: Accuracy ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0 }}
          className="bg-background/50 rounded-xl border border-border p-5 flex flex-col gap-3 h-full"
        >
          <div>
            <p className="text-xs uppercase tracking-wider text-muted mb-1">Accuracy Score</p>
            <p className="text-sm text-zinc-400">Before vs After HPO</p>
          </div>
          <AccuracyBarChart
            beforeAccuracy={metrics.beforeHPO.accuracy}
            afterAccuracy={metrics.afterHPO.accuracy}
          />
        </motion.div>

        {/* ── 2. Pie chart: Before vs After ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-background/50 rounded-xl border border-border p-5 flex flex-col gap-3 h-full justify-between"
        >
          <div>
            <p className="text-xs uppercase tracking-wider text-muted mb-1">Model Performance</p>
            <p className="text-sm text-zinc-400">Metric distribution by class</p>
          </div>
          <ModelPerformancePie beforeHPO={metrics.beforeHPO} afterHPO={metrics.afterHPO} />
        </motion.div>

        {/* ── 3. Radar: Before & After overlay ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-2 bg-background/50 rounded-xl border border-border p-6 flex flex-col md:flex-row items-center justify-around gap-8"
        >
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted mb-1">Metrics Radar</p>
              <p className="text-sm text-zinc-400">Overall comparison: Before vs After HPO</p>
            </div>
            {/* Legend & Details */}
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-4 h-1.5 rounded-sm flex-shrink-0" style={{ background: CHART_PALETTE.before }} />
                <span className="text-xs text-zinc-300 font-medium">Before HPO</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-4 h-1.5 rounded-sm flex-shrink-0" style={{ background: CHART_PALETTE.after }} />
                <span className="text-xs text-zinc-300 font-medium">After HPO (Best Model)</span>
              </div>
              <p className="text-xs text-zinc-500 max-w-[280px] leading-relaxed pt-2 border-t border-border/50">
                Overlay comparison showing performance gains across precision, recall, and F1-score dimensions after hyperparameter tuning.
              </p>
            </div>
          </div>
          <MetricsRadar beforeHPO={metrics.beforeHPO} afterHPO={metrics.afterHPO} />
        </motion.div>

      </div>
    </div>
  )
}

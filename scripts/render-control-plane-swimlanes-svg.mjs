#!/usr/bin/env node
/**
 * Render the control-plane swimlane diagram as a static SVG.
 * Layout SSOT mirrors .cursor/canvases/cp-control-plane-architecture.canvas.tsx
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "../assets/diagrams");
const OUT_FILE = join(OUT_DIR, "architecture-agent-control-plane-swimlanes.svg");

const SCALE = 1.35;

const LANES = [
  { id: "human", title: "Human", items: ["Human judgment"] },
  {
    id: "surfaces",
    title: "Client surfaces",
    items: [
      "Agent workspace",
      "Operations dashboard",
      "Executive control panel",
      "Delegation interface",
    ],
  },
  {
    id: "orchestration",
    title: "Orchestration",
    items: [
      "Context enrichment",
      "Orchestration agent",
      "Specialist lane agents",
      "Scheduled automations",
      "Single-writer gate",
    ],
  },
  {
    id: "business",
    title: "Business systems",
    items: [
      "Knowledge base",
      "CRM platform",
      "Web data API",
      "Meeting intelligence",
    ],
  },
  {
    id: "identity",
    title: "Identity & policy",
    items: ["Decision log", "Agent registry", "Task registry"],
  },
  {
    id: "evidence",
    title: "Evidence & memory",
    items: [
      "Skills · docs repository",
      "Document hub",
      "Operations telemetry",
    ],
  },
  {
    id: "productivity",
    title: "Productivity & dev",
    items: ["Email", "Calendar", "Cloud storage", "Source control · CI"],
  },
];

const REPO_ITEMS = ["Skills library", "Quality harness", "Automation catalog"];
const MODEL_ITEMS = ["Primary LLM", "Secondary LLM", "Audit model"];

const COLORS = {
  stroke: "#4B5E78",
  laneStroke: "#3C245F",
  laneFillA: "#0C1226",
  laneFillB: "#111A33",
  fg: "#FFFFFF",
  surface: "#111A33",
  accent: "#6A4D9A",
  accentSoft: "rgba(60, 36, 95, 0.55)",
  laneTitle: "#B9A6DF",
  spine: "#64748B",
  dashed: "#94A3B8",
  loop: "#7DB8A8",
  bg: "#0C1226",
};

const DASH_STYLE = ' stroke-dasharray="7 5"';
const LOOP_STYLE = ' stroke-dasharray="9 4"';

/** Perimeter rails keep connectors outside swimlanes and bands */
const LEFT_RAIL_MODEL_X = -32;
const LEFT_RAIL_LOOP_X = -12;
const LEFT_RAIL_SUPPORT_X = 48;
const LEGEND_W = 340 * SCALE;
const LEGEND_PAD = 12 * SCALE;
const GUIDE_GAP = 12 * SCALE;
const RIGHT_RAIL_INSET = 12;
const MARKER_OVERFLOW = 10 * SCALE;
const VIEWBOX_PAD_H = Math.max(
  Math.ceil(Math.abs(LEFT_RAIL_MODEL_X) + MARKER_OVERFLOW + 20),
  Math.ceil(RIGHT_RAIL_INSET * SCALE + MARKER_OVERFLOW + 20),
  80,
);
const VIEWBOX_PAD_LEFT = VIEWBOX_PAD_H;
const VIEWBOX_PAD_RIGHT = VIEWBOX_PAD_H;
const VIEWBOX_PAD_BOTTOM = 20;
const SUMMARY_TITLE_COLOR = COLORS.loop;

function legendMetrics() {
  const lineH = 14 * SCALE;
  const padTop = 18 * SCALE;
  const padBottom = 16 * SCALE;
  const lastRow = padTop + lineH * 5.1 + 10 * SCALE;
  return { lineH, padTop, padBottom, height: lastRow + padBottom };
}

const READ_ORDER = {
  title: "Read order",
  subtitle: "Trace the diagram in this sequence",
  steps: [
    "Follow the solid spine · canonical write path",
    "Procedure library + model layer · execution stack",
    "Grey dash · Integration side channels and model access",
    "Teal dash · feedback into judgment and procedures",
  ],
};

function readOrderPanelMetrics() {
  const lineH = 14 * SCALE;
  const padTop = 18 * SCALE;
  const padBottom = 16 * SCALE;
  const stepCount = READ_ORDER.steps.length;
  const lastRow = padTop + lineH * (2.2 + (stepCount - 1) * 1.3 + 0.3);
  return { lineH, padTop, padBottom, height: lastRow + padBottom + 10 * SCALE };
}

const LAYOUT = {
  padX: 16 * SCALE,
  laneWidth: 128 * SCALE,
  laneGap: 36 * SCALE,
  productivityLeadGap: 56 * SCALE,
  productivityBoxGapExtra: 8 * SCALE,
  laneHeaderH: 28 * SCALE,
  boxH: 34 * SCALE,
  boxGap: 10 * SCALE,
  bandBoxH: 32 * SCALE,
  bandGap: 16 * SCALE,
  bandPadX: 20 * SCALE,
  titleY: 22 * SCALE,
  procedureY: 38 * SCALE,
  procedureH: 78 * SCALE,
  laneHeaderY: 136 * SCALE,
  laneBodyY: 168 * SCALE,
  laneBodyBottom: 548 * SCALE,
  integrationBandPad: 18 * SCALE,
  integrationBandH: 112 * SCALE,
  modelPad: 18 * SCALE,
  modelH: 78 * SCALE,
};

const INTEGRATION_BAND_Y = LAYOUT.laneBodyBottom + LAYOUT.integrationBandPad;
const MODEL_Y = INTEGRATION_BAND_Y + LAYOUT.integrationBandH + LAYOUT.modelPad;
const RETURN_RAIL_Y = MODEL_Y + LAYOUT.modelH + 16 * SCALE;
const TOP_LOOP_Y = LAYOUT.procedureY - 22 * SCALE;
const FEEDBACK_CORRIDOR_Y = LAYOUT.laneBodyBottom - 12 * SCALE;

function rightRailX(totalW) {
  return totalW + RIGHT_RAIL_INSET * SCALE;
}

const PRODUCTIVITY_LANE_INDEX = LANES.findIndex((lane) => lane.id === "productivity");

function diagramWidth() {
  return (
    LANES.length * LAYOUT.laneWidth +
    (LANES.length - 1) * LAYOUT.laneGap +
    LAYOUT.padX * 2 +
    LAYOUT.productivityLeadGap
  );
}

function laneX(index) {
  let x = LAYOUT.padX + index * (LAYOUT.laneWidth + LAYOUT.laneGap);
  if (index >= PRODUCTIVITY_LANE_INDEX) {
    x += LAYOUT.productivityLeadGap;
  }
  return x;
}

function bandInnerWidth() {
  return diagramWidth() - LAYOUT.bandPadX * 2;
}

function itemGap(laneId) {
  return laneId === "productivity"
    ? LAYOUT.boxGap + LAYOUT.productivityBoxGapExtra
    : LAYOUT.boxGap;
}

function stackStartY(itemCount, laneId) {
  const gap = itemGap(laneId);
  const stackH = itemCount * LAYOUT.boxH + (itemCount - 1) * gap;
  const areaH = LAYOUT.laneBodyBottom - LAYOUT.laneBodyY - 16 * SCALE;
  return LAYOUT.laneBodyY + 8 * SCALE + Math.max(0, (areaH - stackH) / 2);
}

function layoutBandRow(labels, bandX, bandW, bandY, bandH, laneId, prefix, hubIndex) {
  const count = labels.length;
  const totalGap = LAYOUT.bandGap * (count - 1);
  const boxW = (bandW - totalGap) / count;
  const boxY = bandY + 26 * SCALE + (bandH - 26 * SCALE - LAYOUT.bandBoxH) / 2;
  return labels.map((label, i) => ({
    id: `${prefix}-${i}`,
    laneId,
    label,
    x: bandX + i * (boxW + LAYOUT.bandGap),
    y: boxY,
    w: boxW,
    h: LAYOUT.bandBoxH,
    hub: hubIndex === i,
  }));
}

function buildNodes() {
  const nodes = [];
  LANES.forEach((lane, laneIndex) => {
    const x = laneX(laneIndex);
    const gap = itemGap(lane.id);
    const startY = stackStartY(lane.items.length, lane.id);
    lane.items.forEach((label, i) => {
      nodes.push({
        id: `${lane.id}-${i}`,
        laneId: lane.id,
        label,
        x,
        y: startY + i * (LAYOUT.boxH + gap),
        w: LAYOUT.laneWidth,
        h: LAYOUT.boxH,
        accent: lane.id === "orchestration",
        accentBar: lane.id === "orchestration" && i === 0,
        hub:
          (lane.id === "human" && i === 0) ||
          (lane.id === "surfaces" && i === 0) ||
          (lane.id === "orchestration" && (i === 0 || i === 4)) ||
          (lane.id === "business" && i === 0) ||
          (lane.id === "identity" && i === 1) ||
          (lane.id === "evidence" && i === 2),
      });
    });
  });
  nodes.push(
    ...layoutBandRow(
      REPO_ITEMS,
      LAYOUT.bandPadX,
      bandInnerWidth(),
      LAYOUT.procedureY,
      LAYOUT.procedureH,
      "repo",
      "repo",
      0,
    ),
  );
  nodes.push(
    ...layoutBandRow(
      MODEL_ITEMS,
      LAYOUT.bandPadX,
      bandInnerWidth(),
      MODEL_Y,
      LAYOUT.modelH,
      "models",
      "model",
      0,
    ),
  );
  return nodes;
}

const NODES = buildNodes();
const findNode = (id) => NODES.find((n) => n.id === id);
const nid = (laneId, index) => `${laneId}-${index}`;

const SPINE = [
  [nid("human", 0), nid("surfaces", 0)],
  [nid("surfaces", 0), nid("orchestration", 0)],
  [nid("orchestration", 4), nid("business", 0)],
  [nid("business", 0), nid("identity", 1)],
  [nid("identity", 1), nid("evidence", 2)],
];

const ORCH_CHAIN = [
  [nid("orchestration", 0), nid("orchestration", 1)],
  [nid("orchestration", 1), nid("orchestration", 2)],
  [nid("orchestration", 2), nid("orchestration", 3)],
  [nid("orchestration", 3), nid("orchestration", 4)],
];

const SUPPORT = [["repo-0", nid("orchestration", 0)]];

/** Dashed connector side channels into Productivity & dev */
const INTEGRATION_LINKS = [
  [nid("business", 0), nid("productivity", 0)],
  [nid("orchestration", 3), nid("productivity", 1)],
  [nid("evidence", 1), nid("productivity", 2)],
  ["repo-2", nid("productivity", 3)],
];

const LEFT_RAIL_LINK = ["repo-0", "model-0"];

/** Feedback loops: evidence → judgment and procedure versioning */
const OPTIMIZATION_LOOP = [nid("evidence", 2), nid("human", 0)];
const PROCEDURE_LOOP = [nid("evidence", 0), "repo-0"];

function esc(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function verticalPoint(node, side) {
  return {
    x: node.x + node.w / 2,
    y: side === "bottom" ? node.y + node.h : node.y,
  };
}

function sidePoint(node, side) {
  return {
    x: side === "right" ? node.x + node.w : node.x,
    y: node.y + node.h / 2,
  };
}

/** Hub-to-hub spine: exit right, travel in lane gap, enter left. No shared midline. */
function spinePath(from, to) {
  const start = sidePoint(from, "right");
  const end = sidePoint(to, "left");
  const gapMidX = start.x + (end.x - start.x) / 2;

  if (Math.abs(start.y - end.y) < 0.5) {
    return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
  }
  return `M ${start.x} ${start.y} L ${gapMidX} ${start.y} L ${gapMidX} ${end.y} L ${end.x} ${end.y}`;
}

function renderLinkLabel(x, y, text, anchor = "start") {
  return `<text x="${x}" y="${y}" fill="${COLORS.dashed}" font-family="Outfit, DM Sans, system-ui, sans-serif" font-size="${8.5 * SCALE}" text-anchor="${anchor}">${esc(text)}</text>`;
}

function renderSupport(fromId, toId) {
  const from = findNode(fromId);
  const to = findNode(toId);
  if (!from || !to) return "";

  const marker = ' marker-end="url(#arrow)"';

  if (from.laneId === "repo") {
    const start = verticalPoint(from, "bottom");
    const end = verticalPoint(to, "top");
    const gapY = LAYOUT.laneHeaderY - 6 * SCALE;
    return `<path d="M ${start.x} ${start.y} L ${LEFT_RAIL_SUPPORT_X} ${start.y} L ${LEFT_RAIL_SUPPORT_X} ${gapY} L ${end.x} ${gapY} L ${end.x} ${end.y}" fill="none" stroke="${COLORS.stroke}" stroke-width="1.5"${marker}/>`;
  }

  return "";
}

function renderLeftRailLink(fromId, toId) {
  const from = findNode(fromId);
  const to = findNode(toId);
  if (!from || !to) return "";

  const start = sidePoint(from, "left");
  const end = sidePoint(to, "left");
  const labelY = (start.y + end.y) / 2;
  return [
    `<path d="M ${start.x} ${start.y} L ${LEFT_RAIL_MODEL_X} ${start.y} L ${LEFT_RAIL_MODEL_X} ${end.y} L ${end.x} ${end.y}" fill="none" stroke="${COLORS.dashed}" stroke-width="1.5"${DASH_STYLE} marker-end="url(#arrow-dashed)"/>`,
    renderLinkLabel(LEFT_RAIL_MODEL_X + 5 * SCALE, labelY, "model access"),
  ].join("\n");
}

function integrationCorridorY(index, total) {
  const step = LAYOUT.integrationBandH / (total + 1);
  return INTEGRATION_BAND_Y + step * (index + 1);
}

function integrationLinkPath(from, to, corridorY, totalW) {
  const end = sidePoint(to, "right");
  const rightX = rightRailX(totalW);

  if (from.laneId === "repo") {
    const start = verticalPoint(from, "bottom");
    return `M ${start.x} ${start.y} L ${start.x} ${corridorY} L ${rightX} ${corridorY} L ${rightX} ${end.y} L ${end.x} ${end.y}`;
  }

  const start = sidePoint(from, "right");
  const dropX = start.x + 20 * SCALE;
  return `M ${start.x} ${start.y} L ${dropX} ${start.y} L ${dropX} ${corridorY} L ${rightX} ${corridorY} L ${rightX} ${end.y} L ${end.x} ${end.y}`;
}

function renderIntegrationLink(fromId, toId, corridorIndex, total, totalW) {
  const from = findNode(fromId);
  const to = findNode(toId);
  if (!from || !to) return "";

  const corridorY = integrationCorridorY(corridorIndex, total);
  return `<path d="${integrationLinkPath(from, to, corridorY, totalW)}" fill="none" stroke="${COLORS.dashed}" stroke-width="1.5"${DASH_STYLE} marker-end="url(#arrow-dashed)"/>`;
}

function renderOptimizationLoop(fromId, toId) {
  const from = findNode(fromId);
  const to = findNode(toId);
  if (!from || !to) return "";

  const start = verticalPoint(from, "bottom");
  const end = sidePoint(to, "left");
  const corridorY = FEEDBACK_CORRIDOR_Y;
  const labelX = LEFT_RAIL_LOOP_X + 5 * SCALE;
  const labelY = (corridorY + end.y) / 2;

  return [
    `<path d="M ${start.x} ${start.y} L ${start.x} ${corridorY} L ${LEFT_RAIL_LOOP_X} ${corridorY} L ${LEFT_RAIL_LOOP_X} ${end.y} L ${end.x} ${end.y}" fill="none" stroke="${COLORS.loop}" stroke-width="1.5"${LOOP_STYLE} marker-end="url(#arrow-loop)"/>`,
    `<text x="${labelX}" y="${labelY}" fill="${COLORS.loop}" font-family="Outfit, DM Sans, system-ui, sans-serif" font-size="${8.5 * SCALE}">evidence → judgment</text>`,
  ].join("\n");
}

function renderProcedureLoop(fromId, toId) {
  const from = findNode(fromId);
  const to = findNode(toId);
  if (!from || !to) return "";

  const start = verticalPoint(from, "top");
  const end = { x: to.x + to.w / 2, y: to.y };
  const labelX = (start.x + end.x) / 2;

  return [
    `<path d="M ${start.x} ${start.y} L ${start.x} ${TOP_LOOP_Y} L ${end.x} ${TOP_LOOP_Y} L ${end.x} ${end.y}" fill="none" stroke="${COLORS.loop}" stroke-width="1.5"${LOOP_STYLE} marker-end="url(#arrow-loop)"/>`,
    `<text x="${labelX}" y="${TOP_LOOP_Y - 6 * SCALE}" fill="${COLORS.loop}" font-family="Outfit, DM Sans, system-ui, sans-serif" font-size="${8.5 * SCALE}" text-anchor="middle">procedure versioning</text>`,
  ].join("\n");
}

function renderIntegrationBand(totalW) {
  return [
    `<rect x="${LAYOUT.padX}" y="${INTEGRATION_BAND_Y}" width="${totalW - LAYOUT.padX * 2}" height="${LAYOUT.integrationBandH}" fill="${COLORS.laneFillB}" stroke="${COLORS.laneStroke}" stroke-width="1" rx="6" opacity="0.85"/>`,
    `<text x="${LAYOUT.padX + 12 * SCALE}" y="${INTEGRATION_BAND_Y + 16 * SCALE}" fill="${COLORS.dashed}" font-family="Outfit, DM Sans, system-ui, sans-serif" font-size="${8.5 * SCALE}">Integration side channels · perimeter routing into Productivity &amp; dev</text>`,
  ].join("\n");
}

function renderReadOrderPanel(totalW, y) {
  const { lineH, padTop, height } = readOrderPanelMetrics();
  const x = totalW - LEGEND_W - LEGEND_PAD;
  const fs = 8.5 * SCALE;
  const titleFs = 9.5 * SCALE;
  const font = "Outfit, DM Sans, system-ui, sans-serif";

  const parts = [
    `<rect x="${x}" y="${y}" width="${LEGEND_W}" height="${height}" fill="${COLORS.laneFillA}" stroke="${COLORS.laneStroke}" stroke-width="1" rx="6" opacity="0.95"/>`,
    `<text x="${x + 12 * SCALE}" y="${y + padTop}" fill="${COLORS.laneTitle}" font-family="${font}" font-size="${titleFs}" font-weight="600">${esc(READ_ORDER.title)}</text>`,
    `<text x="${x + 12 * SCALE}" y="${y + padTop + lineH}" fill="${COLORS.dashed}" font-family="${font}" font-size="${fs}">${esc(READ_ORDER.subtitle)}</text>`,
  ];

  READ_ORDER.steps.forEach((step, index) => {
    const rowY = y + padTop + lineH * (2.2 + index * 1.3);
    parts.push(
      `<text x="${x + 12 * SCALE}" y="${rowY}" fill="${SUMMARY_TITLE_COLOR}" font-family="${font}" font-size="${fs}" font-weight="600">${index + 1}.</text>`,
      `<text x="${x + 28 * SCALE}" y="${rowY}" fill="${COLORS.fg}" font-family="${font}" font-size="${fs}">${esc(step)}</text>`,
    );
  });

  return { markup: parts.join("\n"), height };
}

function renderLegend(totalW, y) {
  const { lineH, padTop, height } = legendMetrics();
  const x = totalW - LEGEND_W - LEGEND_PAD;
  const fs = 8.5 * SCALE;
  const titleFs = 9.5 * SCALE;
  const font = "Outfit, DM Sans, system-ui, sans-serif";

  const parts = [
    `<rect x="${x}" y="${y}" width="${LEGEND_W}" height="${height}" fill="${COLORS.laneFillA}" stroke="${COLORS.laneStroke}" stroke-width="1" rx="6" opacity="0.95"/>`,
    `<text x="${x + 12 * SCALE}" y="${y + padTop}" fill="${COLORS.laneTitle}" font-family="${font}" font-size="${titleFs}" font-weight="600">Reference flow</text>`,
    `<text x="${x + 12 * SCALE}" y="${y + padTop + lineH}" fill="${COLORS.dashed}" font-family="${font}" font-size="${fs}">Left to right along spine · feedback loops close the cycle</text>`,
    `<line x1="${x + 12 * SCALE}" y1="${y + padTop + lineH * 2.2}" x2="${x + 36 * SCALE}" y2="${y + padTop + lineH * 2.2}" stroke="${COLORS.stroke}" stroke-width="2"/>`,
    `<text x="${x + 44 * SCALE}" y="${y + padTop + lineH * 2.5}" fill="${COLORS.fg}" font-family="${font}" font-size="${fs}">Solid · spine and procedure feed</text>`,
    `<line x1="${x + 12 * SCALE}" y1="${y + padTop + lineH * 3.5}" x2="${x + 36 * SCALE}" y2="${y + padTop + lineH * 3.5}" stroke="${COLORS.dashed}" stroke-width="1.5"${DASH_STYLE}/>`,
    `<text x="${x + 44 * SCALE}" y="${y + padTop + lineH * 3.8}" fill="${COLORS.fg}" font-family="${font}" font-size="${fs}">Grey dash · Integration side channels and model access</text>`,
    `<line x1="${x + 12 * SCALE}" y1="${y + padTop + lineH * 4.8}" x2="${x + 36 * SCALE}" y2="${y + padTop + lineH * 4.8}" stroke="${COLORS.loop}" stroke-width="1.5"${LOOP_STYLE}/>`,
    `<text x="${x + 44 * SCALE}" y="${y + padTop + lineH * 5.1}" fill="${COLORS.fg}" font-family="${font}" font-size="${fs}">Teal dash · feedback loops</text>`,
  ];

  return { markup: parts.join("\n"), height };
}

function renderRightGuides(totalW) {
  const legendY = RETURN_RAIL_Y + 10 * SCALE;
  const legend = renderLegend(totalW, legendY);
  const readOrderY = legendY + legend.height + GUIDE_GAP;
  const readOrder = renderReadOrderPanel(totalW, readOrderY);
  return {
    markup: [legend.markup, readOrder.markup].join("\n"),
    totalHeight: readOrderY + readOrder.height - legendY,
    bottomY: readOrderY + readOrder.height,
  };
}

function renderSvg() {
  const totalW = diagramWidth();
  const labelSize = 11 * SCALE * 0.72;
  const bandLabelSize = 10 * SCALE * 0.72;
  const headerSize = 11 * SCALE * 0.72;
  const laneHeaderSize = 10 * SCALE * 0.72;
  const legendY = RETURN_RAIL_Y + 10 * SCALE;
  const rightGuides = renderRightGuides(totalW);
  const diagramH = rightGuides.bottomY + VIEWBOX_PAD_BOTTOM;

  const parts = [];
  parts.push(`<?xml version="1.0" encoding="UTF-8"?>`);
  const viewW = totalW + VIEWBOX_PAD_LEFT + VIEWBOX_PAD_RIGHT;
  parts.push(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-VIEWBOX_PAD_LEFT} 0 ${viewW} ${diagramH}" width="${Math.round(viewW)}" height="${Math.round(diagramH)}" role="img" aria-label="Agent control plane swimlane architecture">`,
  );
  parts.push(`<rect x="${-VIEWBOX_PAD_LEFT}" width="${viewW}" height="100%" fill="${COLORS.bg}"/>`);
  parts.push(`<defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="${COLORS.stroke}"/></marker><marker id="arrow-dashed" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="${COLORS.dashed}"/></marker><marker id="arrow-loop" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="${COLORS.loop}"/></marker></defs>`);
  parts.push(
    `<text x="${20 * SCALE}" y="${LAYOUT.titleY}" fill="${COLORS.laneTitle}" font-family="Outfit, DM Sans, system-ui, sans-serif" font-size="${headerSize}" font-weight="600">Agent control plane · swimlane architecture</text>`,
  );

  parts.push(
    `<rect x="${LAYOUT.padX}" y="${LAYOUT.procedureY}" width="${totalW - LAYOUT.padX * 2}" height="${LAYOUT.procedureH}" fill="${COLORS.laneFillA}" stroke="${COLORS.laneStroke}" stroke-width="1.5" rx="8"/>`,
  );
  parts.push(
    `<text x="${LAYOUT.padX + 12 * SCALE}" y="${LAYOUT.procedureY + 18 * SCALE}" fill="${COLORS.laneTitle}" font-family="Outfit, DM Sans, system-ui, sans-serif" font-size="${headerSize}" font-weight="600">Procedure library</text>`,
  );

  parts.push(
    `<rect x="${LAYOUT.padX}" y="${MODEL_Y}" width="${totalW - LAYOUT.padX * 2}" height="${LAYOUT.modelH}" fill="${COLORS.laneFillB}" stroke="${COLORS.laneStroke}" stroke-width="1.5" rx="8"/>`,
  );
  parts.push(
    `<text x="${LAYOUT.padX + 12 * SCALE}" y="${MODEL_Y + 18 * SCALE}" fill="${COLORS.laneTitle}" font-family="Outfit, DM Sans, system-ui, sans-serif" font-size="${headerSize}" font-weight="600">Model layer · dashed link from procedure library</text>`,
  );

  LANES.forEach((lane, i) => {
    const x = laneX(i);
    const fill = i % 2 === 0 ? COLORS.laneFillA : COLORS.laneFillB;
    const bodyH = LAYOUT.laneBodyBottom - LAYOUT.laneBodyY;
    parts.push(
      `<rect x="${x}" y="${LAYOUT.laneBodyY}" width="${LAYOUT.laneWidth}" height="${bodyH}" fill="${fill}" stroke="${COLORS.laneStroke}" stroke-width="1"/>`,
    );
    parts.push(
      `<rect x="${x}" y="${LAYOUT.laneHeaderY}" width="${LAYOUT.laneWidth}" height="${LAYOUT.laneHeaderH}" fill="${COLORS.accentSoft}" stroke="${COLORS.laneStroke}" stroke-width="1"/>`,
    );
    parts.push(
      `<text x="${x + LAYOUT.laneWidth / 2}" y="${LAYOUT.laneHeaderY + 18 * SCALE}" fill="${COLORS.laneTitle}" font-family="Outfit, DM Sans, system-ui, sans-serif" font-size="${laneHeaderSize}" font-weight="600" text-anchor="middle">${esc(lane.title)}</text>`,
    );
  });

  for (const [fromId, toId] of ORCH_CHAIN) {
    const from = findNode(fromId);
    const to = findNode(toId);
    if (!from || !to) continue;
    const start = verticalPoint(from, "bottom");
    const end = verticalPoint(to, "top");
    parts.push(
      `<line x1="${start.x}" y1="${start.y}" x2="${end.x}" y2="${end.y}" stroke="${COLORS.stroke}" stroke-width="1.5" marker-end="url(#arrow)"/>`,
    );
  }

  for (const [fromId, toId] of SPINE) {
    const from = findNode(fromId);
    const to = findNode(toId);
    if (!from || !to) continue;
    parts.push(
      `<path d="${spinePath(from, to)}" fill="none" stroke="${COLORS.stroke}" stroke-width="1.5" marker-end="url(#arrow)"/>`,
    );
  }

  for (const [fromId, toId] of SUPPORT) {
    parts.push(renderSupport(fromId, toId));
  }

  for (const node of NODES) {
    const fill = node.accentBar
      ? COLORS.accent
      : node.accent
        ? COLORS.accentSoft
        : COLORS.surface;
    const textColor = node.accentBar ? COLORS.fg : COLORS.fg;
    const border = node.hub ? COLORS.accent : COLORS.laneStroke;
    const strokeW = node.hub ? 2 : 1;
    const weight = node.hub ? 600 : 500;
    const size =
      node.laneId === "repo" || node.laneId === "models" ? bandLabelSize : labelSize;
    parts.push(
      `<rect x="${node.x}" y="${node.y}" width="${node.w}" height="${node.h}" rx="5" fill="${fill}" stroke="${border}" stroke-width="${strokeW}"/>`,
    );
    parts.push(
      `<text x="${node.x + 8 * SCALE}" y="${node.y + 21 * SCALE}" fill="${textColor}" font-family="Outfit, DM Sans, system-ui, sans-serif" font-size="${size}" font-weight="${weight}">${esc(node.label)}</text>`,
    );
  }

  parts.push(renderLeftRailLink(LEFT_RAIL_LINK[0], LEFT_RAIL_LINK[1]));
  parts.push(renderIntegrationBand(totalW));
  INTEGRATION_LINKS.forEach(([fromId, toId], index) => {
    parts.push(renderIntegrationLink(fromId, toId, index, INTEGRATION_LINKS.length, totalW));
  });
  parts.push(renderOptimizationLoop(OPTIMIZATION_LOOP[0], OPTIMIZATION_LOOP[1]));
  parts.push(renderProcedureLoop(PROCEDURE_LOOP[0], PROCEDURE_LOOP[1]));
  parts.push(rightGuides.markup);

  parts.push("</svg>");
  return parts.join("\n");
}

writeFileSync(OUT_FILE, renderSvg(), "utf8");
console.log(`Wrote ${OUT_FILE}`);

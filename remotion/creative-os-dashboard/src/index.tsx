import type { CSSProperties } from "react";
import { Composition, Easing, interpolate, registerRoot, spring, useCurrentFrame, useVideoConfig } from "remotion";

type Module = {
  label: string;
  workflow: string;
  title: string;
  kpi: string;
  caption: string;
  bars: number[];
  path: string;
};

const modules: Module[] = [
  {
    label: "Creative OS",
    workflow: "OS",
    title: "One operating surface for creative client work",
    kpi: "7-10",
    caption: "Tools consolidated",
    bars: [0.9, 0.72, 0.56],
    path: "M4 76 L42 68 L80 58 L118 50 L156 38 L198 26 L232 18",
  },
  {
    label: "Overview",
    workflow: "Overview",
    title: "See every client job from lead to delivery",
    kpi: "18",
    caption: "Open work",
    bars: [0.8, 0.61, 0.47],
    path: "M4 70 L42 68 L80 60 L118 58 L156 42 L198 34 L232 28",
  },
  {
    label: "CRM",
    workflow: "Sell",
    title: "Turn every contact into an operational client record",
    kpi: "42",
    caption: "Qualified contacts",
    bars: [0.78, 0.58, 0.42],
    path: "M4 74 L42 66 L80 58 L118 48 L156 36 L198 26 L232 14",
  },
  {
    label: "Projects",
    workflow: "Produce",
    title: "Run production with tasks, files, and owners connected",
    kpi: "4",
    caption: "Active projects",
    bars: [0.86, 0.69, 0.44],
    path: "M4 76 L42 69 L80 64 L118 50 L156 46 L198 30 L232 22",
  },
  {
    label: "Media Review",
    workflow: "Review",
    title: "Centralize feedback, versions, and approval history",
    kpi: "2.1d",
    caption: "Approval velocity",
    bars: [0.64, 0.49, 0.36],
    path: "M4 70 L42 73 L80 60 L118 64 L156 44 L198 38 L232 26",
  },
  {
    label: "Calendar",
    workflow: "Schedule",
    title: "Coordinate bookings, crew, studio time, and reminders",
    kpi: "71%",
    caption: "Booked capacity",
    bars: [0.72, 0.64, 0.51],
    path: "M4 68 L44 52 L84 55 L124 38 L164 32 L204 22 L232 24",
  },
  {
    label: "Billing",
    workflow: "Deliver",
    title: "Tie deposits, balances, and invoices to milestones",
    kpi: "$24.8k",
    caption: "Ready to invoice",
    bars: [0.88, 0.74, 0.57],
    path: "M4 78 L42 70 L80 62 L118 54 L156 46 L198 28 L232 18",
  },
  {
    label: "Client Portal",
    workflow: "Deliver",
    title: "Give clients one place to approve, pay, and download",
    kpi: "12",
    caption: "Portal actions",
    bars: [0.76, 0.66, 0.52],
    path: "M4 80 L42 70 L80 66 L118 52 L156 44 L198 34 L232 20",
  },
];

const accent = "#32ead8";
const green = "#7df59b";
const text = "#f6fbff";
const muted = "#9aa8b7";
const panel = "#101d29";

const Dashboard = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const moduleIndex = Math.min(modules.length - 1, Math.floor(frame / (1.7 * fps)));
  const module = modules[moduleIndex];
  const localFrame = frame - moduleIndex * 1.7 * fps;
  const intro = interpolate(localFrame, [0, 0.7 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const lineProgress = interpolate(localFrame, [0.2 * fps, 1.2 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <div style={styles.root}>
      <div style={styles.window}>
        <div style={styles.chrome}>
          <span style={styles.dot} />
          <span style={styles.dot} />
          <span style={styles.dot} />
          <strong style={styles.chromeTitle}>Create 13 Group / Creative OS</strong>
        </div>
        <div style={styles.body}>
          <aside style={styles.side}>
            <span style={styles.parent}>Create 13 Group</span>
            <strong style={styles.product}>Creative OS</strong>
            {modules.map((item, index) => (
              <span key={item.label} style={index === moduleIndex ? styles.sideItemActive : styles.sideItem}>
                {item.label}
              </span>
            ))}
          </aside>
          <main style={styles.main}>
            <span style={styles.eyebrow}>{module.workflow} module</span>
            <h1 style={{ ...styles.title, opacity: intro, transform: `translateY(${(1 - intro) * 16}px)` }}>{module.title}</h1>
            <div style={styles.tabs}>
              {["Sell", "Schedule", "Produce", "Review", "Deliver"].map((item) => (
                <span key={item} style={item === module.workflow ? styles.tabActive : styles.tab}>
                  {item}
                </span>
              ))}
            </div>
            <div style={styles.grid}>
              <div style={styles.card}>
                <span style={styles.label}>{module.caption}</span>
                <strong style={styles.kpi}>{module.kpi}</strong>
                {module.bars.map((value, index) => {
                  const width = spring({ frame: localFrame - index * 5, fps, config: { damping: 200 } }) * value * 100;
                  return (
                    <span key={index} style={styles.barTrack}>
                      <span style={{ ...styles.bar, width: `${width}%` }} />
                    </span>
                  );
                })}
              </div>
              <div style={styles.card}>
                <span style={styles.label}>Revenue momentum</span>
                <svg viewBox="0 0 240 92" style={styles.chart}>
                  <path d={`${module.path} L232 88 L4 88 Z`} fill="rgba(50,234,216,0.16)" />
                  <path
                    d={module.path}
                    fill="none"
                    stroke={accent}
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="340"
                    strokeDashoffset={340 - lineProgress * 340}
                  />
                </svg>
              </div>
              <div style={styles.card}>
                <span style={styles.label}>Client activity</span>
                <strong style={styles.smallKpi}>Live handoff</strong>
                <p style={styles.copy}>Each module keeps the client, work, billing, and next action connected to one record.</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, CSSProperties> = {
  root: {
    width: "100%",
    height: "100%",
    display: "grid",
    placeItems: "center",
    background: "linear-gradient(135deg, #05090d, #07131d)",
    fontFamily: "Inter, Arial, sans-serif",
    color: text,
  },
  window: {
    width: 1180,
    height: 680,
    overflow: "hidden",
    border: "1px solid rgba(143,171,190,0.28)",
    borderRadius: 8,
    background: "#0b1722",
    boxShadow: "0 30px 100px rgba(0,0,0,0.4)",
  },
  chrome: { height: 46, display: "flex", alignItems: "center", gap: 8, padding: "0 18px", borderBottom: "1px solid rgba(143,171,190,0.22)" },
  dot: { width: 9, height: 9, borderRadius: 99, background: "#6d7883" },
  chromeTitle: { marginLeft: 10, color: muted, fontSize: 13 },
  body: { display: "grid", gridTemplateColumns: "210px 1fr", height: 634 },
  side: { padding: 28, borderRight: "1px solid rgba(143,171,190,0.22)", display: "flex", flexDirection: "column", gap: 13 },
  parent: { color: green, fontSize: 12, fontWeight: 800, textTransform: "uppercase" },
  product: { fontSize: 24 },
  sideItem: { color: muted, fontWeight: 700, padding: "8px 10px", border: "1px solid transparent", borderRadius: 8 },
  sideItemActive: { color: text, fontWeight: 800, padding: "8px 10px", border: "1px solid rgba(50,234,216,0.38)", borderRadius: 8, background: "rgba(50,234,216,0.08)" },
  main: { padding: 36 },
  eyebrow: { color: muted, fontSize: 13, fontWeight: 800, textTransform: "uppercase" },
  title: { margin: "8px 0 22px", maxWidth: 680, fontSize: 42, lineHeight: 1.02 },
  tabs: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 18 },
  tab: { minHeight: 46, display: "grid", placeItems: "center", color: muted, border: "1px solid rgba(143,171,190,0.22)", borderRadius: 8, fontWeight: 800 },
  tabActive: { minHeight: 46, display: "grid", placeItems: "center", color: "#061012", borderRadius: 8, fontWeight: 900, background: `linear-gradient(135deg, ${accent}, ${green})` },
  grid: { display: "grid", gridTemplateColumns: "1fr 1.2fr 1fr", gap: 16 },
  card: { minHeight: 230, padding: 24, background: panel, border: "1px solid rgba(143,171,190,0.22)", borderRadius: 8 },
  label: { display: "block", color: muted, fontSize: 14, fontWeight: 800, marginBottom: 12 },
  kpi: { display: "block", fontSize: 48, marginBottom: 28 },
  smallKpi: { display: "block", fontSize: 28, marginBottom: 16 },
  copy: { color: muted, fontSize: 18, lineHeight: 1.45 },
  barTrack: { display: "block", height: 10, marginTop: 14, borderRadius: 99, background: "rgba(255,255,255,0.08)", overflow: "hidden" },
  bar: { display: "block", height: "100%", borderRadius: 99, background: `linear-gradient(90deg, ${accent}, ${green})` },
  chart: { width: "100%", height: 170, marginTop: 8 },
};

export const RemotionRoot = () => (
  <Composition id="CreativeOsDashboard" component={Dashboard} durationInFrames={420} fps={30} width={1920} height={1080} />
);

registerRoot(RemotionRoot);

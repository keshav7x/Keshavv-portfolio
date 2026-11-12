export function LogoMark({ size }: { size: number }) {
  const u = size / 64;
  const stroke = Math.round(11 * u);
  const box = Math.round(26 * u);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(160deg, #201E27 0%, #141318 70%)",
        borderRadius: Math.round(14 * u),
        boxShadow: `inset 0 0 0 ${Math.max(1, Math.round(u))}px rgba(236, 234, 240, 0.06)`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: box,
            height: box,
            borderLeft: `${stroke}px solid #91B6CC`,
            borderBottom: `${stroke}px solid #91B6CC`,
            transform: "rotate(-45deg)",
            marginTop: -10 * u,
          }}
        />
        <div
          style={{
            width: box,
            height: box,
            borderLeft: `${stroke}px solid #C49AAF`,
            borderBottom: `${stroke}px solid #C49AAF`,
            transform: "rotate(-45deg)",
            marginLeft: -6 * u,
            marginTop: 10 * u,
          }}
        />
      </div>
    </div>
  );
}

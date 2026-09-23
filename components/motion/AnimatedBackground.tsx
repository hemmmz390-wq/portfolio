const fields = [
  {
    className: "bg-drift-a left-[-15%] top-[-10%] h-[70vh] w-[70vw]",
    background: "radial-gradient(circle, rgba(255,43,214,0.16), transparent 68%)",
  },
  {
    className: "bg-drift-b right-[-20%] top-[25%] h-[80vh] w-[75vw]",
    background: "radial-gradient(circle, rgba(0,229,255,0.13), transparent 68%)",
  },
  {
    className: "bg-drift-c bottom-[-20%] left-[10%] h-[65vh] w-[65vw]",
    background: "radial-gradient(circle, rgba(176,38,255,0.14), transparent 68%)",
  },
];

export function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      {fields.map((field) => (
        <div
          key={field.className}
          className={`absolute rounded-full blur-[110px] ${field.className}`}
          style={{ background: field.background }}
        />
      ))}

      <div
        className="bg-grid-pan absolute inset-x-0 -top-20 bottom-[-20%] opacity-[0.55]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at 50% 40%, black 10%, transparent 72%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 40%, black 10%, transparent 72%)",
        }}
      />
    </div>
  );
}

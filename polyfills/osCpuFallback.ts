import os from "node:os";

try {
  os.cpus();
} catch (error) {
  console.warn(
    "os.cpus() not available; providing synthetic CPU info for tooling.",
    error instanceof Error ? error.message : error,
  );

  const fallback = [
    {
      model: "virtual",
      speed: 1000,
      times: { user: 0, nice: 0, sys: 0, idle: 0, irq: 0 },
    },
  ];

  (os as unknown as { cpus: () => typeof fallback }).cpus = () => fallback;
}

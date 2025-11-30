const denoRef = (globalThis as any).Deno;

if (denoRef && typeof denoRef.systemCpuInfo === "function") {
  let needsPatch = false;
  try {
    denoRef.systemCpuInfo();
  } catch (error) {
    needsPatch = true;
    console.warn(
      "Falling back to synthetic CPU info:",
      error instanceof Error ? error.message : error,
    );
  }

  if (needsPatch) {
    type CpuInfo = ReturnType<typeof denoRef.systemCpuInfo>;
    const fallback: CpuInfo = {
      architecture: "unknown",
      model: "virtual",
      coresPerSocket: 1,
      logicalCores: 1,
      sockets: 1,
    };

    (denoRef as unknown as { systemCpuInfo: () => CpuInfo }).systemCpuInfo =
      () => ({
        ...fallback,
      });
  }
}

<script lang="ts">
  // src/lib/utils/exportChartPNG.ts
  export async function exportChartPNG(
    node: HTMLElement,
    {
      fileName = "chart.png",
      margin = 16,
      backgroundColor = "#ffffff",
      pixelRatio = Math.max(2, window.devicePixelRatio || 1),
      filter,
    }: {
      fileName?: string;
      margin?: number; // padding applied during export to avoid edges clipping
      backgroundColor?: string;
      pixelRatio?: number;
      filter?: (node: Element) => boolean;
    },
  ): Promise<string> {
    const { toPng } = await import("html-to-image");

    // Wait for web fonts to settle (prevents text reflow/misalignment)
    if ((document as any).fonts?.ready) {
      try {
        await (document as any).fonts.ready;
      } catch {
        /* ignore */
      }
    }

    // Measure the true content size (includes overflow)
    const exportWidth = Math.ceil(node.scrollWidth + margin * 2);
    const exportHeight = Math.ceil(node.scrollHeight + margin * 2);

    const dataUrl = await toPng(node, {
      cacheBust: false,
      backgroundColor,
      pixelRatio,
      width: exportWidth,
      height: exportHeight,
      style: {
        // Apply padding inside the cloned element
        padding: `${margin}px`,
        boxSizing: "border-box",
        // Ensure no clipping
        overflow: "visible",
      },
      filter,
    });

    const name = fileName.toLowerCase().endsWith(".png")
      ? fileName
      : `${fileName}.png`;
    const link = document.createElement("a");
    link.download = name;
    link.href = dataUrl;
    link.click();

    return dataUrl;
  }

  // Props
  let {
    node = null,
    fileName = "chart",
  }: { node: HTMLElement | null; fileName?: string } = $props();

  // Local state for optional external triggering
  let isExporting = $state(false);

  async function exportNow() {
    if (!node) return;

    isExporting = true;

    // Measure width to force correct clone sizing
    const rect = node.getBoundingClientRect();
    const measuredWidth = Math.ceil(rect.width);

    // ------- Clone -------
    const clone = node.cloneNode(true) as HTMLElement;
    Object.assign(clone.style, {
      boxSizing: "border-box",
      width: `${measuredWidth}px`,
      height: "auto",
      transform: "none",
      overflow: "visible",
      fontFamily: "GDS Transport",
    });

    // ------- Hide tooltips (optional) -------
    const hideSelectors = ['[role="tooltip"]'];
    clone
      .querySelectorAll<HTMLElement>(hideSelectors.join(","))
      .forEach((el) => {
        el.style.display = "none";
      });

    // ------- Sandbox offscreen -------
    const sandbox = document.createElement("div");
    Object.assign(sandbox.style, {
      position: "fixed",
      left: "-10000px",
      top: "0",
      pointerEvents: "none",
    });

    sandbox.appendChild(clone);
    document.body.appendChild(sandbox);

    try {
      await exportChartPNG(clone, {
        fileName,
        margin: 16,
        backgroundColor: "#ffffff",
        pixelRatio: Math.max(2, window.devicePixelRatio || 1),
        filter: (el: Element) => {
          if (!(el instanceof HTMLElement)) return true;

          // Exclude tooltips only
          if (el.matches(hideSelectors.join(","))) return false;

          return true;
        },
      });
    } finally {
      sandbox.remove();
      isExporting = false;
    }
  }

  // We export the function so parent can trigger it manually
  export { exportNow };
</script>

<!-- Default button (can be hidden if user triggers manually) -->
<button
  class="govuk-button govuk-button--secondary"
  on:click={exportNow}
  disabled={isExporting}
>
  {isExporting ? "Exporting…" : "Download this chart"}
</button>

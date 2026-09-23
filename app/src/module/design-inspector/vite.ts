// LOCAL DEVELOPMENT STUB. The real design-inspector module ships with the
// Higgsfield template and is never overwritten by scripts/sync-to-higgsfield.sh.
import type { PluginOption } from "vite";

export function higgsfieldDesignSourceBabelPlugin() {
  return { visitor: {} };
}

export function higgsfieldDesignInspectorVitePlugin(enabled: boolean): PluginOption {
  return {
    name: "higgsfield-design-inspector-local-stub",
    config: () => ({ define: { __HF_DESIGN_INSPECTOR__: JSON.stringify(enabled) } }),
  };
}

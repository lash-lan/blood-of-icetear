// Loading and driving the Darkroom engine in a browser.
//
// There is no build step and no framework: the WebAssembly module exports five
// plain functions, so this file is the entire integration layer.
//
// Nothing here uploads anything. The photograph is decoded by the browser,
// adjusted inside the WebAssembly module's own memory, and drawn back to the
// canvas. No network call is made at any point after the module is loaded.

export const CONTROLS = [
  "exposure_ev",
  "contrast",
  "highlights",
  "shadows",
  "temperature",
  "tint",
  "saturation",
  "vibrance",
]

export async function loadEngine(url = "./lc_wasm.wasm") {
  const { instance } = await WebAssembly.instantiateStreaming(fetch(url), {})
  const { alloc, dealloc, render_rgba, engine_version, memory } = instance.exports

  return {
    version: engine_version(),

    // Adjust one ImageData in place. Returns how long the engine took, in
    // milliseconds, measured around the call itself.
    render(imageData, adjustments = {}) {
      const bytes = imageData.data.length
      const ptr = alloc(bytes)
      try {
        // The module's memory can move when it grows, so the view is taken
        // after the allocation, never cached across calls.
        new Uint8Array(memory.buffer, ptr, bytes).set(imageData.data)
        const a = CONTROLS.map((c) => adjustments[c] ?? 0)
        const started = performance.now()
        render_rgba(ptr, imageData.width, imageData.height, ...a)
        const took = performance.now() - started
        imageData.data.set(new Uint8Array(memory.buffer, ptr, bytes))
        return took
      } finally {
        dealloc(ptr, bytes)
      }
    },
  }
}

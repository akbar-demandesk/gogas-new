self.addEventListener("install", () => {
  console.log("⚡ Installing Main Service Worker (sw.js)...");
});

try {
  importScripts("/service-worker/sw-new.js"); // ✅ Load custom service worker logic
  console.log("✅ sw-new.js loaded successfully in sw.js");
} catch (error) {
  console.error("❌ Failed to import sw-new.js:", error);
}

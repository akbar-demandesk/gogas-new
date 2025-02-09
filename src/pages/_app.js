import "@/styles/globals.css"; // ✅ Ensure Tailwind is imported
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js") // ✅ Register Service Worker
        .then((reg) => console.log("✅ Service Worker registered:", reg))
        .catch((error) =>
          console.error("❌ Service Worker registration failed:", error)
        );
    }
  }, []);

  return <Component {...pageProps} />;
}

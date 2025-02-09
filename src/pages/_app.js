import { useEffect } from "react";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/servicer-worker/sw-new.js", { scope: "/servicer-worker/" }) // ✅ Adjusted scope
        .then((reg) => console.log("✅ Service Worker registered", reg))
        .catch((error) =>
          console.error("❌ Service Worker registration failed:", error)
        );
    }
  }, []);

  return <Component {...pageProps} />;
}

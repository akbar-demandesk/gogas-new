import { useEffect } from "react";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker/sw-new.js", { scope: "/service-worker/" })
        .then((reg) => console.log("✅ Service Worker registered", reg))
        .catch((error) =>
          console.error("❌ Service Worker registration failed:", error)
        );
    }
  }, []);

  return <Component {...pageProps} />;
}

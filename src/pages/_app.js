import { useEffect } from "react";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log("✅ Service Worker registered successfully"))
        .catch((error) =>
          console.error("❌ Service Worker registration failed:", error)
        );
    }
  }, []);

  return <Component {...pageProps} />;
}

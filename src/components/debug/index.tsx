"use client";
import { useEffect } from "react";

export default function TestImageDebug({
  url,
  label,
}: {
  url: string;
  label?: string;
}) {
  useEffect(() => {
    console.log("[TestImageDebug] url:", url);
    // try to fetch the image as a sanity check
    if (typeof window !== "undefined") {
      fetch(url, { method: "GET", mode: "cors" })
        .then(async (res) => {
          console.log(
            "[TestImageDebug] fetch status:",
            res.status,
            res.statusText
          );
          try {
            const blob = await res.blob();
            console.log(
              "[TestImageDebug] blob size:",
              blob.size,
              "type:",
              blob.type
            );
          } catch (e) {
            console.warn("[TestImageDebug] blob read failed", e);
          }
        })
        .catch((err) => {
          console.error("[TestImageDebug] fetch error:", err);
        });
    }
  }, [url]);

  return (
    <div style={{ maxWidth: 800 }}>
      <h4>Debug: {label ?? "doc"}</h4>

      <div style={{ border: "1px solid #ddd", padding: 8, marginBottom: 8 }}>
        <div>Plain &lt;img&gt; (no optimization)</div>
        <img
          src={url}
          alt={label ?? "doc"}
          style={{
            width: "100%",
            height: 300,
            objectFit: "contain",
            background: "#fafafa",
          }}
          onError={(e) => console.error("[TestImageDebug] <img> error", e)}
          onLoad={() => console.log("[TestImageDebug] <img> loaded")}
        />
      </div>

      <div style={{ border: "1px solid #ddd", padding: 8, marginBottom: 8 }}>
        <div>Next Image (unoptimized)</div>
        {/* @ts-ignore */}
        <img
          src={url}
          alt={label ?? "doc-next"}
          style={{
            width: "100%",
            height: 300,
            objectFit: "contain",
            background: "#f5f5f5",
          }}
          onError={(e) =>
            console.error("[TestImageDebug] <img as fallback> error", e)
          }
          onLoad={() =>
            console.log("[TestImageDebug] <img as fallback> loaded")
          }
        />
      </div>

      <div style={{ fontSize: 13, color: "#666", marginTop: 8 }}>
        Open DevTools → Console & Network. Look for logs starting with{" "}
        <code>[TestImageDebug]</code>.
      </div>
    </div>
  );
}

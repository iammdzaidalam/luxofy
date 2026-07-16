"use client";

import { useEffect } from "react";

/** Persists ad attribution from the landing URL so the registration form can submit it. */
export function UtmCapture() {
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const utm = {
        utmSource: params.get("utm_source"),
        utmMedium: params.get("utm_medium"),
        utmCampaign: params.get("utm_campaign"),
      };
      if (utm.utmSource || utm.utmMedium || utm.utmCampaign) {
        sessionStorage.setItem("attribution", JSON.stringify(utm));
      }
      if (document.referrer && !sessionStorage.getItem("referrer")) {
        sessionStorage.setItem("referrer", document.referrer);
      }
    } catch {
      // storage unavailable (private mode); attribution is best effort
    }
  }, []);

  return null;
}

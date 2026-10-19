// PostHog, for Lash's private dashboard at /dashboard. This runs on all four
// sites, so one place can compare them: lashlan.com, bloodoficetear.com,
// dharmalogist.com and hemachandralegacy.com.
//
// It records page views and clicks, and it is set to cookieless mode, so it
// stores nothing in the visitor's browser and the sites still need no cookie
// banner. The cost of that choice: PostHog cannot tell that today's visitor is
// the same person who came last week. Switch COOKIELESS to false to get that
// back, but a consent banner becomes a fair requirement in Europe and the UK.
//
// Honours "Do Not Track", like t.js does.
;(() => {
  // The project key. It is public by design and is safe to have in this file:
  // it can only send data in, never read anything out.
  const KEY = "phc_yKJxqwmcSSfQrWjVKC5iijELS3sweHmbhua8ESCHnMJU"

  // "eu" or "us": whichever region was chosen when the PostHog project was made.
  const REGION = "eu"

  const COOKIELESS = true

  if (!KEY) return
  if (window.__lashPosthog || navigator.doNotTrack === "1") return
  window.__lashPosthog = true

  const apiHost = REGION === "us" ? "https://us.i.posthog.com" : "https://eu.i.posthog.com"
  const assetHost = REGION === "us" ? "https://us-assets.i.posthog.com" : "https://eu-assets.i.posthog.com"

  const script = document.createElement("script")
  script.src = assetHost + "/static/array.js"
  script.defer = true

  script.onload = () => {
    if (!window.posthog || typeof window.posthog.init !== "function") return
    window.posthog.init(KEY, {
      api_host: apiHost,
      // Record clicks and form submissions without naming each one by hand.
      autocapture: true,
      capture_pageview: true,
      // Follows single-page navigations. These sites are mostly plain pages,
      // but /studio, /plan and /aigp move without reloading.
      capture_pageleave: true,
      ...(COOKIELESS ? { cookieless_mode: "always" } : {}),
      // Session replay is off until Lash asks for it: it is the heaviest part
      // of PostHog and the most sensitive, since it records what people do.
      disable_session_recording: true,
    })
  }

  // A failure here must never affect the page.
  script.onerror = () => {}
  document.head.appendChild(script)
})()

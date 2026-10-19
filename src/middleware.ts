// Adds the PostHog tracking line to every page as it is served, for Lash's
// private dashboard at lashlan.com/dashboard. See public/ph.js.
//
// Why this is done here rather than in the layout: thirteen of this site's
// pages build their own <head> instead of using SectionLayout, including the
// library and saga pages. Putting the line in the layout would quietly miss
// them, and would miss every new story written from now on. Doing it here
// means a page is covered the moment it exists, with nothing to remember.
//
// It only touches HTML, it never adds the line twice, and if anything about a
// response is unexpected it leaves that response exactly as it was.

import type { MiddlewareHandler } from "astro"

const TAG = '<script src="/ph.js" defer></script>'

export const onRequest: MiddlewareHandler = async (_context, next) => {
  const response = await next()

  const type = response.headers.get("content-type") || ""
  if (!type.includes("text/html")) return response

  let html: string
  try {
    html = await response.text()
  } catch {
    return response
  }

  if (html.includes("/ph.js") || !html.includes("</head>")) {
    return new Response(html, { status: response.status, headers: response.headers })
  }

  const headers = new Headers(response.headers)
  // The body is about to get longer, so any stated length is now wrong.
  headers.delete("content-length")

  return new Response(html.replace("</head>", TAG + "</head>"), {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

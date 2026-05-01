const DEFAULT_ROUTER_BASE_URL = "https://ai-router.anker-in.com/v1";

export function resolveAiRouterApiKey(): string {
  return (
    process.env.ANTHROPIC_API_KEY ||
    process.env.ANTHROPIC_AUTH_TOKEN ||
    process.env.AUTH_TOKEN ||
    process.env.AI_ROUTER_API_KEY ||
    ""
  );
}

export function resolveAiRouterBaseURL(): string {
  const rawBaseURL = (
    process.env.AI_ROUTER_BASE_URL ||
    process.env.ANTHROPIC_BASE_URL ||
    process.env.OPENAI_BASE_URL ||
    DEFAULT_ROUTER_BASE_URL
  ).trim();

  if (!rawBaseURL) return DEFAULT_ROUTER_BASE_URL;

  try {
    const url = new URL(rawBaseURL);
    const normalizedPath = url.pathname.replace(/\/+$/, "");

    if (normalizedPath === "" || normalizedPath === "/") {
      // Router defaults work best against the OpenAI-compatible /v1 path.
      url.pathname = "/v1";
    } else if (normalizedPath === "/bedrock") {
      // Some docs mention /bedrock, but this router exposes chat completions at /v1.
      url.pathname = "/v1";
    } else {
      url.pathname = normalizedPath;
    }

    return url.toString().replace(/\/$/, "");
  } catch {
    return DEFAULT_ROUTER_BASE_URL;
  }
}

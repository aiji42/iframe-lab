import { cases } from "../src/ceses.ts";
import { iframe } from "../src/utils/iframe.ts";

export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  const src = url.searchParams.get("src");
  if (!src) return new Response("src is required", { status: 400 });

  const iframeInner = cases.find((c) => c.key === src)?.value;
  if (!iframeInner) return new Response("Invalid src", { status: 400 });

  return new Response(iframe(iframeInner), {
    headers: {
      "Content-Type": "text/html",
    },
  });
};

import { iframe } from "../utils/iframe.ts";
import { cases } from "../ceses.ts";

export const Iframe = ({
  srcType,
  iframeInnerKey,
  sandbox,
  allow,
}: {
  srcType: string;
  iframeInnerKey: string;
  sandbox: string[];
  allow: string[];
}) => {
  const iframeInner = cases.find((c) => c.key === iframeInnerKey)?.value;
  if (!iframeInner) throw new Error("Invalid iframe inner key");

  let src = "";
  switch (srcType) {
    case "data":
      src = `data:text/html,${iframe(iframeInner)}`;
      break;
    case "blob":
      src = URL.createObjectURL(
        new Blob([iframe(iframeInner)], { type: "text/html" }),
      );
      break;
    case "same-origin":
      src = `/iframe?src=${iframeInnerKey}`;
      break;
    case "same-site":
      src = `https://sub.${location.host}/?src=${iframeInnerKey}`;
      break;
    default:
      throw new Error("Invalid src type");
  }

  return (
    <iframe
      key={src + sandbox.join("") + allow.join("")}
      src={src}
      sandbox={sandbox.join(" ")}
      className="border-2 rounded-sm w-full"
      allow={allow.join(" ")}
    />
  );
};

import { useReducer, useState } from "react";
import { cases } from "./ceses.ts";
import { iframe } from "./utils/iframe.ts";
import { IframeInnerSelector } from "./components/IframeInnerSelector.tsx";
import { sandboxes } from "./constants/sandbox.ts";

const srcTypes = ["data:text/html", "blob"] as const;

const App = () => {
  const [iframeInner, setIframeInner] = useState(cases[0].value);
  const [sandbox, setSandbox] = useReducer(
    (state: string[], selected: string) => {
      if (state.includes(selected)) {
        return state.filter((s) => s !== selected);
      } else {
        return [...state, selected];
      }
    },
    [sandboxes[0]],
  );

  const [srcType, setSrcType] = useState<(typeof srcTypes)[number]>(
    srcTypes[0],
  );

  const src =
    srcType === "data:text/html"
      ? `data:text/html,${iframeInner}`
      : URL.createObjectURL(
          new Blob([iframe(iframeInner)], { type: "text/html" }),
        );

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">iframe lab</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-col gap-4">
          <fieldset>
            <legend className="text-xl mb-2">src</legend>
            {srcTypes.map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 mb-1.5 text-lg"
              >
                <input
                  type="radio"
                  checked={srcType === type}
                  onChange={() => setSrcType(type)}
                />
                {type}
              </label>
            ))}
          </fieldset>

          <div className="w-lg">
            <label htmlFor="iframe-inner" className="text-xl">
              iframe inner
            </label>
            <IframeInnerSelector
              id="iframe-inner"
              value={iframeInner}
              options={cases}
              onChange={setIframeInner}
            />
          </div>
        </div>

        <fieldset>
          <legend className="text-xl mb-2">sandbox</legend>
          {sandboxes.map((s) => (
            <label key={s} className="flex items-center gap-2 mb-1.5 text-lg">
              <input
                type="checkbox"
                checked={sandbox.includes(s)}
                onChange={() => setSandbox(s)}
              />
              {s}
            </label>
          ))}
        </fieldset>
      </div>

      <div>
        <label className="text-2xl">iframe</label>
        <iframe
          key={src + sandbox.join("")}
          src={src}
          sandbox={sandbox.join(" ")}
          className="border-2 rounded-sm w-full"
        />
      </div>
    </div>
  );
};

export default App;

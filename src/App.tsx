import { cases } from "./ceses.ts";
import { IframeInnerSelector } from "./components/IframeInnerSelector.tsx";
import { sandboxes } from "./constants/sandbox.ts";
import { parseAsString, parseAsArrayOf, useQueryState } from "nuqs";
import { Iframe } from "./components/Iframe.tsx";
import { allows } from "./constants/allow.ts";

const srcTypes = ["data:text/html", "blob"] as const;

const App = () => {
  const [iframeInnerKey, setIframeInnerKey] = useQueryState("inner", {
    defaultValue: cases[0].key,
  });
  const [sandbox, setSandbox] = useQueryState(
    "sandbox",
    parseAsArrayOf(parseAsString).withDefault([sandboxes[0]]),
  );
  const [allow, setAllow] = useQueryState(
    "allow",
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  const [srcType, setSrcType] = useQueryState("src", {
    defaultValue: srcTypes[0],
  });

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
              value={iframeInnerKey}
              options={cases.map((c) => ({ label: c.label, value: c.key }))}
              onChange={setIframeInnerKey}
              code={cases.find((c) => c.key === iframeInnerKey)?.value ?? ""}
            />
          </div>
        </div>

        <fieldset>
          <legend className="text-xl mb-2">sandbox</legend>
          {sandboxes.map((s) => (
            <label key={s} className="flex items-center gap-2 mb-1.5 text-lg">
              <input
                name={s}
                type="checkbox"
                checked={sandbox.includes(s)}
                onChange={(e) =>
                  setSandbox(
                    e.target.checked
                      ? [...sandbox, s]
                      : sandbox.filter((v) => v !== s),
                  )
                }
              />
              {s}
            </label>
          ))}
        </fieldset>
        <fieldset>
          <legend className="text-xl mb-2">allow</legend>
          {allows.map((a) => (
            <label key={a} className="flex items-center gap-2 mb-1.5 text-lg">
              <input
                name={a}
                type="checkbox"
                checked={allow.includes(a)}
                onChange={(e) =>
                  setAllow(
                    e.target.checked
                      ? [...allow, a]
                      : allow.filter((v) => v !== a),
                  )
                }
              />
              {a}
            </label>
          ))}
        </fieldset>
      </div>

      <div>
        <label className="text-2xl">iframe</label>
        <Iframe
          srcType={srcType}
          iframeInnerKey={iframeInnerKey}
          sandbox={sandbox}
          allow={allow}
        />
      </div>
    </div>
  );
};

export default App;

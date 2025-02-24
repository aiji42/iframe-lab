import { useEffect, useRef } from "react";

export const IframeInnerSelector = ({
  id,
  value,
  options,
  onChange,
  code,
}: {
  id?: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
  code: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.dataset.highlighted = "";
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    hljs.highlightAll();
  }, [value]);

  return (
    <div className="flex flex-col w-full">
      <select
        id={id}
        className="border-2 rounded-sm sm:rounded-b-none p-3 text-lg appearance-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <pre className="border-2 border-t-0 rounded-b-sm hidden sm:block">
        <code className="language-html" ref={ref}>
          {code}
        </code>
      </pre>
    </div>
  );
};

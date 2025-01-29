import { useState } from "react";

const App = () => {
  const [iframeInner, setIframeInner] = useState(defaultIframeInner);

  const dataSrc = `data:text/html,${iframeInner}`;
  const blobUrl = URL.createObjectURL(
    new Blob([iframeInner], { type: "text/html" }),
  );

  return (
    <>
      <h1 className="text-3xl font-bold">iframe lab</h1>

      <div className="flex gap-8 mt-4">
        <textarea
          onChange={(e) => setIframeInner(e.target.value)}
          defaultValue={iframeInner}
          className="w-[600px] p-2 border rounded-sm"
          autoFocus
        />

        <div className="space-y-4">
          <div>
            <p>src="data:text/html..." sandbox="allow-scripts"</p>
            <iframe
              src={dataSrc}
              sandbox="allow-scripts"
              className="border rounded-sm"
            />
          </div>
          <div>
            <p>
              src="data:text/html..." sandbox="allow-scripts allow-same-origin"
            </p>
            <iframe
              src={dataSrc}
              sandbox="allow-scripts allow-same-origin"
              className="border rounded-sm"
            />
          </div>
          <div>
            <p>src="blob:..." sandbox="allow-scripts"</p>
            <iframe
              src={blobUrl}
              sandbox="allow-scripts"
              className="border rounded-sm"
            />
          </div>
          <div>
            <p>src="blob:..." sandbox="allow-scripts allow-same-origin"</p>
            <iframe
              src={blobUrl}
              sandbox="allow-scripts allow-same-origin"
              className="border rounded-sm"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

const defaultIframeInner = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>iframe</title>
</head>
<body>
  <p id="secure-context"></p>
  <p id="null-origin"></p>
  <script>
    const isSecureContext = window.isSecureContext;
    document.getElementById('secure-context').innerText = 'isSecureContext: ' + isSecureContext;
    
    const origin = window.origin;
    document.getElementById('null-origin').innerText = 'origin: ' + origin;
  </script>
</body>
</html>
`;

const html = `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Window Open Test (Child)</title>
</head>
<body>
  <h2>Child Window</h2>
  <button id="sendMessage">Send Message to Parent</button>
  <pre id="log"></pre>

  <script>
    function log(message) {
      document.getElementById('log').textContent += message + '\\n';
      console.log(message);
    }

    document.getElementById('sendMessage').addEventListener('click', () => {
      if (window.opener) {
        log("Sending message to parent...");
        window.opener.postMessage("Hello from child!", "*");
      } else {
        log("No opener available.");
      }
    });

    window.addEventListener('message', (event) => {
      log("Received message from parent: " + event.data);
    });
  </script>
</body>
</html>
`;

export const onRequest: PagesFunction = async () => {
  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
};

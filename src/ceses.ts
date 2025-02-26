export const cases = [
  {
    label: "Secure Context",
    key: "isSecureContext",
    value: `<script>
  document.body.innerText = "Is Secure Context: " + window.isSecureContext;
</script>`,
  },
  {
    label: "Null Origin",
    key: "nullOrigin",
    value: `<script>
  const isNullOrigin = window.origin === "null";
  document.body.innerText = "Is null origin: " + (isNullOrigin) + (!isNullOrigin ? " (" + window.origin + ")" : "");
</script>`,
  },
  {
    label: "Downloadable blob URL",
    key: "downloadableBlobUrl",
    value: `<a>Download</a>
<script>
  const a = document.querySelector("a");
  a.href = URL.createObjectURL(new Blob(["Hello, World!"]));
  a.download = "hello.txt";
</script>`,
  },
  {
    label: "Camera accessable",
    key: "camera",
    value: `<div>
  <button id="start">Start</button>
  <button id="stop">Stop</button>
</div>
<p></p>
<video id="video" width="320" height="240" autoplay style="border: 1px solid black;"></video>
  <script>
    const video = document.getElementById('video');
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const p = document.querySelector('p');
    let stream;

    startButton.addEventListener('click', async () => {
      p.innerText = '';
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
      } catch (err) {
        console.error(err);
        p.innerText = err.message;
      }
    });

    stopButton.addEventListener('click', () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        video.srcObject = null;
      }
    });
  </script>`,
  },
  {
    label: "Geolocation",
    key: "geolocation",
    value: `<button>Get Location</button>
<p></p>
<script>
  const button = document.querySelector("button");
  const p = document.querySelector("p");
  button.addEventListener("click", async () => {
    try {
      const { coords } = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      p.innerText = \`Latitude: \${coords.latitude}, Longitude: \${coords.longitude}\`;
    } catch (err) {
      p.innerText = err.message;
    }
  });
</script>`,
  },
  {
    label: "Clipboard",
    key: "clipboard",
    value: `<button id="write">Clipboard Write</button><button id="read">Clipboard Read</button>
<p></p> 
<script>
  const writeButton = document.getElementById("write");
  const readButton = document.getElementById("read");
  const p = document.querySelector("p");
  writeButton.addEventListener("click", async () => {
    p.innerText = "";
    try {
      await navigator.clipboard.writeText("Hello, World!");
      p.innerText = "Copied to clipboard ('Hello, World!')";
    } catch (err) {
      p.innerText = err.message;
    }
  })
  readButton.addEventListener("click", async () => {
    p.innerText = "";
    try {
      p.innerText = 'Clipboard read: ' + await navigator.clipboard.readText();
    } catch (err) {
      p.innerText = err.message;
    }
  })
</script>`,
  },
  {
    label: "Accessable parent",
    key: "accessableParent",
    value: `<p></p>
<script>
  const p = document.querySelector("p");
  try {
    p.innerText = "Parent title: " + window.parent.document.title;
  } catch (err) {
    p.innerText = err.message;
  }
</script>
`,
  },
  {
    label: "WebSocket",
    key: "websocket",
    value: `<pre id="log"></pre>
<script>
    function log(message) {
      document.getElementById('log').textContent += message + '\\n';
      console.log(message);
    }

    function testWebSocket() {
      const wsServerUrl = "wss://echo.websocket.org";
      log("Connecting to WebSocket server: " + wsServerUrl);
      try {
        const socket = new WebSocket(wsServerUrl);
        socket.onopen = () => {
          log("WebSocket connection opened!");
          socket.send("Hello, WebSocket!");
        };
        socket.onmessage = (event) => {
          log("Received message: " + event.data);
        };
        socket.onerror = (event) => {
          log("WebSocket error: " + event);
        };
        socket.onclose = () => {
          log("WebSocket connection closed.");
        };
      } catch (error) {
        log("WebSocket failed: " + error);
      }
    }

    testWebSocket();
</script>`,
  },
  {
    label: "File System Access",
    key: "filesystemAccess",
    value: `<button id="openFile">Open File</button>
<button id="saveFile">Save File</button>
<pre id="log"></pre>
<script>
  function log(message) {
    document.getElementById('log').textContent += message + '\\n';
    console.log(message);
  }

  document.getElementById('openFile').addEventListener('click', async () => {
    try {
      log("Opening file picker...");
      const [fileHandle] = await window.showOpenFilePicker();
      const file = await fileHandle.getFile();
      const text = await file.text();
      log("File opened: " + file.name);
      log("File content: " + text);
    } catch (error) {
      log("Error opening file: " + error);
    }
  });

  document.getElementById('saveFile').addEventListener('click', async () => {
    try {
      log("Opening save file picker...");
      const fileHandle = await window.showSaveFilePicker();
      const writable = await fileHandle.createWritable();
      const text = "Hello, FileSystem Access API!";
      await writable.write(text);
      await writable.close();
      log("File saved successfully.");
    } catch (error) {
      log("Error saving file: " + error);
    }
  });
</script>`,
  },
];

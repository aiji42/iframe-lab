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
<video id="video" width="640" height="480" autoplay style="border: 1px solid black;"></video>
  <script>
    const video = document.getElementById('video');
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    let stream;

    startButton.addEventListener('click', async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
      } catch (err) {
        console.error(err);
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
];

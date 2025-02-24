export const cases = [
  {
    label: "Check Secure Context",
    key: "isSecureContext",
    value: `<script>
  document.body.innerText = "Is Secure Context: " + window.isSecureContext;
</script>`,
  },
  {
    label: "Check null origin",
    key: "nullOrigin",
    value: `<script>
  const isNullOrigin = window.origin === "null";
  document.body.innerText = "Is null origin: " + (isNullOrigin) + (!isNullOrigin ? " (" + window.origin + ")" : "");
</script>`,
  },
  {
    label: "Check Downloadable blob URL",
    key: "downloadableBlobUrl",
    value: `<a>Download</a>
<script>
  const a = document.querySelector("a");
  a.href = URL.createObjectURL(new Blob(["Hello, World!"]));
  a.download = "hello.txt";
</script>`,
  },
];

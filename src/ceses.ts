export const cases = [
  {
    label: "Check Secure Context",
    value: `isSecureContext:&nbsp;
<script>
  document.body.innerText += window.isSecureContext;
</script>
`,
  },
  {
    label: "Check origin",
    value: `Origin:&nbsp;
<script>
  document.body.innerText += window.origin;
</script>
  `,
  },
  {
    label: "Check Downloadable blob URL",
    value: `<a>Download</a>
<script>
  const a = document.querySelector("a");
  a.href = URL.createObjectURL(new Blob(["Hello, World!"]));
  a.download = "hello.txt";
</script>
  `,
  },
];

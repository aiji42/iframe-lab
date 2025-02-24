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
];

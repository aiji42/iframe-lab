export const iframe = (inner: string) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>iframe</title>
</head>
<body>
  ${inner}
</body>
</html>`;
};

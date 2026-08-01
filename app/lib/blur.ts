// A tiny warm-toned blur placeholder used while images load.
// Keeps tiles from popping in abruptly and improves perceived speed.
export const BLUR_DATA_URL =
  "data:image/svg+xml;base64," +
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"><rect width="8" height="8" fill="#e7ddd0"/></svg>`,
  ).toString("base64");

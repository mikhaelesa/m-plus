export function downloadCsv(url: string): void {
  const a = document.createElement("a");
  a.href = url;
  a.download = ""; // Enforce download behavior
  document.body.appendChild(a);
  a.click();
  a.remove();
}

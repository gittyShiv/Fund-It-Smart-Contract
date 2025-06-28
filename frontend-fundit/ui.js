// 🌗 Theme toggle
const toggle = document.querySelector(".theme-toggle");
toggle.onclick = () => {
  document.body.classList.toggle("light-mode");
  toggle.textContent = document.body.classList.contains("light-mode") ? "☀️" : "🌙";
};

// ⏳ Transaction Status Bar (to be called from index.js)
export function showStatusBar(message = "Processing...") {
  const bar = document.getElementById("status-bar");
  bar.textContent = message;
  bar.classList.remove("hidden");
}

export function hideStatusBar() {
  const bar = document.getElementById("status-bar");
  bar.classList.add("hidden");
}

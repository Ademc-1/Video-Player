const loadBtn = document.getElementById("loadBtn");
const importBtn = document.getElementById("importBtn");
const fileInput = document.getElementById("fileInput");
const loader = document.getElementById("loader");
const playerRoot = document.getElementById("playerRoot");
const videoWrap = document.getElementById("videoWrap");
const urlInput = document.getElementById("videoURL");
const backBtn = document.getElementById("backBtn");

let currentVideo = null;

// Load a video (YouTube or local)
function loadVideo(src) {
  videoWrap.innerHTML = "";

  if (src.includes("youtube.com") || src.includes("youtu.be")) {
    const ytMatch = src.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (ytMatch) {
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&controls=1`;
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      videoWrap.appendChild(iframe);
      currentVideo = iframe;
    } else {
      alert("Invalid YouTube link 😭");
    }
  } else {
    const vid = document.createElement("video");
    vid.src = src;
    vid.controls = true;
    vid.autoplay = true;
    videoWrap.appendChild(vid);
    currentVideo = vid;
  }

  loader.classList.add("hidden");
  playerRoot.classList.remove("hidden");
}

// Load from URL
loadBtn.addEventListener("click", () => {
  const url = urlInput.value.trim();
  if (!url) return alert("Enter a valid link!");
  loadVideo(url);
});

// Import local file
importBtn.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  if (currentVideo) {
    videoWrap.innerHTML = "";
    currentVideo = null;
  }

  const url = URL.createObjectURL(file);
  loadVideo(url);
  fileInput.value = "";
});

// Go back to main screen
backBtn.addEventListener("click", () => {
  if (currentVideo) {
    videoWrap.innerHTML = "";
    currentVideo = null;
  }
  playerRoot.classList.add("hidden");
  loader.classList.remove("hidden");
  urlInput.value = "";
});

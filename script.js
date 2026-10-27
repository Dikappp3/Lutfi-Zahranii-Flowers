const starField = document.getElementById("stars");
const petalRain = document.getElementById("petal-rain");
const tapEffects = document.getElementById("tap-effects");
const flowerRain = document.getElementById("flower-rain");
const photoLightbox = document.getElementById("photoLightbox");
const photoBackdrop = document.getElementById("photoBackdrop");
const closePhoto = document.getElementById("closePhoto");
const enlargedPhoto = document.getElementById("enlargedPhoto");
const photoCaption = document.getElementById("photoCaption");
const intro = document.getElementById("intro");
const garden = document.getElementById("garden");
const openGift = document.getElementById("openGift");
const readMessage = document.getElementById("readMessage");
const letterPanel = document.getElementById("letterPanel");
const closeLetter = document.getElementById("closeLetter");

// Bintang kecil berkelip di langit.
for (let i = 0; i < 105; i++) {
  const star = document.createElement("span");
  star.className = "star";
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.setProperty("--size", `${Math.random() * 2.2 + 0.7}px`);
  star.style.setProperty("--duration", `${Math.random() * 3 + 2}s`);
  star.style.setProperty("--delay", `${Math.random() * 4}s`);
  starField.appendChild(star);
}

// Kelopak bunga jatuh secara perlahan setelah taman dibuka.
for (let i = 0; i < 18; i++) {
  const petal = document.createElement("span");
  petal.className = "falling-petal";
  petal.style.setProperty("--left", `${Math.random() * 100}%`);
  petal.style.setProperty("--width", `${Math.random() * 8 + 6}px`);
  petal.style.setProperty("--rotate", `${Math.random() * 180}deg`);
  petal.style.setProperty("--duration", `${Math.random() * 8 + 9}s`);
  petal.style.setProperty("--delay", `${Math.random() * -18}s`);
  petal.style.setProperty("--sway", `${Math.random() * 24 - 12}vw`);
  petal.style.setProperty("--opacity", `${Math.random() * 0.35 + 0.45}`);
  petalRain.appendChild(petal);
}

// Tepat 13 bunga kecil jatuh dari atas ke bawah secara berulang.
const fallingFlowerGlyphs = ["✿", "❀", "✽", "✾", "✻", "❋"];
const fallingFlowerColors = ["#a9eaff", "#d5c4ff", "#ffc8e8", "#fff0bc", "#b9ffe8", "#a8c5ff"];
for (let i = 0; i < 13; i++) {
  const flower = document.createElement("span");
  flower.className = "falling-flower";
  flower.textContent = fallingFlowerGlyphs[Math.floor(Math.random() * fallingFlowerGlyphs.length)];
  flower.style.setProperty("--left", `${Math.random() * 96 + 2}%`);
  flower.style.setProperty("--size", `${Math.random() * 15 + 16}px`);
  flower.style.setProperty("--duration", `${Math.random() * 7 + 10}s`);
  flower.style.setProperty("--delay", `${Math.random() * -17}s`);
  flower.style.setProperty("--sway", `${Math.random() * 18 - 9}vw`);
  flower.style.setProperty("--flower-color", fallingFlowerColors[Math.floor(Math.random() * fallingFlowerColors.length)]);
  flowerRain.appendChild(flower);
}

function openGarden() {
  document.body.classList.add("show-garden");
  intro.classList.add("hide");
  garden.classList.add("active");
  window.setTimeout(() => { intro.style.display = "none"; }, 820);
}

openGift.addEventListener("click", openGarden);

function toggleLetter(forceOpen) {
  const shouldOpen = typeof forceOpen === "boolean"
    ? forceOpen
    : !letterPanel.classList.contains("open");

  letterPanel.classList.toggle("open", shouldOpen);
  document.body.classList.toggle("letter-open", shouldOpen);
  letterPanel.setAttribute("aria-hidden", String(!shouldOpen));
  readMessage.textContent = shouldOpen ? "Tutup pesan ✕" : "Baca pesan 💌";
}

readMessage.addEventListener("click", () => toggleLetter());
closeLetter.addEventListener("click", () => toggleLetter(false));

// Setiap ketukan di area taman memunculkan bunga dan kelopak yang jatuh.
// Tombol surat dikecualikan agar tetap mudah digunakan.
const flowerGlyphs = ["✿", "❀", "✽", "✾", "✻"];
const flowerColors = ["#a9eaff", "#d5c4ff", "#ffc8e8", "#fff0bc", "#b9ffe8"];
const petalColors = ["#7fcfff", "#b7a7ff", "#ffbfe3", "#b7f4ef"];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function spawnTapFlowers(x, y) {
  const flowerCount = Math.floor(randomBetween(7, 11));
  const petalCount = Math.floor(randomBetween(5, 9));

  for (let i = 0; i < flowerCount; i++) {
    const flower = document.createElement("span");
    const duration = randomBetween(1.5, 2.65);
    flower.className = "tap-flower";
    flower.textContent = flowerGlyphs[Math.floor(Math.random() * flowerGlyphs.length)];
    flower.style.setProperty("--x", `${x + randomBetween(-28, 28)}px`);
    flower.style.setProperty("--y", `${y + randomBetween(-18, 18)}px`);
    flower.style.setProperty("--dx", `${randomBetween(-150, 150)}px`);
    flower.style.setProperty("--dy", `${randomBetween(150, 340)}px`);
    flower.style.setProperty("--rot", `${randomBetween(180, 650)}deg`);
    flower.style.setProperty("--size", `${randomBetween(16, 30)}px`);
    flower.style.setProperty("--duration", `${duration}s`);
    flower.style.setProperty("--flower-color", flowerColors[Math.floor(Math.random() * flowerColors.length)]);
    tapEffects.appendChild(flower);
    window.setTimeout(() => flower.remove(), duration * 1000 + 120);
  }

  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement("span");
    const duration = randomBetween(1.25, 2.2);
    petal.className = "tap-petal";
    petal.style.setProperty("--x", `${x + randomBetween(-22, 22)}px`);
    petal.style.setProperty("--y", `${y + randomBetween(-15, 15)}px`);
    petal.style.setProperty("--dx", `${randomBetween(-175, 175)}px`);
    petal.style.setProperty("--dy", `${randomBetween(125, 300)}px`);
    petal.style.setProperty("--rot", `${randomBetween(180, 720)}deg`);
    petal.style.setProperty("--size", `${randomBetween(6, 12)}px`);
    petal.style.setProperty("--duration", `${duration}s`);
    petal.style.setProperty("--petal-color", petalColors[Math.floor(Math.random() * petalColors.length)]);
    tapEffects.appendChild(petal);
    window.setTimeout(() => petal.remove(), duration * 1000 + 120);
  }
}

garden.addEventListener("pointerdown", (event) => {
  if (!garden.classList.contains("active")) return;
  if (event.target.closest("button, .letter-panel, .photo-frame, .photo-lightbox")) return;
  spawnTapFlowers(event.clientX, event.clientY);
});

// Foto dibaca otomatis dari folder foto/. Klik bingkai untuk membuka foto besar.
const photoSlots = [
  { frameId: "photoFrame1", path: "foto/foto-1.jpg", imageId: "photoImage1", placeholderId: "photoPlaceholder1", label: "Foto 01 — kenangan di bunga kiri" },
  { frameId: "photoFrame2", path: "foto/foto-2.jpg", imageId: "photoImage2", placeholderId: "photoPlaceholder2", label: "Foto 02 — kenangan di bunga tengah" },
  { frameId: "photoFrame3", path: "foto/foto-3.jpg", imageId: "photoImage3", placeholderId: "photoPlaceholder3", label: "Foto 03 — kenangan di bunga kanan" }
];

let lastPhotoTrigger = null;

function openPhoto(slot, trigger) {
  if (!slot.loaded) return;
  lastPhotoTrigger = trigger;
  enlargedPhoto.src = slot.path;
  enlargedPhoto.alt = slot.label;
  photoCaption.textContent = slot.label;
  photoLightbox.classList.add("open");
  photoLightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("photo-open");
  closePhoto.focus({ preventScroll: true });
}

function closePhotoLightbox() {
  if (!photoLightbox.classList.contains("open")) return;
  photoLightbox.classList.remove("open");
  photoLightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("photo-open");
  enlargedPhoto.src = "";
  if (lastPhotoTrigger) lastPhotoTrigger.focus({ preventScroll: true });
}

photoSlots.forEach((slot) => {
  const svgImage = document.getElementById(slot.imageId);
  const placeholder = document.getElementById(slot.placeholderId);
  const frame = document.getElementById(slot.frameId);
  const probe = new Image();
  slot.loaded = false;

  probe.onload = () => {
    slot.loaded = true;
    svgImage.setAttribute("href", slot.path);
    svgImage.setAttribute("opacity", "1");
    placeholder.style.opacity = "0";
    frame.setAttribute("aria-label", `Buka ${slot.label}`);
  };

  probe.onerror = () => {
    slot.loaded = false;
    svgImage.setAttribute("opacity", "0");
    placeholder.style.opacity = "1";
    frame.setAttribute("aria-label", "Foto belum tersedia — tambahkan file ke folder foto");
  };

  probe.src = slot.path;

  frame.addEventListener("click", () => openPhoto(slot, frame));
  frame.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openPhoto(slot, frame);
    }
  });
});

closePhoto.addEventListener("click", closePhotoLightbox);
photoBackdrop.addEventListener("click", closePhotoLightbox);
photoLightbox.addEventListener("click", (event) => {
  if (event.target === photoLightbox) closePhotoLightbox();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closePhotoLightbox();
});

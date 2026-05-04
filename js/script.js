const track = document.getElementById("track");

const imagens = [
  "1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg","9.jpg","10.jpg",
  "11.jpg","12.jpg","13.jpg","14.jpg","15.jpg","16.jpg","17.jpg","18.jpg","19.jpg","20.jpg",
  "21.jpg","22.jpg","23.jpg","24.jpg","25.jpg","26.jpg","27.jpg","28.jpg","29.jpg","30.jpg",
  "31.jpg","32.jpg","33.jpg","34.jpg","35.jpg","36.jpg","37.jpg","38.jpg","39.jpg","40.jpg",
  "41.jpg","42.jpg","43.jpg","44.jpg","45.jpg","46.jpg","47.jpg","48.jpg","49.jpg","50.jpg",
  "51.jpg","52.jpg","53.jpg","54.jpg","55.jpg","56.jpg","57.jpg","58.jpg","59.jpg","60.jpg",
  "61.jpg","62.jpg","63.jpg","64.jpg","65.jpg","66.jpg","67.jpg","68.jpg","69.jpg","70.jpg",
  "71.jpg","72.jpg","73.jpg","74.jpg","75.jpg","76.jpg","77.jpg","78.jpg","79.jpg","80.jpg",
  "81.jpg","82.jpg","83.jpg","84.jpg","85.jpg","86.jpg","87.jpg","88.jpg","89.jpg","90.jpg",
  "91.jpg","92.jpg","93.jpg","94.jpg","95.jpg","96.jpg","97.jpg","98.jpg","99.jpg","100.jpg"
];

let pos = 0;
let velocity = -0.3;
let isDragging = false;
let startX = 0;
let lastX = 0;

/* ===== LOAD DIRETO (sem preload bugado) ===== */
let validImgs = [];

let loadedCount = 0;

imagens.forEach(nome => {
  const img = new Image();

  img.onload = () => {
    validImgs.push(img);
    loadedCount++;

    if (loadedCount === imagens.length) init();
  };

  img.onerror = () => {
    loadedCount++;

    if (loadedCount === imagens.length) init();
  };

  img.src = `assets/${nome}`;
});

/* ===== INIT ===== */
function init() {
  if (!validImgs.length) return;

  [...validImgs, ...validImgs].forEach(img => {
    track.appendChild(img.cloneNode(true));
  });

  animate();
}

/* ===== LOOP ===== */
function animate() {
  if (!isDragging) {
    pos += velocity;

    // loop infinito suave
    if (Math.abs(pos) >= track.scrollWidth / 2) {
      pos = 0;
    }
  }

  track.style.transform = `translateX(${pos}px)`;
  requestAnimationFrame(animate);
}

/* ===== DRAG ===== */
track.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX;
  lastX = pos;
  velocity = 0;
  track.style.cursor = "grabbing";
});

window.addEventListener("mouseup", () => {
  isDragging = false;
  track.style.cursor = "grab";
});

window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const dx = e.clientX - startX;
  pos = lastX + dx;

  velocity = dx * 0.01;
});

/* ===== TOUCH ===== */
track.addEventListener("touchstart", (e) => {
  isDragging = true;
  startX = e.touches[0].clientX;
  lastX = pos;
  velocity = 0;
});

track.addEventListener("touchend", () => {
  isDragging = false;
});

track.addEventListener("touchmove", (e) => {
  if (!isDragging) return;

  const dx = e.touches[0].clientX - startX;
  pos = lastX + dx;

  velocity = dx * 0.01;
});

/* ===== AUTO SUAVE ===== */
setInterval(() => {
  if (!isDragging) velocity = -0.3;
}, 1000);
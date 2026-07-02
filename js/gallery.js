const galleryItems = document.querySelectorAll(".gallery-item");

const viewer = document.getElementById("galleryViewer");
const viewerImage = document.getElementById("galleryImage");

const closeBtn = document.querySelector(".gallery-close");
const nextBtn = document.querySelector(".gallery-next");
const prevBtn = document.querySelector(".gallery-prev");

let current = 0;

function openViewer(index) {
  current = index;

  viewerImage.src = galleryItems[current].href;

  viewer.classList.add("show");
}

galleryItems.forEach((item, index) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();

    openViewer(index);
  });
});

function nextImage() {
  current++;

  if (current >= galleryItems.length) {
    current = 0;
  }

  viewerImage.src = galleryItems[current].href;
}

function prevImage() {
  current--;

  if (current < 0) {
    current = galleryItems.length - 1;
  }

  viewerImage.src = galleryItems[current].href;
}

nextBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  nextImage();
});

prevBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  prevImage();
});

closeBtn.addEventListener("click", () => {
  viewer.classList.remove("show");
});

viewer.addEventListener("click", (e) => {
  if (e.target === viewer) {
    viewer.classList.remove("show");
  }
});

document.addEventListener("keydown", (e) => {
  if (!viewer.classList.contains("show")) return;

  if (e.key === "Escape") {
    viewer.classList.remove("show");
  }

  if (e.key === "ArrowRight") {
    nextImage();
  }

  if (e.key === "ArrowLeft") {
    prevImage();
  }
});

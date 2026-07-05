/*==========================================
        ELEMENT
==========================================*/

const openButton = document.getElementById("openInvitation");
const music = document.getElementById("music");

const cover = document.getElementById("cover");
const overlay = document.querySelector(".overlay");
const navbar = document.getElementById("bottomNav");

const couple = document.getElementById("couple");

/*==========================================
        BODY LOCK
==========================================*/

document.documentElement.classList.add("lock");
document.body.classList.add("lock");

/*==========================================
        STATUS
==========================================*/

let opened = false;

/*==========================================
        OPEN INVITATION
==========================================*/

openButton.addEventListener("click", () => {
  if (opened) return;

  opened = true;

  music.play().catch(() => {});

  cover.classList.add("hide");
  document.getElementById("bottomNav").classList.add("show");

  overlay.classList.add("hide");

  navbar.classList.add("show");

  document.documentElement.classList.remove("lock");
  document.body.classList.remove("lock");

  setTimeout(() => {
    couple.scrollIntoView({
      behavior: "smooth",
    });
  }, 900);
});

const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const top = section.offsetTop - 200;

    if (window.scrollY >= top) {
      current = section.id;
    }
  });

  navItems.forEach((item) => {
    item.classList.remove("active");

    if (item.getAttribute("href") === "#" + current) {
      item.classList.add("active");
    }
  });
});

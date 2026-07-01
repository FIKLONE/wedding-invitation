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

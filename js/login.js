import { auth } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");

/*==========================================
        CEK LOGIN
==========================================*/

onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "admin.html";
  }
});

/*==========================================
        LOGIN
==========================================*/

loginBtn.addEventListener("click", async () => {
  if (!email.value || !password.value) {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "Email dan Password harus diisi!",
    });

    return;
  }

  try {
    loginBtn.disabled = true;
    loginBtn.innerHTML = "⏳ Loading...";

    await signInWithEmailAndPassword(auth, email.value, password.value);

    await Swal.fire({
      icon: "success",
      title: "Login Berhasil",
      text: "Selamat datang Admin 👋",
      timer: 1500,
      showConfirmButton: false,
    });

    window.location.href = "admin.html";
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Login Gagal",
      text: "Email atau Password salah.",
    });

    loginBtn.disabled = false;
    loginBtn.innerHTML = "Login";
  }
});

/*==========================================
        ENTER KEY
==========================================*/

password.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    loginBtn.click();
  }
});

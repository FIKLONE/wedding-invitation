import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const form = document.getElementById("rsvpForm");
const wishList = document.getElementById("wishList");

const totalHadir = document.getElementById("totalHadir");
const totalTidakHadir = document.getElementById("totalTidakHadir");
const totalUcapan = document.getElementById("totalUcapan");
const submitBtn = document.getElementById("submitBtn");

async function loadWish() {
  wishList.innerHTML = "";

  const q = query(collection(db, "wishes"), orderBy("createdAt", "desc"));

  const snapshot = await getDocs(q);

  let hadir = 0;
  let tidakHadir = 0;

  snapshot.forEach((doc) => {
    const data = doc.data();

    if (data.attendance === "Hadir") {
      hadir += Number(data.guest);
    } else {
      tidakHadir += Number(data.guest);
    }

    let dateText = "";

    if (data.createdAt) {
      dateText = data.createdAt.toDate().toLocaleString("id-ID", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    }

    wishList.innerHTML += `
    <div class="wish-card">
      <h3>${data.name}</h3>

      <span>
        ${data.attendance} • ${data.guest} Tamu
      </span>

      <p>${data.message}</p>

      <small class="wish-date">${dateText}</small>
    </div>
  `;
  });

  totalHadir.textContent = hadir;
  totalTidakHadir.textContent = tidakHadir;
  totalUcapan.textContent = snapshot.size;
}

loadWish();

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  submitBtn.disabled = true;
  submitBtn.textContent = "⏳ Mengirim...";

  const name = document.getElementById("name").value;

  const guest = Number(document.getElementById("guest").value);

  const attendance = document.querySelector(
    'input[name="attendance"]:checked',
  ).value;

  const message = document.getElementById("message").value;

  await addDoc(collection(db, "wishes"), {
    name,
    guest,
    attendance,
    message,
    createdAt: serverTimestamp(),
  });

  form.reset();

  document.querySelector('input[value="Hadir"]').checked = true;

  document.getElementById("guest").value = 1;

  await loadWish();

  submitBtn.disabled = false;
  submitBtn.textContent = "Kirim Ucapan";

  Swal.fire({
    icon: "success",
    title: "Terima Kasih ❤️",
    html: `
    <b>Ucapan berhasil dikirim.</b><br>
    Semoga doa baik Anda menjadi keberkahan bagi kami.
  `,
    showConfirmButton: false,
    timer: 2200,
    timerProgressBar: true,
    background: "#fff",
    color: "#3d5875",
  });
});

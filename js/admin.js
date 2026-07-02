import { db, auth } from "./firebase.js";

import {
  collection,
  query,
  orderBy,
  deleteDoc,
  doc,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

/*==========================================
            ELEMENT
==========================================*/

const list = document.getElementById("list");

const hadir = document.getElementById("hadir");
const tidakHadir = document.getElementById("tidakHadir");
const ucapan = document.getElementById("ucapan");

const search = document.getElementById("search");

const logoutBtn = document.getElementById("logoutBtn");

const exportBtn = document.getElementById("exportBtn");

let allData = [];

/*==========================================
        CEK LOGIN
==========================================*/

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";

    return;
  }

  loadData();
});

/*==========================================
        LOAD DATA
==========================================*/

function loadData() {
  const q = query(collection(db, "wishes"), orderBy("createdAt", "desc"));

  onSnapshot(q, (snapshot) => {
    allData = [];

    snapshot.forEach((item) => {
      allData.push({
        id: item.id,
        ...item.data(),
      });
    });

    render(allData);
  });
}

/*==========================================
        RENDER
==========================================*/

function render(data) {
  list.innerHTML = "";

  let totalHadir = 0;
  let totalTidakHadir = 0;

  data.forEach((item) => {
    if (item.attendance == "Hadir") totalHadir += Number(item.guest);
    else totalTidakHadir += Number(item.guest);

    let tanggal = "";

    if (item.createdAt) {
      tanggal = item.createdAt.toDate().toLocaleString("id-ID", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    }

    list.innerHTML += `

      <div class="user-card">

        <div class="user-header">

          <h3>${item.name}</h3>

          <span class="badge ${item.attendance == "Hadir" ? "hadir" : "tidak"}">

            ${item.attendance}

          </span>

        </div>

        <div class="info">

          👥 ${item.guest} Orang

        </div>

        <div class="info">

          🕒 ${tanggal}

        </div>

        <div class="message">

          💌 ${item.message}

        </div>

        <button
          class="delete-btn"
          onclick="hapus('${item.id}')">

          🗑 Hapus

        </button>

      </div>

    `;
  });

  hadir.textContent = totalHadir;
  tidakHadir.textContent = totalTidakHadir;
  ucapan.textContent = data.length;
}

/*==========================================
        HAPUS
==========================================*/

window.hapus = async (id) => {
  const result = await Swal.fire({
    title: "Hapus RSVP?",

    text: "Data yang dihapus tidak bisa dikembalikan.",

    icon: "warning",

    showCancelButton: true,

    confirmButtonText: "Ya, Hapus",

    cancelButtonText: "Batal",

    confirmButtonColor: "#dc3545",
  });

  if (!result.isConfirmed) return;

  await deleteDoc(doc(db, "wishes", id));

  await loadData();

  Swal.fire({
    icon: "success",

    title: "Berhasil",

    text: "Data berhasil dihapus.",

    timer: 1500,

    showConfirmButton: false,
  });
};

/*==========================================
        SEARCH
==========================================*/

search.addEventListener("input", () => {
  const keyword = search.value.toLowerCase();

  const hasil = allData.filter((item) =>
    item.name.toLowerCase().includes(keyword),
  );

  render(hasil);
});

/*==========================================
        LOGOUT
==========================================*/

logoutBtn.addEventListener("click", async () => {
  const result = await Swal.fire({
    title: "Logout?",

    text: "Anda akan keluar dari Dashboard.",

    icon: "question",

    showCancelButton: true,

    confirmButtonText: "Logout",

    cancelButtonText: "Batal",

    confirmButtonColor: "#dc3545",
  });

  if (!result.isConfirmed) return;

  await signOut(auth);

  window.location.href = "login.html";
});

/*==========================================
            EXPORT EXCEL
==========================================*/

exportBtn.addEventListener("click", () => {
  if (allData.length === 0) {
    Swal.fire({
      icon: "warning",
      title: "Data Kosong",
      text: "Belum ada data RSVP.",
    });

    return;
  }

  const excelData = allData.map((item) => ({
    Nama: item.name,

    Status: item.attendance,

    "Jumlah Tamu": item.guest,

    Ucapan: item.message,

    Waktu: item.createdAt
      ? item.createdAt.toDate().toLocaleString("id-ID")
      : "-",
  }));

  const worksheet = XLSX.utils.json_to_sheet(excelData);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "RSVP");

  XLSX.writeFile(workbook, "Daftar_Tamu_RSVP.xlsx");

  Swal.fire({
    icon: "success",

    title: "Berhasil",

    text: "Excel berhasil diunduh.",

    timer: 1800,

    showConfirmButton: false,
  });
});

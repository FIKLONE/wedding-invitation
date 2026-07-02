/*==========================================
        COPY REKENING & ALAMAT
==========================================*/

const copyButtons = document.querySelectorAll(".copy-btn");

const copyAddress = document.querySelector(".copy-address");

const toast = document.getElementById("toast");

const giftAddress = document.getElementById("giftAddress");

function showToast(message) {
  toast.textContent = message;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

/*=========================
        COPY REKENING
=========================*/

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const text = button.dataset.copy;

    try {
      await navigator.clipboard.writeText(text);

      showToast("Nomor rekening berhasil disalin ✓");
    } catch (err) {
      showToast("Gagal menyalin rekening");
    }
  });
});

/*=========================
        COPY ALAMAT
=========================*/

copyAddress.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(giftAddress.innerText);

    showToast("Alamat berhasil disalin ✓");
  } catch (err) {
    showToast("Gagal menyalin alamat");
  }
});

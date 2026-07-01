const targetDate = new Date("November 21, 2026 08:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();

  const distance = targetDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));

  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );

  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days;

  document.getElementById("hours").textContent = hours;

  document.getElementById("minutes").textContent = minutes;

  document.getElementById("seconds").textContent = seconds;
}, 1000);

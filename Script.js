const birthDate = new Date(2008, 11, 29, 0, 0, 0);

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  const target = document.getElementById(id);

  if (target) {
    target.classList.add("active");
  }
}

function diffParts(start, end) {
  let years = end.getFullYear() - start.getFullYear();

  let anniversary = new Date(start);
  anniversary.setFullYear(start.getFullYear() + years);

  if (anniversary > end) {
    years--;

    anniversary = new Date(start);
    anniversary.setFullYear(start.getFullYear() + years);
  }

  let rest = end - anniversary;

  const day = 86400000;
  const hour = 3600000;
  const minute = 60000;
  const second = 1000;

  const days = Math.floor(rest / day);
  rest %= day;

  const hours = Math.floor(rest / hour);
  rest %= hour;

  const minutes = Math.floor(rest / minute);
  rest %= minute;

  const seconds = Math.floor(rest / second);

  return {
    years,
    days,
    hours,
    minutes,
    seconds
  };
}

function updateTimer() {
  const d = diffParts(birthDate, new Date());

  for (const [id, value] of Object.entries(d)) {
    const element = document.getElementById(id);

    if (element) {
      element.textContent = value;
    }
  }
}

updateTimer();
setInterval(updateTimer, 1000);

function openGift() {
  const gift = document.querySelector(".gift-button");

  if (gift) {
    gift.style.display = "none";
  }

  const proposal = document.getElementById("proposal");

  if (proposal) {
    proposal.classList.add("show");
  }

  burst();
}

function burst() {
  for (let i = 0; i < 24; i++) {
    const h = document.createElement("span");

    h.textContent = ["💗", "♡", "✨", "🌸"][
      Math.floor(Math.random() * 4)
    ];

    h.style.position = "fixed";
    h.style.left = "50%";
    h.style.top = "55%";
    h.style.fontSize = (14 + Math.random() * 24) + "px";
    h.style.zIndex = "10";
    h.style.pointerEvents = "none";

    document.body.appendChild(h);

    const x = (Math.random() - 0.5) * window.innerWidth;
    const y = (Math.random() - 0.7) * window.innerHeight;

    h.animate(
      [
        {
          transform: "translate(-50%, -50%)",
          opacity: 1
        },
        {
          transform: `translate(${x}px, ${y}px) rotate(${Math.random() * 360}deg)`,
          opacity: 0
        }
      ],
      {
        duration: 1200 + Math.random() * 900,
        easing: "ease-out"
      }
    );

    setTimeout(() => h.remove(), 2200);
  }
}

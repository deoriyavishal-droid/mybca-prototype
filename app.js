let currentScreen = 'screen-landing';
let balanceVisible = true;
let flashOn = false;
let toastTimer = null;

function navigate(targetId) {
  const current = document.getElementById(currentScreen);
  const target = document.getElementById(targetId);
  if (!target || targetId === currentScreen) return;
  current.classList.remove('active');
  target.classList.add('active');
  target.scrollTop = 0;
  currentScreen = targetId;
}

function toggleBalance() {
  balanceVisible = !balanceVisible;
  const el = document.getElementById('balance-amount');
  const icon = document.getElementById('eye-icon');
  if (balanceVisible) {
    el.textContent = 'Rp1.000.000';
    icon.innerHTML = '<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>';
  } else {
    el.textContent = '\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022';
    icon.innerHTML = '<path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27z"/>';
  }
}

function toggleFlash() {
  flashOn = !flashOn;
  const circle = document.getElementById('flash-circle');
  if (flashOn) { circle.classList.add('on'); showToast('Senter menyala'); }
  else { circle.classList.remove('on'); showToast('Senter mati'); }
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.classList.remove('show'); }, 2000);
}

function copyText(text) {
  if (navigator.clipboard) { navigator.clipboard.writeText(text).then(() => { showToast('Disalin: ' + text); }); }
  else { showToast('Disalin: ' + text); }
}

function setActiveTab(el) {
  const tabs = el.parentElement.querySelectorAll('.filter-tab');
  tabs.forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const label = el.textContent;
  const txItems = document.querySelectorAll('.tx-item');
  txItems.forEach(item => {
    if (label === 'Semua') { item.style.display = 'flex'; }
    else if (label === 'Uang Masuk') { item.style.display = item.querySelector('.income-icon') ? 'flex' : 'none'; }
    else if (label === 'Uang Keluar') { item.style.display = item.querySelector('.expense-icon') ? 'flex' : 'none'; }
  });
}

function updateClock() {
  const now = new Date();
  const h = now.getHours().toString().padStart(2,'0');
  const m = now.getMinutes().toString().padStart(2,'0');
  const el = document.querySelector('.status-time');
  if (el) el.textContent = h + ':' + m;
}
updateClock();
setInterval(updateClock, 30000);

(function() {
  const dots = document.querySelectorAll('.dot');
  let filled = 0;
  function animateDots() {
    dots.forEach(d => d.classList.remove('filled'));
    filled = 0;
    const iv = setInterval(() => {
      if (filled < dots.length) { dots[filled].classList.add('filled'); filled++; }
      else clearInterval(iv);
    }, 200);
  }
  setTimeout(animateDots, 800);
})();
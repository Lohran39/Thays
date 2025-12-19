// ===================================
// PERSONALIZA AQUI (o presente) 🎁
// ===================================
const CONFIG = {
  name: "Thays",
  age: 20,
  from: "De alguém que te ama 💖",

  letter: `Thays,
hoje você faz 20… e eu só consigo pensar em como você é especial.

Você tem um jeito único de iluminar tudo ao redor: no sorriso, no cuidado, na força e na delicadeza.
Que essa nova fase seja leve, bonita, cheia de amor e de sonhos acontecendo do jeitinho certo.

Quando bater dúvida, lembra: você é capaz.
Quando bater medo, lembra: você é mais forte do que imagina.
E quando bater alegria… comemora muito, porque você merece.

Feliz 20, minha menina linda! 🎀✨
Com carinho,
`,

  reasons: [
    "Seu coração é gigante.",
    "Seu sorriso muda o clima do dia.",
    "Você tem um jeito delicado e forte ao mesmo tempo.",
    "Você é leal e de verdade.",
    "Você se dedica quando quer algo.",
    "Você é linda por dentro e por fora.",
    "Você faz as pessoas se sentirem bem.",
    "Seu carinho é diferente.",
    "Sua energia é leve e boa.",
    "Você tem personalidade.",
    "Você é corajosa (mesmo quando não percebe).",
    "Você merece o mundo.",
    "Você tem brilho próprio.",
    "Você é inteligente.",
    "Você tem senso de humor.",
    "Você é cuidadosa com quem ama.",
    "Você é determinada.",
    "Você tem um estilo bem menina e maravilhoso.",
    "Você inspira quem está perto.",
    "Você é inesquecível."
  ],

  // Playlist base (opcional). A pessoa pode adicionar outras no site.
  playlist: [
    { name: "Música 1", artist: "Artista", url: "" },
    { name: "Música 2", artist: "Artista", url: "" }
  ],

  surprises: [
    "Você é o tipo de pessoa que dá vontade de proteger, apoiar e celebrar todos os dias 💖",
    "Hoje a regra é: se for pra sorrir, sorri grande. Você merece um ano INCRÍVEL ✨",
    "Pedido do dia: se escolha mais. Se ame mais. Se priorize mais. 🎀",
    "Quando você acha que não tá brilhando, lembra: estrela não apaga — só fica atrás de nuvem 💫",
    "Feliz 20! Que você viva coisas lindas e leves, do jeitinho que seu coração gosta 💞"
  ],

  timeCapsule: [
    "Daqui 1 ano, você vai olhar pra trás e agradecer por ter continuado. Você é gigante 💖",
    "Você cresceu, amadureceu e ficou ainda mais linda. Nunca duvide do seu brilho ✨",
    "Tudo aquilo que parecia difícil virou história. Orgulho de você, Thays 🎀"
  ],

  missions: [
    "Tirar uma foto em um lugar novo 📸",
    "Comprar uma flor só pra você 🌸",
    "Fazer um date consigo mesma ☕",
    "Dançar uma música bem alto no quarto 🎶",
    "Escrever 10 sonhos e começar 1 deles ✨"
  ]
};

// ===================================
// APLICA CONFIG NO SITE
// ===================================
document.title = `${CONFIG.name} • Presente de ${CONFIG.age} anos ✨🎀`;
document.getElementById("pill").textContent = `${CONFIG.name} • ${CONFIG.age} anos 🎀`;
document.getElementById("title").textContent = `Feliz ${CONFIG.age}, ${CONFIG.name}! ✨`;
document.getElementById("ageTag").textContent = CONFIG.age;
document.getElementById("footerText").textContent = `Feito com carinho pra ${CONFIG.name} 💖`;

const letterEl = document.getElementById("letter");
letterEl.textContent = CONFIG.letter + CONFIG.from;

// Stats
const statPhotosEl = document.getElementById("statPhotos");
const statNotesEl = document.getElementById("statNotes");

// ===================================
// 20 motivos
// ===================================
const reasonsEl = document.getElementById("reasons");

function renderReasons(list){
  reasonsEl.innerHTML = "";
  list.forEach((text, i) => {
    const div = document.createElement("div");
    div.className = "reason";
    div.innerHTML = `<b>${String(i+1).padStart(2,"0")}.</b> <span>${text}</span>`;
    reasonsEl.appendChild(div);
  });
}
renderReasons(CONFIG.reasons);

document.getElementById("btnShuffle").addEventListener("click", () => {
  const copy = [...CONFIG.reasons];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  renderReasons(copy);
  spawnConfetti(120);
});

// ===================================
// GALERIA com upload + salvar no navegador
// ===================================
const galleryEl = document.getElementById("gallery");
const photoInput = document.getElementById("photoInput");
const btnClearGallery = document.getElementById("btnClearGallery");

const GALLERY_KEY = "thays_gift_gallery_v1";
let userPhotos = [];

function loadUserPhotos(){
  try{
    const raw = localStorage.getItem(GALLERY_KEY);
    userPhotos = raw ? JSON.parse(raw) : [];
  }catch{
    userPhotos = [];
  }
}

function saveUserPhotos(){
  try{
    localStorage.setItem(GALLERY_KEY, JSON.stringify(userPhotos));
  }catch{
    alert("A galeria ficou grande demais pra salvar aqui. Tente menos fotos ou fotos menores 🙂");
  }
}

function readFileAsDataURL(file){
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

function renderGallery(){
  galleryEl.innerHTML = "";

  // fotos do usuário
  userPhotos.forEach((p) => {
    const card = document.createElement("div");
    card.className = "photo";
    card.innerHTML = `
      <img src="${p.dataUrl}" alt="Foto adicionada" />
      <div class="cap">${p.caption || "💖"}</div>
    `;
    galleryEl.appendChild(card);
  });

  statPhotosEl.textContent = userPhotos.length;
}

loadUserPhotos();
renderGallery();

photoInput.addEventListener("change", async (e) => {
  const files = Array.from(e.target.files || []);
  if (!files.length) return;

  for (const file of files){
    if (!file.type.startsWith("image/")) continue;

    const dataUrl = await readFileAsDataURL(file);
    userPhotos.push({ dataUrl, caption: "Memória 💖", at: Date.now() });
  }

  saveUserPhotos();
  renderGallery();
  spawnConfetti(160);

  // permite escolher o mesmo arquivo de novo
  photoInput.value = "";
});

btnClearGallery.addEventListener("click", () => {
  if (!confirm("Quer limpar todas as fotos adicionadas neste dispositivo?")) return;
  userPhotos = [];
  saveUserPhotos();
  renderGallery();
});

// ===================================
// PLAYLIST com adicionar músicas + salvar no navegador
// ===================================
const playlistEl = document.getElementById("playlist");
const songForm = document.getElementById("songForm");
const btnClearPlaylist = document.getElementById("btnClearPlaylist");

const PLAYLIST_KEY = "thays_gift_playlist_v1";
let userSongs = [];

function loadUserSongs(){
  try{
    const raw = localStorage.getItem(PLAYLIST_KEY);
    userSongs = raw ? JSON.parse(raw) : [];
  }catch{
    userSongs = [];
  }
}

function saveUserSongs(){
  try{
    localStorage.setItem(PLAYLIST_KEY, JSON.stringify(userSongs));
  }catch{
    alert("Não deu pra salvar a playlist aqui (limite do navegador).");
  }
}

function renderPlaylist(){
  playlistEl.innerHTML = "";

  // junta: playlist base + músicas adicionadas
  const all = [...CONFIG.playlist, ...userSongs];

  all.forEach((s) => {
    const el = document.createElement(s.url ? "a" : "div");
    el.className = "song";
    if (s.url){
      el.href = s.url;
      el.target = "_blank";
      el.rel = "noopener";
    }
    el.innerHTML = `<div><b>${s.name}</b><br><small>${s.artist}</small></div><div>🎶</div>`;
    playlistEl.appendChild(el);
  });
}

loadUserSongs();
renderPlaylist();

songForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("songName").value.trim();
  const artist = document.getElementById("songArtist").value.trim();
  const url = document.getElementById("songUrl").value.trim();

  if (!name || !artist) return;

  userSongs.push({ name, artist, url, at: Date.now() });
  saveUserSongs();
  renderPlaylist();
  spawnConfetti(100);

  songForm.reset();
});

btnClearPlaylist.addEventListener("click", () => {
  if (!confirm("Quer limpar as músicas adicionadas neste dispositivo?")) return;
  userSongs = [];
  saveUserSongs();
  renderPlaylist();
});

// ===================================
// Cápsula do tempo + missões
// ===================================
const capsuleEl = document.getElementById("capsuleText");
function setNewCapsule(){
  capsuleEl.textContent = CONFIG.timeCapsule[Math.floor(Math.random() * CONFIG.timeCapsule.length)];
}
setNewCapsule();
document.getElementById("btnNewCapsule").addEventListener("click", () => {
  setNewCapsule();
  spawnConfetti(90);
});

const missionsEl = document.getElementById("missions");
missionsEl.innerHTML = "";
CONFIG.missions.forEach(m => {
  const li = document.createElement("li");
  li.textContent = m;
  missionsEl.appendChild(li);
});

// ===================================
// Mural (localStorage)
// ===================================
const form = document.getElementById("guestbookForm");
const list = document.getElementById("guestbookList");
const NOTES_KEY = "thays_gift_guestbook_v1";

function loadNotes(){
  const raw = localStorage.getItem(NOTES_KEY);
  const notes = raw ? JSON.parse(raw) : [];
  list.innerHTML = "";
  notes.slice().reverse().forEach(n => {
    const div = document.createElement("div");
    div.className = "note";
    div.innerHTML = `<b>${n.name}</b><span>${n.msg}</span>`;
    list.appendChild(div);
  });
  statNotesEl.textContent = notes.length;
}
loadNotes();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("gbName").value.trim();
  const msg = document.getElementById("gbMsg").value.trim();
  if (!name || !msg) return;

  const raw = localStorage.getItem(NOTES_KEY);
  const notes = raw ? JSON.parse(raw) : [];
  notes.push({ name, msg, at: Date.now() });
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));

  form.reset();
  loadNotes();
  spawnConfetti(140);
});

// ===================================
// Botões da carta
// ===================================
document.getElementById("btnCopyLetter").addEventListener("click", async () => {
  try{
    await navigator.clipboard.writeText(letterEl.textContent);
    spawnConfetti(80);
  }catch{
    alert("Não deu pra copiar automaticamente. Selecione e copie manualmente 🙂");
  }
});
document.getElementById("btnPrint").addEventListener("click", () => window.print());

// ===================================
// Modal surpresa
// ===================================
const modal = document.getElementById("modal");
const modalText = document.getElementById("modalText");
const closeModal = document.getElementById("closeModal");
const moreSurprise = document.getElementById("moreSurprise");
const confettiNow = document.getElementById("confettiNow");

function openModal(){
  modal.classList.add("show");
  modal.setAttribute("aria-hidden","false");
}
function hideModal(){
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden","true");
}
function newSurprise(){
  modalText.textContent = CONFIG.surprises[Math.floor(Math.random() * CONFIG.surprises.length)];
}

document.getElementById("btnOpenGift").addEventListener("click", () => {
  newSurprise();
  openModal();
  spawnConfetti(180);
});
closeModal.addEventListener("click", hideModal);
modal.addEventListener("click", (e) => { if(e.target === modal) hideModal(); });

moreSurprise.addEventListener("click", () => { newSurprise(); spawnConfetti(90); });
confettiNow.addEventListener("click", () => spawnConfetti(220));

// Confetti botão
document.getElementById("btnConfetti").addEventListener("click", () => spawnConfetti(220));

// ===================================
// CONFETTI (canvas)
// ===================================
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let W, H, raf = null;
const pieces = [];

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function rand(min, max){ return Math.random() * (max - min) + min; }

function spawnConfetti(amount = 160) {
  for (let i = 0; i < amount; i++) {
    pieces.push({
      x: rand(0, W),
      y: rand(-40, -10),
      a: rand(0, Math.PI * 2),
      s: rand(1.8, 4.8),
      w: rand(8, 14),
      h: rand(10, 18),
      spin: rand(-0.12, 0.12),
      drift: rand(-1.2, 1.2),
      life: 0,
      maxLife: rand(170, 260),
      hue: rand(295, 360)
    });
  }
  if (!raf) step();
}

function drawPiece(p) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.a);
  ctx.globalAlpha = Math.max(0, 1 - p.life / p.maxLife);

  ctx.fillStyle = `hsl(${p.hue}, 92%, 70%)`;
  ctx.beginPath();
  ctx.roundRect(-p.w/2, -p.h/2, p.w, p.h, 4);
  ctx.fill();

  ctx.globalAlpha *= 0.55;
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.roundRect(-p.w/2 + 2, -p.h/2 + 2, p.w/3, p.h/3, 3);
  ctx.fill();

  ctx.restore();
}

function step() {
  ctx.clearRect(0, 0, W, H);

  for (let i = pieces.length - 1; i >= 0; i--) {
    const p = pieces[i];
    p.life++;
    p.y += p.s;
    p.x += p.drift;
    p.a += p.spin;
    p.x += Math.sin((p.life + p.hue) * 0.04) * 0.6;

    drawPiece(p);

    if (p.y > H + 30 || p.life > p.maxLife) pieces.splice(i, 1);
  }

  if (pieces.length) raf = requestAnimationFrame(step);
  else { cancelAnimationFrame(raf); raf = null; }
}

// confete ao abrir
spawnConfetti(120);


const btn = document.getElementById("playBtn");
const audio = document.getElementById("audioPlayer");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progressContainer");
const thumb = document.getElementById("thumb");
const timeLabel = document.getElementById("audioTime");

/* ▶️ кнопка */
btn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        btn.textContent = "⏸ Пауза";
    } else {
        audio.pause();
        btn.textContent = "▶️ Начать";
    }
});

/* анимация */
audio.addEventListener("play", () => {
    btn.classList.add("playing");
});

audio.addEventListener("pause", () => {
    btn.classList.remove("playing");
});

/* прогресс обновляется */
audio.addEventListener("timeupdate", () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percent + "%";
    thumb.style.left = percent + "%";
});

/* ⏱ длительность */
audio.addEventListener("loadedmetadata", () => {
    const minutes = Math.floor(audio.duration / 60);
    const seconds = Math.floor(audio.duration % 60);
    timeLabel.textContent = `⏱ ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
});

/* КЛИК по полосе */
progressContainer.addEventListener("click", (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
});

/* ПЕРЕТАСКИВАНИЕ */
let isDragging = false;

progressContainer.addEventListener("mousedown", () => {
    isDragging = true;
});

document.addEventListener("mouseup", () => {
    isDragging = false;
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const rect = progressContainer.getBoundingClientRect();
    let offsetX = e.clientX - rect.left;

    if (offsetX < 0) offsetX = 0;
    if (offsetX > rect.width) offsetX = rect.width;

    const percent = offsetX / rect.width;
    audio.currentTime = percent * audio.duration;
});
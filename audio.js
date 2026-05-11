
// const btn = document.getElementById("playBtn");
// const audio = document.getElementById("audioPlayer");
// const progress = document.getElementById("progress");
// const progressContainer = document.getElementById("progressContainer");
// const thumb = document.getElementById("thumb");
// const timeLabel = document.getElementById("audioTime");

// /* ▶️ кнопка */
// btn.addEventListener("click", () => {
//     if (audio.paused) {
//         audio.play();
//         btn.textContent = "⏸ Пауза";
//     } else {
//         audio.pause();
//         btn.textContent = "▶️ Начать";
//     }
// });

// /* анимация */
// audio.addEventListener("play", () => {
//     btn.classList.add("playing");
// });

// audio.addEventListener("pause", () => {
//     btn.classList.remove("playing");
// });

// /* прогресс обновляется */
// audio.addEventListener("timeupdate", () => {
//     const percent = (audio.currentTime / audio.duration) * 100;
//     progress.style.width = percent + "%";
//     thumb.style.left = percent + "%";
// });

// /* ⏱ длительность */
// audio.addEventListener("loadedmetadata", () => {
//     const minutes = Math.floor(audio.duration / 60);
//     const seconds = Math.floor(audio.duration % 60);
//     timeLabel.textContent = `⏱ ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
// });

// /* КЛИК по полосе */
// progressContainer.addEventListener("click", (e) => {
//     const width = progressContainer.clientWidth;
//     const clickX = e.offsetX;
//     audio.currentTime = (clickX / width) * audio.duration;
// });

// /* ПЕРЕТАСКИВАНИЕ */
// let isDragging = false;

// progressContainer.addEventListener("mousedown", () => {
//     isDragging = true;
// });

// document.addEventListener("mouseup", () => {
//     isDragging = false;
// });

// document.addEventListener("mousemove", (e) => {
//     if (!isDragging) return;

//     const rect = progressContainer.getBoundingClientRect();
//     let offsetX = e.clientX - rect.left;

//     if (offsetX < 0) offsetX = 0;
//     if (offsetX > rect.width) offsetX = rect.width;

//     const percent = offsetX / rect.width;
//     audio.currentTime = percent * audio.duration;
// });

const audio = document.getElementById("audioPlayer");
const playBtn = document.getElementById("playBtn");

const progressContainer = document.getElementById("progressContainer");
const progress = document.getElementById("progress");
const thumb = document.getElementById("thumb");

const audioTime = document.getElementById("audioTime");

/* =========================
   PLAY / PAUSE
========================= */

function playAudio() {

    audio.play();

    playBtn.innerHTML = "⏸ Пауза";
    playBtn.classList.add("playing");

}

function pauseAudio() {

    audio.pause();

    playBtn.innerHTML = "▶️ Начать";
    playBtn.classList.remove("playing");

}



playBtn.addEventListener("click", () => {

    if (audio.paused) {

        audio.play();

        playBtn.innerHTML = "⏸ Пауза";

    } else {

        audio.pause();

        playBtn.innerHTML = "▶️ Начать";

    }

});

/* =========================
   AUDIO END
========================= */

audio.addEventListener("ended", () => {

    playBtn.innerHTML = "▶️ Начать";
    playBtn.classList.remove("playing");

    localStorage.removeItem(audio.src);

});

/* =========================
   PROGRESS BAR
========================= */

audio.addEventListener("timeupdate", () => {

    const percent = (audio.currentTime / audio.duration) * 100;

    progress.style.width = `${percent}%`;

    thumb.style.left = `${percent}%`;

    updateTime();

    saveProgress();

});

/* =========================
   SEEK
========================= */

progressContainer.addEventListener("click", (e) => {

    const width = progressContainer.clientWidth;

    const clickX = e.offsetX;

    audio.currentTime = (clickX / width) * audio.duration;

});

/* =========================
   TIME FORMAT
========================= */

function formatTime(seconds) {

    const mins = Math.floor(seconds / 60);

    const secs = Math.floor(seconds % 60);

    return `${mins}:${secs.toString().padStart(2, "0")}`;

}

function updateTime() {

    if (!audio.duration) return;

    audioTime.innerHTML =
        `⏱ ${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;

}

/* =========================
   SAVE POSITION
========================= */

function saveProgress() {

    localStorage.setItem(audio.src, audio.currentTime);

}

window.addEventListener("load", () => {

    const savedTime = localStorage.getItem(audio.src);

    if (savedTime) {
        audio.currentTime = savedTime;
    }

});

/* =========================
   MEDIA SESSION
========================= */

if ("mediaSession" in navigator) {

    navigator.mediaSession.metadata = new MediaMetadata({

        title: "Alicja w Krainie Czarów",
        artist: "Rozdział 1",

        artwork: [
            {
                src: "../images/icon-192.png",
                sizes: "192x192",
                type: "image/png"
            }
        ]

    });

    navigator.mediaSession.setActionHandler("play", () => {
        playAudio();
    });

    navigator.mediaSession.setActionHandler("pause", () => {
        pauseAudio();
    });

    navigator.mediaSession.setActionHandler("seekbackward", () => {
        audio.currentTime -= 10;
    });

    navigator.mediaSession.setActionHandler("seekforward", () => {
        audio.currentTime += 10;
    });

}

// 
const floatingBtn =
    document.getElementById("floatingAudioBtn");

/* FLOATING BUTTON */

floatingBtn.addEventListener("click", () => {

    if (audio.paused) {

        audio.play();

        floatingBtn.innerHTML = "⏸";

        playBtn.innerHTML = "⏸ Пауза";

    } else {

        audio.pause();

        floatingBtn.innerHTML = "▶";

        playBtn.innerHTML = "▶️ Начать";

    }

});

/* sync buttons */

audio.addEventListener("play", () => {

    floatingBtn.innerHTML = "⏸";

});

audio.addEventListener("pause", () => {

    floatingBtn.innerHTML = "▶";

});

audio.addEventListener("ended", () => {

    floatingBtn.innerHTML = "▶";

});
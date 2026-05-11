document.addEventListener("click", function(e) {

    const img = e.target.closest(".zum");

    // открыть
    if (img) {
        const overlay = document.createElement("div");
        overlay.classList.add("image-overlay");

        const bigImg = document.createElement("img");
        bigImg.src = img.src;

        const closeBtn = document.createElement("span");
        closeBtn.classList.add("image-close");
        closeBtn.innerHTML = "&times;";

        overlay.appendChild(closeBtn);
        overlay.appendChild(bigImg);
        document.body.appendChild(overlay);

        return;
    }

    // 🔴 если клик по крестику
    if (e.target.classList.contains("image-close")) {
        e.target.closest(".image-overlay").remove();
        return;
    }

    // 🔴 если клик по фону (НО НЕ по картинке)
    if (e.target.classList.contains("image-overlay")) {
        e.target.remove();
    }
});
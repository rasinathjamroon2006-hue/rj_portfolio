const frameCount = 240;
const canvas = document.getElementById("frameCanvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const currentFrame = index => 
  `frames/ezgif-frame-${String(index).padStart(3, '0')}.jpg`;

const images = [];
const img = new Image();

// Preload images
for (let i = 1; i <= frameCount; i++) {
    const image = new Image();
    image.src = currentFrame(i);
    images.push(image);
}

// Draw first frame when loaded
images[0].onload = function () {
    context.drawImage(images[0], 0, 0, canvas.width, canvas.height);
};

// Scroll animation
window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
    const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
    );

    requestAnimationFrame(() => {
        context.drawImage(images[frameIndex], 0, 0, canvas.width, canvas.height);
    });
});

// Resize support
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

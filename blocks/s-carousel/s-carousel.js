export default function decorate(block) {
  block.classList.add('image-carousel-block');

  const originalImages = Array.from(block.querySelectorAll('picture')).map(pic => {
    const img = pic.querySelector('img');
    return img ? img.cloneNode(true) : null;
  }).filter(Boolean);

  const track = document.createElement('div');
  track.className = 'image-carousel-track';

  // Duplicate images to fill the carousel and simulate circular flow
  const totalCopies = 3; // Adjust for smoother looping
  for (let i = 0; i < totalCopies; i++) {
    originalImages.forEach(img => {
      const clone = img.cloneNode(true);
      track.appendChild(clone);
    });
  }

  block.innerHTML = '';
  block.appendChild(track);

  let currentIndex = originalImages.length; // Start from middle set
  const allImages = track.querySelectorAll('img');

  function updateActive(index) {
    allImages.forEach(img => img.classList.remove('active'));
    const activeImg = allImages[index];
    activeImg.classList.add('active');

    const blockRect = block.getBoundingClientRect();
    const trackRect = track.getBoundingClientRect();
    const activeRect = activeImg.getBoundingClientRect();

    const offset = (blockRect.width / 2) - (activeRect.left + activeRect.width / 2 - trackRect.left);
    track.style.transform = `translateX(${offset}px)`;
  }

  function rotateCarousel(direction) {
    currentIndex += direction;

    // Reset index if out of bounds to simulate infinite loop
    if (currentIndex >= allImages.length - originalImages.length) {
      currentIndex = originalImages.length;
      track.style.transition = 'none';
      updateActive(currentIndex);
      requestAnimationFrame(() => {
        track.style.transition = 'transform 0.5s ease';
      });
    } else if (currentIndex < originalImages.length) {
      currentIndex = allImages.length - originalImages.length - 1;
      track.style.transition = 'none';
      updateActive(currentIndex);
      requestAnimationFrame(() => {
        track.style.transition = 'transform 0.5s ease';
      });
    } else {
      updateActive(currentIndex);
    }
  }

  allImages.forEach((img, i) => {
    img.addEventListener('click', () => {
      currentIndex = i;
      updateActive(currentIndex);
    });
  });

  setInterval(() => rotateCarousel(1), 5000);

  updateActive(currentIndex);
}

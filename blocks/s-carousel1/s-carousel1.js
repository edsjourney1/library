export default function decorate(block) {
  block.classList.add('image-carousel-block');

  const images = Array.from(block.querySelectorAll('picture'));
  const track = document.createElement('div');
  track.className = 'carousel-track';

  const dots = document.createElement('div');
  dots.className = 'carousel-dots';

  images.forEach((img, i) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-image-slide';
    slide.appendChild(img);
    track.appendChild(slide);

    const dot = document.createElement('span');
    dot.className = 'carousel-dot';
    dot.addEventListener('click', () => updateFocus(i));
    dots.appendChild(dot);
  });

  block.innerHTML = '';
  block.append(track, dots);

  function updateFocus(index) {
    const slides = track.children;
    const total = slides.length;

    [...slides].forEach((slide, i) => {
      slide.className = 'carousel-image-slide';
      if (i === index) slide.classList.add('focused');
      else if (i === (index - 1 + total) % total) slide.classList.add('side-left');
      else if (i === (index + 1) % total) slide.classList.add('side-right');
    });

    [...dots.children].forEach((dot, i) =>
      dot.classList.toggle('active', i === index)
    );
  }

  updateFocus(0);
}

export default function decorate(block) {
  block.classList.add('custom-image-gallery');

  const rows = Array.from(block.children);
  if (rows.length === 0) return;

  rows[0].classList.add('custom-gallery-heading');

  rows.slice(1).forEach((row) => {
    const columns = Array.from(row.children);
    if (columns[0]) columns[0].classList.add('custom-gallery-column');
    if (columns[1]) columns[1].classList.add('custom-gallery-column');
  });

  // Create modal once, outside block
  const modal = document.createElement('div');
  modal.className = 'custom-image-modal';
  modal.innerHTML = `
    <span class="custom-close-btn">&times;</span>
    <button class="custom-nav-btn custom-prev">&#10094;</button>
    <img class="custom-modal-img" src="" alt="Expanded view">
    <button class="custom-nav-btn custom-next">&#10095;</button>
  `;
  document.body.appendChild(modal);

  const modalImg = modal.querySelector('.custom-modal-img');
  const closeBtn = modal.querySelector('.custom-close-btn');
  const prevBtn = modal.querySelector('.custom-prev');
  const nextBtn = modal.querySelector('.custom-next');

  const allImages = Array.from(block.querySelectorAll('img'));
  let currentIndex = 0;

  function openModal(index) {
    currentIndex = index;
    modalImg.src = allImages[currentIndex].src;
    modal.style.display = 'flex';
  }

  function closeModal() {
    modal.style.display = 'none';
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    modalImg.src = allImages[currentIndex].src;
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % allImages.length;
    modalImg.src = allImages[currentIndex].src;
  }

  allImages.forEach((img, index) => {
    img.addEventListener('click', () => openModal(index));
  });

  closeBtn.addEventListener('click', closeModal);
  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);
}

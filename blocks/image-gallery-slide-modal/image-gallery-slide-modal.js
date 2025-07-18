export default function decorate(block) {
  block.classList.add('custom-image-gallery');

  const rows = Array.from(block.children);
  const headingRow = rows[0];
  headingRow.classList.add('custom-gallery-heading');

  const container = document.createElement('div');
  container.classList.add('custom-gallery-container');

  const leftDiv = document.createElement('div');
  leftDiv.classList.add('custom-gallery-column');

  const rightDiv = document.createElement('div');
  rightDiv.classList.add('custom-gallery-column');

  rows.slice(1).forEach((row) => {
    const columns = Array.from(row.children);
    if (columns[0]) leftDiv.appendChild(columns[0]);
    if (columns[1]) rightDiv.appendChild(columns[1]);
  });

  container.appendChild(leftDiv);
  container.appendChild(rightDiv);

  block.innerHTML = '';
  block.appendChild(headingRow);
  block.appendChild(container);

  // Create modal
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

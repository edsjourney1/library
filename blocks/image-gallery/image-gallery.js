export default function decorate(block) {
  block.classList.add('image-gallery-s');

  const rows = Array.from(block.children);

  if (rows.length === 0) return;

  rows[0].classList.add('image-gallery-s-heading');

  rows.slice(1).forEach((row) => {
    const columns = Array.from(row.children);
    if (columns[0]) columns[0].classList.add('image-gallery-s-column');
    if (columns[1]) columns[1].classList.add('image-gallery-s-column');
  });
}

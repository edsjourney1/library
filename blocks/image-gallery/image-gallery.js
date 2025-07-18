export default function decorate(block) {
  block.classList.add('image-gallery');

  const rows = Array.from(block.children);

  const headingRow = rows[0];
  headingRow.classList.add('image-gallery-heading');

  // Create container for columns
  const container = document.createElement('div');
  container.classList.add('image-gallery-container');

  const leftDiv = document.createElement('div');
  leftDiv.classList.add('image-gallery-column');

  const rightDiv = document.createElement('div');
  rightDiv.classList.add('image-gallery-column');

  rows.slice(1).forEach((row) => {
    const columns = Array.from(row.children);
    if (columns[0]) leftDiv.appendChild(columns[0]);
    if (columns[1]) rightDiv.appendChild(columns[1]);
  });

  container.appendChild(leftDiv);
  container.appendChild(rightDiv);

  block.innerHTML = '';
  block.appendChild(headingRow); // Keep heading row
  block.appendChild(container);
}

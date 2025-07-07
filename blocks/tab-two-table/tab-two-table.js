export default function decorate(block) {
    const container = block.closest('.tab-two-table-container');
    const allBlocks = container.querySelectorAll('.tab-two-table.block');
  
    if (allBlocks.length !== 2) return;
  
    // Assign first and second blocks explicitly
    const [firstTable, secondTable] = allBlocks;
  
    // If this is not the first table, exit
    if (block !== firstTable) return;
  
    // Assign IDs for clarity (optional but useful)
    firstTable.id = 'tab-two-table-buttons';
    secondTable.id = 'tab-two-table-content';
  
    const buttonRows = [...firstTable.children];
    const contentRows = [...secondTable.children];
  
    // Ensure both wrappers are visible
    firstTable.closest('.tab-two-table-wrapper').style.display = 'block';
    secondTable.closest('.tab-two-table-wrapper').style.display = 'block';
  
    // Show all rows in the first table
    buttonRows.forEach(row => {
      row.style.display = 'flex';
    });
  
    // Hide all rows in the second table initially
    contentRows.forEach(row => {
      row.style.display = 'none';
    });
  
    // Add buttons and click logic
    buttonRows.forEach((row, index) => {
      const cell = row.querySelector('p');
      if (!cell) return;
  
      // Avoid duplicate buttons
      if (!row.querySelector('button')) {
        const button = document.createElement('button');
        button.textContent = cell.textContent.trim();
        button.classList.add('tab-two-button');
  
        button.addEventListener('click', () => {
          contentRows.forEach((r, i) => {
            r.style.display = i === index ? 'flex' : 'none';
          });
        });
  
        cell.replaceWith(button);
      }
    });
  
    // Show first content row by default
    if (contentRows[0]) {
      contentRows[0].style.display = 'flex';
    }
  }
  
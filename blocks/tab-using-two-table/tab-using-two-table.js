export default function decorate(block) {
  const container = block.closest('.tab-using-two-table-container');
  const allBlocks = container.querySelectorAll('.tab-using-two-table.block');

  if (allBlocks.length !== 2) return;

  const [firstTable, secondTable] = allBlocks;

  if (block !== firstTable) return;

  const tabContainer = document.createElement('div');
  tabContainer.id = 'tab-two-table-buttons';
  tabContainer.className = 'tab-two-table-buttons';

  const contentContainer = document.createElement('div');
  contentContainer.id = 'tab-two-table-content';
  contentContainer.className = 'tab-two-table-content';

  firstTable.replaceWith(tabContainer);
  secondTable.replaceWith(contentContainer);

  const buttonRows = [...firstTable.children];
  const contentRows = [...secondTable.children];

  buttonRows.forEach((row, index) => {
    const title = row.querySelector('p');
    const content = contentRows[index];
    if (!title || !content) return;

    [...content.children].forEach(col => {
      const hasImage = col.querySelector('img, picture');
      col.classList.add(hasImage ? 'eds-image' : 'eds-content');
    });

    content.classList.add('eds-layout');
    if (!content.querySelector('.eds-image')) {
      content.classList.add('only-text');
    }

    const btn = document.createElement('button');
    btn.className = 'tab-two-button';
    btn.textContent = title.textContent.trim();
    btn.tabContent = content;

    tabContainer.appendChild(btn);
  });

  tabContainer.addEventListener('click', (e) => {
    if (!e.target.matches('.tab-two-button')) return;

    const content = e.target.tabContent;
    contentContainer.innerHTML = '';
    contentContainer.appendChild(content);

    tabContainer.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
  });

  // Show first content by default
  const firstButton = tabContainer.querySelector('.tab-two-button');
  if (firstButton) {
    firstButton.classList.add('active');
    contentContainer.appendChild(firstButton.tabContent);
  }
}

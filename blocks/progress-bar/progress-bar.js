export default function decorate(block) {
   
    [...block.children].forEach((row, index) => {
      row.classList.add('progress-bar-row');
  
      if (index === 0) {
        row.classList.add('progress-bar-title');
        return;
      }
  
      const [labelCell, percentCell] = row.children;
      if (!labelCell || !percentCell) return;
  
      const labelText = labelCell.textContent.trim();
      const percent = percentCell.textContent.trim();
  
      row.innerHTML = '';
  
      const label = document.createElement('label');
      label.className = 'progress-bar-label';
      label.textContent = labelText;
  
      const bar = document.createElement('div');
      bar.className = 'progress-bar-track';
      bar.setAttribute('data-percent', percent);
  
      const fill = document.createElement('div');
      fill.className = 'progress-bar-fill';
      fill.style.width = '0';
  
      bar.appendChild(fill);
      row.append(label, bar);
  
      setTimeout(() => {
        fill.style.width = `${percent}%`;
      }, 100);
    });
  }
  
export default function decorate(block) {
    block.classList.add('image-text-wrapper');
  
    const rows = Array.from(block.children);
  
    rows.forEach((row) => {
      row.classList.add('image-text-row');
  
      const cols = Array.from(row.children);
  
      cols.forEach((col) => {
        const picture = col.querySelector('picture');
        if (picture) {
          // This column contains the image
          col.classList.add('image-text-image-wrapper');
          const img = picture.querySelector('img');
          if (img) img.classList.add('image-text-image');
        } else {
          // This column contains the content
          col.classList.add('image-text-content-wrapper');
  
          const heading = col.querySelector('h3');
          if (heading) heading.classList.add('image-text-heading');
  
          const paragraphs = col.querySelectorAll('p');
          if (paragraphs.length > 0) {
            paragraphs[0].classList.add('image-text-description');
          }
          if (paragraphs.length > 1) {
            paragraphs[1].classList.add('button-container');
            const button = paragraphs[1].querySelector('a');
            if (button) button.classList.add('button', 'image-text-button');
          }
        }
      });
    });
  }
  
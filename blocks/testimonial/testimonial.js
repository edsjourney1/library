export default function decorate(block) {
  block.classList.add('s-testimonial-block');

  const rows = Array.from(block.children);

  rows.forEach((row, rowIndex) => {
      row.classList.add('s-testimonial-item'); 

      const cols = Array.from(row.children);

      cols.forEach((col, colIndex) => {
          if (colIndex === 0) { 
              col.classList.add('s-testimonial-image-wrapper');
              const pic = col.querySelector('picture');
              if (pic) {
                  pic.classList.add('s-testimonial-image');
              }
              const img = col.querySelector('picture img');
              if (img) {
                  img.classList.add('s-testimonial-profile-img');
              }
          } else if (colIndex === 1) { 
              col.classList.add('s-testimonial-content-wrapper');
              const paragraphs = Array.from(col.children);
              if (paragraphs[0]) {
                  paragraphs[0].classList.add('s-testimonial-message');
              }
              if (paragraphs[1]) {
                  paragraphs[1].classList.add('s-testimonial-name');
              }
              if (paragraphs[2]) {
                  paragraphs[2].classList.add('s-testimonial-designation');
              }
          }
      });
  });
}
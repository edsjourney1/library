export default function decorate(block) {
    const rows = [...block.children];
  
    rows.forEach((row, rowIndex) => {
      row.classList.add(
        rowIndex === 0 ? 'table-header' :
        rowIndex % 2 === 0 ? 'row-grey' : 'row-white'
      );
    });
  
    block.classList.add('columns-2-cols');
  }
  
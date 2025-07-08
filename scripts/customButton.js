 export default function convertButtons() {
    const elements = document.querySelectorAll('*');
   const buttonRegex = /\[button—([\w\s\-]+)—([^\s\]—]+)(?:—(blank))?](.*?)\[\/button]/gi;
   elements.forEach((el) => {
     const html = el.innerHTML;
     if (html.includes('[button—') && html.includes('[/button]')) {
       const newHtml = html.replace(buttonRegex, (_, classNames, href, target, text) => {
         const classes = classNames.trim().split(/\s+/).join(' ');
         const targetAttr = target === 'blank' ? ' target="_blank" rel="noopener noreferrer"' : '';
         return `<a href="${href.trim()}" class="button ${classes}"${targetAttr}>${text.trim()}</a>`;
       });
       if (newHtml !== html) {
         el.innerHTML = newHtml;
       }
     }
   });
  } 
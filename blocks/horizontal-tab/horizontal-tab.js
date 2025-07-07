export default function decorate(block) {
    const rows = [...block.children];
  
    // Create a container for tab buttons
    const tabButtonsContainer = document.createElement('div');
    tabButtonsContainer.classList.add('tab-buttons');
  
    // Create a container for tab content
    const tabContentContainer = document.createElement('div');
    tabContentContainer.classList.add('tab-content');
  
    // Store tab data
    const tabData = {};
  
    rows.forEach((row, index) => {
      const [tabTitleEl, tabContentEl] = row.children;
      const tabTitle = tabTitleEl.textContent.trim();
      const tabId = tabTitle.toLowerCase().replace(/\s+/g, '-');
  
      // Save content
      tabData[tabId] = tabContentEl.innerHTML;
  
      // Create button
      const button = document.createElement('button');
      button.textContent = tabTitle;
      button.dataset.tab = tabId;
      button.classList.add('tab-button');
      tabButtonsContainer.appendChild(button);
    });
  
    // Function to show tab content
    function showTab(tabId) {
      tabContentContainer.innerHTML = tabData[tabId] || '';
  
      // Add event listeners to inner tab triggers
      tabContentContainer.querySelectorAll('p').forEach(p => {
        const innerText = p.textContent.trim().toLowerCase();
        if (tabData[innerText]) {
          const innerButton = document.createElement('button');
          innerButton.textContent = p.textContent.trim();
          innerButton.classList.add('inner-tab-button');
          innerButton.addEventListener('click', () => showTab(innerText));
          p.replaceWith(innerButton);
        }
      });
    }
  
    // Initial tab
    const firstTabId = Object.keys(tabData)[0];
    showTab(firstTabId);
  
    // Add event listeners to top-level buttons
    tabButtonsContainer.querySelectorAll('button').forEach(button => {
      button.addEventListener('click', () => {
        showTab(button.dataset.tab);
      });
    });
  
    // Clear block and append new structure
    block.innerHTML = '';
    block.appendChild(tabButtonsContainer);
    block.appendChild(tabContentContainer);
  }
  
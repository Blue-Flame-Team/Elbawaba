document.addEventListener('DOMContentLoaded', function () {
    const dropdownTriggers = document.querySelectorAll('.dropdown > a');
  
    dropdownTriggers.forEach(function(trigger) {
      trigger.addEventListener('click', function(e) {
        const parentDropdown = trigger.closest('.dropdown');
        if (!parentDropdown) return;
  
        const href = trigger.getAttribute('href');
        if (!href || href === '#') {
          e.preventDefault();
        }
  
        e.stopPropagation();
  
        const isOpen = parentDropdown.classList.contains('open');
  
        document.querySelectorAll('.dropdown.open').forEach(function(openDropdown) {
          if (openDropdown !== parentDropdown) {
            openDropdown.classList.remove('open');
          }
        });
  
        parentDropdown.classList.toggle('open', !isOpen);
      });
    });
  
    document.addEventListener('click', function(e) {
      const clickedInsideDropdown = e.target.closest('.dropdown');
  
      if (!clickedInsideDropdown) {
        document.querySelectorAll('.dropdown.open').forEach(function(openDropdown) {
          openDropdown.classList.remove('open');
        });
      }
    });
  });
  
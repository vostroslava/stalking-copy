// Main javascript file

const adjustNavLinks = () => {
  const isHomePage = window.location.pathname === '/' || window.location.pathname === '/index.html';
  const navLinks = [
    { id: 'nav-programs', href: '#programs' },
    { id: 'nav-events', href: '#events' },
    { id: 'nav-speakers', href: '#speakers' },
    { id: 'nav-cases', href: '#cases' },
    { id: 'nav-about', href: '#about' },
    { id: 'nav-contact', href: '#contact' },
  ];

  if (!isHomePage) {
    navLinks.forEach(linkInfo => {
      const linkElement = document.getElementById(linkInfo.id);
      if (linkElement) {
        linkElement.href = `/index.html${linkInfo.href}`;
      }
    });
  }
};

const loadHtmlPartials = async () => {
  const fetchHtml = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
      }
      return await response.text();
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const headerPlaceholder = document.getElementById('header-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');

  const headerPromise = headerPlaceholder ? fetchHtml('/partials/_header.html') : Promise.resolve(null);
  const footerPromise = footerPlaceholder ? fetchHtml('/partials/_footer.html') : Promise.resolve(null);

  const [headerHtml, footerHtml] = await Promise.all([headerPromise, footerPromise]);

  if (headerPlaceholder && headerHtml) {
    headerPlaceholder.innerHTML = headerHtml;
    adjustNavLinks(); // Adjust links after header is loaded
  }

  if (footerPlaceholder && footerHtml) {
    footerPlaceholder.innerHTML = footerHtml;
  }
};

// Smooth scroll for anchor links
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#!') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
};

// Form handling
const initFormHandling = () => {
  const form = document.querySelector('.contact__form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    // For now, we'll just show a success message
    alert('Спасибо за вашу заявку! Мы свяжемся с вами в ближайшее время.');
    form.reset();
  });
};

document.addEventListener('DOMContentLoaded', () => {
  loadHtmlPartials().then(() => {
    initSmoothScroll();
    initFormHandling();
  });
  initSmoothScroll();
  initFormHandling();
});

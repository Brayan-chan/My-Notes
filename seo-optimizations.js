// SEO Technical Optimizations

// Service Worker para PWA (opcional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js')
      .then(function(registration) {
        console.log('ServiceWorker registration successful');
      })
      .catch(function(err) {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}

// Lazy loading para imágenes
document.addEventListener('DOMContentLoaded', function() {
  // Configurar lazy loading para imágenes
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }
});

// Mejorar Core Web Vitals
// Medir y reportar métricas de rendimiento
function measurePerformance() {
  // Largest Contentful Paint (LCP)
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      console.log('LCP:', entry.startTime);
    }
  }).observe({ entryTypes: ['largest-contentful-paint'] });

  // First Input Delay (FID)
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      console.log('FID:', entry.processingStart - entry.startTime);
    }
  }).observe({ entryTypes: ['first-input'] });

  // Cumulative Layout Shift (CLS)
  let clsValue = 0;
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
        console.log('CLS:', clsValue);
      }
    }
  }).observe({ entryTypes: ['layout-shift'] });
}

// Ejecutar medición de rendimiento solo en producción
if (window.location.hostname !== 'localhost') {
  measurePerformance();
}

// Precargar recursos críticos
function preloadCriticalResources() {
  // Precargar CSS crítico si no está ya cargado
  const criticalCSS = [
    'styles.css',
    'seo-optimizations.css'
  ];
  
  criticalCSS.forEach(css => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = css;
    document.head.appendChild(link);
  });
}

// Optimización para motores de búsqueda
function setupSEOOptimizations() {
  // Agregar schema markup dinámico si es necesario
  
  // Mejorar navegación con breadcrumbs
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
      "item": window.location.origin
    }]
  };
  
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(breadcrumb);
  document.head.appendChild(script);
  
  // Actualizar meta description dinámicamente si hay contenido
  const noteContent = document.getElementById('note-content-div');
  if (noteContent && noteContent.textContent.trim()) {
    const metaDesc = document.querySelector('meta[name="description"]');
    const content = noteContent.textContent.substring(0, 150) + '...';
    if (metaDesc && content.length > 20) {
      metaDesc.setAttribute('content', `${content} - My Notes Editor`);
    }
  }
}

// Ejecutar optimizaciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  preloadCriticalResources();
  setupSEOOptimizations();
});

// Manejo de errores para SEO
window.addEventListener('error', function(e) {
  console.error('Error capturado para SEO:', e.error);
  // Aquí podrías enviar errores a un servicio de monitoreo
});

// Añadir meta viewport dinámico para PWA
if (!document.querySelector('meta[name="viewport"]')) {
  const viewport = document.createElement('meta');
  viewport.name = 'viewport';
  viewport.content = 'width=device-width, initial-scale=1.0, viewport-fit=cover';
  document.head.appendChild(viewport);
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('carruselContainer');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  let autoSlideInterval;

  // Obtiene el ancho dinámico de cada slide
  const getSlideWidth = () => {
    const slide = container.querySelector('.carrusel-slide');
    return slide ? slide.offsetWidth : 300;
  };

  // Función para avanzar una imagen
  const slideNext = () => {
    const maxScroll = container.scrollWidth - container.clientWidth;
    if (container.scrollLeft >= maxScroll - 5) {
      container.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: getSlideWidth(), behavior: 'smooth' });
    }
  };

  // Función para retroceder una imagen
  const slidePrev = () => {
    if (container.scrollLeft <= 5) {
      const maxScroll = container.scrollWidth - container.clientWidth;
      container.scrollTo({ left: maxScroll, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: -getSlideWidth(), behavior: 'smooth' });
    }
  };

  // Eventos de los botones (flechas)
  nextBtn.addEventListener('click', () => {
    slideNext();
    resetTimer();
  });

  prevBtn.addEventListener('click', () => {
    slidePrev();
    resetTimer();
  });

  // Control del temporizador para el avance automático (cada 3.5 segundos)
  const startTimer = () => {
    autoSlideInterval = setInterval(slideNext, 3500);
  };

  const resetTimer = () => {
    clearInterval(autoSlideInterval);
    startTimer();
  };

  // Pausar la animación cuando el usuario interactúa (hover o touch)
  container.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
  container.addEventListener('mouseleave', startTimer);
  container.addEventListener('touchstart', () => clearInterval(autoSlideInterval), { passive: true });
  container.addEventListener('touchend', startTimer);

  // Iniciar el temporizador
  startTimer();
});
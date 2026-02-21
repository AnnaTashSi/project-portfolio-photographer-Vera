window.onload = function() {
// Burger
    selectedBurger();
// Slider
    // changeImage();
    slickSlider();
// Modals
  modal();
}

//Burger handler 
const selectedBurger = () => {
    document.querySelector('.burger').addEventListener('click', () => {
        const nav = document.querySelector('.nav');
        nav.classList.add('nav-opened')
    })

    document.querySelector('.nav-close').addEventListener('click', closeMenu)
    document.querySelectorAll('.nav-item').forEach(navItem => navItem.addEventListener('click', closeMenu))
}

function closeMenu() {
    const nav = document.querySelector('.nav');
    nav.classList.remove('nav-opened')
}


//Slider
const slickSlider = () => {
    
const arrow = () => {
//     $(document).ready(function () {
//     $('.slider-wrapper').slick({
//     prevArrow: $('.slick-track::before'),
//     nextArrow: $('.slick-track::after'),
//     })
// });
}
arrow();

const slickCenter = () => {
    // $(document).ready(function () {
    $(".slides").slick({
    slidesToShow: 5, //сколько слайдов показывать одновременно
    slidesToScroll: 1, //сколько слайдов перематывать   
    centerMode: true, //центрируем активный слайд
    centerPadding: "0px", // отступ, чтобы показать часть слайдов слева и справа
    dots: false,
    arrows: false,
    cssEase: 'linear',
    autoplay: true, //автоматически перематывать слайды
    // infinite: false, //бесконечный скролл слайдов ?
    assessibility: false,
    adaptiveHeight: true,
    // rtl: false,
    focusOnSelect: true,
    // initialSlide: 2,   
    autoplaySpeed: 1500, //скорость автоматического перематывания слайдов (в миллисекундах)
//   });
});
}
slickCenter();

}

  






const changeImage = () => {
    const slidesContainer = document.getElementById('slides');
  const slides = document.querySelectorAll('.slide');
  const prevZone = document.getElementById('prevBtn');
  const nextZone = document.getElementById('nextBtn');

  if (!slidesContainer || slides.length === 0) return;

  let currentSlide = 0;
  const totalSlides = slides.length;
  let isAnimating = false;
  let autoSlideInterval;
  let hoverDirection = 0;
  let hoverTimer = null;

  // Переключение слайда
  function goToSlide(index) {
    if (isAnimating) return;

    // Циклическая навигация
    if (index >= totalSlides) index = 0;
    if (index < 0) index = totalSlides - 1;

    isAnimating = true;
    currentSlide = index;
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;


    setTimeout(() => {
      isAnimating = false;
      if (hoverDirection !== 0) {
        scheduleNextSlide();
      }
    }, 600);
  }

  // Запланировать следующий слайд при наведении
  function scheduleNextSlide() {
    if (hoverTimer) clearTimeout(hoverTimer);
    hoverTimer = setTimeout(() => {
      if (hoverDirection !== 0 && !isAnimating) {
        goToSlide(currentSlide + hoverDirection);
      }
    }, 1800);
  }

  // Обработчики наведения
  prevZone.addEventListener('mouseover', () => {
    hoverDirection = -1;
    if (!isAnimating) scheduleNextSlide();
  });

  nextZone.addEventListener('mouseover', () => {
    hoverDirection = 1;
    if (!isAnimating) scheduleNextSlide();
  });

  const stopHover = () => {
    hoverDirection = 0;
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      hoverTimer = null;
    }
  };

  prevZone.addEventListener('mouseout', stopHover);
  nextZone.addEventListener('mouseout', stopHover);

  // Автопрокрутка 
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      const wrapper = document.querySelector('.slider-wrapper');
      if (!wrapper.matches(':hover')) {
        goToSlide(currentSlide + 1);
      }
    }, 5000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  const wrapper = document.querySelector('.slider-wrapper');
  wrapper.addEventListener('mouseenter', stopAutoSlide);
  wrapper.addEventListener('mouseleave', startAutoSlide);

  // Запуск автопрокрутки
  startAutoSlide();
}


// Modals
const modal = () => {
  // Получаем необходимые элементы
  const openModalButtons = document.querySelectorAll('.button'); /*КнопкИ для открытия модального окна*/ 
  const modalOverlay = document.querySelector('.modal-overlay'); /*Модальное окно*/ 
  const closeModalButton = document.querySelector('.close-btn'); /*Крестик */
  // const cancelModalButton = document.querySelector('.cancelModal'); /*Если добавить кнопку Отмена */

  // Функция открытия модального окна
  function openModal() {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Запрещаем прокрутку страницы
  }

  // Функция закрытия модального окна
  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Разрешаем прокрутку страницы
  }

  // Обработчики событий для кнопок
  // на каждый button
  openModalButtons.forEach((openModalButton) => {
    openModalButton.addEventListener('click', openModal);
  });    
  closeModalButton.addEventListener('click', closeModal);
  // cancelModalButton.addEventListener('click', closeModal);

  // Закрытие модального окна при клике на оверлей
  modalOverlay.addEventListener('click', function(event) {
    if (event.target.classList.contains ('modal-overlay')) {
    closeModal();
    }
  });

  // Закрытие модального окна при нажатии Escape
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modalOverlay.classList.contains('active')) {
    closeModal();
    }
  });
}
jQuery(document).ready(function($) {
    let
   
      $window = $(window), // Основное окно
   
      $target = $("#nav"), // Блок, который нужно фиксировать при прокрутке
   
      $h = $target.offset().top; // Определяем координаты верха нужного блока (например, с навигацией или виджетом, который надо фиксировать)
   
    $window.on('scroll', function() {
   
      // Как далеко вниз прокрутили страницу
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
   
      // Если прокрутили скролл ниже макушки нужного блока, включаем ему фиксацию
      if (scrollTop > $h) {
   
        $target.addClass("sheensay_fixed");
   
      // Иначе возвращаем всё назад
      } else {     
   
        $target.removeClass("sheensay_fixed");
      }
    });
   
  });

  // Табы
	// Класс ul у вкладок по которым будем переключаться $('ul.best-product__wrapper-links')
	// При клике на класс будет активная вкладка .on('click', 'li:not(.best-product__wrapper-links_active)
	// Вписывать класс Li li:not(.catalog__navigation-tab-wrapper_active)'
	$('ul.best-product__wrapper-links').on('click', 'li:not(.best-product__wrapper-links_active)', function() {
		$(this)
		// При нажатии на не активный таб, то он становится активным .addClass('best-product__links_active')
		// У не активных табов убирает класс активности .removeClass('best-product__links_active')
		  .addClass('best-product__links_active').siblings().removeClass('best-product__links_active')
		//   Общая обёртка всего, вкладок и табов ( .closest('div.container') )
		// Обёртка конкретный табов по катериям, для триатлона или для беги и подобное... ( .find('div.catalog__tabs') )
		// Тоже самое что и сверху, только добавляем класс активности ( .removeClass('catalog__tabs_active') ) ----> .eq($(this).index()).addClass('catalog__tabs_active');
		  .closest('div.container').find('div.best-product__all').removeClass('best-product__all_active').eq($(this).index()).addClass('best-product__all_active');
  });
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

var cart = {}; // Корзина
  
function init() {
  //вычитуем файл goods.json
  $.getJSON("goods.json", goodsOut);
}

function goodsOut(data) {
	// вывод на страницу
	console.log(data);
	let out='';
	for (var key in data) {
		out +='<div class="shop-catalog__wrapper-card">';
		out +='<div class="shop-catalog__first-half">';
		out +=`<img src="img/shirt/${data[key].img}" alt="">`;
		out +='</div>';

		out +='<div class="shop-catalog__second-half">';
		out +=`<div class="name">${data[key].name}</div>`;
		out +=`<div class="cost">${data[key].cost}</div>`;
		out +=`<div class="description">${data[key].description}</div>`;
		out +=`<button class="buttons buttons__in-basket" data-id="${key}">В корзину</button>`;
		out +='<a href="#"><button class="buttons buttons__more">Подробнее</button></a>';
		out +='</div>';
		out +='</div>';
	}
	$('.goods-out').html(out);
	$('.buttons__in-basket').on('click', buttonsButtonsInBasket);
}

function buttonsButtonsInBasket() {
	// Добавляем товар в корзину
	var id = $(this).attr('data-id');
	// console.log(id);
	if (cart[id]==undefined) {
		cart[id] = 1; // Если в корзине нет товара, то делаем равным 1
	}
	else {
		cart[id]++; // Если такой товар есть, увеличиваю на 1
	}
	showMiniCart();
	saveCart();
}

function saveCart() {
	// Сохраняю корзину в localStorage
	localStorage.setItem('cart', JSON.stringify(cart)); // Корзину в строку
}

function showMiniCart() {
	// Показываю мини корзину
	var out="";
	for (var key in cart) {
		out += key +' --- '+ cart[key]+'<br>';
	}
	$('.mini-cart').html(out);
}

function loadCart() {
	// Проверяю есть ли в localStorage запись cart
	if (localStorage.getItem('cart')) {
		// Если есть - расшифровываю и записываю переменную cart
		cart = JSON.parse(localStorage.getItem('cart'));
		showMiniCart();
	}
}

$(document).ready(function () {
	init();
	loadCart();
});
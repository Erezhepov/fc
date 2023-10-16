(function () {
	'use strict';

	function Anchor() {
		let init = function () {
			let anchors = document.querySelectorAll('.anchor[href^="#"]');
			for (let i = 0; i < anchors.length; i++) {
				const anchor = anchors[i];
				anchor.addEventListener('click', function (e) {
					e.preventDefault();
					document.querySelector(anchor.getAttribute("href")).scrollIntoView({
						behavior: 'smooth',
						block: 'start',
						inline: 'start',
					});
				});
			}
		};

		init();
	}

	function closest(element, selector) {
		if (element.closest) {
			return element.closest(selector);
		}
		function closest(parentElement, selector) {
			if (!parentElement) return null;
			if (parentElement.matches(selector)) return parentElement;
			if (!parentElement.parentElement) return null;
			return closest(element.parentElement, selector);
		}

		return closest(element.parentElement, selector);
	}

	function Nav() {
		let nav, btn, opened = false;
		let classes = {
			nav: {
				base: 'nav',
				opened: 'nav--opened'
			},
			btn: {
				base: 'nav-btn',
				active: 'nav-btn--active',
				closed: 'nav-btn--closed'
			}
		};

		let close = function () {
			opened = false;
			nav.classList.remove(classes.nav.opened);
			btn.classList.remove(classes.btn.active);
			btn.classList.add(classes.btn.closed);
		};
		let open = function () {
			opened = true;
			nav.classList.add(classes.nav.opened);
			btn.classList.remove(classes.btn.closed);
			btn.classList.add(classes.btn.active);
		};
		let toggle = function () {
			if (opened) {
				close();
			} else {
				open();
			}
		};
		let listenBtnClick = function () {
			btn.addEventListener('click', toggle);
		};
		let listenOutClick = function () {
			document.addEventListener('mousedown', function (event) {
				if (!event.target) return;
				if (!opened) return;
				if (event.target !== btn && !closest(event.target, '.' + classes.btn.base)) {
					close();
				}
			});
		};
		let init = function () {
			nav = document.querySelector('.' + classes.nav.base);
			btn = document.querySelector('.' + classes.btn.base);

			listenOutClick();
			listenBtnClick();
		};

		init();
	}

	function VacancyBtn() {
		let goToVacancies = function () {
			document.querySelector('#tmpl-hh__vacancies-block').scrollIntoView({
				behavior: "smooth"
			});
		};
		let listenClick = function () {
			let vacanciesBtns = document.getElementsByClassName('tmpl-hh__vacancy-btn');

			for (let i = 0; i < vacanciesBtns.length; i++) {
				vacanciesBtns[i].addEventListener('click', function (event) {
					event.preventDefault();
					goToVacancies();
				});
			}
		};
		let init = function () {
			listenClick();
		};

		init();
	}

	function VSwiper() {
		let prefix = "";
		let defaultParams = {
			containerModifierClass: prefix + 'swiper-container-',
			slideClass: prefix + 'swiper-slide',
			slideActiveClass: prefix + 'swiper-slide-active',
			slideDuplicateActiveClass: prefix + 'swiper-slide-duplicate-active',
			slideVisibleClass: prefix + 'swiper-slide-visible',
			slideDuplicateClass: prefix + 'swiper-slide-duplicate',
			slideNextClass: prefix + 'swiper-slide-next',
			slideDuplicateNextClass: prefix + 'swiper-slide-duplicate-next',
			slidePrevClass: prefix + 'swiper-slide-prev',
			slideDuplicatePrevClass: prefix + 'swiper-slide-duplicate-prev',
			slideBlankClass: prefix + 'swiper-slide-invisible-blank',
			wrapperClass: prefix + 'swiper-wrapper',
			navigation: {
				disabledClass: prefix + 'swiper-button-disabled',
				hiddenClass: prefix + 'swiper-button-hidden',
				lockClass: prefix + 'swiper-button-lock'
			},
			pagination: {
				bulletClass: prefix + 'swiper-pagination-bullet',
				bulletActiveClass: prefix + 'swiper-pagination-bullet-active',
				modifierClass: prefix + 'swiper-pagination-',
				currentClass: prefix + 'swiper-pagination-current',
				totalClass: prefix + 'swiper-pagination-total',
				hiddenClass: prefix + 'swiper-pagination-hidden',
				progressbarFillClass: prefix + 'swiper-pagination-progressbar-fill',
				clickableClass: prefix + 'swiper-pagination-clickable',
				lockClass: prefix + 'swiper-pagination-lock',
				progressbarOppositeClass: prefix + 'swiper-pagination-progressbar-opposite',
			},
			scrollbar: {
				lockClass: prefix + 'swiper-scrollbar-lock',
				dragClass: prefix + 'swiper-scrollbar-drag',
			}
		};

		this.init = function (el, slierParams) {
			if (!slierParams) slierParams = {};

			let defaultParamsKeys = Object.keys(defaultParams);

			for (let i = 0; i < defaultParamsKeys.length; i++) {
				let index = defaultParamsKeys[i],
					param = defaultParams[index];

				if (!slierParams[index]) {
					slierParams[index] = param;
				} else if (param instanceof Object) {
					let paramKeys = Object.keys(param);

					for (let i2 = 0; i2 < paramKeys.length; i2++) {
						let index2 = paramKeys[i2],
							param2 = param[index2];

						if (!slierParams[index][index2]) {
							slierParams[index][index2] = param2;
						}
					}
				}
			}

			return new Swiper(el, slierParams);
		};
	}

	/*
		--------------------------------------------
		--------------------------------------------
						SLIDERS
		--------------------------------------------
		--------------------------------------------
	 */
	function initMainSlider() {
		swiper.init('.main-slider', {
			loop: true,
			centeredSlides: true,
			slidesPerView: 1,
			spaceBetween: 0,
			navigation: {
				prevEl: ".main-slider-arrow-prev",
				nextEl: ".main-slider-arrow-next",
			},
			breakpoints: {}
		});
	}


	/*
		--------------------------------------------
		--------------------------------------------
							COMMON
		--------------------------------------------
		--------------------------------------------
	 */


	const swiper = new VSwiper();
	new Anchor();
	new VacancyBtn();
	new Nav();
	initMainSlider();

	let wrapper = document.querySelector('.wrapper');
	function checkWidth() {
		if (window.innerWidth < 1800) {
			wrapper.classList.remove('bg');
		} else {
			wrapper.classList.add('bg');
		}
	}
	checkWidth();
	window.addEventListener('scroll', checkWidth);

}());

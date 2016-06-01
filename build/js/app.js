$(document).ready( function() {

	 $(document).click(function() {
	        $(".js-select").removeClass("is-active");
		    $(".js-select-list").slideUp(100);
		    $('.js-drop').removeClass('is-active');
		    $('.js-drop-list').fadeOut();
			$('.js-accordions-mod .js-accord').removeClass('is-active');
			$('.js-accordions-mod .js-accord-block').slideUp(500);
	    });
	    
	    // select list
	      $("body").on("click",".js-select",function(event) {
	          event.stopPropagation();
	      });
	      $("body").on("click",".js-select-text",function(event) {
	      	var select = $(this).parents(".js-select");
	          if (select.hasClass("is-active")) {
	              $(".js-select").removeClass("is-active");
	              $(".js-select-list").slideUp(100);
	          }
	          else {
	              $(".js-select").removeClass("is-active");
	              $(".js-select-list").slideUp(100);
	              select.toggleClass("is-active").find(".js-select-list").slideToggle(100);
	          }
	         
	      });

	      $("body").on("click",".js-select-list li",function() {
	          var val = $(this).text();
	          var text = $(this).text();
	          var select = $(this).parents(".js-select");
	          var selectList = $(this).parents(".js-select-list");
	          select.find(".js-select-text").text(text);
	          select.find("option").removeAttr("selected");
	          select.find('option[value="'+val+'"]').attr("selected", "selected");
	          selectList.find("li").removeClass("is-active");
	          $(this).addClass("is-active");
	          select.removeClass("is-active");
	          selectList.slideUp(100);
	          return false;
	          
	      });


	// open nav
	// function navOpen() {
	// 	$('.js-list-links').each(function() {
	// 		if ($(this).parent().hasClass('is-active')) {
	// 			$(this).show();
	// 		}
	// 	});
	// 	$('.js-nav-item').on('click', function() {
	// 		var this_ = $(this).parent(),
	// 			item = $('.js-nav-item').parent(),
	// 			thisList = this_.find('.js-list-links'),
	// 			list = $('.js-list-links');
	// 		if (!this_.hasClass('is-active')) {
	// 			item.removeClass('is-active');
	// 			list.slideUp(500);
	// 			this_.addClass('is-active');
	// 			thisList.slideDown(500);
	// 		}
	// 		else {
	// 			this_.removeClass('is-active');
	// 			list.slideUp(500);
	// 		}
	// 		return false;
	// 	});
	// }
	// navOpen();

	// spiner
	function spiner() {
		var number = $('.js-spiner');
		number.each(function(){
			var max_number = +($(this).attr('data-max-number'));
			var input = $(this).find('input');
			var plus = $(this).find('.js-plus');
			var minus = $(this).find('.js-minus');
			plus.on('click', function(){
				var val = +(input.val());
				if (val >= max_number) {
					return false;
				}
				else {
					val += 1;
					input.val(val);
				}
			});
			minus.on('click', function(){
				var val = +(input.val());
				if (val > 1) {
					val -= 1;
					input.val(val);
				}
				else {
					input.val('1');
					return false;
				}
			});
		});
	}
	spiner();

	// slider
	$('[class*="js-slider"], .js-galery').on('init', function(slick){
		$(this).addClass('is-init');
	});
	$('.js-slider').slick({
		dots: true,
		arrows: true,
		infinite: false,
		adaptiveHeight: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 4,
		cssEase: 'linear',
		responsive: [
			{
				breakpoint: 1180,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: false,
					dots: true
				}
			}
		]
	});
	$('.js-galery').slick({
		dots: true,
		arrows: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		speed: 700,
		autoplaySpeed: 3000,
		fade: true,
		cssEase: 'linear',
	});
	$('.js-slider-for').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		asNavFor: '.js-slider-nav'
	});
	$('.js-slider-nav').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		asNavFor: '.js-slider-for',
		dots: false,
		arrows: false,
		focusOnSelect: true
	});

	// dropdown
	$('.js-open-drop').on('click', function(event) {
		var this_ = $(this).parents('.js-drop'),
			list = this_.find('.js-drop-list');
		if (this_.hasClass('is-active')) {
			this_.removeClass('is-active');
			list.fadeOut();
		}
		else {
			this_.addClass('is-active');
			list.fadeIn();
		}
		event.stopPropagation();
	});

	// multiple-select
	$('.js-multiple-select').multipleSelect({
		selectAll: true,
		countSelected: 10,
		allSelected: 'Все бренды',
		// minimumCountSelected: 10,
		selectAllText: "Все бренды",
		selectAllDelimiter: ['',''],
        onClose: function() {
			$('.ms-choice').removeClass('is-active');
		}
	});

	$('.js-filter-select').multipleSelect({
		single: true,
		onClose: function() {
			$('.ms-choice').removeClass('is-active');
		}
	});
	function activeSel() {
		var parent 		= $('.multiple-select'),
			item 		= parent.find('> button'),
			first 		= parent.find('.ms-drop li:first'),
			firstCheck 	= first.find('input[type="checkbox"]');
		firstCheck.on('change', function() {
			if ($(this).is(':checked')) {
				$(this).parents('li').toggleClass('selected');
			}
		});
		item.on('click', function () {
			var this_ 	= $(this),
				div 	= this_.find('> div'),
				drop 	= this_.parents('.ms-parent').find('.ms-drop');
			if (!div.hasClass('open')) {
				$('.ms-choice').removeClass('is-active');
			}
			else {
				setTimeout(function(){
					div.parents('.ms-choice').addClass('is-active');
				}, 10);
			}
		});
	}
	activeSel();
	

	// items add wrap
	function itemWrap() {
		function addWrap() {
			var row = $('.items__row'),
				item = $('.items__wrap').find('.item');
			if ($(window).width() < 1166) {
				while(row.children('.item:not(.items__wrap)').length)
					row.children('.item:not(.items__wrap):lt(2)').wrapAll('<div class="items__wrap">');
			}
			else {
				item.unwrap();
			};
		}
		window.onload = function() {
			addWrap();
		};
		$(window).resize(function() {
			addWrap();
		});
	} itemWrap();

	// accordion
	function accord() {
		$('.js-accord').each(function() {
			var this_ 	= $(this),
				block 	= this_.find('.js-accord-block'),
				input 	= this_.find('input, select');
			if (this_.hasClass('is-active')) {
				block.show();
			}
			input.on('change', function() {
				var this_ 	= $(this),
					parent 	= this_.parents('.js-accord');
				if (this_.val().length > 0) {
					parent.addClass('is-chenge')
				}
				else {
					parent.removeClass('is-chenge');
				};
			});
		});
		$('.js-accord-but').on('click', function() {
			var this_ 		= $(this),
				parent 		= this_.parents('.js-accord'),
				blockThis 	= parent.find('.js-accord-block'),
				accord 		= $('.js-accord'),
				block 		= accord.find('.js-accord-block');
			if (!parent.parents('.filter__block').hasClass('js-filter-block')) {
				console.log('k');
				if (!parent.hasClass('is-active')) {
					accord.removeClass('is-active');
					block.slideUp(500);
					parent.addClass('is-active');
					blockThis.slideDown(500);
				}
				else {
					parent.removeClass('is-active');
					blockThis.slideUp(500);
				}
			}
			else {
				if (!parent.hasClass('is-active')) {
					parent.addClass('is-active');
					blockThis.slideDown(200);
				}
				else {
					parent.removeClass('is-active');
					blockThis.slideUp(200);
				}
			}
			return false;
		});
	} accord();

	$('.js-accord .btn, .js-history-op').on('click',function(event) {
		event.stopPropagation();
	});

	$('.js-histoy').each(function() {
		var this_ 		= $(this),
			btn 		= this_.find('.js-history-op'),
			accord 		= this_.find('.js-accord'),
			tAcc 		= this_.find('.js-accord-but'),
			block 		= accord.find('.js-accord-block');
		btn.on('click', function() {
			var this_ 		= $(this),
				parent 		= this_.parents('.js-histoy'),
				classVal 	= parent.find('.js-accord.is-active').size(),
				clValLast 	= parent.find('.js-accord').size();
			if (!this_.hasClass('is-active')) {
				this_.addClass('is-active');
				this_.find('span').text('Cвернуть всю историю');
			}
			else {
				this_.removeClass('is-active');
				this_.find('span').text('Развернуть всю историю');
			}
			setTimeout(function(){
				if (!accord.hasClass('is-active')) {
					accord.addClass('is-active');
					block.slideDown(500);
				}
				else if (classVal < clValLast) {
					accord.addClass('is-active');
					block.slideDown(500);
				}
				else {
					accord.removeClass('is-active');
					block.slideUp(500);
					btn.removeClass('is-active');
				}
				console.log(classVal);
			}, 1);
			return false;
		});
		tAcc.on('click', function() {
			btn.removeClass('is-active');
			btn.text('Развернуть всю историю');
		});
	});
	
	// sortin
	$('.js-sortin-item').on('click', function() {
		var this_ = $(this),
			parent = this_.parents('.js-sorting'),
			item = parent.find('.js-sortin-item'),
			active = ('is-active'),
			activeTop = ('is-active-top');
		if (!this_.hasClass(active)) {
			item.removeClass(active).removeClass(activeTop);
			this_.addClass(active);
		}
		else if (!this_.hasClass(activeTop)) {
			this_.removeClass(active).toggleClass(activeTop);
		}
	});
	
	// item show info
	function itemOpen() {
		$('.js-item').each(function() {
			var this_ = $(this),
				block = this_.find('.js-item-text');
			if (this_.hasClass('is-active')) {
				block.show();
			}
		});
		$('.js-item-open').on('click', function() {
			var this_ 	= $(this),
				parents = this_.parents('.js-items'),
				parent 	= parents.find('.js-item'),
				block 	= parent.find('.js-item-text');
			if (!parent.hasClass('is-active')) {
				parent.addClass('is-active');
				block.slideDown(400);
				$('.js-open-all-items').prop('checked', true);
			}
			else {
				parent.removeClass('is-active');
				block.slideUp(400);
				$('.js-open-all-items').prop('checked', false);
			}
			return false;
		});
		$('.js-open-all-items').on('click', function() {
			var this_ 	= $(this),
				parent 	= $('.js-item'),
				block 	= parent.find('.js-item-text');
			if (this_.is(':checked')) {
				parent.addClass('is-active')
				block.slideDown(400);
			}
			else {
				parent.removeClass('is-active');
				block.slideUp(400);
			}
		});
	} itemOpen();
	
	// filter
	$('.js-filter-all').on('click', function() {
		var this_ = $(this),
			parent = this_.parents('.filter'),
			block = parent.find('.js-filter-block');
		if (!parent.hasClass('is-active')) {
			parent.toggleClass('is-active');
			block.slideDown(400);
			this_.text('Свернуть все фильтры');
		}
		else {
			parent.removeClass('is-active');
			block.slideUp(400);
			this_.text('Показать все фильтры');
		}
	});

	// tab
	function tab() {
		$(".js-tab").each(function(){
			var tab_link = $(this).find("a"),
				tab_item = $(this).find("li"),
				index = tab_link.attr("href"),
				parents = $(this).parents(".js-tab-group"),
				tab_cont = parents.find(".js-tab-cont");
			tab_link.on("click", function() {
				var index = $(this).attr("href");
				$('.js-tab-item').removeClass("is-active");
				$(this).parent().addClass("is-active");
				tab_cont.fadeOut(0);
				parents.find("."+index).fadeIn(500);
				return false;
			});
			$(this).find('li:first').addClass("is-active");
			parents.find("."+index).fadeIn(500);
		});
	}
	tab();

	// ScrollPane
	$('.js-scroll').each(function(){
		$(this).jScrollPane({
			autoReinitialise: true
		});
	});
	$('.js-scroll-h').each(function(){
		var this_ = $(this),
			table = $(this).find('table');
		if ( table.height() > 822 ) {
			$(this).jScrollPane();
		}
	});
	// $('.sheet').each(function() {
	// 	var this_ 		= $(this),
	// 		scrollTop 	= this_.find('.js-sorting .js-scroll'),
	// 		apiTop 		= scrollTop.data('jsp'),
	// 		scrollBot 	= this_.find('.js-scroll-h .js-scroll'),
	// 		apiBot 		= scrollBot.data('jsp');
	// 	scrollTop.on('jsp-scroll-x', function(event, scrollPositionX) {
	// 		apiBot.scrollToX(scrollPositionX);
	// 	});
		// scrollBot.on('jsp-scroll-x', function(event, scrollPositionX) {
		// 	apiTop.scrollToX(scrollPositionX);
		// });
	// });
	
	// dargscroll
	if ($('.js-drag').length) {
		$('.js-drag').each(function () {
			var this_ = $(this);
			this_.dragOn({easing:false});
			this_.trigger('BarOn.toggle');
			this_.on('scroll', function() {
				var parent 		= $(this),
					bBar 		= parent.find('.bBarOn'),
					bBarPos 	= bBar.css('left'),
					bTab 		= parent.find('.js-sheet-l'),
					bTabWid	 	= bTab.width(),
					wSort 		= $('.js-wrap-sort');
				function resTable() {
					if ($(window).width() <= 1000) {
						var diff = (parseInt(bBarPos, 10) / 1.55) + 'px';
						wSort.css({'left': '-' + diff});
						// console.log('< 1060');
					}
					else if ($(window).width() <= 1050) {
						var diff = (parseInt(bBarPos, 10) / 1.60) + 'px';
						wSort.css({'left': '-' + diff});
						// console.log('< 1050');
					}
					else if ($(window).width() <= 1100) {
						var diff = (parseInt(bBarPos, 10) / 1.70) + 'px';
						wSort.css({'left': '-' + diff});
						// console.log('< 1100');
					}
					else if ($(window).width() <= 1150) {
						var diff = (parseInt(bBarPos, 10) / 1.80) + 'px';
						wSort.css({'left': '-' + diff});
						// console.log('< 1150');
					}
					else if ($(window).width() <= 1200) {
						var diff = (parseInt(bBarPos, 10) / 1.85) + 'px';
						wSort.css({'left': '-' + diff});
						// console.log('< 1200');
					}
					else {
						var diff = (parseInt(bBarPos, 10) / 1.9) + 'px';
						wSort.css({'left': '-' + diff});
					}
				} resTable();
			});
		});
	};
	$('.bBarOn').on('mouseenter', function(){
		$(this).addClass('is-hover');
	});
	$('.bBarOn').on('mouseleave', function(){
		$('.bBarOn').removeClass('is-hover');
	});

	var scrollKeys = [33,34,35,36,38,40];
	var drag = ".sheet__left .js-drag";

	function preventScroll() {
	  $(document).on("mousewheel DOMMouseScroll", "body", function(e) {
	    var $np = $(drag)[0];
	    var st = $np.scrollTop;
	    if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
	      if ($(e.target).closest(drag).length && 
	          st > 0) return;
	    } else {
	      if ($(e.target).closest(drag).length && 
	          st + $np.offsetHeight < $np.scrollHeight) return;
	    }
	    e.preventDefault();
	    e.stopPropagation();
	  });

	  $(document).on("hover", function(e) {
	    if (scrollKeys.indexOf(e.which) > -1) {
	      e.preventDefault();
	    }
	  });
	};

	function returnScroll() {
	  $(document).off("mousewheel DOMMouseScroll keydown");
	};

	
	$(drag).hover(function() {
	  preventScroll();
	}, function() {
	  returnScroll();
	});

	// sheet-top
	$(document).scroll(function() { 
		var scroll 		= $(this).scrollTop();
		if ($('#js-sheet').length) {
			$('#js-sheet').each(function () {
				var this_ 		= $(this),
					head 		= this_.find('.js-sheet-top'),
					headPos 	= this_.offset(),
					widthSheet 	= this_.width(),
					heightSheet = this_.height(),
					point 		= headPos.top + (heightSheet - 278);
				if (scroll >= headPos.top) {
					head.addClass('is-fixed');
					head.width(widthSheet);
					if(scroll >= point) {
						head.addClass('is-opacity');
					}
					else {
						head.removeClass('is-opacity');
					}
				}
				else {
					head.removeClass('is-fixed');
				}
			});
		};  
	});
	$(window).resize(function() {
		if ($('#js-sheet').length) {
			$('#js-sheet').each(function () {
				var this_ 		= $(this),
					head 		= this_.find('.js-sheet-top'),
					widthSheet 	= this_.width();
					head.width(widthSheet);
			});
		}; 
	});
	
	// $('[class*="js-scroll"]').each(function() {
	// 	var api = $(this).data('jsp'),
	// 		throttleTimeout;
	// 	$(window).bind('resize', function() {
	// 		if (!throttleTimeout) {
	// 			throttleTimeout = setTimeout(function() {
	// 				api.reinitialise();
	// 				throttleTimeout = null;
	// 			},50);
	// 		}
	// 	});
	// });

	// table
	$('[class*="js-sheet"] tr').hover(function () {
		var trR 		= $('.js-sheet-r tr'),
			trL 		= $('.js-sheet-l tr'),
			thisIndex 	= $(this).index(),
		 	thisEq 		= trR.eq(thisIndex),
		 	lEq 		= trL.eq(thisIndex);
		$('[class*="js-sheet"] tr').removeClass('is-hover');
		$(this).addClass('is-hover');
		thisEq.addClass('is-hover');
		lEq.addClass('is-hover');
	});
	
	// fansybox
	$("[rel='js-fansybox']").fancybox({
		helpers : {
			title: {
				type	: 'inside',
				position: 'top'
			}
		},
		openEffect  : 'fade',
		closeEffect : 'fade',
		nextEffect  : 'fade',
		prevEffect  : 'fade',
		padding		: 30,
		beforeShow: function () {
			setTimeout(function(){
				$('.fancybox-wrap').addClass('is-active');
			}, 1);
			$('.fancybox-overlay, .fancybox-close').bind("click", function (e) {
				$('.fancybox-wrap').removeClass('is-active');
			});
		},
		onClosed: function() {
			$('.fancybox-wrap').removeClass('is-active');
		}
	});

	// fansybox-iframe
	// $().fancybox();
	$('.js-fansy-item')
		.attr('rel', 'gallery')
		.fancybox({
			padding		: 30,
			openEffect  : 'fade',
			closeEffect : 'fade',
			maxWidth	: 800,
			nextEffect  : 'fade',
			prevEffect  : 'fade',
			beforeShow: function () {
				setTimeout(function(){
					$('.fancybox-wrap').addClass('is-active');
				}, 1);
				$('.fancybox-overlay, .fancybox-close').bind("click", function (e) {
					$('.fancybox-wrap').removeClass('is-active');
				});
				$('.fancybox-wrap').bind('click', function(event) {
					event.stopPropagation();
				});
			},
			onClosed: function() {
				$('.fancybox-wrap').removeClass('is-active');
			}
		});

	// popup
	$('.js-popup').each(function() {
		var popup 	= $(this),
			parent 	= popup.parents('.js-popup-par'),
			wrap 	= popup.find('.popup__in'),
			btn 	= $('.js-open-popup'),
			close 	= parent.find('.js-close-popup'),
			scroll 	= popup.find('.js-p-scroll'),
			body 	= $('body');
		btn.on('click', function() {
			var thisBtn 	= $(this),
				parentThis 	= thisBtn.parents('.js-popup-par'),
				popupThis 	= parentThis.find('.js-popup'),
				parent 		= $('.js-popup-par'),
				popupIn 	= popupThis.find('.popup__in'),
				popup 		= $('.js-popup'),
				scroll 		= popupThis.find('.js-p-scroll');
			if (!parent.hasClass('is-open')) {
				parent.removeClass('is-open');
				popup.fadeOut(300);
				parentThis.addClass('is-open');
				popupThis.fadeIn(300);
				$('.popup__in').removeClass('is-active');
				popupIn.addClass('is-active');
				body.addClass('is-hidden');
				scroll.addClass('is-active');
				scroll.jScrollPane();
			}

			return false;
		});
		close.on('click', function() {
			$('.popup__in').removeClass('is-active');
			body.removeClass('is-hidden');
			parent.removeClass('is-open');
			popup.fadeOut(300);
		});
		popup.on('click', function() {
			$('.popup__in').removeClass('is-active');
			body.removeClass('is-hidden');
			parent.removeClass('is-open');
			popup.fadeOut(300);
		});
		wrap.on('click',function(event) {
			event.stopPropagation();
		});
	});

	$('.btn-search-white.js-open-popup').on('click', function(){
		$('.popup__in').removeClass('is-active');
		$('.js-popup').fadeOut(300);
		$('.js-popup-par').removeClass('is-open');
		setTimeout(function() {
			$('.search .js-open-popup').trigger('click');
		}, 100);
	});
	// function popupScroll() {
	// 	$('.js-p-scroll').each(function() {
	// 		var this_ = $(this);
	// 		if (this_.hasClass('is-active')) {
	// 			this_.jScrollPane({
	// 				autoReinitialise: true
	// 			});
	// 		}
	// 		// else {
	// 		// 	var api = this_.data('jsp');
	// 		// 	api.destroy();
	// 		// }
	// 	});
		
	// } popupScroll();


	// add form
	$('.js-add-rig').on('click', function() {
		var this_ 	= $(this),
			parents = this_.parents('.js-form'),
			parent 	= this_.parent(),
			block 	= parents.find('.is-hide .form__in'),
			bFirst 	= parents.find('.js-form-add');
		// console.log(bPrev.html());
		setTimeout(function(){
			$.validate({
				form : '.js-validate'
			});
		}, 100);
		block.clone().insertBefore(parent).addClass('js-form-add');
		bFirst.addClass('form__in');
		parent.prev('.form__in').removeClass('form__in');
		setTimeout(function(){
			var bPrev 	= parent.prev('div'),
				select 	= bPrev.find('.multiple-select');
			select.addClass('js-filter-select');
			select.multipleSelect({
				single: true,
				onClose: function() {
					$('.ms-choice').removeClass('is-active');
				}
			});
		}, 1);
		return false;
	});

	// delete products
	$('.js-products').each(function() {
		var this_  	= $(this),
			btn 	= this_.find('.js-delete'),
			open 	= this_.find('.js-open'),
			reest 	= this_.find('.js-reest'),
			wrap 	= this_.find('.js-prod-wrap');
		btn.on('click', function() {
			// removal imitation
			var parent 	= $(this).parents('.js-products-item');
			parent.remove();
			// scroll height
			setInterval(function() {
				var pane 		= this_.find('.jspPane'),
					paneHeight 	= pane.height(),
					cont 		= this_.find('.jspContainer');
				cont.css('height', paneHeight);
			}, 1);
		});
		open.on('click', function() {
			this_.toggleClass('is-active');
			$(this).toggleClass('is-active');
			if (this_.hasClass('is-active')) {
				wrap.slideDown(300);
					setInterval(function() {
					var pane 		= this_.find('.jspPane'),
						paneHeight 	= pane.height(),
						cont 		= this_.find('.jspContainer');
					cont.css('height', paneHeight);
				}, 1);
			}
			else {
				wrap.slideUp(300);
			}
		});
		reest.on('click', function() {
			// add imitation
			var parent 	= $(this).parents('.js-products-item');
			parent.remove();
			// scroll height
			setInterval(function() {
				var pane 		= this_.find('.jspPane'),
					paneHeight 	= pane.height(),
					cont 		= this_.find('.jspContainer');
				cont.css('height', paneHeight);
			}, 1);
		});
	});

	// open popup list
	$('.js-p-list').each(function() {
		var this_ 	= $(this),
			openBtn = this_.find('.js-u-turn');
		openBtn.on('click', function() {
			var this_ 	= $(this),
				parent 	= this_.parent(),
				ul 		= parent.find(' > ul');
			this_.toggleClass('is-active');
			if (!ul.hasClass('is-active')) {
				ul.addClass('is-active');
				ul.slideDown(400);

			}
			else {
				ul.removeClass('is-active');
				ul.slideUp(400);
			}
		});
	});
	$('.js-open-li').on('click', function() {
		var this_ 	= $(this),
			span 	= this_.find('span'),
			parent 	= this_.parents('.js-tab-cont'),
			ul 		= parent.find('.js-p-list ul'),
			btn		= parent.find('.js-u-turn');
		this_.toggleClass('is-active');
		if (!ul.hasClass('is-active')) {
			ul.addClass('is-active');
			btn.addClass('is-active');
			ul.slideDown(400);
			span.text('Свернуть все разделы');
		}
		else {
			ul.removeClass('is-active');
			btn.removeClass('is-active');
			ul.slideUp(400);
			span.text('Развернуть все разделы')
		}
	});

	// scrollTop
	// $(document).scroll(function() {    
	// 	var scroll 		= $(this).scrollTop(),
	// 		scrolltop 	= $('.js-scroll-top');
	// 	if (scroll > 100) {
	// 		scrolltop.fadeIn(600);
	// 		scrolltop.addClass('is-active');
	// 	}
	// 	else{
	// 		scrolltop.fadeOut(600);
	// 		scrolltop.removeClass('is-active');
	// 	}
	// });
	$(document).scroll(function() {    
		var scroll 			= $(this).scrollTop(),
			hDoc 			= $(document).height(),
			hWind 			= $(window).height(),
			hFooter 		= $('.footer').height(),
			scrolltop 		= $('.js-scroll-top'),
			scroll_position = hDoc - hWind - hFooter;
		if (scroll > 100) {
			scrolltop.fadeIn(600);
			scrolltop.addClass('is-active');
			$(window).resize(function() {
				wScroll();
			});
			function wScroll() {
				if ($(window).width() < 1460) {
					if (scroll >= scroll_position) {
						scrolltop.addClass('is-abs');
					}else{
						scrolltop.removeClass('is-abs');
					}
				}
				else {
					scrolltop.removeClass('is-abs');
				}
			} wScroll();
		}
		else{
			scrolltop.removeClass('is-active');
			$(".scrolltop").fadeOut(600);
		}
	});
	$('.js-scroll-top').on('click', function() {
		$('html, body').animate({
			scrollTop: 0
		}, 800);
	});
	$(".js-add-button, .js-scroll-to").on('click', function(){
		var page = $(this).attr("href");
		$('html, body').animate({
			scrollTop: $(page).offset().top - 20
		}, 800);
		return false;
	});

	// remove value
	$('.js-refresh-input').on('click', function() {
		var this_ 	= $(this),
			input 	= $('.js-search-input'),
			popup 	= this_.parents('.js-popup'),
			parent 	= this_.parents('.js-popup-par');
		if (input.val().length == 0) {
			$('.popup__in').removeClass('is-active');
			$('body').removeClass('is-hidden');
			parent.removeClass('is-open');
			popup.fadeOut(300);
		}
		else {
			input.val("");
		}
	});

	// tags
	$('.js-tally-close').on('click', function() {
		var this_ 	= $(this),
			parent 	= this_.parents('.js-tally'),
			parents 	= parent.parents('.tags');
		parent.remove();
		if (parents.find('.js-tally').length == 0) {
			parents.remove();
		}
	})

	$('.js-open-org').on('change', function() {
		if ($(this).is(':checked')) {
			$(this).parents('li').toggleClass('selected');
		}
	});

	$('.js-open-fiz').on('change', function() {
		if ($(this).is(':checked')) {
			$('.js-org').hide();
			$('.js-fiz').fadeIn(500);
		}
	});
	$('.js-open-org').on('change', function() {
		if ($(this).is(':checked')) {
			$('.js-fiz').hide();
			$('.js-org').fadeIn(500);
		}
	});

	// height layout
	function hLayout() {
		var heightD 	= $(window).height(),
			outHeight 	= $('.out').height(),
			headHeight 	= $('.header').height() + 30,
			layout 		= $('.l-layout'),
			lH 			= layout.height(),
			lnHeight 	= heightD - (headHeight + 90);
		if (lH < lnHeight) {
			layout.height(lnHeight);
		}
		else if (outHeight <= heightD) {
			layout.css('height', 'auto');
		}
	} hLayout();


	// $(window).resize(function() {
	// 	hLayout();
	// });
	


});
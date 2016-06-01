$(document).ready( function() {
	// item show info
	function itemOpen() {
		$('.js-item').each(function() {
			if(!$(this).hasClass('init')){
				var this_ = $(this),
					block = this_.find('.js-item-text');
				if (this_.hasClass('is-active')) {
					block.show();
				}
				eClick();
				this_.addClass('init');
			} else {
				return;
			}
		});

	} itemOpen();

	function eClick(){
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
			return;
		});
		$('.js-open-all-items').on('click', function() {
			var this_ 	= $(this),
				parent 	= $('.js-item'),
				block 	= parent.find('.js-item-text');
			if (this_.is(':checked')) {
				parent.addClass('is-active');
				block.slideDown(400);
			}
			else {
				parent.removeClass('is-active');
				block.slideUp(400);
			}
		});
	}

	// spiner
	function spiner() {
		var number = $('.js-spiner');
		number.each(function(){
			if(!$(this).hasClass('init')){
				var max_number = +($(this).attr('data-max-number'));
				var input = $(this).find('input');
				var plus = $(this).find('.js-plus');
				var minus = $(this).find('.js-minus');
				var timeout;
				var countbasketid = input.attr('id');
				plus.on('click', function(){
					var val = +(input.val());
					if (val >= max_number) {
						return false;
					}
					else {
						val += 1;
						input.val(val);
					}
					input.trigger('input');
					return false;
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
					input.trigger('input');
					return false;
				});
				input.on("input", function(){
					var val = +$(this).val();
					if (val > max_number) {
						val = max_number;
						$(this).val(val);
					}
					if (val == '' || val < 0) {
						val = 0;
						$(this).val(val);
					}

					if(input.hasClass('in-cart')){
						clearTimeout(timeout);
						timeout = setTimeout(function() {
							BX.showWait();
							var countbasketcount = input.val();
							var ajaxcount = countbasketid + '&ajaxbasketcount=' + countbasketcount;
							ajaxpost("/include/basket.php", ajaxcount, ".ajax-cart__area");
						}, 500);
					}
					if(input.hasClass('in-cart-del')){
						clearTimeout(timeout);
						timeout = setTimeout(function() {
							BX.showWait();
							var countbasketcount = input.val();
							var ajaxcount = countbasketid + '&ajaxbasketcount=' + countbasketcount;
							ajaxpost("/include/basket.php", ajaxcount, ".ajax-cart__area", function () {showsAccord();} );
						}, 500);
					}
				});
				input[0].onkeypress = function(e) {
					e = e || event;
					if (e.ctrlKey || e.altKey || e.metaKey) return;
					var chr = getChar(e);
					if (chr == null) return;
					if (chr < '0' || chr > '9') {
						return false;
					}
				};
				$(this).addClass('init');
			} else {
				return;
			}
		});
	}
	spiner();

	function ajaxpost(urlres, datares, wherecontent, callback){
		$.ajax({
			type: "POST",
			url: urlres,
			data: datares,
			dataType: "html",
			success: function(fillter){
				$(wherecontent).html(fillter);
				BX.closeWait();
				spiner();
				deleteProducts();
				if (!(callback && callback instanceof Function && typeof callback === 'function')) {
					return false;
				}
				callback(fillter);
			}
		});
	}

	function getChar(event) {
		if (event.which == null) {
			if (event.keyCode < 32) return null;
			return String.fromCharCode(event.keyCode); // IE
		}
		if (event.which != 0 && event.charCode != 0) {
			if (event.which < 32) return null;
			return String.fromCharCode(event.which);
		}
		return null;
	}

	function parseUrlQuery() {
		var data = {};
		if(location.search) {
			var pair = (location.search.substr(1)).split('&');
			for(var i = 0; i < pair.length; i ++) {
				var param = pair[i].split('=');
				data[param[0]] = param[1];
			}
		}
		return data;
	}

	$('select.min').on("change",function() {
		//var input = $(this).find("input");
		var val = $(this).val();
			arr = parseUrlQuery();
		if(typeof arr.sort != 'undefined' && typeof arr != 'undefined'){
			if(val != "" && val){
				window.location.search = 'sort='+arr.sort+'&direction='+val;
			}else{
				window.location.search = 'sort='+arr.sort;
			}
		}else if(val != "" && val){
			window.location.search = 'direction='+val;
		}else{
			window.location = window.location.pathname;
		}
		//console.log(val);
	});
	$('select.place').on("change",function() {
		$(this).closest("form").submit();
	});

	function isHistoryApiAvailable() {
		return !!(window.history && history.pushState);
	}

	function SortBtn(){
		$('.js-sortin-item').on('click', function() {
			var this_ = $(this),
				parent = this_.parents('.js-sorting'),
				history_parent = this_.parents('.js-histoy'),
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
			if(isHistoryApiAvailable()){
				var url = $(this).attr('href');
				$.ajax({
					url: url + '&ajax=Y',
					success: function(data){
						replace = $(data).find('.ajax-catalog__area').html();
						$('.ajax-catalog__area').html(replace);
						SortBtn();
						if(history_parent.length){
							accord();
							history_accord();
						} else {
							itemOpen();
							spiner();
							addToBasket();
						}
					}
				});

				if(url != window.location){
					window.history.pushState(null, null, url);
				}

				return false;
			}
		});
	}
	SortBtn();

	$(window).bind('popstate', function() {
		$.ajax({
			url:     window.location.href,
			success: function(data) {
			replace = $(data).find('.ajax-catalog__area').html();
			$('.ajax-catalog__area').html(replace);
			SortBtn();
			itemOpen();
			spiner();
			addToBasket();
			}
		});
	});

	$('.change-tpl').on('click', function(){
		var tpl = $(this).data('tpl'),
			btn = $(this);
		$.ajax({
			type: "POST",
			url: window.location.href,
			data: 'catalog_tpl=' + tpl,
			dataType: "html",
			success: function(fillter){
				$('.view__item').removeClass('is-active');
				$(btn).parent('.view__item').addClass('is-active');
				replace = $(fillter).find('.ajax-catalog__area').html();
				$('.ajax-catalog__area').html(replace);
				$('.js-open-all-items').prop('checked', false);
				SortBtn();
				itemOpen();
				spiner();
				addToBasket();
			}
		});
		return false;
	});

	$('.change-tpl-cart').on('click', function(){
		var tpl = $(this).data('tpl'),
			btn = $(this);
		BX.showWait();
		$.ajax({
			type: "POST",
			url: window.location.href,
			data: 'cart_tpl=' + tpl,
			dataType: "html",
			success: function(fillter){
				$('.view__item').removeClass('is-active');
				$(btn).parent('.view__item').addClass('is-active');
				replace = $(fillter).find('.ajax-cart__area').html();
				$('.ajax-cart__area').html(replace);
				BX.closeWait();
				spiner();
				deleteProducts();

			}
		});
		return false;
	});

	$('.change-tpl-search').on('click', function(){
		var tpl = $(this).data('tpl'),
			btn = $(this);
		$.ajax({
			type: "POST",
			url: "/include/search.php",
			data: 'search_tpl=' + tpl,
			dataType: "html",
			success: function(fillter){
				$('.view__item').removeClass('is-active');
				$(btn).parent('.view__item').addClass('is-active');
				$('.ajax-search-input').trigger('input');
			}
		});
		return false;
	});

	function addToBasket(){
		var b_ = $('.addtobasket');
		b_.each(function(){
			if(!$(this).hasClass('init')){
				$(this).addClass('init');
				$(this).on('click', function(){
					var $this = $(this),
						spiner = $this.parent(".spiner.js-spiner"),
						block = spiner.parent(".item__bot"),
						ajaxaddid = $(this).data('id'),
						str = '<button onclick="location.href=\'/basket/\';" class="btn btn_small added"><i class="ico ico_add"></i>Добавлено</button>',
						count = $(this).parent().find('.js-price-input').val();
						if($this.hasClass('line')){
							var block = spiner.parent(".point__right"),
								str = '<button onclick="location.href=\'/basket/\';" class="btn btn_small added in-list"><i class="ico ico_add"></i>Добавлено</button>';
						}
						if($this.hasClass('text')){
							var block = spiner.parent(".point__right"),
								str = '<button onclick="location.href=\'/basket/\';" class="btn btn_small added in-text"><i class="ico ico_add"></i>Добавлено</button>';
						}
						if($this.hasClass('inner')){
							var block = spiner.parent(".product__right"),
								str = '<button onclick="location.href=\'/basket/\';" class="btn btn_small added"><i class="ico ico_add"></i>Добавлено</button>';
						}

					$.ajax({
						type: "POST",
						url: "/bitrix/templates/ekt/includes/ru/small_basket.php",
						data: 'ajaxaction=add' + '&ajaxaddid=' + ajaxaddid + '&count=' + count,
						dataType: "html",
						success: function(fillter){
							spiner.hide();
							block.append(str);
							/*
							setTimeout(function(){
								$('.btn_small.added').hide();
								spiner.show();
							},5000);
							$('.ajax-small-basket-menu').html(fillter);
							*/
						}
					});

					return false;
				});
			} else {
				return;
			}
		});
	}
	addToBasket();

	// delete products
	function deleteProducts(){
		$('.js-products').each(function() {
			var this_  	= $(this),
				btn 	= this_.find('.js-delete'),
				open 	= this_.find('.js-open'),
				reest 	= this_.find('.js-reest'),
				wrap 	= this_.find('.js-prod-wrap'),
				restoreAll =  this_.find('.js-prod-wrap .btn-open'),
				isLoad = this_.find('.js-scroll');
			btn.on('click', function() {
				// removal imitation
				var parent 	= $(this).parents('.js-products-item');
				parent.remove();
				// scroll height
				BX.showWait();
				var data = $(this).data("link");
				var ajaxcount = data;
				ajaxpost("/include/basket.php", ajaxcount, ".ajax-cart__area");

				setInterval(function() {
					var pane 		= this_.find('.jspPane'),
						paneHeight 	= pane.height(),
						cont 		= this_.find('.jspContainer');
					cont.css('height', paneHeight);
				}, 1);
				isLoad.addClass('is-load');
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
				BX.showWait();
				var data = $(this).data("link");
				var ajaxcount = data;
				ajaxpost("/include/basket.php", ajaxcount, ".ajax-cart__area", function () {showsAccord();} );

				setInterval(function() {
					var pane 		= this_.find('.jspPane'),
						paneHeight 	= pane.height(),
						cont 		= this_.find('.jspContainer');
					cont.css('height', paneHeight);
				}, 1);
				isLoad.addClass('is-load');
			});
			restoreAll.on('click', function(){
				var names;
				names = getNames(reest);
				var ajaxcount = 'action=restoreAll&params='+names;
				ajaxpost("/include/basket.php", ajaxcount, ".ajax-cart__area", function () {showsAccord();} );
			});
		});
	}
	deleteProducts();

	function getNames(selector) {
		var names = [];
		$(selector).each(function() {
			names.push($(this).data('id'));
		});
		return names;
	}
	function showsAccord(){
		$('.js-products.is-delete').addClass('is-active');
		$('.js-products.is-delete').find('.js-prod-wrap').show();
	}

	function refreshinput(){
		$('.js-refresh-input').on('click', function() {
			var this_ 	= $(this),
				input 	= $('.js-search-input'),
				popup 	= this_.parents('.js-popup'),
				parent 	= this_.parents('.js-popup-par'),
				ajax_wrap = this_.parents('.js-popup').find('.search-wrap');
			if (input.val().length == 0) {
				$('.popup__in').removeClass('is-active');
				$('body').removeClass('is-hidden');
				parent.removeClass('is-open');
				popup.fadeOut(300);
				$('#srch-frm').trigger('reset');
				$('#srch').hide();
			}
			else {
				input.val("");
				ajax_wrap.empty();
			}
		});
		$('.popup').on('click', function(){
			if($(this).parents('.js-popup-par').hasClass('search')){
				$(this).find('.search-wrap').empty();
				$(this).find('.js-search-input').val('');
				$('#srch-frm').trigger('reset');
				$('#srch').hide();
			}
		});
	}
	refreshinput();

	$('input[name="type"]', '#srch-frm').on('click', function(){
		$('.ajax-search-input').trigger('input');
	});

	var timeout;
	$('.ajax-search-input').on('input', function(){
		var query = $(this).val(),
			wrap = $(this).parents('.popup__in.is-active').find('.search-wrap'),
			type = $('input[name="type"]:checked', '#srch-frm').val();
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			$.ajax({
				type: "POST",
				url: "/include/search.php",
				data: 'query=' + query + '&type=' + type,
				dataType: "html",
				success: function(fillter){
					$(wrap).html(fillter);
					spiner();
					itemOpen();
					addToBasket();
				}
			});
		}, 1000);
		return false;
	});

	var ajax_load_status = 'N';
	$('.popup').on('scroll', function(){
		if($('.search-loader').data('page') < $('.search-loader').data('count')){
			var wH = $(window).height() + 20;
			var s = $('.js-popup-par').find('.search-wrap')[0].getBoundingClientRect().bottom;
			if(wH === s || wH > s){
				$('.search-loader').attr('style', 'opacity: 1; display:block;');
				if(ajax_load_status == 'N'){
					ajax_load();
				}
			}
		}
	});
	function ajax_load(){
		ajax_load_status = 'Y';
		var cur_page = $('.search-loader').data('page'),
			next_page = cur_page + 1,
			num_pagen = $('.search-loader').data('num');
			query_page =  $('.search-loader').data('query');
			type_page =  $('.search-loader').data('type');
		$('.search-loader').data('page', next_page);
		var url = '/include/search.php?PAGEN_' + num_pagen + '=' + next_page + '&query=' + query_page + '&type=' + type_page;
		$.ajax({
			url: url,
			data: {},
			dataType : "html",
			success: function (data, textStatus) {
			if($(data).find('.items.js-items').length){
				var data2 = $(data).find('.items.js-items').html();
				$('.items.js-items').append(data2);
			}else{
				var data2 = $(data).find('.srch-container').html();
				$('.srch-container').append(data2);
			}
				ajax_load_status = 'N';
				$('.search-loader').attr('style', 'opacity: 0; display:none;');
				spiner();
				itemOpen();
				addToBasket();
			}
		});
	}

	function triggerTabsSearch(){
		var check = $('.search-form__row').find('input:checked');
		if(check.val() === '1'){
			check.parents('.search-form__row').find('#srch').hide();
		}

		var lbl = $('.search-form__row').find('label');

		lbl.each(function(){
			var _ = $(this);
			_.on('click', function(){
				if($(this).find('input').val() === '1'){
					$(this).parents('.search-form__row').find('#srch').hide();
				}else {
					$(this).parents('.search-form__row').find('#srch').show();
				}
			});
		});
	}
	triggerTabsSearch();

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
					parent.addClass('is-chenge');
				}
				else {
					parent.removeClass('is-chenge');
				}
			});
		});
		$('.js-accord-but').on('click', function() {
			var this_ 		= $(this),
				parent 		= this_.parents('.js-accord'),
				blockThis 	= parent.find('.js-accord-block'),
				accord 		= $('.js-accord'),
				block 		= accord.find('.js-accord-block');
			if (!parent.parents('.filter__block').hasClass('js-filter-block')) {
				//console.log('k');
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

	function history_accord(){
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
					//console.log(classVal);
				}, 1);
				return false;
			});
			tAcc.on('click', function() {
				btn.removeClass('is-active');
				btn.find('span').text('Развернуть всю историю');
			});
		});
	}
	history_accord();
});
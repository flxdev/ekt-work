$(document).ready( function() {

	if ($('#map').length) {
		ymaps.ready(init);
	};

	function init () {
		var myMap = new ymaps.Map('map', {
				center: [53.9, 27.56667],
				zoom: 11,
				controls: []
			}, {
				searchControlProvider: 'yandex#search'
			}),
			objectManager = new ymaps.ObjectManager({
				clusterize: false
			}),
			MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
				'<div class="popover top">' +
					'<a class="close" href="#">&times;</a>' +
					'<div class="arrow"></div>' +
					'<div class="balloon">' +
						'$[[options.contentLayout observeSize minWidth=246 maxWidth=246]]' +
					'</div>' +
				'</div>', {
				build: function () {
					this.constructor.superclass.build.call(this);
					this._$element = $('.popover', this.getParentElement());
					this.applyElementOffset();
					this._$element.find('.close')
					    .on('click', $.proxy(this.onCloseClick, this));
				},
				clear: function () {
				    this._$element.find('.close')
				        .off('click');
				    this.constructor.superclass.clear.call(this);
				},
				onSublayoutSizeChange: function () {
					MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);
					if(!this._isElement(this._$element)) {
					    return;
					}
					this.applyElementOffset();
					this.events.fire('shapechange');
				},
				applyElementOffset: function () {
					this._$element.css({
						left: -((this._$element[0].offsetWidth + 18) / 2),
						top: -(this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight + 10)
					});
				},
				onCloseClick: function (e) {
					e.preventDefault();
					this.events.fire('userclose');
					$('#map').each(function() {
						var this_ 	= $(this),
							wind 	= this_.find('.js-window');
						wind.removeClass('is-active');
					});
					console.log('d');
					objectManager.objects.options.set({
					    iconLayout: 'default#image',
						iconImageHref: 'img/marker.png'
					});
				},
				getShape: function () {
					if(!this._isElement(this._$element)) {
					    return MyBalloonLayout.superclass.getShape.call(this);
					}
					var position = this._$element.position();
					return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
						[position.left, position.top], [
							position.left + this._$element[0].offsetWidth,
							position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight
						]
					]));
				},
				_isElement: function (element) {
					return element && element[0] && element.find('.arrow')[0];
				}
			}),

			MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
				'<h3 class="balloon__title">$[properties.balloonHeader]</h3>' +
				'<div class="balloon__content">$[properties.balloonContent]</div>'
			);

			objectManager.objects.options.set({
			    iconLayout: 'default#image',
				iconImageHref: 'img/marker.png',
				iconImageSize: [20, 27],
				balloonShadow: false,
				balloonLayout: MyBalloonLayout,
				balloonContentLayout: MyBalloonContentLayout,
				balloonPanelMaxMapArea: 0
			});
			function onObjectEvent (e) {
				var objectId = e.get('objectId');
				if (e.get('type') == 'mouseenter') {
				    objectManager.objects.setObjectOptions(objectId, {
				        iconLayout: 'default#image',
						iconImageHref: 'img/pin.png'
				    });
				}
				if (e.get('type') == 'mouseleave') {
				    objectManager.objects.setObjectOptions(objectId, {
				    	iconLayout: 'default#image',
				    	iconImageHref: 'img/marker.png'
				    });
				}
				if (e.get('type') == 'click') {
					    objectManager.objects.setObjectOptions(objectId, {
				    	iconLayout: 'default#image',
				    	iconImageHref: 'img/marker.png'
				    });
				}
			}
			objectManager.objects.events.add(['mouseenter', 'mouseleave', 'click'], onObjectEvent);
		
			objectManager.events.add('click', function () {
				setTimeout(function(){
					$('.balloon').each(function() {
						var this_ 	= $(this),
							parent 	= this_.parents('#map'),
							wind 	= parent.find('.js-window');
						wind.addClass('is-active');
					});
				}, 100);
			});
			$('.close').on('click', function() {
				var this_ 	= $(this),
					parent 	= this.parents('#map'),
					wind 	= parent.find('.js-window');
				wind.removeClass('is-active');

			});

		ZoomLayout = ymaps.templateLayoutFactory.createClass(
			"<div class='zoom-buttons'>" +
				"<div id='zoom-in' class='btn-plus'>+</div>" +
				"<div id='zoom-out' class='btn-minus'>-</div>" +
			"</div>", {
			build: function () {
				ZoomLayout.superclass.build.call(this);

				this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
				this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

				$('#zoom-in').bind('click', this.zoomInCallback);
				$('#zoom-out').bind('click', this.zoomOutCallback);
			},
			clear: function () {
				$('#zoom-in').unbind('click', this.zoomInCallback);
				$('#zoom-out').unbind('click', this.zoomOutCallback);

				ZoomLayout.superclass.clear.call(this);
			},
			zoomIn: function () {
				var map = this.getData().control.getMap();
				this.events.fire('zoomchange', {
					oldZoom: map.getZoom(),
					newZoom: map.getZoom() + 1
				});
			},
			zoomOut: function () {
				var map = this.getData().control.getMap();
				this.events.fire('zoomchange', {
					oldZoom: map.getZoom(),
					newZoom: map.getZoom() - 1
				});
			}
		}),
		zoomControl = new ymaps.control.ZoomControl({ 
			options: { 
				layout: ZoomLayout,
				position: {
					top: 28,
					left: 17
				}
			} 
		});

		myMap.controls.add(zoomControl);

		myMap.geoObjects.add(objectManager);
		var data = {
			"type": "FeatureCollection",
			"features": [
				{
					"type": "Feature", 
					"id": 0, 
					"geometry": {
						"type": "Point", 
						"coordinates": [53.9, 27.56667]
					}, 
					"properties": {
						"balloonHeader": "Гипермаркет Материк",
						"balloonContent": 
							"<div class='balloon__address'>ул. Притыцкого, 101</div>" +
							"<div class='balloon__row'>" +
								"<div class='balloon__col'>" +
									"<p>+375 17 263-45-63,<p>" +
									"<p>+375 29 200-00-00<p>" +
								"</div>" +
								"<div class='balloon__col'>" +
									"<p>Пн–Пт: 9<sup>00</sup>–20<sup>00</sup>,<p>" +
									"<p>Сб: 10<sup>00</sup>–16<sup>00</sup><p>" +
								"</div>" +
							"</div>" 
						, 
						"clusterCaption": "Еще одна метка"
					}
				},
				{
					"type": "Feature", 
					"id": 1, 
					"geometry": {
						"type": "Point", 
						"coordinates": [53.9, 27.46667]
					}, 
					"properties": {
						"balloonHeader": "Гипермаркет Материк-2",
						"balloonContent": 
							"<div class='balloon__address'>ул. Притыцкого, 101</div>" +
							"<div class='balloon__row'>" +
								"<div class='balloon__col'>" +
									"<p>+375 17 263-45-63,<p>" +
									"<p>+375 29 200-00-00<p>" +
								"</div>" +
								"<div class='balloon__col'>" +
									"<p>Пн–Пт: 9<sup>00</sup>–20<sup>00</sup>,<p>" +
									"<p>Сб: 10<sup>00</sup>–16<sup>00</sup><p>" +
								"</div>" +
							"</div>" 
						, 
						"clusterCaption": "Еще одна метка"
					}
				},
				{
					"type": "Feature", 
					"id": 2, 
					"geometry": {
						"type": "Point", 
						"coordinates": [53.87, 27.56667]
					}, 
					"properties": {
						"balloonHeader": "Гипермаркет Материк-3",
						"balloonContent": 
							"<div class='balloon__address'>ул. Притыцкого, 101</div>" +
							"<div class='balloon__row'>" +
								"<div class='balloon__col'>" +
									"<p>+375 17 263-45-63,<p>" +
									"<p>+375 29 200-00-00<p>" +
								"</div>" +
								"<div class='balloon__col'>" +
									"<p>Пн–Пт: 9<sup>00</sup>–20<sup>00</sup>,<p>" +
									"<p>Сб: 10<sup>00</sup>–16<sup>00</sup><p>" +
								"</div>" +
							"</div>" 
						, 
						"clusterCaption": "Еще одна метка"
					}
				},
				{
					"type": "Feature", 
					"id": 3, 
					"geometry": {
						"type": "Point", 
						"coordinates": [53.93, 27.56667]
					}, 
					"properties": {
						"balloonHeader": "Гипермаркет Материк-4",
						"balloonContent": 
							"<div class='balloon__address'>ул. Притыцкого, 101</div>" +
							"<div class='balloon__row'>" +
								"<div class='balloon__col'>" +
									"<p>+375 17 263-45-63,<p>" +
									"<p>+375 29 200-00-00<p>" +
								"</div>" +
								"<div class='balloon__col'>" +
									"<p>Пн–Пт: 9<sup>00</sup>–20<sup>00</sup>,<p>" +
									"<p>Сб: 10<sup>00</sup>–16<sup>00</sup><p>" +
								"</div>" +
							"</div>" 
						, 
						"clusterCaption": "Еще одна метка"
					}
				}
			]
		}
		objectManager.add(data);
		function clickGoto() {

			var pos = $(this).data('address');
			myMap.panTo([pos], {
				flying: 1
			});

			return false;
		}

		var option = $('.is-map.js-select ul li');
		for (var i = 0, n = option.length; i < n; ++i) {
			option[i].onclick = clickGoto;
		}
	};

	// map accord
	if ($('#map-accord').length) {
		ymaps.ready(initialize);
	};
	$('.accordions.is-address').each(function() {
		var this_  	= $(this),
			btn 	= this_.find('.js-accord-but');

		btn.on('click', function () {
			var this_ 		= $(this),
				parent 		= this_.parents('.js-accord'),
				wrapThis 	= parent.find('.js-map-wrap'),
				wrap 		= $('.js-map-wrap'),
				map 		= wrap.find('#map-accord'),
				div 		= ('<div class="map" id="map-accord"></div>');
			console.log($(this).data('address'));
			if (!parent.hasClass('is-active')) {
				if (!map.length) {
					// setTimeout(function(){
						wrapThis.append(div);
						ymaps.ready(initialize);
					// }, 100);
				}
				else {
					// setTimeout(function(){
						map.appendTo(wrapThis);
					// }, 900);
				}
			}
		});
	});

	function initialize() {
		// var destinations = {
		// 	'Киев': [50.45466, 30.5238],
		// 	'Минск': [53.9, 27.56667],
		// 	'Одесса': [46.466444, 30.7058]
		// },
		myMap = new ymaps.Map('map-accord', {
			center: [50.45466, 30.5238],
			zoom: 18,
			controls: []
			}, {
				searchControlProvider: 'yandex#search'
			}),
			myPlacemark = new ymaps.Placemark(myMap.getCenter());

		myPlacemark.options.set({
			iconLayout: 'default#image',
			iconImageHref: 'img/marker.png',
			iconImageSize: [20, 27]
		});

		myMap.geoObjects.add(myPlacemark);

		ZoomLayout = ymaps.templateLayoutFactory.createClass(
			"<div class='zoom-buttons'>" +
				"<div id='zoom-plus' class='btn-plus'>+</div>" +
				"<div id='zoom-minus' class='btn-minus'>-</div>" +
			"</div>", {
			build: function () {
				ZoomLayout.superclass.build.call(this);

				this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
				this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

				$('#zoom-plus').bind('click', this.zoomInCallback);
				$('#zoom-minus').bind('click', this.zoomOutCallback);
			},
			clear: function () {
				$('#zoom-plus').unbind('click', this.zoomInCallback);
				$('#zoom-minus').unbind('click', this.zoomOutCallback);

				ZoomLayout.superclass.clear.call(this);
			},
			zoomIn: function () {
				var map = this.getData().control.getMap();
				this.events.fire('zoomchange', {
					oldZoom: map.getZoom(),
					newZoom: map.getZoom() + 1
				});
			},
			zoomOut: function () {
				var map = this.getData().control.getMap();
				this.events.fire('zoomchange', {
					oldZoom: map.getZoom(),
					newZoom: map.getZoom() - 1
				});
			}
		}),
		zoomControl = new ymaps.control.ZoomControl({ 
			options: { 
				layout: ZoomLayout,
				position: {
					top: 28,
					left: 17
				}
			} 
		});

		myMap.controls.add(zoomControl);

		function clickGoto() {

			var pos = $(this).data('address');
			myMap.panTo([pos], {
				flying: 1
			});

			return false;
		}

		var accord = $('.js-accord-but');
		for (var i = 0, n = accord.length; i < n; ++i) {
			accord[i].onclick = clickGoto;
		}

	};

	$('.js-open-window').on('click', function() {
		var this_  	= $(this),
			span 	= this_.find('span'),
			parent 	= this_.parents('.js-window'),
			block 	= parent.find('.js-window-block'),
			scrCont = parent.find('.jspPane, .jspDrag');
		if (!this_.hasClass('is-active')) {
			this_.addClass('is-active');
			span.text('Скрыть все товарные позиции');
			block.slideDown(400);
		}
		else {
			this_.removeClass('is-active');
			span.text('Показать все товарные позиции');
			block.slideUp(400);
			scrCont.animate({
				top: 0
			}, 300);
		}
		return false;
	});

	if ($('#map-contact').length) {
		ymaps.ready(initMapContact);
	};

	function initMapContact() {
		var myMap = new ymaps.Map('map-contact', {
				center: [57.9, 27.56667],
				zoom: 16,
				controls: []
			}, {
				searchControlProvider: 'yandex#search'
			}),
	        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
	            hintContent: 'Собственный значок метки'
	        }, {
	            // Опции.
	            // Необходимо указать данный тип макета.
	            iconLayout: 'default#image',
	            // Своё изображение иконки метки.
	            iconImageHref: 'img/map-contact.png',
	            // Размеры метки.
	            iconImageSize: [34, 48],
	            // Смещение левого верхнего угла иконки относительно
	            // её "ножки" (точки привязки).
	            iconImageOffset: [-3, -42]
	        });

	    myMap.geoObjects.add(myPlacemark);

		ZoomLayout = ymaps.templateLayoutFactory.createClass(
			"<div class='zoom-buttons'>" +
				"<div id='zoom-in' class='btn-plus'>+</div>" +
				"<div id='zoom-out' class='btn-minus'>-</div>" +
			"</div>", {
			build: function () {
				ZoomLayout.superclass.build.call(this);

				this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
				this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

				$('#zoom-in').bind('click', this.zoomInCallback);
				$('#zoom-out').bind('click', this.zoomOutCallback);
			},
			clear: function () {
				$('#zoom-in').unbind('click', this.zoomInCallback);
				$('#zoom-out').unbind('click', this.zoomOutCallback);

				ZoomLayout.superclass.clear.call(this);
			},
			zoomIn: function () {
				var map = this.getData().control.getMap();
				this.events.fire('zoomchange', {
					oldZoom: map.getZoom(),
					newZoom: map.getZoom() + 1
				});
			},
			zoomOut: function () {
				var map = this.getData().control.getMap();
				this.events.fire('zoomchange', {
					oldZoom: map.getZoom(),
					newZoom: map.getZoom() - 1
				});
			}
		}),
		zoomControl = new ymaps.control.ZoomControl({ 
			options: { 
				layout: ZoomLayout,
				position: {
					top: 28,
					left: 17
				}
			} 
		});

		myMap.controls.add(zoomControl);

	};
	
	

});
$(document).ready( function() {

	// form validation
	var form_validate = $('.js-validate');
	if (form_validate.length) {
		form_validate.each(function () {
			var form_this 	= $(this),
				input 		= 'input[data-validation="required"], input[data-validation="email"], input[data-validation="number"], input[data-validation="password"], input[data-validation="custom"], textarea[data-validation="required"]',
				button 		= form_this.find('input[type="submit"], button[type="submit"]');
			$.validate({
				form : form_this,
				borderColorOnError : false,
        		scrollToTopOnError : false
			});
			button.prop('disabled', true);
			function checkInput() {
				good = 1;
				form_this.find(input).each(function () {
					if ($(this).val() != '') {
						m = 1;
						console.log('val');
					}
					else {
						m = 0;
						console.log('err');
					}
					if ($(this).hasClass('error')){
						m = 0;
					}
					good = good * m;
				});
				if (good == 1){
					button.prop('disabled', false);
				}
				else {
					button.prop('disabled', true);	
				}
			};
			$('body').on('keyup', form_this.find(input), function() {
				setTimeout(function(){
					checkInput();
				}, 600);
			});
		});
	};

	// mask
	$('input[name="phone"], input[type="phone"]').inputmask({
		mask: '+999 99 999 99 99',
		showMaskOnHover: false,
		showMaskOnFocus: false,
		placeholder: ''
	});
	
	$('body').on('click', '.datepicker input', function(event) {
		$(this).addClass('is-active');
		event.stopPropagation();
	});

	$('body').on('click', function() {
		$('.datepicker input.is-active').each(function() {
			var this_ = $(this),
				parent 	= this_.parents('.datepicker');
			if(this_.val() != '') {
				parent.removeClass('error');
				parent.addClass('valid');
			}
			else {
				parent.removeClass('valid');
				parent.addClass('error');
			}
		});
	});

	$('body').on('click', '.datepicker, .datepicker .ico, .uk-datepicker', function() {
		if (!$('.uk-dropdown.uk-datepicker').hasClass('is-active')) {
			$('.uk-dropdown.uk-datepicker').addClass('is-active');
			$('.uk-dropdown.uk-datepicker').show();
		}
		else {
			$('.uk-dropdown.uk-datepicker').removeClass('is-active');
			$('.uk-dropdown.uk-datepicker').hide();
		}
	});
	
	$('body').on('click', '.datepicker .ico', function(event) {
		event.stopPropagation();
	});

	$('body').on('click', function() {
		$('.uk-dropdown.uk-datepicker').removeClass('is-active');
		$('.uk-dropdown.uk-datepicker').hide();
	});

});
define(['utils', 'hbs!js/templates/protocal'], function (Utils, protocalTemplate) {

	function render(params) {
		var template = protocalTemplate({model: params.model});
		initPopup(template);
		Utils.bindEvents(params.bindings);
	}

	function initPopup(template) {
		if ($$('.popup').length === 0) {
			var popup = document.createElement('div');
			popup.setAttribute('class', 'popup');
			popup.innerHTML = template;
			$$('body').append(popup);
		} else {
			$$('.popup').html(template);
		}
	}

	function showPhotoFront(url) {
		$$('#cardFront').html('<img src=' + url + ' alt="" height="120">');
	}

	function showPhotoBack(url) {
		$$('#cardBack').html('<img src=' + url + ' alt="" height="120">');
	}

	return {
		render: render,
		showPhotoFront: showPhotoFront,
		showPhotoBack: showPhotoBack
	};
});

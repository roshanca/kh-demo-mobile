define(['utils', 'hbs!js/templates/protocal_popup'], function (Utils, protocalPopupTemplate) {

	function render(params) {
		Utils.bindEvents(params.bindings);
	}

	function renderPopup(params) {
		var template = protocalPopupTemplate({model: params.model});
		$$('.popup').html(template);
		Utils.bindEvents(params.bindings);
	}

	function showPhotoFront(url) {
		$$('#cardFront').html('<img src=' + url + ' alt="" height="120">');
	}

	function showPhotoBack(url) {
		$$('#cardBack').html('<img src=' + url + ' alt="" height="120">');
	}

	return {
		render: render,
		renderPopup: renderPopup,
		showPhotoFront: showPhotoFront,
		showPhotoBack: showPhotoBack
	};
});

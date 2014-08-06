define(['utils', 'text!templates/protocal_popup.mustache', 'mustache'], function (Utils, protocalPopupTemplate, mustache) {

	function render(params) {
		Utils.bindEvents(params.bindings);
	}

	function renderPopup(params) {
		var template = mustache.render(protocalPopupTemplate, {model: params.model});
		$$('.popup').html(template);
		Utils.bindEvents(params.bindings);
	}

	function showPhotoFront(url) {
		$$('#cardFront').html('<img src=' + url + ' alt="" height="160">');
	}

	function showPhotoBack(url) {
		$$('#cardBack').html('<img src=' + url + ' alt="" height="160">');
	}

	return {
		render: render,
		renderPopup: renderPopup,
		showPhotoFront: showPhotoFront,
		showPhotoBack: showPhotoBack
	};
});

define(['utils', 'text!templates/collect.mustache', 'mustache'], function (Utils, collectTemplate, mustache) {

	function init(params) {
		Utils.bindEvents(params.bindings);
	}

	function render(params) {
		var template = mustache.render(collectTemplate, {model: params.model});
		$$('#collectContent').html(template);
		Utils.bindEvents(params.bindings);
	}

	function showPhotoFront(url) {
		$$('#cardFront').html('<img src=' + url + ' alt="" height="160">');
	}

	function showPhotoBack(url) {
		$$('#cardBack').html('<img src=' + url + ' alt="" height="160">');
	}

	function showPhotoFace(url) {
		$$('#face').html('<img src=' + url + ' alt="" height="160">');
	}

	return {
		init: init,
		render: render,
		showPhotoFront: showPhotoFront,
		showPhotoBack: showPhotoBack,
		showPhotoFace: showPhotoFace
	};
});

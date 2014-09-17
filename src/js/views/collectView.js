define(['utils'], function (Utils) {

	function render(params) {
		var template = $$('#collectTemplate').html();
		var compiledTemplate = Template7.compile(template);
		var renderTemplate = compiledTemplate({model: params.model});

		$$('#collectContent').append(renderTemplate);
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
		render: render,
		showPhotoFront: showPhotoFront,
		showPhotoBack: showPhotoBack,
		showPhotoFace: showPhotoFace
	};
});

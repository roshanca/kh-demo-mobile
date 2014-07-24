define(['utils', 'hbs!js/templates/review'], function (Utils, reviewTemplate) {

	function render(params) {
		var template = reviewTemplate({model: params.model});
		$$('#reviewContent').append(template);
		Utils.bindEvents(params.bindings);
	}

	return {
		render: render
	};
});

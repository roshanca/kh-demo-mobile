define(['utils', 'text!templates/review.mustache', 'mustache'], function (Utils, reviewTemplate, mustache) {

	function render(params) {
		var template = mustache.render(reviewTemplate, {model: params.model});
		$$('#reviewContent').append(template);
		Utils.bindEvents(params.bindings);
	}

	return {
		render: render
	};
});

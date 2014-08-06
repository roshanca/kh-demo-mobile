define(['utils', 'text!templates/review.mustache', 'mustache'], function (Utils, reviewTemplate, mustache) {

	function init(params) {
		Utils.bindEvents(params.bindings);
	}

	function render(params) {
		var template = mustache.render(reviewTemplate, {model: params.model});
		$$('#reviewContent').append(template);
		Utils.bindEvents(params.bindings);
	}

	return {
		init: init,
		render: render
	};
});

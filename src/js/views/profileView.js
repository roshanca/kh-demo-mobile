define(['utils', 'text!templates/profile.mustache', 'mustache'], function (Utils, profileTemplate, mustache) {

	function init(params) {
		Utils.bindEvents(params.bindings);
	}
	
	function render(params) {
		var template = mustache.render(profileTemplate, {model: params.model});
		$$('#profileContent').append(template);
		Utils.bindEvents(params.bindings);
		resetSelect(-1);
	}

	function resetSelect(value) {
		$$('.smart-select select').each(function () {
			this.value = value;
		});
	}

	return {
		init: init,
		render: render
	};
});

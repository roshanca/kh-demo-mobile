define(['utils', 'text!templates/profile.mustache', 'mustache'], function (Utils, profileTemplate, mustache) {

	function init(params) {
		Utils.bindEvents(params.bindings);
	}

	function render(params) {
		var template = mustache.render(profileTemplate, {model: params.model});
		$$('#profileContent').append(template);
		Utils.bindEvents(params.bindings);
		resetSelect();
	}

	function resetSelect() {
		$$('.smart-select select').each(function () {
			this.selectedIndex = -1;
		});
	}

	return {
		init: init,
		render: render
	};
});

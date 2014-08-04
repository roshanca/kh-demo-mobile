define(['utils', 'text!templates/profile.mustache', 'mustache'], function (Utils, profileTemplate, mustache) {

	function render(params) {
		var template = mustache.render(profileTemplate, {model: params.model});
		$$('#profileContent').append(template);
		Utils.bindEvents(params.bindings);
	}

	return {
		render: render
	};
});

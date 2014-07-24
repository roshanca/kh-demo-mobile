define(['utils', 'hbs!js/templates/profile'], function (Utils, profileTemplate) {

	function render(params) {
		var template = profileTemplate({model: params.model});
		$$('#profileContent').append(template);
		Utils.bindEvents(params.bindings);
	}

	return {
		render: render
	};
});

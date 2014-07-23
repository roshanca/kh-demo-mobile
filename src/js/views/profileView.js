define(['utils', 'hbs!js/templates/profile'], function (Utils, Template) {

	function render(params) {
		var template = Template({model: params.model});
		$$('#profileContent').append(template);
		Utils.bindEvents(params.bindings);
	}

	return {
		render: render
	};
});

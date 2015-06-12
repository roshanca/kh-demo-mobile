define(['utils'], function (Utils) {

	function render(params) {
		var template = $$('#signTemplate').html();
		var compiledTemplate = Template7.compile(template);
		var renderTemplate = compiledTemplate({model: params.model});

		$$('#signContent').append(renderTemplate);
		Utils.bindEvents(params.bindings);
		Utils.setButtonPosition('.sign-next-button');
	}

	return {
		render: render
	};
});

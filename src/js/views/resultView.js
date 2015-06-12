define(['utils'], function (Utils) {

	function render(params) {
		var template = $$('#resultTemplate').html();
		var compiledTemplate = Template7.compile(template);
		var renderTemplate = compiledTemplate({model: params.model});

		$$('#resultContent').append(renderTemplate);
		Utils.bindEvents(params.bindings);
	}

	return {
		render: render
	};
});

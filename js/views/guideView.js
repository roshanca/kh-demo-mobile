define(['utils'], function (Utils) {

	function render(params) {
		var template = $$('#guideTemplate').html();
		var compiledTemplate = Template7.compile(template);
		var renderTemplate = compiledTemplate({model: params.model});

		$$('#guideContent').append(renderTemplate);
		Utils.bindEvents(params.bindings);
	}

	return {
		render: render
	};
});

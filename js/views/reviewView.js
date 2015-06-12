define(['utils'], function (Utils) {

	function render(params) {
		var template = $$('#reviewTemplate').html();
		var compiledTemplate = Template7.compile(template);
		var renderTemplate = compiledTemplate({model: params.model});

		$$('#reviewContent').append(renderTemplate);
		Utils.bindEvents(params.bindings);
	}

	return {
		render: render
	};
});

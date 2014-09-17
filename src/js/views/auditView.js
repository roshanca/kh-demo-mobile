define(['utils'], function (Utils) {

	function render(params) {
		var template = $$('#auditTemplate').html();
		var compiledTemplate = Template7.compile(template);
		var renderTemplate = compiledTemplate({model: params.model});

		$$('#auditContent').append(renderTemplate);
		Utils.bindEvents(params.bindings);
	}

	return {
		render: render
	};
});

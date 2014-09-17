define(['utils', 'services/openTypeService'], function (Utils, OTS) {

	var model = {
		openTypes: OTS.getCurrentTypeData()
	};

	function render(params) {
		var template = $$('#guideTemplate').html();
		var compiledTemplate = Template7.compile(template);
		var renderTemplate = compiledTemplate({model: model});

		$$('.entrance').append(renderTemplate);
		Utils.bindEvents(params.bindings);
	}

	return {
		render: render
	};
});

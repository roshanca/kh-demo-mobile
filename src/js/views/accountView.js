define(['utils'], function (Utils) {

	function render(params) {
		var template = $$('#accountTemplate').html();
		var compiledTemplate = Template7.compile(template);
		var renderTemplate = compiledTemplate({model: params.model});

		$$('#accountList').append(renderTemplate);
		Utils.bindEvents(params.bindings);
	}

	function renderTitle(text) {
		$$('.sliding').html(text + '选择');
	}

	return {
		render: render,
		renderTitle: renderTitle
	};
});

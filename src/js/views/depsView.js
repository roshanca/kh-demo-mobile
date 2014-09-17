define(['utils', 'text!tpl/deps.html'], function (Utils, depsTemplate) {

	function render(params) {
		var compiledTemplate = Template7.compile(depsTemplate);
		var renderTemplate = compiledTemplate({itemList: params.model, selectable: true});

		$$('#depsList').html(renderTemplate);
		Utils.bindEvents(params.bindings);
	}

	return {
		render: render
	};
});

define(['utils', 'hbs!js/templates/risk'], function (Utils, Template) {

	function render(params) {
		var template = Template({model: params.model})
		$$('.page-content').append(template);
		Utils.bindEvents(params.bindings);
	}

	return {
		render: render
	};
});

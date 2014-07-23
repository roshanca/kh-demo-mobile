define(['utils', 'hbs!js/templates/risk'], function (Utils, Template) {

	function render(params) {
		var template = Template({model: params.model})
		$$('#riskContent').append(template);
		Utils.bindEvents(params.bindings);
	}

	return {
		render: render
	};
});

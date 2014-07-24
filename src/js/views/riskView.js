define(['utils', 'hbs!js/templates/risk'], function (Utils, riskTemplate) {

	function render(params) {
		var template = riskTemplate({model: params.model});
		$$('#riskContent').append(template);
		Utils.bindEvents(params.bindings);
	}

	return {
		render: render
	};
});

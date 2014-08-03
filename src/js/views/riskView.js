define(['utils', 'hbs!js/templates/risk', 'hbs!js/templates/risk_popup'], function (Utils, riskTemplate, riskPopupTemplate) {

	function render(params) {
		var template = riskTemplate({model: params.model});
		$$('#riskContent').append(template);
		Utils.bindEvents(params.bindings);
	}

	function renderPopup(params) {
		var template = riskPopupTemplate({model: params.model});
		$$('.popup').html(template);
		Utils.bindEvents(params.bindings);
	}

	return {
		render: render,
		renderPopup: renderPopup
	};
});

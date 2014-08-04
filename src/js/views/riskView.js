define(['utils', 'text!templates/risk.mustache', 'text!templates/risk_popup.mustache', 'mustache'], function (Utils, riskTemplate, riskPopupTemplate, mustache) {

	function render(params) {
		var template = mustache.render(riskTemplate, {model: params.model});
		$$('#riskContent').append(template);
		Utils.bindEvents(params.bindings);
	}

	function renderPopup(params) {
		var template = mustache.render(riskPopupTemplate, {model: params.model});
		$$('.popup').html(template);
		Utils.bindEvents(params.bindings);
	}

	return {
		render: render,
		renderPopup: renderPopup
	};
});

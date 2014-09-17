define(['utils', 'text!popup/risk.html'], function (Utils, riskPopupTemplate) {

	function render(params) {
		var template = $$('#riskTemplate').html();
		var compiledTemplate = Template7.compile(template);
		var renderTemplate = compiledTemplate({model: params.model});

		$$('#riskContent').append(renderTemplate);
		Utils.bindEvents(params.bindings);
	}

	function renderPopup(params) {
		var compiledTemplate = Template7.compile(riskPopupTemplate);
		var renderTemplate = compiledTemplate({model: params.model});

		$$('.popup').html(renderTemplate);
		Utils.bindEvents(params.bindings);
	}

	return {
		render: render,
		renderPopup: renderPopup
	};
});

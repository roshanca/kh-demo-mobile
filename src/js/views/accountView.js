define(['utils', 'hbs!js/templates/account', 'hbs!js/templates/protocal'], function (Utils, accountTemplate, protocalPopupTemplate) {

	function render(params) {
		var template = accountTemplate({model: params.model});
		$$('#accountContent').html(template);
		Utils.bindEvents(params.bindings);
	}

	function renderPopup(params) {
		var template = protocalPopupTemplate({model: params.model});
		$$('.popup').html(template);
		Utils.bindEvents(params.bindings);
	}

	return {
		render: render,
		renderPopup: renderPopup
	};
});

define(['utils', 'text!templates/account.mustache', 'text!templates/protocal.mustache', 'mustache'], function (Utils, accountTemplate, protocalPopupTemplate, mustache) {

	function render(params) {
		var template = mustache.render(accountTemplate, {model: params.model});
		$$('#accountContent').html(template);
		Utils.bindEvents(params.bindings);
		Utils.setButtonPosition('.account-next-button');
	}

	function renderPopup(params) {
		var template = mustache.render(protocalPopupTemplate, {model: params.model});
		$$('.popup').html(template);
		Utils.bindEvents(params.bindings);
	}

	return {
		render: render,
		renderPopup: renderPopup
	};
});

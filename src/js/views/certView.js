define(['utils', 'hbs!js/templates/cert_popup'], function (Utils, certPopupTemplate) {

	function render(params) {
		Utils.bindEvents(params.bindings);
	}

	function renderPopup(params) {
		var template = certPopupTemplate({model: params.model});
		$$('.popup').html(template);
		Utils.bindEvents(params.bindings);
	}

	function showDownloading() {
		$$('.section').hide();
		$$('#download').show();
		khApp.closeModal();
	}

	return {
		render: render,
		renderPopup: renderPopup,
		showDownloading: showDownloading
	};
});

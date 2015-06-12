define(['utils', 'text!popup/cert.html'], function (Utils, certPopupTemplate) {

	function render(params) {
		Utils.bindEvents(params.bindings);
	}

	function renderPopup(params) {
		var compiledTemplate = Template7.compile(certPopupTemplate);
		var renderTemplate = compiledTemplate({model: params.model});

		$$('.popup').html(renderTemplate);
		Utils.bindEvents(params.bindings);
	}

	function show(sectionId) {
		$$('.section').hide();
		$$('#' + sectionId).show();
		khApp.closeModal();
	}

	function showDownloading() {
		show('download');
		$$('.indicator').hide();
	}

	function showAuditBefore() {
		show('auditBefore');
		$$('.indicator').show();
	}

	function showAuditAfter() {
		show('auditAfter');
		$$('.indicator').show();
	}

	return {
		render: render,
		renderPopup: renderPopup,
		showDownloading: showDownloading,
		showAuditBefore: showAuditBefore,
		showAuditAfter: showAuditAfter
	};
});

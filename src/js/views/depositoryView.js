define(['utils', 'text!templates/depository.mustache', 'mustache'], function (Utils, depositoryTemplate, mustache) {

	function init(params) {
		Utils.bindEvents(params.bindings);
	}

	function render(params) {
		var template = mustache.render(depositoryTemplate, {model: params.model});
		$$('#depositoryContent').html(template);
		Utils.bindEvents(params.bindings);
	}

	function noNeedInput() {
		$$('#inputGroup').hide();
		$$('#agreeProtocal').show();
	}

	function onlyCardNoInput() {
		$$('#inputGroup').show();
		$$('#agreeProtocal').show();

		$$('.cardno-input').show().addClass('bare');
		$$('.cardpsw-input').hide();
	}

	function bothCardNoPswInput() {
		$$('#inputGroup').show();
		$$('#agreeProtocal').show();

		$$('.cardno-input').show().removeClass('bare');
		$$('.cardpsw-input').show();
	}

	function syncProtocal(text, id) {
		var protocalLink = document.querySelector('#protocalLink');
		replaceQueryId(protocalLink, id);
		$$('#bankName').text(text);
	}

	function replaceQueryId(link, id) {
		link.search = '?id=' + id;
	}

	return {
		init: init,
		render: render,
		noNeedInput: noNeedInput,
		onlyCardNoInput: onlyCardNoInput,
		bothCardNoPswInput: bothCardNoPswInput,
		syncProtocal: syncProtocal
	};
});

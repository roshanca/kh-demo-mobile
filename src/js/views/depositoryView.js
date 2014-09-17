define(['utils'], function (Utils) {

	function render(params) {
		var template = $$('#depositoryTemplate').html();
		var compiledTemplate = Template7.compile(template);
		var renderTemplate = compiledTemplate({model: params.model});

		$$('#depositoryContent').append(renderTemplate);
		Utils.bindEvents(params.bindings);
		resetSelect();
	}

	function resetSelect() {
		$$('.smart-select select').each(function () {
			this.selectedIndex = -1;
		});
	}

	function noNeedInput() {
		$$('#inputGroup').hide();
		$$('#agreeProtocal').show();
		$$('#agreeProtocal').css('display', '-webkit-flex');
	}

	function onlyCardNoInput() {
		$$('#inputGroup').show();
		$$('#agreeProtocal').show();
		$$('#agreeProtocal').css('display', '-webkit-flex');

		$$('.cardno-input').show().addClass('bare');
		$$('.cardpsw-input').hide();
	}

	function bothCardNoPswInput() {
		$$('#inputGroup').show();
		$$('#agreeProtocal').show();
		$$('#agreeProtocal').css('display', '-webkit-flex');

		$$('.cardno-input').show().removeClass('bare');
		$$('.cardpsw-input').show();
	}

	function syncProtocal(text, id) {
		var protocalLink = document.querySelector('#protocalLink');
		replaceQueryId(protocalLink, id);
		$$('#bankName').text(text);
	}

	function replaceQueryId(link, id) {
		link.search = '?econtract_id=' + id;
	}

	return {
		render: render,
		noNeedInput: noNeedInput,
		onlyCardNoInput: onlyCardNoInput,
		bothCardNoPswInput: bothCardNoPswInput,
		syncProtocal: syncProtocal
	};
});

define(['utils', 'hbs!js/templates/cert'], function (Utils, Template) {

	function render(params) {
		var template = Template({model: params.model});
		initPopup(template);
		Utils.bindEvents(params.bindings);
	}

	function initPopup(template) {
		if ($$('.popup').length === 0) {
			var popup = document.createElement('div');
			popup.setAttribute('class', 'popup');
			popup.innerHTML = template;
			$$('body').append(popup);
		} else {
			$$('.popup').html(template);
		}
	}

	function reRender(params) {
		var template = Template({model: params.model});
		initPopup(template);
		bindButtonEvent(params);
	}

	function bindButtonEvent(params) {
		$$('.download-button').on('click', function () {
			params.doneCallback(params.model.errorNo);
		});
	}

	return {
		render: render,
		reRender: reRender
	}
});

define(['utils', 'hbs!js/templates/cert'], function (Utils, Template) {

	function render(params) {
		var template = Template({model: params.model})
		$$('body').append(template);
		Utils.bindEvents(params.bindings);
	}

	function reRender(params) {
		var template = Template({model: params.model})
		$$('.popup').remove();
		$$('body').append(template);
		bindButtonEvent(params);
	}

	function bindButtonEvent(params) {
		$$('.cert-button').on('click', function () {
			params.doneCallback(params.model.errorNo);
		});
	}

	return {
		render: render,
		reRender: reRender
	}
});

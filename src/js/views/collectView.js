define(['utils', 'hbs!js/templates/protocal'], function (Utils, Template) {

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

	return {
		render: render
	};
});

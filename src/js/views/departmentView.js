define(['utils', 'hbs!js/templates/department'], function (Utils, Template) {

	function render(params) {
		var template = Template({model: params.model})
		$$('.page-content').append(template);
		Utils.bindEvents(params.bindings);
	}

	function setTrigger(el) {
		$$('.smart-select').find('.trigger').removeClass('trigger');
		el.addClass('trigger');
	}

	function getTrigger() {
		var trigger = $$('.smart-select').find('.trigger').find('.item-after');
		return trigger;
	}

	function renderName(val) {
		$$('.department-name').find('h3').text(val);
	}

	return {
		render: render,
		setTrigger: setTrigger,
		getTrigger: getTrigger,
		renderName: renderName
	};
});

define(['utils', 'hbs!js/templates/department'], function (Utils, departmentTemplate) {

	function render(params) {
		var template = departmentTemplate({model: params.model});
		$$('#departmentContent').append(template);
		Utils.bindEvents(params.bindings);
	}

	function setTrigger(el) {
		$$('#departmentContent').find('.trigger').removeClass('trigger');
		el.addClass('trigger');
	}

	function getTrigger() {
		var trigger = $$('#departmentContent').find('.trigger').find('.item-after');
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

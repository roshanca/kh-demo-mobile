define(['utils', 'hbs!js/templates/department'], function (Utils, departmentTemplate) {

	function render(params) {
		Utils.bindEvents(params.bindings);
	}

	function renderSelect(params) {
		var template = departmentTemplate({model: params.model});
		$$('#departmentContent').append(template);
		Utils.bindEvents(params.bindings);
	}

	function renderName(text) {
		$$('.department-name').find('h2').text(text);
	}

	return {
		render: render,
		renderName: renderName,
		renderSelect: renderSelect
	};
});

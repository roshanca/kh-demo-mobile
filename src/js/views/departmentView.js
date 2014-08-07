define(['utils', 'text!templates/department.mustache', 'mustache'], function (Utils, departmentTemplate, mustache) {

	function render(params) {
		Utils.bindEvents(params.bindings);
		Utils.setButtonPosition('.department-next-button');
	}

	function renderSelect(params) {
		var template = mustache.render(departmentTemplate, {model: params.model});
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

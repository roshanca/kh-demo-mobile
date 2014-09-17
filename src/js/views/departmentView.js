define(['utils'], function (Utils) {

	function render(params) {
		Utils.bindEvents(params.bindings);
		Utils.setButtonPosition('.department-next-button');
	}

	function renderSelect(params) {
		var template = $$('#departmentTemplate').html();
		var compiledTemplate = Template7.compile(template);
		var renderTemplate = compiledTemplate({model: params.model});

		$$('#departmentContent').append(renderTemplate);
		Utils.bindEvents(params.bindings);
		resetSelect();
	}

	function renderName(text) {
		$$('.department-name').find('h2').text(text);
	}

	function renderBadge() {
		$$('.department-badge').html('您选择的是');
	}

	function resetSelect() {
		$$('.smart-select select').each(function () {
			this.selectedIndex = -1;
		});
	}

	return {
		render: render,
		renderName: renderName,
		renderBadge: renderBadge,
		renderSelect: renderSelect
	};
});

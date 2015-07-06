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

	function renderBadge(selectedBadge) {
		if(selectedBadge === 'recommend') {
			$$('.department-badge').html('<i class="iconfont icon-recommend"></i> 推荐');
		} else if (selectedBadge === 'all') {
			$$('.department-badge').html('<i class="iconfont icon-lookfor"></i> 自选');
		} else {
			$$('.department-badge').html('<i class="iconfont icon-local"></i> 附近');
		}
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

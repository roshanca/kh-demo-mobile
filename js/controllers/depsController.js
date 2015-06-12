define(['views/depsView', 'models/depsModel'], function (View, Model) {

	var bindings = [{
		element: '#depsList .label-radio',
		event: 'click',
		handler: selectDeps
	}, {
		element: '.deps-select-button',
		event: 'click',
		handler: selectHandler
	}];

	function init(query) {
		var depsData = Model.fetchDeps(query.city);
		View.render({
			model: depsData,
			bindings: bindings
		});
	}

	function selectDeps() {
		var button = $$('.deps-select-button');
		var isButtonDisable = button.hasClass('disabled');
		if (!isButtonDisable) return;

		var input = $$(this).find('input')[0];
		setTimeout(function () {
			if (input.checked) {
				button.removeClass('disabled');
			}
		}, 200);
	}

	function selectHandler() {
		var input = $$('#depsList').find('input:checked');
		var parent = input.parent();
		var depsname = parent.find('.item-title').html();

		mainView.reloadPage('department.html?depsname=' + depsname);
	}

	return {
		init: init
	};
});

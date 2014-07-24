define(['utils'], function (Utils) {

	function render(params) {
		Utils.bindEvents(params.bindings);
	}

	return {
		render: render
	};
});

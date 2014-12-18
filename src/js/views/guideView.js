define(['utils', 'services/openTypeService'], function (Utils, OTS) {

	var model = {
		openTypes: OTS.getCurrentTypeData()
	};

	function render(params) {
		Utils.bindEvents(params.bindings);
	}

	return {
		render: render
	};
});

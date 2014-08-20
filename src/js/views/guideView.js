define(['utils', 'services/openTypeService', 'text!templates/guide.mustache', 'mustache'], function (Utils, OTS, guideTemplate, mustache) {

	var model = {
		openTypes: OTS.getCurrentTypeData()
	};

	function render(params) {
		var template = mustache.render(guideTemplate, {model: model});
		$$('.entrance').html(template);
		Utils.bindEvents(params.bindings);
	}

	return {
		render: render
	};
});

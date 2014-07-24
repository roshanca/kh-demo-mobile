define(['utils', 'hbs!js/templates/audit'], function (Utils, auditTemplate) {

	function render(params) {
		var template = auditTemplate({model: params.model});
		$$('#auditContent').append(template);
		Utils.bindEvents(params.bindings);
	}

	return {
		render: render
	};
});

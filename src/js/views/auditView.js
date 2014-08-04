define(['utils', 'text!templates/audit.mustache', 'mustache'], function (Utils, auditTemplate, mustache) {

	function render(params) {
		var template = mustache.render(auditTemplate, {model: params.model});
		$$('#auditContent').append(template);
		Utils.bindEvents(params.bindings);
	}

	return {
		render: render
	};
});

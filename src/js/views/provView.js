define(['utils', 'text!templates/select.mustache', 'mustache'], function (Utils, selectTemplate, mustache) {

	function render(params) {
		var template = mustache.render(selectTemplate, {itemList: params.model});
		$$('#provList').html(template);
		Utils.bindEvents(params.bindings);
	}

	return {
		render: render
	};
});

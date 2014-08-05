define(['text!templates/protocal.mustache', 'mustache'], function (protocalTemplate, mustache) {

	function render(params) {
		var template = mustache.render(protocalTemplate, {model: params.model});
		$$('#protocalContent').append(template);
	}

	return {
		render: render
	};
});

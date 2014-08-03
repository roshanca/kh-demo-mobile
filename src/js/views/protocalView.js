define(['hbs!js/templates/protocal'], function (protocalTemplate) {

	function render(params) {
		var template = protocalTemplate({model: params.model});
		$$('#protocalContent').append(template);
	}

	return {
		render: render
	};
});

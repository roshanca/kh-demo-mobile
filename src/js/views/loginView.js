define(['utils'], function (Utils) {

	function init(params) {
		Utils.bindEvents(params.bindings)
	}

	return {
		init: init
	}
});

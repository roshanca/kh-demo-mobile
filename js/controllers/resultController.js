define(['views/resultView'], function (View) {

	var bindings = [];

	function init() {
		khApp.showIndicator();
		$$.ajax({
			url: 'api/result.json',
			type: 'GET',
			success: function (data) {
				data = JSON.parse(data);
				if (data.errorNo === 0) {
					View.render({
						model: data.model,
						bindings: bindings
					});
					khApp.hideIndicator();
				}
			}
		});
	}

	return {
		init: init
	};
});

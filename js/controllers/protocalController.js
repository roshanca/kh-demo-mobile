define(['views/protocalView'], function (View) {

	function init(query) {
		console.log(query);
		requestContent(query);
	}

	function requestContent(query) {
		khApp.showIndicator();
		$$.ajax({
			url: 'api/protocal.json',
			type: 'GET',
			data: query,
			success: function (data) {
				data = JSON.parse(data);
				if (data.errorNo === 0) {
					View.render({
						model: data.model
					});
				}
				khApp.hideIndicator();
			}
		});
	}

	return {
		init: init
	};
});

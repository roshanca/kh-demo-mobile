define(['js/views/protocalView', 'GS'], function (View, GS) {

	function init(query) {
		console.log(query);
		requestContent(query);
	}

	function requestContent(query) {
		khApp.showIndicator();
		var xhr = $$.ajax({
			url: 'api/protocal.json',
			type: 'POST',
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

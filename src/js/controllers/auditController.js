define(['js/views/auditView', 'GS'], function (View, GS) {

	var bindings = [{
		element: '#logout',
		event: 'click',
		handler: GS.logout
	}];

	function init() {
		khApp.showIndicator();
		$$.ajax({
			url: 'api/audit.json',
			type: 'POST',
			success: function (data) {
				var data = JSON.parse(data);
				if (data.errorNo == '0') {
					var model = data.model;
					View.render({
						bindings: bindings,
						model: model
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

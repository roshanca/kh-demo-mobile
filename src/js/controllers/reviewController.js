define(['js/views/reviewView', 'GS'], function (View, GS) {

	var bindings = [{
		element: '#logout',
		event: 'click',
		handler: GS.logout
	}, {
		element: '.next-button',
		event: 'click',
		handler: nextSubmit
	}];

	function init() {
		khApp.showIndicator();
		$$.ajax({
			url: 'api/review.json',
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

	function nextSubmit() {
		mainView.loadPage('audit.html');
	}

	return {
		init: init
	};
});

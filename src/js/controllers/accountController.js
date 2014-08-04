define(['views/accountView', 'GS'], function (View, GS) {

	var bindings = [{
		element: '#logout',
		event: 'click',
		handler: GS.logout
	}, {
		element: '.account-next-button',
		event: 'click',
		handler: nextSubmit
	}];

	function init() {
		khApp.showIndicator();
		$$.ajax({
			url: 'api/account.json',
			type: 'POST',
			success: function (data) {
				data = JSON.parse(data);
				if (data.errorNo === 0) {
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
		mainView.loadPage('password.html');
	}

	return {
		init: init
	};
});

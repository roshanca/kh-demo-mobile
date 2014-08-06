define(['views/reviewView', 'GS'], function (View, GS) {

	var bindings = [{
		element: '#logout',
		event: 'click',
		handler: GS.logout
	}];

	var afterBindings = [{
		element: '.review-next-button',
		event: 'click',
		handler: nextSubmit
	}, {
		element: '.select-trigger',
		event: 'click',
		handler: selectTrigger
	}];

	function init() {
		View.init({
			bindings: bindings
		});
		khApp.showIndicator();
		$$.ajax({
			url: 'api/review.json',
			type: 'POST',
			success: function (data) {
				data = JSON.parse(data);
				if (data.errorNo === 0) {
					var model = data.model;
					View.render({
						model: model,
						bindings: afterBindings
					});
					khApp.hideIndicator();
				}
			}
		});
	}

	function nextSubmit() {
		var resultData = khApp.formToJSON('#reviewContent');
		console.log(resultData);
		mainView.loadPage('audit.html');
	}

	function selectTrigger() {
		var radio = $$(this).parent().find('[type=radio]');
		radio[0].checked = true;
	}

	return {
		init: init
	};
});

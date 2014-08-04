define(['views/riskView', 'GS'], function (View, GS) {

	var bindings = [{
		element: '#logout',
		event: 'click',
		handler: GS.logout
	}, {
		element: '.risk-submit-button',
		event: 'click',
		handler: resultSubmit
	}];

	var afterBindings = [{
		element: '#logout',
		event: 'click',
		handler: GS.logout
	}, {
		element: '.risk-next-button',
		event: 'click',
		handler: nextSubmit
	}];

	function init() {
		khApp.showIndicator();
		$$.ajax({
			url: 'api/risk.json',
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

	function resultSubmit() {
		// var formData = khApp.formToJSON('#riskContent');
		// for (var i in formData) {
		// 	console.log(i);
		// }



		// var list = $$('#riskContent').find('.list-block');
		// list.each(function (i) {
		// 	var input = $$(this).find('input')[0];
		// 	console.log(input.checked);
		// });

		khApp.showIndicator();
		$$.ajax({
			url: 'api/risk_result.json',
			type: 'POST',
			success: function (data) {
				data = JSON.parse(data);
				if (data.errorNo === 0) {
					View.renderPopup({
						model: data.model,
						bindings: afterBindings
					});
					khApp.popup('.popup');
				}
				khApp.hideIndicator();
			}
		});
	}

	function nextSubmit() {
		khApp.closeModal();
		mainView.loadPage('review.html');
	}

	return {
		init: init
	};
});

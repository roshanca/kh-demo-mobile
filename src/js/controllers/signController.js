define(['views/signView'], function (View) {

	var bindings = [{
		element: '.select-trigger',
		event: 'click',
		handler: selectAccount
	}, {
		element: '.sign-next-button',
		event: 'click',
		handler: nextSubmit
	}];

	function init() {
		khApp.showIndicator();
		$$.ajax({
			url: 'api/sign.json',
			type: 'GET',
			success: function (data) {
				data = JSON.parse(data);
				if (data.errorNo === 0) {
					var model = data.model;
					View.render({
						bindings: bindings,
						model: model
					});
					checkAccountValue();
					khApp.hideIndicator();
				}
			}
		});
	}

	function checkAccountValue() {
		var source = $$('#signContent input[type="radio"]');
		source.each(function () {
			if (this.value.length !== 0) { this.checked = true; }
		});
	}

	function getAccountValue(trigger) {
		var source = $$(trigger).parent().find('input[type="radio"]');

		return source.val();
	}

	function selectAccount() {
		var checkedValue = getAccountValue(this);
		var accountName = $$(this).text();

		mainView.loadPage('select/account.html?title=' + accountName + '&value=' + checkedValue);
	}

	function nextSubmit() {
		mainView.loadPage('password.html');
	}

	return {
		init: init
	};
});

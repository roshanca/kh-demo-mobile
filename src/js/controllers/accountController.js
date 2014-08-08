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

	function getSelectGroupValue() {
		var optgroup = $$('[name=account]').find('optgroup');
		var ret = [];

		for (var i = 0, l = optgroup.length; i < l; i++) {
			var options = optgroup[i].getElementsByTagName('option');
			for (var j = 0, m = options.length;  j < m; j++) {
				if (options[j].selected) {
					ret.push({
						'group': optgroup[i].label,
						'value': options[j].value
					});
				}
			}
		}

		return ret;
	}


	function nextSubmit() {
		var groupValue = getSelectGroupValue();
		console.log(groupValue);
		mainView.loadPage('password.html');
	}

	return {
		init: init
	};
});

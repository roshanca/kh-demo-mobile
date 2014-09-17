define(['views/depositoryView'], function (View) {

	var bindings = [{
		element: '#bank',
		event: 'change',
		handler: selectBank
	}, {
		element: '.depository-next-button',
		event: 'click',
		handler: nextSubmit
	}];

	function init() {
		khApp.showIndicator();
		$$.ajax({
			url: 'api/depository.json',
			type: 'GET',
			success: function (data) {
				data = JSON.parse(data);
				if (data.errorNo === 0) {
					View.render({
						model: data.model,
						bindings: bindings
					});
				}
				khApp.hideIndicator();
			}
		});
	}

	function selectBank() {
		var selectedOption = this.options[this.selectedIndex],
			type = $$(selectedOption).data('type'),
			text = selectedOption.text,
			id = $$(selectedOption).data('protocal-id');

		console.log(type);
		switch (type) {
			case '00':
				View.noNeedInput(); // 00: 无需填写卡号密码
				break;
			case '01':
				View.onlyCardNoInput(); // 01: 只需填写卡号
				break;
			case '11':
				View.bothCardNoPswInput(); // 11: 同时需要填写卡号和密码
				break;
		}
		View.syncProtocal(text, id);
	}

	function nextSubmit() {
		mainView.loadPage('risk.html');
	}

	return {
		init: init
	};
});

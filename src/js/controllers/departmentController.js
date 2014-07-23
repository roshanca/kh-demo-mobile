define(['js/views/departmentView', 'GS'], function (View, GS) {

	var bindings = [{
		element: '#logout',
		event: 'click',
		handler: GS.logout
	}, {
		element: '.next-button',
		event: 'click',
		handler: nextSubmit
	}, {
		element: document,
		event: 'pageInit',
		handler: setName
	}, {
		element: '.nearby',
		event: 'click',
		handler: setTrigger
	}, {
		element: '.all',
		event: 'click',
		handler: setTrigger
	}];

	function init() {
		khApp.showIndicator();
		$$.ajax({
			url: 'api/department.json',
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
		mainView.loadPage('video.html');
		$$(document).off('pageInit', setName);
	}

	function setName(e) {
		var page = e.detail.page;
		if (page.from === 'left') {
			console.log(page);
			var name = View.getTrigger().text();
			View.renderName(name);
		}
	}

	function setTrigger() {
		View.setTrigger($$(this));
	}

	return {
		init: init
	};
});

define(['js/views/collectView', 'GS'], function (View, GS) {

	var bindings = [{
		element: '#logout',
		event: 'click',
		handler: GS.logout
	}, {
		element: '.fileuploader-button',
		event: 'change',
		handler: fileSelected
	}, {
		element: '.next-button',
		event: 'click',
		handler: nextSubmit
	}];

	function init() {
		View.render({
			bindings: bindings
		});
	}

	function fileSelected() {
		khApp.alert(this.files[0].name);
	}

	function nextSubmit() {
		khApp.modal({
			title: '接受协议',
			text: 'Vivamus feugiat diam velit. Maecenas aliquet egestas lacus, eget pretium massa mattis non. Donec volutpat euismod nisl in posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae',
			buttons: [{
				text: '拒绝'
			}, {
				text: '接受',
				onClick: function () {
					var currentUser = GS.getCurrentUser();
					$$.ajax({
						url: 'api/login.json',
						type: 'POST',
						data: {},
						success: function (data) {
							var data = JSON.parse(data);
							var newUserData = {
								"id": "10001",
								"node": {
									"prev": "collect",
									"current": "profile",
									"next": ""
								}
							}
							if (data.resMap.errorNo == '0') {
								GS.removeCurrentUser();
								GS.setCurrentUser(data.resMap['sid'], newUserData);
								mainView.loadPage(currentUser.node.next + '.html');
							}
						}
					});
				}
			}]
		});
	}

	return {
		init: init
	};
});

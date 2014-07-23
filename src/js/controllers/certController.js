define(['js/views/certView', 'js/router', 'GS'], function (View, Router, GS) {

	var bindings = [{
		element: '#logout',
		event: 'click',
		handler: GS.logout
	}, {
		element: '.next-button',
		event: 'click',
		handler: requestCert
	}];

	function init() {
		View.render({
			bindings: bindings,
			model: {"isDownloading": true}
		});
	}

	function requestCert() {
		khApp.popup('.popup');

		$$.ajax({
			url: 'api/cert.json',
			type: 'POST',
			start: function (XMLHttpRequest) {
				XMLHttpRequest.addEventListener('progress', function (e) {
					if (e.lengthComputable) {
						var percentComplete = (e.loaded / e.total) * 100;
						console.log(percentComplete);
					};
				}, false);
			},
			success: function (data) {
				var data = JSON.parse(data);

				View.reRender({
					model: data,
					doneCallback: doneCallback
				});

				khApp.popup('.popup');
			}
		});
	}

	function doneCallback(errorNo) {
		if (errorNo == '0') {
			khApp.modal({
				title: '系统消息',
				text: '数字证书已安装成功，是否要继续？',
				buttons: [{
					text: '取消',
					onClick: function () {
						khApp.closeModal();
					}
				}, {
					text: '继续',
					onClick: function () {
						mainView.loadPage('account.html');
						khApp.closeModal();
					}
				}]
			});
		} else {
			requestCert();
		}
	}

	return {
		init: init
	}
});

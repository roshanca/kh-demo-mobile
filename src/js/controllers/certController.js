define(['js/views/certView', 'js/router', 'GS'], function (View, Router, GS) {

	var bindings = [{
		element: '#logout',
		event: 'click',
		handler: GS.logout
	}, {
		element: '.cert-request-button',
		event: 'click',
		handler: requestCert
	}];

	var afterBindings = [{
		element: '.cert-download-button',
		event: 'click',
		handler: doneCallback
	}, {
		element: '.cert-retry-button',
		event: 'click',
		handler: requestCert
	}];

	function init() {
		View.render({
			bindings: bindings
		});
	}

	function requestCert() {
		View.showDownloading();
		// khApp.showIndicator();
		var xhr = $$.ajax({
			url: 'api/cert.json',
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
				// khApp.hideIndicator();
			}
		});

		// 下载进度
		xhr.onprogress = function (e) {
			if (e.lengthComputable) {
				var percentComplete = (e.loaded / e.total) * 100;
				console.log(percentComplete);
				$$('progress').val(percentComplete);
			}
		};
	}

	function doneCallback() {
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
	}

	return {
		init: init
	};
});

define(['views/certView', 'GS'], function (View, GS) {

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
		setTimeout(View.showAuditAfter, 1500);
	}

	function requestCert() {
		View.showDownloading();
		// khApp.showIndicator();
		setTimeout(function () {
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
		}, 1500);
	}

	function doneCallback() {
		mainView.loadPage('collect.html');
	}

	return {
		init: init
	};
});

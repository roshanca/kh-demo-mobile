define(['views/certView'], function (View) {

	var bindings = [{
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
				type: 'GET',
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
		View.showAuditAfter();
		khApp.closeModal();
		mainView.loadPage('sign.html');
	}

	return {
		init: init
	};
});

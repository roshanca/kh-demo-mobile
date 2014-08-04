define(['views/videoView', 'GS'], function (View, GS) {

	var bindings = [{
		element: '#logout',
		event: 'click',
		handler: GS.logout
	}, {
		element: '.video-start-button',
		event: 'click',
		handler: startVideo
	}, {
		element: '.video-wait-button',
		event: 'click',
		handler: waitVideo
	}, {
		element: '.video-success-button',
		event: 'click',
		handler: successTest
	}, {
		element: '.video-fail-button',
		event: 'click',
		handler: failTest
	}, {
		element: '#waitLeft',
		event: 'click',
		handler: View.showReady
	}];

	var afterBindings = [{
		element: '#logout',
		event: 'click',
		handler: GS.logout
	}, {
		element: '.video-next-button',
		event: 'click',
		handler: nextSubmit
	}, {
		element: '.video-retry-button',
		event: 'click',
		handler: retry
	}];

	var queryCount = 0,
		needWait = true,
		timer;

	function init() {
		View.render({
			bindings: bindings
		});
	}

	function startVideo() {
		View.showWait();
		queryUserWaitInfo();
	}

	function queryUserWaitInfo() {
		if (!needWait) {
			return;
		}

		if (queryCount >= 3) {
			View.toggleDialog('show');
			clearTimeout(timer);
			return;
		}

		$$.ajax({
			url: 'api/video.json',
			type: 'POST',
			success: function (data) {
				data = JSON.parse(data);
				if (data.errorNo === 0) {
					var videoStatus = data.videoStatus;
					if (videoStatus === 1) { // 可连接视频
						// videoStart();
					} else if (videoStatus === 0) { // 进入排队
						View.showWait(data.waitNum);
						needWait = true;
						queryCount++;
					}
				} else {
					khApp.alert(data.errorInfo);
					queryCount++;
				}
			},
			error: function () {
				queryCount++;
			}
		});

		// 定时任务
		timer = setTimeout(queryUserWaitInfo, 1500);
	}

	function waitVideo() {
		View.toggleDialog('hide');
		queryCount = 0;
		queryUserWaitInfo();
	}

	function successTest() {
		khApp.showIndicator();
		$$.ajax({
			url: 'api/video_success.json',
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

	function failTest() {
		khApp.showIndicator();
		$$.ajax({
			url: 'api/video_fail.json',
			type: 'POST',
			success: function (data) {
				data = JSON.parse(data);
				if (data.errorNo === 1) {
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

	function retry() {
		View.showReady();
		khApp.closeModal();
	}

	function nextSubmit() {
		mainView.loadPage('account.html');
		khApp.closeModal();
	}

	return {
		init: init
	};
});

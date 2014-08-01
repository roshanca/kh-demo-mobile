define(['js/views/videoView', 'GS'], function (View, GS) {

	var bindings = [{
		element: '#logout',
		event: 'click',
		handler: GS.logout
	}, {
		element: '.video-start-button',
		event: 'click',
		handler: startVideo
	}, {
		element: '.wait-button',
		event: 'click',
		handler: waitVideo
	}, {
		element: '.video-success-button',
		event: 'click',
		handler: success
	}, {
		element: '.video-fail-button',
		event: 'click',
		handler: fail
	}, {
		element: '.video-retry-button',
		event: 'click',
		handler: retry
	}, {
		element: '#waitLeft',
		event: 'click',
		handler: View.showReady
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
		timer = setTimeout(queryUserWaitInfo, 3000);
	}

	function waitVideo() {
		View.toggleDialog('hide');
		queryCount = 0;
		queryUserWaitInfo();
	}

	function success() {
		View.showSuccess();
	}

	function fail() {
		View.showFail();
	}

	function retry() {
		View.showReady();
	}

	function nextSubmit() {
		mainView.loadPage('cert.html');
	}

	return {
		init: init
	};
});

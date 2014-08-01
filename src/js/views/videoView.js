define(['utils'], function (Utils) {

	function render(params) {
		Utils.bindEvents(params.bindings);
	}

	function showReady() {
		$$('.left').css('visibility', 'visible');
		$$('.video-content').hide();
		$$('#videoReady').show();
	}

	function showWait(num) {
		$$('#readyLeft').hide();
		$$('#waitLeft').show();
		$$('.video-content').hide();
		$$('#videoWait').show();

		if (num) {
			$$('.wait-num').html(num);
		}
	}

	function showSuccess() {
		$$('.left').css('visibility', 'hidden');
		$$('.video-content').hide();
		$$('#videoSuccess').show();
	}

	function showFail() {
		$$('.left').css('visibility', 'hidden');
		$$('.video-content').hide();
		$$('#videoFail').show();
	}

	/**
	 * 显示隐藏 dialog
	 */
	function toggleDialog(flag) {
		if (flag === 'hide') {
			$$('.dialog').hide();
		} else if (flag === 'show') {
			$$('.dialog').show();
		}
	}

	return {
		render: render,
		showWait: showWait,
		showReady: showReady,
		showSuccess: showSuccess,
		showFail: showFail,
		toggleDialog: toggleDialog,
	};
});

define(['utils'], function (Utils) {

	function render(params) {
		Utils.bindEvents(params.bindings);
	}

	function ready(num) {
		$$('.video-content').hide();
		$$('#videoWait').show();

		if (num) {
			$$('.wait-num').html(num);
		}
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
		ready: ready,
		toggleDialog: toggleDialog
	};
});

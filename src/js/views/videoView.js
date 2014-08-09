define(['utils', 'text!templates/video_popup.mustache', 'mustache'], function (Utils, videoPopupTemplate, mustache) {

	function render(params) {
		Utils.bindEvents(params.bindings);
	}

	function renderPopup(params) {
		var template = mustache.render(videoPopupTemplate, {model: params.model});
		$$('.popup').html(template);
		Utils.bindEvents(params.bindings);
	}

	function showReady() {
		$$('#readyLeft').show();
		$$('#waitLeft').hide();
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

	/**
	 * 显示隐藏 dialog
	 */
	function toggleDialog(visible) {
		if (visible === 'hide') {
			$$('.dialog').hide();
		} else if (visible === 'show') {
			$$('.dialog').show();
		}
	}

	return {
		render: render,
		renderPopup: renderPopup,
		showWait: showWait,
		showReady: showReady,
		toggleDialog: toggleDialog,
	};
});

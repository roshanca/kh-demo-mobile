define(['utils', 'hbs!js/templates/video_popup'], function (Utils, videoPopupTemplate) {

	function render(params) {
		Utils.bindEvents(params.bindings);
	}

	function renderPopup(params) {
		var template = videoPopupTemplate({model: params.model});
		$$('.popup').html(template);
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
		renderPopup: renderPopup,
		showWait: showWait,
		showReady: showReady,
		toggleDialog: toggleDialog,
	};
});

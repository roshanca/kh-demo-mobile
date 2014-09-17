define(['utils', 'text!popup/video.html'], function (Utils, videoPopupTemplate) {

	function render(params) {
		Utils.bindEvents(params.bindings);
	}

	function renderPopup(params) {
		var compiledTemplate = Template7.compile(videoPopupTemplate);
		var renderTemplate = compiledTemplate({model: params.model});

		$$('.popup').html(renderTemplate);
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

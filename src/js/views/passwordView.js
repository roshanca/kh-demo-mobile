define(['utils'], function (Utils) {

	function render(params) {
		Utils.bindEvents(params.bindings);
	}

	function toggleInputs(visiable) {
		var wrapper = $$('.sync-trigger').parent(),
			trigger = $$('.sync-trigger'),
			content = $$('.sync-item').css('overflow', 'hidden').find('.item-content'),
			height = trigger.outerHeight(),
			clientHeight;

		if (visiable === 'hide') {
			wrapper.css('height', height * 3 + 'px');
			clientHeight = wrapper[0].clientHeight;
			wrapper.css('height', height + 'px').transition('300ms');
			content.transform('translate3d(0,-200%,0)')
				.transition('300ms')
				.transitionEnd(function () {
					trigger.addClass('bare');
					content.hide();
				});
		} else if (visiable === 'show') {
			content.show();
			trigger.removeClass('bare');
			wrapper.css('height', height + 'px');
			clientHeight = wrapper[0].clientHeight;
			wrapper.css('height', height * 3 + 'px').transition('300ms');
			content.transform('translate3d(0,0,0)').transition('300ms');
		}
	}

	return {
		render: render,
		toggleInputs: toggleInputs
	};
});

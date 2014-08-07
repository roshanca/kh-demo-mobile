define([], function () {

	/**
	 * Bind DOM event to some handler function in controller
	 * @param  {Array} bindings
	 */
	function bindEvents(bindings) {
		if ($$.isArray(bindings) && bindings.length > 0) {
			for (var i in bindings) {
				$$(bindings[i].element).on(bindings[i].event, bindings[i].handler);
			}
		}
	}

	function setButtonPosition(selector) {
		var pageContent = $$(selector).parents('.page-content');
		if (isScroll(pageContent[0])) {
			return;
		}
		$$(selector).css({
			'position': 'fixed',
			'bottom': '30px',
			'width': 'calc(100% - 30px)'
		});
	}

	function isScroll(elem) {
		return elem.scrollHeight > elem.clientHeight;
	}

	return {
		bindEvents: bindEvents,
		setButtonPosition: setButtonPosition
	};
});

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

	return {
		bindEvents: bindEvents
	}
});

define(['views/passwordView', 'GS', 'utils'], function (View, GS, Utils) {

	var bindings = [{
		element: '#logout',
		event: 'click',
		handler: GS.logout
	}, {
		element: '.password-next-button',
		event: 'click',
		handler: nextSubmit
	}, {
		element: '.toggle-switch',
		event: 'change',
		handler: toggleDisplay
	}];

	function init() {
		View.render({
			bindings: bindings
		});
	}

	function toggleDisplay() {
		if (this.checked) {
			View.toggleInputs('hide');
		} else {
			View.toggleInputs('show');
		}
	}

	function nextSubmit() {
		$$(window).off('resize', window.bind_resize);
		mainView.loadPage('depository.html');
	}

	return {
		init: init
	};
});

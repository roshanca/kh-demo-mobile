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
		element: '#toggleSwitch',
		event: 'click',
		handler: handleSync
	}];

	var checkSync = document.querySelector('#checkSync');

	function init() {
		View.render({
			bindings: bindings
		});
	}

	function handleSync() {
		setTimeout(toggleDisplay, 100);
	}

	function toggleDisplay() {
		if (checkSync.checked) {
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

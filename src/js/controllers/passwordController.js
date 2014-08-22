define(['views/passwordView', 'GS'], function (View, GS) {

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

	function init() {
		View.render({
			bindings: bindings
		});
	}

	function handleSync() {
		setTimeout(toggleDisplay, 100);
	}

	function toggleDisplay() {
		var checkSync = document.querySelector('#checkSync');
		if (checkSync.checked) {
			View.toggleInputs('hide');
		} else {
			View.toggleInputs('show');
		}
	}

	function nextSubmit() {
		mainView.loadPage('depository.html');
	}

	return {
		init: init
	};
});

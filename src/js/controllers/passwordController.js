define(['views/passwordView'], function (View) {

	var bindings = [{
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

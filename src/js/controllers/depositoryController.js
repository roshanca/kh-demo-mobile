define(['views/depositoryView', 'GS'], function (View, GS) {

	var bindings = [{
		element: '#logout',
		event: 'click',
		handler: GS.logout
	}, {
		element: '.depository-next-button',
		event: 'click',
		handler: nextSubmit
	}];

	function init() {
		View.render({
			bindings: bindings
		});
	}

	function nextSubmit() {
		mainView.loadPage('risk.html');
	}

	return {
		init: init
	};
});

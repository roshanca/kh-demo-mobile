define(['js/views/profileView', 'GS'], function (View, GS) {

	var bindings = [{
		element: '#logout',
		event: 'click',
		handler: GS.logout
	}, {
		element: '.next-button',
		event: 'click',
		handler: nextSubmit
	}];

	function init() {
		View.render({
			bindings: bindings
		});
	}

	function nextSubmit() {
		mainView.loadPage('cert.html');
	}

	return {
		init: init
	};
});

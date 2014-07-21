define(['js/views/accountView', 'GS'], function (View, GS) {

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
		mainView.loadPage('password.html');
	}

	return {
		init: init
	}
})

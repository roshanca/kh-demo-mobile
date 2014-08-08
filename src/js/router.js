define(['GS'], function (GS) {

	var hash = {
		login      : 'login',
		identity   : 'identity',
		collect    : 'collect',
		profile    : 'profile',
		department : 'department',
		video      : 'video',
		appoint    : 'appoint',
		cert       : 'cert',
		account    : 'account',
		risk       : 'risk',
		password   : 'password',
		depository : 'depository',
		review     : 'review',
		audit      : 'audit',
		protocal   : 'protocal',
		reform     : 'reform'
	};

	/**
	 * Init router, that handle page events
	 */
	function init() {
		$$(document).on('pageBeforeInit', function (e) {
			var page = e.detail.page;
			load(page.name, page.query);
		});

		if (!GS.isLogin()) {
			// mainView.loadPage('login.html');
			mainView.loadPage('index.html', false);
		} else {
			var currentUser = GS.getCurrentUser();
			mainView.loadPage(currentUser.node + '.html');
		}
	}

	/**
	 * Load (or reload) controller from js code (another controller) - call it's init function
	 * @param  controllerName
	 * @param  query
	 */
	function load(controllerName, query) {
		if (controllerName in hash) {
			require(['controllers/' + hash[controllerName] + 'Controller'], function (controller) {
				controller.init(query);
			});
		}
	}

	return {
		init: init,
		load: load
	};
});

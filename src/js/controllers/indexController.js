define([], function () {

	function init() {
		var links = $$('a[data-type]');

		links.each(function () {
			this.addEventListener('click', function () {
				var type = this.getAttribute('data-type');
				jumpPage(type);
			}, false);
		});
	}

	function jumpPage(param) {
		mainView.loadPage('login.html?type=' + param);
	}

	return {
		init: init
	};
});

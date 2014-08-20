define(['views/guideView'], function (View) {

	var bindings = [{
		element: '.entrance a',
		event: 'click',
		handler: jumpPage
	}];

	function init() {
		View.render({
			bindings: bindings
		});

		autoHeightBlock();
	}

	function autoHeightBlock() {
		var viewHeight = document.documentElement.clientHeight;
		var calcHeight = viewHeight - 120;
		var length = $$('.entrance a').length;

		$$('.entrance a').css('height', calcHeight / length + 'px');
	}

	function jumpPage() {
		var param = $$(this).data('type');
		mainView.loadPage('login.html?type=' + param);
	}

	return {
		init: init
	};
});

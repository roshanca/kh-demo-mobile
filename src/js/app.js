require.config({
	baseUrl: 'js',
	paths: {
		Framework7: 'libs/framework7',
		mustache: 'libs/mustache',
		text: 'libs/text',
		templates: '../mustache',
		GS: 'services/globalService'
	},
	shim: {
		Framework7: {
			exports: 'Framework7'
		}
	}
});

require(['Framework7', 'router'], function (Framework7, Router) {
	window.$$ = Framework7.$;

	window.khApp = new Framework7({
		pushState: false,
		swipeBackPage: false,
		popupCloseByOutside: false,
		animateNavBackIcon: true,
		modalTitle: '系统消息',
		modalButtonOk: '确定',
		modalButtonCancel: '取消',
		smartSelectBackText: '完成',
		smartSelectBackTemplate: '<div class="left sliding"><a href="#" class="back link"><i class="icon icon-back-black"></i><span>{{backText}}</span></a></div>'
	});

	window.mainView = khApp.addView('#mainView', {
		dynamicNavbar: true,
		domCache: true
	});

	Router.init();
});

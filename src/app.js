require.config({
	paths: {
		Framework7: 'lib/framework7',
		handlebars: 'lib/handlebars',
		hbs: 'lib/hbs',
		text: 'lib/text',
		GS: 'js/services/globalService',
		utils: 'js/utils'
	},
	shim: {
		handlebars: {
			exports: 'Handlebars'
		},
		Framework7: {
			exports: 'Framework7'
		}
	}
});

define(['Framework7', 'js/router'], function (Framework7, Router) {
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

	window.mainView = khApp.addView('#mianView', {
		dynamicNavbar: true
	});

	Router.init();
});

define(['js/views/collectView', 'GS'], function (View, GS) {

	var bindings = [{
		element: '#logout',
		event: 'click',
		handler: GS.logout
	}, {
		element: '.next-button',
		event: 'click',
		handler: nextSubmit
	}, {
		element: '.agree-button',
		event: 'click',
		handler: doneCallback
	}, {
		element: '.upload-content',
		event: 'click',
		handler: uploadStart
	}];

	function init() {
		View.render({
			bindings: bindings
		});
	}

	function uploadStart() {
		khApp.modal({
			title: '请选择上传方式',
			buttons: [{
				text: '拍照',
				onClick: function () {
					khApp.alert('您选择了拍照');
				}
			}, {
				text: '浏览相册',
				onClick: function () {
					khApp.alert('您选择了浏览相册');
				}
			}, {
				text: '取消'
			}]
		});
	}

	function nextSubmit() {
		// khApp.modal({
		// 	title: '接受协议',
		// 	text: 'Vivamus feugiat diam velit. Maecenas aliquet egestas lacus, eget pretium massa mattis non. Donec volutpat euismod nisl in posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae',
		// 	buttons: [{
		// 		text: '拒绝'
		// 	}, {
		// 		text: '接受',
		// 		onClick: function () {
		// 			mainView.loadPage('profile.html');
		// 		}
		// 	}]
		// });
		khApp.popup('.popup');
	}

	function doneCallback() {
		mainView.loadPage('profile.html');
		khApp.closeModal();
	}

	return {
		init: init
	};
});

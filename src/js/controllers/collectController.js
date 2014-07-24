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
		element: '#cardFront',
		event: 'click',
		handler: uploadFront
	}, {
		element: '#cardBack',
		event: 'click',
		handler: uploadBack
	}];

	function init() {
		View.render({
			bindings: bindings
		});
	}

	function uploadFront() {
		uploadStart(0);
	}

	function uploadBack() {
		uploadStart(1);
	}

	/**
	 * 上传照片类型
	 * @param  {Number} type 0: 正面照, 1: 反面照, 2: 大头照
	 */
	function uploadStart(type) {
		var typeText = ['正面照', '反面照', '大头照'][type];

		khApp.modal({
			title: '上传' + typeText,
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

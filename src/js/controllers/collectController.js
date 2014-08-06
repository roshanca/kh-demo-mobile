define(['views/collectView', 'GS'], function (View, GS) {

	var bindings = [{
		element: '#logout',
		event: 'click',
		handler: GS.logout
	}, {
		element: '.collect-next-button',
		event: 'click',
		handler: nextSubmit
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

		// ajax 获取协议内容
		// reqProtocalContent();
	}

	//取协议内容
	// function reqProtocalContent() {
	// 	$$.ajax({
	// 		url: 'api/protocal.json',
	// 		type: 'GET',
	// 		timeout: 15000, //超时时间设置，单位毫秒
	// 		success: function (data) {
	// 			data = JSON.parse(data);
	// 			if (data.errorNo === 0) {
	// 				View.renderPopup({
	// 					model: data.model,
	// 					bindings: afterBindings
	// 				});
	// 			} else {
	// 				khApp.alert(data.errorInfo);
	// 			}
	// 		}
	// 	});
	// }

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
		mainView.loadPage('profile.html');
	}

	return {
		init: init
	};
});

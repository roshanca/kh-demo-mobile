define(['js/views/collectView', 'GS'], function (View, GS) {

	var bindings = [{
		element: '#logout',
		event: 'click',
		handler: GS.logout
	}, {
		element: '.collect-next',
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

	var afterBindings = [{
		element: '.agree-button',
		event: 'click',
		handler: doneCallback
	}];

	function init() {
		View.render({
			bindings: bindings
		});

		// ajax 请求cookie
		// reqCookie();

		// ajax 取协议内容
		reqProtocalContent();
	}

	function reqCookie() {
		khApp.showIndicator();
		$$.ajax({
			url: 'jsonCookie.do',
			type: 'GET',
			timeout: 15000, //超时时间设置，单位毫秒
			success: function (data) {
				khApp.hideIndicator();
				data = JSON.parse(data);
				if (data.errorNo === 0) {
					APP_collect.cookie = data.cookiestr;
					console.log(APP_collect.cookie);
				} else {
					khApp.alert(data.errorInfo);
				}
			},
			error: function() {
				khApp.hideIndicator();
	   			khApp.alert(MESSAGE_TIMEOUT);
	   		},
	   		timeout: function() {
	   			khApp.hideIndicator();
	   			khApp.alert(MESSAGE_TIMEOUT);
	   		}
		});
	}

	//取协议内容
	function reqProtocalContent() {
		$$.ajax({
			url: 'api/protocal.json',
			type: 'GET',
			timeout: 15000, //超时时间设置，单位毫秒
			success: function (data) {
				var data = eval('(' + data + ')');
				if (data.errorNo === 0) {
					View.renderPopup({
						model: data.model,
						bindings: afterBindings
					});
				} else {
					khApp.alert(data['errorInfo']);
				}
			},
			error: function(){
	   			khApp.alert(MESSAGE_TIMEOUT);
	   		},
	   		timeout: function(){
	   			khApp.alert(MESSAGE_TIMEOUT);
			}
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
					// khApp.alert('您选择了拍照');
					selectPic('c', type, APP_collect.cookie);
				}
			}, {
				text: '浏览相册',
				onClick: function () {
					khApp.alert('您选择了浏览相册');
					selectPic('p', type, APP_collect.cookie);
				}
			}, {
				text: '取消'
			}]
		});
	}

	/**
	 * 调用原生方法
	 * @param  {String} picSrc '0': 拍照, '1': 相册
	 * @param  {Number} picType 0: 正面照, 1: 反面照, 2: 大头照
	 * @param  {String} cookie
	 */
	function selectPic(picSrc, picType, cookie) {
		if (browser.versions.iPhone) { // iphone
			var picTypeStr = "front";
			if(picType === 1) picTypeStr = "back";
			window.location.href = "objc://takePictures/?" + picSrc + "?" + picTypeStr + "?" + cookie;
		} else {
			window.jtoJHandle.takePictures(picSrc,picType,cookie);
		}
	}

	/**
	* 解析图片 url
	* @param  {Object} json
	*/
	function parsePicUrl(json){
		var obj = eval('(' + json + ')');
		var errNo = obj.errorNo;
		if (errNo === 0) {
			//解析返回的图片地址url
			var picType = obj.picType;
			var url = obj.src;
			switch(picType){
				case 'front':
					View.showPhotoFront(url);
					break;
				case 'back':
					View.showPhotoBack(url);
					break;
				default:
			}
		} else {
			khApp.alert(obj.errorInfo);
		}
	}

	window.parsePicUrl = parsePicUrl;

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

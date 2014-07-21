define(['js/views/loginView', 'GS'], function (View, GS) {

	var bindings = [{
		element: '.login-submit',
		event: 'click',
		handler: loginSubmit
	}, {
		element: '.login-getcode',
		event: 'click',
		handler: getValidateCode
	}];

	function init() {
		View.init({
			bindings: bindings
		});
	}

	// function isEmail(str){
	// 	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
	// 	return reg.test(str);
	// }

	function isMobile(str) {
		var reg = /^[1][34578]\d{9}$/;
		return reg.test(str);
	}

	function isVaildCode(str) {
		var reg = /^\d{4}$/;
		return reg.test(str);
	}

	function resetBtn() {
		$$('.login-getcode').html('重新获取验证码');
		$$('.login-getcode').removeClass('disabled');

		if (timer) {
			clearTimeout(timer);
		}
	}

	function loginSubmit() {
		var valMobile = $$('.mobile').val();
		var valPassword = $$('.password').val();

		if (!isMobile(valMobile)) {
			khApp.alert('手机号码为空或有误，请重新输入');
		} else if (!timer) {
			khApp.alert('您还没有获取验证码，请先获取验证码');
		} else if (!isVaildCode(valPassword)) {
			khApp.alert('输入4位数字验证码');
		} else {
			khApp.showIndicator();

			$$.ajax({
				url: 'api/login.json',
				type: 'POST',
				data: {
					"mobile": valMobile,
					"validateCode": valPassword
				},
				success: function (data) {
					var data = JSON.parse(data);
					if (data.resMap.errorNo == '0') {
						GS.setCurrentUser(data.resMap['sid'], data.resMap['user']);
						mainView.loadPage(GS.getCurrentUser().node.current + '.html');
						khApp.hideIndicator();
					} else {
						resetBtn();
						khApp.hideIndicator();
						khApp.alert(data.resMap['errorInfo']);
					}
				}
			});
		}
	}

	function getValidateCode() {
		var valMobile = $$('.mobile').val();

		if (isMobile(valMobile)) {
			goVerify.call(this, valMobile);
		} else {
			khApp.alert('手机号码为空或有误，请重新输入');
		}
	}

	var timer = null;

	function goVerify(val) {
		var btn = this;
		var setTime = 60;
		var curTime = 0;
		var leftTime;

		$$.ajax({
			url: 'api/login.json',
			type: 'POST',
			data: {
				"mphone": val
			},
			success: function (data) {
				var data = JSON.parse(data);
				if (data.resMap.errorNo == '0') {
					$$('.password').focus();
					if (!$$(btn).hasClass('disabled')) {
						$$(btn).addClass('disabled');
					}
					countDown(setTime);

					function countDown(setTime) {
						if (timer) {
							clearTimeout(timer);
						}

						curTime++
						leftTime = setTime - curTime;
						$$(btn).html(leftTime + '秒后重新获取');

						if (leftTime > 0) {
							timer = setTimeout(function () {
								countDown(setTime);
							}, 1000);
						} else {
							resetBtn();
						}
					}
				} else {
					khApp.alert(data.resMap['errorInfo']);
					curTime = 0;
				}
			},
			timeout: function () {
				khApp.alert('服务器无响应'),
				curTime = 0;
			}
		});
	}

	return {
		init: init
	}
});

define(['views/loginView', 'GS', 'services/openTypeService'], function (View, GS, OTS) {

	var bindings = [{
		element: '.login-submit',
		event: 'click',
		handler: loginSubmit
	}, {
		element: '.login-getcode',
		event: 'click',
		handler: getValidateCode
	}];

	function init(query) {
		var type = query.type;
		setType(type);

		View.init({
			bindings: bindings
		});
	}

	function setType(type) {
		var typeData = OTS.getTypeData(type);
		View.changeType(typeData.title, typeData.explain);
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

	function resetCountdown() {
		if (timer) {
			clearTimeout(timer);
		}
		View.resetBtn();
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

		$$.ajax({
			url: 'api/verify.json',
			type: 'GET',
			data: {
				'mphone': val
			},
			success: function (data) {
				data = JSON.parse(data);
				if (data.errorNo === 0) {
					if (!$$(btn).hasClass('disabled')) {
						$$(btn).addClass('disabled');
					}

					countDown(setTime, curTime);
				} else {
					khApp.alert(data.errorInfo);
					resetCountdown();
				}
			},
			error: function () {
				khApp.alert('服务器出错');
				resetCountdown();
			},
			timeout: function () {
				khApp.alert('服务器无响应');
				resetCountdown();
			}
		});
	}

	function countDown(setTime, curTime) {
		var leftTime;

		if (timer) {
			clearTimeout(timer);
		}

		curTime++;
		leftTime = setTime - curTime;
		View.reRenderBtn(leftTime);

		if (leftTime > 0) {
			timer = setTimeout(function () {
				countDown(setTime, curTime);
			}, 1000);
		} else {
			View.resetBtn();
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
				type: 'GET',
				data: {
					'mobile': valMobile,
					'validateCode': valPassword
				},
				success: function (data) {
					data = JSON.parse(data);
					if (data.errorNo === 0) {
						View.inputBlur();
						GS.setCurrentUser(data.sid, data.user);
						mainView.loadPage('department.html');
						khApp.hideIndicator();
					} else {
						khApp.hideIndicator();
						khApp.alert(data.errorInfo);
					}
					resetCountdown();
				}
			});
		}
	}

	return {
		init: init
	};
});

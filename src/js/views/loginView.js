define(['utils'], function (Utils) {

	function init(params) {
		Utils.bindEvents(params.bindings)
	}

	function resetBtn() {
		$$('.login-getcode').html('获取验证码');
		$$('.login-getcode').removeClass('disabled');
	}

	function inputBlur() {
		$$('.mobile').blur();
		$$('.password').blur();
	}

	return {
		init: init,
		resetBtn: resetBtn,
		inputBlur: inputBlur
	}
});

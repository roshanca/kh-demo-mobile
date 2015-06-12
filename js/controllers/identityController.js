define(['views/identityView'], function (View) {
	var bindings = [{
		element: '.identity-next',
		event: 'click',
		handler: verifySubmit
	}];

	function init() {
		View.render({
			bindings: bindings
		});
	}

	function verifySubmit() {
		var code = $$('#identitycode').val();
		code = $$.trim(code);
		if (code.length === 0 || code.length < 18 ) {
			khApp.alert('请正确输入身份证号');
			return;
		}
		$$.ajax({
			type: 'POST',
			data: {'identitycode': code},
			url: '/identityVerify.do?rnd=' + new Date().getTime(),
			success: function(data){
				data = JSON.parse(data);
				if (data.errorNo === 1) { // 身份证一致
					mainView.loadPage('cert.html');
				} else {
					khApp.alert(data.errorInfo);
				}
			}
		});
	}

	return {
		init: init
	};
});

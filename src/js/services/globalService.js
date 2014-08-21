define(['services/openTypeService'], function (OTS) {
	var $CONFIG = null;
	init();

	function init() {
		if (!$CONFIG) {
			$CONFIG = {};
			$CONFIG.currentUser = {};

			if (localStorage.getItem('user')) {
				$CONFIG.currentUser = JSON.parse(localStorage.getItem('user'));
			}

			if (localStorage.getItem('sid')) {
				$CONFIG.currentUser.sid = localStorage.getItem('sid');
			}
		}
	}

	function getCurrentUser() {
		return $CONFIG.currentUser;
	}

	function getSid() {
		var m = $$.parseUrlQuery(window.location.href || '');
		return m.sid || localStorage.getItem('sid');
	}

	function setCurrentUser(sid, user) {
		$CONFIG.currentUser = user;
		localStorage.setItem('user', JSON.stringify(user));
		localStorage.setItem('sid', sid);
	}

	function removeCurrentUser() {
		$CONFIG.currentUser = {};
		localStorage.removeItem('user');
		localStorage.removeItem('sid');
	}

	function isLogin() {
		if ($CONFIG.currentUser && localStorage.getItem('sid')) {
			return true;
		} else {
			return false;
		}
	}

	var startPage = OTS.setStartPage();

	function logout() {
		khApp.confirm('您确定要退出登录吗？', function () {
			var currentPage = $$('.page-on-center').data('page');
			removeCurrentUser();
			khApp.closeModal();
			khApp.closePanel();
			if (currentPage === 'video') {
				clearTimeout(window.videoQueryTimer);
				console.log('quit video query successful');
			}
			mainView.loadPage(startPage);
		});
	}

	function checkUpdate() {
		khApp.modal({
			title: '当前版本',
			text: window.appParams.version,
			buttons: [{
				text: '检测更新',
				onClick: function () {
					khApp.alert('您当前的版本已经是最新');
				}
			}, {
				text: '返回'
			}]
		});
	}

	return {
		getSid: getSid,
		getCurrentUser: getCurrentUser,
		setCurrentUser: setCurrentUser,
		removeCurrentUser: removeCurrentUser,
		isLogin: isLogin,
		logout: logout,
		checkUpdate: checkUpdate,
		startPage: startPage
	};
});

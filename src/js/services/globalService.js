define([], function () {
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
				$CONFIG.currentUser['sid'] = localStorage.getItem('sid');
			}
		}
	}

	function getCurrentUser() {
		return $CONFIG.currentUser;
	}

	function getSid() {
		var m = $$.parseUrlQuery(window.location.href || '');
		return m['sid'] || localStorage.getItem('sid');
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

	/**
	 * 判断证书是否安装
	 * @return {Boolean} true: 已安装; false: 未安装
	 */
	function isCertInstalled() {
		return true;
	}

	/**
	 * 注销登出
	 * @return {void}
	 */
	function logout() {
		khApp.confirm('您确定要退出登录吗？', function () {
			removeCurrentUser();
			mainView.loadPage('login.html');
		});
	}

	return {
		getSid: getSid,
		getCurrentUser: getCurrentUser,
		setCurrentUser: setCurrentUser,
		removeCurrentUser: removeCurrentUser,
		isCertInstalled: isCertInstalled,
		isLogin: isLogin,
		logout: logout
	};
});

define(['views/auditView'], function (View) {

	var bindings = [{
		element: '.search-button',
		event: 'click',
		handler: popout
	}];

	function popout(){
		khApp.modal({
			title: '总资产为：<span class="dlg-highlight">765,443.23</span>元',
			text: '<p class="dlg-lowlight">已满足港股通开通条件</p>',
			buttons:[
				{
					text:'<span class="dlg-cancel-btn">暂不开通</span>',
					onClick: function(){
						
					}
				},
				{
					text:'<span class="dlg-confirm-btn">马上开通</span>',
					onClick:function(){

					}
				}
			]
		});
		/*khApp.modal({
			title: '总资产为：<span class="dlg-highlight">5,443.23</span>元',
			text: '<p class="dlg-lowlight">小于50万，暂不满足港股通开通条件。请下载交易客户端进行资产转入</p>',
			buttons:[
				{
					text:'<span class="dlg-confirm-btn">关闭</span>',
					onClick:function(){

					}
				}
			]
		})*/
		/*khApp.modal({
			title: '请在交易日查询',
			text: '<p class="dlg-lowlight">每周一到周五（法定节日除外）上午：9:30-11:30,下午：13:00-15:00</p>',
			buttons:[
				{
					text:'<span class="dlg-confirm-btn">关闭</span>',
					onClick:function(){

					}
				}
			]
		})*/
	}

	function init() {
		khApp.showIndicator();
		$$.ajax({
			url: 'api/audit.json',
			type: 'GET',
			success: function (data) {
				data = JSON.parse(data);
				if (data.errorNo === 0) {
					View.render({
						model: data.model,
						bindings: bindings
					});
					khApp.hideIndicator();
				}
			}
		});
	}

	return {
		init: init
	};
});

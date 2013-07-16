Ext.define('CookBook.model.UatProdInstall', {
	extend: 'Ext.data.Model',
	fields: [ 'uat_prod_install_id','project_id',
			'uat_date', 'uat_ccr', 'uat_maintenance_start', 'uat_conference_start', 'uat_conference_bridge', 'uat_node', 'uat_usan_ccr',
			'prod_date', 'prod_ccr', 'prod_maintenance_start', 'prod_conference_start', 'prod_conference_bridge', 'prod_node', 'prod_usan_ccr',
			'cpz_date', 'cpz_ccr', 'cpz_maintenance_start', 'cpz_conference_start', 'cpz_conference_bridge', 'cpz_node', 'cpz_usan_ccr',
			'wor_date', 'wor_ccr', 'wor_maintenance_start', 'wor_conference_start', 'wor_conference_bridge', 'wor_node', 'wor_usan_ccr',
			'scu_date', 'scu_ccr', 'scu_maintenance_start', 'scu_conference_start', 'scu_conference_bridge', 'scu_node', 'scu_usan_ccr',
			'comments', 'post_install_notification', 'maintenance_type', 'column1', 'column2', 'column3', 'column4', 'uat_install_date',
			'uat_install_node', 'uat_install_comments', 'prod_post_install_notification', 'prod_install_comments'  ]
});
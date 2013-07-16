Ext.define('CookBook.model.FileXferRequirement', {
	extend: 'Ext.data.Model',
	fields: [{name: 'file_xfer_req_id', type: 'int', useNull:true}, 'project_id', {name: 'new', type: 'boolean'}, 'name', 'ndm_file', 'uat_or_prod', 
		     'upload_or_download', 'protocol', 'timeframe', 'send_site', 'recv_site', 'usan_password', 'notes']
});
Ext.define('CookBook.model.TableRequirement', {
	extend: 'Ext.data.Model',
	fields: [{name: 'table_req_id', type: 'int', useNull:true}, 'project_id', {name: 'new', type: 'boolean'}, 'name', 'xls_csv_file', 'def_file', 'etm_file', 'table_type', 'uat_load', 'prod_load', 'notes']
});
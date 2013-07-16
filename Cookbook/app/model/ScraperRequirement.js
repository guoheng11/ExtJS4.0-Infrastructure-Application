Ext.define('CookBook.model.ScraperRequirement', {
	extend: 'Ext.data.Model',
	fields: [{name: 'scraper_req_id', type: 'int', useNull:true}, 'project_id', {name: 'new', type: 'boolean'}, 'name', 'exe_file', 'pdb_file', 'type', 'new_tran_type', 'notes']
});
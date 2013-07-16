Ext.define('CookBook.model.TTSFunctionalityRequirement', {
	extend: 'Ext.data.Model',
	fields: [{name: 'tts_functionality_req_id', type: 'int', useNull:true}, 'project_id', {name: 'new', type: 'boolean'}, 'call_volume', 'notes']
});
Ext.define('CookBook.model.SpeechRecognitionRequirement', {
	extend: 'Ext.data.Model',
	fields: [{name: 'speech_recognition_req_id', type: 'int', useNull:true}, 'project_id', {name: 'new', type: 'boolean'}, 'call_volume', 'language', 'notes']
});
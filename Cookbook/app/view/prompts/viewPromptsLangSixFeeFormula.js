Ext.define('CookBook.view.prompts.ViewPromptsLangSixFeeFormula', {
	extend: 'Ext.form.field.ComboBox',
	alias:  'widget.viewPromptsLangSixFeeFormula',

	store: {
		fields: ['language'],
		data: [
			{'language':'English'},
			{'language':'European'},
			{'language':'Middle Eastern/Asian'},
			{'language':'Custom'}
		]
	},

	//options
	fieldLabel:			'',
	value:              '',
	labelAlign:			'left',
	typeAhead:			false,
	displayField:		'formula',
	valueField:			'formula',
	allowBlank:			true,
	matchFieldWidth:	true,
	listConfig: {
		autoHeight: true
	},
	queryMode:			'local',

	name:				'promptsPromptsLangSixFeeFormula',
	
	listeners: {
		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: 'Select a formula'
			});
		}
	}
});
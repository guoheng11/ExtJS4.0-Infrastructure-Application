Ext.define('CookBook.view.prompts.ViewPromptsLangOneFeeFormula', {
	extend: 'Ext.form.field.ComboBox',
	alias:  'widget.viewPromptsLangOneFeeFormula',

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
	value:              'English',
	labelAlign:			'left',
	typeAhead:			false,
	displayField:		'language',
	valueField:			'language',
	allowBlank:			true,
	emptyText:          ' ',
	matchFieldWidth:	true,
	listConfig: {
		autoHeight: true,
		loadMask:     false
	},
	queryMode:			'local',

	style: {
		width: '150px',
		height: '30px',
		margin:  '0px',
		left:    '0px',
		top:   '655px'
	},

	name:				'viewPromptsLangOneFeeFormula',
	itemId:				'viewPromptsLangOneFeeFormula',
	
	listeners: {
		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: 'Select a formula'
			});
		},

		change: function () {
			this.up().doFeeCalculations();

			if (this.getValue() == 'Custom') {
				this.up().down('viewPromptsLangOneSetupFee').setReadOnly(false);
				this.up().down('viewPromptsLangOnePromptFee').setReadOnly(false);
				this.up().down('viewPromptsLangOneConversionSetupFee').setReadOnly(false);
				this.up().down('viewPromptsLangOneConversionPromptFee').setReadOnly(false);
				this.up().down('viewPromptsLangOneTranslationFeeMinimum').setReadOnly(false);
				this.up().down('viewPromptsLangOneTranslationFeePerWord').setReadOnly(false);
				this.up().down('viewPromptsLangOneTransferFee').setReadOnly(false);
				//this.up().down('viewPromptsLangOneCDFee').setReadOnly(false);
				this.up().down('viewPromptsLangOneTotalRecordingFee').setReadOnly(false);
			}
			else {
				this.up().down('viewPromptsLangOneSetupFee').setReadOnly(true);
				this.up().down('viewPromptsLangOnePromptFee').setReadOnly(true);
				this.up().down('viewPromptsLangOneConversionSetupFee').setReadOnly(true);
				this.up().down('viewPromptsLangOneConversionPromptFee').setReadOnly(true);
				this.up().down('viewPromptsLangOneTranslationFeeMinimum').setReadOnly(true);
				this.up().down('viewPromptsLangOneTranslationFeePerWord').setReadOnly(true);
				this.up().down('viewPromptsLangOneTransferFee').setReadOnly(true);
				//this.up().down('viewPromptsLangOneCDFee').setReadOnly(true);
				this.up().down('viewPromptsLangOneTotalRecordingFee').setReadOnly(true);
			}
		}
	}
});
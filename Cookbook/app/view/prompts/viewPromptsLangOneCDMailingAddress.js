Ext.define('CookBook.view.prompts.ViewPromptsLangOneCDMailingAddress', {
	extend: 'Ext.form.field.TextArea',
	alias:  'widget.viewPromptsLangOneCDMailingAddress',

	//options
	allowBlank: false,
	fieldLabel: '',
	value: 'Lois Maxim\nCitibank\n14000 Citi Cards Way\nJacksonville, FL 32258',
	labelAlign: 'left',
	//height: 85,  //(smm) 85 should be the default
	style: {
		width: '150px',
		height: '90px',
		margin: '0px',
		left:   '0px',
		top:   '412px'
	},


	name: 'viewPromptsLangOneCDMailingAddress',
	itemId: 'viewPromptsLangOneCDMailingAddress'
});
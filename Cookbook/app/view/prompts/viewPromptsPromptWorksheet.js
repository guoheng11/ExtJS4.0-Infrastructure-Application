Ext.define('CookBook.view.prompts.ViewPromptsPromptWorksheet', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsPromptWorksheet',

	//options
	allowBlank: true,
	fieldLabel: 'Prompt Folder',
	labelAlign: 'left',
	value: '',
	//html:  '<a href=file://///ops1/e_drive target=_blank> Click me! </a>',

	name: 'promptsPromptWorksheet',
	
	listeners: {
		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: 'Double-click to navigate to the project folder.  Else, enter the project folder manually'
			});
		}
	}
});
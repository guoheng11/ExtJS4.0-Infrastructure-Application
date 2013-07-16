Ext.define('CookBook.view.prompts.ViewPromptsLangOneCDRequired', {
	extend: 'Ext.form.field.Checkbox',
	alias:  'widget.viewPromptsLangOneCDRequired',	

	name: 'viewPromptsLangOneCDRequired',
	itemId: 'viewPromptsLangOneCDRequired',
	//padding: '3 0 0 0',	
	//height: 13,
	//width: 13,
	style: {
		margin: '0px',
		width:  '13px',
		left:   '0px',
		top:    '387px',
		height: '25px'
	},

	listeners: {
		blur: function () {
			this.up().doFeeCalculations();
		}/*,
		change: function () {
			this.up().doFeeCalculations();
			
			var hasCheck = 0;

			var CDFees = Ext.ComponentQuery.query('#viewPromptsLangOneCDRequired');
			for (i in CDFees) {
				if (CDFees[i].getValue()) {
					var field = Ext.ComponentQuery.query('viewPromptsGreatVoiceCDFee');
					field[0].setValue('$30.50');
					hasCheck = 1;
				}
			}

			if (hasCheck == 0) {
				var field = Ext.ComponentQuery.query('viewPromptsGreatVoiceCDFee');
				field[0].setValue('');
			}

			//do an automatic save for this page, since setValue doesn't seem to be firing off the change event.
			var form = Ext.ComponentQuery.query('#promptsForm')[0].updatePromptsMisc();
		}*/
	}
});
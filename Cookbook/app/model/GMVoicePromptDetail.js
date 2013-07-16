Ext.define('CookBook.model.GMVoicePromptDetail', {
	extend: 'Ext.data.Model',
	fields: [ 'language', 'prompts_recorded', 'prompts_billed', 'prompts_provided', 'min_fee', 'num_words',
			'order_type', 'recording_sessions', 'recording_studio', 'prompts_converted', 'conversion_sessions', 'prompts_digitized', 'fee_required',
			'cd_required', 'cd_mailing_address', 'prompt_format', 'converted_prompt_format', 'needs_approval', 'fee_formula', 'setup_fee', 
		    'recording1_fee', 'recording3_fee', 'translation_fee', 'delivery_fee', 'total_recording_fee' ]
});
Ext.define('CookBook.model.PromptDetail', {
	extend: 'Ext.data.Model',
	fields: [ 'language', 'prompts_recorded', 'prompts_billed', 'prompts_provided', 'min_fee', 'num_words',
			'order_type', 'recording_sessions', 'recording_studio', 'prompts_converted', 'conversion_sessions', 'prompts_digitized', 'fee_required',
			'cd_required', 'cd_mailing_address', 'prompt_format', 'converted_prompt_format', 'needs_approval', 'fee_formula', 'setup_fee', 'prompt_fee', 'conversion_setup_fee',
			'conversion_prompt_fee', 'fee_min', 'fee_per_word', 'transfer_fee', 'cd_fee', 'total_recording_fee' ]
});
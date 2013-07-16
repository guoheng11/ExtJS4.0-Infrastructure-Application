Ext.define('CookBook.model.EmailTemplate', {
    extend: 'Ext.data.Model',
    fields: ['email_template_id', 'user_name', 'template_body','template_to','template_cc','template_bcc', 'template_type','template_subject']
});
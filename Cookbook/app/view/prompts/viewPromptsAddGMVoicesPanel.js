Ext.define('CookBook.view.prompts.ViewPromptsAddGMVoicesPanel', {
    extend: 'Ext.button.Button',
    alias: 'widget.viewPromptsAddGMVoicesPanel',
    
    //icon: 'extjs/examples/restful/images/add.png',
    text: 'Add New Prompt Details Panel',
    width: 160,
    tooltip: 'Click to add a new language entry panel',
    
    handler: function(button){
        if (GLOBAL_readonly) {
            return;
        }
        if ((GLOBAL_permission == "PM") || (GLOBAL_permission == "OPM")) {
            var langPanel = Ext.create('widget.viewPromptsGMVoicesPanels'); //('viewPromptsLanguagePanel'); 
            var language = langPanel.down('#viewPromptsLangTwoLanguage');
            var promptsRecorded = langPanel.down('#viewPromptsLangTwoPromptsToBeRecorded');
            var promptsBilled = langPanel.down('#viewPromptsLangTwoPromptsToBeBilled');
            var promptsProvided = langPanel.down('#viewPromptsLangTwoPromptsProvidedByCustomer');
            var minFee = langPanel.down('#viewPromptsLangTwoMinimumFee');
            var numWords = langPanel.down('#viewPromptsLangTwoNumWords');
            var orderType = langPanel.down('#viewPromptsLangTwoOrderType');
            var recordingSessions = langPanel.down('#viewPromptsLangTwoRecordingSessions');
            var recordingStudio = langPanel.down('#viewPromptsLangTwoRecordingStudio');
            var promptsConverted = langPanel.down('#viewPromptsLangTwoPromptsToBeConverted');
            var conversionSessions = langPanel.down('#viewPromptsLangTwoConversionSessions');
            var promptsDigitized = langPanel.down('#viewPromptsLangTwoPromptsToBeDigitized');
            var feeRequired = langPanel.down('#viewPromptsLangTwoTransferFeeRequired');
            var cdRequired = langPanel.down('#viewPromptsLangTwoCDRequired');
            var cdMailingAddress = langPanel.down('#viewPromptsLangTwoCDMailingAddress');
            var promptFormat = langPanel.down('#viewPromptsLangTwoPromptFormat');
            var needsApproval = langPanel.down('#viewPromptsLangTwoTranslationNeedsApproval');
            var setupFee = langPanel.down('#viewPromptsLangTwoSetupFee');
            var recording1Fee = langPanel.down('#viewPromptsLangTwoPromptFee');
            var recording3Fee = langPanel.down('#viewPromptsLangTwoConversionSetupFee');
            var translationFee = langPanel.down('#viewPromptsLangTwoConversionPromptFee');
            var deliveryFee = langPanel.down('#viewPromptsLangTwoTranslationFeeMinimum');
            var totalRecordingFee = langPanel.down('#viewPromptsLangTwoTotalRecordingFee');
            var convertedPromptFormat = langPanel.down('#viewPromptsLangTwoConvertedPromptFormat');
            
            language.on('change', language.up('panel').updatePromptDetails, language, {
                buffer: 2000
            });
            promptsRecorded.on('change', promptsRecorded.up('panel').updatePromptDetails, promptsRecorded, {
                buffer: 2000
            });
            promptsBilled.on('change', promptsBilled.up('panel').updatePromptDetails, promptsBilled, {
                buffer: 2000
            });
            promptsProvided.on('change', promptsProvided.up('panel').updatePromptDetails, promptsProvided, {
                buffer: 2000
            });
            minFee.on('change', minFee.up('panel').updatePromptDetails, minFee, {
                buffer: 2000
            });
            numWords.on('change', numWords.up('panel').updatePromptDetails, numWords, {
                buffer: 2000
            });
            orderType.on('change', orderType.up('panel').updatePromptDetails, orderType, {
                buffer: 2000
            });
            recordingSessions.on('change', recordingSessions.up('panel').updatePromptDetails, recordingSessions, {
                buffer: 2000
            });
            recordingStudio.on('change', recordingStudio.up('panel').updatePromptDetails, recordingStudio, {
                buffer: 2000
            });
            promptsConverted.on('change', promptsConverted.up('panel').updatePromptDetails, promptsConverted, {
                buffer: 2000
            });
            conversionSessions.on('change', conversionSessions.up('panel').updatePromptDetails, conversionSessions, {
                buffer: 2000
            });
            promptsDigitized.on('change', promptsDigitized.up('panel').updatePromptDetails, promptsDigitized, {
                buffer: 2000
            });
            feeRequired.on('change', feeRequired.up('panel').updatePromptDetails, feeRequired, {
                buffer: 2000
            });
            cdRequired.on('change', cdRequired.up('panel').updatePromptDetails, cdRequired, {
                buffer: 2000
            });
            cdMailingAddress.on('change', cdMailingAddress.up('panel').updatePromptDetails, cdMailingAddress, {
                buffer: 2000
            });
            promptFormat.on('change', promptFormat.up('panel').updatePromptDetails, promptFormat, {
                buffer: 2000
            });
            needsApproval.on('change', needsApproval.up('panel').updatePromptDetails, needsApproval, {
                buffer: 2000
            });
            setupFee.on('change', setupFee.up('panel').updatePromptDetails, setupFee, {
                buffer: 2000
            });
            recording1Fee.on('change', recording1Fee.up('panel').updatePromptDetails, recording1Fee, {
                buffer: 2000
            });
            recording3Fee.on('change', recording3Fee.up('panel').updatePromptDetails, recording3Fee, {
                buffer: 2000
            });
            translationFee.on('change', translationFee.up('panel').updatePromptDetails, translationFee, {
                buffer: 2000
            });
            deliveryFee.on('change', deliveryFee.up('panel').updatePromptDetails, deliveryFee, {
                buffer: 2000
            });
            totalRecordingFee.on('change', totalRecordingFee.up('panel').updatePromptDetails, totalRecordingFee, {
                buffer: 2000
            });
            convertedPromptFormat.on('change', convertedPromptFormat.up('panel').updatePromptDetails, convertedPromptFormat, {
                buffer: 2000
            });
            
            
            
            var targetPanel = button.up('#gmVoicesPanel');
            targetPanel.add(langPanel);
        }
    }
});

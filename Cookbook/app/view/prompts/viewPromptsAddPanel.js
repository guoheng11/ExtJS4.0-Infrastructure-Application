Ext.define('CookBook.view.prompts.ViewPromptsAddPanel', {
    extend: 'Ext.button.Button',
    alias: 'widget.viewPromptsAddPanel',
    
    //icon: 'extjs/examples/restful/images/add.png',
    text: 'Add New Prompt Details Panel',
    width: 160,
    tooltip: 'Click to add a new language entry panel',
    
    handler: function(button){
        //don't add anything if readOnly (or a dev or ops)
        if (GLOBAL_readonly) {
            return;
        }
        if ((GLOBAL_permission == "PM") || (GLOBAL_permission == "OPM")) {
            var langPanel = Ext.create('widget.viewPromptsPanels'); //('viewPromptsLanguagePanel'); 
            var language = langPanel.down('#viewPromptsLangOneLanguage');
            var promptsRecorded = langPanel.down('#viewPromptsLangOnePromptsToBeRecorded');
            var promptsBilled = langPanel.down('#viewPromptsLangOnePromptsToBeBilled');
            var promptsProvided = langPanel.down('#viewPromptsLangOnePromptsProvidedByCustomer');
            var minFee = langPanel.down('#viewPromptsLangOneMinimumFee');
            var numWords = langPanel.down('#viewPromptsLangOneNumWords');
            var orderType = langPanel.down('#viewPromptsLangOneOrderType');
            var recordingSessions = langPanel.down('#viewPromptsLangOneRecordingSessions');
            var recordingStudio = langPanel.down('#viewPromptsLangOneRecordingStudio');
            var promptsConverted = langPanel.down('#viewPromptsLangOnePromptsToBeConverted');
            var conversionSessions = langPanel.down('#viewPromptsLangOneConversionSessions');
            var promptsDigitized = langPanel.down('#viewPromptsLangOnePromptsToBeDigitized');
            var feeRequired = langPanel.down('#viewPromptsLangOneTransferFeeRequired');
            var cdRequired = langPanel.down('#viewPromptsLangOneCDRequired');
            var cdMailingAddress = langPanel.down('#viewPromptsLangOneCDMailingAddress');
            var promptFormat = langPanel.down('#viewPromptsLangOnePromptFormat');
            var needsApproval = langPanel.down('#viewPromptsLangOneTranslationNeedsApproval');
            var feeFormula = langPanel.down('#viewPromptsLangOneFeeFormula');
            var setupFee = langPanel.down('#viewPromptsLangOneSetupFee');
            var promptFee = langPanel.down('#viewPromptsLangOnePromptFee');
            var conversionSetupFee = langPanel.down('#viewPromptsLangOneConversionSetupFee');
            var conversionPromptFee = langPanel.down('#viewPromptsLangOneConversionPromptFee');
            var feeMin = langPanel.down('#viewPromptsLangOneTranslationFeeMinimum');
            var feePerWord = langPanel.down('#viewPromptsLangOneTranslationFeePerWord');
            var transferFee = langPanel.down('#viewPromptsLangOneTransferFee');
            //var cdFee = langPanel.down('#viewPromptsLangOneCDFee');
            var totalRecordingFee = langPanel.down('#viewPromptsLangOneTotalRecordingFee');
            var convertedPromptFormat = langPanel.down('#viewPromptsLangOneConvertedPromptFormat');
            
            language.on('change', langPanel.updatePromptDetails, language, {
                buffer: 2000
            });
            promptsRecorded.on('change', langPanel.promptsRecordedChange, promptsRecorded); //, {buffer: 2000});
            promptsBilled.on('change', langPanel.updatePromptDetails, promptsBilled, {
                buffer: 2000
            });
            promptsProvided.on('change', langPanel.updatePromptDetails, promptsProvided, {
                buffer: 2000
            });
            minFee.on('change', langPanel.updatePromptDetails, minFee, {
                buffer: 2000
            });
            numWords.on('change', langPanel.updatePromptDetails, numWords, {
                buffer: 2000
            });
            orderType.on('change', langPanel.updatePromptDetails, orderType, {
                buffer: 2000
            });
            recordingSessions.on('change', langPanel.updatePromptDetails, recordingSessions, {
                buffer: 2000
            });
            recordingStudio.on('change', langPanel.updatePromptDetails, recordingStudio, {
                buffer: 2000
            });
            promptsConverted.on('change', langPanel.updatePromptDetails, promptsConverted, {
                buffer: 2000
            });
            conversionSessions.on('change', langPanel.updatePromptDetails, conversionSessions, {
                buffer: 2000
            });
            promptsDigitized.on('change', langPanel.updatePromptDetails, promptsDigitized, {
                buffer: 2000
            });
            feeRequired.on('change', langPanel.updatePromptDetails, feeRequired, {
                buffer: 2000
            });
            cdRequired.on('change', langPanel.cdRequiredChange, cdRequired); //{buffer: 2000});
            cdMailingAddress.on('change', langPanel.updatePromptDetails, cdMailingAddress, {
                buffer: 2000
            });
            promptFormat.on('change', langPanel.updatePromptDetails, promptFormat, {
                buffer: 2000
            });
            needsApproval.on('change', langPanel.updatePromptDetails, needsApproval, {
                buffer: 2000
            });
            feeFormula.on('change', langPanel.updatePromptDetails, feeFormula, {
                buffer: 2000
            });
            setupFee.on('change', langPanel.updatePromptDetails, setupFee, {
                buffer: 2000
            });
            promptFee.on('change', langPanel.updatePromptDetails, promptFee, {
                buffer: 2000
            });
            conversionSetupFee.on('change', langPanel.updatePromptDetails, conversionSetupFee, {
                buffer: 2000
            });
            conversionPromptFee.on('change', langPanel.updatePromptDetails, conversionPromptFee, {
                buffer: 2000
            });
            feeMin.on('change', langPanel.updatePromptDetails, feeMin, {
                buffer: 2000
            });
            feePerWord.on('change', langPanel.updatePromptDetails, feePerWord, {
                buffer: 2000
            });
            transferFee.on('change', langPanel.updatePromptDetails, transferFee, {
                buffer: 2000
            });
            //cdFee.on('change', langPanel.updatePromptDetails, cdFee, {buffer: 2000});
            totalRecordingFee.on('change', langPanel.updatePromptDetails, totalRecordingFee, {
                buffer: 2000
            });
            convertedPromptFormat.on('change', langPanel.updatePromptDetails, convertedPromptFormat, {
                buffer: 2000
            });
            
            
            
            var targetPanel = button.up('#blahblah');
            targetPanel.add(langPanel);
        }
    }
});

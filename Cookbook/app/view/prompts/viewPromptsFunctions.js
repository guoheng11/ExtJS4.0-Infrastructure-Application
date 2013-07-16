Ext.define('CookBook.view.prompts.ViewPromptsFunctions', {});

Ext.define('viewPromptsLanguagePanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.viewPromptsPanels',
    
    
    name: 'promptsCompleteMNums',
    //itemId: 'promptsLanguagePanel',
    
    
    width: 160,
    height: 1010,
    frame: true,
    
    
    
    layout: {
        type: 'vbox',
        align: 'left'
    },
    
    listeners: {
        change: {
            fn: this.updatePromptDetails,
            buffer: 2000
        }
    },
    
    
    items: [{
        xtype: 'button',
        icon: 'extjs/examples/restful/images/delete.png',
        tooltip: 'Click to delete this panel',
        margin: '0 0 10 65',
        
        listeners: {
            click: function(){
                if (GLOBAL_readonly) {
                    return;
                }
                if ((GLOBAL_permission == "PM") || (GLOBAL_permission == "OPM")) {
                
                    this.up('panel').deletePromptDetails();
                    this.ownerCt.destroy();
                }
            }
        }
    }, {
        xtype: 'viewPromptsLangOneLanguage'
    }, {
        xtype: 'viewPromptsLangOnePromptsToBeRecorded'
    }, {
        xtype: 'viewPromptsLangOnePromptsToBeBilled'
    }, {
        xtype: 'viewPromptsLangOnePromptsProvidedByCustomer'
    }, {
        xtype: 'viewPromptsLangOneMinimumFee'
    }, {
        xtype: 'viewPromptsLangOneNumWords'
    }, {
        xtype: 'viewPromptsLangOneOrderType'
    }, {
        xtype: 'viewPromptsLangOneRecordingSessions'
    }, {
        xtype: 'viewPromptsLangOneRecordingStudio' //this is now Voice Talent
    }, {
        xtype: 'viewPromptsLangOnePromptsToBeConverted'
    }, {
        xtype: 'viewPromptsLangOneConversionSessions'
    }, {
        xtype: 'viewPromptsLangOnePromptsToBeDigitized'
    }, {
        xtype: 'viewPromptsLangOneTransferFeeRequired'
    }, {
        xtype: 'viewPromptsLangOneCDRequired'
    }, {
        xtype: 'viewPromptsLangOneCDMailingAddress'
    }, {
        xtype: 'viewPromptsLangOnePromptFormat'
    }, {
        xtype: 'viewPromptsLangOneConvertedPromptFormat'
    }, {
        xtype: 'viewPromptsLangOneTranslationNeedsApproval'
    }, {
        xtype: 'label',
        height: 72
    }, {
        xtype: 'viewPromptsLangOneFeeFormula'
    }, {
        xtype: 'viewPromptsLangOneSetupFee'
    }, {
        xtype: 'viewPromptsLangOnePromptFee'
    }, {
        xtype: 'viewPromptsLangOneConversionSetupFee'
    }, {
        xtype: 'viewPromptsLangOneConversionPromptFee'
    }, {
        xtype: 'viewPromptsLangOneTranslationFeeMinimum'
    }, {
        xtype: 'viewPromptsLangOneTranslationFeePerWord'
    }, {
        xtype: 'viewPromptsLangOneTransferFee'
    },    /*
     {
     xtype:		'viewPromptsLangOneCDFee'
     },*/
    {
        xtype: 'viewPromptsLangOneTotalRecordingFee'
    }],
    
    testWoot: function(){
        console.log("Wooooot????");
    },
    
    updatePromptDetails: function(){
        if (GLOBAL_readonly) {
            return;
        }
        if ((GLOBAL_permission == "PM") || (GLOBAL_permission == "OPM")) {
        
            var doUpdate = 0;
            var currentLanguage = field.up("panel").down("viewPromptsLangOneLanguage").getValue();
            var languages = Ext.ComponentQuery.query('#viewPromptsLangOneLanguage');
            for (i = 0; i < languages.length; i++) {
                if (currentLanguage == languages[i].getValue()) {
                    doUpdate++;
                }
            }
            
            if (doUpdate != 1) {
                //field.up("form").updatePromptDetails();
                return;
            }
            
            
            var jsonBlob = Ext.JSON.encode(this.up("panel").getForm().getValues(false, false, false));
            
            Ext.Ajax.request({
                url: 'UpdatePromptsPage.ashx',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    project_id: GLOBAL_currentProjectOpenProjectID
                },
                jsonData: jsonBlob,
                success: function(){
                    console.log('yay');
                }
            });
        }
    },
    
    deletePromptDetails: function(){
        if (GLOBAL_readonly) {
            return;
        }
        if ((GLOBAL_permission == "PM") || (GLOBAL_permission == "OPM")) {
        
            var jsonBlob = Ext.JSON.encode(this.getForm().getValues(false, false, false));
            
            Ext.Ajax.request({
                url: 'DeletePromptDetails.ashx',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    project_id: GLOBAL_currentProjectOpenProjectID
                },
                jsonData: jsonBlob,
                success: function(){
                    console.log('yay');
                }
            });
        }
    },
    
    doFeeCalculations: function(changeDigitized){
        if (GLOBAL_readonly) {
            return;
        }
        if ((GLOBAL_permission == "PM") || (GLOBAL_permission == "OPM")) {
        
            var providedPrompts = parseInt(this.down('viewPromptsLangOnePromptsProvidedByCustomer').getValue());
            var recordedPrompts = parseInt(this.down('viewPromptsLangOnePromptsToBeRecorded').getValue());
            var promptsBilled = parseInt(this.down('viewPromptsLangOnePromptsToBeBilled').getValue());
            var promptsDigitized = this.down('viewPromptsLangOnePromptsToBeDigitized');
            
            //if promptsDigitized has a value, then don't auto-populate it because we're assuming it has been edited by the user
            //if (!(promptsDigitized.getValue().length > 0) || promptsDigitized.getValue() == '0') {
            if (changeDigitized) {
                promptsDigitized.setValue(recordedPrompts); //(smm) ... providedPrompts + recordedPrompts);	
            }
            
            //used field values
            var formula = this.down('viewPromptsLangOneFeeFormula').getValue();
            var orderType = this.down('viewPromptsLangOneOrderType').getValue();
            
            if (!(formula && orderType)) {
                alert('You must fill out a formula and order type');
                return;
            }
            
            //don't perform calculations if the formula is Custom
            if (formula == 'Custom') {
                return;
            }
            
            var recordingSessions = parseInt(this.down('viewPromptsLangOneRecordingSessions').getValue());
            var translationMinFee = this.down('viewPromptsLangOneMinimumFee').getValue();
            var translationNumWords = parseInt(this.down('viewPromptsLangOneNumWords').getValue());
            var conversionSessions = parseInt(this.down('viewPromptsLangOneConversionSessions').getValue());
            var promptsToConvert = parseInt(this.down('viewPromptsLangOnePromptsToBeConverted').getValue());
            //var cdRequired = this.down('viewPromptsLangOneCDRequired').getValue();
            
            //alert('providedPrompts: ' + providedPrompts + '\nrecordedPrompts: ' + recordedPrompts + '\nrecordingSessions: ' + recordingSessions + '\npromptsBilled: ' + promptsBilled + '\ntranslationMinFee: ' + translationMinFee + '\ntranslationNumWords: ' + translationNumWords + '\nconversionSessions: ' + conversionSessions + '\npromptsToConvert: ' + promptsToConvert + '\ncdRequired: ' + cdRequired);
            
            //set fields  (TB means Text Box)
            var setupFeeTB = this.down('viewPromptsLangOneSetupFee');
            var promptFeeTB = this.down('viewPromptsLangOnePromptFee');
            var conversionSetupFeeTB = this.down('viewPromptsLangOneConversionSetupFee');
            var conversionPromptFeeTB = this.down('viewPromptsLangOneConversionPromptFee');
            var translationFeeMinimumTB = this.down('viewPromptsLangOneTranslationFeeMinimum');
            var translationFeePerWordTB = this.down('viewPromptsLangOneTranslationFeePerWord');
            var transferFeeTB = this.down('viewPromptsLangOneTransferFee');
            //var cdFeeTB = this.down('viewPromptsLangOneCDFee');
            var totalRecordingFeeTB = this.down('viewPromptsLangOneTotalRecordingFee');
            
            var setupFee = 0;
            var promptFee = 0;
            var translationFeePerWord = 0;
            var translationFeeMinimum = 0;
            var conversionSetupFee = 0;
            var conversionPromptFee = 0;
            var transferFee = 0;
            //var cdFee = 0;
            var totalRecordingFee = 0;
            
            switch (orderType) {
                case 'Standard':{
                    if (formula == 'English') {
                        setupFee = 325 * recordingSessions;
                        promptFee = 6 * promptsBilled;
                    }
                    else {
                        setupFee = 425 * recordingSessions;
                        promptFee = 10.5 * promptsBilled;
                    }
                    
                    if (translationMinFee) {
                        translationFeeMinimum = 150;
					}

					if (formula == "Middle Eastern/Asian") {
						translationFeePerWord = 0.48 * translationNumWords;
					}
					else 
						translationFeePerWord = 0.38 * translationNumWords;

                    break;
                }
                case 'Next Business Day':{
                    if (formula == "English") {
                        setupFee = 410 * recordingSessions;
                        promptFee = 7.5 * promptsBilled;
                    }
                    else {
                        setupFee = 531.26 * recordingSessions;
                        promptFee = 13.25 * promptsBilled;
                    }
                    
                    if (translationMinFee) {
						translationFeeMinimum = 150;
					}
                    
					translationFeePerWord = 0.4 * translationNumWords;
                    break;
                }
                case 'Same Day':{
                    if (formula == "English") {
                        setupFee = 490 * recordingSessions;
                        promptFee = 9 * promptsBilled;
                    }
                    else {
                        setupFee = 637 * recordingSessions;
                        promptFee = 15.75 * promptsBilled;
                    }
                    if (translationMinFee) {
                        translationFeeMinimum = 225;
					}
                    
					translationFeePerWord = 0.57 * translationNumWords;
                    break;
                }
                default:
                    alert('Order Type must be Standard, Next Business Day, or Same Day');
            } //end switch
            conversionSetupFee = 50 * conversionSessions;
            conversionPromptFee = 1 * promptsToConvert;
            
            transferFee = 20 * (recordingSessions + conversionSessions);
            
            /*if(cdRequired) {
             //cdFee = 30.5 * recordingSessions;
             Ext.ComponentQuery.query('viewPromptsGreatVoiceCDFee')[0].setValue('$30.50');
             }*/
            setupFeeTB.setValue(Ext.util.Format.usMoney(setupFee));
            promptFeeTB.setValue(Ext.util.Format.usMoney(promptFee));
            conversionSetupFeeTB.setValue(Ext.util.Format.usMoney(conversionSetupFee));
            conversionPromptFeeTB.setValue(Ext.util.Format.usMoney(conversionPromptFee));
            translationFeeMinimumTB.setValue(Ext.util.Format.usMoney(translationFeeMinimum));
            translationFeePerWordTB.setValue(Ext.util.Format.usMoney(translationFeePerWord));
            transferFeeTB.setValue(Ext.util.Format.usMoney(transferFee));
            //cdFeeTB.setValue(Ext.util.Format.usMoney(cdFee));
            
            totalRecordingFeeTB.setValue(Ext.util.Format.usMoney(setupFee + promptFee + conversionSetupFee + conversionPromptFee + Math.max(translationFeeMinimum, translationFeePerWord) + transferFee)); //(smm) cdFee removed
            console.log(Ext.util.Format.usMoney(setupFee + promptFee + conversionSetupFee + conversionPromptFee + Math.max(translationFeeMinimum, translationFeePerWord) + transferFee)); //(smm) cdFee removed
            //calculate the total for all languages
            var allTotals = Ext.ComponentQuery.query('#viewPromptsLangOneTotalRecordingFee');
            var total = 0;
            for (i in allTotals) {
                var val = parseFloat(allTotals[i].getValue().replace("$", "").replace(",", ""));
                console.log(val + "|" + allTotals[i].getValue());
                
                if (!isNaN(val)) {
                    total = total + val;
                }
            }
            
            //now check for CDFee
            var cdFeeTB = Ext.ComponentQuery.query('viewPromptsGreatVoiceCDFee');
            if (cdFeeTB[0].getValue().length > 0) {
                total = total + parseFloat(cdFeeTB[0].getValue().substring(1));
                console.log("CD Fee accounted for:  " + total);
            }
            
            Ext.ComponentQuery.query('viewPromptsGreatVoiceTotalFee')[0].setValue(Ext.util.Format.usMoney(total));
        }
    },
    
    cdRequiredChange: function(){
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
        
        this.up().doFeeCalculations();
        
        //do an automatic save for this page, since setValue doesn't seem to be firing off the change event.
        var form = Ext.ComponentQuery.query('#promptsForm')[0].updatePromptsMisc();
        
        //this.updatePromptDetails();
        if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "OPM"))) {
            return;
        }
        
        
        var doUpdate = 0;
        var currentLanguage = this.up("panel").down("viewPromptsLangOneLanguage").getValue();
        var languages = Ext.ComponentQuery.query('#viewPromptsLangOneLanguage');
        for (i = 0; i < languages.length; i++) {
            if (currentLanguage == languages[i].getValue()) {
                doUpdate++;
            }
        }
        
        if (doUpdate != 1) {
            //field.up("form").updatePromptDetails();
            return;
        }
        
        
        var jsonBlob = Ext.JSON.encode(this.up("panel").getForm().getValues(false, false, false));
        
        Ext.Ajax.request({
            url: 'UpdatePromptsPage.ashx',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                project_id: GLOBAL_currentProjectOpenProjectID
            },
            jsonData: jsonBlob,
            success: function(){
                console.log('yay');
            }
        });
    },
    
    promptsRecordedChange: function(){
        this.up().doFeeCalculations(true);
    }
    
    
});




Ext.define('viewPromptsGMVoicesLanguagePanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.viewPromptsGMVoicesPanels',
    
    
    name: 'promptsGMVoicesPanels',
    //itemId: 'promptsLanguagePanel',
    
    
    width: 160,
    height: 1010,
    frame: true,
    
    
    
    layout: {
        type: 'vbox',
        align: 'left'
    },
    
    listeners: {
        change: {
            fn: this.updatePromptDetails,
            buffer: 2000
        }
    },
    
    
    items: [{
        xtype: 'button',
        icon: 'extjs/examples/restful/images/delete.png',
        tooltip: 'Click to delete this panel',
        height: 23,
        margin: '0 0 0 64',
        listeners: {
            click: function(){
                //don't update anything if readOnly (or a dev or ops)
                if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "OPM"))) {
                    return;
                }
                
                this.up('panel').deletePromptDetails();
                this.ownerCt.destroy();
            }
        }
    }, {
        xtype: 'label',
        height: 24
    }, {
        xtype: 'viewPromptsLangTwoLanguage',
        height: 20
    }, {
        xtype: 'viewPromptsLangTwoPromptsToBeRecorded',
        height: 20
    }, {
        xtype: 'viewPromptsLangTwoPromptsToBeBilled',
        height: 20
    }, {
        xtype: 'viewPromptsLangTwoPromptsProvidedByCustomer',
        height: 20
    }, {
        xtype: 'viewPromptsLangTwoMinimumFee',
        height: 20
    }, {
        xtype: 'viewPromptsLangTwoNumWords',
        height: 20
    }, {
        xtype: 'viewPromptsLangTwoOrderType',
        height: 20
    }, {
        xtype: 'viewPromptsLangTwoRecordingSessions',
        height: 20
    }, {
        xtype: 'viewPromptsLangTwoRecordingStudio', //this is now Voice Talent
        height: 20
    }, {
        xtype: 'viewPromptsLangTwoPromptsToBeConverted',
        height: 20
    }, {
        xtype: 'viewPromptsLangTwoConversionSessions',
        height: 20
    }, {
        xtype: 'viewPromptsLangTwoPromptsToBeDigitized',
        height: 20
    }, {
        xtype: 'viewPromptsLangTwoTransferFeeRequired',
        height: 20
    }, {
        xtype: 'viewPromptsLangTwoCDRequired',
        height: 20
    }, {
        xtype: 'viewPromptsLangTwoCDMailingAddress',
        height: 85
    }, {
        xtype: 'viewPromptsLangTwoPromptFormat',
        height: 20
    }, {
        xtype: 'viewPromptsLangTwoConvertedPromptFormat',
        height: 20
    }, {
        xtype: 'viewPromptsLangTwoTranslationNeedsApproval',
        height: 95
    }, {
        xtype: 'viewPromptsLangTwoSetupFee',
        height: 20
    }, {
        xtype: 'viewPromptsLangTwoPromptFee',
        height: 20
    }, {
        xtype: 'viewPromptsLangTwoConversionSetupFee',
        height: 20
    }, {
        xtype: 'viewPromptsLangTwoConversionPromptFee',
        height: 20
    }, {
        xtype: 'viewPromptsLangTwoTranslationFeeMinimum',
        height: 20
    },    /*
     {
     xtype:		'viewPromptsLangTwoCDFee'
     },*/
    {
        xtype: 'viewPromptsLangTwoTotalRecordingFee'
    }],
    
    doFeeCalculations: function(){
        var setupFee = parseFloat(this.down('viewPromptsLangTwoSetupFee').getValue().replace("$", ""));
        var recording1 = parseFloat(this.down('viewPromptsLangTwoPromptFee').getValue().replace("$", ""));
        var recording3 = parseFloat(this.down('viewPromptsLangTwoConversionSetupFee').getValue().replace("$", ""));
        var translation = parseFloat(this.down('viewPromptsLangTwoConversionPromptFee').getValue().replace("$", ""));
        var delivery = parseFloat(this.down('viewPromptsLangTwoTranslationFeeMinimum').getValue().replace("$", ""));
        var totalRecordingFeeTB = this.down('viewPromptsLangTwoTotalRecordingFee');
        
        if (isNaN(setupFee)) {
            setupFee = 0;
        }
        if (isNaN(recording1)) {
            recording1 = 0;
        }
        if (isNaN(recording3)) {
            recording3 = 0;
        }
        if (isNaN(translation)) {
            translation = 0;
        }
        if (isNaN(delivery)) {
            delivery = 0;
        }
        
        console.log(setupFee + ', ' + recording1 + ', ' + recording3 + ', ' + translation + ', ' + delivery);
        
        totalRecordingFeeTB.setValue(Ext.util.Format.usMoney(setupFee + recording1 + recording3 + translation + delivery));
        
        //now update the grand total from all the other language panels
        var total = 0;
        var totals = Ext.ComponentQuery.query('#viewPromptsLangTwoTotalRecordingFee');
        for (i in totals) {
            var val = parseFloat(totals[i].getValue().replace("$", "").replace(",", ""));
            
            if (!isNaN(val)) {
                total = total + val;
            }
        }
        
        Ext.ComponentQuery.query('viewPromptsGMVoicesTotalFee')[0].setValue(Ext.util.Format.usMoney(total));
    },
    
    updatePromptDetails: function(){
        //don't update anything if readOnly (or a dev or ops)
        if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "OPM"))) {
            return;
        }
        
        var doUpdate = 0;
        var currentLanguage = field.up("panel").down("viewPromptsLangTwoLanguage").getValue();
        var languages = Ext.ComponentQuery.query('#viewPromptsLangTwoLanguage');
        for (i = 0; i < languages.length; i++) {
            if (currentLanguage == languages[i].getValue()) {
                doUpdate++;
            }
        }
        
        if (doUpdate != 1) {
            //field.up("form").updatePromptDetails();
            return;
        }
        
        
        var jsonBlob = Ext.JSON.encode(this.up("panel").getForm().getValues(false, false, false));
        
        Ext.Ajax.request({
            url: 'UpdateGMVoicePromptsPage.ashx',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                project_id: GLOBAL_currentProjectOpenProjectID
            },
            jsonData: jsonBlob,
            success: function(){
                console.log('yay');
            }
        });
    },
    
    deletePromptDetails: function(){
        //don't update anything if readOnly (or a dev or ops)
        if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "OPM"))) {
            return;
        }
        
        var jsonBlob = Ext.JSON.encode(this.getForm().getValues(false, false, false));
        
        Ext.Ajax.request({
            url: 'DeleteGMVoicePromptDetails.ashx',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                project_id: GLOBAL_currentProjectOpenProjectID
            },
            jsonData: jsonBlob,
            success: function(){
                console.log('yay');
            }
        });
    }
});

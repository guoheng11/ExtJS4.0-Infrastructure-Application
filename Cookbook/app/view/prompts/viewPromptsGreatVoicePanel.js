Ext.define('CookBook.view.prompts.ViewPromptsGreatVoicePanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.viewPromptsGreatVoicePanel',
    title: 'GreatVoice',
    collapsible: true,
    //collapseFirst: true,
    //collapsed: true,
    width: 1092, //2056,
    height: 1047,
    frame: true,
    layout: {
        type: 'hbox',
        align: 'left'
    },
    items: [{
        xtype: 'panel',
        width: 256,
        height: 1010,
        frame: true,
        layout: {
            type: 'vbox',
            align: 'left'
        },
        items: [{
            xtype: 'label',
            height: 10 //45
        }, {
            xtype: 'viewPromptsAddPanel'
        }, {
            xtype: 'label',
            height: 12
        }, {
            xtype: 'label',
            text: 'Language',
            height: 28
        }, {
            xtype: 'label',
            text: 'Prompts to be Recorded',
            height: 27
        }, {
            xtype: 'label',
            text: 'Prompts to be Billed',
            height: 26
        }, {
            xtype: 'label',
            text: 'Prompts Provided by Customer',
            height: 26
        }, {
            xtype: 'label',
            text: 'Translation Required - Minimum Fee',
            height: 26
        }, {
            xtype: 'label',
            text: 'Translation Required - # of Words',
            height: 26
        }, {
            xtype: 'label',
            text: 'Order Type',
            height: 28
        }, {
            xtype: 'label',
            text: 'Recording Sessions',
            height: 28
        }, {
            xtype: 'label',
            text: 'Voice Talent', //'Recording Studio',
            height: 26
        }, {
            xtype: 'label',
            text: 'Prompts to be Converted',
            height: 27
        }, {
            xtype: 'label',
            text: 'Conversion Sessions',
            height: 27
        }, {
            xtype: 'label',
            text: 'Prompts to be Digitized',
            height: 26
        }, {
            xtype: 'label',
            text: 'Prompt Transfer Fee Required',
            height: 23
        }, {
            xtype: 'label',
            text: 'CD Required',
            height: 27
        }, {
            xtype: 'label',
            text: 'CD Mailing Address',
            height: 90 //25
        }, {
            xtype: 'label',
            text: 'Prompt Format',
            height: 26
        }, {
            xtype: 'label',
            text: 'Converted Prompt Format',
            height: 26
        }, {
            xtype: 'label',
            text: 'Translation Needs Approval',
            height: 50
        }, {
            xtype: 'label',
            html: '<B>FEE CALCULATION</B>',
            height: 46 //50
        }, {
            xtype: 'label',
            text: 'Fee Formula',
            height: 27
        }, {
            xtype: 'label',
            text: 'Setup Fee',
            height: 27
        }, {
            xtype: 'label',
            text: 'Prompt Fee',
            height: 31 //27
        }, {
            xtype: 'label',
            text: 'Conversion Setup Fee',
            height: 27
        }, {
            xtype: 'label',
            text: 'Conversion Prompt Fee',
            height: 27
        }, {
            xtype: 'label',
            text: 'Translation Fee - Minimum',
            height: 27
        }, {
            xtype: 'label',
            text: 'Translation Fee - Per Word',
            height: 27
        }, {
            xtype: 'label',
            text: 'Transfer Fee',
            height: 28
        }, {
            xtype: 'label',
            text: 'Recording Fee (Per Language)',
            height: 48
        }, {
            xtype: 'viewPromptsGreatVoiceCDFee',
            width: 246
        }, {
            xtype: 'label',
            text: '',
            height: 10
        }, {
            xtype: 'viewPromptsGreatVoiceTotalFee',
            width: 246
        }]
    }]
});
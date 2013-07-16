Ext.define('CookBook.view.buffetprodinstall.ViewBuffetProdInstallStagingFoldersContainer', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.viewBuffetProdInstallStagingFoldersContainer',
    bodyBorder: false,
    autoScroll: true,
    preventHeader: true,
    border: false,
    frame: true,
    bodyStyle: 'background-color:#dfe8f5;',
    items: [{
        xtype: 'button',
        //width: 22,
        //icon: 'extjs/examples/restful/images/add.png',
        tooltip: 'click to add a row',
        text: 'Add New Staging Folder',
        listeners: {
            click: function(){
                if (GLOBAL_readonly) {
                    return;
                }
                if ((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV")) {
                    var additionalPanel = Ext.create('stagingFolderPanel');
                    this.up('panel').add(additionalPanel);
                }
            }
        }
    }    /*,{
     xtype: 'label',
     html: '<b><font size=2>&nbsp&nbsp&nbsp&nbsp&nbsp&nbspAdd a new Staging Folder</b></font>'
     }*/
    , {
        xtype: 'panel',
        layout: 'hbox',
        frame: false,
        bodyBorder: false,
        bodyStyle: 'background-color:#dfe8f5;',
        items: [{
            xtype: 'label',
            width: 190,
            html: ''
        }, {
            xtype: 'label',
            html: '<b><font size=2>Link</font></b>',
            width: 200
        }, {
            xtype: 'label',
            width: 50,
            html: ''
        }, {
            xtype: 'label',
            width: 200,
            html: ''
        }, {
            xtype: 'label',
            html: '<b><font size=2>Notes</font></b>',
            width: 200
        }]
    }]
});

Ext.define('stagingFolderPanel', {
    bodyPadding: 5,
    extend: 'Ext.panel.Panel',
    bodyborder: false,
    layout: 'hbox',
    items: [{
        xtype: 'textfield',
        itemId: 'buffetProdInstallStagingFolderLink',
        name: 'buffetProdInstallStagingFolderLink',
        width: 400
    }, {
        xtype: 'label',
        width: 50,
        text: ''
    }, {
        xtype: 'textfield',
        itemId: 'buffetProdInstallStagingNotes',
        name: 'buffetProdInstallStagingNotes',
        width: 400
    }, {
        xtype: 'label',
        width: 50,
        text: ''
    }, {
        xtype: 'button',
        width: 22,
        icon: 'extjs/examples/restful/images/delete.png',
        tooltip: 'click to delete this row',
        listeners: {
            click: function(){
                //don't update anything if readOnly
                if (GLOBAL_readonly) {
                    return;
                }
                if ((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV")) {
                    var tab = this.up('panel').up('panel').up('form');
                    this.up('panel').up('panel').remove(this.up('panel'));
                    updateTotalPreUATDevHours();
                    updateDevSchedule();
                    updateTotalDevHours();
                    tab.updateBuffetProdInstall();
                }
            }
        }
    }]
});

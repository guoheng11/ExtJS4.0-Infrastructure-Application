ProjectIngredientsPanel = Ext.extend(Ext.Panel, {
	projectId: '',
	projectExesGrid:'',
	projectAppsGrid:'',
	projectTablesGrid:'',
	projectOtherGrid:'',
	
    initComponent:function() {
	    var eto = this;
	    this.projectExesGrid = new ProjectExesGrid(this.projectId, true);
	    this.projectAppsGrid = new ProjectAppsGrid(this.projectId, true);
	    this.projectTablesGrid = new ProjectTablesGrid(this.projectId, true);
	    this.sysIngredForm = new SystemIngredientsForm(this.projectId, true);
	    this.projectOtherGrid = new ProjectIngredientGrid(this.projectId, true);
	    
	    Ext.apply(this, {
		    closable:true,
            baseCls: 'cookBackground',
            title:'Ingredient Summary',
            layout:'table',
            layoutConfig: {
	            columns:1,
	            tableAttrs: {
		            style: {
		                "margin": 10
		            }
		        }
		    },
            defaults: {
	            //style: "padding: 10"
	            //bodyStyle:'margin:20px'
            },
	        items: [this.projectAppsGrid, this.projectTablesGrid,this.projectExesGrid, this.sysIngredForm, this.projectOtherGrid]
		});
		this.on('afterrender', function() {
    		this.on('activate', this.onActivated, this);
		});
		ProjectIngredientsPanel.superclass.initComponent.call(this);
    },
    constructor: function(tabCont,projId) {
		this.projectId = projId;
		ProjectIngredientsPanel.superclass.constructor.call(this);
    },
    onActivated: function() {
        this.projectExesGrid.getStore().reload();
        this.projectAppsGrid.getStore().reload();
        this.projectTablesGrid.getStore().reload();
        this.projectOtherGrid.getStore().reload();
        this.sysIngredForm.reloadIngredients();
    }
});
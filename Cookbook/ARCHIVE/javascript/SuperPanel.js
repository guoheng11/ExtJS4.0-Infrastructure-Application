Ext.ns("Usan.View");

SuperPanel = Ext.extend(Ext.grid.EditorGridPanel,{
	savedSearchStore: '',
	
	initComponent: function() {
		
		var ArrayYesNo = [
		    ['True',1],
		    ['False',0],
		    ['Any',2]
		];
		var storeYesNo = new Ext.data.ArrayStore({
	        fields: [
		       {name: 'boolString', type: 'string'},
		       {name: 'value', type: 'int'}
		    ],
	        data : ArrayYesNo
	    });
    
		var comboYesNo = new Ext.form.ComboBox({
	        store: storeYesNo,
	        displayField:'boolString',
	        valueField: 'value',
	        typeAhead: true,
	        mode: 'local',
	        editable: 'false',
	        forceSelection: true,
	        triggerAction: 'all',
	        emptyText:'Any',
	        selectOnFocus:true,
	        value: 2
	    });
	    
		var cm = new Ext.grid.ColumnModel({
	        // specify any defaults for each column
	        defaults: {
	            sortable: true
	        },
			getCellEditor: function(colIndex, rowIndex) {
				var field = this.getDataIndex(colIndex);
				if (field == 'value') {
					var rec = store.getAt(rowIndex);
					return this.editors[rec.get('type')];
				}
				return Ext.grid.ColumnModel.prototype.getCellEditor.call(this, colIndex, rowIndex);
			},
	        columns: [{
		         header: "Search Id",
		         dataIndex: "search_id",
		         width: 60
		     }, {
		         header: "Search Name",
		         //renderer: Usan.Renderers.SearchName,
		         dataIndex: "search_name",
		         editor: new Ext.form.TextField({
                    allowBlank: false
                 })
		     }, {
		         header: "Created By",
		         fieldType: "username",
		         dataIndex: "created_by_name"
		     }, {
		         header: "Created By Id",
		         hidden: true,
		         dataIndex: "created_by"
		     }, {
		         header: "Created Date",
		         dataIndex: "created",
		         width: 120,
		         renderer: Ext.util.Format.dateRenderer('Y-m-d')
		     }, {
		         header: "Description",
		         dataIndex: "search_description",
		         width: 150,
		         editor: new Ext.form.TextField({
                    allowBlank: true
                 })
		     }, {
		         header: "From Date",
		         fieldType: "date",
		         dataIndex: "rec_start_time",
		         renderer: Ext.util.Format.dateRenderer('Y-m-d'),
		         editor: new Ext.form.DateField({
                    format: 'm/d/y',
                    minValue: '01/01/06'
                 })
		     }, {
		         header: "To Date",
		         fieldType: "date",
		         dataIndex: "rec_stop_time",
		         renderer: Ext.util.Format.dateRenderer('Y-m-d'),
		         editor: new Ext.form.DateField({
                    format: 'm/d/y',
                    minValue: '01/01/06'
                 })
		     }, {
		         header: "ANI",
		         fieldType: "phone",
		         dataIndex: "ani",
		         editor: new Ext.form.NumberField({
                    //allowBlank: false,
                    allowNegative: false
                 })
		     }, {
		         header: "DNIS",
		         fieldType: "phone",
		         dataIndex: "dnis",
		         editor: new Ext.form.NumberField({
                    //allowBlank: false,
                    allowNegative: false
                 })
		     }, {
		         header: "Agent Extension",
		         fieldType: "phone",
		         dataIndex: "agent_extension",
		         editor: new Ext.form.NumberField({
                    //allowBlank: false,
                    allowNegative: false
                 })
		     }, {
		         header: "Disposition Code",
		         dataIndex: "disposition",
		         editor: new Ext.form.TextField({
                    allowBlank: true
                 })
		     }, {
		         header: "Filesize Min",
		         dataIndex: "file_size_min",
		         width: 80,
		         editor: new Ext.form.NumberField({
                    //allowBlank: false,
                    allowNegative: false
                 })
		     }, {
		         header: "Filesize Max",
		         dataIndex: "file_size_max",
		         width: 80,
		         editor: new Ext.form.NumberField({
                    //allowBlank: false,
                    allowNegative: false
                 })
		     }, {
		         header: "Duration Min",
		         dataIndex: "duration_min",
		         width: 80,
		         editor: new Ext.form.NumberField({
                    //allowBlank: false,
                    allowNegative: false
                 })
		     }, {
		         header: "Duration Max",
		         dataIndex: "duration_max",
		         width: 80,
		         editor: new Ext.form.NumberField({
                    //allowBlank: false,
                    allowNegative: false
                 })
		     }, {
		         header: "Sequence Number",
		         dataIndex: "uip_call_seq_num",
		         editor: new Ext.form.NumberField({
                    //allowBlank: false,
                    allowNegative: false
                 })
		     }, {
		         header: "Service",
		         dataIndex: "service",
		         editor: new Ext.form.NumberField({
                    //allowBlank: false,
                    allowNegative: false
                 })
		     }, {
		         header: "Record ID",
		         dataIndex: "record_id",
		         editor: new Ext.form.NumberField({
                    //allowBlank: false,
                    allowNegative: false
                 })
		     }, {
		         header: "Agent ID",
		         dataIndex: "agent_id",
		         editor: new Ext.form.NumberField({
                    //allowBlank: false,
                    allowNegative: false
                 })
		     }, {
		         header: "Has Notes",
		         dataIndex: "has_notes",
		         editor: comboYesNo
		     }, {
		         header: "Has Flags",
		         dataIndex: "has_flags",
		         editor: comboYesNo
		     }, {
		         header: "Has Video",
		         dataIndex: "has_video",
		         editor: comboYesNo
		     }, {
		         header: "User Defined 1",
		         dataIndex: "user_defined1",
		         editor: new Ext.form.TextField({
                    allowBlank: true
                 })
		     }, {
		         header: "User Defined 2",
		         dataIndex: "user_defined2",
		         editor: new Ext.form.TextField({
                    allowBlank: true
                 })
		     }, {
		         header: "User Defined 3",
		         dataIndex: "user_defined3",
		         editor: new Ext.form.TextField({
                    allowBlank: true
                 })
		     }, {
		         header: "User Defined 4",
		         dataIndex: "user_defined4",
		         editor: new Ext.form.TextField({
                    allowBlank: true
                 })
		     }, {
		         header: "User Defined 5",
		         dataIndex: "user_defined5",
		         editor: new Ext.form.TextField({
                    allowBlank: true
                 })
		     }, {
		         header: "User Defined 6",
		         dataIndex: "user_defined6",
		         editor: new Ext.form.TextField({
                    allowBlank: true
                 })
		     }, {
		         header: "User Defined 7",
		         dataIndex: "user_defined7",
		         editor: new Ext.form.TextField({
                    allowBlank: true
                 })
		     }, {
		         header: "User Defined 8",
		         dataIndex: "user_defined8",
		         editor: new Ext.form.TextField({
                    allowBlank: true
                 })
		     }, {
		         header: "User Defined 9",
		         dataIndex: "user_defined9",
		         editor: new Ext.form.TextField({
                    allowBlank: true
                 })
		     }, {
		         header: "User Defined 10",
		         dataIndex: "user_defined10",
		         editor: new Ext.form.TextField({
                    allowBlank: true
                 })
		     }, {
		         header: "User Defined 11",
		         dataIndex: "user_defined11",
		         editor: new Ext.form.TextField({
                    allowBlank: true
                 })
		     }, {
		         header: "User Defined 12",
		         dataIndex: "user_defined12",
		         editor: new Ext.form.TextField({
                    allowBlank: true
                 })
		     }, {
		         header: "User Defined 13",
		         dataIndex: "user_defined13",
		         editor: new Ext.form.TextField({
                    allowBlank: true
                 })
		     }, {
		         header: "User Defined 14",
		         dataIndex: "user_defined14",
		         editor: new Ext.form.TextField({
                    allowBlank: true
                 })
		     }, {
		         header: "User Defined 15",
		         dataIndex: "user_defined15",
		         editor: new Ext.form.TextField({
                    allowBlank: true
                 })
		     }, {
		         header: "User Defined 16",
		         dataIndex: "user_defined16",
		         editor: new Ext.form.TextField({
                    allowBlank: true
                 })
		     }, {
		         header: "User Defined 17",
		         dataIndex: "user_defined17",
		         editor: new Ext.form.TextField({
                    allowBlank: true
                 })
		     }, {
		         header: "User Defined 18",
		         dataIndex: "user_defined18",
		         editor: new Ext.form.TextField({
                    allowBlank: true
                 })
		     }, {
		         header: "User Defined 19",
		         dataIndex: "user_defined19",
		         editor: new Ext.form.TextField({
                    allowBlank: true
                 })
		     }, {
		         header: "User Defined 20",
		         dataIndex: "user_defined20",
		         editor: new Ext.form.TextField({
                    allowBlank: true
                 })
		     }]
	    });
	    
	    this.savedSearchStore = new Ext.data.Store({
			id: 'savedSearchStore',
			proxy: new Ext.data.HttpProxy({
				url: 'GetSavedSearches.ashx', // File to connect to
				method: 'GET'
			}),
			reader: new Ext.data.JsonReader({   
				// we tell the datastore where to get his data from
				root: 'rows',
				totalProperty: 'total',
				id: 'search_id'
			}, [
				{name: 'search_id', type: "int"},
				{name: 'search_name', type: "string"},
				{name: 'search_description', type: "string"},
				{name: 'created_by', type: "int"},
				{name: 'created', type: "date"},
				{name: 'rec_start_time', type: "date"},
				{name: 'rec_stop_time', type: "date"},
				{name: 'channel_id', type: "int"},
				{name: 'agent_extension', type: "string"},
				{name: 'record_id', type: "int"},
				{name: 'switch_id', type: "int"},
				{name: 'span_id', type: "int"},
				{name: 'uip_call_seq_num', type: "string"},
				{name: 'agent_id', type: "string"},
				{name: 'agent_login_id', type: "int"},
				{name: 'workstation_id', type: "int"},
				{name: 'call_start_dt', type: "string"},
				{name: 'user_defined1', type: "string"},
				{name: 'user_defined2', type: "string"},
				{name: 'user_defined3', type: "string"},
				{name: 'user_defined4', type: "string"},
				{name: 'user_defined5', type: "string"},
				{name: 'user_defined6', type: "string"},
				{name: 'user_defined7', type: "string"},
				{name: 'user_defined8', type: "string"},
				{name: 'user_defined9', type: "string"},
				{name: 'user_defined10', type: "string"},
				{name: 'user_defined11', type: "string"},
				{name: 'user_defined12', type: "string"},
				{name: 'user_defined13', type: "string"},
				{name: 'user_defined14', type: "string"},
				{name: 'user_defined15', type: "string"},
				{name: 'user_defined16', type: "string"},
				{name: 'user_defined17', type: "string"},
				{name: 'user_defined18', type: "string"},
				{name: 'user_defined19', type: "string"},
				{name: 'user_defined20', type: "string"},
				{name: 'service', type: "string"},
				{name: 'disposition', type: "string"},
				{name: 'ani', type: "string"},
				{name: 'dnis', type: "string"},
				{name: 'file_size_min', type: "int"},
				{name: 'file_size_max', type: "int"},
				{name: 'has_notes', type: "int"},
				{name: 'has_flags', type: "int"},
				{name: 'has_video', type: "int"},
				{name: 'duration_min', type: "int"},
				{name: 'duration_max', type: "int"}
			])
	  	});

		/*this.savedSearchStore.on('load', function(store, recordArray, options) {
			eto.loadRoleBoxes(recordArray);
		});*/
		this.savedSearchStore.load();
	    this.saveButton = new Ext.Button({
	         text: "Save",
	         iconCls: "u-btn-save",
	         disabled: true,
	         handler: function()
	         {
	            /*var grid = this.ownerCt.ownerCt;
	            var sm = grid.getSelectionModel();
	            Usan.Actions.DeleteFilter(sm.getSelected().data);*/
	         }
	    });
		Ext.apply(this,{
		     layout: "fit",
		     stripeRows: true,
		     clicksToEdit: 2,
		     title: "Saved Searches",
		     sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
		     store: this.savedSearchStore,
		     cm: cm,
		     bbar: {
		         xtype: "paging"
		     },
		     tbar: [{
		         text: "New",
		         iconCls: "u-btn-filter-new",
		         handler: function() {
		            var grid = this.ownerCt.ownerCt;
		             // access the Record constructor through the grid's store
	                var Search = grid.getStore().recordType;
	                var p = new Search({
	                    search_name: 'Default Search',
	                    search_description: 'Automatically Generated'
	                });
	                p.markDirty();
	                grid.stopEditing();
	                grid.getStore().insert(0, p);
	                grid.startEditing(0, 0);
		             //Usan.Actions.RunFilter(null, grid, false);
		         }
		     },'-',/*{
		         text: "Edit",
		         iconCls: "u-btn-filter-edit",
		         disabled: true,
		         handler: function(btn, evt)
		         {
		            var grid = this.ownerCt.ownerCt;
		            var sm = grid.getSelectionModel();
		            Usan.Actions.RunFilter(sm.getSelected().data, grid, false); //edit
		         }
		     },'-',*/{
		         text: "Run",
		         iconCls: "u-btn-filter-run",
		         disabled: true,
		         handler: function()
		         {
		            var grid = this.ownerCt.ownerCt;
		            var sm = grid.getSelectionModel();
		            Usan.Actions.RunFilter(sm.getSelected().data, grid);
		         }
		     },'-',{
		         text: "Delete",
		         iconCls: "u-btn-filter-delete",
		         disabled: true,
		         handler: function()
		         {
		            var grid = this.ownerCt.ownerCt;
		            var sm = grid.getSelectionModel();
		            Usan.Actions.DeleteFilter(sm.getSelected().data);
		         }
		     }, '-', this.saveButton],
		     listeners: {
		        resize: {
		            fn: function(el) {
		                /*if (el.getInnerHeight() < 250) {
		                    el.autoHeight = false;
		                    el.setHeight(250);
		                } else {
			                el.autoHeight = true;
		                }*/
		            }
		        }
		    }
	     });
	     
	     SuperPanel.superclass.initComponent.call(this);
	     
	     /*this.on('rowdblclick', function(grid, row, event) {
             var search = grid.getSelectionModel().getSelected().data;
             Usan.Actions.RunFilter(search, grid, false); //edit
         });*/
         
         this.on('rowclick', function(grid, row, event) {
            var tb = grid.getTopToolbar().items;
            tb.items[2].setDisabled(false);
            tb.items[4].setDisabled(false);
            //tb.items[6].setDisabled(false);
         });
         
         /*this.on('resize', function(){
           if (this.rendered)
           {
              var cnt = this.resizeStore();
           }
         });*/
         
         /*this.on('render', function(p) {
	         p.store.load();
	         var c = this.resizeStore();
		     p.store.loadData(Usan.Data.Filters.slice(0,c));
         });*/
         
         this.on('rowcontextmenu', function(grid, rowIndex, evt) {
             var sm = this.getSelectionModel();
             
             if (sm instanceof Ext.grid.RowSelectionModel) 
             {           
                if (!sm.isSelected(rowIndex)) 
                {
                    sm.selectRow(rowIndex);
                    this.fireEvent('rowclick', this, rowIndex, evt);
                }
             }
             var selCount = sm.getCount();
             var menu = new Ext.menu.Menu({
                 listeners: {
                     hide: function(me)
                     {
                         me.destroy();
                         menu = null;
                     }
                 },
                 items: [{
                     text: "New Search",
                     scope: this,
                     iconCls: "u-icon-new",
                     handler: function()
                     {
                         Usan.Actions.RunFilter(null, this, false); //edit
                     }
                 },/* {
                     text: "Edit Search",
                     scope: this,
                     iconCls: "u-icon-edit",
                     disabled: selCount != 1,
                     handler: function()
                     {
                         var d = sm.getSelected().data;
                         Usan.Actions.RunFilter(d, this, false); //edit
                     }
                 }, */{
                     text: "Delete Search",
                     scope: this,
                     disabled: selCount != 1,
                     iconCls: "u-icon-delete",
                     handler: function()
                     {
                        var d = sm.getSelected().data;
                        Usan.Actions.DeleteFilter(d, true);
                     }
                 }, {
                     text: "Run Search",
                     scope: this,
                     disabled: selCount != 1,
                     iconCls: "u-icon-run",
                     handler: function()
                     {
                         
                         Usan.Actions.RunFilter(sm.getSelected().data, this);
                     }
                 }, '-', {
                     text: "Add Note",
                     scope: this,
                     disabled: selCount != 1,
                     iconCls: "u-note-add",
                     handler: Ext.emptyFn
                 }, {
                     text: "View Notes",
                     scope: this,
                     disabled: selCount != 1,
                     iconCls: "u-note-view",
                     handler: Ext.emptyFn
                 }, '-', /*{
                     text: "Add to case...",
                     scope: this,
                     disabled: selCount != 1,
                     iconCls: "u-case-add",
                     handler: Ext.emptyFn
                 }, {
                     text: "Remove From Case",
                     iconCls: "u-case-delete",
                     handler: Ext.emptyFn
                 }, '-', */{
                     text: "View All",
                     checked: false,
                     checkHandler: function(m, checked)
                     {
                         var st = this.getStore();
                         var tb = this.getBottomToolbar();
                         this.viewAll = checked;
                         if (checked) 
                         {
                             st.baseParams.limit = MAX_PAGE_LIMIT;
                             tb.pageSize = MAX_PAGE_LIMIT;

                             st.load({
                                 params: {
                                     start: 0,
                                     limit: MAX_PAGE_LIMIT
                                 }
                             });
                         }
                         else 
                         {
                             this.resizeStore();
                             st.reload();
                         }
                     }
                 }]
             });

             evt.preventDefault();
             evt.stopEvent();
             menu.showAt(evt.getPoint());
         });
         
    }, // end of init component()
    constructor: function() {
		SuperPanel.superclass.constructor.call(this);
    }
});
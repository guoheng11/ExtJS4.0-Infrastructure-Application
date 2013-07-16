Ext.define('CookBook.view.summary.ViewSummaryGenerateIFQ', {
	extend: 'Ext.button.Button',
	alias:  'widget.viewSummaryGenerateIFQ',

	name:	'summaryGenerateIFQ',
	text:   'Generate IFQ',
	
	listeners: {
		click: function() {
			
			//check for a project folder
			var folder = Ext.ComponentQuery.query("viewSummaryProjectFolder")[0].getValue();
			console.log(folder);

			if ((folder == "") || (folder == " ") || (folder == undefined))
			{
				alert ("Before you can generate an IFQ, you must set a project folder in the Summary tab");
				return;
			}

			var jsonBlob = Ext.JSON.encode("Nothing to see here");

			Ext.Ajax.request({
				url: 'CreateIFQ.ashx',
				method: 'POST',
				headers: {
					'Content-Type':'application/json'
				},
				params: {project_id: GLOBAL_currentProjectOpenProjectID},
				jsonData: jsonBlob,
				success: function (response) { 
					var obj = Ext.decode(response.responseText);
					console.log(obj.rows[0]);
				}
			});
		}
	}
});
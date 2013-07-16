using System;
using System.Collections.Generic;
using System.Text;
using System.Collections;

public class OXMLGenerator
{
    private int counter;

    public OXMLGenerator()
    {
        counter = 0;
    }

    public string generateTable(List<Dictionary<string, string>> projectList, Dictionary<string, string> fieldToLabel)
    {
        // first figure out total columns
        int maxNumberOfColumns = 0;
        Dictionary<string, string> maxColumns = null;
        foreach (Dictionary<string, string> frow in projectList)
        {
            if (frow.Count > maxNumberOfColumns)
            {
                maxNumberOfColumns = frow.Count;
                maxColumns = frow;
            }
        }
        if (maxColumns != null)
        {
            string generatedTable = "";
            // lets figure out standard order
            List<string> columnOrder = new List<string>();
            foreach (KeyValuePair<string, string> kvp in maxColumns)
            {
                columnOrder.Add(kvp.Key);
            }
            

            // generate start
            generatedTable = generatedTable + generateStart(columnOrder, fieldToLabel, projectList.Count);

            // each project row
            foreach (Dictionary<string, string> row in projectList)
            {
                generatedTable = generatedTable + generateRow(row, columnOrder);
            }

            // generate end
            generatedTable = generatedTable + generateEnd();
            return generatedTable;
        }
        else
        {
            return "Error happened...";
        }
    }


    private string generateRow(Dictionary<string, string> row, List<string> order)
    {
        counter++;
        string rowStyle = "row2";
        string hyperlinkStyle = "Hyperlink1";
        if (counter % 2 == 0)
        {
            rowStyle = "row1";
            hyperlinkStyle = "Hyperlink2";
        }
        string rowString =
"      <Row>\n";
        foreach (string colName in order)
        {
            string value = "";
            if (row.ContainsKey(colName))
            {
                value = row[colName];
            }

            if (value.StartsWith("\\"))
            {
                rowString = rowString +
"        <Cell ss:HRef=\"" + value + "\" ss:StyleID=\"" + hyperlinkStyle + "\">\n" +
"          <Data ss:Type=\"String\">Project Folder</Data>\n" +
"        </Cell>\n";
            }
            else
            {
                rowString = rowString +
"        <Cell ss:StyleID=\"" + rowStyle + "\">\n" +
"          <Data ss:Type=\"String\">" + value + "</Data>\n\n" +
"        </Cell>\n";
            }
        }
        rowString = rowString + 
"      </Row>\n";
        return rowString;
    }



    private string surroundWithComments(string orig)
    {
        return "\n<!-- GenField -->\n" + orig + "\n<!-- GenField -->\n";
    }

    private string generateStart(List<string> columnOrder, Dictionary<string, string> fieldToLabel, int rowCount)
    {
        string startString = 
"<?xml version=\"1.0\"?>\n" +
"<?mso-application progid=\"Excel.Sheet\"?>\n" +
"<Workbook\n" +
"   xmlns=\"urn:schemas-microsoft-com:office:spreadsheet\"\n" +
"   xmlns:o=\"urn:schemas-microsoft-com:office:office\"\n" +
"   xmlns:x=\"urn:schemas-microsoft-com:office:excel\"\n" +
"   xmlns:ss=\"urn:schemas-microsoft-com:office:spreadsheet\"\n" +
"   xmlns:html=\"http://www.w3.org/TR/REC-html40\">\n" +
"  <DocumentProperties xmlns=\"urn:schemas-microsoft-com:office:office\">\n" +
"    <Author>Alex Turyev</Author>\n" +
"    <LastAuthor>Alex Turyev</LastAuthor>\n" +
"    <Created>2010-10-26T00:00:00Z</Created>\n" +
"    <Company>USAN</Company>\n" +
"    <Version>1.0</Version>\n" +
"  </DocumentProperties>\n" +
"  <ExcelWorkbook xmlns=\"urn:schemas-microsoft-com:office:excel\">\n" +
"    <WindowHeight>6795</WindowHeight>\n" +
"    <WindowWidth>8460</WindowWidth>\n" +
"    <WindowTopX>120</WindowTopX>\n" +
"    <WindowTopY>15</WindowTopY>\n" +
"    <ProtectStructure>False</ProtectStructure>\n" +
"    <ProtectWindows>False</ProtectWindows>\n" +
"  </ExcelWorkbook>\n" +
"  <Styles>\n" +
"    <Style ss:ID=\"Default\" ss:Name=\"Normal\">\n" +
"      <Alignment ss:Vertical=\"Bottom\" />\n" +
"      <Borders />\n" +
"      <Font />\n" +
"      <Interior />\n" +
"      <NumberFormat />\n" +
"      <Protection />\n" +
"    </Style>\n" +
"    <Style ss:ID=\"uHeader\">\n" +
"      <Interior ss:Color='#4F81BD' ss:Pattern='Solid'/>\n" +
"      <Font ss:Color='#FFFFFF' ss:Bold='1'/>\n" +
"      <Borders>\n" +
"      	<Border ss:Position='Bottom' ss:LineStyle='Continuous' ss:Color='#FFFFFF' ss:Weight='2'/>\n" +
"      	<Border ss:Position='Left' ss:LineStyle='Continuous' ss:Color='#FFFFFF' ss:Weight='1'/>\n" +
"      	<Border ss:Position='Right' ss:LineStyle='Continuous' ss:Color='#FFFFFF' ss:Weight='1'/>\n" +
"      </Borders>\n" +
"    </Style>\n" +
"    <Style ss:ID=\"Hyperlink1\">\n" +
"	  <Interior ss:Color='#B8CCE4' ss:Pattern='Solid'/>\n" +
"      <Font ss:Color=\"#0000FF\" ss:Underline=\"Single\" ss:Bold='0'/>\n" +
"      <Borders>\n" +
"      	<Border ss:Position='Bottom' ss:LineStyle='Continuous' ss:Color='#FFFFFF' ss:Weight='1'/>\n" +
"      	<Border ss:Position='Left' ss:LineStyle='Continuous' ss:Color='#FFFFFF' ss:Weight='1'/>\n" +
"      	<Border ss:Position='Right' ss:LineStyle='Continuous' ss:Color='#FFFFFF' ss:Weight='1'/>\n" +
"      </Borders>\n" +
"    </Style>\n" +
"    <Style ss:ID=\"Hyperlink2\">\n" +
"	  <Interior ss:Color='#DBE5F1' ss:Pattern='Solid'/>\n" +
"      <Font ss:Color=\"#0000FF\" ss:Underline=\"Single\" ss:Bold='0'/>\n" +
"      <Borders>\n" +
"      	<Border ss:Position='Bottom' ss:LineStyle='Continuous' ss:Color='#FFFFFF' ss:Weight='1'/>\n" +
"      	<Border ss:Position='Left' ss:LineStyle='Continuous' ss:Color='#FFFFFF' ss:Weight='1'/>\n" +
"      	<Border ss:Position='Right' ss:LineStyle='Continuous' ss:Color='#FFFFFF' ss:Weight='1'/>\n" +
"      </Borders>\n" +
"    </Style>\n" +
"    <Style ss:ID=\"row1\">\n" +
"      <Interior ss:Color='#B8CCE4' ss:Pattern='Solid'/>\n" +
"      <Font ss:Color='#000000' ss:Bold='0'/>\n" +
"      <Borders>\n" +
"      	<Border ss:Position='Bottom' ss:LineStyle='Continuous' ss:Color='#FFFFFF' ss:Weight='1'/>\n" +
"      	<Border ss:Position='Left' ss:LineStyle='Continuous' ss:Color='#FFFFFF' ss:Weight='1'/>\n" +
"      	<Border ss:Position='Right' ss:LineStyle='Continuous' ss:Color='#FFFFFF' ss:Weight='1'/>\n" +
"      </Borders>\n" +
"    </Style>\n" +
"    <Style ss:ID=\"row2\">\n" +
"      <Interior ss:Color='#DBE5F1' ss:Pattern='Solid'/>\n" +
"      <Font ss:Color='#000000' ss:Bold='0'/>\n" +
"      <Borders>\n" +
"      	<Border ss:Position='Bottom' ss:LineStyle='Continuous' ss:Color='#FFFFFF' ss:Weight='1'/>\n" +
"      	<Border ss:Position='Left' ss:LineStyle='Continuous' ss:Color='#FFFFFF' ss:Weight='1'/>\n" +
"      	<Border ss:Position='Right' ss:LineStyle='Continuous' ss:Color='#FFFFFF' ss:Weight='1'/>\n" +
"      </Borders>\n" +
"    </Style>\n" +
"  </Styles>\n" +
"  <Worksheet ss:Name=\"Projects\">\n" +
"    <Table ss:ExpandedColumnCount=\"" + columnOrder.Count + "\" ss:ExpandedRowCount=\"" + (rowCount+1) + "\"\n" +
"	   x:FullColumns=\"1\" x:FullRows=\"1\">\n";
        foreach (string column in columnOrder)
        {
            startString = startString +
"	  <Column ss:AutoFitWidth=\"1\" ss:Width=\"100\"/>\n";
        }
        startString = startString +
"      <Row>\n";
        foreach (string column in columnOrder)
        {
            string label = column;
            if (fieldToLabel.ContainsKey(column))
            {
                label = fieldToLabel[column];
            }
            startString = startString +
"        <Cell ss:StyleID=\"uHeader\">\n" +
"          <Data ss:Type=\"String\">" + label + "</Data>\n" +
"        </Cell>\n";
        }
        startString = startString +
"      </Row>\n";
        return startString;
    }

    private string generateEnd()
    {
        return
"    </Table>\n" +
"    <WorksheetOptions xmlns=\"urn:schemas-microsoft-com:office:excel\">\n" +
"      <Print>\n" +
"        <ValidPrinterInfo />\n" +
"        <HorizontalResolution>600</HorizontalResolution>\n" +
"        <VerticalResolution>600</VerticalResolution>\n" +
"      </Print>\n" +
"      <Selected />\n" +
"      <Panes>\n" +
"        <Pane>\n" +
"          <Number>3</Number>\n" +
"          <ActiveRow>5</ActiveRow>\n" +
"          <ActiveCol>1</ActiveCol>\n" +
"        </Pane>\n" +
"      </Panes>\n" +
"      <ProtectObjects>False</ProtectObjects>\n" +
"      <ProtectScenarios>False</ProtectScenarios>\n" +
"    </WorksheetOptions>\n" +
"  </Worksheet>\n" +
"</Workbook>\n";
    }
}

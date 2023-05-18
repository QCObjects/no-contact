"use strict";
Package("org.qcobjects.sdk.components.gridtable", [
  Class("GridTableTemplateHandler", Object, {
    template: "",
    assign(data) {
      var component = this.component;
      var gridtable_columns = function (columnsName) {
        var data = this.component.data;
        var columns = data[columnsName];
        if (typeof columns !== "undefined" ) {
          var columns_text = columns.map(column => {
            if (typeof column.label === "undefined") {
              column.label = function (cname) {
                return cname;
              };
            }
            if (typeof column.width === "undefined") {
              column.width = "auto";
            }
            var columnLabel = column.label(column.name);
            var column_template = `<th style="width:${column.width.toString()};">${columnLabel}</th>`;
            return column_template;
          }).join("\n");
        }
        return columns_text;
      };
      var gridtable_rows = function (rowsName, columnsName) {
        var rows_text = "";
        var data = this.component.data;

        var rows = data[rowsName];
        var columns = data[columnsName];
        if (
          typeof rows !== "undefined" &&
          typeof columns !== "undefined" 
        ) {
          rows_text = rows.map(row => {
            var rowmap = columns.map(column => {
              if (typeof column.format === "undefined") {
                column.format = function (s) {
                  return s.toString();
                };
              }
              var cellValue = column.format(row[column.name]);
              var column_template = `<td>${cellValue}</td>`;
              return column_template;
            }).join("\n");
            var row_template = `<tr>${rowmap}</tr>`;
            return row_template;
          }).join("\n");
        }

        return rows_text;
      };
      component.processorHandler.setProcessor(gridtable_columns);
      component.processorHandler.setProcessor(gridtable_rows);
      return _super_("DefaultTemplateHandler", "assign").call(this, data);
    }
  }),
  Class("GridTableComponent", Component, {
    name: "gridtable",
    tplsource: "inline",
    shadowed: true,
    templateHandler: "GridTableTemplateHandler",
    template: `
    <style>
    :root, :host {
      box-sizing: border-box;
    }
    
    #myInput {
      background-image: url('{{search_icon}}');
      background-position: 10px 10px;
      background-repeat: no-repeat;
      width: 100%;
      font-size: 16px;
      padding: 12px 20px 12px 40px;
      border: 1px solid #ddd;
      margin-bottom: 12px;
    }
    
    #myTable {
      border-radius: 27px;
      border-collapse: collapse;
      width: 100%;
      border: 1px solid #ddd;
      font-size: 18px;
    }
    
    #myTable th, #myTable td {
      text-align: left;
      padding: 12px;
    }
    
    #myTable tr {
      border-bottom: 1px solid #ddd;
    }
    
    #myTable tr.header, #myTable tr:hover {
      background-color: #f1f1f1;
    }
    
    
    tr {
         display: none;
         animation: fade_out;
    }
    
    tr.item {
         display: block;
         animation: fade_in_show 0.8s
    }
    
    @keyframes fade_out {
         0% {
              opacity: 1;
              transform: scale(1);
         }
    
         100% {
              opacity: 0;
              transform: scale(0);
         }
    }
    
    @keyframes fade_in_show {
         0% {
              opacity: 0;
              transform: scale(0);
         }
    
         100% {
              opacity: 1;
              transform: scale(1);
         }
    }
    </style>
    
    <h2>{{title}}</h2>
    
    <label for="myInput">{{search_title}}:</label>
    <input type="text" id="myInput" onkeyup="global.get('{{controllerInstance}}').applyFilter()" aria-label="Search" placeholder="{{placeholder}}... " title="{{placeholder}}">
    
    <table id="myTable">
      <tr class="header">
        $gridtable_columns(columns)
      </tr>
        $gridtable_rows(rows,columns)
    </table>
    `,
    _new_(o) {
      o.data.controllerInstance = `component_${this.__instanceID.toString()}_controller`;
      this.body.setAttribute("controllerClass", "GridTableController");
      return _super_("Component", "_new_").call(this, o);
    }
  })

]);
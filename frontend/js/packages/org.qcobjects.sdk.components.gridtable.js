"use strict";
Package("org.qcobjects.sdk.components.gridtable", [
  Class("GridTableTemplateHandler", ClassFactory("DefaultTemplateHandler"), {
    assign(data) {
      var component = this.component;
      var gridtable_columns = function (columnsName) {
        return "these are the columns";
      };
      var gridtable_rows = function (rows) {
        return "these are the rows";
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
    template: `
    <style>
    :root, :host {
      box-sizing: border-box;
    }
    
    #myInput {
      background-image: url('{{searchIcon}}');
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
    
    <label for="myInput">{{searchTitle}}:</label>
    <input type="text" id="myInput" onkeyup="global.get('{{controllerInstance}}').applyFilter()" aria-label="Search" placeholder="{{placeholder}}... " title="{{placeholder}}">
    
    <table id="myTable">
      <tr class="header">
        $gridtable_columns(columns)
      </tr>
        $gridtable_rows(rows)
    </table>
    `,
    _new_(o) {
      return _super_("Component", "_new_").call(this, o);
    }
  })

]);
"use strict";
Package("org.qcobjects.sdk.controllers.gridtable", [
  Class("GridTableController", Controller, {
    applyFilter () {
        var controller = this;
        var __component_root__ = (controller.component.shadowed)?(controller.component.shadowRoot):(controller.component.body);

        var input, filterText, table;
        input = __component_root__.subelements("#myInput")[0];
        filterText = input.value.toString();
        table = __component_root__.subelements("#myTable")[0];
        table.subelements("tr").filter (tr => {
          return tr.subelements("td").filter(td => {
            return td.textContent.lastIndexOf(filterText) === -1
            || td.innerText.lastIndexOf(filterText) === -1;
          }).length>0;
        }).map (tr => {
          tr.classList.remove("item");          
          return tr;
        });
        table.subelements("tr").filter (tr => {
          return tr.subelements("td").filter(td => {
            return td.textContent.lastIndexOf(filterText) !== -1
            || td.innerText.lastIndexOf(filterText) !== -1;
          }).length>0;
        }).map (tr => {
          tr.classList.add("item");
        });
          
    },
    _new_ (o) {
        try {
            var controller = this;
            global.set(controller.component.data.controllerInstance, controller);
            _super_("Controller", "__new__").call(this, o);
        } catch (e) {
            console.error(e);
        }
    },
    done (response) {
      this.applyFilter();
      _super_("Controller", "done").call(this, response);
    }
  })

]);
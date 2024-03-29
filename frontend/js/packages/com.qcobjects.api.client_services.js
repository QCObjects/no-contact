"use strict";
Package("com.qcobjects.api.client_services",[
  Class("ContactListService", JSONService, {
    kind: "local",
    template: "[{\"name\":\"John doe\",\"email\":\"a@b.com\"},{\"name\":\"Jane doe\",\"email\":\"a@c.com\"}]",
    name: "qcobjects_contactlist",
    external: false,
    cached: false,
    method: "get",
    step: null,
    headers: {
      "content-type": "application/json"
    },
    basePath: "",
    url: "/contactlist",
    withCredentials: false,
    _new_ (o) {
      // service instantiated
      this.data = o.data;
      NotificationComponent.info("loading service...");
    },
    done ({service}) {
      logger.debugEnabled = true;
      logger.debug(service.template);
      try {
        let response = JSON.parse(service.template);
        // eslint-disable-next-line no-undef
        service.template = {
          columns: [
            {name:"name"},
            {name:"email"}
          ],
          rows: response
        };
      } catch (e){
        NotificationComponent.danger(e.toString());
      }
      logger.debugEnabled = false;
    },
    fail (failure) {
      console.error(failure);
      NotificationComponent.warning("failure...");
    }
  })
]);
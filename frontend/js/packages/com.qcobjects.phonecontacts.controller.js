"use strict";
Package("com.qcobjects.phonecontacts.controller", [
    Class("PhoneContactsController", Controller, {
        dependencies: [],
        component: null,
        done() {
            var controller = this;
            (async function (controller){
                if ("contacts" in navigator) {
                    const e = await navigator.contacts.getProperties(),
                        t = controller.component.shadowRoot.subelements("#contacts")[0],
                        n = controller.component.shadowRoot.subelements("#select-contacts")[0];
                        n.innerHTML = "<p>Select Contacts</p>";
                    t.innerHTML = "";
                    const r = e => {
                        const n = e.reduce((e, t) => `${e}\n            <p>\n              <span>\n                <i class="material-icons">person</i>\n                <strong>${t.name.join(", ")}</strong><br>\n              </span>\n              <span>\n                <i class="material-icons">mail_outline</i>\n                ${t.email.join(", ")}<br>\n              </span>\n              <span>\n                <i class="material-icons">phone</i>\n                ${t.tel.join(", ")}</p>\n              </span>\n            `, "");
                        t.innerHTML = n;
                    };
                    n.addEventListener("click", async t => {
                        console.log(t);
                        NotificationComponent.info("click button");
                        const n = await navigator.contacts.select(e, {
                            multiple: !0
                        });
                        r(n);
                    });
                }
    
            })(controller);

        }
    })
]);
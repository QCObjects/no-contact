"use strict";
Package("org.qcobjects.sdk.controllers.qrgen", [
    Class("QRGenController", Controller, {
        loadDependencies(callback) {
            var controller = this;
            if (controller.dependencies.length > 0) {
                callback.call(controller);
            } else {
                var basePath = CONFIG.get("jsqr-path", "./js/packages/thirdparty/libs/jsqr/");

                controller.dependencies.push(New(SourceJS, {
                    url: basePath + "jsqr-1.0.2-min.js",
                    external: CONFIG.get("jsqr-external", false),
                    sourceType: "module",
                    done: function () {
                        callback.call(controller);
                    }
                }));

            }
        },

        addQRCanvas() {
            var controller = this;
            // eslint-disable-next-line no-undef
            var vcardComponent = New(VCardComponent, {
                data: controller.component.data
            });

            // eslint-disable-next-line no-undef
            var qr = new JSQR();

            var code = new qr.Code();
            code.encodeMode = code.ENCODE_MODE.BYTE;
            code.version = code.DEFAULT;
            code.errorCorrection = code.ERROR_CORRECTION.H;
            
            var input = new qr.Input();
            input.dataType = input.DATA_TYPE.VCARD;
            input.data = {
                 "version": "3.0",
                 "type": "person",
                 "firstName": "Jean",
                 "middleName": "",
                 "lastName": "Machuca",
                 "organization": "QCObjects Framework",
                 "title": "Founder",
                 "home": {
                    "street": "",
                    "city": "",
                    "zip": "",
                    "state": "",
                    "country": "",
                    "phone": "",
                    "fax": "",
                    "url": "",
                    "eMail": "jean@qcobjects.com"
                 },
                 "work": {
                    "street": "",
                    "city": "",
                    "zip": "",
                    "state": "",
                    "country": "",
                    "phone": "",
                    "fax": "",
                    "url": "",
                    "eMail": "jean@qcobjects.com"
                 },
                 "mobilePhone": "+56948783634",
                 "birthday": null
            };
            
            var matrix = new qr.Matrix(input, code);
            
            var canvas = document.createElement("canvas");
            canvas.setAttribute("width", matrix.pixelWidth);
            canvas.setAttribute("height", matrix.pixelWidth);
            canvas.getContext("2d").fillStyle = "rgb(0,0,0)";
            matrix.draw(canvas, 0, 0)
            controller.component.body.appendChild(canvas);

        },
        done() {
            var controller = this;
            controller.loadDependencies(function () {
                controller.addQRCanvas();
            });
        }
    })
]);
"use strict";

Package("org.qcobjects.sdk.controllers.qrscanner", [
  Class("QRScanController", Controller, {
    dependencies: [],
    component: null,
    scanner: null,
    loadDependencies(callback) {
      var controller = this;
      if (controller.dependencies.length > 0) {
        callback.call(controller);
      } else {
        var QRScannerPath = CONFIG.get("qr-scanner-path", "./js/packages/thirdparty/libs/qr-scanner/");

        controller.dependencies.push(New(SourceJS, {
          url: QRScannerPath + "qr-scanner-worker.min.js",
          external: CONFIG.get("qr-scanner-external", false),
          done: function () {
            controller.dependencies.push(New(SourceJS, {
              url: QRScannerPath + "qr-scanner.js",
              external: CONFIG.get("qr-scanner-external", false),
              done: function () {
                callback.call(controller);
              }
            }));

          }
        }));

      }
    },
    __result_notified__: false,
    setResult( result) {
      const controller = this;
      var isURL = function (u) {
        return (function (u) {
          var _ret_;
          try {
            u = new URL(u);
            _ret_ = true;
          } catch (e) {
            _ret_ = false;
          }
          return _ret_;
        })(u);
      };
      if (!controller.__result_notified__) {

        let clipboard = function (content) {
          var clipboard_content = New(Component, {
            name: "clipboard",
            templateURI: "",
            body: document.createElement("input"),
            tplsource: "none"
          });
          clipboard_content.attachIn("body");
          clipboard_content.body.defaultValue = content;
          clipboard_content.body.select();
          document.execCommand("copy");
          document.body.removeChild(clipboard_content.body);
        };

        clipboard(result);

        NotificationComponent.success(result);
        setTimeout(function () {
          NotificationComponent.success("Copied to clipboard!");
        }, 1500);

        if (isURL(result)) {
          location.href = result;
        }
        controller.showControls();
        controller.__result_notified__ = true;
      }
    },
    showControls() {
      var controller = this;
      let componentRoot = controller.component.shadowRoot.host;
      let elementList = controller.component.shadowRoot.subelements(".controls");
      if (typeof this.__show_controls__ === "undefined") {
        this.__show_controls__ = New(Toggle, {
          negative({
            elementList,
            effect
          }) {
            if (typeof controller.scanner !== "undefined") {
              controller.__result_notified__ = false;
              componentRoot.style.background = "none";
              componentRoot.style.minHeight = "";
              elementList.map(e => effect.apply(e, 1, 0));
              controller.scanner.start();
              Tag(".showControlsSwitch").map(e => e.textContent = "Stop Scanning");
            } else {
              NotificationComponent.warning("Scanner is not available");
            }

          },
          positive({
            elementList,
            effect
          }) {
            if (typeof controller.scanner !== "undefined"){
              controller.__result_notified__ = true;
              componentRoot.style.background = "#111";
              componentRoot.style.minHeight = "1000px";
              componentRoot.style.position = "fixed";
              componentRoot.style.top = "0";
              componentRoot.style.left = "0";
              componentRoot.style.bottom = "0";
              componentRoot.style.right = "0";
              elementList.map(e => effect.apply(e, 0, 1));
              controller.scanner.stop();
              Tag(".showControlsSwitch").map(e => e.textContent = "Start Scanning");
            } else {
              NotificationComponent.warning("Scanner is not available");
            }
          },
          args: {
            elementList: elementList,
            effect: Fade
          }

        });
      }
      return this.__show_controls__.fire();
    },
    done() {
      var controller = this;
      try {
        console.log("Controller QR Scan done");
        global.set("qrControllerInstance", controller);

        let qrscanner_load = function (QRSCANNER) {
          var QRScannerPath = CONFIG.get("qr-scanner-path", "./js/packages/thirdparty/libs/qr-scanner/");
          QRSCANNER.WORKER_PATH = QRScannerPath + "qr-scanner-worker.min.js";
  
  
          // ####### Web Cam Scanning #######
  
          QRSCANNER.hasCamera().then((hasCamera) => {
            if (hasCamera) {
              try {
                var video = controller.component.shadowRoot.subelements("video.qrvideo").pop();
                if (typeof video === "undefined"){
                  NotificationComponent.danger("There is a problem to load the video control");
                } else {
                  NotificationComponent.success("You enabled permission to use the camera");
                  controller.scanner = new QRSCANNER(video, result => controller.setResult( result));
                  controller.scanner.setInversionMode("both");
                  controller.showControls();
                }
              }catch (e){
                NotificationComponent.danger(e.toString());
                console.error(e);
              }
            } else {
              NotificationComponent.danger("You need to allow permission to use the camera in order to use this app");
            }
          });
  
      
        };
  
        controller.loadDependencies(
          function () {
            if (typeof QRSCANNER === "undefined") {
              alert("something wrong");
            } else {
              console.log(QRSCANNER);
              try {
                qrscanner_load(QRSCANNER);
              } catch (e){
                console.error(e);
              }
            }
          });
  
      } catch (e){
        console.error(e);
      }
    }
  })
]);
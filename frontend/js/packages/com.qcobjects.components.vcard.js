"use strict";
Package("com.qcobjects.components.vcard", [
    Class("VCardComponent", Component, {
        name: "vcard",
        template: `
BEGIN:VCARD
VERSION:3.0
PRODID:-//QCObjects.//No Contact App//EN
N:{{lastName}};{{firstName}};;;
FN:{{firstName}} {{lastName}}
ORG:{{organization}};
TITLE:{{title}}
EMAIL;type=INTERNET;type=pref:{{eMail}}
item1.X-ABLabel:_$!<Other>!$_
TEL;type=CELL;type=VOICE;type=pref:{{mobilePhone}}
TEL;type=WORK;type=VOICE:{{mobilePhone}}
TEL:{{phone}}
TEL;type=IPHONE;type=CELL;type=VOICE:{{mobilePhone}}
TEL:{{mobilePhone}}
ADR;type=HOME;type=pref:;;;;;;{{country}}
END:VCARD
    `
    })

]);
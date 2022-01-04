"use strict";
var TypeQuality;
(function (TypeQuality) {
    TypeQuality["jpg"] = "image/jpg";
    TypeQuality["jpeg"] = "image/jpeg";
    TypeQuality["png"] = "image/png";
})(TypeQuality || (TypeQuality = {}));
var CanvasDefault = (function () {
    function CanvasDefault(id) {
        this.id = id;
        this.drawing = false;
        if (!document.getElementById(id)) {
            throw new Error("Element not found ...");
        }
        if (!(document.getElementById(id) instanceof HTMLCanvasElement)) {
            throw new Error("The element of id \"".concat(id, "\" is not a HTMLCanvasElement. Make sure a <canvas id=\"").concat(id, "\"\"> element is present in the document."));
        }
        this.element = document.getElementById(id);
        this.context = this.element.getContext("2d");
        this.addEvents();
    }
    CanvasDefault.prototype.getBase64 = function (type, quality) {
        if (type === void 0) { type = TypeQuality.jpg; }
        if (quality === void 0) { quality = 1; }
        return this.getBase64OrHash(type, quality, false);
    };
    CanvasDefault.prototype.getHash = function (type, quality) {
        if (type === void 0) { type = TypeQuality.jpg; }
        if (quality === void 0) { quality = 1; }
        return this.getBase64OrHash(type, quality, true);
    };
    CanvasDefault.create = function (id) {
        return new CanvasDefault(id);
    };
    CanvasDefault.prototype.addEvents = function () {
        var _this = this;
        this.element.onmousedown = function (e) {
            var _a;
            (_a = _this.context) === null || _a === void 0 ? void 0 : _a.moveTo(e.clientX, e.clientY);
            _this.drawing = true;
        };
        this.element.onmouseup = function (e) {
            _this.drawing = false;
        };
        this.element.onmousemove = function (e) {
            var _a, _b;
            if (_this.drawing) {
                (_a = _this.context) === null || _a === void 0 ? void 0 : _a.lineTo(e.clientX, e.clientY);
                (_b = _this.context) === null || _b === void 0 ? void 0 : _b.stroke();
            }
        };
    };
    CanvasDefault.prototype.getBase64OrHash = function (type, quality, onlyHash) {
        if (type === void 0) { type = TypeQuality.jpg; }
        if (quality === void 0) { quality = 1; }
        if (onlyHash === void 0) { onlyHash = false; }
        var data = this.element.toDataURL(type, quality);
        if (onlyHash) {
            return data.substr(data.indexOf(",") + 1, data.length);
        }
        return data;
    };
    return CanvasDefault;
}());

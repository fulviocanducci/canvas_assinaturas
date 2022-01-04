"use strict";
var TypeQuality;
(function (TypeQuality) {
    TypeQuality["jpg"] = "image/jpg";
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
        this.events();
    }
    CanvasDefault.prototype.getBase64 = function (type, quality) {
        if (type === void 0) { type = TypeQuality.jpg; }
        if (quality === void 0) { quality = 1; }
        return this.element.toDataURL(type, quality);
    };
    CanvasDefault.prototype.getBase64Hash = function (type, quality) {
        if (type === void 0) { type = TypeQuality.jpg; }
        if (quality === void 0) { quality = 1; }
        var data = this.getBase64(type, quality);
        return data.substring(data.indexOf(",") + 1, data.length);
    };
    CanvasDefault.create = function (id) {
        return new CanvasDefault(id);
    };
    CanvasDefault.prototype.events = function () {
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
    return CanvasDefault;
}());

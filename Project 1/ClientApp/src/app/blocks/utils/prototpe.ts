import { NormalizedCacheObject } from 'apollo-cache-inmemory/lib/types';
import { CachePersistor } from 'apollo-cache-persist';
export { } // this will make it module

declare global {
    interface Element {
        pseudoStyle(element, prop, value): any;
    }

    interface String {
        capitalizeWords(): string
    }

    interface Window {
        Element: any;
        // GraphQlCachePersistor: CachePersistor<any>;
        GraphQlCachePersistor: CachePersistor<NormalizedCacheObject>;
    }
}

function capitalizeFirstLetter(word) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

String.prototype.capitalizeWords = function () {
    return this.replace(/\w\S*/g, capitalizeFirstLetter).toString();
};



//---------------------------------------------------------------------------------
//
// pseudoStyle
// @ http://mcgivery.com/htmlelement-pseudostyle-settingmodifying-before-and-after-in-javascript/
//
//---------------------------------------------------------------------------------
var UID = {
    _current: 0,
    getNew: function () {
        this._current++;
        return this._current;
    }
};


// https://stackoverflow.com/a/44671715/3380589
(function (ElementProto: any) {
    if (typeof ElementProto.matches !== 'function') {
        ElementProto.matches = ElementProto.msMatchesSelector || ElementProto.mozMatchesSelector || ElementProto.webkitMatchesSelector || function matches(selector) {
            var element = this;
            var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
            var index = 0;

            while (elements[index] && elements[index] !== element) {
                ++index;
            }

            return Boolean(elements[index]);
        };
    }

    if (typeof ElementProto.closest !== 'function') {
        ElementProto.closest = function closest(selector) {
            var element = this;

            while (element && element.nodeType === 1) {
                if (element.matches(selector)) {
                    return element;
                }

                element = element.parentNode;
            }

            return null;
        };
    }
})(window.Element.prototype);


// @ http://mcgivery.com/htmlelement-pseudostyle-settingmodifying-before-and-after-in-javascript/
Element.prototype.pseudoStyle = function (element, prop, value) {
    var _this = this;

    var _sheetId = "pseudoStyles";
    var _head = document.head || document.getElementsByTagName('head')[0];
    var _sheet = document.getElementById(_sheetId) || document.createElement('style');
    _sheet.id = _sheetId;
    var className = "pseudoStyle" + UID.getNew();

    _this.className += " " + className;

    _sheet.innerHTML += " ." + className + ":" + element + "{" + prop + ":" + value + "}";
    _head.appendChild(_sheet);
    return this;
}
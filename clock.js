var Clock = (function(){

  var exports = function(element) {
    this._element = element;
    this._slots = [];
  };

  exports.prototype = {

    update:function(text) {

      if(this._slots.length == 0) {

        var html = '';
        for (var i=0;i<text.length;i++) {
          if(this._slots.length <= i)
            html += '<span>' + text.charAt(i) + '</span>';
        }
        this._element.innerHTML = html;
        this._slots = this._element.getElementsByTagName('span');

      }

      for(var i = 0; i < this._slots.length; i++) {

        slot = this._slots[i];
        var char = text.charAt(i);
        if(char == "," || char == ".") {

          char == ",";
          slot.classList.add('divider');

        } else {

          slot.classList.remove('divider');

        }
        if(char == "" || !char) char = "0";

        slot.dataset.old = text.charAt(i);
        

      }
    },

    flip:function(slot,value) {

      // setup new state
      slot.classList.remove('flip');
      slot.dataset.old = slot.dataset.now;
      slot.dataset.now = value;

      // force dom reflow
      slot.offsetLeft;

      // start flippin
      slot.classList.add('flip');

    }

  };

  return exports;
}());
/* 
 * Developed by Harun eggleton - Under MIT License
 * jquery 1.8.3
 * jQuery-mutate (https://github.com/jqui-dot-net/jQuery-mutate)
 * jQuery Boilerplate - v3.3.1 ( http://jqueryboilerplate.com ) - Made by Zeno Rocha - Under MIT License
 */


;(function ( $, window, document, undefined ) {
  // Create defaults 
  var pluginName = "heliumParalax",
      defaults = {        
      coeff: 0.9,
      offsetTop: 100,
      offsetBottom: 100,
      offsetLeft: 0,
      offsetRight: 0
  },
  priv = {
      currScroll: false,
      currCenter: false,
      itemScroll: false,
      itemCenter: false,
      paraStart: false,
      paraEnd: false
  };

  function Plugin ( element, options ) {
      this.element = element;
      // use extend to merge contents of defaults, user options, and private variables
      this.vars = $.extend( {}, defaults, options, priv );
      this._defaults = defaults;
      this._priv = priv;
      this._name = pluginName;
      this.init();
  }

  Plugin.prototype = {
//============================================================================
// Init function (All initial logic goes here)
//============================================================================
      init: function () {
        var orig = this;
        this.vars.mid = '#' + this.element.getAttribute("data-mid");

      },

//============================================================================
// openModal function.  
//============================================================================
      openModal: function () {         
        var orig = this;
        this.calcMargin();
      }
  };

    // A lightweight plugin wrapper around the constructor
    $.fn[pluginName] = function ( options ) {
        var args = arguments;
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {
                if (!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
                }
            });
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
            var returns;
            this.each(function () {
                var instance = $.data(this, 'plugin_' + pluginName);
                if (instance instanceof Plugin && typeof instance[options] === 'function') {
                    returns = instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
                }
                if (options === 'destroy') {
                  $.data(this, 'plugin_' + pluginName, null);
                }
            });
            return returns !== undefined ? returns : this;
        }
    };
})( jQuery, window, document );
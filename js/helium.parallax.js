/* 
 * Developed by Harun eggleton - Under MIT License
 * jquery 1.8.3
 * jQuery-mutate (https://github.com/jqui-dot-net/jQuery-mutate)
 * jQuery Boilerplate - v3.3.1 ( http://jqueryboilerplate.com ) - Made by Zeno Rocha - Under MIT License
 */


;(function ( $, window, document, undefined ) {
  // Create defaults 
  var pluginName = "heliumParallax",
      defaults = {        
      coeff: 0.5,   
      paraStart: 200,
      paraEnd: 200,
      hCoeff: 0
  },
  priv = {
      currTop: false,
      currCenter: false,
      itemTop: false,
      itemCenter: false,
      item: false,
      winHeight: false,
      newTop: false,
      newLeft: false,
      startLeft: false,
      startTop: false
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

        this.vars.item = $(this.element).children('.parallax');
        this.vars.itemTop = $(this.vars.item).offset().top;
        this.vars.itemCenter = this.vars.itemTop + (this.vars.item.height() / 2);
        this.vars.paraStart = this.vars.itemTop - this.vars.paraStart;
        this.vars.paraEnd = this.vars.itemTop + this.vars.paraEnd;

        this.vars.startTop = (this.vars.paraStart - this.vars.itemCenter) * this.vars.coeff;
        $(this.vars.item).css('top', this.vars.startTop + 'px');
        this.vars.startLeft = (this.vars.paraStart - this.vars.itemCenter) * this.vars.hCoeff;
        $(this.vars.item).css('left', this.vars.startLeft + 'px');
        $(window).on('scroll resize', function(event) {
            orig.parallax();
        });
      },

//============================================================================
// parallax function.  
//============================================================================
      parallax: function () {         
        var orig = this;
        this.vars.winHeight = $(window).height();
        this.vars.currTop = $(document).scrollTop();
        this.vars.currCenter = this.vars.currTop + (this.vars.winHeight / 2);
        if (this.vars.currCenter > this.vars.paraStart && this.vars.currCenter < this.vars.paraEnd ){
            this.vars.newTop = (this.vars.currCenter - this.vars.itemCenter) * this.vars.coeff;
           $(this.vars.item).css('top',this.vars.newTop + 'px');
            this.vars.newLeft = (this.vars.currCenter - this.vars.itemCenter) * this.vars.hCoeff;
           $(this.vars.item).css('left',this.vars.newLeft + 'px');

        }

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
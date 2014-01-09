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
      hcoeff: 0.9,
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
      item: false,
      paraStart: false,
      paraEnd: false,
      winHeight: false,
      newTop: false
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

        this.vars.winHeight = $(window).height();
        this.vars.item = $(this.element).children('.parallax');
        this.vars.itemScroll = $(this.vars.item).offset().top;
        this.vars.itemCenter = this.vars.itemScroll + (this.vars.item.height() / 2);

        this.vars.paraStart = this.vars.itemCenter - (this.vars.offsetTop*this.vars.coeff);
        this.vars.paraEnd = this.vars.itemCenter + (this.vars.offsetBottom*this.vars.coeff);
$(this.vars.item).css('top', '-' + this.vars.offsetTop + 'px');
        $(window).scroll(function(event) {
            orig.parallax();
        });
      },

//============================================================================
// parallax function.  
//============================================================================
      parallax: function () {         
        var orig = this;
        this.vars.currScroll = $(document).scrollTop();
        this.vars.currCenter = this.vars.currScroll + (this.vars.winHeight / 2);


        if (this.vars.currCenter > this.vars.paraStart && this.vars.currCenter < this.vars.paraEnd ){
            this.vars.newTop = (this.vars.currCenter - this.vars.itemCenter);
           $(this.vars.item).css('top',this.vars.newTop + 'px');

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
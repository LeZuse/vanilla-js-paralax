/**
 * Class for making 3D parallax using CSS transform
 * @author Tomáš Růžička <me@tomasr.com>
 * @version 1.0
 */
var Parallax = function(opt)
{
	this.$container = null;
	this.$layers = $();
	if ( typeof opt === 'object' )
	{
		if ( opt.container )
		{
			this.$container = $(opt.container);
		}

		if ( typeof opt.layers === 'object' && opt.layers.constructor === Array )
		{
			for ( var i = 0, l = opt.layers.length; i < l; ++i )
			{
				var layer = opt.layers[i];
				this.$layers = this.$layers.add($(layer['selector']).data('ratio', layer['ratio']));
			}
		}
	}

	this.init();
};
Parallax.prototype.init = function()
{
	var self = this,
			pos = this.$container.css('position'),
			width = this.$container.width(),
			height = this.$container.height();

	if ( pos !== 'relative' && pos !== 'absolute' )
	{
		this.$container.css('position', 'relative');
	}

	this.$container.bind('mousemove', function(e)
	{
		//console.log('move', e.pageX, this.offsetLeft, this);
		//self.$layers.css('right', - (width - e.pageX) * .08);
		//self.$layers.css('bottom', - (height - e.pageY) * .04);

		self.$layers.each(function(index, element)
		{
			var $this = $(this);
			//$this.css('right', - (width - e.pageX) * $this.data('ratio'));
			var x = (width / 2 - e.pageX) * ($this.data('ratioX') || $this.data('ratio')),
					y = (height / 2 - e.pageY) * ($this.data('ratioY') || $this.data('ratio'));
			$this.css('-webkit-transform', 'translate3d(' + x + 'px,' + y + 'px,0)');
			$this.css('-moz-transform', 'translate(' + x + 'px,' + y + 'px)');
			$this.css('-o-transform', 'translate(' + x + 'px,' + y + 'px)');
		});
	});
};

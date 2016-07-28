define(
	[
		'ge-bootstrap'
	], function($) {
		'use strict';
		/* COLLAPSE CONTAINER PUBLIC CLASS DEFINITION
		 * =============================== */
		var Collapsible = function(element) {
			this.$element = $(element);
			this.$moduleHeader = this.$element.find('.module-header');
			this.$moduleBody = this.$element.find('.module-body');
			this.$moduleFooter = this.$element.find('.module-footer');
			this.init('collapsible', element);
		};

		var DOWNICON = 'icon-chevron-down', RIGHTICON = 'icon-chevron-right';

		Collapsible.prototype = {
			constructor: Collapsible,
			init: function(type, element) {
				this.type = type;
				this.$moduleHeader.prepend('<i class="module-arrow"></i>');
				this.$moduleArrow = this.$element.find('.module-arrow');
				this.$moduleArrow.addClass(this.$moduleBody.hasClass('in') ? DOWNICON : RIGHTICON);
			},
			toggle: function() {
				this.$element.trigger($.Event('toggle'));
				if(this.$moduleBody.hasClass('in'))
				{
					this.hide();
				} else
				{
					this.show();
				}
			},
			show: function() {
				this.$moduleBody.collapse('show');
				this.$moduleFooter.collapse('show');
				this.$moduleArrow.removeClass(RIGHTICON).addClass(DOWNICON);
			},
			hide: function() {
				this.$moduleBody.collapse('hide');
				this.$moduleFooter.collapse('hide');
				this.$moduleArrow.removeClass(DOWNICON).addClass(RIGHTICON);
			}
		};
		/* COLLAPSIBLE PLUGIN DEFINITION
		 * ========================= */
		$.fn.collapsible = function() {
			return this.each(
				function() {
					var module = new Collapsible(this);
					module.$moduleHeader.bind(
						'click', function() {
							module.toggle();
						});
					module.$moduleHeader.find('a').bind(
						'click', function(e) {
							e.stopPropagation();
						});
				});
		};
		$.fn.collapsible.Constructor = Collapsible;
		return $;
	});

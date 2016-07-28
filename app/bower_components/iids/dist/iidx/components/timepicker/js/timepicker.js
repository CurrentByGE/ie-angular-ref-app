require.config(
	{
		shim: {
			'bootstrap-timepicker': ['jquery']
		}
	});

define(
	['jquery', 'oo-utils', 'bootstrap-timepicker'], function($, ooUtils) {

		'use strict';
		//force the widget to show, if the input field is clicked
		/* this is creating duplicate timepicker object. create object only if it does not exist
		 $(".bootstrap-timepicker.input-append input").click(function(e){
		 $( $( e.target ).closest(".input-append") ).timepicker('showWidget');
		 })
		 */
		ooUtils.makePlugin(
			"ge-timepicker", {
				init: function(options, elm) {
					$(elm).timepicker(options);
					return this;
				}
			});

		// to get the border around timepicker field
		var isTouchDevice = 'ontouchstart' in document.documentElement;

		var $timepicker = $('.timepicker');
		if(isTouchDevice)
		{
			$timepicker.attr('type', 'text');
		} else
		{
			$timepicker.timepicker(
				{
					autoclose: false,
					todayBtn: true,
					todayHighlight: true,
					explicitMode: true,
					retainInvalid: true
				});

			var btn = $timepicker
				.next('.btn.add-on');

			if(btn.length == 0)
				btn = $timepicker
					.next('.add-on,.input-group-btn')
					.find(".btn");

			btn.click(
				function() {
					$timepicker.focus();
				});
		}

	});

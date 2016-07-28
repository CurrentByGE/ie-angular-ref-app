require.config(
{
	shim: {
		'bootstrap-datepicker': ['jquery']
	}
});

define(
[
	'jquery',
	'bootstrap-datepicker'
], function($) {
	'use strict';

	var isTouchDevice = 'ontouchstart' in document.documentElement;
	var $datepicker = $('.datepicker');

	if(isTouchDevice)
	{
		$datepicker.attr('type', 'date');
	} else
	{
		$datepicker.datepicker(
		{
			autoclose: false,
			todayBtn: "linked", // Without 'linked' as a value it will not select it, only bring it into view.
			todayHighlight: true
		});
	}

	var btn = $datepicker.next('.btn.add-on');
	if(btn.length==0)
		btn = $datepicker.next('.add-on,.input-group-btn').find(".btn");

	btn.click(
		function() {
			$datepicker.focus();
		});

	return $;
});

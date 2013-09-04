function setupNav() {
	$($('nav a').first().attr('href')).show();

	$('nav a').on('click', function() {
		page = $(this).attr('href');

		$('#settings').hide();
		$('#export').hide();
		$('#import').hide();
		$(page).show();
	});
}

function setupSettings() {
	$('#settings form .setting').each(function() {
		console.log("settings_" + $(this).attr('name') in localStorage);
		if("settings_" + $(this).attr('name') in localStorage) {
			value = localStorage["settings_" + $(this).attr('name')]
		} else {
			value = options[$(this).attr('name')];
		}

		$(this).val(value);
	});

	$('#settings form').on('submit', function() {
		$(this).find('.setting').each(function() {
			localStorage["settings_" + $(this).attr('name')] = $(this).val();
		});

		$(this).find('.message').stop().removeClass('fail').addClass('pass').text( chrome.i18n.getMessage( 'settings_pass' ) ).fadeIn().delay(10000).fadeOut();

		return false;
	});
}

function setupExport() {
	$('#export p').text( chrome.i18n.getMessage( 'export_desc' ) );
	$('#export textarea').val(localStorage["hidden_posts"]);
}

function setupImport() {
	$('#import form').on('submit', function() {
		var success = true,
			hidden_posts = JSON.parse(localStorage["hidden_posts"]),
			status_added = 0,
			status_skipped = 0;

		try {
			import_data = JSON.parse($(this).find('textarea').val());

			$(import_data).each(function(index, value) {
				if($.type(value) == 'number' && $.inArray( value, hidden_posts ) == -1) {
					hidden_posts.push(value);
					status_added += 1;
				} else {
					status_skipped += 1;
				}
			});

			localStorage["hidden_posts"] = JSON.stringify(hidden_posts);
		} catch(error) {
			success = false;
		}

		if(success == true) {
			$('#import form .message').stop().removeClass('fail').addClass('pass').html( chrome.i18n.getMessage( 'import_pass', [status_added, status_skipped] ) ).fadeIn().delay(10000).fadeOut();
		} else {
			$('#import form .message').stop().removeClass('pass').addClass('fail').text( chrome.i18n.getMessage( 'import_fail' ) ).fadeIn().delay(10000).fadeOut();
		}

		$('#import form textarea').val('');

		return false;
	});
}

$('.locale').each(function() {
	$(this).html( chrome.i18n.getMessage( $(this).data('message') ) );
});

setupNav();
setupSettings();
setupExport();
setupImport();
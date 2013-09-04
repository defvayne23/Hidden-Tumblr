function hide_post_opaque(ele) {
	ele.addClass('hidden-tumblr-post hidden-format-opaque');

	ele.find('.post_wrapper').hide();
	ele.find('.hidden-tumblr-wrapper').hide();

	link = $('<div class="hidden-tumblr-unhide"><a href="#">' + chrome.i18n.getMessage('unhide_post') + '</a></div>');
	link.on('click', link_click)
	ele.append(link);

	ele.height( 34 );
}

function unhide_post_opaque(ele) {
	ele.find('.post_wrapper').show();
	ele.find('.hidden-tumblr-wrapper').show();
	ele.find('.hidden-tumblr-unhide').remove();

	ele.removeClass('hidden-tumblr-post hidden-format-opaque');
	ele.height( 'auto' );
}

function hide_post_minimize(ele) {
	ele.addClass('hidden-tumblr-post hidden-format-minimize');

	toggle_show = $('<div class="hidden-tumblr-post-toggle hidden-tumblr-post-show"><span>' + chrome.i18n.getMessage('show_content') + '</span></div>');
	toggle_hide = $('<div class="hidden-tumblr-post-toggle hidden-tumblr-post-hide"><span>' + chrome.i18n.getMessage('hide_content') + '</span></div>');
	
	ele.find('.hidden-tumblr-wrapper').addClass('hidden-tumblr-unhide').find('a').text(chrome.i18n.getMessage('unhide_post'));
	ele.find('.post_content').hide();
	ele.find('.post_content').before(toggle_show);
	ele.find('.post_content').prepend(toggle_hide.clone())
	ele.find('.post_content').append(toggle_hide);

	ele.find('.hidden-tumblr-post-show').on('click', function() {
		ele = $(this).parent('.post_wrapper');

		$(this).hide();
		ele.find('.post_content').show();
	});

	ele.find('.hidden-tumblr-post-hide').on('click', function() {
		$(this).parent('.post_content').hide();
		$(this).parent().parent().find('.hidden-tumblr-post-show').show();
	});
}

function unhide_post_minimize(ele) {
	ele.removeClass('hidden-tumblr-post hidden-format-minimize');

	ele.find('.hidden-tumblr-wrapper').removeClass('hidden-tumblr-unhide').find('a').text(chrome.i18n.getMessage('hide_post'));
	ele.find('.post_content').show();
	ele.find('.hidden-tumblr-post-toggle').remove();
}

function hide_post_remove(ele) {
	ele.hide();
}
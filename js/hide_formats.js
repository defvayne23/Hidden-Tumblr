function hide_post_opaque(ele) {
	ele.find('.post_wrapper').empty();
	ele.find('.hidden-tumblr-wrapper').remove();
	ele.find('.tumblelog_menu').remove();

	ele.addClass('hidden-tumblr-post hidden-format-opaque');
	ele.height( 65 );
	ele.css( "padding", "0" );
}

function hide_post_minimize(ele) {
	ele.addClass('hidden-tumblr-post');
	ele.find('.post_content').hide();
}

function hide_post_remove(ele) {
	ele.remove();
}
var hidden_posts = [],
	hide_format = "opaque";

function check_posts() {
	$('#posts .post:not(.hidden-tumblr-traversed)').not('.new_post_buttons').each(function() {
		if( $.inArray( $(this).data('root-id'), hidden_posts ) > -1 ) {
			hide_post( $(this) );
		} else {
			add_hide_link( $(this) );
		}

		$(this).addClass('hidden-tumblr-traversed');
	});
}

function add_hide_link(ele) {
	link = $('<div class="hidden-tumblr-wrapper"><a href="#">' + chrome.i18n.getMessage('hide_post') + '</a></div>');

	link.on('click', function() {
		var post = $(this).parent();
		
		hidden_posts.push( post.data('root-id') );

		chrome.extension.sendRequest({method: "set", key: "hidden_posts", value: JSON.stringify(hidden_posts)});

		hide_post(post);

		return false;
	});

	ele.append(link);
}

function hide_post(ele) {
	switch(hide_format) {
		case "minimize":
			hide_post_minimize(ele);
			break;
		case "remove":
			hide_post_remove(ele);
			break;
		case "opaque":
			hide_post_opaque(ele);
			break;
	}
	
}

chrome.extension.sendRequest({method: "get", key: "settings_format"}, function(response) {
	if(response.data != undefined && response.data != "") {
		hide_format = response.data;
	}
});

chrome.extension.sendRequest({method: "get", key: "hidden_posts"}, function(response) {
	if(response.data != undefined && response.data != "") {
		hidden_posts = JSON.parse(response.data);
	}

	check_posts();
});

setInterval("check_posts();", 500);
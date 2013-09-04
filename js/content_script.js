function check_posts() {
	$('#posts .post:not(.hidden-tumblr-traversed)').not('.new_post_buttons').each(function() {
		add_hide_link( $(this) );
		
		if( $.inArray( $(this).data('root-id'), hidden_posts ) > -1 ) {
			hide_post( $(this) );
		}

		$(this).addClass('hidden-tumblr-traversed');
	});
}

var link_click = function() {
	var post = $(this).parent();

	if(!$(this).hasClass('hidden-tumblr-unhide')) {
		hidden_posts.push( post.data('root-id') );
		chrome.extension.sendRequest({method: "set", key: "hidden_posts", value: JSON.stringify(hidden_posts)});
		hide_post(post);
	} else {
		hidden_posts.splice( hidden_posts.indexOf( post.data('root-id') ), 1 );
		chrome.extension.sendRequest({method: "set", key: "hidden_posts", value: JSON.stringify(hidden_posts)});
		unhide_post(post);
	}

	return false;
};

function add_hide_link(ele) {
	link = $('<div class="hidden-tumblr-wrapper"><a href="#">' + chrome.i18n.getMessage('hide_post') + '</a></div>');

	link.on('click', link_click);

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

function unhide_post(ele) {
	switch(hide_format) {
		case "minimize":
			unhide_post_minimize(ele);
			break;
		case "remove":
			unhide_post_remove(ele);
			break;
		case "opaque":
			unhide_post_opaque(ele);
			break;
	}
}

chrome.extension.sendRequest({method: "get", key: "settings_format"}, function(response) {
	if(response.data != undefined && response.data != "") {
		hide_format = response.data;
	} else {
		hide_format = options["format"];
	}
});

chrome.extension.sendRequest({method: "get", key: "hidden_posts"}, function(response) {
	if(response.data != undefined && response.data != "") {
		hidden_posts = JSON.parse(response.data);
	} else {
		hidden_posts = [];
	}

	check_posts();
});

setInterval("check_posts();", 500);
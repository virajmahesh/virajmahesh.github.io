// Executed when page loads
$(document).ready(function() {

	/* Enabling the menu-bar to toggle */
	var hidden = true;
	var menuWidth = "200px";
	var collapsedWidth = "60px";

	$("#menu").width(collapsedWidth); // Menu is initially collapsed
	$(".menu-text").hide();
	//$("#content-container").css('left', $("#menu").width());

	/* Callback every time the mouse position changes */
	$(document).bind("mousemove", function(e) {
		/* Toggling menu bar if necessary */
		if (e.pageX < 60 && hidden) {
			$("#menu").animate({width: menuWidth});
			$(".menu-text").width(menuWidth);
			$(".menu-text").show();
			//$("#content-container").animate({'left': 200});
			hidden = false;
		}
		else if(e.pageX > 200 && !hidden) {
			$("#menu").animate({width: collapsedWidth});
			$(".menu-text").hide();
			//$("#content-container").animate({'left': 60});
			hidden = true;
		}
	});

});
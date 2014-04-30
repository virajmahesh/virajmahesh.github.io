// Executed when page loads
$(document).ready(function() {
	var menu = new Menu(); // Creating a new menu
	var content = new Content(); // Create a new content
});

function Menu() {
	// Get a handle to elements
	Menu.menu = $("#menu");
	Menu.toggle = $(".menu-image");
	Menu.menuItems = $(".menu-text");

	// Setting the menu properties
	Menu.collapsedWidth = "60px";
	Menu.expandedWidth = "225px";
	Menu.hidden = true;

	// The menu is initially collapsed
	Menu.menu.width(Menu.collapsedWidth);
	Menu.setCallback();
	Menu.menuItems.hide();
}

Menu.collapse = function() {
	Menu.menu.animate({width: Menu.collapsedWidth});
	Menu.menuItems.hide();
}

Menu.expand = function() {
	Menu.menu.animate({width: Menu.expandedWidth});
	Menu.menuItems.show();
}

Menu.setCallback = function() {
	Menu.toggle.mouseover(function() {
		if (Menu.hidden) {
			Menu.expand();
			Menu.hidden = false;
			Content.dim();
		}
	});
	Menu.menu.mouseleave(function() {
		if (!Menu.hidden) {
			Menu.collapse();
			Menu.hidden = true;
			Content.light();
		}
	});
}

Content = function() {
	Content.contentContainer = $("#content-container");
	Content.contentOverlay = $("#content-overlay");
}

Content.dim = function() {
	Content.contentOverlay.fadeTo("fast", opacity=0.6);
}

Content.light = function() {
	Content.contentOverlay.fadeTo("fast", opacity=0.0);
}


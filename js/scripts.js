// Executed when page loads
$(document).ready(function() {
	var menu = new Menu(); // Creating a new menu
	var content = new Content(); // Create a new content
});

Menu = function() {
	// Get a handle to elements
	Menu.menu = $("#menu");

	// Setting the menu properties
	Menu.collapsedWidth = "60px";
	Menu.expandedWidth = "225px";
	Menu.hidden = true;

	// The menu is initially collapsed
	Menu.menu.width(Menu.collapsedWidth);
	Menu.populateMenuItems();
	Menu.setCallback();
};

Menu.collapse = function() {
	Menu.menu.animate({width: Menu.collapsedWidth});
	MenuItem.hide(Menu.items);
};

Menu.expand = function() {
	Menu.menu.animate({width: Menu.expandedWidth});
	MenuItem.show(Menu.items);
};

Menu.setCallback = function() {
	$(document).mousemove(function(event) {
		if (Menu.hidden && event.pageX <= 60) {
			Menu.expand();
			Menu.hidden = false;
			Content.dim();
		}
		else if (!Menu.hidden && event.pageX >= 225) {
			Menu.collapse();
			Menu.hidden = true;
			Content.light();
		}
	});
};

Menu.populateMenuItems = function() {
	var allItems = $(".item-container");
	Menu.items = new Array();
	allItems.toArray().forEach(function(elem, index, array) {
		Menu.items.push(new MenuItem(elem)); // Create a new MenuItem out of the element
	});
};

// Represents the page content
Content = function() {
	Content.contentContainer = $("#content-container");
	Content.contentOverlay = $("#content-overlay");
};

Content.dim = function() {
	Content.contentOverlay.fadeTo("fast", opacity=0.6);
};

Content.light = function() {
	Content.contentOverlay.fadeTo("fast", opacity=0.0);
};

// Represents a menu item
MenuItem = function(object) {
	this.object = $(object);
	this.allChildren = this.object.children();
	this.image = this.object.children(".menu-image");
	this.text = this.object.children(".menu-text");

	this.setCallback();
};

MenuItem.prototype.darkenBackground = function() {
	this.object.css("background-color", "rgb(29, 29, 50)");
};

MenuItem.prototype.setCallback = function() {
	var that = this;

	this.object.mouseenter(function() {
		that.darkenBackground();
	});

	this.object.mouseleave(function() {
		that.object.css("background-color", "rgb(51, 51, 102)");
	});
};

// Hide an entire list of MenuItems
MenuItem.hide = function(itemList) {
	itemList.forEach(function(elem, index, array) {
		elem.hide();
	});
};

// Hide this object
MenuItem.prototype.hide = function() {
	this.text.hide();
}

// Show an entire list of MenuItems
MenuItem.show = function(itemList) {
	itemList.forEach(function(elem, index, array) {
		elem.show();
	});
};

// Show this object
MenuItem.prototype.show = function() {
	this.text.show();
}


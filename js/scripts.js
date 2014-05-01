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
			MenuItem.revertActive(Menu.items);
		}
		else if (!Menu.hidden && event.pageX >= 225) {
			Menu.collapse();
			Menu.hidden = true;
			Content.light();
			MenuItem.invertActive(Menu.items);
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
	this.allChildren = this.object.children().children();
	this.image = this.object.children().children(".menu-image");
	this.text = this.object.children().children(".menu-text");

	this.setCallback();

	MenuItem.allItems = MenuItem.allItems || new Array();
	MenuItem.allItems.push(this); // Add this to list of all items

	this.inverted = false;
	this.active = false;

	if(this.object.hasClass("active")) { // Invert an active object
		this.active = true;
		this.invert();
	}
};

MenuItem.prototype.darkenBackground = function() {
	this.object.css("background-color", "rgb(29, 29, 50)");
};

MenuItem.prototype.lightenBackground = function() {
	this.object.css("background-color", "rgb(51, 51, 102)");
};

MenuItem.prototype.setCallback = function() {
	var that = this;

	this.object.mouseenter(function() {
		that.revert();
		that.darkenBackground();
	});

	this.object.mouseleave(function() {
		that.lightenBackground();
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
};

MenuItem.prototype.invert = function() {
	if (!this.inverted)	{
		this.object.css("background-color", "rgb(256, 256, 256)");
		var newSrc = this.image.attr("src").replace(".png", "-invert.png");
		this.image.attr("src", newSrc);
		this.inverted = true;
	}
};

MenuItem.prototype.revert = function() {
	if (this.inverted) {
		this.object.css("background-color", "rgb(51, 51, 102)");
		var newSrc = this.image.attr("src").replace("-invert.png", ".png");
		this.image.attr("src", newSrc);
		this.inverted = false;
	}
};

MenuItem.invertActive = function(itemList) {
	itemList.forEach(function(elem, index, array) {
		if (elem.active) {
			elem.invert();
		}
	});
};

MenuItem.revertActive = function(itemList) {
	itemList.forEach(function(elem, index, array) {
		if (elem.active) {
			elem.revert();
		}
	});
}


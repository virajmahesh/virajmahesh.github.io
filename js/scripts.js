// Executed when page loads
$(document).ready(function() {
	var menu = new Menu(); // Creating a new menu
});

Menu = function() {
	// Get a handle to elements
	this.menu = $("#menu");
	this.content = $("#content-container");
	this.toggle = $("#menu-toggle");

	this.collapsedWidth = "60px";
	this.expandedWidth = "225px";
	this.hidden = true;

	this.menu.width(this.collapsedWidth);
	this.content.css('left', this.collapsedWidth);
	this.setCallback();
}

Menu.prototype.collapse = function() {
	this.menu.animate({width: this.collapsedWidth});
	this.content.animate({left: this.collapsedWidth});
}

Menu.prototype.expand = function() {
	this.menu.animate({width: this.expandedWidth});
	this.content.animate({left: this.expandedWidth});
}

Menu.prototype.setCallback = function() {
	var that = this;
	this.toggle.click(function() {
		console.log("clicked");
		if (that.hidden) {
			that.expand();
			that.hidden = false;
		}
		else if (!that.hidden) {
			console.log("expanded");
			that.collapse();
			that.hidden = true;
		}
	});
}


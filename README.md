# Navigate
*Animated navigation on one-pagers using anchors.*

When scrolling through a page, the package will update the location address, depending on which section is in view (halfway up the screen).
When an anchor is clicked, it smoothly scrolls into position.


### Installation
```
npm install @wearejust/navigate --save
```

### Usage
```javascript
var Navigate = require('@wearejust/navigate');

$(function() {
    Navigate.init();
});
```

#### With options
```javascript
var Navigate = require('@wearejust/navigate');

$(function() {
    Navigate.init({
        active: 'active',           // Class that is set on active item
        history: true,              // Enable changing of location address
        item: '.navigate-item',     // Item selector
        prefix: 'navigate-',        // Prefix anchor target to enable animation
        replace: false,             // Replace location history, instead of adding
        resetAtTop: true,           // Clears location address at the top of the page
        offset: true,               // Add or subtract offset for the scroll destination
        speed: 500                  // Set animation speed in milliseconds
    });
});
```

#### HTML
```html
Navigation
<a class="navigate-item" href="#section-1">Section 1</a>
<a class="navigate-item" href="#section-2">Section 2</a>
<a class="navigate-item" href="#section-3">Section 3</a>

Content
<div id="section-1">...</div>
<div id="section-2">...</div>
<div id="section-3">...</div>
```
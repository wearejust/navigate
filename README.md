# navigate.js

### Installation
```
npm install navigate.js --save
```

### Usage
```javascript
var Navigate = require('navigate.js');

$(function() {
    Navigate.init();
});
```

#### With options
```javascript
var Navigate = require('navigate.js');

$(function() {
    Navigate.init({
        active: 'active',
        history: true,
        item: '.navigate-item',
        prefix: 'navigate-',
        replace: false
    });
});
```
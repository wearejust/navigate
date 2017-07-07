# navigate.js

### Installation
```
npm install @wearejust/navigate --save
```

### Usage
```javascript
var Navigate = require('@wearejust/navigate.js');

$(function() {
    Navigate.init();
});
```

#### With options
```javascript
var Navigate = require('@wearejust/navigate.js');

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
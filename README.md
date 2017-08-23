# Navigate

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
        active: 'active',
        history: true,
        item: '.navigate-item',
        prefix: 'navigate-',
        replace: false,
        resetAtTop: true
    });
});
```
kindle-clippings-parser
=======================

Parse My Clippings.txt through streams

## Usage

```javascript
var fs = require('fs');
var klipper = require('kindle-clippings-parser');

var clippings = fs.createReadStream('My Clippings.txt', { encoding: 'utf8' });

klipper(clippings)
  .on('data', function(section) {
    // JSON section
  })
  .on('end', function(err) {
    // Finished
  });
```

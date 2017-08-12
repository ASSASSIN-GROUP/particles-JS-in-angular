// require all modules ending in ".spec" from the
// current directory and all subdirectories
/*jshint strict:false */
var testsContext = require.context('.', true, /.spec$/);
testsContext.keys().forEach(testsContext);

// adds the application to the bundle.
require('./particles'); 

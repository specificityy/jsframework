## JS Framework and Testing Library

Lines of code:
* 1-60 Framework.
* 64-113 for a simple testing module.
* The rest are integration tests.

### How to run it

Just double click index.html no web server needed or anything, it can run off from file://

### About the Framework

I'm providing a public method callded `create()` on the Framework, and also exposing a `compileTemplate()` method which jsut compiles a template and doesn't wire up the event handlers, I mainly did this so I could test the compiling functionality.

I'm using an IIFE for creating the Framework module using the revealing module pattern and a bit of functional programming. I tried to keep the functions as pure as I could, apply composition with a declarative style.

Every compiled template is cached using the template Id and the data object as the key.

For the compilation itself, I'm using a regular expression which looks for the pattern: `{{expression}}`, any whitespace before or after `expression` is ignored. The expression could be a property name in the data object or it could well be a JS expression which will be called as a function. It has to be valid JS or a valid property inside the data, I'm not doing much of an invalid input check on this part.

After the compilation, I'm calling the `setEventHandlers()` method which just loops through the rendered template's elements with a `data-event` attribute and attaches the event handlers. It's worth nothing that this is a limitation of the Framework, since only one event can be listened to, so this function isn't generic.

This is just to keep things simple for now, but one option for a more generic approach would be to have the event name in the attribute itself like 'data-click' for instance, and loop through all those 'data-' attributes rather than just looking for data-event.


### Testing library

The testing module adds the object `Tests` to the global scope containing the mainstream unit testing methods: `describe()`, `it()`, `expect()`. Which do what you'd expect them to do. `expect()` only has one extension method: `toBe()`.

For now, if a test fails, all others after it will fail as well.

The tests are executed in the browser's console.

There's also an `add()` method for adding tests to the testing suite. And a `run()` method which runs the tests incuded in the suite. The results are displayed in the browser console.

Test example:
```javascript
Tests.add(() => {
  Tests.describe('Basic arithmetic', () => {

    Tests.it('should add 1 + 1', () => {
      Tests.expect(1 + 1).toBe(2);
    });
    
    Tests.it('should multiply 2 * 2', () => {
      Tests.expect(2 * 2).toBe(4);
    });
  })
});
```

 If you want a test to be run immediately, just don't wrap the `describe()` in a function and pass it directly to `add()`:
 
 ```javascript
Tests.add(
  Tests.describe('Basic arithmetic', () => {
    Tests.it('should add 1 + 1', () => {
      Tests.expect(1 + 1).toBe(2);
    });
  })
);
```
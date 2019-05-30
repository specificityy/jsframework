// Integration tests for the two public methods of the Framwork
Tests.add(() => {
  Tests.describe('Framework.compileTemplate() function', () => {

    Tests.it('should compile a template', () => {

      // creates a div with a template to be compiled
      const div = document.createElement('div');
      div.innerHTML = '<span>{{name}}</span>';
      div.id = 'foo';
      div.hidden = true;
      document.documentElement.appendChild(div);

      // compiles the template and asserts the result
      const compiled = Framework.compileTemplate({ template: '#foo', data: { name: 'Jane Doe'} });
      Tests.expect(compiled).toBe('<span>Jane Doe</span>');

      // clean up
      div.remove();
    });

	Tests.it('should compile a template with an expression', () => {

      // creates a div with a template to be compiled
      const div = document.createElement('div');
      div.innerHTML = '<span>{{2 + 2}}</span>';
      div.id = 'foo';
      div.hidden = true;
      document.documentElement.appendChild(div);

      // compiles the template and asserts the result
      const compiled = Framework.compileTemplate({ template: '#foo', data: {} });
      Tests.expect(compiled).toBe('<span>4</span>');

      // clean up
      div.remove();
    });

	
  })
});

Tests.add(() => {
  Tests.describe('Framework.create() function', () => {

    Tests.it('should render a template and set the event handlers', () => {

      // creates a div to hold the compiled template
      const div = document.createElement('div');
      div.id = 'foo';
      div.hidden = true;
      document.documentElement.appendChild(div);

      // creates the template on a script tag
      const script = document.createElement('script');
      script.innerHTML = '<span>{{name}}</span><button data-event="click:changeName"></button>';
      script.id = 'bar';
      script.type = 'template/framework';
      document.documentElement.appendChild(script);

      // bootstraps the framework and then renders it
      const fw = Framework.create({
        template: '#bar',
        data: { name: 'Jane Doe'},
        changeName: _ => document.querySelector('#foo span').innerHTML = 'Jane Smith'
      });

      fw.render('#foo');

      // triggers a click to check that the events are handled
      document.querySelector('#foo button').click();
      Tests.expect(div.innerHTML).toBe('<span>Jane Smith</span><button data-event="click:changeName"></button>');

      // clean up
      div.remove();
      script.remove();
    });

  })
});

console.group('%c Spec tests', 'color:mediumblue');
Tests.run();
console.groupEnd('Spec tests');

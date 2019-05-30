const tests = import('./Framework.test.js');

const Framework = (function() {
  const cache = {};

  return {
    create: create,
    compileTemplate: compileTemplate
  }

  function create(opts) {
    const curriedRender = render.bind(null, opts);
    return {
      render: curriedRender
    }
  }

  function render(opts, selector) {
    const compiled = compileTemplate(opts);
    document.querySelector(selector).innerHTML = compiled;
    setEventHandlers(opts, selector);
  }

  function compileTemplate({ template, data }) {
    const cached = cache[getTemplateCacheId(template, data)];
    if (cached)
      return cached;

    return data ? replaceTemplateTokens(template, data) : replaceTemplateTokens;
  };

  function getTemplateCacheId(template, data) {
    return template + JSON.stringify(data);
  }

  function replaceTemplateTokens(template, data) {
    const templateHtml = document.querySelector(template).innerHTML;
    const doubleCurlyBracesRegEx = /({{\s*)((.|\n)*?)(\s*}})/g;
    const compiled = templateHtml.replace(doubleCurlyBracesRegEx, getTokenReplacingValue.bind(null, data));
    cache[getTemplateCacheId(template, data)] = compiled;

    return compiled;
  }

  function getTokenReplacingValue(obj, match, p1, p2) {
    const isExpression = typeof obj[p2] === 'undefined';

    if (isExpression)
      return new Function('return ' + p2)();

    return obj[p2];
  };

  function setEventHandlers(opts, selector) {
    const nodes = document.querySelectorAll(selector + ' [data-event]');
    nodes.forEach(node => {
      const [eventName, handler] = node.getAttribute('data-event').split(':');
      node.addEventListener(eventName, opts[handler]);
    });
  }
})();

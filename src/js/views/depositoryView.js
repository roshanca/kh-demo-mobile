define(['utils'], function (Utils) {

  function render(params) {
    var template = $$('#depositoryTemplate').html();
    var compiledTemplate = Template7.compile(template);
    var renderTemplate = compiledTemplate({bankList: params.model});

    $$('#depositoryContent').html(renderTemplate);
    Utils.bindEvents(params.bindings);
  }

  return {
    render: render
  };
});

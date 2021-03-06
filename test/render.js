var expect = require('expect.js'),
    parse = require('../lib/parse'),
    render = require('../lib/render');

var html = function(str, options) {
  options = options || {};
  var dom = parse(str, options);
  return render(dom);
};

describe('render', function() {

  describe('(html)', function() {

    it('should render <br /> tags correctly', function() {
      var str = '<br />';
      expect(html(str)).to.equal('<br>');
    });

    it('should shorten the "checked" attribute when it contains the value "checked"', function() {
      var str = '<input checked/>';
      expect(html(str)).to.equal('<input checked>');
    });

    it('should not shorten the "name" attribute when it contains the value "name"', function() {
      var str = '<input name="name"/>';
      expect(html(str)).to.equal('<input name="name">');
    });

    it('should render comments correctly', function() {
      var str = '<!-- comment -->';
      expect(html(str)).to.equal('<!-- comment -->');
    });

    it('should render whitespace by default', function() {
      var str = '<a href="./haha.html">hi</a> <a href="./blah.html">blah</a>';
      expect(html(str)).to.equal(str);
    });

    it('should ignore whitespace if specified', function() {
      var str = '<a href="./haha.html">hi</a> <a href="./blah.html">blah  </a>';
      expect(html(str, {ignoreWhitespace: true})).to.equal('<a href="./haha.html">hi</a><a href="./blah.html">blah  </a>');
    });

  });

});

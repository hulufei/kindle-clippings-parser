var fs = require('fs');
var test = require('tape');
var parser = require('../');

test('Functional tests', function(assert) {
  var sections = [];
  var expected = [
    {
      title: 'My Clippings.txt include BOM',
      content: '',
      type: 'Bookmark',
      loc: '21',
      date: '星期六, 十月 30, 2010, 05:56 上午'
    },
    {
      title: 'book title',
      content: 'highlight content',
      type: 'Highlight',
      loc: '695-97',
      date: '星期一, 十二月 05, 2011, 11:43 下午'
    },
    {
      title: 'test-note',
      content: 'funny',
      type: 'Note',
      loc: '5697',
      date: '星期一, 十一月 08, 2010, 10:28 上午'
    }
  ];
  var clippings = fs.createReadStream(__dirname + '/clippings.txt', { encoding: 'utf8' });
  parser(clippings)
    .on('data', function(data) {
      sections.push(data);
    })
    .on('end', function(err) {
      // Assert that err is falsy. If err is non-falsy, use its err.message as the description message.
      assert.error(err, 'Parsed without error');
      assert.equal(sections.length, expected.length, 'Extracted expected number of sections');
      for (var i = 0; i < expected.length; i++) {
        assert.deepEqual(sections[i], expected[i]);
      }
      assert.end();
    });
});

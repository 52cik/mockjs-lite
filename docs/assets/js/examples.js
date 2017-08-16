(function (window) {
  // 别名，一遍控制台测试
  window.Mock = Mock.Mock;
  window.Random = Mock.Random;

  // 菜单
  var menuList = [
    {
      label: '数据模板定义',
      children: [
        { label: 'String', href: '#String' },
        { label: 'Number', href: '#Number' },
        { label: 'Boolean', href: '#Boolean' },
        { label: 'Object', href: '#Object' },
        { label: 'Array', href: '#Array' },
        { label: 'Function', href: '#Function' },
      ],
    },
    {
      label: '数据占位符定义',
      children: [
        {
          label: 'Basic',
          children: [
            { label: 'integer', href: '#Random.integer' },
            { label: 'float', href: '#Random.float' },
            { label: 'boolean', href: '#Random.boolean' },
            { label: 'character', href: '#Random.character' },
            { label: 'string', href: '#Random.string' },
            { label: 'range', href: '#Random.range' },
          ],
        },
        {
          label: 'Date',
          children: [
            { label: 'date', href: '#Random.date' },
            { label: 'time', href: '#Random.time' },
            { label: 'datetime', href: '#Random.datetime' },
            { label: 'now', href: '#Random.now' },
          ],
        },
        {
          label: 'Image',
          children: [
            { label: 'image', href: '#Random.image' },
            { label: 'setImageHost', href: '#Random.setImageHost' },
          ],
        },
        {
          label: 'Color',
          children: [
            { label: 'color', href: '#Random.color' },
            { label: 'hex', href: '#Random.hex' },
            { label: 'rgb', href: '#Random.rgb' },
            { label: 'rgba', href: '#Random.rgba' },
            { label: 'hsl', href: '#Random.hsl' },
          ],
        },
        {
          label: 'Text',
          children: [
            { label: 'word', href: '#Random.word' },
            { label: 'sentence', href: '#Random.sentence' },
            { label: 'paragraph', href: '#Random.paragraph' },
            { label: 'title', href: '#Random.title' },
            { label: 'cword', href: '#Random.cword' },
            { label: 'csentence', href: '#Random.csentence' },
            { label: 'cparagraph', href: '#Random.cparagraph' },
            { label: 'ctitle', href: '#Random.ctitle' },
          ],
        },
        {
          label: 'Name',
          children: [
            { label: 'first', href: '#Random.first' },
            { label: 'last', href: '#Random.last' },
            { label: 'name', href: '#Random.name' },
            { label: 'cfirst', href: '#Random.cfirst' },
            { label: 'clast', href: '#Random.clast' },
            { label: 'cname', href: '#Random.cname' },
          ],
        },
        {
          label: 'Web',
          children: [
            { label: 'protocol', href: '#Random.protocol' },
            { label: 'tld', href: '#Random.tld' },
            { label: 'domain', href: '#Random.domain' },
            { label: 'email', href: '#Random.email' },
            { label: 'ip', href: '#Random.ip' },
          ],
        },
        {
          label: 'Address',
          children: [
            { label: 'region', href: '#Random.region' },
            { label: 'province', href: '#Random.province' },
            { label: 'city', href: '#Random.city' },
            { label: 'county', href: '#Random.county' },
            { label: 'zip', href: '#Random.zip' },
          ],
        },
        {
          label: 'Helper',
          children: [
            { label: 'capitalize', href: '#Random.capitalize' },
            { label: 'upper', href: '#Random.upper' },
            { label: 'lower', href: '#Random.lower' },
            { label: 'shuffle', href: '#Random.shuffle' },
          ],
        },
        {
          label: 'Miscellaneous',
          children: [
            { label: 'uuid', href: '#Random.uuid' },
            { label: 'id', href: '#Random.id' },
            { label: 'increment', href: '#Random.increment' },
            { label: 'mobile', href: '#Random.mobile' },
          ],
        },
      ],
    },
  ];

  function isString(value) {
    return Object.prototype.toString.call(value) === '[object String]';
  }

  var app = new Vue({
    el: '#app',

    data: {
      DTD: DTD,
      menuList: menuList,
    },

    methods: {
      // 高亮渲染
      highlight: function(value, lang) {
        if (!isString(value)) {
          value = JSON.stringify(value, null, '  ');
        }
        var ret = hljs.highlight(lang || 'json', value, true);
        return ret.value;
      },

      // 显示源码
      showSource: function(value) {
        return 'Mock.mock(' + this.highlight(value, 'js') + ');';
      },

      // 显示 mock 结果
      showResult: function(value) {
        if (!value.$orgData) {
          var data = isString(value)
            ? (new Function('return ' + value))()
            : JSON.parse(JSON.stringify(value));
          value.$orgData = data; // 绑定原始数据
        }
        return this.highlight(Mock.mock(value.$orgData));
      },

      // 刷新
      onRefresh: function(value, event) {
        var target = event.target;

        if (target.tagName === 'I') {
          target = target.parentElement.parentElement;
        } else if (target.tagName === 'SPAN') {
          target = target.parentElement;
        }

        var code = target.previousElementSibling.children[0];
        code.innerHTML = this.showResult(value);
      }
    }
  });
})(window);

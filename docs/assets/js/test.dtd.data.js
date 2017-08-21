(function(window) {
  /* 数据模板定义 (Data Temaplte Definition，DTD) */
  window.DTD = [
    {
      "label": "String",
      "demos": [
        {
          "title": "'name|min-max': string",
          "test": [
            {
              "string|1-10": "★"
            },
            {
              "string|1-10": ""
            }
          ]
        },
        {
          "title": "'name|count': string",
          "test": [
            {
              "string|3": "★★★"
            },
            {
              "string|5": ""
            }
          ]
        }
      ]
    },
    {
      "label": "Number",
      "demos": [
        {
          "title": "'name|+1': number",
          "test": [
            {
              "number|+1": 100
            }
          ]
        },
        {
          "title": "'name|min-max': number",
          "test": [
            {
              "number|1-100": 100
            }
          ]
        },
        {
          "title": "'name|min-max.dmin-dmax': number",
          "test": [
            {
              "number|1-100.1-10": 1
            },
            {
              "number|123.1-10": 1
            },
            {
              "number|123.3": 1
            },
            {
              "number|123.10": 1.123
            }
          ]
        }
      ]
    },
    {
      "label": "Boolean",
      "demos": [
        {
          "title": "'name|1': boolean",
          "test": [
            {
              "boolean|1": true
            },
            {
              "boolean|10": true
            }
          ]
        },
        {
          "title": "'name|min-max': boolean",
          "test": [
            {
              "boolean|1-5": true
            }
          ]
        }
      ]
    },
    {
      "label": "Object",
      "demos": [
        {
          "title": "'name|count': object",
          "test": [
            {
              "object|2": {
                "310000": "上海市",
                "320000": "江苏省",
                "330000": "浙江省",
                "340000": "安徽省"
              }
            }
          ]
        },
        {
          "title": "'name|min-max': object",
          "test": [
            {
              "object|2-4": {
                "110000": "北京市",
                "120000": "天津市",
                "130000": "河北省",
                "140000": "山西省"
              }
            }
          ]
        }
      ]
    },
    {
      "label": "Array",
      "demos": [
        {
          "title": "'name|1': array",
          "test": [
            {
              "array|1": [
                "AMD",
                "CMD",
                "UMD"
              ]
            }
          ]
        },
        {
          "title": "'name|+1': array",
          "test": [
            {
              "array|+1": [
                "AMD",
                "CMD",
                "UMD"
              ]
            },
            {
              "array|1-10": [
                {
                  "name|+1": [
                    "Hello",
                    "Mock.js",
                    "!"
                  ]
                }
              ]
            }
          ]
        },
        {
          "title": "'name|min-max': array",
          "test": [
            {
              "array|1-10": [
                "Mock.js"
              ]
            },
            {
              "array|1-10": [
                "Hello",
                "Mock.js",
                "!"
              ]
            }
          ]
        },
        {
          "title": "'name|count': array",
          "test": [
            {
              "array|3": [
                "Mock.js"
              ]
            },
            {
              "array|3": [
                "Hello",
                "Mock.js",
                "!"
              ]
            }
          ]
        }
      ]
    },
    {
      label: "Function",
      demos: [
        {
          title: "'name': function",
          test: [
            new String(
              "{\n" +
              "  foo: 'Syntax Demo',\n" +
              "  name: function() {\n" +
              "    return this.foo;\n" +
              "  },\n" +
              "}"
            ),
            new String(
              "{\n" +
              "  'num1|1-10': 1,\n" +
              "  'num2|1-10': 1,\n" +
              "  sum: function() {\n" +
              "    return this.num1 + this.num2;\n" +
              "  },\n" +
              "}"
            ),
            new String(
              "{\n" +
              "  bar: {\n" +
              "    foo: 'inner',\n" +
              "    name(root) {\n" +
              "      return `this: ${this.foo}, root: ${root.foo}`;\n" +
              "    },\n" +
              "  },\n" +
              "  foo: 'outer',\n" +
              "}"
            )
          ]
        }
      ]
    }
  ];
})(window);

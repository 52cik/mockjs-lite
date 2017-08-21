(function(window) {
  /* 数据占位符定义 (Data Placeholder Definition，DPD) */
  window.DPD = [
    {
      "label": "Basic",
      "demos": [
        {
          "title": "Random.integer( min?, max? )",
          "label": "integer",
          "test": [
            "// Random.integer()",
            "Random.integer()",
            "Mock.mock('@integer')",
            "Mock.mock('@integer()')",
            "",
            "// Random.integer( min )",
            "Random.integer(10000)",
            "Mock.mock('@integer(10000)')",
            "",
            "// Random.integer( min, max )",
            "Random.integer(60, 100)",
            "Mock.mock('@integer(60, 100)')"
          ]
        },
        {
          "title": "Random.boolean( min?, max?, current? )",
          "label": "boolean",
          "test": [
            "// Random.boolean()",
            "Random.boolean()",
            "Mock.mock('@boolean')",
            "Mock.mock('@boolean()')",
            "",
            "// Random.boolean( min, max, current )",
            "Random.boolean(1, 9, true)",
            "Mock.mock('@boolean(1, 9, true)')"
          ]
        },
        {
          "title": "Random.float( min?, max?, dmin?, dmax? )",
          "label": "float",
          "test": [
            "// Random.float()",
            "Random.float()",
            "Mock.mock('@float')",
            "Mock.mock('@float()')",
            "",
            "// Random.float( min )",
            "Random.float(0)",
            "Mock.mock('@float(0)')",
            "",
            "// Random.float( min, max )",
            "Random.float(60, 100)",
            "Mock.mock('@float(60, 100)')",
            "",
            "// Random.float( min, max, dmin )",
            "Random.float(60, 100, 3)",
            "Mock.mock('@float(60, 100, 3)')",
            "",
            "// Random.float( min, max, dmin, dmax )",
            "Random.float(60, 100, 3, 5)",
            "Mock.mock('@float(60, 100, 3, 5)')",
            ""
          ]
        },
        {
          "title": "Random.character( pool? )",
          "label": "character",
          "test": [
            "// Random.character()",
            "Random.character()",
            "Mock.mock('@character')",
            "Mock.mock('@character()')",
            "",
            "// Random.character( 'lower/upper/number/symbol' )",
            "Random.character('lower')",
            "Random.character('upper')",
            "Random.character('number')",
            "Random.character('symbol')",
            "",
            "Mock.mock('@character(\"lower\")')",
            "Mock.mock('@character(\"upper\")')",
            "Mock.mock('@character(\"number\")')",
            "Mock.mock('@character(\"symbol\")')",
            "",
            "// Random.character( pool )",
            "Random.character('aeiou')",
            "Mock.mock('@character(\"aeiou\")')"
          ]
        },
        {
          "title": "Random.string( pool?, min?, max? )",
          "label": "string",
          "test": [
            "// Random.string()",
            "Random.string()",
            "Mock.mock('@string')",
            "Mock.mock('@string()')",
            "",
            "// Random.string( length )",
            "Random.string(5)",
            "Mock.mock('@string(5)')",
            "",
            "// Random.string( pool, length )",
            "Random.string('lower', 5)",
            "Random.string('upper', 5)",
            "Random.string('number', 5)",
            "Random.string('symbol', 5)",
            "Random.string('aeiou', 5)",
            "",
            "Mock.mock('@string(\"lower\", 5)')",
            "Mock.mock('@string(\"upper\", 5)')",
            "Mock.mock('@string(\"number\", 5)')",
            "Mock.mock('@string(\"symbol\", 5)')",
            "Mock.mock('@string(\"aeiou\", 5)')",
            "",
            "// Random.string( min, max )",
            "Random.string(7, 10)",
            "Mock.mock('@string(7, 10)')",
            "",
            "// Random.string( pool, min, max )",
            "Random.string('lower', 1, 3)",
            "Random.string('upper', 1, 3)",
            "Random.string('number', 1, 3)",
            "Random.string('symbol', 1, 3)",
            "Random.string('aeiou', 1, 3)",
            "",
            "Mock.mock('@string(\"lower\", 1, 3)')",
            "Mock.mock('@string(\"upper\", 1, 3)')",
            "Mock.mock('@string(\"number\", 1, 3)')",
            "Mock.mock('@string(\"symbol\", 1, 3)')",
            "Mock.mock('@string(\"aeiou\", 1, 3)')",
            ""
          ]
        },
        {
          "title": "Random.range(start?, stop, step?)",
          "label": "range",
          "test": [
            "// Random.range( stop )",
            "Random.range(10)",
            "Mock.mock('@range(10)')",
            "",
            "// Random.range( start, stop )",
            "Random.range(3, 7)",
            "Mock.mock('@range(3, 7)')",
            "",
            "// Random.range( start, stop, step )",
            "Random.range(1, 10, 2)",
            "Random.range(1, 10, 3)",
            "",
            "Mock.mock('@range(1, 10, 2)')",
            "Mock.mock('@range(1, 10, 3)')"
          ]
        }
      ]
    },
    {
      "label": "Date",
      "demos": [
        {
          "title": "Random.date( format? )",
          "label": "date",
          "test": [
            "// Random.date()",
            "Random.date()",
            "Mock.mock('@date')",
            "Mock.mock('@date()')",
            "",
            "// Random.date( format )",
            "Random.date('yyyy-MM-dd')",
            "Random.date('yyyy-M-d')",
            "",
            "Mock.mock('@date(\"yyyy-MM-dd\")')",
            "Mock.mock('@date(\"yyyy-M-d\")')"
          ]
        },
        {
          "title": "Random.time( format? )",
          "label": "time",
          "test": [
            "// Random.time()",
            "Random.time()",
            "Mock.mock('@time')",
            "Mock.mock('@time()')",
            "",
            "// Random.time( format )",
            "Random.time('hh:mm:ss')",
            "Random.time('h:m:s')",
            "",
            "Mock.mock('@time(\"hh:mm:ss\")')",
            "Mock.mock('@time(\"h:m:s\")')"
          ]
        },
        {
          "title": "Random.datetime( format? )",
          "label": "datetime",
          "test": [
            "// Random.datetime()",
            "Random.datetime()",
            "Mock.mock('@datetime')",
            "Mock.mock('@datetime()')",
            "",
            "// Random.datetime( format )",
            "Random.datetime('yyyy-MM-dd hh:mm:ss')",
            "Random.datetime('yyyy年MM月dd日 hh时mm分ss秒')",
            "",
            "Mock.mock('@datetime(\"yyyy-MM-dd hh:mm:ss\")')",
            "Mock.mock('@datetime(\"yyyy年MM月dd日 hh时mm分ss秒\")')",
            "",
            "// datetime( timeStamp )",
            "Random.datetime(true)",
            "Random.datetime(10)",
            "",
            "Mock.mock('@datetime(true)')",
            "Mock.mock('@datetime(10)')",
            "",
            "// datetime( min, max )",
            "Random.datetime('2017-08-08 08:00:00', '2017-08-08 18:18:18')",
            "Mock.mock('@datetime(\"2017-08-08 08:00:00\", \"2017-08-08 18:18:18\")')",
            "",
            "// datetime( min, max, timeStamp )",
            "Random.datetime('2017-08-08 08:00:00', '2017-08-08 18:18:18', true)",
            "Random.datetime('2017-08-08 08:00:00', '2017-08-08 18:18:18', 10)",
            "",
            "Mock.mock('@datetime(\"2017-08-08 08:00:00\", \"2017-08-08 18:18:18\", true)')",
            "Mock.mock('@datetime(\"2017-08-08 08:00:00\", \"2017-08-08 18:18:18\", 10)')"
          ]
        },
        {
          "title": "Random.now( format? )",
          "label": "now",
          "test": [
            "// Ranndom.now()",
            "Random.now()",
            "Mock.mock('@now')",
            "Mock.mock('@now()')",
            "",
            "// Ranndom.now( format )",
            "Random.now('yyyy-MM-dd hh:mm:ss.S')",
            "Mock.mock('@now(\"yyyy-MM-dd hh:mm:ss.S\")')",
            "",
            "// Ranndom.now( timeStamp? )",
            "Random.now(true)",
            "Random.now(10)",
            "",
            "Mock.mock('@now(true)')",
            "Mock.mock('@now(10)')"
          ]
        }
      ]
    },
    {
      "label": "Image",
      "demos": [
        {
          "title": "Random.image( size?, background?, foreground?, format?, text? )",
          "label": "image",
          "test": [
            "// Random.image()",
            "Random.image()",
            "// Random.image( size )",
            "Random.image('200x100')",
            "// Random.image( size, background )",
            "Random.image('200x100', '#FF6600')",
            "// Random.image( size, background, text )",
            "Random.image('200x100', '#4A7BF7', 'Hello')",
            "// Random.image( size, background, foreground, text )",
            "Random.image('200x100', '#50B347', '#FFF', 'Mock.js')",
            "// Random.image( size, background, foreground, format, text )",
            "Random.image('200x100', '#894FC4', '#FFF', 'png', '!')"
          ]
        }
      ]
    },
    {
      "label": "Color",
      "demos": [
        {
          "title": "Random.color()",
          "label": "color",
          "test": [
            "// Random.color()",
            "Random.color()",
            "Mock.mock('@color')",
            "Mock.mock('@color()')",
            "",
            "// Random.color( color )",
            "Random.color('blue')",
            "Mock.mock('@color(\"blue\")')"
          ]
        },
        {
          "title": "Random.hex()",
          "label": "hex",
          "test": [
            "// Random.hex()",
            "Random.hex()",
            "Mock.mock('@hex')",
            "Mock.mock('@hex()')",
            "",
            "// Random.hex( sharp )",
            "Random.hex(true)",
            "Mock.mock('@hex(true)')"
          ]
        },
        {
          "title": "Random.rgb()",
          "label": "rgb",
          "test": [
            "// Random.rgb()",
            "Random.rgb()",
            "Mock.mock('@rgb')",
            "Mock.mock('@rgb()')"
          ]
        },
        {
          "title": "Random.rgba()",
          "label": "rgba",
          "test": [
            "// Random.rgba()",
            "Random.rgba()",
            "Mock.mock('@rgba')",
            "Mock.mock('@rgba()')"
          ]
        },
        {
          "title": "Random.hsl()",
          "label": "hsl",
          "test": [
            "// Random.hsl()",
            "Random.hsl()",
            "Mock.mock('@hsl')",
            "Mock.mock('@hsl()')"
          ]
        }
      ]
    },
    {
      "label": "Text",
      "demos": [
        {
          "title": "Random.paragraph( min?, max? )",
          "label": "paragraph",
          "test": [
            "// Random.paragraph()",
            "Random.paragraph()",
            "",
            "Mock.mock('@paragraph')",
            "",
            "Mock.mock('@paragraph()')",
            "",
            "// Random.paragraph( len )",
            "Random.paragraph(2)",
            "",
            "Mock.mock('@paragraph(2)')",
            "",
            "// Random.paragraph( min, max )",
            "Random.paragraph(1, 3)",
            "",
            "Mock.mock('@paragraph(1, 3)')",
            ""
          ]
        },
        {
          "title": "Random.sentence( min?, max? )",
          "label": "sentence",
          "test": [
            "// Random.sentence()",
            "Random.sentence()",
            "Mock.mock('@sentence')",
            "Mock.mock('@sentence()')",
            "",
            "// Random.sentence( len )",
            "Random.sentence(5)",
            "Mock.mock('@sentence(5)')",
            "",
            "// Random.sentence( min, max )",
            "Random.sentence(3, 5)",
            "Mock.mock('@sentence(3, 5)')",
            ""
          ]
        },
        {
          "title": "Random.word( min?, max? )",
          "label": "word",
          "test": [
            "// Random.word()",
            "Random.word()",
            "Mock.mock('@word')",
            "Mock.mock('@word()')",
            "",
            "// Random.word( len )",
            "Random.word(5)",
            "Mock.mock('@word(5)')",
            "",
            "// Random.word( min, max )",
            "Random.word(3, 5)",
            "Mock.mock('@word(3, 5)')",
            ""
          ]
        },
        {
          "title": "Random.title( min?, max? )",
          "label": "title",
          "test": [
            "// Random.title()",
            "Random.title()",
            "Mock.mock('@title')",
            "Mock.mock('@title()')",
            "",
            "// Random.title( len )",
            "Random.title(5)",
            "Mock.mock('@title(5)')",
            "",
            "// Random.title( min, max )",
            "Random.title(3, 5)",
            "Mock.mock('@title(3, 5)')",
            ""
          ]
        },
        {
          "title": "Random.cparagraph( min?, max? )",
          "label": "cparagraph",
          "test": [
            "// Random.cparagraph()",
            "Random.cparagraph()",
            "",
            "Mock.mock('@cparagraph')",
            "",
            "Mock.mock('@cparagraph()')",
            "",
            "// Random.cparagraph( len )",
            "Random.cparagraph(2)",
            "",
            "Mock.mock('@cparagraph(2)')",
            "",
            "// Random.cparagraph( min, max )",
            "Random.cparagraph(1, 3)",
            "",
            "Mock.mock('@cparagraph(1, 3)')",
            ""
          ]
        },
        {
          "title": "Random.csentence( min?, max? )",
          "label": "csentence",
          "test": [
            "// Random.csentence()",
            "Random.csentence()",
            "Mock.mock('@csentence')",
            "Mock.mock('@csentence()')",
            "",
            "// Random.csentence( len )",
            "Random.csentence(5)",
            "Mock.mock('@csentence(5)')",
            "",
            "// Random.csentence( min, max )",
            "Random.csentence(3, 5)",
            "Mock.mock('@csentence(3, 5)')",
            ""
          ]
        },
        {
          "title": "Random.cword( pool?, min?, max? )",
          "label": "cword",
          "test": [
            "// Random.cword()",
            "Random.cword()",
            "Mock.mock('@cword')",
            "Mock.mock('@cword()')",
            "",
            "// Random.cword( pool )",
            "Random.cword('零一二三四五六七八九十')",
            "Mock.mock('@cword(\"零一二三四五六七八九十\")')",
            "",
            "// Random.cword( length )",
            "Random.cword(3)",
            "Mock.mock('@cword(3)')",
            "",
            "// Random.cword( pool, length )",
            "Random.cword('零一二三四五六七八九十', 3)",
            "Mock.mock('@cword(\"零一二三四五六七八九十\", 3)')",
            "",
            "// Random.cword( min, max )",
            "Random.cword(3, 5)",
            "Mock.mock('@cword(3, 5)')",
            "",
            "// Random.cword( pool, min, max )",
            "Random.cword('零一二三四五六七八九十', 5, 7)",
            "Mock.mock('@cword(\"零一二三四五六七八九十\", 5, 7)')"
          ]
        },
        {
          "title": "Random.ctitle( min?, max? )",
          "label": "ctitle",
          "test": [
            "// Random.ctitle()",
            "Random.ctitle()",
            "Mock.mock('@ctitle')",
            "Mock.mock('@ctitle()')",
            "",
            "// Random.ctitle( len )",
            "Random.ctitle(5)",
            "Mock.mock('@ctitle(5)')",
            "",
            "// Random.ctitle( min, max )",
            "Random.ctitle(3, 5)",
            "Mock.mock('@ctitle(3, 5)')",
            ""
          ]
        }
      ]
    },
    {
      "label": "Name",
      "demos": [
        {
          "title": "Random.first()",
          "label": "first",
          "test": [
            "// Random.first()",
            "Random.first()",
            "Mock.mock('@first')",
            "Mock.mock('@first()')"
          ]
        },
        {
          "title": "Random.last()",
          "label": "last",
          "test": [
            "// Random.last()",
            "Random.last()",
            "Mock.mock('@last')",
            "Mock.mock('@last()')"
          ]
        },
        {
          "title": "Random.name( middle? )",
          "label": "name",
          "test": [
            "// Random.name()",
            "Random.name()",
            "Mock.mock('@name')",
            "Mock.mock('@name()')",
            "",
            "// Random.name( middle )",
            "Random.name(true)",
            "Mock.mock('@name(true)')"
          ]
        },
        {
          "title": "Random.cfirst()",
          "label": "cfirst",
          "test": [
            "// Random.cfirst()",
            "Random.cfirst()",
            "Mock.mock('@cfirst')",
            "Mock.mock('@cfirst()')"
          ]
        },
        {
          "title": "Random.clast()",
          "label": "clast",
          "test": [
            "// Random.clast()",
            "Random.clast()",
            "Mock.mock('@clast')",
            "Mock.mock('@clast()')"
          ]
        },
        {
          "title": "Random.cname()",
          "label": "cname",
          "test": [
            "// Random.cname()",
            "Random.cname()",
            "Mock.mock('@cname')",
            "Mock.mock('@cname()')"
          ]
        }
      ]
    },
    {
      "label": "Web",
      "demos": [
        {
          "title": "Random.url( protocol?, host? )",
          "label": "url",
          "test": [
            "// Random.url()",
            "Random.url()",
            "Mock.mock('@url')",
            "Mock.mock('@url()')",
            "",
            "// Random.url( protocol )",
            "Random.url('https')",
            "Random.url('https')",
            "Mock.mock('@url(\"https\")')",
            "",
            "// Random.url( protocol, host )",
            "Random.url('https', 'm.taobao.com')",
            "Mock.mock('@url(\"https\", \"m.taobao.com\")')"
          ]
        },
        {
          "title": "Random.domain( sld?, tld? )",
          "label": "domain",
          "test": [
            "// Random.domain()",
            "Random.domain()",
            "Mock.mock('@domain')",
            "Mock.mock('@domain()')",
            "",
            "// Random.domain( sld )",
            "Random.domain('sso')",
            "Mock.mock('@domain(\"sso\")')",
            "",
            "// Random.domain( sld, tld )",
            "Random.domain('admin', 'com')",
            "Mock.mock('@domain(\"admin\", \"com\")')"
          ]
        },
        {
          "title": "Random.protocol( protocols? )",
          "label": "protocol",
          "test": [
            "// Random.protocol()",
            "Random.protocol()",
            "Mock.mock('@protocol')",
            "Mock.mock('@protocol()')",
            "",
            "// Random.protocol( protocols )",
            "Random.protocol('http https')",
            "Random.protocol(['http', 'https'])",
            "",
            "Mock.mock('@protocol(\"http https\")')",
            "Mock.mock('@protocol([\"http\", \"https\"])')"
          ]
        },
        {
          "title": "Random.tld()",
          "label": "tld",
          "test": [
            "// Random.tld()",
            "Random.tld()",
            "Mock.mock('@tld')",
            "Mock.mock('@tld()')"
          ]
        },
        {
          "title": "Random.email( domain? )",
          "label": "email",
          "test": [
            "// Random.email()",
            "Random.email()",
            "Mock.mock('@email')",
            "Mock.mock('@email()')",
            "",
            "// Random.email( domain )",
            "Random.email('gmail.com')",
            "Mock.mock('@email(\"gmail.com\")')"
          ]
        },
        {
          "title": "Random.ip()",
          "label": "ip",
          "test": [
            "// Random.ip()",
            "Random.ip()",
            "Mock.mock('@ip')",
            "Mock.mock('@ip()')"
          ]
        }
      ]
    },
    {
      "label": "Address",
      "demos": [
        {
          "title": "Random.region()",
          "label": "region",
          "test": [
            "// Random.region()",
            "Random.region()",
            "Mock.mock('@region')",
            "Mock.mock('@region()')"
          ]
        },
        {
          "title": "Random.province()",
          "label": "province",
          "test": [
            "// Random.province()",
            "Random.province()",
            "Mock.mock('@province')",
            "Mock.mock('@province()')"
          ]
        },
        {
          "title": "Random.city( prefix? )",
          "label": "city",
          "test": [
            "// Random.city()",
            "Random.city()",
            "Mock.mock('@city')",
            "Mock.mock('@city()')",
            "// Random.city( prefix )",
            "Random.city(true)",
            "Mock.mock('@city(true)')"
          ]
        },
        {
          "title": "Random.county( prefix? )",
          "label": "county",
          "test": [
            "// Random.county()",
            "Random.county()",
            "Mock.mock('@county')",
            "Mock.mock('@county()')",
            "// Random.county( prefix )",
            "Random.county(true)",
            "Mock.mock('@county(true)')"
          ]
        },
        {
          "title": "Random.zip()",
          "label": "zip",
          "test": [
            "// Random.zip()",
            "Random.zip()",
            "Mock.mock('@zip')",
            "Mock.mock('@zip()')"
          ]
        }
      ]
    },
    {
      "label": "Helper",
      "demos": [
        {
          "title": "Random.capitalize( word )",
          "label": "capitalize",
          "test": [
            "// Random.capitalize( word )",
            "Random.capitalize('hello')",
            "Mock.mock('@capitalize(\"hello\")')"
          ]
        },
        {
          "title": "Random.upper( str )",
          "label": "upper",
          "test": [
            "// Random.upper( str )",
            "Random.upper('hello')",
            "Mock.mock('@upper(\"hello\")')"
          ]
        },
        {
          "title": "Random.lower( str )",
          "label": "lower",
          "test": [
            "// Random.lower( str )",
            "Random.lower('HELLO')",
            "Mock.mock('@lower(\"HELLO\")')"
          ]
        },
        {
          "title": "Random.pick( arr )",
          "label": "pick",
          "test": [
            "// Random.pick( arr )",
            "Random.pick(['a', 'e', 'i', 'o', 'u'])",
            "Mock.mock('@pick([\"a\", \"e\", \"i\", \"o\", \"u\"])')"
          ]
        },
        {
          "title": "Random.shuffle( arr )",
          "label": "shuffle",
          "test": [
            "// Random.shuffle( arr )",
            "Random.shuffle(['a', 'e', 'i', 'o', 'u'])",
            "Mock.mock('@shuffle([\"a\", \"e\", \"i\", \"o\", \"u\"])')"
          ]
        }
      ]
    },
    {
      "label": "Miscellaneous",
      "demos": [
        {
          "title": "Random.uuid() / Random.guid()",
          "label": "uuid",
          "test": [
            "// Random.uuid() / Random.guid()",
            "Random.uuid()",
            "Random.guid()",
            "Mock.mock('@uuid')",
            "Mock.mock('@guid')",
            "Mock.mock('@uuid()')",
            "Mock.mock('@guid()')"
          ]
        },
        {
          "title": "Random.id()",
          "label": "id",
          "test": [
            "// Random.id() 身份证号码",
            "Random.id()",
            "Mock.mock('@id')",
            "Mock.mock('@id()')"
          ]
        },
        {
          "title": "Random.increment( step? )",
          "label": "increment",
          "test": [
            "// Random.increment() 基于上一次值 +1",
            "Random.increment()",
            "Mock.mock('@increment')",
            "Mock.mock('@increment()')",
            "",
            "// Random.increment( step ) 基于上一次值 +step",
            "Random.increment(100)",
            "Mock.mock('@increment(100)')",
            "Random.increment(1000)",
            "Mock.mock('@increment(1000)')"
          ]
        }
      ]
    }
  ];
})(window);

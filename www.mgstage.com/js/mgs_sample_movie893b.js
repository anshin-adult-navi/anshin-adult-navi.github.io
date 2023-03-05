(function(window, document) {
    // 現在実行中のscriptを取得
    // IEではcurrentScriptで取得できないので回避対応
    var cs = document.currentScript,
        cs_src;

    if (cs === undefined) {
        var scripts = document.getElementsByTagName('script');
        cs = scripts[scripts.length - 1];
        cs_src = (scripts[scripts.length - 1]).src;
    } else {
        cs_src = cs.src;
    }

    // ?以降のパラメータを配列で取得し連想配列作成
    var query = cs_src.substring(cs_src.indexOf('?') + 1).split('&'),
        param = [];

    // パラメータを連想配列に
    for (var i = 0; i < query.length; i++) {
        var tmp = query[i].split('=');
        param[tmp[0]] = tmp[1];
    }

    // 渡ってくるパタメータ
    // sku[p]
    // size[s]
    // [1][4:3]320×240
    // [2][4:3]400×300
    // [3][4:3]480×360
    // [4][4:3]640×480
    // [5][16:9]476×306
    // [6][16:9]560×360
    // [7][16:9]644×414
    // [8][16:9]720×480
    // affcode[c]

    var size_pattern = {
        // 4:3
        1:{ w:320, h:240 },
        2:{ w:400, h:300 },
        3:{ w:480, h:360 },
        4:{ w:640, h:480 },
        // 16:9
        5:{ w:476, h:306 },
        6:{ w:560, h:360 },
        7:{ w:644, h:414 },
        8:{ w:720, h:480 },
    };
    var monthly_ch = {
        1:'prestigebb',
        2:'shiroutotv',
        3:'fullsailbb',
        4:'hmpbb',
        5:'nextbb',
        6:'alicejapanbb',
        7:'maxabb',
        8:'hotbb',
        9:'sodch',
        10:'kmpch',
        11:'glorych',
        12:'nanpatv',
        13:'luxutv',
        14:'docch',
        15:'superch',
        16:'kanbich',
        17:'ppvanime'

    };
    var pattern_num = Object.keys(size_pattern).length,
        c, w, h, m,
        p = param['p'],
        php_url = 'https://www.mgstage.com/api/affiliate_sample_movie.php';

    // バリデーション
    // アフィリエイトコード
    if (param['c'] !== null && param['c'] !== undefined && param['c'] !== '') {
        if (param['c'].substr(0, 3) === '~AF') {
            c = param['c'].substr(2);
        } else {
            c = param['c'];
        }
    } else {
        c = '';
    }

    // サイズ
    if (param['r']) {
        var parent_element = cs.parentNode;
        w = parent_element.clientWidth - 20;
        h = Math.floor((9 * w) / 16);
    } else {
        if(param['s'] < 0 && param['s'] > pattern_num) {
            param['s'] = 1;
        }
        w = size_pattern[param['s']].w;
        h = size_pattern[param['s']].h;
    }

    // 月額の場合
    var m_url_str = '';
    if(param['m'] !== null && param['m'] !== undefined && param['m'] !== '') {
        m = monthly_ch[param['m']];
        m_url_str = '&m=' + m;
    }

    var iframe_element = document.createElement('iframe');
    iframe_element.setAttribute('width', w);
    iframe_element.setAttribute('height', h);
    iframe_element.setAttribute('src', php_url + '?p=' + p + '&w=' + w + '&h=' + h + '&c=' + c + m_url_str);
    iframe_element.setAttribute('scrolling', 'no');
    iframe_element.setAttribute('frameborder', '0');
    iframe_element.setAttribute('allowfullscreen', '');

    cs.parentNode.insertBefore(iframe_element, cs.nextSibling);

})(this, this.document);

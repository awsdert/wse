fujio.ajax.dom = function () {
	var a = arguments; var d = [a[2], a[1]];
	fujio.ajax(a[0], function () {
		var a = arguments; var d = a[1][0], f = a[1][1], a = a[0];
		if (!fujio.is(f, 'method')) { f = function () {}; }
		f(fujio.parse.dom(a), d);
	}, d);
};
fujio.ajax.ini = function () {
	var a = arguments, i, n, t;
	fujio.ajax(a[0], function () {
		var a = arguments; var d = a[1][0], f = a[1][1], a = a[0], r = null;
		if (!fujio.is(f, 'method')) { f = function () {}; }
		if (a !== '') {
			r = {}; a = a.split('\n');
			for (i = 0;i < a.length;i++) {
				if (/^\[\w\]$/.test(a[i])) {
					n = a[i].slice(1, -1); 
					r[n] = {};
				} else if (n && /^\w/i.test(a[i])) {
					t = a[i].split(/\=/);
					if (!t[1]) { t[1] = ''; }
					r[n][t[0]] = t[1];
					t = null;
				}
			}
		} f(r, d);
	}, [a[2], a[1]]);
};
fujio.ajax.rss = function () {
	var a = arguments;
	fujio.ajax.dom(a[0], function () {
		var a = arguments, c, d, i, j, k, l, m, o, r = [], t, x;
		d = a[1][0]; x = a[0]; a = a[1][1];
		if (!fujio.is(a, 'method')) { f = function () {}; }
		c = fujio.tags(x, "channel");
		for (i = 0;i < c.length;i++) {
			r[i] = { attr : {}, genres : [], hours : [], days : [], list : [] }; l = c[i].childNodes;
			for (j = 0;j < l.length;j++) {
				t = l[j].nodeName;
				if (t === "item") {
					o = {}; m = l[j].childNodes;
					for (k = 0;k < m.length;k++) {
						t = m[k].nodeName;
						if (t !== "#text")
							{ o[t] =  m[k].childNodes[0].nodeValue; }
					} r[i].list.push(o); o = null;
				} else if (t === "category") {
					r[i].genres.push(l[j].childNodes[0].nodeValue);
				} else if (t === "skipHours") {
					m = fujio.tags(l[j], "hour");
					for (j = 0;j < m.length;j++)
						{ r[i].hours.push((+m[k].childNodes[0].nodeValue)); }
				} else if (t === "skipDays") {
					m = fujio.tags(l[j], "day");
					for (j = 0;j < m.length;j++)
						{ r[i].days.push((+m[k].childNodes[0].nodeValue)); }
				} else if (t === "ttl") {
					r[i][t] = (+l[j].childNodes[0].nodeValue);
				} else {
					if (t !== "#text")
						{ r[i][t] = l[j].childNodes[0].nodeValue; }
				} m = null;
			} l = null;
		} a(r, d);
	}, [a[2], a[1]]);
};
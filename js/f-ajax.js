fujio.ajax.html = function () {
	var a = arguments, d; d = [a[2], a[1]];
	fujio.ajax(a[0], function () {
		var a = arguments, d, x; x = a[0]; d = a[1][0]; a = a[1][1];
		if (!isMethod(a)) { a = function () {}; }
		a(fujio.parse.dom(x, 'html'), d);
	}, d);
};
fujio.ajax.xml = function () {
	var a = arguments, d; d = [a[2], a[1]];
	fujio.ajax(a[0], function () {
		var a = arguments, d, x; x = a[0]; d = a[1][0]; a = a[1][1];
		if (!isMethod(a)) { a = function () {}; }
		a(fujio.parse.dom(x), d);
	}, d);
};
fujio.ajax.rss = function () {
	var a = arguments, d; d = [a[2], a[1]];
	fujio.ajax.dom(a[0], function () {
		var a = arguments, c, d, x, r = [], l, m, t, i, j, k, o;
		x = a[0]; d = a[1][0]; a = a[1][1];
		if (!isMethod(a)) { a = function () {}; }
		c = fujio.tags(a, 'channel');
		for (i = 0;i < c.length;i++) {
			r[i] = { genres : [], hours : [], days : [], list : [] }; l = c[i].childNodes;
			for (j = 0;j < l.length;j++) {
				t = lcase(l[j].nodeName);
				switch (t) {
				case 'item':
					o = {}; m = l[j].childNodes;
					for (k = 0;k < m.length;k++) {
						t = lcase(m[k].nodeName);
						if (t !== "#text") { o[t] = m[k].childNodes[0].nodeValue; }
					} r[i].list.push(o); o = null; break;
				case 'category': r[i].genres.push(l[j].childNodes[0].nodeValue); break;
				case 'skiphours':
					m = fujio.kids(l[j], 'hour');
					for (k = 0;k < m.length;k++) {
						r[i].hours.push((+m[k].childNodes[0].nodeValue));
					} break;
				case 'skipdays':
					m = fujio.kids(l[j], 'day');
					for (k = 0;k < m.length;k++) {
						r[i].days.push((+m[k].childNodes[0].nodeValue));
					} break;
				case 'ttl': r[i][t] = (+l[j].childNodes[0].nodeValue); break;
				default: if (t !== "#text") { r[i][t] = l[j].childNodes[0].nodeValue; } break;
				} m = null;
			} l = null;
		} a(r, d);
	}, d);
};
fujio.ajax.csv = function () {
	var a = arguments;
	fujio.ajax(a[0], function () {
		var a = arguments, r = [], x, d, l, i, j, c, o = re('\\"\\"', 'g'), n = 0, t;
		x = a[0]; d = a[1][1]; a = a[1][0];
		if (!a || !isMethod(a)) { a = function () {}; }
		if (x) {
			l = x.split('\n'); t = d.comma;
			if (!t || !isText(t)) { d.comma = ','; } t = d.dot;
			if (!t || !isText(t)) { d.dot = '.'; }
			for (i = 0;i < l.length;i++, n++) {
				t = l[i].split(d.delimeter);
				if (!r[n]) { r[n] = []; }
				for (j = 0;j < t.length;j++) {
					if (c || re('^\\"').test(t[j])) {
						if (c) { r[n].push('\\n' + t[j]); c = false; }
						else { r[n].push(t[j]); }
						if (!re('\\"$').test(t[j])) {
							if (!is(t[j + 1])) { n--; c = true; }
							else { r[n][-1] += '"'; }
						} t[j] = null;
					} else { r[n].push(t[j]); }
				} l[i] = null;
			} l = null; o = re('^\\d+(\\' + d.dot + '\\d+)?$');
			for (i = 0;i < r.length;i++) {
				t = r[i];
				for (j = 0;j < t.length;j++) {
					if (re('^\\".*\\"$').test(t[j])) { t[j] = t[j].slice(1, -1); }
					t[j] = t[j].replace('""', '"');
					if (o.test(t[j])) {
						t[j] = t[j].replace(d.dot, '.');
						t[j] = (+t[j]);
					}
				} r[i] = t;
			}
		} a(r, d.data);
	}, [a[1], a[2]]);
};
fujio.ajax.json = function () {
	var a = arguments;
	fujio.ajax(a[0], function () {
		var a = arguments, d, x; x = a[0]; d = a[1][1]; a = a[1][0];
		if (!a || !isMethod(a)) { a = function () {}; }
		a(fujio.parse.json(x), d);
	}, [a[1], a[2]]);
};

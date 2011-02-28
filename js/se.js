/*jslint browser: true, onevar: true, white: false, undef: false, forin: true, maxerr: 30*/
function wse() {
	var a = arguments[0], t = INI.wse.m.t, m = INI.fujio.m;
	f.ajax[t](m.r + m.i + 'wse/wse.' + t, wse['Q' + t], a);
	return false;
} wse.init = function () {
	var a = arguments[0];
	if (!a || !isTxt(a)) { a = 'wse.ini'; }
	wse.ini(); f.ajax.ini(a, wse.ini);
}; wse.ini = function () {
	var x = arguments[0], i, j, l, o = obj(), t;
	o.m = obj(); o.m.t = 'xml'; o.m.gl = list(); o.m.bl = list();
	o.q = obj(); o.q.f = 'wse'; o.q.q = 'q'; o.q.g = 'g'; o.q.s = 's';
		o.q.b = 'b'; o.q.r = 'r'; o.q.p = 'p'; o.q.n = 'n'; o.q.t = 't';
	o.ql = obj(); o.ql.g = 'Genre'; o.ql.s = 'Sort'; o.ql.b = 'By';
		o.ql.r = 'Results'; o.ql.p = 'Pages'; o.ql.t = 'Total';
	o.qt = obj(); o.qt.s = 'Enter the terms of which you wish to search with';
		o.qt.g = 'Select the Categories you want to restrict the search to';
		o.qt.s = 'Sort by Ascending or Descending order';
		o.qt.b = 'Sort by 1 of the following parameters';
		o.qt.r = 'Maximum results to show per page';
		o.qt.p = 'Maximum page links to show per page. Example: 3 would produce something like this "...5, 6, 7..."';
		o.qt.t = 'Maximum number of results to find, use this if you keep getting messages about script time';
	o.qv = obj(); o.qv.q = 'Search...'; o.qv.g = ''; o.qv.s = 'asc';
		o.qv.b = 'nsme'; o.qv.r = '10'; o.qv.p = '10'; o.qv.t = '0';
	o.qd = obj(); o.qd.ln = '?????'; o.qd.lf = ''; o.qd.ia = '';
		o.qd.og = 'None'; o.qd.ot = '';
	o.c = obj(); o.c.r = 'result'; o.c.s = 'sticky'; o.c.pl = 'pagelinks';
	o.s = obj(); o.s.a = 'A-Z'; o.s.d = 'Z-A'; o.g = obj(); o.b = obj();
	if (x) {
		for (i in x) {
			t = x[i];
			switch (i) {
			case 'Main': for (j in t) {
				switch (j) {
				case 'type': o.m.t = t[j]; break;
				case 'genreList': o.m.gl = t[j].split(','); break;
				case 'byList': o.m.bl = t[j].split(','); break; } } break;
			case 'Search': for (j in t) {
				switch (j) {
				case 'form': o.q.f = t[j]; break;
				case 'search': o.q.q = t[j]; break;
				case 'genre': o.q.g = t[j]; break;
				case 'sort': o.q.s = t[j]; break;
				case 'by': o.q.b = t[j]; break;
				case 'results': o.q.r = t[j]; break;
				case 'pages': o.q.p = t[j]; break;
				case 'page': o.q.n = t[j]; break;
				case 'total': o.q.t = t[j]; break; } } break;
			case 'SearchLabels': for (j in t) {
				switch (j) {
				case 'search': o.ql.q = t[j]; break;
				case 'genre': o.ql.g = t[j]; break;
				case 'sort': o.ql.s = t[j]; break;
				case 'by': o.ql.b = t[j]; break;
				case 'results': o.ql.r = t[j]; break;
				case 'pages': o.ql.p = t[j]; break;
				case 'total': o.ql.t = t[j]; break; } } break;
			case 'SearchTips': for (j in t) {
				switch (j) {
				case 'search': o.qt.q = t[j]; break;
				case 'genre': o.qt.g = t[j]; break;
				case 'sort': o.qt.s = t[j]; break;
				case 'by': o.qt.b = t[j]; break;
				case 'results': o.qt.r = t[j]; break;
				case 'pages': o.qt.p = t[j]; break;
				case 'total': o.qt.t = t[j]; break; } } break;
			case 'SearchValues': for (j in t) {
				switch (j) {
				case 'search': o.qv.q = t[j]; break;
				case 'genre': o.qv.g = t[j]; break;
				case 'sort': o.qv.s = t[j]; break;
				case 'by': o.qv.b = t[j]; break;
				case 'results': o.qv.r = t[j]; break;
				case 'pages': o.qv.p = t[j]; break;
				case 'total': o.qv.t = t[j]; break; } } break;
			case 'SearchData': for (j in t) {
				switch (j) {
				case 'linkName': o.qd.ln = t[j]; break;
				case 'linkFrame': o.qd.lf = t[j]; break;
				case 'imgAlt': o.qd.ia = t[j]; break;
				case 'otherGenre': o.qd.og = t[j]; break;
				case 'otherTags': o.qd.ot = t[j]; break; } } break;
			case 'Classes': for (j in t) {
				switch (j) {
				case 'result': o.c.r = t[j]; break;
				case 'sticky': o.c.s = t[j]; break;
				case 'pageLinks': o.c.pl = t[j]; break; } } break;
			case 'Genres': l = o.m.gl; for (j = 0;j < l.length;j++)
				{ if (!t[l[j]]) { t[l[j]] = l[j]; } } o.g = t; break;
			case 'Sort': for (j in t) {
				switch (j) {
				case 'asc': o.s.a = t[j]; break;
				case 'desc': o.s.d = t[j]; break; } } break;
			case 'By': l = o.m.bl; for (j = 0;j < l.length;j++)
				{ if (!t[l[j]]) { t[l[j]] = l[j]; } } o.b = t; break;
			} t = null; l = null;
		}
	} x = null; INI.wse = o; o = null;
}; wse.Qnull = function () {};
wse.Q = function () {
	var a = arguments[0], g = GET, i, j = list(), l = list(), k = list(), m = '', n, o, p = '',
		s, sd, st1, st2, st3, st4, st5, st6, r = list(),
		r1 = re('^(title|genre)\\:'), r2 = ('^(\\+|\\-)(title|genre)\\:'),
		r3 = re('^info\\:'), r4 = re('^(\\+|\\-)info\\:'),
		r5 = re('^rating\\:'), r6 = re('^(\\+|\\-)rating\\:'), t, w = INI.wse; 
	s = g[w.q.q];
	for (i = 0;i < s.length;i++) {
		sd = lcase(s.charAt(i));
		switch (m) {
		case 'any':
			if (sd === '\\') { t += sd + s.charAt(i + 1); i++; } else {
				if (p) { if (sd === p) { p = ''; i++; } t += sd; }
				else if (sd === '"' || sd === "'" || sd === '/') { p = sd; t += sd; }
				else if (sd === ' ') { l.push(t); m = ''; p = ''; } else { t += sd; }
			} break;
		case '+any':
			if (sd === '\\') { t += sd + s.charAt(i + 1); i++; } else {
				if (p) { if (sd === p) { p = ''; i++; } t += sd; }
				else if (sd === '"' || sd === "'" || sd === '/') { p = sd; }
				else if (sd === ' ') { l.push(t); m = ''; p = ''; } else { t += sd; }
			} break;
		case '-any':
			if (sd === '\\') { t += sd + s.charAt(i + 1); i++; } else {
				if (p) { if (sd === p) { p = ''; i++; } t += sd; }
				else if (sd === '"' || sd === "'" || sd === '/') { p = sd; t += sd; }
				else if (sd === ' ') { l.push(t); m = ''; p = ''; } else { t += sd; }
			} break;
		case 'var':
			if (sd === '\\') { t += sd + s.charAt(i + 1); i++; } else {
				if (p) { if (sd === p) {
					if (s.charAt(i + 1) === ',') { t += ',';
						if (s.charAt(i + 2) === ' ') { i += 2; } else { i++; }
					} else { i++; } p = ''; } t += sd; }
				else if (sd === '"' || sd === "'" || sd === '/') { p = sd; t += sd; }
				else if (sd === ' ') { l.push(t); m = ''; p = ''; } else { t += sd; }
			} break;
		case '+var':
			if (sd === '\\') { t += sd + s.charAt(i + 1); i++; } else {
				if (p) { if (sd === p) {
					if (s.charAt(i + 1) === ',') { t += ',';
						if (s.charAt(i + 2) === ' ') { i += 2; } else { i++; }
					} else { i++; } p = ''; } t += sd; }
				else if (sd === '"' || sd === "'" || sd === '/') { p = sd; t += sd; }
				else if (sd === ' ') { l.push(t); m = ''; p = ''; } else { t += sd; }
			} break;
		case '-var':
			if (sd === '\\') { t += sd + s.charAt(i + 1); i++; } else {
				if (p) { if (sd === p) {
					if (s.charAt(i + 1) === ',') { t += ',';
						if (s.charAt(i + 2) === ' ') { i += 2; } else { i++; }
					} else { i++; } p = ''; } t += sd; }
				else if (sd === '"' || sd === "'" || sd === '/') { p = sd; t += sd; }
				else if (sd === ' ') { l.push(t); m = ''; p = ''; } else { t += sd; }
			} break;
		default: t = lcase(s.slice(i, 7));
			if (r1.test(t)) { t = s.slice(i, 6); i += 6; m = 'var'; }
			else if (r2.test(t)) { t = s.slice(i + 1 , 6); i += 7; m = sd + 'var'; }
			else if (r3.test(t)) { t = s.slice(i, 5); i += 5; m = 'var'; }
			else if (r4.test(t)) { t = s.slice(i + 1, 5); i += 6; m = sd + 'var'; }
			else if (r5.test(t)) { t = s.slice(i, 7); i += 7; m = 'var'; }
			else if (r6.test(t)) { t = s.slice(i + 1, 7); i += 8; m = sd + 'var'; }
			else if (sd === '+' || sd === '-') { m = sd + 'any'; t = ''; }
			else if (sd !== ' ') { m = 'any';
				if (sd === '\\') { t = s.charAt(i + 1); i++; } t = sd; } break;
		}
	} p = false;
	t = 0; s = (+g[w.q.t]); if (s === 0) { s = a.length; }
	for (i = 0;i < a.length;i++) {
		if (t < s) {
			o = a[i]; o.o.g = o.o.g.split(',').sort().join(','); sd = '';
			sd += 'title:' + o.l[0].n + ';'; sd += 'rating:' + o.o.r + ';';
			sd += o.o.g.split(',').join(';genre:') + ';';
			sd += 'info:' + o.o.c + ';'; sd = lcase(sd);
			if (st1.length || st2.length > 0) {
				for (j = 0;j < st1.length;j++) {
					if (sd.indexOf(st1[j]) >= 0) { p = true; j = st1.length; } }
				for (j = 0;j < st2.length;j++) {
					if (st1[j].test(sd)) { p = true; j = st1.length; } }
			} else { p = true; }
			for (j = 0;j < st3.length;j++) {
				if (sd.indexOf(st3[j]) < 0) { p = false; j = st3.length; } }
			for (j = 0;j < st4.length;j++) {
				if (!st4[j].test(sd)) { p = false; j = st4.length; } }
			for (j = 0;j < st5.length;j++) {
				if (sd.indexOf(st5[j]) >= 0) { p = false; j = st5.length; } }
			for (j = 0;j < st6.length;j++) {
				if (st6[j].test(sd)) { p = false; j = st6.length; } }
			if (p) {
				sd = o.o.s + '<!--';
				switch (g[w.q.b]) {
				case 'genre': sd += o.o.g + ';' + lcase(o.l[0].n) + ';' + o.o.r; break;
				case 'rating': sd += o.o.r + ';' + lcase(o.l[0].n) + ';' + o.o.g; break;
				default: sd += lcase(o.l[0].n) + ';' + o.o.g + ';' + o.o.r; break;
				} sd += '--><div class="result'; if (o.o.s) { sd += ' sticky'; }
				sd += '"><div class="title">'; m = o.l; if (m[0].u) {
					sd += '<a href="' + m[0].n + '"';
					if (m[0].f) { sd += ' target="' + m[0].f + '"'; }
				} else { sd += '<b'; }
				if (m[0].t) { sd += ' title="' + m[0].t + '"'; } sd += '>' + m[0].n;
				if (m[0].u) { sd += '</a>'; } else { sd += '</b>'; }
				if (m.l.length > 1) {
					sd += '</div><div class="sublinks">';
					for (j = 1;j < m.length;j++) {
						if (m[j].u) {
							sd += '<a href="' + m[j].n + '"';
							if (m[j].f) { sd += ' target="' + m[j].f + '"'; }
						} else { sd += '<b'; }
						if (m[j].t) { sd += ' title="' + m[j].t + '"'; } sd += '>' + m[j].n;
						if (m[j].u) { sd += '</a>'; } else { sd += '</b>'; }
					}
				} m = o.i; if (m.u || o.o.c) { sd += '</div><div class="content">'; }
				if (m.u) {
					sd += '<img src="' + m.u + '"';
					if (m.s || m.w || m.h) {
						sd += ' style="';
						if (m.s) { sd += 'width:' + m.s + ';height:' + m.s + ';'; }
						else {
							if (m.w) { sd += 'width:' + m.w + ';'; }
							if (m.h) { sd += 'height:' + m.h + ';'; }
						} sd += '"';
					} sd += ' alt="' + m.a + '" title="' + m.a + '" />'; 
				} m = o.o;
				if (m.c) { if (o.i.u) {	sd += '<span>' + m.c + '</span>'; }
					else { sd += '<div>' + m.c + '</div>'; }
				} sd += '</div><div class="data"><div>Genre: ';
				if(!m.g) { sd += 'None'; } else {
					n = m.g.split(','); sd += w.g[0];
					for (k = 1;k < n.length;k++) { sd += ', ' + w.g[n[k]]; }
				} sd += '</div><div>Rating: '; n = m.r;
				for (k = 0;k < n;k++) { sd += '*'; } sd += '</div><div class="tags">';
				n = m.t.split(',');
				for (k = 0;k < n.length;k++) { sd += '<a href="?' + w.q.q + '=' + n[k] + '">' + n[k] + '</a>'; }
				sd += '</div></div></div>'; r.push(sd); t++; 
			} sd = null;
		} else { i = a.length; }
	} wse.show(r);
}; wse.Qxml = function () {
	var a = arguments, e, i, j, m, o, r = list(), t; e = a[1]; a = a[0];
	if (a) { a = f.tags(a, 'xml')[0]; a = f.kids(a, 'i');
		for (i = 0;i < a.length;i++) {
			o = obj(); o.l = list(); m = f.tags(f.kids(a[i], 'l')[0], 'i');
			for (j = 0;j < m.length;j++) { t = obj(); t.u = m[j].url; t.f = m[j].frame; t.t = m[j].tip; t.v = m[j].nodeValue; o.l.push(t); }
			m = f.kids(a[i], 'i'); t = obj();
			t.u = m.url; t.s = m.size; t.w = m.width; t.h = m.height; t.a = m.nodeValue;
			o.i = t; m = f.kids(a[i], 'o'); t = obj();
			t.s = m.sticky; t.g = m.genre; t.t = t.tags; t.r = m.rating; t.c = m.nodeValue.replace('[', '<').replace(']', '>');
			o.o = t; r.push(o);
		} wse.Q(r);
	} else if (e.submit) { e.submit(); }
	else { loc.href = e.href; }
}; wse.Qjson = function () {};

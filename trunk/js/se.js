var WSE = obj(); function wse () {
	var a = arguments[0], t = INI.wse.m.t;
	fujio.ajax[t](INI.fujio.m.i + 'wse/wse.' + t, wse['Q' + t], a);
	return false;
} wse.init = function () {
	var a = arguments[0];
	if (!a || !fujio.is(a, 'text')) { a = 'wse.ini'; }
	wse.ini(); fujio.ajax.ini(a, wse.ini);
}; wse.ini = function () {
	var a = arguments[0], i, l, o = obj(), t; if (!a) { a = obj(); }
	if (!a.Main) { a.Main = obj(); } t = a.Main; a.Main = null;
	if (!t.type) { t.type = 'xml'; } if (!t.genreList) { t.genreList = ''; } if (!t.byList) { t.byList = ''; }
	o.m = obj(); o.m.t = t.type; o.m.gl = t.genreList.split(','); o.m.bl = t.byList.split(',');
	if (!a.Search) { a.Search = obj(); } t = a.Search; a.Search = null;
	if (!t.form) { t.form = 'wse'; } if (!t.search) { t.search = 'q'; }
	if (!t.genre) { t.genre = 'g'; } if (!t.sort) { t.sort = 's'; }
	if (!t.by) { t.by = 'b'; } if (!t.results) { t.results = 'r'; }
	if (!t.pages) { t.pages = 'p'; } if (!t.page) { t.page = 'n'}
	if (!t.total) { t.total = 't'; } o.q = obj(); o.q.f = t.form; o.q.q = t.search; o.q.g = t.genre; o.q.s = t.sort;
	o.q.b = t.by; o.q.r = t.results; o.q.p = t.pages; o.q.n = t.page; o.q.t = t.total;
	if (!a.SearchLabels) { a.SearchLabels = obj(); } t = a.SearchLabels; a.SearchLabels = null;
	if (!t.genre) { t.genre = 'Genre'; } if (!t.sort) { t.sort = 'Sort'; }
	if (!t.by) { t.by = 'By'; } if (!t.results) { t.results = 'Results'; }
	if (!t.pages) { t.pages = 'Pages'; } if (!t.total) { t.total = 'Totals'; } o.ql = obj(); o.ql.q = t.search;
	o.ql.g = t.genre; o.ql.s = t.sort; o.ql.b = t.by; o.ql.r = t.results; o.ql.p = t.pages; o.ql.t = t.total;
	if (!a.SearchTips) { a.SearchTips = obj(); } t = a.SearchTips; a.SearchTips = null;
	if (!t.search) { t.search = 'Enter the terms of which you wish to search with'; }
	if (!t.genre) { t.genre = 'Select the Categories you want to restrict the search to'; }
	if (!t.sort) { t.sort = 'Sort by Ascending or Descending order'; }
	if (!t.by) { t.by = 'Sort by 1 of the following parameters'; }
	if (!t.results) { t.results = 'Maximum results to show per page'; }
	if (!t.pages) { t.pages = 'Maximum page links to show per page. Example: 3 would produce something like this "...5, 6, 7..."'; }
	if (!t.total) { t.total = 'Maximum number of results to find, use this if you keep getting messages about script time'; }
	o.qt = obj(); o.qt.q = t.search; o.qt.g = t.genre; o.qt.s = t.sort; o.qt.b = t.by; o.qt.r = t.results; o.qt.p = t.pages; t = t.total;
	if (!a.SearchValues) { a.SearchValues = obj(); } t = a.SearchValues; a.SearchValues = null;
	if (!t.search) { t.search = 'Search...'; } if (!t.genre) { t.genre = ''; }
	if (!t.sort) { t.sort = 'asc'; } if (!t.by) { t.by = 'name'; }
	if (!t.results) { t.results = '10'; } if (!t.pages) { t.pages = '10'; }
	if (!t.total) { t.total = '0'; }
	o.qv = obj(); o.qv.q = t.search; o.qv.g = t.genre; o.qv.s = t.sort; o.qv.b = t.by; o.qv.r = t.results; o.qv.p = t.pages; t = t.total;
	if (!a.SearchData) { a.SearchData = obj(); } t = a.SearchData; a.SearchData = null;
	if (!t.linkName) { t.linkName = '?????'} if (!t.linkFrame) { t.linkFame = ''; }
	if (!t.imgAlt) { t.imgAlt = ''; } if (!t.otherGenre) { t.otherGenre = 'None'; }
	if (!t.otherTags) { t.otherTags = ''; }
	o.qd = obj(); o.qd.ln = t.linkName; o.qd.lf = t.linkFrame; o.qd.ia = t.imgAlt; o.qd.og = t.otherGenre; o.qd.ot = t.otherTags;
	if (!a.Classes) { a.Classes = obj(); } t = a.Classes; a.Classes = null;
	if (!t.result) { t.result = 'result'; } if (!t.sticky) { t.sticky = 'sticky'; }
	if (!t.pageLinks) { t.pageLinks = 'pagelinks'; } o.c = obj(); r : t.result, s : t.sticky, pl : t.pageLinks;
	if (!a.Genres) { a.Genres = obj(); } t = a.Genres; a.Genres = null; l = o.m.gl;
	for (i = 0;i < l.length;i++) { if (!t[l[i]]) { t[l[i]] = l[i]; } } o.g = t;
	if (!a.Sort) { a.Sort = obj(); } t = a.Sort; a.Sort = null;
	if (!t.asc) { t.asc = 'A-Z'; } if (!t.desc) { t.desc = 'Z-A'; } o.s = obj(); o.s.a = t.asc; o.s.d = t.desc;
	if (!a.By) { a.By = obj(); } t = a.By; a.By = null; l = o.m.bl;
	for (i = 0;i < l.length;i++) { if (!t[l[i]]) { t[l[i]] = l[i]; } } o.b = t;
	t = null; a = null; l = null; INI.wse = o; o = null;
}; wse.Q = function () {
	var a = arguments[0], e, g = GET, i, j, l, k, m, n, o, p = true, s, r = list(), t, w = INI.wse;
	s = (+g[w.q.t]); if (s === 0) { s = a.length; }
	for (i = 0, t = 0;i < a.length, t < s;i++) {
		o = a[i];
		o.o.g = o.o.g.split(',').sort().join(',');
		if (p) {
			e = o.o.s + '<!--';
			switch (g[w.q.b]) {
			case 'genre': e += o.o.g + ';' + o.l[0].n.toLowerCase() + ';' + o.o.r; break;
			case 'rating': e += o.o.r + ';' + o.l[0].n.toLowerCase() + ';' + o.o.g; break;
			default: e += o.l[0].n.toLowerCase() + ';' + o.o.g + ';' + o.o.r; break;
			} e += '--><div class="result"><div class="title">';
			m = o.l; if (m[0].u) {
				e += '<a href="' + m[0].n + '"';
				if (m[0].f) { e += ' target="' + m[0].f + '"'; }
			} else { e += '<b'; }
			if (m[0].t) { e += ' title="' + m[0].t + '"'; } e += '>' + m[0].n;
			if (m[0].u) { e += '</a>'; } else { e += '</b>'; }
			if (m.l.length > 1) {
				e += '</div><div class="sublinks">';
				for (j = 0;j < m.length) {
					if (m[j].u) {
						e += '<a href="' + m[j].n + '"';
						if (m[j].f) { e += ' target="' + m[j].f + '"'; }
					} else { e += '<b'; }
					if (m[j].t) { e += ' title="' + m[j].t + '"'; } e += '>' + m[j].n;
					if (m[j].u) { e += '</a>'; } else { e += '</b>'; }
				}
			} m = o.i; if (m.u || o.o.c) { e += '</div><div class="content">'; }
			if (m.u) {
				e += '<img src="' + m.u + '"';
				if (m.s || m.w || m.h) {
					e += ' style="';
					if (m.s) { e += 'width:' + m.s + ';height:' + m.s + ';'; }
					else {
						if (m.w) { e += 'width:' + m.w + ';'; }
						if (m.h) { e += 'height:' + m.h + ';'; }
					} e += '"';
				} e += ' alt="' + m.a + '" title="' + m.a + '" />'; 
			} m = o.o;
			if (m.c) { if (o.i.u) {	e += '<span>' + m.c; + '</span>'; }
				else { e += '<div>' + m.c + '</div>'; }
			} e += '</div><div class="data"><div>Genre: ';
			if(!m.g) { e += 'None'; } else {
				n = m.g.split(','); e += w.g[0];
				for (k = 1;k < n.length;k++) { e += ', ' + w.g[n[k]]; }
			} e += '</div><div>Rating: '; n = m.r;
			for (k = 0;k < n;k++) { e += '*'; } e += '</div><div class="tags">';
			n = m.t.split(',');
			for (k = 0;k < n.length;k++) { e += '<a href="?' + w.q.q + '=' + n[k] + '">' + n[k] + '</a>' }
			e += '</div></div></div>'; r.push(e); t++; e = null;
		}
	} wse.show(r);
}; wse.Qxml = function () {
	var a = arguments, e, i, j, m, o, r = list(), t; e = a[1]; a = a[0];
	if (a) {
		a = fujio.tags(a, 'xml')[0];
		a = fujio.kids(a, 'i');
		for (i = 0;i < a.length;i++) {
			o = obj(); o.l = list();
			m = fujio.tags(fujio.kids(a[i], 'l')[0], 'i');
			for (j = 0;j < m.length;j++) { t = obj(); t.u = m[j].url; t.f = m[j].frame; t.t = m[j].tip; t.v = m[j].nodeValue; o.l.push(t); }
			m = fujio.kids(a[i], 'i'); t = obj();
			t.u = m.url; t.s = m.size; t.w = m.width; t.h = m.height; t.a = m.nodeValue;
			o.i = t; m = fujio.kids(a[i], 'o'); t = obj();
			t.s = m.sticky; t.g = m.genre; t.t = t.tags; t.r = m.rating; t.c = m.nodeValue.replace('[', '<').replace(']', '>');
			o.o = t; r.push(o);
		} wse.Q(r);
	} else if (e.submit) { e.submit(); }
	else { loc.href = e.href; }
};
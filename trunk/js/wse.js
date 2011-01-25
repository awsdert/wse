function wse() {
	var a = arguments[0];
	GET = null;
	if (typeof a !== "string" || !a) { a = "wse.ini"; }
	f.ajax.ini(a, function () {
		var a = arguments; var x = a[0], t = null, q = wse.s.q, g = GET, s = x.Search;
		if (s) {
			t = s.FormID; if (t) { q.i.f = t; }
			t = s.SearchID; if (t) { q.i.q = t; }
		} GET = g;
		if (typeof a[1] === "string") { wse.s.r = a[1]; }
		f.get(); wse.cfg();
		// Here we make sure our values are defined and if the search terms are already defined then get on with the search
		if (wse.get()) { wse.search(); }
	});
}
wse.s = {
	s : { root : "", txt : "inc", html : "inc", results : (loc.protocol + "//" + loc.host + "/" + loc.pathname).replace("////", "///") }, q : {
		i : { f : "wse", c : "wse-cfg", q : "search", s : "sort", b : "by", l : "results", p : "pages", n : "page", g : "go", r : "info", t : "total" },
		n : { q : "Search Terms", s : "Sort", b : "By", l : "Results", p : "Pages", t : "Total" },
		v : { q : "*", s : "asc", b : "name", l : 10, p : 3, n : 1, t : 0 },
		c : { i : "input", p : "pagelinks", s : "sticky", r : "result" },
		d : { n : "?????", f : "_blank", g : "None", k : "all" }
	}
};
wse.get = function () {
	var g = GET, r = false, q = wse.s.q; var i = q.i, v = q.v;
	if (!g) { g = {}; }
	if (!g[i.q]) { g[i.q] = v.q; } else { r = true; }
	if (!g[i.s]) { g[i.s] = v.s; }
	if (!g[i.b]) { g[i.b] = v.b; }
	if (!g[i.l]) { g[i.l] = v.l; }
	if (!g[i.p]) { g[i.p] = v.p; }
	if (!g[i.n]) { g[i.n] = v.n; }
	if (!g[i.t]) { g[i.t] = v.t; }
	GET = g; return r;
};
wse.cfg = function () {
	var q = wse.s.q;
	var s = wse.s.s;
	var j = f(q.i.f);
	var i = 1;
	var o = null;
	if (j !== null) {
		if (j.innerHTML === "Service not available") { i = 0; }
		else {
			o = f(q.i.c);
			if (o.innerHTML === "&nbsp;+&nbsp;") { i = 1; }
			else { i = 0; } wse.cfg.pm = o.innerHTML;
		} if (i === 1) { f.ajax(s.root + s.html + "/wse-q.txt", wse.cfg.ajax, j); }
		else { f.ajax(s.root + s.html + "/wse-q2.txt", wse.cfg.ajax, j); }
	} return false;
};
wse.cfg.ajax = function () {
	var a = arguments; var x = a[0], j = a[1], g = GET, q = wse.s.q,
		t = null, i = 0, e1 = ' onfocus="wse.focus(this);"',
		e2 = ' onkeyup="wse.keyup(this, event);"',
		e3 = ' onblur="wse.blur(this);"',
		e4 = '" type="text" title="';
	if (x !== "") {
		x = x.replace('<form', '<form action="' + wse.s.s.results + '" method="get" onsubmit="return wse.submit();"');
		x = x.replace('<a id="wse-cfg">', '<a id="' + q.i.c + '" onclick="return wse.cfg();">');
		x = x.replace('<input id="wse-search">', '<input id="wse-search" name="wse-search' + e4 + q.n.q + '"' + e1 + e2 + e3 + ' />');
		x = x.replace('<button id="wse-submit">', '<button id="' + q.i.g + '" type="submit">');
		x = x.replace('<select id="wse-sort">', '<select id="wse-sort" name="wse-sort" title="' + q.n.s + '"' + e1 + e3 + '>');
		x = x.replace('<select id="wse-by">', '<select id="wse-by" name="wse-by" title="' + q.n.b + '"' + e1 + e3 + '>');
		x = x.replace('<input id="wse-results">', '<input id="wse-results" name="wse-results' + e4 + q.n.l + '"' + e1 + e2 + e3 + ' />');
		x = x.replace('<input id="wse-pages">', '<input id="wse-pages" name="wse-pages' + e4 + q.n.p + '"' + e1 + e2 + e3 + ' />');
		x = x.replace('<input id="wse-total">', '<input id="wse-total" name="wse-total' + e4 + q.n.t + '"' + e1 + e2 + e3 + ' />');
		x = x.replace('<input id="wse-page">', '<input id="wse-page" name="wse-page" type="hidden" />');
		x = x.replace(/(\x3c\x2f)label\x3e/g, ':</label>');
		x = x.replace(/wse(\x2d)search/g, q.i.q);
		x = x.replace(/wse(\x2d)sort/g, q.i.s);
		x = x.replace(/wse(\x2d)by/g, q.i.b);
		x = x.replace(/wse(\x2d)results/g, q.i.l);
		x = x.replace(/wse(\x2d)pages/g, q.i.p);
		x = x.replace(/wse(\x2d)total/g, q.i.t);
		x = x.replace(/wse(\x2d)page/g, q.i.n);
		var o = "&nbsp;-&nbsp;";
		if (o === wse.cfg.pm) { o = "&nbsp;+&nbsp;"; }
		j.innerHTML = "\n" + x + "\n";
		f(q.i.c).innerHTML = o;
		f(q.i.q).value = g[q.i.q];
		o = f(q.i.s);
		if (o) {
			t = f.tags(o, "option");
			for (i = 0;i < t.length;i++) {
				if (t[i].value === g[q.i.s]) {
					t[i].selected = "1";
					i = t.length;
				}
			} t = null;
		} o = f(q.i.b);
		if (o) {
			t = f.tags(o, "option");
			for (i = 0;i < t.length;i++) {
				if (t[i].value === g[q.i.b]) {
					t[i].selected = "1";
					i = t.length;
				}
			} t = null;
		} o = f(q.i.l); if (o) { o.value = g[q.i.l]; }
		o = f(q.i.p); if (o) { o.value = g[q.i.p]; }
		o = f(q.i.n); if (o) { o.value = g[q.i.n]; }
	}
};
wse.s2n = function () {
	var s = arguments[0];
	var r = 0;
	if (typeof s === "string" && /^[0-9]+(\.[0-9]+)?$/.test(s)) { r = (+s); }
	return r;
};
wse.fix = function () {
	var a = arguments[0];
	if (typeof a === "string") {
		a = a.replace(/(\x5c\x3f)s/g, ';');
		a = a.replace(/(\x5c\x3f)b/g, '\\');
		a = a.replace(/(\x5c\x3f)p/g, '^');
		a = a.replace(/(\x5c\x3f)e/g, '=');
	} else { a = ""; } return a;
};
wse.submit = function () { if (!f(wse.s.q.i.r)) { return true; } else { wse.terms = null; wse.search(); return false; } };
wse.search = function () {
	if (!wse.terms) {
		wse.page.data = null;
		f.ajax(wse.s.s.txt + "/wse.txt", function () {
			var a = arguments;
			var x = a[0].split("\n");
			var q = wse.s.q;
			var t = null, o = null, o2 = null;
			var i = 0, i1 = 0, i2 = 0, i3 = 0, i4 = 0;
			var l = [], l1 = null, l2 = null, l3 = null;
			var stopat = GET[q.i.t];
			for (i = 0;i < x.length;i++) {
				if (x[i].slice(0, 1) !== "#") {
					o = {
						l : { n : q.d.n, u : "", t : "", f : q.d.f },
						i : { u : "", a : "", w : "", h : "" }, s : [],
						o : { g : q.d.g, k : "*;" +
							q.d.k, s : false, c : "", r : 0 }
					};
					l1 = x[i].split(";;");
					for (i1 = 0;i1 < l1.length;i1++) {
						l2 = l1[i1].split("^");
						for (i2 = 1;i2 < l2.length;i2++) {
							switch (l2[0]) {
							case "link":
								t = l2[i2].split("=");
								switch (t[0]) {
								case "name": o.l.n = wse.fix(t[1]); break;
								case "url": o.l.u = wse.fix(t[1]); break;
								case "tooltip": o.l.t = wse.fix(t[1]); break;
								case "frame": o.l.f = wse.fix(t[1]); break;
								default: break;
								}
							break;
							case "sub":
								l3 = l2[i2].split(";");
								o2 = { n : q.d.n, u : "", t : "", f : q.d.f };
								for (i3 = 0;i3 < l3.length;i3++) {
									t = l3[i3].split("=");
									switch (t[0]) {
									case "name": o2.n = wse.fix(t[1]); break;
									case "url": o2.u = wse.fix(t[1]); break;
									case "tooltip": o2.t = wse.fix(t[1]); break;
									case "frame": o2.f = wse.fix(t[1]); break;
									default: break;
									} 
								} o.s.push(o2); o2 = null; l3 = null;
							break;
							case "image":
								t = l2[i2].split("=");
								switch (t[0]) {
								case "url": o.i.u = wse.fix(t[1]); break;
								case "alt": o.i.a = wse.fix(t[1]); break;
								case "size": o.i.w = wse.fix(t[1]); o.i.h = wse.fix(t[1]); break;
								case "width": o.i.w = wse.fix(t[1]); break;
								case "height": o.i.h = wse.fix(t[1]); break;
								default: break;
								}
							break;
							case "other":
								t = l2[i2].split("=");
								switch (t[0]) {
								case "genre": o.o.g = wse.fix(t[1]); break;
								case "tags": o.o.k += ";" + t[1]; break;
								case "content": o.o.c = wse.fix(t[1]); break;
								case "sticky": o.o.s = true; break;
								case "rating": o.o.r = wse.s2n(t[1]); break;
								default: break;
								}
							break;
							default: break;
							} t = null;
						} l2 = null;
					} l1 = null; l.push(o); o = null;
				}
			} x = null; x = []; t = false;
			o = GET[q.i.q].split(" ");
			o2 = ""; var k = { a1 : [], a2 : [], a3 : [], a4 : [], n1 : [], n2 : [] };
			for (i = 0;i < o.length;i++) {
				if (o2 === "") {
					if (/^(\+|\-)?\x22/.test(o[i])) {
						o2 = o[i];
						t = /\x22$/;
					} else if (/^(\+|\-)?\x27/.test(o[i])) {
						o2 = o[i];
						t = /\x27$/;
					} else if (/^(\+|\-)?\/.*/i.test(o[i])) {
						if (/\/[gim]*$/i.test(o[i])) { x.push(o[i]); }
						else {
							o2 = o[i];
							t = /\/[gim]*$/i;
						}
					} else { x.push(o[i]); }
				} else {
					o2 += " " + o[i];
					if (t.test(o[i])) {
						x.push(o2);
						o2 = "";
						t = null;
					}
				}
			} o = null; wse.terms = x;
			for (i = 0;i < x.length;i++) {
				if (/^\-/.test(x[i])) {
					if (/(\x22|\x27)$/.test(x[i])) { k.n1.push(x[i].slice(2, -1)); }
					else if (/^\x2d\x2f/.test(x[i])) {
						o = /\/[gim]*$/i;
						o2 = x[i].slice(x[i].search(o)).toLowerCase();
						x[i] = x[i].replace(o, "/"); o = "";
						if (/g/.test(o2)) { o += "g"; }
						if (/i/.test(o2)) { o += "i"; }
						if (/m/.test(o2)) { o += "m"; }
						if (o) { k.n2.push(new RegExp(x[i].slice(2, -1), o)); }
						else { k.n2.push(new RegExp(x[i].slice(2, -1))); }
					} else { k.n1.push(x[i].slice(1)); }
				} else if (/^\+/.test(x[i])) {
					if (/(\x22|\x27)$/.test(x[i])) { k.a3.push(x[i].slice(2, -2)); }
					else if (/^\x2b\x2f/.test(x[i])) {
						o = /\/[gim]*$/i;
						o2 = x[i].slice(x[i].search(o)).toLowerCase();
						x[i] = x[i].replace(o, "/"); o = "";
						if (/g/.test(o2)) { o += "g"; }
						if (/i/.test(o2)) { o += "i"; }
						if (/m/.test(o2)) { o += "m"; }
						if (o) { k.a4.push(new RegExp(x[i].slice(2, -1), o)); }
						else { k.a4.push(new RegExp(x[i].slice(2, -1))); }
					} else { k.a3.push(x[i].slice(1)); }
				} else {
					if (/(\x22|\x27)$/.test(x[i])) { k.a1.push(x[i].slice(1, -1)); }
					else if (/^\/.*/.test(x[i])) {
						o = /\/[gim]*$/i;
						o2 = x[i].slice(x[i].search(o)).toLowerCase();
						x[i] = x[i].replace(o, "/"); o = "";
						if (/g/.test(o2)) { o += "g"; }
						if (/i/.test(o2)) { o += "i"; }
						if (/m/.test(o2)) { o += "m"; }
						if (o) { k.a2.push(new RegExp(x[i].slice(1, -1), o)); }
						else { k.a2.push(new RegExp(x[i].slice(1, -1))); }
					} else { k.a1.push(x[i]); }
				} o = null; o2 = null;
			} x = null; x = [];
			if (stopat < 1 || stopat > l.length) { stopat = l.length; }
			for (i = 0;i < l.length;i++) {
				o = "name:" + l[i].l.n + ";" + l[i].l.t + ";genre:" + l[i].o.g + ";rating:" + l[i].o.r + ";content:" + l[i].o.c + ";" + l[i].o.k;
				o = o.toLowerCase();
				if (k.a1.length > 0 || k.a2.length > 0) {
					for (i1 = 0;i1 < k.a1.length;i1++) {
						if (o.indexOf(k.a1[i1]) >= 0) {
							t = true;
							i1 = k.a1.length;
					} } if (!t) {
						for (i1 = 0;i1 < k.a2.length;i1++) {
							t = k.a2[i1].test(o);
							if (t) { i1 = k.a2.length; }
					} }
				} else { t = true; } if (t) {
					for (i1 = 0;i1 < k.a3.length;i1++) {
						if (o.indexOf(k.a3[i1]) < 0) {
							t = false;
							i1 = k.a3.length;
					} } if (t) {
						for (i1 = 0;i1 < k.a4.length;i1++) {
							t = k.a4[i1].test(o);
							if (!t) { i1 = k.a4.length; }
					} } if (t) {
						for (i1 = 0;i1 < k.n1.length;i1++) {
							if (o.indexOf(k.n1[i1]) >= 0) {
								t = false;
								i1 = k.n1.length;
					} } } if (t) {
						for (i1 = 0;i1 < k.a4.length;i1++) {
							if (k.a4[i1].test(o)) {
								t = false;
								i1 = k.a4.length;
					} } }
				} if (t) {
					o = "<!--" + l[i].o.s + ";";
					switch (GET[q.i.b]) {
					case "number": o += i; break;
					case "genre": o += l[i].o.g + ";" + l[i].l.n + ";" + l[i].o.r; break;
					case "rating": o += l[i].o.r + ";" + l[i].l.n + ";" + l[i].o.g; break;
					default: o += l[i].l.n + ";" + l[i].o.g + ";" + l[i].o.r; break;
					} o += "-->\n<div class=\"";
					if (l[i].o.s) { o += q.c.s; }
					else { o += q.c.r; }
					o += "\"><div><a";
					if (l[i].l.u !== "") {
						o += " href=\"" + l[i].l.u + "\"";
						if (l[i].l.f !== "") { o += " target=\"" + l[i].l.f + "\""; }
					} if (l[i].l.t !== "") { o += " title=\"" + l[i].l.t + "\""; }
					o += ">" + l[i].l.n + "</a></div><div>";
					if (l[i].s.length > 0) {
						for (i1 = 0;i1 < l[i].s.length;i1++) {
							if (i1 > 0) { o += " "; }
							o += "<a";
							if (l[i].s[i1].u !== "") {
								o += " href=\"" + l[i].s[i1].u + "\"";
								if (l[i].s[i1].f !== "") { o += " target=\"" + l[i].s[i1].f + "\""; }
							} if (l[i].s[i1].t !== "") { o += " title=\"" + l[i].s[i1].t + "\""; }
							o += ">" + l[i].s[i1].n + "</a>";
						} o += "</div><div>";
					} if (l[i].i.u !== "") {
						o += "<img src=\"" + l[i].i.u + "\"";
						if (l[i].i.a !== "") { o += " alt=\"" + l[i].i.a + "\""; }
						if (l[i].i.w !== "" || l[i].i.h !== "") {
							o += " style=\"";
							if (l[i].i.w !== "") { o += "width:" + l[i].i.w; }
							if (l[i].i.h !== "") {
								if (l[i].i.w !== "") { o += ";"; }
								o += "height:" + l[i].i.h + ";";
							} o += "\"";
						} o += " /> ";
					} o += "<span>" + l[i].o.c + "</span></div><div>Genre: " + l[i].o.g + "</div><div>Rating: ";
					if (l[i].o.r > 0) { for (i1 = 0;i1 < l[i].o.r;i1++) { o += "*"; } } else { o += "None"; }
					o += "</div><div>Tags: " + l[i].o.k.replace(/\;/g, ", ") + "</div></div>\n";
					x.push(o);
					if (!l[i].o.s) { i4++; }
					if (i4 === stopat) { i = l.length; }
				} t = false;
			} wse.page(x);
		});
	} else { wse.page(); }
};
wse.page = function () {
	var a = arguments[0];
	var q = wse.s.q, g = GET;
	var r = f(q.i.r);
	var p = g[q.i.n];
	if (!a) { a = wse.page.data; }
	else if (typeof a === "number") {
		p = a;
		a = wse.page.data;
	} else { wse.page.data = a; }
	if (r && a.length > 0) {
		var s = "";
		var f = 0, u = a.length;
		var l1 = [], l2 = [];
		var l = g[q.i.l];
		var v = null, v2 = null, v3 = null;
		if (p < 1) { p = 1; }
		f = (p * l) - l; u = p * l;
		a.sort();
		if (g[q.i.s] === "desc")  { a.reverse(); }
		for (var i = 0;i < a.length;i++) {
			if (/^(\x3c\x21\x2d\x2d)TRUE/i.test(a[i])) { v = true; }
			v2 = a[i].replace(/^\x3c\x21\x2d\x2d(TRUE|FALSE)\;?/i, "<!--");
			if (v) { l1.push(v2); }
			else { l2.push(v2); }
			v = null;
			v2 = null;
		}
		// HEADER
		s += wse.page.x2y(f, u, l2.length);
		s += wse.page.f2l(g[q.i.p], g[q.i.l], l2.length);
		// STICKIES
		if (l1.length > 3) {
			v = Math.round(Math.random() * l1.length);
			v2 = v - 1; if (v2 < 0) { v2 = 0; }
			v3 = v + 1; if (v3 > l1.length) { v3 = l1.length; }
		} else { v2 = 0; v3 = l1.length; }
		for (i = v2;i < v3;i++) { s += l1[i]; }
		// RESULTS
		v2 = (p - 1) * l; if (v2 < 0) { v2 = 0; }
		v3 = p * l; if (v3 > l2.length) { v3 = l2.length; }
		for (i = v2;i < v3;i++) { s += l2[i]; }
		// FOOTER
		s += wse.page.f2l(g[q.i.p], g[q.i.l], l2.length);
		s += wse.page.x2y(f, u, l2.length);
		r.innerHTML = s;
	} return false;
};
wse.page.f2l = function () {
	var a = arguments, q = wse.s.q;
	var s = "", p = a[0], l = a[1], t = a[2], n = GET[q.i.n];
	if (t > 1) {
		var i = Math.floor(p / 2);
		var f = n - i, u = (n + i) + 1;
		t = Math.ceil(t / l);
		if (f < 1) { f = 1; }
		if (u > t) { u = t + 1; }
		var tmp = '<a href="?' + q.i.q + '=' + encodeURI(GET[q.i.q]);
		if (f(q.i.c).innerHTML === "&nbsp;-&nbsp;") {
			tmp += '&amp;' + q.i.s + '=' + GET[q.i.s] + '&amp;' +
				q.i.b + '=' + GET[q.i.b] + '&amp;' +
				q.i.l + '=' + GET[q.i.l] + '&amp;' +
				q.i.p + '=' + GET[q.i.p] + '&amp;' +
				q.i.t + '=' + GET[q.i.t] + '&amp;';
		} tmp += '&amp;' + q.i.n + '=';
		s = '<p class="' + q.c.p + '">';
		for (i = f;i < u;i++) {
			if (i > f) { s += " "; }
			s += tmp + i + '" onclick="return wse.page(' +
				i + ');">' + i + '</a>';
		} s += "</p>";
	} return s;
};
wse.page.x2y = function () {
	var a = arguments;
	var x = a[0], y = a[1], z = a[2], r = "";
	if (!x) { x = 1; }
	if (y && z) {
		if (y > z) { y = z; }
		if (x > 1) { x++; }
		r = "<p>" + x + " to " + y + " of " + z + " for";
		var g = GET, n = wse.s.q.i, k = wse.terms;
		var tmp = '';
		if (f(n.c).innerHTML === "&nbsp;-&nbsp;") {
			tmp += '&amp;' + n.s + '=' + GET[n.s] + '&amp;' +
				n.b + '=' + GET[n.b] + '&amp;' +
				n.l + '=' + GET[n.l] + '&amp;' +
				n.p + '=' + GET[n.p] + '&amp;' +
				n.t + '=' + GET[n.t] + '&amp;';
		} for (var i = 0;i < k.length;i++) {
			r += ' <a href="?' + n.q + '=' +
				encodeURI(k[i]) + tmp + '">' + k[i] + '</a>';
		} r += "</p>";
	} return r;
};
wse.d = {
	create : function () {
		var e = f("wse-d"), l = [], i;
		var li = f.tags(e, "input"), ls = f.tags(e, "select");
		for (i = 0;i < li.length;i++) { l.push(li[i]); }
		for (i = 0;i < ls.length;i++) { l.push(ls[i]); }
		li = null; li = (+f("to").value);
		ls = null; ls = {};
		for (i = 0;i < l.length;i++) { ls[l[i].id] = l[i].value; }
		i = f("to_type").value;
		var t = build(li, i, ls);
		f("d-info").innerHTML += t;
	}, build : function () {
		var a = arguments, r = "";
		var o = a[2], t, i, n;
		switch (a[0]) {
		case 1: break;
		case 4:
			if (/(rss|xml)/.test(a[1])) {
				t = o.aName; t = t.replace('<', '&lt;'); t = t.replace('>', '&gt;'); o.aName = t;
				if (o.oContent) {
					t = o.oContent; t = t.replace('<', '&lt;');
					t = t.replace('>', '&gt;'); o.oContent = t; 
				} t = null;
			} switch (a[1]) {
			case "js": r = 's[] = "' + o.aName + '^';
				if (o.aURL) { r += t.aURL; } r += '^';
				if (o.oContent) { r += o.oContent; } r += '^';
				if (o.aFrame) { r += t.aFrame; } r += '^';
				if (o.oRank) { r += o.oRank; } r += '";';
			break;
			case "rss": r = '<item><title>' + o.aName + '</title>';
				if (o.aURL) { r += '<link>' + o.aURL + '</link>'; }
				if (o.o) {
					t = o.o;
					if (t.Content) { r += '<description>' + t.Content + '</description>'; }
					t = null;
				} r += '</item>';
			
			break;
			case "xml": r = '<page><title>' + o.aName + '</title>';
				if (o.aURL) { r += '<url>' + o.aURL + '</url>'; }
				if (o.aFrame) { r += '<open>' + o.aFrame + '</open>'; }
				if (o.o) {
					t = o.o;
					if (t.Content) { r += '<content>' + t.Content + '</content>'; }
					if (t.Rank) { r += '<rank>' + t.Rank + '</rank>'; }
					t = null;
				} r += '</page>';
			break;
			default: break;
			}
		break;
		case 5: break;
		case 6: break;
		case 7: break;
		case 8:
			switch (a[1]) {
			case "ini": break;
			case "json": r = '{ "l" : { "n" : "' + o.aName + '"';
				if (o.aURL) { r += ', "u" : "' + o.aURL + '"'; }
				if (o.aTip) { r += ', "t" : "' + o.aTip + '"'; }
				if (o.aFrame) { r += ', "f" : "' + o.aFrame + '"'; }
				r += ' }';
				if (o.imgURL) {
					r += ', "i" : { "u" : "' + o.imgURL + '"';
					if (o.imgALT) { r += ', "a" : "' + o.imgALT + '"'; }
					if (o.imgSize) { r += ', "s" : "' + o.imgSize + '"'; }
					if (o.imgW) { r += ', "w" : "' + o.imgW + '"'; }
					if (o.imgH) { r += ', "h" : "' + o.imgH + '"'; }
					r += ' }';
				} if (o.s) {
					t = o.s; r += ', "s" : [';
					for (i = 0;i < t.length;i++) {
						if (t[i].Name) {
							if (n) { r += ', '; }
							r += '{ "n" : "' + t[i].aName;
							if (t[i].aURL) { r += ', "u" : "' + t[i].aURL; }
							if (t[i].aTip) { r += ', "t" : "' + t[i].aTip; }
							if (t[i].aFrame) { r += ', "f" : "' + t[i].aFrame; }
							r += ' }'; n = true;
						}
					} t = null; n = null; r += ' ]';
				} if (o.o) {
					r += ', "o" : { "g" : "';
					if (t.Genre) { r += t.Genre + '"'; }
					else { r += wse.s.q.d.g + '"'; }
					if (t.Content) { r += ', "c" : "' + t.Content; }
					if (t.Rank) { r += ', "r" : ' + t.Rank; }
					if (t.Tags) { r += ', "k" : "' + t.Tags; }
					if (t.Sticky) { r += ', "s"'; }
					r += ' }';
				} r += ' }';
			break;
			case "txt": r = 'link^name=' + o.aName;
				if (o.aURL) { r += '^url=' + o.aURL; }
				if (o.aTip) { r += '^tip=' + o.aTip; }
				if (o.aFrame) { r += '^frame=' + o.aFrame; }
				if (o.imgURL) {
					r += ';;img^url=' + o.imgURL;
					if (o.imgALT) { r += '^alt=' + o.imgALT; }
					if (o.imgSize) { r += '^size=' + o.imgSize; }
					if (o.imgW) { r += '^width=' + o.imgW; }
					if (o.imgH) { r += '^height=' + o.imgH; }
				} if (o.s) {
					t = o.s; r += ';;sub';
					for (var i = 0;i < t.length;i++) {
						if (t[i].Name) {
							r += '^name=' + t[i].aName;
							if (t[i].aURL) { r += ';url=' + t[i].aURL; }
							if (t[i].aTip) { r += ';tip=' + t[i].aTip; }
							if (t[i].aFrame) { r += ';frame=' + t[i].aFrame; }
						}
					} t = null;
				} if (o.o) {
					t = o.o; r += ';;other'
					if (t.Genre) { r += '^genre=' + t.Genre; }
					if (t.Content) { r += '^content=' + t.Content; }
					if (t.Rank) { r += '^rating=' + t.Rank; }
					if (t.Tags) { r += '^tags=' + t.Tags; }
					if (t.Sticky) { r += '^sticky'; }
				}
			break;
			case "xml": r = '<item><link><n>' + o.aName + '</n>';
				if (o.aURL) { r += '<u>' + o.aURL + '</u>'; }
				if (o.aTip) { r += '<t>' + o.aTip + '</t>'; }
				if (o.aFrame) { r += '<f>' + o.aFrame + '</f>'; }
				r += '</link>';
				if (o.imgURL) {
					r += '<img><u>' + o.imgURL + '</u>';
					if (o.imgALT) { r += '<a>' + o.imgALT + '</a>'; }
					if (o.imgSize) { r += '<s>' + o.imgSize + '</s>'; }
					if (o.imgW) { r += '<w>' + o.imgW + '</w>'; }
					if (o.imgH) { r += '<h>' + o.imgH + '</h>'; }
					r += '</img>';
				} if (o.s) {
					t = o.s; r += '<sub>';
					for (var i = 0;i < t.length;i++) {
						if (t[i].Name) {
							r += '<sl><n>' + t[i].aName + '</n>';
							if (t[i].aURL) { r += '<u>' + t[i].aURL + '</u>'; }
							if (t[i].aTip) { r += '<t>' + t[i].aTip + '</t>'; }
							if (t[i].aFrame) { r += '<f>' + t[i].aFrame + '</f>'; }
							r += '</sl>';
						}
					} t = null; r += '</sub>';
				} if (o.o) {
					t = o.o; r += '<other>'
					if (t.Genre) { r += '<g>' + t.Genre; }
					if (t.Content) { r += '<c>' + t.Content; }
					if (t.Rank) { r += '<r>' + t.Rank; }
					if (t.Tags) { r += '<t>' + t.Tags; }
					if (t.Sticky) { r += '<s />'; }
					r += '</other>';
				} r += '</item>';
			break;
			default: break;
			}
		break;
		default: break;
		} return r;
	}, file : function () { var t = ""; wse.d.change(t); }, change : function () {}
};
wse.dat = function () {
	var a = arguments[0]
	return true;
};
wse.dat.verl = function () {
	f.ajax(wse.s.s.txt + 'wse-vl.txt', function () {
		var s = arguments[0];
		s = s.replace('<o v', '<option value');
		s = s.replace('o>', 'option>');
		wse.dat.vl = s;
	}, null);
};
wse.focus = function () {
	var e = arguments[0], i = wse.s.q.i, v = wse.s.q.v;
	if (e && e.id && e.value) {
		switch (e.id) {
		case i.q: if (e.value === v.q) { e.value = ""; } break;
		case i.l: if ((+e.value) === v.l) { e.value = ""; } break;
		case i.p: if ((+e.value) === v.p) { e.value = ""; } break;
		case i.p: if ((+e.value) === v.t) { e.value = ""; } break;
		}
	}
};
wse.keyup = function () {
	var a = arguments;
	var e = a[0], k = a[1], i = wse.s.q.i;
	if (!k) { k = self.event; }
	var n = k.which ? k.which : k.keyCode;
	if (e && e.id && e.value) {
		if (e.id === i.l || e.id === i.p) {
			e.value = e.value.replace(/[^\d]/g, ""); }
	} if (n === 13) {
		wse.blur(e);
		wse.submit();
	}
};
wse.blur = function () {
	var e = arguments[0], g = GET, i = wse.s.q.i;
	if (e && e.id) {
		if (!e.value) { e.value = g[e.id]; }
		else {
			if (e.id === i.l || e.id === i.p) { g[e.id] = (+e.value); }
			else { g[e.id] = e.value; }
			GET = g;
		}
	}
};
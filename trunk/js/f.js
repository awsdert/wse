/*jslint browser: true, onevar: true, white: false, undef: false, forin: true, maxerr: 30*/
var self = this, GET = null, INI = null;
var doc = self.document, loc = self.location, nav = self.navigator;
// Error Handler
self.onerror = function () { var a = arguments;
	alert('JavaScript Error...\n\n' +
		'\nFile: ' + a[1] + '\nLine: ' + a[2] +
		'\nDescription: ' + a[0]); };
// Quick case change
function lcase () { return arguments[0].toLowerCase(); }
function ucase () { return arguments[0].toUpperCase(); }
function pcase () { return arguments[0].replace(re('\\w\\S*', 'g'), function() {
	var a = arguments[0]; return ucase(a.charAt(0)) + lcase(a.substr(1)); }); }
/* Quick Declarers
Useful for browsers that do not support direct creation (o = {}; etc) of these */
function list () { var a = arguments, r = new Array(), i;
	for (i = 0;i < a.length;i++) { r[i] = a[i]; } return r; }
function obj () { return new Object(); }
function re () { var a = arguments, r, t = RegExp; if (!a[0] || !isTxt(a[0])) { a[0] = ''; }
	if (a[1] && isTxt(a[1])) { r = new t(a[0], a[1]); } else { r = new t(a[0]); } return r; }
// Quick Testers
function is () { var a = arguments, i, r = false; if (a.length === 3) {
		for (i = 0;i < a.length;i++) { if (!isNum(a[i])) { a[i] = null; } }
		if (a && a[2] >= a[0] && a[2] <= a[1]) { r = true; }
	} else { if (typeof a[0] === 'unkown') { r = true; } } return r; }
function isVar () { var a = arguments[0], r = false; if (isTxt(a) || isNum(a) || isBool(a)) { r = true; } return r; }
function isTxt () { var r = false; if (typeof arguments[0] === 'string') { r = true; } return r; }
function isBool () { var a = arguments[0], r = false, t = re('^(true|false)$', 'i');
		if (typeof a === 'boolean' || (isTxt(a) && t.test(a))) { r = true; } return r; }
function isNum () { var r = false; if (!isNaN(arguments[0])) { r = true; } return r; }
function isMethod () { var r = false; if (typeof arguments[0] === 'function') { r = true; } return r; }
function isObj () { var r = false; if (typeof arguments[0] === 'object') { r = true; } return r; }
function isList () { var a = arguments[0], r = false; if (typeof a === 'object') {
		if (a[0]) { r = true; }
		else { try { a[0] = 0; a[0] = null; r = true; } catch (e) {} }
	} return r; }
function isArray () { var a = arguments[0], r = false; if (a && a.splice) { r = true; } return r; }
function isDom () { var a = arguments[0], r = false; if (a && a.getElementsByTagName) { r = true; } return r; }
function isDoc () { var a = arguments[0], r = false; if (a && (a.getElementById || a.all)) { r = true; } return r; }
function isHtml () { var a = arguments[0], r = false; if (a && a.innerHTML) { r = true; } return r; }
// Main Code
function fujio () {
	var a = arguments, r = null, d = doc, i = 0;
	if (a.length > 1) { if (isDoc(a[0])) { d = a[0]; } i = 1; } a = a[i];
	if (d.getElementById) { r = d.getElementById(a); }
	else if (d.all) { r = d.all[a]; } return r;
} fujio.init = function () {
	var a = arguments[0], t, t2; INI = obj();
	if (!a || !isTxt(a)) { a = 'fujio.ini'; }
	t = fujio.uri; if (t) { GET = t(loc.href).GET; }
	t = fujio.ajax; t2 = fujio.init.ini;
	if (t && t.ini) { t.ini(a, t2); } else { t2(); }
	t = fujio.ui; if (t && t.init) { t.init(); }
}; fujio.init.init = function () {
	var a = arguments[0], o = obj(), i, n;
	o.m = obj(); o.m.r = ''; o.m.i = ''; o.a = obj(); o.a.add = 'false';
	o.a.u = 'f-ajax'; o.a.m = 'post'; o.a.a = 'true'; o.p = obj();
	o.p.add = 'false'; o.p.u = 'f-parse'; o.u = obj(); o.u.add = 'false';
	o.u.u = 'f-ui'; if(a) {
		for (i in a) {
			switch (i) { case 'Main': for (n in a[i]) {
					switch (n) { case 'root': o.m.r = a[i][n]; break;
					case 'inc': o.m.i = a[i][n]; break; } } break;
			case 'AJAX': for (n in a[i]) {
					switch (n) { case 'add': o.a.add = a[i][n]; break;
					case 'url': o.a.u = a[i][n]; break;
					case 'method': o.a.m = a[i][n]; break;
					case 'async': o.a.a = a[i][n]; break; } } break;
			case 'Parse': for (n in a[i]) {
					switch (n) { case 'add': o.p.add = a[i][n]; break;
					case 'url': o.p.u = a[i][n]; break; } } break;
			case 'UI': for (n in a[i]) {
					switch (n) { case 'add': o.u.add = a[i][n]; break;
					case 'url': o.u.u = a[i][n]; break; } } break; } }
	} t = null; a = null; INI.fujio = o; o = null;
}; var f = fujio;
fujio.uri = function () {
	var a = arguments[0], r = null, i, t, l, g;
	if (isTxt(a)) {
		r = {
			uri : a,
			url : a.split('#')[0].split('?')[0],
			pcol : a.match(re('^[a-z][0-9a-z]*\\:', 'i')) + '//',
			subd : a.match(re('\\/\\/[a-z][0-9a-z]*\\..', 'i')).slice(2, -2),
			dmain : a.match(re('[a-z][-0-9a-z]*\\.[a-z]+(\\.[a-z]+)?(\\:\\d+)?\\/', 'i')),
			path : '',
			file : '',
			ext : '',
			id : a.split('#')[1].split('?')[0],
			get : a.split('?')[1].split('#')[0],
			GET : null,
			toString : function () {
				var s = '{';
				s += '\n\turi : \'' + this.uri + '\'';
				s += '\n\turl : \'' + this.url + '\'';
				s += '\n\tpcol : \'' + this.pcol + '\'';
				s += '\n\tsubd : \'' + this.subd + '\'';
				s += '\n\tdmain : \'' + this.dmain + '\'';
				s += '\n\tpath : \'' + this.path + '\'';
				s += '\n\tfile : \'' + this.file + '\'';
				s += '\n\text : \'' + this.ext + '\'';
				s += '\n\tid : \'' + this.id + '\'';
				s += '\n\tget : \'' + this.get + '\'';
				s += '}'; }
		}; if (r.dmain[-1] === '/' || r.dmain[-1] === '\\') { r.dmain = r.dmain.slice(0, -1); }
		g = re(r.dmain + '.*(\\#|\\?)?');
		r.path = r.uri.match(g).slice(r.dmain.length);
		if (r.path[-1] === '#' || r.path[-1] === '?') { r.path = r.path.slice(0, -1); }
		r.file = r.path.match(re('[-0-9a-z]*\\.[0-9a-z]+$', 'i'));
		r.path = r.path.slice(0, -(r.file.length));
		r.ext = r.file.match(re('\\.[0-9a-z]+$')).slice(1);
		r.file = r.file.slice(0, -(r.ext.length + 1));
		l = r.get.split('&'); g = obj();
		if (l.length > 0) {
			for (i = 0;i < l.length;i++) {
				t = l[i].split('=');
				g[t[0]] = t[1];
				if (isBool.test(t[1])) {
					t[1] = lcase(t[1]);
					if (t[1] === 'true') { g[t[0]] = true; }
					else { g[t[0]] = false; }
				} else if (isNum.test(t[1])) { g[t[0]] = (+t[1]); }
				else if (t[1] === '') { g[t[0]] = true; }
			} r.GET = g;
		}
	} return r;
};
fujio.up = function () {
	var a = arguments, r = null, i, t = null, e, n, v; e = a[0];
	for (i = 1;i < 4;i++) { if (!a[i] || !isTxt(a[i])) { a[i] = null; } }
	n = a[1];v = a[3];a = a[2]; if (isDom(e)) {
		if (e.parentNode) { e = e.parentNode; }
		else if (e.parent) { e = e.parent; }
		else { e = null; }
		if (e) {
			if (n) { n = lcase(n); if (lcase(e.nodeName) !== n) { e = fujio.up(e, n); } }
			if (a) { t = fujio.attr(e, a); if (v && t !== v) { e = fujio.up(e, n, a, v); } } r = e;
		} } return r; };
fujio.tags = function () {
	var a = arguments, e, n, v, r = list(), l, i; e = a[0];
	if (!isDom(e)) { e = doc; n = a[0]; v = [2]; a = [1]; }
	else { n = a[1]; v = a[3]; a = a[2]; }
	if (!n || !isTxt(n)) { n = '*'; } l = e.getElementsByTagName(n);
	for (i = 0;i < l.length;i++) { r.push(l[i]); } l = null;
	if (a && isTxt(a)) {
		a = a.toLowerCase();
		if (v && isTxt(v)) {
			for (i = 0;i < r.length;i++) {
				if (fujio.attr(r[i], a) !== v)
					{ r.splice(i, 1); i--; }
			} } else {
			for (i = 0;i < r.length;i++) {
				if (!fujio.attr(r[i], a))
					{ r.splice(i, 1); i--; }
			} } } return r; };
fujio.kids = function () {
	var a = arguments, e, n, v, r = list(), l, i; e = a[0];
	if (!isDom(e)) { e = doc; n = a[0]; v = [2]; a = [1]; }
	else { n = a[1]; v = a[3]; a = a[2]; }
	if (!n || !isTxt(n)) { n = null; }
	else { n = lcase(n); } l = e.childNodes;
	for (i = 0;i < l.length;i++) {
		if (n && lcase(l[i].nodeName) === n) { r.push(l[i]); }
		else { r.push(l[i]); }
	} l = null;
	if (a && isTxt(a)) { a = lcase(a);
		if (v && isTxt(v, 'text')) {
			for (i = 0;i < r.length;i++) {
				if (fujio.attr(r[i], a) !== v) { r.splice(i, 1); i--; }
			} } else {
			for (i = 0;i < r.length;i++) {
				if (!fujio.attr(r[i], a)) { r.splice(i, 1); i--; }
			} } } return r; };
fujio.html = function () { var a = arguments, e, v, r = ''; e = a[0]; v = a[1];
	if (isHtml(e)) { if (isTxt(v)) { e.innerHTML = v; }
		r = e.innerHTML; } return r; };
fujio.attr = function () {
	var a = arguments, r = null, l, i, s, e, v, t1, t2, t3;
	e = a[0]; v = a[2]; a = lcase(a[1]); if (!a || !isTxt(a)) { a = null; }
	if (!isTxt(v)) { v = null; } if (isDom(e) && a) {
		t1 = /^function anonymous\(\) \{\n */; t2 = /\n\}$/; t3 = /^on/;
		if (a === 'style') {
			s = e.style; if (!v) { v = s.cssText; }
			l = v.split(';'); v = /\: ?/;
			for (i = 0;i < l.length;i++) {
				a = l[i].split(v); a[0] = lcase(a[0]);
				if (a[1]) { fujio.css(e, a[0], a[1]); }
				l[i] = a.join(':'); a = null;
			} r = l.join(';'); l = null; if (r.charAt(-1) !== ';') { r += ';'; }
		} else {
			if (a === 'for') { a = 'htmlFor'; }
			else if (a === 'class') { a = 'className'; }
			if (v) {
				if (v === '') { e[a] = null; } else {
					if (t3.test(a)) { e[a] = new Function(v); }
					else { e[a] = v; }
				}
			} if (t3.test(a)) { r = fujio.strip(e[a], t1, t2); }
			else { r = e[a]; }
		}
	} return r;
};
fujio.strip = function () {
	var a = arguments, r = '', i, o; o = a[0];
	if (o && o.toString) { o = o.toString();
		for (i = 1;i < a.length;i++) {
			try { o = o.replace(a[i], ''); }
			catch (e) { throw { message : 'fujio.strip(): argument ' + i +
				' is not usable, consult "http://www.w3schools.com/jsref/jsref_replace.asp" for reason' }; }
		} } return r; };
// Get / Set Styling
fujio.css = function () {
	var a = arguments, e, v, s, c = null, w = self, r = null; e = a[0]; v = a[2]; a = a[1];
	if (e && e.style && isTxt(a)) {
		s = e.style; a = lcase(a);
		if (e.currentStyle) { c = e.currentStyle; }
		else if (w.getComputedStyle) { c = w.getComputedStyle(e, null); }
		if (a === 'float') {
			if (c.cssFloat) { a = 'cssFloat'; }
			else { a = 'styleFloat'; }
		} else {
			a = a.replace(/\-a/g, 'A'); a = a.replace(/\-b/g, 'B'); a = a.replace(/\-c/g, 'C');
			a = a.replace(/\-d/g, 'D'); a = a.replace(/\-e/g, 'E'); a = a.replace(/\-f/g, 'F');
			a = a.replace(/\-g/g, 'G'); a = a.replace(/\-h/g, 'H'); a = a.replace(/\-i/g, 'I');
			a = a.replace(/\-j/g, 'J'); a = a.replace(/\-k/g, 'K'); a = a.replace(/\-l/g, 'L');
			a = a.replace(/\-m/g, 'M'); a = a.replace(/\-n/g, 'N'); a = a.replace(/\-o/g, 'O');
			a = a.replace(/\-p/g, 'P'); a = a.replace(/\-q/g, 'Q'); a = a.replace(/\-r/g, 'R');
			a = a.replace(/\-s/g, 'S'); a = a.replace(/\-t/g, 'T'); a = a.replace(/\-u/g, 'U');
			a = a.replace(/\-v/g, 'V'); a = a.replace(/\-w/g, 'W'); a = a.replace(/\-x/g, 'X');
			a = a.replace(/\-y/g, 'Y'); a = a.replace(/\-z/g, 'Z');
		} if (c && c[a]) {
			if (v && typeof v === typeof c[a])
				{ s[a] = v; r = v; } else { r = c[a]; }
		} else { v = null; }
	} return r;
};
fujio.ajax = function () {
	var a = arguments, o, d, x, u, t, m, s; o = a[0]; d = a[2]; a = a[1];
	if (isTxt(o)) { t = o; o = obj(); o.u = t; }
	u = o.u; x = fujio.ajax.xhr(); if (!d) { d = null; }
	if (!isMethod(a)) { a = function () {}; }
	if (isObj(o) && x && u && isTxt(u)) {
		a = o.a; m = o.m; s = o.s;
		if (!isBool(a)) { a = true; } if (isTxt(m, 'text')) { m = ucase(m);
			if (!/^(CONNECT|DELETE|GET|H(EAD|TTP)|OPTIONS|P(ATCH|OST|UT)|TRACE)$/.test(m)) { m = "POST"; }
		} else { m = "POST"; } if (!s) { s = null; }
		if (x.overrideMimeType) { x.overrideMimeType("text/plain"); }
		x.open(m, u, a); x.onreadystatechange = function () {
			if (x.readyState === 4) {
				if (x.status === 200 || x.status === 0) { a(x.responseText, d); }
				else { a('', d); }
			}
		}; x.send(s);
	} else { a('', d); }
}; fujio.ajax.xhr = function () {
	var x = null, w = self;
	try { x = new w.XMLHttpRequest(); } catch (e) {
		try { x = new w.contentRequest(); } catch (e) {
		    try { x = new w.ActiveXObject("MSXML2.XMLHTTP.3.0"); }
			catch (e) { x = null; }
		}
	} return x;
}; fujio.ajax.ini = function () {
	var a = arguments, d; d = [a[2], a[1]];
	fujio.ajax(a[0], function () {
		var a = arguments, x, d, r = null, i, n, t; x = a[0]; d = a[1][0]; a = a[1][1];
		if (!isMethod(a)) { f = function () {}; }
		if (x !== '') {
			r = obj(); x = x.split('\n');
			for (i = 0;i < x.length;i++) {
				if (re('^\\[.*\\]$').test(x[i])) {
					n = x[i].slice(1, -1); r[n] = obj();
				} else if (n && re('^[a-z]', 'i').test(x[i])) {
					t = x[i].split('='); if (!t[1]) { t[1] = ''; }
					r[n][t[0]] = t[1]; t = null;
				}
			}
		} a(r, d);
	}, d);
}; fujio.parse = obj(); fujio.ui = obj(); fujio.data = obj();
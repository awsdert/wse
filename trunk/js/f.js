var self = this, GET = null, INI = {};
var doc = self.document, loc = self.location, nav = self.navigator;
self.onerror = function () {
	var a = arguments;
	alert('JavaScript Error...' +
		'\nFile: ' + a[1] + '\nLine: ' + a[2] +
		'\nDescription: ' + a[0]); };
function fujio () {
	var a = arguments, r = null, d = doc, i = 0;
	if (a.length > 1) { d = a[0]; i = 1; } a = a[i];
	if (d.getElementById) { r = d.getElementById(a); }
	else if (d.all) { r = d.all[a]; } return r;
}; fujio.init = function () {
	var a = arguments[0];
	if (fujio.is(fujio.uri)) { GET = fujio.uri(loc.href).GET; }
	if (fujio.is(fujio.ajax.ini))
		{ fujio.ajax.ini(a, function () { INI.fujio = arguments[0]; }, null); }
	if (fujio.is(fujio.ui)) { fujio.ui(); }
}; var f = fujio;
fujio.is = function () {
	var a = arguments, i, r = false;
	if (a.length < 3) {
		switch (a[1]) {
		case 'array':
			if (typeof a[0] === 'object') { if (a[0][0] || /list/i.test(a[0].toString())) { r = true; }
			else { try { a[0][0] = 0; a[0][0] = null; r = true; } catch (e) {} } }
		break;
		case 'bool': if (typeof a[0] === 'boolean') { r = true; } break;
		case 'method': if (typeof a[0] === 'function') { r = true; } break;
		case 'number': if (typeof a[0] === 'number') { r = true; } break;
		case 'object': if (typeof a[0] === 'object') { r = true; } break;
		case 'text': if (typeof a[0] === 'string') { r = true; } break;
		case 'var': if (typeof a[0] !== 'object' && typeof a[0] !== 'function') { r = true; } break;
		default: if (typeof a[0] !== 'unknown') { r = true; } break; }
	} else if (a.length === 3) {
		for (i = 0;i < a.length;i++) { if (typeof a[i] !== "number") { a = null; } }
		if (a && a[2] >= a[0] && a[2] <= a[1]) { r = true; }
	} return r;
};
fujio.uri = function () {
	var a = arguments[0], r = null, i, t, l, g;
	if (fujio.is(a, 'text')) {
		r = {
			uri : a,
			url : a.split('#')[0].split('?')[0],
			pcol : a.match(/^[a-z][0-9a-z]*\:/i) + '//',
			subd : a.match(/\/\/[a-z][0-9a-z]*\../i).slice(2, -2),
			dmain : a.match(/([a-z][-0-9a-z]*\.[a-z]+(\.[a-z]+)?\/|[a-z]\:\\)/i),
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
		g = new RegExp(r.dmain + '.*(\#|\?)?');
		r.path = r.uri.match(g).slice(r.dmain.length);
		if (r.path[-1] === '#' || r.path[-1] === '?') { r.path = r.path.slice(0, -1); }
		r.file = r.path.match(/[-0-9a-z]*\.[0-9a-z]+$/i);
		r.path = r.path.slice(0, -(r.file.length));
		r.ext = r.file.match(/\.[0-9a-z]+$/).slice(1);
		r.file = r.file.slice(0, -(r.ext.length + 1));
		l = r.get.split('&'); g = {};
		if (l.length > 0) {
			for (i = 0;i < l.length;i++) {
				t = l[i].split('=');
				g[t[0]] = t[1];
				if (/^FALSE$/i.test(t[1])) { g[t[0]] = false; }
				else if (/^TRUE$/i.test(t[1])) { g[t[0]] = true; }
				else if (/^[0-9]+$/.test(t[1])) { g[t[0]] = parseInt(t[1], 10); }
				else if (t[1] === '') { g[t[0]] = null; }
			} r.GET = g;
		}
	} return r;
};
// Get Parent
fujio.up = function () {
	var a = arguments, r = null, i, l, t = null; var e = a[0], n, v;
	for (i = 1;i < 4;i++) { if (!a[i] || !fujio.is(a[i], 'text')) { a[i] = null; } }
	n = a[1];v = a[3];a = a[2];
	if (e && e.nodeName) {
		if (e.parentNode) { e = e.parentNode; }
		else if (e.parent) { e = e.parent; }
		else { e = null; }
		if (e) {
			if (n) {
				n = n.toLowerCase();
				if (e.nodeName.toLowerCase() !== n) { e = fujio.up(e, n); }
			} if (a) {
				t = fujio.attr(e, a);
				if (v && t !== v) { e = fujio.up(e, n, a, v); }
			} r = e;
		}
	} return r;
};
// Get Elements
fujio.tags = function () {
	var a = arguments; var e = a[0], n = a[1], v = a[3], r = []; a = a[2];
	if (e && e.nodeName && fujio.is(n, 'text') && n !== '') {
		r = e.getElementsByTagName(n);
		if (fujio.(a, 'text') && a !== '') {
			a = a.toLowerCase();
			if (fujio.is(v, 'text') && v !== '') {
				for (i = 0;i < r.length;i++) {
					if (fujio.attr(r[i], a) !== v)
						{ r.splice(i, 1); i--; }
				}
			} else {
				for (i = 0;i < r.length;i++) {
					if (!fujio.attr(r[i], a))
						{ r.splice(i, 1); i--; }
				}
			}
		}
	} return r; };
// Get / Set Inner HTML
fujio.html = function () { var a = arguments; var e = a[0], c = a[1], r = ""; if (e && e.innerHTML) { if (fujio.def.txt(c)) e.innerHTML = c; r = e.innerHTML; } return r; };
// Get / Set Attribute
fujio.attr = function () {
	var a = arguments, r = null, l, i, s, e, v, t1, t2, t3;
	e = a[0]; v = a[2]; a = a[1].toLowerCase();
	if (!a || !fujio.is(a, 'text')) { a = null; }
	if (!fujio.is(v, 'text')) { v = null; }
	if (e && e.nodeName && a) {
		t1 = /^function anonymous\(\) \{\n */, t2 = /\n\}$/, t3 = /^on/;
		if (a === 'style') {
			s = e.style; if (!v) { v = s.cssText; }
			l = v.split(';'); v = /\: ?/;
			for (i = 0;i < l.length;i++) {
				a = l[i].split(v); a[0] === a[0].toLowerCase();
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
	var a = arguments, r = '', i; var o = a[0];
	if (o && o.toString) {
		o = o.toString();
		for (i = 1;i < a.length;i++) {
			try { o = o.replace(a[i], ''); }
			catch (e) { throw { message : 'fujio.strip(): argument ' + i +
					' is not usable, consult ' +
					'"http://www.w3schools.com/jsref/jsref_replace.asp"' +
					' for reason'
				};
			}
		}
	} return r;
};
// Get / Set Styling
fujio.css = function () {
	var a = arguments, e, v, s, c = null, w = self, r = null; e = a[0]; v = a[2]; a = a[1];
	if (e && e.style && fujio.is(a, 'text')) {
		s = e.style a = a.toLowerCase();
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
	var a = arguments; var o = a[0], f = a[1], d = a[2], x = null;
	if (fujio.is(o, 'text')) { x = o; o = { u : x }; x = null; }
	var u = o.u; x = fujio.ajax.xhr(); if (!d) { d = null; }
	if (!fujio.is(f, 'method')) { f = function () {}; }
	if (fujio.is(o, 'object') && x && fujio.is(u, 'text') && u !== "") {
		a = o.a; var m = o.m, s = o.s;
		if (!fujio.is(a, 'bool')) { a = true; }
		if (fujio.is(m, 'text')) {
			m = m.toUpperCase();
			if (!/^(CONNECT|DELETE|GET|H(EAD|TTP)|OPTIONS|P(ATCH|OST|UT)|TRACE)$/.test(m)) { m = "POST"; }
		} else { m = "POST"; } if (!s) { s = null; }
		if (x.overrideMimeType) { x.overrideMimeType("text/plain"); }
		x.open(m, u, a); x.onreadystatechange = function () {
			if (x.readyState === 4) {
				if (x.status === 200 || x.status === 0) f(x.responseText, d);
				else f("", d);
			}
		}; x.send(s);
	} else { f("", d); }
}; fujio.ajax.xhr = function () {
	var x = null, w = window;
	try { x = new w.XMLHttpRequest(); } catch (e) {
		try { x = new w.contentRequest(); } catch (e) {
		    try { x = new w.ActiveXObject("MSXML2.XMLHTTP.3.0"); }
			catch (e) { x = null; }
		}
	} return x;
};
fujio.parse = {
	dom : function () {
		var a = arguments; var t = a[1], a = a[0], x = null;
		if (fujio.is(a, 'text') && a !== "") {
			if (t === "html") {
				x = document.createElement('iframe').contentDocument;
				x.write(a);
			} else {
				var w = self;
				var f = w.DOMParser;
				if (f) {
					var p = new f();
					x = p.parseFromString(a, "text/xml");
				} else {
					f = w.ActiveXObject;
					if (f) {
						x = new f("Microsoft.XMLDOM");
						x.async = "false";
						x.loadXML(a);
					}
				}
			}
	} return x; }, num : function () {
		var n = arguments[0], x = 0;
		if (fujio.def.txt(n) && /^([0-9]|\,)+(\.([0-9]|\,)+)?$/.test(n))
			{ x = (+a[0].replace(",", "")); }
		return x;
	}, json : function () {
		var a = arguments, r = null;
		var s = a[0], f = a[1];
		if (fujio.def.txt(s)) {
			var c = Components, t = null;
			if (!fujio.def.fun) { f = null; }
			if (JSON) {
				t = JSON;
				if (t.parse) { r = t.parse(s, f); }
				else if (t.fromString) { r = t.fromString(s, f); }
				else { t = null; }
			} if (!t && c) {
				var ci = c.interfaces, cc = c.classes;
				t = cc["@mozilla.org/dom/json;1"].createInstance(ci.nsIJSON);
				if (t) { r = t.decode(s); }
			}
		} return r;
	}
};
fujio.test = function () {
  var r = false, e;
  if (doc.getElementById || doc.all || doc.layers) {
    e = fujio(arguments[0]); if (e && e.offsetWidth) { r = true; }
  } return r;
};
fujio.ui = function () {
	if (fujio.is(fujio.ui.tab)) { fujio.ui.tab.init(); }
	if (fujio.is(fujio.ui.pbar)) { fujio.ui.pbar.init(); }
	if (fujio.is(fujio.ui.reader)) { fujio.ui.reader.init(); }
};
fujio.ui.pbar = function () {
	var e = arguments[0];
	if (e && e.id && e.value && /^(\d|\,)+(\.(\d|\,)+)?$/.test(e.value)) {
		var t = fujio(e.id + 'Txt'), b = fujio(e.id + 'Bar'), v = e.value(/\,/g, '') + '%';
		if (t) { fujio.html(t, v); }
		if (b) { fujio.css(b, 'width', v); }
	}
};
fujio.ui.tab = function () {
	var a = arguments, r = true, e, u, p, i; e = a[0]; a = a[1];
	if (!fujio.is(a, 'method')) { a = null; }
	if (e && e.nodeName && e.href) {
		u = fujio.uri(e.href); p = fujio.up(e, '*', 'class', 'tabs');
		if (p && u) {
			fujio.ajax(u.GET[p.id], fujio.ui.tab.ajax, [e, u, a]); a = fujio.tags(p, 'a');
			for (i = 0;i < a.length;i++) { a[i].className = ''; } e.className = "tab"; r = false;
		}
	} return r;
}; fujio.ui.tab.ajax = function () {
	var a = arguments, x, e, u, b, i; x = a[0]; a = a[1]; e = a[0]; u = a[1]; a = a[2];
	if (!x) { loc.href = u.uri; } else {
		b = fujio(u.id + "Box");
		if (/^FUNCTION/i.test(x)) {
			x.replace(/\^FUNCTION.*$/img, '');
			if (a) { a(b, a[0].slice(8)); }
		} x.replace(/\<script.*script\>/ig, '<span>SCRIPT</span>');
		fujio.html(b, x);
	}
};
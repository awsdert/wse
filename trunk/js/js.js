var self = this, GET = null;
var doc = self.document, loc = self.location;
// Error Handler
self.onerror = function () {
	var a = arguments;
	alert("JavaScript Error...\n\n" +
		"Description: " + a[0] +
		"\nFile: " + a[1] +
		"\nLine: " + a[2]); };
// Extra functions
Math.between = function () {
	var a = arguments, i, r = false;
	for (i = 0;i < a.length;i++) { if (typeof a[i] !== "number") { a = null; } }
	if (a && a[2] >= a[0] && a[2] <= a[1]) { r = true; } return r;
};
// Get ID
function fujio () { var i = arguments[0]; if (doc.getElementById) { return doc.getElementById(i); } if (doc.all) { return doc.all[i]; } return null; }
// Create GET Object
fujio.get = function () {
	var r = false; if (!GET) {
		var g = {}, s = loc.search.slice(1);
		if (s !== "") {
			var l = s.split("&"), t;
			for (var i = 0;i < l.length;i++) {
				t = l[i].split("=");
				if (!t[1] || /^TRUE$/i.test(t[1])) { g[t[0]] = true; }
				else if (/^FALSE$/i.test(t[1])) { g[t[0]] = false; }
				else if (/^\-?(\d|\,)+(\.(\d|\,)+)?$/.test(t[1])) { g[t[0]] = (+t[1].replace(/\,/g, "")); }
				else { g[t[0]] = decodeURI(t[1]); }
			} GET = g; r = true; } }
	else { r = true; } return r; };
// Get Tags
fujio.tags = function () {
	var a = arguments; var e = a[0], n = a[1], v = a[3], r = []; a = a[2];
	if (e && e.nodeName && fujio.def.txt(n) && n !== "") {
		r = e.getElementsByTagName(n);
		if (fujio.def.txt(a) && a !== "") {
			a = a.toLowerCase();
			if (fujio.def.txt(v) && v !== "") {
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
	var a = arguments; var e = a[0], v = a[2], r = null, a = a[1].toLowerCase();
	if (e && e.nodeName && fujio.def.txt(a) && a !== "") {
		if (fujio.def.txt(v)) {
			if (v === "") { e.removeAttribute(a); }
			else {
				switch (a) {
				case "class": e.className = v; break;
				case "for": e.htmlFor = v; break;
				case "style": e.style.cssText = v; break;
				case "onblur": e.onblur = new Function(v); break;
				case "onclick": e.onclick = new Function(v); break;
				case "onchange": e.onchange = new Function(v); break;
				case "ondblclick": e.ondblclick = new Function(v); break;
				case "onfocus": e.onfocus = new Function(v); break;
				case "onkeydown": e.onkeydown = new Function(v); break;
				case "onkeypress": e.onkeypress = new Function(v); break;
				case "onkeyup": e.onkeyup = new Function(v); break;
				case "onmousedown": e.onmousedown = new Function(v); break;
				case "onmousemove": e.onmousemove = new Function(v); break;
				case "onmouseout": e.onmouseout = new Function(v); break;
				case "onmouseover": e.onmouseover = new Function(v); break;
				case "onmouseup": e.onmouseup = new Function(v); break;
				case "onresize": e.onresize = new Function(v); break;
				default: e.setAttribute(a, v); break; }
			}
		} var t1 = /^function anonymous\(\) \{\n */, t2 = /\n\}$/;
		switch (a) {
		case "class": r = e.className; break;
		case "for": r = e.htmlFor; break;
		case "style": r = e.style.cssText; break;
		case "onblur": r = e.onblur.toString().replace(t1, "").replace(t2, ""); break;
		case "onclick": r = e.onclick.toString().replace(t1, "").replace(t2, ""); break;
		case "onchange": r = e.onchange.toString().replace(t1, "").replace(t2, ""); break;
		case "ondblclick": r = e.ondblclick.toString().replace(t1, "").replace(t2, ""); break;
		case "onfocus": r = e.onfocus.toString().replace(t1, "").replace(t2, ""); break;
		case "onkeydown": r = e.onkeydown.toString().replace(t1, "").replace(t2, ""); break;
		case "onkeypress": r = e.onkeypress.toString().replace(t1, "").replace(t2, ""); break;
		case "onkeyup": r = e.onkeyup.toString().replace(t1, "").replace(t2, ""); break;
		case "onmousedown": r = e.onmousedown.toString().replace(t1, "").replace(t2, ""); break;
		case "onmousemove": r = e.onmousemove.toString().replace(t1, "").replace(t2, ""); break;
		case "onmouseout": r = e.onmouseout.toString().replace(t1, "").replace(t2, ""); break;
		case "onmouseover": r = e.onmouseover.toString().replace(t1, "").replace(t2, ""); break;
		case "onmouseup": r = e.onmouseup.toString().replace(t1, "").replace(t2, ""); break;
		case "onresize": r = e.onresize.toString().replace(t1, "").replace(t2, ""); break;
		default: r = (e.getAttributeNode(a).nodeValue || null); break; }
	} return r;
};
// Get / Set Styling
fujio.css = function () {
		var a = arguments;
		var e = a[0], v = a[2], a = a[1];
		if (e && e.style && fujio.def.txt(a)) {
			var s = e.style, c = null, w = window; a = a.toLowerCase();
			if (e.currentStyle) { c = e.currentStyle; }
			else if (w.getComputedStyle) { w.getComputedStyle(e, null); }
			if (a === "float") {
				if (c.cssFloat) { a = "cssFloat"; }
				else { a = "styleFloat"; }
			} else {
				a = a.replace(/\-a/g, "A"); a = a.replace(/\-b/g, "B"); a = a.replace(/\-c/g, "C");
				a = a.replace(/\-d/g, "D"); a = a.replace(/\-e/g, "E"); a = a.replace(/\-f/g, "F");
				a = a.replace(/\-g/g, "G"); a = a.replace(/\-h/g, "H"); a = a.replace(/\-i/g, "I");
				a = a.replace(/\-j/g, "J"); a = a.replace(/\-k/g, "K"); a = a.replace(/\-l/g, "L");
				a = a.replace(/\-m/g, "M"); a = a.replace(/\-n/g, "N"); a = a.replace(/\-o/g, "O");
				a = a.replace(/\-p/g, "P"); a = a.replace(/\-q/g, "Q"); a = a.replace(/\-r/g, "R");
				a = a.replace(/\-s/g, "S"); a = a.replace(/\-t/g, "T"); a = a.replace(/\-u/g, "U");
				a = a.replace(/\-v/g, "V"); a = a.replace(/\-w/g, "W"); a = a.replace(/\-x/g, "X");
				a = a.replace(/\-y/g, "Y"); a = a.replace(/\-z/g, "Z");
			} if (c && c[a]) {
				if (v && typeof v === typeof c[a]) { s[a] = v; }
				else { v = c[a]; }
			} else { v = null; }
		} return v;
	};
/* Is it...
	* Defined?
	* Text?
	* A Number?
	* Boolean?
	* A Function?
	* An Object? If yes is it of this Type?
*/
fujio.def = function () { if (arguments[0]) return true; return false; };
fujio.def.txt = function () { if (typeof arguments[0] === "string") return true; return false; };
fujio.def.num = function () { if (typeof arguments[0] === "number") return true; return false; };
fujio.def.bol = function () { if (typeof arguments[0] === "boolean") return true; return false; };
fujio.def.fun = function () { if (typeof arguments[0] === "function") return true; return false; };
fujio.def.obj = function () {
	var a = arguments;
	var b = false;
	if (typeof a[0] === "object") {
		b = true;
		switch (a[1]) {
		case "array": if(!a[0].length) { b = false; }; break;
		case "dom": if(!a[0].nodeName) { b = false; } break;
		case "html": if(!a[0].innerHTML) { b = false; } break;
		case "doc": b = /^\[object .*Document\]$/.test(a[0]); break;
		default: break;
		}
	} return b;
};
// Get from Text File
fujio.ajax = function () {
	var a = arguments; var o = a[0], f = a[1], d = a[2], x = null;
	if (fujio.def.txt(o)) { x = o; o = { u : x }; x = null; }
	var u = o.u; x = fujio.ajax.xhr(); if (!d) { d = null; }
	if (!fujio.def.fun(f)) { f = function () {}; }
	if (fujio.def.obj(o) && x && fujio.def.txt(u) && u !== "") {
		a = o.a; var m = o.m, s = o.s;
		if (!fujio.def.bol(a)) { a = true; }
		if (fujio.def.txt(m)) {
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
};
// Create Request Object
fujio.ajax.xhr = function () {
	var x = null, w = window;
	try { x = new w.XMLHttpRequest(); } catch (e) {
		try { x = new w.contentRequest(); } catch (e) {
		    try { x = new w.ActiveXObject("MSXML2.XMLHTTP.3.0"); }
			catch (e) { x = null; }
		}
	} return x;
};
// Get Web Document
fujio.ajax.dom = function () {
	var a = arguments; var d = [a[2], a[1]];
	fujio.ajax(a[0], function () {
		var a = arguments; var d = a[1][0], f = a[1][1], a = a[0];
		if (!fujio.def.fun(f)) { f = function () {}; }
		f(fujio.parse.dom(a), d);
	}, d);
};
// Get Settings
fujio.ajax.ini = function () {
	var a = arguments; var d = [a[2], a[1]];
	fujio.ajax(a[0], function () {
		var a = arguments; var d = a[1][0], f = a[1][1], a = a[0], r = null;
		if (!fujio.def.fun(f)) { f = function () {}; }
		if (a !== "") {
			var i, n, t; r = {};
			a = a.split("\n");
			for (i = 0;i < a.length;i++) {
				if (/^\[.*\]$/.test(a[i])) {
					n = a[i].slice(1, -1); 
					r[n] = {};
				} else if (n && /^[a-z]/i.test(a[i])) {
					t = a[i].split("=");
					if (!t[1]) { t[1] = ""; }
					r[n][t[0]] = t[1];
					t = null;
				}
			}
		} f(r, d);
	}, d);
};
// Get Feed
fujio.ajax.rss = function () {
	var a = arguments; var d = [a[2], a[1]];
	fujio.ajax.dom(a[0], function () {
		var a = arguments;
		var d = a[1][0], f = a[1][1], a = a[0],
			r = [], l, l2, l3, t, x, i, i2, i3, i4, o;
		if (!fujio.def.fun(f)) { f = function () {}; }
		x = fujio.tags(a, "channel");
		for (i = 0;i < x.length;i++) {
			r[i] = { attr : {}, genres : [], hours : [], days : [], list : [] }; l = x[i].childNodes;
			for (i2 = 0;i2 < l.length;i2++) {
				t = l[i2].nodeName;
				if (t === "item") {
					o = {}; l2 = l[i2].childNodes;
					for (i3 = 0;i3 < l2.length;i3++) {
						t = l2[i3].nodeName;
						if (t !== "#text") {
							o[t] = {
								attr : {},
								val : l2[i3].childNodes[0].nodeValue
							}; l3 = l2[i3].attributes;
							if (l3) {
								for (i4 = 0;i4 < l3.length;i4++) {
									o[t].attr[l3[i4].nodeName] = l3[i4].nodeValue;
							} } l3 = null;
						}
					} r[i].list.push(o); o = null;
				} else if (t === "category") {
					r[i].genres.push(l[i2].childNodes[0].nodeValue);
				} else if (t === "skipHours") {
					l2 = fujio.tags(l[i2], "hour");
					for (i3 = 0;i3 < l2.length;i3++) {
						r[i].hours.push((+l2[i3].childNodes[0].nodeValue));
					}
				} else if (t === "skipDays") {
					l2 = fujio.tags(l[i2], "day");
					for (i3 = 0;i3 < l2.length;i3++) {
						r[i].days.push((+l2[i3].childNodes[0].nodeValue));
					}
				} else if (t === "ttl") {
					r[i][t] = (+l[i2].childNodes[0].nodeValue);
				} else {
					if (t !== "#text") {
						r[i][t] = {
							attr : {},
							val : l[i2].childNodes[0].nodeValue
						}; l2 = l[i2].attributes;
						if (l2) {
							for (i3 = 0;i3 < l2.length;i3++) {
								r[i][t].attr[l2[i3].nodeName] = l2[i3].nodeValue;
						} }
					}
				} l2 = null;
			} l = null; l = x[i].attributes;
			for (i2 = 0;i2 < l.length;i2++) {
				r[i].attr[l[i2].nodeName] = l[i2].nodeValue;
			} l = null;
		} f(r, d);
	}, d);
};
// Parse strings into objects
fujio.parse = {
	dom : function () {
		var a = arguments; var t = a[1], a = a[0], x = null;
		if (fujio.def.txt(a) && a !== "") {
			if (t === "html") {
				x = document.createElement("span");
				x.innerHTML = a;
			} else {
				var w = window;
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
// Test if CSS is enabled
fujio.test = function () {
  var r = false;
  if (document.all || document.layers || document.getElementById) {
    var e = fujio(arguments[0]);
    if (e && e.offsetWidth) { r = true; }
  } return r;
};
// Simple User Interface
fujio.ui = {
	tab : function () {
		var a = arguments; var e = a[0];
		if (!a[1]) { a[1] = null; }
		if (e && e.nodeName && e.href) {
			var u = e.href.split("#")[1].split("?"), l, t, i,
				d = fujio.ui.tab.data, f = fujio.ui.tab.ajax;
			l = u[1].split("&"); for (i = 0;i < l.length;i++) {
				t = l[i].split("=");
				if (t[0] === "tabs") {
					t = t[1].split(";");
					i = l.length;
				}
			} u = e.href.split("#")[0]; u = u.slice(0, u.lastIndexOf("/") + 1);
			for (i = 0;i < t.length;i++) {
				l = u + t[i] + ".txt";
				if (!d) { fujio.ajax(l, f, [t[i], e, a[1]]); } else {
					 if (t[i] !== d[i]) {
					 	fujio.ajax(l, f, [t[i], e, a[1]]);
					 }
				}
			} fujio.ui.tab.data = t;
			return false;
		} return true;
	}, pbar : function () {
		var e = arguments[0];
		if (e.id && e.value && /^(\d|\,)+(\.(\d|\,)+)?$/.test(e.value)) {
			var t = fujio(e.id + "-txt"), b = fujio(e.id + "-bar"), v = e.value(/\,/g, "") + "%";
			if (t) { fujio.html(t, v); }
			if (b) { fujio.css(b, "width", v); }
		}
	}
};
// Tab UI Dependancies
fujio.ui.tab.data = null;
fujio.ui.tab.ajax = function () {
	var a = arguments; var e = a[1][1];
	if (!a[0]) { window.location.href = e.href; }
	else {
		var p = e.parentNode; var b = fujio(p.id + "-box");
		if (/^FUNCTION/i.test(a[0])) { if (fujio.def.fun(a[2])) { a[2](b, a[0].slice(8)); } }
		// Comment out if your text files are secure
		else if (/\<script/i.test(a[0])) { fujio.html(b, "Error: SCRIPT tags are not allowed via fujio.ui.tab()."); }
		else { fujio.html(b, a[0]); }
		a = fujio.tags(p, "a");
		for (var i = 0;i < a.length;i++) { a[i].className = ""; }
		e.className = "tabx";
		e = fujio(e.href.split("#")[1].split("?")[0]);
		if (e.parentNode.className === "tabl") { fujio.ui.tab(e); }
	}
};
var f = fujio;
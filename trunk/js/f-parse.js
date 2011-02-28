fujio.parse.dom = function () {
	var a = arguments, x, t, w = self, s, p; t = a[1]; s = a[0]; x = null;
	if (s && isTxt(s)) {
		if (t === 'html') {
			x = doc.createElement('iframe');
			if (x.contentDocument) { x = x.contentDocument; }
			else if (x.contentWindow) { x = x.contentWindow; }
			x.write(a);
		} else { a = w.DOMParser;
			if (a) { p = new a(); x = p.parseFromString(s, "text/xml"); }
			else { a = w.ActiveXObject;
				if (a) {
					x = new a("Microsoft.XMLDOM");
					x.async = "false";
					x.loadXML(s);
				} } } } return x; };
fujio.parse.num = function () {
	var n = arguments[0], r = 0;
	if (isTxt(n)) { n = n.replace(',', '');
		if (isNum(n)) { r = (+n); }
	} else if (isNum(n)) { r = n; } return r; };
fujio.parse.obj2txt = function () {
var a = arguments[0], i, r = '';
	for (i in a) {
	switch (typeof a[i]) {
	case 'object': r += i + ' : { ' + test(a[i]) + ' }, '; break;
	case 'function': break; // Comment out or delete line if need functions shown too 
	case 'string': r += i + ' : "' + a[i] + '", '; break;
	default: r += i + ' : ' + a[i] + ', '; break; }
	} r = r.slice(0, -2); return r; };
fujio.parse.json = function () {
	var a = arguments, r = null, s, c = Components, ci, cc, t; s = a[0]; a = a[1];
	if (isTxt(s)) {
		if (!isMethod(a)) { a = null; }
		if (JSON) { t = JSON;
			if (t.parse) { r = t.parse(s, a); }
			else if (t.fromString) { r = t.fromString(s, a); }
			else { t = null; }
		} if (!t && c) {
			ci = c.interfaces; cc = c.classes;
			t = cc["@mozilla.org/dom/json;1"].createInstance(ci.nsIJSON);
			if (t) { r = t.decode(s); }
		} } return r; };
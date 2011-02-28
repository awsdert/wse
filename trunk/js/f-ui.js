fujio.ui.pbar = function () {
	var e = arguments[0];
	if (e && e.id && e.value && /^(\d|\,)+(\.(\d|\,)+)?$/.test(e.value)) {
		var t = fujio(e.id + 'Txt'), b = fujio(e.id + 'Bar'), v = e.value(/\,/g, '') + '%';
		if (t) { fujio.html(t, v); }
		if (b) { fujio.css(b, 'width', v); }
	} };
fujio.ui.tab = function () {
	var a = arguments, r = true, e, u, p, i; e = a[0]; p = a[2]; a = a[1];
	if (!isMethod(a)) { a = null; }
	if (e && e.nodeName && e.href) {
		u = fujio.uri(e.href); p = fujio.up(e, '*', 'class', 'tabs');
		if (p && u) {
			fujio.ajax(u.GET[p.id], fujio.ui.tab.ajax, [e, u, a]); a = fujio.tags(p, 'a');
			for (i = 0;i < a.length;i++) { a[i].className = ''; } e.className = "tab"; r = false;
		}
	} return r; };
fujio.ui.tab.ajax = function () {
	var a = arguments, x, e, u, b; x = a[0]; a = a[1]; e = a[0]; u = a[1]; a = a[2];
	if (!x) { loc.href = u.uri; } else {
		b = fujio(u.id + "Box");
		if (re('^function', 'i').test(x)) {
			x.replace(re('^function.*$', 'img'), '');
			if (a) { a(b, a[0].slice(8)); }
		} x.replace(re('\\<script.*script\\>', 'ig'), '<span class="warn">SCRIPT</span>');
		fujio.html(b, x); fujio.ui.tab.init(fujio(u.id));
	} };
fujio.ui.tab.init = function () {
	var a = arguments[0], b, i, ini = INI.fujio.ui, j, l, m;
	if (isDom(a)) {
		b = fujio(a.id + 'Box');
		if (re('^\\<(\\?|\\%|\\!\\-\\-(\\#|tab))').test(b.innerHTML)) {
			l = list(a); a = ini.tabMethod;
		} } else { a = ini.tabMethod;
		if (!a || !isTxt(a)) { a = ''; } else { a = ', ' + a; }
		ini.tabMethod = a; INI.fujio.ui = ini; ini = null;
		l = fujio.tags('*', 'class', 'tabs');
	} if (l) {
		for (i = 0;i < l.length;i++) {
			m = fujio.tags(l[i], 'a');
			for (j = 0;j < m.length;j++) {
				m[j].onclick = new Function('fujio.ui.tab(this' + a +');');
				if (m[j].className === 'tab') { m[j].onclick(); }
			} } } };
fujio.ui.reader = function () {
	var a = arguments[0], e, c, n, u, i;
	e = fujio.up(a, '*', 'class', 'reader'); if (e) {
		c = fujio(e.id + 'Chapter').value; n = fujio(e.id + 'PageNo').value;
		i = fujio(e.id + 'Page'); if (i.src) {
			u = fujio.uri(i.src); if (/!\..*$/.test(n)) { n += '.jpg'; }
			i.src = u.pcol + u.subd + u.dmain + u.path + 'c' + c + 'p' + n;  
		} } };

var BMapLib = window.BMapLib = BMapLib || {}; (function() {
	var d, c = d = c || {
		version: "1.3.9"
	};
	c.guid = "$BAIDU$"; (function() {
		c.dom = c.dom || {};
		c.event = c.event || {};
		c.lang = c.lang || {};
		c.browser = c.browser || {};
		c.dom.addClass = function(p, q) {
			p = c.dom.g(p);
			var k = q.split(/\s+/),
			j = p.className,
			o = " " + j + " ",
			n = 0,
			m = k.length;
			for (; n < m; n++) {
				if (o.indexOf(" " + k[n] + " ") < 0) {
					j += (j ? " ": "") + k[n]
				}
			}
			p.className = j;
			return p
		};
		c.addClass = c.dom.addClass;
		c.dom.removeClass = function(p, q) {
			p = c.dom.g(p);
			var n = p.className.split(/\s+/),
			r = q.split(/\s+/),
			l,
			k = r.length,
			m,
			o = 0;
			for (; o < k; ++o) {
				for (m = 0, l = n.length; m < l; ++m) {
					if (n[m] == r[o]) {
						n.splice(m, 1);
						break
					}
				}
			}
			p.className = n.join(" ");
			return p
		};
		c.removeClass = c.dom.removeClass;
		c.dom.getComputedStyle = function(j, i) {
			j = c.dom._g(j);
			var l = c.dom.getDocument(j),
			k;
			if (l.defaultView && l.defaultView.getComputedStyle) {
				k = l.defaultView.getComputedStyle(j, null);
				if (k) {
					return k[i] || k.getPropertyValue(i)
				}
			}
			return ""
		};
		c.dom.getStyle = function(j, i) {
			var l = c.dom;
			j = l.g(j);
			var k = j.style[i] || (j.currentStyle ? j.currentStyle[i] : "") || l.getComputedStyle(j, i);
			return k
		};
		c.getStyle = c.dom.getStyle;
		c.dom.getDocument = function(i) {
			i = c.dom.g(i);
			return i.nodeType == 9 ? i: i.ownerDocument || i.document
		};
		c.dom.g = function(i) {
			if ("string" == typeof i || i instanceof String) {
				return document.getElementById(i)
			} else {
				if (i && i.nodeName && (i.nodeType == 1 || i.nodeType == 9)) {
					return i
				}
			}
			return null
		};
		c.g = c.G = c.dom.g;
		c.dom._g = function(i) {
			if (c.lang.isString(i)) {
				return document.getElementById(i)
			}
			return i
		};
		c._g = c.dom._g;
		c.lang.isString = function(i) {
			return "[object String]" == Object.prototype.toString.call(i)
		};
		c.isString = c.lang.isString;
		c.event._listeners = c.event._listeners || [];
		c.event.on = function(j, m, o) {
			m = m.replace(/^on/i, "");
			j = c.dom._g(j);
			var n = function(q) {
				o.call(j, q)
			},
			i = c.event._listeners,
			l = c.event._eventFilter,
			p,
			k = m;
			m = m.toLowerCase();
			if (l && l[m]) {
				p = l[m](j, m, n);
				k = p.type;
				n = p.listener
			}
			if (j.addEventListener) {
				j.addEventListener(k, n, false)
			} else {
				if (j.attachEvent) {
					j.attachEvent("on" + k, n)
				}
			}
			i[i.length] = [j, m, o, n, k];
			return j
		};
		c.on = c.event.on;
		c.event.un = function(k, n, j) {
			k = c.dom._g(k);
			n = n.replace(/^on/i, "").toLowerCase();
			var q = c.event._listeners,
			l = q.length,
			m = !j,
			p, o, i;
			while (l--) {
				p = q[l];
				if (p[1] === n && p[0] === k && (m || p[2] === j)) {
					o = p[4];
					i = p[3];
					if (k.removeEventListener) {
						k.removeEventListener(o, i, false)
					} else {
						if (k.detachEvent) {
							k.detachEvent("on" + o, i)
						}
					}
					q.splice(l, 1)
				}
			}
			return k
		};
		c.un = c.event.un;
		if (/msie (\d+\.\d)/i.test(navigator.userAgent)) {
			c.browser.ie = c.ie = document.documentMode || +RegExp["\x241"]
		}
	})();
	var f = BMapLib.TrafficControl = function() {
		this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
		this.defaultOffset = new BMap.Size(10, 10)
	};
	f.prototype = new BMap.Control();
	f.prototype.initialize = function(k) {
		var i = e("div", {
			title: "&#x663E;&#x793A;&#x4EA4;&#x901A;&#x6D41;&#x91CF;",
			id: "tcBtn",
			"class": "maplibTcBtn maplibTcBtnOff"
		});
		k.getContainer().appendChild(i);
		this._map = k;
		this._popUpDiv(this, i);
		var j = this;
		return i
	};
	f.prototype._popUpDiv = function(E, u) {
		var v = ["&#x67E5;&#x770B;&#x5B9E;&#x65F6;&#x8DEF;&#x51B5;", "&#x6D41;&#x91CF;&#x9884;&#x6D4B;"];
		var k = ["&#x67E5;&#x770B;&#x6D41;&#x91CF;&#x9884;&#x6D4B;", "&#x5B9E;&#x65F6;&#x8DEF;&#x51B5;"];
		var y = true;
		var z = false;
		var C = this;
		C._bind = false;
		h(u, "afterEnd", s());
		var A = c.g("tcViewPrediction");
		var r = c.g("tcPredition");
		var F = c.g("tcTitle");
		var m = c.g("maplibTcDay");
		var w = c.g("tcNow");
		var o = c.g("tcWrap");
		var t = c.g("tcTimeBox");
		var x = c.g("tcUpdate");
		var i = ["&#x4E00;", "&#x4E8C;", "&#x4E09;", "&#x56DB;", "&#x4E94;", "&#x516D;", "&#x65E5;"];
		var q = new D(E);
		this.show = function() {
			j();
			z = true;
			c.dom.removeClass(u, "maplibTcBtnOff")
		};
		this.hide = function() {
			z = false;
			c.dom.addClass(u, "maplibTcBtnOff");
			c.dom.addClass("tcWrap", "maplibTcHide");
			c.dom.addClass("tcPredition", "maplibTcHide");
			E.hideTraffic()
		};
		this.bShow = function() {
			return z
		};
		this.setPopOffset = function(H) {
			var J = 24;
			var I = H.height + J + "px";
			var G = H.width + "px";
			switch (E.getAnchor()) {
			case BMAP_ANCHOR_TOP_LEFT:
				o.style.top = I;
				o.style.left = G;
				break;
			case BMAP_ANCHOR_TOP_RIGHT:
				o.style.top = I;
				o.style.right = G;
				break;
			case BMAP_ANCHOR_BOTTOM_RIGHT:
				o.style.bottom = I;
				o.style.right = G;
				break;
			case BMAP_ANCHOR_BOTTOM_LEFT:
				o.style.bottom = I;
				o.style.left = G;
				break
			}
		};
		c.event.on(u, "onclick",
		function() {
			n()
		});
		c.event.on("tcClose", "click",
		function(G) {
			n()
		});
		function n() {
			if (!C.bShow()) {
				C.setPopOffset(E.getOffset());
				C.show()
			} else {
				C.hide()
			}
		}
		function j() {
			m.innerHTML = "&#x66F4;&#x65B0;&#x65F6;&#x95F4;";
			F.innerHTML = k[1];
			A.innerHTML = k[0];
			c.dom.addClass(r, "maplibTcHide");
			x.style.display = "block";
			y = true;
			c.dom.removeClass("tcWrap", "maplibTcHide");
			var I = c.g("tcWeek").getElementsByTagName("a");
			for (var H = 0; H < 7; H++) {
				I[H].className = ""
			}
			var G = "http://its.map.baidu.com:8002/traffic/GetCurrentTime?callback=BMapLib.TrafficControl.getTime&";
			b(G + (new Date()).getTime(), J);
			if (E.timer) {
				clearInterval(E.timer)
			}
			E.timer = setInterval(function() {
				b(G + (new Date()).getTime(),
				function() {
					var L = f.curTime;
					var K = L.getHours();
					var M = (K < 10 ? ("0" + K) : K) + ":" + (L.getMinutes() < 10 ? ("0" + L.getMinutes()) : L.getMinutes());
					w.innerHTML = M;
					E.hideTraffic();
					E.showTraffic()
				})
			},
			1000 * 3 * 60);
			function J() {
				var L = f.curTime;
				var K = L.getHours();
				if (!C._bind) {
					B(E);
					l(E);
					C._bind = true
				}
				var M = (K < 10 ? ("0" + K) : K) + ":" + (L.getMinutes() < 10 ? ("0" + L.getMinutes()) : L.getMinutes());
				w.innerHTML = M;
				E.hour = K;
				E.weekday = L.getDay() == 0 ? 7 : L.getDay();
				E.time = M;
				q.setBarTime(K)
			}
		}
		function s() {
			var G = ['<div class="maplibTc maplibTcHide" id="tcWrap">'];
			G.push('<div class="maplibTcColor" id="tcTitle">&#x5B9E;&#x65F6;&#x8DEF;&#x51B5;</div>');
			G.push('<div id="tcRealTime">');
			G.push('<div class="maplibTcTime"><span id="maplibTcDay" class="maplibTcCurTime">&#x66F4;&#x65B0;&#x65F6;&#x95F4;</span><span><span class="maplibTcColon">&#xFF1A;&nbsp;</span><span class="maplibTcCurTime" id="tcNow"></span><span title="&#x66F4;&#x65B0;" id="tcUpdate" class="maplibTcUpdate"></span> <a href="javascript:void(0)" class="maplibTcView" id="tcViewPrediction">&#x67E5;&#x770B;&#x6D41;&#x91CF;&#x9884;&#x6D4B;</a><button class="maplibTcClose" id="tcClose"></button></div></div>');
			G.push('<div id="tcPredition" class="maplibTcHide">');
			G.push('<div class="maplibTcWeekDay"><span>&#x661F;&#x671F;</span><ul id="tcWeek"><li><a lang="1" href="javascript:void(0)">&#x4E00;</a></li><li><a lang="2" href="javascript:void(0)">&#x4E8C;</a></li><li><a lang="3" href="javascript:void(0)">&#x4E09;</a></li><li><a lang="4" href="javascript:void(0)">&#x56DB;</a></li><li><a lang="5" href="javascript:void(0)">&#x4E94;</a></li><li><a lang="6" href="javascript:void(0)">&#x516D;</a></li><li><a lang="7" href="javascript:void(0)">&#x65E5;</a></li></ul></div>');
			G.push('<div><div class="maplibTcRuleTxt">&#x65F6;&#x95F4;</div>');
			G.push('<div class="maplibTcRule">');
			G.push('<div><div class="maplibTcTimeBox" id="tcTimeBox">20:00</div></div>');
			G.push('<div class="maplibTcTimeline" >');
			G.push('<div class="maplibTcTimelinePrev" id="tcPrev"></div>');
			G.push('<div class="maplibTcTimeMove" id="tcMove"></div>');
			G.push('<div class="maplibTcTimelineNext" id="tcNext"></div>');
			G.push("</div></div></div>");
			G.push('<div class="maplibTcClear" style="text-align: center; color: #ccc;">&#xFF08;&#x57FA;&#x4E8E;&#x5386;&#x53F2;&#x6D41;&#x91CF;&#x7EDF;&#x8BA1;&#x9884;&#x6D4B; &#x4EC5;&#x4F9B;&#x53C2;&#x8003;&#xFF09;</div>');
			G.push("</div></div></div>");
			return G.join("")
		}
		function B(H) {
			c.event.on("tcViewPrediction", "click",
			function() {
				if (y) {
					G()
				} else {
					j()
				}
			});
			function G() {
				if (H.timer) {
					clearInterval(H.timer)
				}
				F.innerHTML = v[1];
				A.innerHTML = v[0];
				c.dom.removeClass(r, "maplibTcHide");
				x.style.display = "none";
				y = false;
				m.innerHTML = "&#x661F;&#x671F;" + i[H.weekday - 1];
				w.innerHTML = t.innerHTML;
				H.showTraffic({
					predictDate: {
						hour: H.hour,
						weekday: H.weekday
					}
				})
			}
			c.event.on("tcUpdate", "click",
			function() {
				j()
			})
		}
		function p() {
			m.innerHTML = "&#x661F;&#x671F;" + i[E.weekday - 1];
			w.innerHTML = t.innerHTML
		}
		function l(G) {
			c.event.on("tcWeek", "onclick",
			function(J) {
				var I = J.target || J.srcElement;
				if (I.tagName.toLowerCase() == "a") {
					var K = c.g("tcWeek").getElementsByTagName("a");
					for (var H = 0; H < 7; H++) {
						K[H].className = ""
					}
					c.dom.addClass(I, "maplibTcOn");
					G.weekday = (parseInt(a(I, "lang"), 10));
					p();
					G.showTraffic({
						predictDate: {
							hour: G.hour,
							weekday: G.weekday
						}
					})
				}
			})
		}
		function D(K) {
			var H;
			var M = c.g("tcMove");
			function L(P) {
				c.on(document, "onmousemove", O);
				c.on(document, "onmouseup", G);
				if (P && P.preventDefault) {
					P.preventDefault()
				} else {
					window.event.returnValue = false
				}
				return false
			}
			function O(S) {
				var P = S.clientX || S.x;
				var R = g(c.G("tcPrev")).left + 9;
				var Q = P - R - 4;
				if (Q < 0) {
					Q = 0
				}
				if (Q > 165) {
					Q = 165
				}
				if (c.browser.ie <= 6) {
					M.style.marginLeft = (Q * 0.53) + "px"
				} else {
					M.style.marginLeft = Q + "px"
				}
				t.style.marginLeft = (Q) + "px";
				J()
			}
			function G() {
				c.un(document, "onmousemove", O);
				c.un(document, "onmouseup", G);
				K.showTraffic({
					predictDate: {
						hour: K.hour,
						weekday: K.weekday
					}
				})
			}
			c.on(M, "onmousedown", L);
			c.on("tcPrev", "click",
			function() {
				N("prev")
			});
			c.on("tcNext", "click",
			function() {
				N("next")
			});
			function N(P) {
				var Q = t;
				var R = parseInt(c.dom.getStyle("tcTimeBox", "marginLeft"));
				var S = Math.ceil((R - 4) * 24 / 165);
				I(P == "next" ? (S + 1) : (S - 1))
			}
			this.setBarTime = function(P) {
				I(P)
			};
			function I(R) {
				if (R < 0) {
					R = 0
				}
				if (R > 24) {
					R = 24
				}
				H = R;
				var Q = R * (165 / 24);
				t.style.marginLeft = Q + "px";
				var P = c.g("tcMove");
				if (c.browser.ie <= 6 && c.browser.ie > 0) {
					P.style.marginLeft = (Q * 0.53) + "px"
				} else {
					P.style.marginLeft = Q + "px"
				}
				K.hour = H;
				if (y) {
					K.showTraffic()
				} else {
					K.showTraffic({
						predictDate: {
							hour: K.hour,
							weekday: K.weekday
						}
					})
				}
				J()
			}
			function J() {
				var P = parseInt(t.style.marginLeft);
				var Q = Math.ceil((P - 4) * 24 / 165);
				H = Q;
				K.hour = Q;
				if (Q < 10) {
					Q = "0" + Q
				}
				if (y) {
					w.innerHTML = K.time;
					t.innerHTML = Q + ":00"
				} else {
					w.innerHTML = t.innerHTML = Q + ":00"
				}
			}
		}
	};
	f.prototype.showTraffic = function(i) {
		var j;
		if (this._trafficLayer) {
			this._map.removeTileLayer(this._trafficLayer)
		}
		if (i) {
			if (i.predictDate.weekday > 7 || i.predictDate.weekday < 1) {
				return
			}
			j = new BMap.TrafficLayer(i)
		} else {
			j = new BMap.TrafficLayer()
		}
		this._map.addTileLayer(j);
		this._trafficLayer = j
	};
	f.prototype.hideTraffic = function() {
		if (this._trafficLayer) {
			this._map.removeTileLayer(this._trafficLayer);
			this._trafficLayer = null
		}
	};
	f.prototype.remove = function() {
		this.hideTraffic();
		var i = c.g("tcWrap");
		i.parentNode.removeChild(i);
		BMap.Control.prototype.remove.call(this);
		if (this.timer) {
			clearInterval(this.timer)
		}
	};
	function a(j, i, k) {
		if (!i || i.constructor != String) {
			return ""
		}
		i = {
			"for": "htmlFor",
			"class": "className"
		} [i] || i;
		if (typeof k != "undefined") {
			j[i] = k;
			if (j.setAttribute) {
				j.setAttribute(i, k)
			}
		}
		return j[i] || j.getAttribute(i) || ""
	}
	function e(k, j) {
		var m = document.createElement(k);
		j = j || {};
		for (var l in j) {
			value = j[l];
			l = i()[l] || l;
			if (l == "style") {
				m.style.cssText = value;
				continue
			}
			if (m.setAttribute) {
				m.setAttribute(l, value)
			} else {
				try {
					m[l] = value
				} catch(m) {}
			}
		}
		return m;
		function i() {
			var n = {
				cellpadding: "cellPadding",
				cellspacing: "cellSpacing",
				colspan: "colSpan",
				rowspan: "rowSpan",
				valign: "vAlign"
			};
			if (c.browser.ie < 8) {
				n["for"] = "htmlFor";
				n["class"] = "className"
			} else {
				n.htmlFor = "for";
				n.className = "class"
			}
			return n
		}
	}
	function g(i) {
		var j = {
			left: 0,
			top: 0
		};
		while (i && i.offsetParent) {
			j.left += i.offsetLeft;
			j.top += i.offsetTop;
			i = i.offsetParent
		}
		return j
	}
	function h(l, i, k) {
		var j, m;
		if (l.insertAdjacentHTML) {
			l.insertAdjacentHTML(i, k)
		} else {
			j = l.ownerDocument.createRange();
			i = i.toUpperCase();
			if (i == "AFTERBEGIN" || i == "BEFOREEND") {
				j.selectNodeContents(l);
				j.collapse(i == "AFTERBEGIN")
			} else {
				m = i == "BEFOREBEGIN";
				j[m ? "setStartBefore": "setEndAfter"](l);
				j.collapse(m)
			}
			j.insertNode(j.createContextualFragment(k))
		}
		return l
	}
	function b(j, k) {
		var i = document.createElement("script");
		i.setAttribute("src", j);
		i.setAttribute("type", "text/javascript");
		i.setAttribute("charset", "gbk");
		if (i.addEventListener) {
			i.addEventListener("load",
			function(m) {
				var l = m.target;
				l.parentNode.removeChild(l);
				if (k) {
					k()
				}
			},
			false)
		} else {
			if (i.attachEvent) {
				i.attachEvent("onreadystatechange",
				function(m) {
					var l = window.event.srcElement;
					if (l && (l.readyState == "loaded" || l.readyState == "complete")) {
						l.parentNode.removeChild(l);
						if (k) {
							k()
						}
					}
				})
			}
		}
		setTimeout(function() {
			document.getElementsByTagName("head")[0].appendChild(i);
			i = null
		},
		1)
	}
	f.getTime = function(i) {
		this.curTime = isNaN(i) ? new Date() : new Date(i)
	}
})();
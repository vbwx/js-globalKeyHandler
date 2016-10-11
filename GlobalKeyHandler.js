// GlobalKeyHandler JavaScript class
// Copyright (C) 2013 Bernhard Waldbrunner
/*
 *	This program is free software: you can redistribute it and/or modify
 *	it under the terms of the GNU General Public License as published by
 *	the Free Software Foundation, either version 3 of the License, or
 *	(at your option) any later version.
 *
 *	This program is distributed in the hope that it will be useful,
 *	but WITHOUT ANY WARRANTY; without even the implied warranty of
 *	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *	GNU General Public License for more details.
 *
 *	You should have received a copy of the GNU General Public License
 *	along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

(function(ns) {
	"use strict";

	if (!ns.GlobalKeyHandler) {
		var GlobalKeyHandler = function() {
			document.onkeydown = GlobalKeyHandler.down;
			document.onkeyup = GlobalKeyHandler.up;
		};

		GlobalKeyHandler.down = function (ev) {
			if (ev && (ev.ctrlKey || ev.metaKey) && GlobalKeyHandler.bindings)
			{
				var prevent = false;
				if (!GlobalKeyHandler.lock)
				{
					var b;
					for (b in GlobalKeyHandler.bindings)
						if (GlobalKeyHandler.bindings.hasOwnProperty(b) &&
							Key.is(ev, String(b).split(/\s+/), true))
						{
							var ret = GlobalKeyHandler.bindings[b](ev);
							GlobalKeyHandler.lock = ret !== false;
							if (!ret)
								prevent = true;
							break;
						}
				}
				if (prevent || GlobalKeyHandler.lock)
					ev.preventDefault();
			}
		};

		GlobalKeyHandler.up = function (ev) {
			GlobalKeyHandler.lock = false;
		};

		GlobalKeyHandler.bindings = {};
		GlobalKeyHandler.lock = false;

		ns.GlobalKeyHandler = GlobalKeyHandler;
	}
})(window);

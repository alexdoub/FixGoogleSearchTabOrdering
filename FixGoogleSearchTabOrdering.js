// ==UserScript==
// @name        FixGoogleSearchTabOrdering
// @namespace   google.com
// @include     https://www.google.com/search?*
// @include     https://www.google.com/webhp?*
// @include     https://www.google.ca/search?*
// @include     https://www.google.ca/webhp?*
// @version     2.0
// @grant       none
// ==/UserScript==

(function ()
{
        var order = ["All", "Web", "Images", "Videos", "News", "Maps", "Books", "Apps", "Shopping", "Flights"];

        function enableObserver() {
                observer.observe(document.querySelector("#main"), { childList: true, subtree: true });
        }
        function disableObserver() {
                observer.disconnect();
        }
        var observer = new MutationObserver(function(mutations) {
                disableObserver();
                fixTabs();
                enableObserver();
        });
        enableObserver();

        function fixTabs() {
                var parent = document.querySelector("#hdtb-msb-vis");
                if (parent == null) { return; }

                var all = parent.querySelectorAll(".hdtb-mitem.hdtb-msel.hdtb-imb");
                var tabs = parent.querySelectorAll(".hdtb-mitem");
                var more = document.querySelector("#hdtb-more");
                var tools = document.querySelector("#hdtb-tls");

                while (parent.firstChild) {
                        parent.removeChild(parent.firstChild);
                }

                for (var i = 0; i < order.length; i++) {
                        for (var t = 0; t < tabs.length; t++) {
                                if (order[i] == tabs[t].textContent) {
                                        parent.appendChild(tabs[t]);
                                }
                        }
                }
                parent.appendChild(tools);
        }
        fixTabs();
})();

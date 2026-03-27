(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/@mozilla/readability/Readability.js
  var require_Readability = __commonJS({
    "node_modules/@mozilla/readability/Readability.js"(exports, module) {
      function Readability2(doc, options) {
        if (options && options.documentElement) {
          doc = options;
          options = arguments[2];
        } else if (!doc || !doc.documentElement) {
          throw new Error("First argument to Readability constructor should be a document object.");
        }
        options = options || {};
        this._doc = doc;
        this._docJSDOMParser = this._doc.firstChild.__JSDOMParser__;
        this._articleTitle = null;
        this._articleByline = null;
        this._articleDir = null;
        this._articleSiteName = null;
        this._attempts = [];
        this._debug = !!options.debug;
        this._maxElemsToParse = options.maxElemsToParse || this.DEFAULT_MAX_ELEMS_TO_PARSE;
        this._nbTopCandidates = options.nbTopCandidates || this.DEFAULT_N_TOP_CANDIDATES;
        this._charThreshold = options.charThreshold || this.DEFAULT_CHAR_THRESHOLD;
        this._classesToPreserve = this.CLASSES_TO_PRESERVE.concat(options.classesToPreserve || []);
        this._keepClasses = !!options.keepClasses;
        this._serializer = options.serializer || function(el) {
          return el.innerHTML;
        };
        this._disableJSONLD = !!options.disableJSONLD;
        this._allowedVideoRegex = options.allowedVideoRegex || this.REGEXPS.videos;
        this._flags = this.FLAG_STRIP_UNLIKELYS | this.FLAG_WEIGHT_CLASSES | this.FLAG_CLEAN_CONDITIONALLY;
        if (this._debug) {
          let logNode = function(node) {
            if (node.nodeType == node.TEXT_NODE) {
              return `${node.nodeName} ("${node.textContent}")`;
            }
            let attrPairs = Array.from(node.attributes || [], function(attr) {
              return `${attr.name}="${attr.value}"`;
            }).join(" ");
            return `<${node.localName} ${attrPairs}>`;
          };
          this.log = function() {
            if (typeof console !== "undefined") {
              let args = Array.from(arguments, (arg) => {
                if (arg && arg.nodeType == this.ELEMENT_NODE) {
                  return logNode(arg);
                }
                return arg;
              });
              args.unshift("Reader: (Readability)");
              console.log.apply(console, args);
            } else if (typeof dump !== "undefined") {
              var msg = Array.prototype.map.call(arguments, function(x) {
                return x && x.nodeName ? logNode(x) : x;
              }).join(" ");
              dump("Reader: (Readability) " + msg + "\n");
            }
          };
        } else {
          this.log = function() {
          };
        }
      }
      Readability2.prototype = {
        FLAG_STRIP_UNLIKELYS: 1,
        FLAG_WEIGHT_CLASSES: 2,
        FLAG_CLEAN_CONDITIONALLY: 4,
        // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
        ELEMENT_NODE: 1,
        TEXT_NODE: 3,
        // Max number of nodes supported by this parser. Default: 0 (no limit)
        DEFAULT_MAX_ELEMS_TO_PARSE: 0,
        // The number of top candidates to consider when analysing how
        // tight the competition is among candidates.
        DEFAULT_N_TOP_CANDIDATES: 5,
        // Element tags to score by default.
        DEFAULT_TAGS_TO_SCORE: "section,h2,h3,h4,h5,h6,p,td,pre".toUpperCase().split(","),
        // The default number of chars an article must have in order to return a result
        DEFAULT_CHAR_THRESHOLD: 500,
        // All of the regular expressions in use within readability.
        // Defined up here so we don't instantiate them repeatedly in loops.
        REGEXPS: {
          // NOTE: These two regular expressions are duplicated in
          // Readability-readerable.js. Please keep both copies in sync.
          unlikelyCandidates: /-ad-|ai2html|banner|breadcrumbs|combx|comment|community|cover-wrap|disqus|extra|footer|gdpr|header|legends|menu|related|remark|replies|rss|shoutbox|sidebar|skyscraper|social|sponsor|supplemental|ad-break|agegate|pagination|pager|popup|yom-remote/i,
          okMaybeItsACandidate: /and|article|body|column|content|main|shadow/i,
          positive: /article|body|content|entry|hentry|h-entry|main|page|pagination|post|text|blog|story/i,
          negative: /-ad-|hidden|^hid$| hid$| hid |^hid |banner|combx|comment|com-|contact|foot|footer|footnote|gdpr|masthead|media|meta|outbrain|promo|related|scroll|share|shoutbox|sidebar|skyscraper|sponsor|shopping|tags|tool|widget/i,
          extraneous: /print|archive|comment|discuss|e[\-]?mail|share|reply|all|login|sign|single|utility/i,
          byline: /byline|author|dateline|writtenby|p-author/i,
          replaceFonts: /<(\/?)font[^>]*>/gi,
          normalize: /\s{2,}/g,
          videos: /\/\/(www\.)?((dailymotion|youtube|youtube-nocookie|player\.vimeo|v\.qq)\.com|(archive|upload\.wikimedia)\.org|player\.twitch\.tv)/i,
          shareElements: /(\b|_)(share|sharedaddy)(\b|_)/i,
          nextLink: /(next|weiter|continue|>([^\|]|$)|»([^\|]|$))/i,
          prevLink: /(prev|earl|old|new|<|«)/i,
          tokenize: /\W+/g,
          whitespace: /^\s*$/,
          hasContent: /\S$/,
          hashUrl: /^#.+/,
          srcsetUrl: /(\S+)(\s+[\d.]+[xw])?(\s*(?:,|$))/g,
          b64DataUrl: /^data:\s*([^\s;,]+)\s*;\s*base64\s*,/i,
          // Commas as used in Latin, Sindhi, Chinese and various other scripts.
          // see: https://en.wikipedia.org/wiki/Comma#Comma_variants
          commas: /\u002C|\u060C|\uFE50|\uFE10|\uFE11|\u2E41|\u2E34|\u2E32|\uFF0C/g,
          // See: https://schema.org/Article
          jsonLdArticleTypes: /^Article|AdvertiserContentArticle|NewsArticle|AnalysisNewsArticle|AskPublicNewsArticle|BackgroundNewsArticle|OpinionNewsArticle|ReportageNewsArticle|ReviewNewsArticle|Report|SatiricalArticle|ScholarlyArticle|MedicalScholarlyArticle|SocialMediaPosting|BlogPosting|LiveBlogPosting|DiscussionForumPosting|TechArticle|APIReference$/
        },
        UNLIKELY_ROLES: ["menu", "menubar", "complementary", "navigation", "alert", "alertdialog", "dialog"],
        DIV_TO_P_ELEMS: /* @__PURE__ */ new Set(["BLOCKQUOTE", "DL", "DIV", "IMG", "OL", "P", "PRE", "TABLE", "UL"]),
        ALTER_TO_DIV_EXCEPTIONS: ["DIV", "ARTICLE", "SECTION", "P"],
        PRESENTATIONAL_ATTRIBUTES: ["align", "background", "bgcolor", "border", "cellpadding", "cellspacing", "frame", "hspace", "rules", "style", "valign", "vspace"],
        DEPRECATED_SIZE_ATTRIBUTE_ELEMS: ["TABLE", "TH", "TD", "HR", "PRE"],
        // The commented out elements qualify as phrasing content but tend to be
        // removed by readability when put into paragraphs, so we ignore them here.
        PHRASING_ELEMS: [
          // "CANVAS", "IFRAME", "SVG", "VIDEO",
          "ABBR",
          "AUDIO",
          "B",
          "BDO",
          "BR",
          "BUTTON",
          "CITE",
          "CODE",
          "DATA",
          "DATALIST",
          "DFN",
          "EM",
          "EMBED",
          "I",
          "IMG",
          "INPUT",
          "KBD",
          "LABEL",
          "MARK",
          "MATH",
          "METER",
          "NOSCRIPT",
          "OBJECT",
          "OUTPUT",
          "PROGRESS",
          "Q",
          "RUBY",
          "SAMP",
          "SCRIPT",
          "SELECT",
          "SMALL",
          "SPAN",
          "STRONG",
          "SUB",
          "SUP",
          "TEXTAREA",
          "TIME",
          "VAR",
          "WBR"
        ],
        // These are the classes that readability sets itself.
        CLASSES_TO_PRESERVE: ["page"],
        // These are the list of HTML entities that need to be escaped.
        HTML_ESCAPE_MAP: {
          "lt": "<",
          "gt": ">",
          "amp": "&",
          "quot": '"',
          "apos": "'"
        },
        /**
         * Run any post-process modifications to article content as necessary.
         *
         * @param Element
         * @return void
        **/
        _postProcessContent: function(articleContent) {
          this._fixRelativeUris(articleContent);
          this._simplifyNestedElements(articleContent);
          if (!this._keepClasses) {
            this._cleanClasses(articleContent);
          }
        },
        /**
         * Iterates over a NodeList, calls `filterFn` for each node and removes node
         * if function returned `true`.
         *
         * If function is not passed, removes all the nodes in node list.
         *
         * @param NodeList nodeList The nodes to operate on
         * @param Function filterFn the function to use as a filter
         * @return void
         */
        _removeNodes: function(nodeList, filterFn) {
          if (this._docJSDOMParser && nodeList._isLiveNodeList) {
            throw new Error("Do not pass live node lists to _removeNodes");
          }
          for (var i = nodeList.length - 1; i >= 0; i--) {
            var node = nodeList[i];
            var parentNode = node.parentNode;
            if (parentNode) {
              if (!filterFn || filterFn.call(this, node, i, nodeList)) {
                parentNode.removeChild(node);
              }
            }
          }
        },
        /**
         * Iterates over a NodeList, and calls _setNodeTag for each node.
         *
         * @param NodeList nodeList The nodes to operate on
         * @param String newTagName the new tag name to use
         * @return void
         */
        _replaceNodeTags: function(nodeList, newTagName) {
          if (this._docJSDOMParser && nodeList._isLiveNodeList) {
            throw new Error("Do not pass live node lists to _replaceNodeTags");
          }
          for (const node of nodeList) {
            this._setNodeTag(node, newTagName);
          }
        },
        /**
         * Iterate over a NodeList, which doesn't natively fully implement the Array
         * interface.
         *
         * For convenience, the current object context is applied to the provided
         * iterate function.
         *
         * @param  NodeList nodeList The NodeList.
         * @param  Function fn       The iterate function.
         * @return void
         */
        _forEachNode: function(nodeList, fn) {
          Array.prototype.forEach.call(nodeList, fn, this);
        },
        /**
         * Iterate over a NodeList, and return the first node that passes
         * the supplied test function
         *
         * For convenience, the current object context is applied to the provided
         * test function.
         *
         * @param  NodeList nodeList The NodeList.
         * @param  Function fn       The test function.
         * @return void
         */
        _findNode: function(nodeList, fn) {
          return Array.prototype.find.call(nodeList, fn, this);
        },
        /**
         * Iterate over a NodeList, return true if any of the provided iterate
         * function calls returns true, false otherwise.
         *
         * For convenience, the current object context is applied to the
         * provided iterate function.
         *
         * @param  NodeList nodeList The NodeList.
         * @param  Function fn       The iterate function.
         * @return Boolean
         */
        _someNode: function(nodeList, fn) {
          return Array.prototype.some.call(nodeList, fn, this);
        },
        /**
         * Iterate over a NodeList, return true if all of the provided iterate
         * function calls return true, false otherwise.
         *
         * For convenience, the current object context is applied to the
         * provided iterate function.
         *
         * @param  NodeList nodeList The NodeList.
         * @param  Function fn       The iterate function.
         * @return Boolean
         */
        _everyNode: function(nodeList, fn) {
          return Array.prototype.every.call(nodeList, fn, this);
        },
        /**
         * Concat all nodelists passed as arguments.
         *
         * @return ...NodeList
         * @return Array
         */
        _concatNodeLists: function() {
          var slice = Array.prototype.slice;
          var args = slice.call(arguments);
          var nodeLists = args.map(function(list) {
            return slice.call(list);
          });
          return Array.prototype.concat.apply([], nodeLists);
        },
        _getAllNodesWithTag: function(node, tagNames) {
          if (node.querySelectorAll) {
            return node.querySelectorAll(tagNames.join(","));
          }
          return [].concat.apply([], tagNames.map(function(tag) {
            var collection = node.getElementsByTagName(tag);
            return Array.isArray(collection) ? collection : Array.from(collection);
          }));
        },
        /**
         * Removes the class="" attribute from every element in the given
         * subtree, except those that match CLASSES_TO_PRESERVE and
         * the classesToPreserve array from the options object.
         *
         * @param Element
         * @return void
         */
        _cleanClasses: function(node) {
          var classesToPreserve = this._classesToPreserve;
          var className = (node.getAttribute("class") || "").split(/\s+/).filter(function(cls) {
            return classesToPreserve.indexOf(cls) != -1;
          }).join(" ");
          if (className) {
            node.setAttribute("class", className);
          } else {
            node.removeAttribute("class");
          }
          for (node = node.firstElementChild; node; node = node.nextElementSibling) {
            this._cleanClasses(node);
          }
        },
        /**
         * Converts each <a> and <img> uri in the given element to an absolute URI,
         * ignoring #ref URIs.
         *
         * @param Element
         * @return void
         */
        _fixRelativeUris: function(articleContent) {
          var baseURI = this._doc.baseURI;
          var documentURI = this._doc.documentURI;
          function toAbsoluteURI(uri) {
            if (baseURI == documentURI && uri.charAt(0) == "#") {
              return uri;
            }
            try {
              return new URL(uri, baseURI).href;
            } catch (ex) {
            }
            return uri;
          }
          var links = this._getAllNodesWithTag(articleContent, ["a"]);
          this._forEachNode(links, function(link) {
            var href = link.getAttribute("href");
            if (href) {
              if (href.indexOf("javascript:") === 0) {
                if (link.childNodes.length === 1 && link.childNodes[0].nodeType === this.TEXT_NODE) {
                  var text = this._doc.createTextNode(link.textContent);
                  link.parentNode.replaceChild(text, link);
                } else {
                  var container = this._doc.createElement("span");
                  while (link.firstChild) {
                    container.appendChild(link.firstChild);
                  }
                  link.parentNode.replaceChild(container, link);
                }
              } else {
                link.setAttribute("href", toAbsoluteURI(href));
              }
            }
          });
          var medias = this._getAllNodesWithTag(articleContent, [
            "img",
            "picture",
            "figure",
            "video",
            "audio",
            "source"
          ]);
          this._forEachNode(medias, function(media) {
            var src = media.getAttribute("src");
            var poster = media.getAttribute("poster");
            var srcset = media.getAttribute("srcset");
            if (src) {
              media.setAttribute("src", toAbsoluteURI(src));
            }
            if (poster) {
              media.setAttribute("poster", toAbsoluteURI(poster));
            }
            if (srcset) {
              var newSrcset = srcset.replace(this.REGEXPS.srcsetUrl, function(_, p1, p2, p3) {
                return toAbsoluteURI(p1) + (p2 || "") + p3;
              });
              media.setAttribute("srcset", newSrcset);
            }
          });
        },
        _simplifyNestedElements: function(articleContent) {
          var node = articleContent;
          while (node) {
            if (node.parentNode && ["DIV", "SECTION"].includes(node.tagName) && !(node.id && node.id.startsWith("readability"))) {
              if (this._isElementWithoutContent(node)) {
                node = this._removeAndGetNext(node);
                continue;
              } else if (this._hasSingleTagInsideElement(node, "DIV") || this._hasSingleTagInsideElement(node, "SECTION")) {
                var child = node.children[0];
                for (var i = 0; i < node.attributes.length; i++) {
                  child.setAttribute(node.attributes[i].name, node.attributes[i].value);
                }
                node.parentNode.replaceChild(child, node);
                node = child;
                continue;
              }
            }
            node = this._getNextNode(node);
          }
        },
        /**
         * Get the article title as an H1.
         *
         * @return string
         **/
        _getArticleTitle: function() {
          var doc = this._doc;
          var curTitle = "";
          var origTitle = "";
          try {
            curTitle = origTitle = doc.title.trim();
            if (typeof curTitle !== "string")
              curTitle = origTitle = this._getInnerText(doc.getElementsByTagName("title")[0]);
          } catch (e) {
          }
          var titleHadHierarchicalSeparators = false;
          function wordCount(str) {
            return str.split(/\s+/).length;
          }
          if (/ [\|\-\\\/>»] /.test(curTitle)) {
            titleHadHierarchicalSeparators = / [\\\/>»] /.test(curTitle);
            curTitle = origTitle.replace(/(.*)[\|\-\\\/>»] .*/gi, "$1");
            if (wordCount(curTitle) < 3)
              curTitle = origTitle.replace(/[^\|\-\\\/>»]*[\|\-\\\/>»](.*)/gi, "$1");
          } else if (curTitle.indexOf(": ") !== -1) {
            var headings = this._concatNodeLists(
              doc.getElementsByTagName("h1"),
              doc.getElementsByTagName("h2")
            );
            var trimmedTitle = curTitle.trim();
            var match = this._someNode(headings, function(heading) {
              return heading.textContent.trim() === trimmedTitle;
            });
            if (!match) {
              curTitle = origTitle.substring(origTitle.lastIndexOf(":") + 1);
              if (wordCount(curTitle) < 3) {
                curTitle = origTitle.substring(origTitle.indexOf(":") + 1);
              } else if (wordCount(origTitle.substr(0, origTitle.indexOf(":"))) > 5) {
                curTitle = origTitle;
              }
            }
          } else if (curTitle.length > 150 || curTitle.length < 15) {
            var hOnes = doc.getElementsByTagName("h1");
            if (hOnes.length === 1)
              curTitle = this._getInnerText(hOnes[0]);
          }
          curTitle = curTitle.trim().replace(this.REGEXPS.normalize, " ");
          var curTitleWordCount = wordCount(curTitle);
          if (curTitleWordCount <= 4 && (!titleHadHierarchicalSeparators || curTitleWordCount != wordCount(origTitle.replace(/[\|\-\\\/>»]+/g, "")) - 1)) {
            curTitle = origTitle;
          }
          return curTitle;
        },
        /**
         * Prepare the HTML document for readability to scrape it.
         * This includes things like stripping javascript, CSS, and handling terrible markup.
         *
         * @return void
         **/
        _prepDocument: function() {
          var doc = this._doc;
          this._removeNodes(this._getAllNodesWithTag(doc, ["style"]));
          if (doc.body) {
            this._replaceBrs(doc.body);
          }
          this._replaceNodeTags(this._getAllNodesWithTag(doc, ["font"]), "SPAN");
        },
        /**
         * Finds the next node, starting from the given node, and ignoring
         * whitespace in between. If the given node is an element, the same node is
         * returned.
         */
        _nextNode: function(node) {
          var next = node;
          while (next && next.nodeType != this.ELEMENT_NODE && this.REGEXPS.whitespace.test(next.textContent)) {
            next = next.nextSibling;
          }
          return next;
        },
        /**
         * Replaces 2 or more successive <br> elements with a single <p>.
         * Whitespace between <br> elements are ignored. For example:
         *   <div>foo<br>bar<br> <br><br>abc</div>
         * will become:
         *   <div>foo<br>bar<p>abc</p></div>
         */
        _replaceBrs: function(elem) {
          this._forEachNode(this._getAllNodesWithTag(elem, ["br"]), function(br) {
            var next = br.nextSibling;
            var replaced = false;
            while ((next = this._nextNode(next)) && next.tagName == "BR") {
              replaced = true;
              var brSibling = next.nextSibling;
              next.parentNode.removeChild(next);
              next = brSibling;
            }
            if (replaced) {
              var p = this._doc.createElement("p");
              br.parentNode.replaceChild(p, br);
              next = p.nextSibling;
              while (next) {
                if (next.tagName == "BR") {
                  var nextElem = this._nextNode(next.nextSibling);
                  if (nextElem && nextElem.tagName == "BR")
                    break;
                }
                if (!this._isPhrasingContent(next))
                  break;
                var sibling = next.nextSibling;
                p.appendChild(next);
                next = sibling;
              }
              while (p.lastChild && this._isWhitespace(p.lastChild)) {
                p.removeChild(p.lastChild);
              }
              if (p.parentNode.tagName === "P")
                this._setNodeTag(p.parentNode, "DIV");
            }
          });
        },
        _setNodeTag: function(node, tag) {
          this.log("_setNodeTag", node, tag);
          if (this._docJSDOMParser) {
            node.localName = tag.toLowerCase();
            node.tagName = tag.toUpperCase();
            return node;
          }
          var replacement = node.ownerDocument.createElement(tag);
          while (node.firstChild) {
            replacement.appendChild(node.firstChild);
          }
          node.parentNode.replaceChild(replacement, node);
          if (node.readability)
            replacement.readability = node.readability;
          for (var i = 0; i < node.attributes.length; i++) {
            try {
              replacement.setAttribute(node.attributes[i].name, node.attributes[i].value);
            } catch (ex) {
            }
          }
          return replacement;
        },
        /**
         * Prepare the article node for display. Clean out any inline styles,
         * iframes, forms, strip extraneous <p> tags, etc.
         *
         * @param Element
         * @return void
         **/
        _prepArticle: function(articleContent) {
          this._cleanStyles(articleContent);
          this._markDataTables(articleContent);
          this._fixLazyImages(articleContent);
          this._cleanConditionally(articleContent, "form");
          this._cleanConditionally(articleContent, "fieldset");
          this._clean(articleContent, "object");
          this._clean(articleContent, "embed");
          this._clean(articleContent, "footer");
          this._clean(articleContent, "link");
          this._clean(articleContent, "aside");
          var shareElementThreshold = this.DEFAULT_CHAR_THRESHOLD;
          this._forEachNode(articleContent.children, function(topCandidate) {
            this._cleanMatchedNodes(topCandidate, function(node, matchString) {
              return this.REGEXPS.shareElements.test(matchString) && node.textContent.length < shareElementThreshold;
            });
          });
          this._clean(articleContent, "iframe");
          this._clean(articleContent, "input");
          this._clean(articleContent, "textarea");
          this._clean(articleContent, "select");
          this._clean(articleContent, "button");
          this._cleanHeaders(articleContent);
          this._cleanConditionally(articleContent, "table");
          this._cleanConditionally(articleContent, "ul");
          this._cleanConditionally(articleContent, "div");
          this._replaceNodeTags(this._getAllNodesWithTag(articleContent, ["h1"]), "h2");
          this._removeNodes(this._getAllNodesWithTag(articleContent, ["p"]), function(paragraph) {
            var imgCount = paragraph.getElementsByTagName("img").length;
            var embedCount = paragraph.getElementsByTagName("embed").length;
            var objectCount = paragraph.getElementsByTagName("object").length;
            var iframeCount = paragraph.getElementsByTagName("iframe").length;
            var totalCount = imgCount + embedCount + objectCount + iframeCount;
            return totalCount === 0 && !this._getInnerText(paragraph, false);
          });
          this._forEachNode(this._getAllNodesWithTag(articleContent, ["br"]), function(br) {
            var next = this._nextNode(br.nextSibling);
            if (next && next.tagName == "P")
              br.parentNode.removeChild(br);
          });
          this._forEachNode(this._getAllNodesWithTag(articleContent, ["table"]), function(table) {
            var tbody = this._hasSingleTagInsideElement(table, "TBODY") ? table.firstElementChild : table;
            if (this._hasSingleTagInsideElement(tbody, "TR")) {
              var row = tbody.firstElementChild;
              if (this._hasSingleTagInsideElement(row, "TD")) {
                var cell = row.firstElementChild;
                cell = this._setNodeTag(cell, this._everyNode(cell.childNodes, this._isPhrasingContent) ? "P" : "DIV");
                table.parentNode.replaceChild(cell, table);
              }
            }
          });
        },
        /**
         * Initialize a node with the readability object. Also checks the
         * className/id for special names to add to its score.
         *
         * @param Element
         * @return void
        **/
        _initializeNode: function(node) {
          node.readability = { "contentScore": 0 };
          switch (node.tagName) {
            case "DIV":
              node.readability.contentScore += 5;
              break;
            case "PRE":
            case "TD":
            case "BLOCKQUOTE":
              node.readability.contentScore += 3;
              break;
            case "ADDRESS":
            case "OL":
            case "UL":
            case "DL":
            case "DD":
            case "DT":
            case "LI":
            case "FORM":
              node.readability.contentScore -= 3;
              break;
            case "H1":
            case "H2":
            case "H3":
            case "H4":
            case "H5":
            case "H6":
            case "TH":
              node.readability.contentScore -= 5;
              break;
          }
          node.readability.contentScore += this._getClassWeight(node);
        },
        _removeAndGetNext: function(node) {
          var nextNode = this._getNextNode(node, true);
          node.parentNode.removeChild(node);
          return nextNode;
        },
        /**
         * Traverse the DOM from node to node, starting at the node passed in.
         * Pass true for the second parameter to indicate this node itself
         * (and its kids) are going away, and we want the next node over.
         *
         * Calling this in a loop will traverse the DOM depth-first.
         */
        _getNextNode: function(node, ignoreSelfAndKids) {
          if (!ignoreSelfAndKids && node.firstElementChild) {
            return node.firstElementChild;
          }
          if (node.nextElementSibling) {
            return node.nextElementSibling;
          }
          do {
            node = node.parentNode;
          } while (node && !node.nextElementSibling);
          return node && node.nextElementSibling;
        },
        // compares second text to first one
        // 1 = same text, 0 = completely different text
        // works the way that it splits both texts into words and then finds words that are unique in second text
        // the result is given by the lower length of unique parts
        _textSimilarity: function(textA, textB) {
          var tokensA = textA.toLowerCase().split(this.REGEXPS.tokenize).filter(Boolean);
          var tokensB = textB.toLowerCase().split(this.REGEXPS.tokenize).filter(Boolean);
          if (!tokensA.length || !tokensB.length) {
            return 0;
          }
          var uniqTokensB = tokensB.filter((token) => !tokensA.includes(token));
          var distanceB = uniqTokensB.join(" ").length / tokensB.join(" ").length;
          return 1 - distanceB;
        },
        _checkByline: function(node, matchString) {
          if (this._articleByline) {
            return false;
          }
          if (node.getAttribute !== void 0) {
            var rel = node.getAttribute("rel");
            var itemprop = node.getAttribute("itemprop");
          }
          if ((rel === "author" || itemprop && itemprop.indexOf("author") !== -1 || this.REGEXPS.byline.test(matchString)) && this._isValidByline(node.textContent)) {
            this._articleByline = node.textContent.trim();
            return true;
          }
          return false;
        },
        _getNodeAncestors: function(node, maxDepth) {
          maxDepth = maxDepth || 0;
          var i = 0, ancestors = [];
          while (node.parentNode) {
            ancestors.push(node.parentNode);
            if (maxDepth && ++i === maxDepth)
              break;
            node = node.parentNode;
          }
          return ancestors;
        },
        /***
         * grabArticle - Using a variety of metrics (content score, classname, element types), find the content that is
         *         most likely to be the stuff a user wants to read. Then return it wrapped up in a div.
         *
         * @param page a document to run upon. Needs to be a full document, complete with body.
         * @return Element
        **/
        _grabArticle: function(page) {
          this.log("**** grabArticle ****");
          var doc = this._doc;
          var isPaging = page !== null;
          page = page ? page : this._doc.body;
          if (!page) {
            this.log("No body found in document. Abort.");
            return null;
          }
          var pageCacheHtml = page.innerHTML;
          while (true) {
            this.log("Starting grabArticle loop");
            var stripUnlikelyCandidates = this._flagIsActive(this.FLAG_STRIP_UNLIKELYS);
            var elementsToScore = [];
            var node = this._doc.documentElement;
            let shouldRemoveTitleHeader = true;
            while (node) {
              if (node.tagName === "HTML") {
                this._articleLang = node.getAttribute("lang");
              }
              var matchString = node.className + " " + node.id;
              if (!this._isProbablyVisible(node)) {
                this.log("Removing hidden node - " + matchString);
                node = this._removeAndGetNext(node);
                continue;
              }
              if (node.getAttribute("aria-modal") == "true" && node.getAttribute("role") == "dialog") {
                node = this._removeAndGetNext(node);
                continue;
              }
              if (this._checkByline(node, matchString)) {
                node = this._removeAndGetNext(node);
                continue;
              }
              if (shouldRemoveTitleHeader && this._headerDuplicatesTitle(node)) {
                this.log("Removing header: ", node.textContent.trim(), this._articleTitle.trim());
                shouldRemoveTitleHeader = false;
                node = this._removeAndGetNext(node);
                continue;
              }
              if (stripUnlikelyCandidates) {
                if (this.REGEXPS.unlikelyCandidates.test(matchString) && !this.REGEXPS.okMaybeItsACandidate.test(matchString) && !this._hasAncestorTag(node, "table") && !this._hasAncestorTag(node, "code") && node.tagName !== "BODY" && node.tagName !== "A") {
                  this.log("Removing unlikely candidate - " + matchString);
                  node = this._removeAndGetNext(node);
                  continue;
                }
                if (this.UNLIKELY_ROLES.includes(node.getAttribute("role"))) {
                  this.log("Removing content with role " + node.getAttribute("role") + " - " + matchString);
                  node = this._removeAndGetNext(node);
                  continue;
                }
              }
              if ((node.tagName === "DIV" || node.tagName === "SECTION" || node.tagName === "HEADER" || node.tagName === "H1" || node.tagName === "H2" || node.tagName === "H3" || node.tagName === "H4" || node.tagName === "H5" || node.tagName === "H6") && this._isElementWithoutContent(node)) {
                node = this._removeAndGetNext(node);
                continue;
              }
              if (this.DEFAULT_TAGS_TO_SCORE.indexOf(node.tagName) !== -1) {
                elementsToScore.push(node);
              }
              if (node.tagName === "DIV") {
                var p = null;
                var childNode = node.firstChild;
                while (childNode) {
                  var nextSibling = childNode.nextSibling;
                  if (this._isPhrasingContent(childNode)) {
                    if (p !== null) {
                      p.appendChild(childNode);
                    } else if (!this._isWhitespace(childNode)) {
                      p = doc.createElement("p");
                      node.replaceChild(p, childNode);
                      p.appendChild(childNode);
                    }
                  } else if (p !== null) {
                    while (p.lastChild && this._isWhitespace(p.lastChild)) {
                      p.removeChild(p.lastChild);
                    }
                    p = null;
                  }
                  childNode = nextSibling;
                }
                if (this._hasSingleTagInsideElement(node, "P") && this._getLinkDensity(node) < 0.25) {
                  var newNode = node.children[0];
                  node.parentNode.replaceChild(newNode, node);
                  node = newNode;
                  elementsToScore.push(node);
                } else if (!this._hasChildBlockElement(node)) {
                  node = this._setNodeTag(node, "P");
                  elementsToScore.push(node);
                }
              }
              node = this._getNextNode(node);
            }
            var candidates = [];
            this._forEachNode(elementsToScore, function(elementToScore) {
              if (!elementToScore.parentNode || typeof elementToScore.parentNode.tagName === "undefined")
                return;
              var innerText = this._getInnerText(elementToScore);
              if (innerText.length < 25)
                return;
              var ancestors2 = this._getNodeAncestors(elementToScore, 5);
              if (ancestors2.length === 0)
                return;
              var contentScore = 0;
              contentScore += 1;
              contentScore += innerText.split(this.REGEXPS.commas).length;
              contentScore += Math.min(Math.floor(innerText.length / 100), 3);
              this._forEachNode(ancestors2, function(ancestor, level) {
                if (!ancestor.tagName || !ancestor.parentNode || typeof ancestor.parentNode.tagName === "undefined")
                  return;
                if (typeof ancestor.readability === "undefined") {
                  this._initializeNode(ancestor);
                  candidates.push(ancestor);
                }
                if (level === 0)
                  var scoreDivider = 1;
                else if (level === 1)
                  scoreDivider = 2;
                else
                  scoreDivider = level * 3;
                ancestor.readability.contentScore += contentScore / scoreDivider;
              });
            });
            var topCandidates = [];
            for (var c = 0, cl = candidates.length; c < cl; c += 1) {
              var candidate = candidates[c];
              var candidateScore = candidate.readability.contentScore * (1 - this._getLinkDensity(candidate));
              candidate.readability.contentScore = candidateScore;
              this.log("Candidate:", candidate, "with score " + candidateScore);
              for (var t = 0; t < this._nbTopCandidates; t++) {
                var aTopCandidate = topCandidates[t];
                if (!aTopCandidate || candidateScore > aTopCandidate.readability.contentScore) {
                  topCandidates.splice(t, 0, candidate);
                  if (topCandidates.length > this._nbTopCandidates)
                    topCandidates.pop();
                  break;
                }
              }
            }
            var topCandidate = topCandidates[0] || null;
            var neededToCreateTopCandidate = false;
            var parentOfTopCandidate;
            if (topCandidate === null || topCandidate.tagName === "BODY") {
              topCandidate = doc.createElement("DIV");
              neededToCreateTopCandidate = true;
              while (page.firstChild) {
                this.log("Moving child out:", page.firstChild);
                topCandidate.appendChild(page.firstChild);
              }
              page.appendChild(topCandidate);
              this._initializeNode(topCandidate);
            } else if (topCandidate) {
              var alternativeCandidateAncestors = [];
              for (var i = 1; i < topCandidates.length; i++) {
                if (topCandidates[i].readability.contentScore / topCandidate.readability.contentScore >= 0.75) {
                  alternativeCandidateAncestors.push(this._getNodeAncestors(topCandidates[i]));
                }
              }
              var MINIMUM_TOPCANDIDATES = 3;
              if (alternativeCandidateAncestors.length >= MINIMUM_TOPCANDIDATES) {
                parentOfTopCandidate = topCandidate.parentNode;
                while (parentOfTopCandidate.tagName !== "BODY") {
                  var listsContainingThisAncestor = 0;
                  for (var ancestorIndex = 0; ancestorIndex < alternativeCandidateAncestors.length && listsContainingThisAncestor < MINIMUM_TOPCANDIDATES; ancestorIndex++) {
                    listsContainingThisAncestor += Number(alternativeCandidateAncestors[ancestorIndex].includes(parentOfTopCandidate));
                  }
                  if (listsContainingThisAncestor >= MINIMUM_TOPCANDIDATES) {
                    topCandidate = parentOfTopCandidate;
                    break;
                  }
                  parentOfTopCandidate = parentOfTopCandidate.parentNode;
                }
              }
              if (!topCandidate.readability) {
                this._initializeNode(topCandidate);
              }
              parentOfTopCandidate = topCandidate.parentNode;
              var lastScore = topCandidate.readability.contentScore;
              var scoreThreshold = lastScore / 3;
              while (parentOfTopCandidate.tagName !== "BODY") {
                if (!parentOfTopCandidate.readability) {
                  parentOfTopCandidate = parentOfTopCandidate.parentNode;
                  continue;
                }
                var parentScore = parentOfTopCandidate.readability.contentScore;
                if (parentScore < scoreThreshold)
                  break;
                if (parentScore > lastScore) {
                  topCandidate = parentOfTopCandidate;
                  break;
                }
                lastScore = parentOfTopCandidate.readability.contentScore;
                parentOfTopCandidate = parentOfTopCandidate.parentNode;
              }
              parentOfTopCandidate = topCandidate.parentNode;
              while (parentOfTopCandidate.tagName != "BODY" && parentOfTopCandidate.children.length == 1) {
                topCandidate = parentOfTopCandidate;
                parentOfTopCandidate = topCandidate.parentNode;
              }
              if (!topCandidate.readability) {
                this._initializeNode(topCandidate);
              }
            }
            var articleContent = doc.createElement("DIV");
            if (isPaging)
              articleContent.id = "readability-content";
            var siblingScoreThreshold = Math.max(10, topCandidate.readability.contentScore * 0.2);
            parentOfTopCandidate = topCandidate.parentNode;
            var siblings = parentOfTopCandidate.children;
            for (var s = 0, sl = siblings.length; s < sl; s++) {
              var sibling = siblings[s];
              var append = false;
              this.log("Looking at sibling node:", sibling, sibling.readability ? "with score " + sibling.readability.contentScore : "");
              this.log("Sibling has score", sibling.readability ? sibling.readability.contentScore : "Unknown");
              if (sibling === topCandidate) {
                append = true;
              } else {
                var contentBonus = 0;
                if (sibling.className === topCandidate.className && topCandidate.className !== "")
                  contentBonus += topCandidate.readability.contentScore * 0.2;
                if (sibling.readability && sibling.readability.contentScore + contentBonus >= siblingScoreThreshold) {
                  append = true;
                } else if (sibling.nodeName === "P") {
                  var linkDensity = this._getLinkDensity(sibling);
                  var nodeContent = this._getInnerText(sibling);
                  var nodeLength = nodeContent.length;
                  if (nodeLength > 80 && linkDensity < 0.25) {
                    append = true;
                  } else if (nodeLength < 80 && nodeLength > 0 && linkDensity === 0 && nodeContent.search(/\.( |$)/) !== -1) {
                    append = true;
                  }
                }
              }
              if (append) {
                this.log("Appending node:", sibling);
                if (this.ALTER_TO_DIV_EXCEPTIONS.indexOf(sibling.nodeName) === -1) {
                  this.log("Altering sibling:", sibling, "to div.");
                  sibling = this._setNodeTag(sibling, "DIV");
                }
                articleContent.appendChild(sibling);
                siblings = parentOfTopCandidate.children;
                s -= 1;
                sl -= 1;
              }
            }
            if (this._debug)
              this.log("Article content pre-prep: " + articleContent.innerHTML);
            this._prepArticle(articleContent);
            if (this._debug)
              this.log("Article content post-prep: " + articleContent.innerHTML);
            if (neededToCreateTopCandidate) {
              topCandidate.id = "readability-page-1";
              topCandidate.className = "page";
            } else {
              var div = doc.createElement("DIV");
              div.id = "readability-page-1";
              div.className = "page";
              while (articleContent.firstChild) {
                div.appendChild(articleContent.firstChild);
              }
              articleContent.appendChild(div);
            }
            if (this._debug)
              this.log("Article content after paging: " + articleContent.innerHTML);
            var parseSuccessful = true;
            var textLength = this._getInnerText(articleContent, true).length;
            if (textLength < this._charThreshold) {
              parseSuccessful = false;
              page.innerHTML = pageCacheHtml;
              if (this._flagIsActive(this.FLAG_STRIP_UNLIKELYS)) {
                this._removeFlag(this.FLAG_STRIP_UNLIKELYS);
                this._attempts.push({ articleContent, textLength });
              } else if (this._flagIsActive(this.FLAG_WEIGHT_CLASSES)) {
                this._removeFlag(this.FLAG_WEIGHT_CLASSES);
                this._attempts.push({ articleContent, textLength });
              } else if (this._flagIsActive(this.FLAG_CLEAN_CONDITIONALLY)) {
                this._removeFlag(this.FLAG_CLEAN_CONDITIONALLY);
                this._attempts.push({ articleContent, textLength });
              } else {
                this._attempts.push({ articleContent, textLength });
                this._attempts.sort(function(a, b) {
                  return b.textLength - a.textLength;
                });
                if (!this._attempts[0].textLength) {
                  return null;
                }
                articleContent = this._attempts[0].articleContent;
                parseSuccessful = true;
              }
            }
            if (parseSuccessful) {
              var ancestors = [parentOfTopCandidate, topCandidate].concat(this._getNodeAncestors(parentOfTopCandidate));
              this._someNode(ancestors, function(ancestor) {
                if (!ancestor.tagName)
                  return false;
                var articleDir = ancestor.getAttribute("dir");
                if (articleDir) {
                  this._articleDir = articleDir;
                  return true;
                }
                return false;
              });
              return articleContent;
            }
          }
        },
        /**
         * Check whether the input string could be a byline.
         * This verifies that the input is a string, and that the length
         * is less than 100 chars.
         *
         * @param possibleByline {string} - a string to check whether its a byline.
         * @return Boolean - whether the input string is a byline.
         */
        _isValidByline: function(byline) {
          if (typeof byline == "string" || byline instanceof String) {
            byline = byline.trim();
            return byline.length > 0 && byline.length < 100;
          }
          return false;
        },
        /**
         * Converts some of the common HTML entities in string to their corresponding characters.
         *
         * @param str {string} - a string to unescape.
         * @return string without HTML entity.
         */
        _unescapeHtmlEntities: function(str) {
          if (!str) {
            return str;
          }
          var htmlEscapeMap = this.HTML_ESCAPE_MAP;
          return str.replace(/&(quot|amp|apos|lt|gt);/g, function(_, tag) {
            return htmlEscapeMap[tag];
          }).replace(/&#(?:x([0-9a-z]{1,4})|([0-9]{1,4}));/gi, function(_, hex, numStr) {
            var num = parseInt(hex || numStr, hex ? 16 : 10);
            return String.fromCharCode(num);
          });
        },
        /**
         * Try to extract metadata from JSON-LD object.
         * For now, only Schema.org objects of type Article or its subtypes are supported.
         * @return Object with any metadata that could be extracted (possibly none)
         */
        _getJSONLD: function(doc) {
          var scripts = this._getAllNodesWithTag(doc, ["script"]);
          var metadata;
          this._forEachNode(scripts, function(jsonLdElement) {
            if (!metadata && jsonLdElement.getAttribute("type") === "application/ld+json") {
              try {
                var content = jsonLdElement.textContent.replace(/^\s*<!\[CDATA\[|\]\]>\s*$/g, "");
                var parsed = JSON.parse(content);
                if (!parsed["@context"] || !parsed["@context"].match(/^https?\:\/\/schema\.org$/)) {
                  return;
                }
                if (!parsed["@type"] && Array.isArray(parsed["@graph"])) {
                  parsed = parsed["@graph"].find(function(it) {
                    return (it["@type"] || "").match(
                      this.REGEXPS.jsonLdArticleTypes
                    );
                  });
                }
                if (!parsed || !parsed["@type"] || !parsed["@type"].match(this.REGEXPS.jsonLdArticleTypes)) {
                  return;
                }
                metadata = {};
                if (typeof parsed.name === "string" && typeof parsed.headline === "string" && parsed.name !== parsed.headline) {
                  var title = this._getArticleTitle();
                  var nameMatches = this._textSimilarity(parsed.name, title) > 0.75;
                  var headlineMatches = this._textSimilarity(parsed.headline, title) > 0.75;
                  if (headlineMatches && !nameMatches) {
                    metadata.title = parsed.headline;
                  } else {
                    metadata.title = parsed.name;
                  }
                } else if (typeof parsed.name === "string") {
                  metadata.title = parsed.name.trim();
                } else if (typeof parsed.headline === "string") {
                  metadata.title = parsed.headline.trim();
                }
                if (parsed.author) {
                  if (typeof parsed.author.name === "string") {
                    metadata.byline = parsed.author.name.trim();
                  } else if (Array.isArray(parsed.author) && parsed.author[0] && typeof parsed.author[0].name === "string") {
                    metadata.byline = parsed.author.filter(function(author) {
                      return author && typeof author.name === "string";
                    }).map(function(author) {
                      return author.name.trim();
                    }).join(", ");
                  }
                }
                if (typeof parsed.description === "string") {
                  metadata.excerpt = parsed.description.trim();
                }
                if (parsed.publisher && typeof parsed.publisher.name === "string") {
                  metadata.siteName = parsed.publisher.name.trim();
                }
                if (typeof parsed.datePublished === "string") {
                  metadata.datePublished = parsed.datePublished.trim();
                }
                return;
              } catch (err) {
                this.log(err.message);
              }
            }
          });
          return metadata ? metadata : {};
        },
        /**
         * Attempts to get excerpt and byline metadata for the article.
         *
         * @param {Object} jsonld — object containing any metadata that
         * could be extracted from JSON-LD object.
         *
         * @return Object with optional "excerpt" and "byline" properties
         */
        _getArticleMetadata: function(jsonld) {
          var metadata = {};
          var values = {};
          var metaElements = this._doc.getElementsByTagName("meta");
          var propertyPattern = /\s*(article|dc|dcterm|og|twitter)\s*:\s*(author|creator|description|published_time|title|site_name)\s*/gi;
          var namePattern = /^\s*(?:(dc|dcterm|og|twitter|weibo:(article|webpage))\s*[\.:]\s*)?(author|creator|description|title|site_name)\s*$/i;
          this._forEachNode(metaElements, function(element) {
            var elementName = element.getAttribute("name");
            var elementProperty = element.getAttribute("property");
            var content = element.getAttribute("content");
            if (!content) {
              return;
            }
            var matches = null;
            var name = null;
            if (elementProperty) {
              matches = elementProperty.match(propertyPattern);
              if (matches) {
                name = matches[0].toLowerCase().replace(/\s/g, "");
                values[name] = content.trim();
              }
            }
            if (!matches && elementName && namePattern.test(elementName)) {
              name = elementName;
              if (content) {
                name = name.toLowerCase().replace(/\s/g, "").replace(/\./g, ":");
                values[name] = content.trim();
              }
            }
          });
          metadata.title = jsonld.title || values["dc:title"] || values["dcterm:title"] || values["og:title"] || values["weibo:article:title"] || values["weibo:webpage:title"] || values["title"] || values["twitter:title"];
          if (!metadata.title) {
            metadata.title = this._getArticleTitle();
          }
          metadata.byline = jsonld.byline || values["dc:creator"] || values["dcterm:creator"] || values["author"];
          metadata.excerpt = jsonld.excerpt || values["dc:description"] || values["dcterm:description"] || values["og:description"] || values["weibo:article:description"] || values["weibo:webpage:description"] || values["description"] || values["twitter:description"];
          metadata.siteName = jsonld.siteName || values["og:site_name"];
          metadata.publishedTime = jsonld.datePublished || values["article:published_time"] || null;
          metadata.title = this._unescapeHtmlEntities(metadata.title);
          metadata.byline = this._unescapeHtmlEntities(metadata.byline);
          metadata.excerpt = this._unescapeHtmlEntities(metadata.excerpt);
          metadata.siteName = this._unescapeHtmlEntities(metadata.siteName);
          metadata.publishedTime = this._unescapeHtmlEntities(metadata.publishedTime);
          return metadata;
        },
        /**
         * Check if node is image, or if node contains exactly only one image
         * whether as a direct child or as its descendants.
         *
         * @param Element
        **/
        _isSingleImage: function(node) {
          if (node.tagName === "IMG") {
            return true;
          }
          if (node.children.length !== 1 || node.textContent.trim() !== "") {
            return false;
          }
          return this._isSingleImage(node.children[0]);
        },
        /**
         * Find all <noscript> that are located after <img> nodes, and which contain only one
         * <img> element. Replace the first image with the image from inside the <noscript> tag,
         * and remove the <noscript> tag. This improves the quality of the images we use on
         * some sites (e.g. Medium).
         *
         * @param Element
        **/
        _unwrapNoscriptImages: function(doc) {
          var imgs = Array.from(doc.getElementsByTagName("img"));
          this._forEachNode(imgs, function(img) {
            for (var i = 0; i < img.attributes.length; i++) {
              var attr = img.attributes[i];
              switch (attr.name) {
                case "src":
                case "srcset":
                case "data-src":
                case "data-srcset":
                  return;
              }
              if (/\.(jpg|jpeg|png|webp)/i.test(attr.value)) {
                return;
              }
            }
            img.parentNode.removeChild(img);
          });
          var noscripts = Array.from(doc.getElementsByTagName("noscript"));
          this._forEachNode(noscripts, function(noscript) {
            var tmp = doc.createElement("div");
            tmp.innerHTML = noscript.innerHTML;
            if (!this._isSingleImage(tmp)) {
              return;
            }
            var prevElement = noscript.previousElementSibling;
            if (prevElement && this._isSingleImage(prevElement)) {
              var prevImg = prevElement;
              if (prevImg.tagName !== "IMG") {
                prevImg = prevElement.getElementsByTagName("img")[0];
              }
              var newImg = tmp.getElementsByTagName("img")[0];
              for (var i = 0; i < prevImg.attributes.length; i++) {
                var attr = prevImg.attributes[i];
                if (attr.value === "") {
                  continue;
                }
                if (attr.name === "src" || attr.name === "srcset" || /\.(jpg|jpeg|png|webp)/i.test(attr.value)) {
                  if (newImg.getAttribute(attr.name) === attr.value) {
                    continue;
                  }
                  var attrName = attr.name;
                  if (newImg.hasAttribute(attrName)) {
                    attrName = "data-old-" + attrName;
                  }
                  newImg.setAttribute(attrName, attr.value);
                }
              }
              noscript.parentNode.replaceChild(tmp.firstElementChild, prevElement);
            }
          });
        },
        /**
         * Removes script tags from the document.
         *
         * @param Element
        **/
        _removeScripts: function(doc) {
          this._removeNodes(this._getAllNodesWithTag(doc, ["script", "noscript"]));
        },
        /**
         * Check if this node has only whitespace and a single element with given tag
         * Returns false if the DIV node contains non-empty text nodes
         * or if it contains no element with given tag or more than 1 element.
         *
         * @param Element
         * @param string tag of child element
        **/
        _hasSingleTagInsideElement: function(element, tag) {
          if (element.children.length != 1 || element.children[0].tagName !== tag) {
            return false;
          }
          return !this._someNode(element.childNodes, function(node) {
            return node.nodeType === this.TEXT_NODE && this.REGEXPS.hasContent.test(node.textContent);
          });
        },
        _isElementWithoutContent: function(node) {
          return node.nodeType === this.ELEMENT_NODE && node.textContent.trim().length == 0 && (node.children.length == 0 || node.children.length == node.getElementsByTagName("br").length + node.getElementsByTagName("hr").length);
        },
        /**
         * Determine whether element has any children block level elements.
         *
         * @param Element
         */
        _hasChildBlockElement: function(element) {
          return this._someNode(element.childNodes, function(node) {
            return this.DIV_TO_P_ELEMS.has(node.tagName) || this._hasChildBlockElement(node);
          });
        },
        /***
         * Determine if a node qualifies as phrasing content.
         * https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content
        **/
        _isPhrasingContent: function(node) {
          return node.nodeType === this.TEXT_NODE || this.PHRASING_ELEMS.indexOf(node.tagName) !== -1 || (node.tagName === "A" || node.tagName === "DEL" || node.tagName === "INS") && this._everyNode(node.childNodes, this._isPhrasingContent);
        },
        _isWhitespace: function(node) {
          return node.nodeType === this.TEXT_NODE && node.textContent.trim().length === 0 || node.nodeType === this.ELEMENT_NODE && node.tagName === "BR";
        },
        /**
         * Get the inner text of a node - cross browser compatibly.
         * This also strips out any excess whitespace to be found.
         *
         * @param Element
         * @param Boolean normalizeSpaces (default: true)
         * @return string
        **/
        _getInnerText: function(e, normalizeSpaces) {
          normalizeSpaces = typeof normalizeSpaces === "undefined" ? true : normalizeSpaces;
          var textContent = e.textContent.trim();
          if (normalizeSpaces) {
            return textContent.replace(this.REGEXPS.normalize, " ");
          }
          return textContent;
        },
        /**
         * Get the number of times a string s appears in the node e.
         *
         * @param Element
         * @param string - what to split on. Default is ","
         * @return number (integer)
        **/
        _getCharCount: function(e, s) {
          s = s || ",";
          return this._getInnerText(e).split(s).length - 1;
        },
        /**
         * Remove the style attribute on every e and under.
         * TODO: Test if getElementsByTagName(*) is faster.
         *
         * @param Element
         * @return void
        **/
        _cleanStyles: function(e) {
          if (!e || e.tagName.toLowerCase() === "svg")
            return;
          for (var i = 0; i < this.PRESENTATIONAL_ATTRIBUTES.length; i++) {
            e.removeAttribute(this.PRESENTATIONAL_ATTRIBUTES[i]);
          }
          if (this.DEPRECATED_SIZE_ATTRIBUTE_ELEMS.indexOf(e.tagName) !== -1) {
            e.removeAttribute("width");
            e.removeAttribute("height");
          }
          var cur = e.firstElementChild;
          while (cur !== null) {
            this._cleanStyles(cur);
            cur = cur.nextElementSibling;
          }
        },
        /**
         * Get the density of links as a percentage of the content
         * This is the amount of text that is inside a link divided by the total text in the node.
         *
         * @param Element
         * @return number (float)
        **/
        _getLinkDensity: function(element) {
          var textLength = this._getInnerText(element).length;
          if (textLength === 0)
            return 0;
          var linkLength = 0;
          this._forEachNode(element.getElementsByTagName("a"), function(linkNode) {
            var href = linkNode.getAttribute("href");
            var coefficient = href && this.REGEXPS.hashUrl.test(href) ? 0.3 : 1;
            linkLength += this._getInnerText(linkNode).length * coefficient;
          });
          return linkLength / textLength;
        },
        /**
         * Get an elements class/id weight. Uses regular expressions to tell if this
         * element looks good or bad.
         *
         * @param Element
         * @return number (Integer)
        **/
        _getClassWeight: function(e) {
          if (!this._flagIsActive(this.FLAG_WEIGHT_CLASSES))
            return 0;
          var weight = 0;
          if (typeof e.className === "string" && e.className !== "") {
            if (this.REGEXPS.negative.test(e.className))
              weight -= 25;
            if (this.REGEXPS.positive.test(e.className))
              weight += 25;
          }
          if (typeof e.id === "string" && e.id !== "") {
            if (this.REGEXPS.negative.test(e.id))
              weight -= 25;
            if (this.REGEXPS.positive.test(e.id))
              weight += 25;
          }
          return weight;
        },
        /**
         * Clean a node of all elements of type "tag".
         * (Unless it's a youtube/vimeo video. People love movies.)
         *
         * @param Element
         * @param string tag to clean
         * @return void
         **/
        _clean: function(e, tag) {
          var isEmbed = ["object", "embed", "iframe"].indexOf(tag) !== -1;
          this._removeNodes(this._getAllNodesWithTag(e, [tag]), function(element) {
            if (isEmbed) {
              for (var i = 0; i < element.attributes.length; i++) {
                if (this._allowedVideoRegex.test(element.attributes[i].value)) {
                  return false;
                }
              }
              if (element.tagName === "object" && this._allowedVideoRegex.test(element.innerHTML)) {
                return false;
              }
            }
            return true;
          });
        },
        /**
         * Check if a given node has one of its ancestor tag name matching the
         * provided one.
         * @param  HTMLElement node
         * @param  String      tagName
         * @param  Number      maxDepth
         * @param  Function    filterFn a filter to invoke to determine whether this node 'counts'
         * @return Boolean
         */
        _hasAncestorTag: function(node, tagName, maxDepth, filterFn) {
          maxDepth = maxDepth || 3;
          tagName = tagName.toUpperCase();
          var depth = 0;
          while (node.parentNode) {
            if (maxDepth > 0 && depth > maxDepth)
              return false;
            if (node.parentNode.tagName === tagName && (!filterFn || filterFn(node.parentNode)))
              return true;
            node = node.parentNode;
            depth++;
          }
          return false;
        },
        /**
         * Return an object indicating how many rows and columns this table has.
         */
        _getRowAndColumnCount: function(table) {
          var rows = 0;
          var columns = 0;
          var trs = table.getElementsByTagName("tr");
          for (var i = 0; i < trs.length; i++) {
            var rowspan = trs[i].getAttribute("rowspan") || 0;
            if (rowspan) {
              rowspan = parseInt(rowspan, 10);
            }
            rows += rowspan || 1;
            var columnsInThisRow = 0;
            var cells = trs[i].getElementsByTagName("td");
            for (var j = 0; j < cells.length; j++) {
              var colspan = cells[j].getAttribute("colspan") || 0;
              if (colspan) {
                colspan = parseInt(colspan, 10);
              }
              columnsInThisRow += colspan || 1;
            }
            columns = Math.max(columns, columnsInThisRow);
          }
          return { rows, columns };
        },
        /**
         * Look for 'data' (as opposed to 'layout') tables, for which we use
         * similar checks as
         * https://searchfox.org/mozilla-central/rev/f82d5c549f046cb64ce5602bfd894b7ae807c8f8/accessible/generic/TableAccessible.cpp#19
         */
        _markDataTables: function(root) {
          var tables = root.getElementsByTagName("table");
          for (var i = 0; i < tables.length; i++) {
            var table = tables[i];
            var role = table.getAttribute("role");
            if (role == "presentation") {
              table._readabilityDataTable = false;
              continue;
            }
            var datatable = table.getAttribute("datatable");
            if (datatable == "0") {
              table._readabilityDataTable = false;
              continue;
            }
            var summary = table.getAttribute("summary");
            if (summary) {
              table._readabilityDataTable = true;
              continue;
            }
            var caption = table.getElementsByTagName("caption")[0];
            if (caption && caption.childNodes.length > 0) {
              table._readabilityDataTable = true;
              continue;
            }
            var dataTableDescendants = ["col", "colgroup", "tfoot", "thead", "th"];
            var descendantExists = function(tag) {
              return !!table.getElementsByTagName(tag)[0];
            };
            if (dataTableDescendants.some(descendantExists)) {
              this.log("Data table because found data-y descendant");
              table._readabilityDataTable = true;
              continue;
            }
            if (table.getElementsByTagName("table")[0]) {
              table._readabilityDataTable = false;
              continue;
            }
            var sizeInfo = this._getRowAndColumnCount(table);
            if (sizeInfo.rows >= 10 || sizeInfo.columns > 4) {
              table._readabilityDataTable = true;
              continue;
            }
            table._readabilityDataTable = sizeInfo.rows * sizeInfo.columns > 10;
          }
        },
        /* convert images and figures that have properties like data-src into images that can be loaded without JS */
        _fixLazyImages: function(root) {
          this._forEachNode(this._getAllNodesWithTag(root, ["img", "picture", "figure"]), function(elem) {
            if (elem.src && this.REGEXPS.b64DataUrl.test(elem.src)) {
              var parts = this.REGEXPS.b64DataUrl.exec(elem.src);
              if (parts[1] === "image/svg+xml") {
                return;
              }
              var srcCouldBeRemoved = false;
              for (var i = 0; i < elem.attributes.length; i++) {
                var attr = elem.attributes[i];
                if (attr.name === "src") {
                  continue;
                }
                if (/\.(jpg|jpeg|png|webp)/i.test(attr.value)) {
                  srcCouldBeRemoved = true;
                  break;
                }
              }
              if (srcCouldBeRemoved) {
                var b64starts = elem.src.search(/base64\s*/i) + 7;
                var b64length = elem.src.length - b64starts;
                if (b64length < 133) {
                  elem.removeAttribute("src");
                }
              }
            }
            if ((elem.src || elem.srcset && elem.srcset != "null") && elem.className.toLowerCase().indexOf("lazy") === -1) {
              return;
            }
            for (var j = 0; j < elem.attributes.length; j++) {
              attr = elem.attributes[j];
              if (attr.name === "src" || attr.name === "srcset" || attr.name === "alt") {
                continue;
              }
              var copyTo = null;
              if (/\.(jpg|jpeg|png|webp)\s+\d/.test(attr.value)) {
                copyTo = "srcset";
              } else if (/^\s*\S+\.(jpg|jpeg|png|webp)\S*\s*$/.test(attr.value)) {
                copyTo = "src";
              }
              if (copyTo) {
                if (elem.tagName === "IMG" || elem.tagName === "PICTURE") {
                  elem.setAttribute(copyTo, attr.value);
                } else if (elem.tagName === "FIGURE" && !this._getAllNodesWithTag(elem, ["img", "picture"]).length) {
                  var img = this._doc.createElement("img");
                  img.setAttribute(copyTo, attr.value);
                  elem.appendChild(img);
                }
              }
            }
          });
        },
        _getTextDensity: function(e, tags) {
          var textLength = this._getInnerText(e, true).length;
          if (textLength === 0) {
            return 0;
          }
          var childrenLength = 0;
          var children = this._getAllNodesWithTag(e, tags);
          this._forEachNode(children, (child) => childrenLength += this._getInnerText(child, true).length);
          return childrenLength / textLength;
        },
        /**
         * Clean an element of all tags of type "tag" if they look fishy.
         * "Fishy" is an algorithm based on content length, classnames, link density, number of images & embeds, etc.
         *
         * @return void
         **/
        _cleanConditionally: function(e, tag) {
          if (!this._flagIsActive(this.FLAG_CLEAN_CONDITIONALLY))
            return;
          this._removeNodes(this._getAllNodesWithTag(e, [tag]), function(node) {
            var isDataTable = function(t) {
              return t._readabilityDataTable;
            };
            var isList = tag === "ul" || tag === "ol";
            if (!isList) {
              var listLength = 0;
              var listNodes = this._getAllNodesWithTag(node, ["ul", "ol"]);
              this._forEachNode(listNodes, (list) => listLength += this._getInnerText(list).length);
              isList = listLength / this._getInnerText(node).length > 0.9;
            }
            if (tag === "table" && isDataTable(node)) {
              return false;
            }
            if (this._hasAncestorTag(node, "table", -1, isDataTable)) {
              return false;
            }
            if (this._hasAncestorTag(node, "code")) {
              return false;
            }
            var weight = this._getClassWeight(node);
            this.log("Cleaning Conditionally", node);
            var contentScore = 0;
            if (weight + contentScore < 0) {
              return true;
            }
            if (this._getCharCount(node, ",") < 10) {
              var p = node.getElementsByTagName("p").length;
              var img = node.getElementsByTagName("img").length;
              var li = node.getElementsByTagName("li").length - 100;
              var input = node.getElementsByTagName("input").length;
              var headingDensity = this._getTextDensity(node, ["h1", "h2", "h3", "h4", "h5", "h6"]);
              var embedCount = 0;
              var embeds = this._getAllNodesWithTag(node, ["object", "embed", "iframe"]);
              for (var i = 0; i < embeds.length; i++) {
                for (var j = 0; j < embeds[i].attributes.length; j++) {
                  if (this._allowedVideoRegex.test(embeds[i].attributes[j].value)) {
                    return false;
                  }
                }
                if (embeds[i].tagName === "object" && this._allowedVideoRegex.test(embeds[i].innerHTML)) {
                  return false;
                }
                embedCount++;
              }
              var linkDensity = this._getLinkDensity(node);
              var contentLength = this._getInnerText(node).length;
              var haveToRemove = img > 1 && p / img < 0.5 && !this._hasAncestorTag(node, "figure") || !isList && li > p || input > Math.floor(p / 3) || !isList && headingDensity < 0.9 && contentLength < 25 && (img === 0 || img > 2) && !this._hasAncestorTag(node, "figure") || !isList && weight < 25 && linkDensity > 0.2 || weight >= 25 && linkDensity > 0.5 || (embedCount === 1 && contentLength < 75 || embedCount > 1);
              if (isList && haveToRemove) {
                for (var x = 0; x < node.children.length; x++) {
                  let child = node.children[x];
                  if (child.children.length > 1) {
                    return haveToRemove;
                  }
                }
                let li_count = node.getElementsByTagName("li").length;
                if (img == li_count) {
                  return false;
                }
              }
              return haveToRemove;
            }
            return false;
          });
        },
        /**
         * Clean out elements that match the specified conditions
         *
         * @param Element
         * @param Function determines whether a node should be removed
         * @return void
         **/
        _cleanMatchedNodes: function(e, filter) {
          var endOfSearchMarkerNode = this._getNextNode(e, true);
          var next = this._getNextNode(e);
          while (next && next != endOfSearchMarkerNode) {
            if (filter.call(this, next, next.className + " " + next.id)) {
              next = this._removeAndGetNext(next);
            } else {
              next = this._getNextNode(next);
            }
          }
        },
        /**
         * Clean out spurious headers from an Element.
         *
         * @param Element
         * @return void
        **/
        _cleanHeaders: function(e) {
          let headingNodes = this._getAllNodesWithTag(e, ["h1", "h2"]);
          this._removeNodes(headingNodes, function(node) {
            let shouldRemove = this._getClassWeight(node) < 0;
            if (shouldRemove) {
              this.log("Removing header with low class weight:", node);
            }
            return shouldRemove;
          });
        },
        /**
         * Check if this node is an H1 or H2 element whose content is mostly
         * the same as the article title.
         *
         * @param Element  the node to check.
         * @return boolean indicating whether this is a title-like header.
         */
        _headerDuplicatesTitle: function(node) {
          if (node.tagName != "H1" && node.tagName != "H2") {
            return false;
          }
          var heading = this._getInnerText(node, false);
          this.log("Evaluating similarity of header:", heading, this._articleTitle);
          return this._textSimilarity(this._articleTitle, heading) > 0.75;
        },
        _flagIsActive: function(flag) {
          return (this._flags & flag) > 0;
        },
        _removeFlag: function(flag) {
          this._flags = this._flags & ~flag;
        },
        _isProbablyVisible: function(node) {
          return (!node.style || node.style.display != "none") && (!node.style || node.style.visibility != "hidden") && !node.hasAttribute("hidden") && (!node.hasAttribute("aria-hidden") || node.getAttribute("aria-hidden") != "true" || node.className && node.className.indexOf && node.className.indexOf("fallback-image") !== -1);
        },
        /**
         * Runs readability.
         *
         * Workflow:
         *  1. Prep the document by removing script tags, css, etc.
         *  2. Build readability's DOM tree.
         *  3. Grab the article content from the current dom tree.
         *  4. Replace the current DOM tree with the new one.
         *  5. Read peacefully.
         *
         * @return void
         **/
        parse: function() {
          if (this._maxElemsToParse > 0) {
            var numTags = this._doc.getElementsByTagName("*").length;
            if (numTags > this._maxElemsToParse) {
              throw new Error("Aborting parsing document; " + numTags + " elements found");
            }
          }
          this._unwrapNoscriptImages(this._doc);
          var jsonLd = this._disableJSONLD ? {} : this._getJSONLD(this._doc);
          this._removeScripts(this._doc);
          this._prepDocument();
          var metadata = this._getArticleMetadata(jsonLd);
          this._articleTitle = metadata.title;
          var articleContent = this._grabArticle();
          if (!articleContent)
            return null;
          this.log("Grabbed: " + articleContent.innerHTML);
          this._postProcessContent(articleContent);
          if (!metadata.excerpt) {
            var paragraphs = articleContent.getElementsByTagName("p");
            if (paragraphs.length > 0) {
              metadata.excerpt = paragraphs[0].textContent.trim();
            }
          }
          var textContent = articleContent.textContent;
          return {
            title: this._articleTitle,
            byline: metadata.byline || this._articleByline,
            dir: this._articleDir,
            lang: this._articleLang,
            content: this._serializer(articleContent),
            textContent,
            length: textContent.length,
            excerpt: metadata.excerpt,
            siteName: metadata.siteName || this._articleSiteName,
            publishedTime: metadata.publishedTime
          };
        }
      };
      if (typeof module === "object") {
        module.exports = Readability2;
      }
    }
  });

  // node_modules/@mozilla/readability/Readability-readerable.js
  var require_Readability_readerable = __commonJS({
    "node_modules/@mozilla/readability/Readability-readerable.js"(exports, module) {
      var REGEXPS = {
        // NOTE: These two regular expressions are duplicated in
        // Readability.js. Please keep both copies in sync.
        unlikelyCandidates: /-ad-|ai2html|banner|breadcrumbs|combx|comment|community|cover-wrap|disqus|extra|footer|gdpr|header|legends|menu|related|remark|replies|rss|shoutbox|sidebar|skyscraper|social|sponsor|supplemental|ad-break|agegate|pagination|pager|popup|yom-remote/i,
        okMaybeItsACandidate: /and|article|body|column|content|main|shadow/i
      };
      function isNodeVisible(node) {
        return (!node.style || node.style.display != "none") && !node.hasAttribute("hidden") && (!node.hasAttribute("aria-hidden") || node.getAttribute("aria-hidden") != "true" || node.className && node.className.indexOf && node.className.indexOf("fallback-image") !== -1);
      }
      function isProbablyReaderable(doc, options = {}) {
        if (typeof options == "function") {
          options = { visibilityChecker: options };
        }
        var defaultOptions = { minScore: 20, minContentLength: 140, visibilityChecker: isNodeVisible };
        options = Object.assign(defaultOptions, options);
        var nodes = doc.querySelectorAll("p, pre, article");
        var brNodes = doc.querySelectorAll("div > br");
        if (brNodes.length) {
          var set = new Set(nodes);
          [].forEach.call(brNodes, function(node) {
            set.add(node.parentNode);
          });
          nodes = Array.from(set);
        }
        var score = 0;
        return [].some.call(nodes, function(node) {
          if (!options.visibilityChecker(node)) {
            return false;
          }
          var matchString = node.className + " " + node.id;
          if (REGEXPS.unlikelyCandidates.test(matchString) && !REGEXPS.okMaybeItsACandidate.test(matchString)) {
            return false;
          }
          if (node.matches("li p")) {
            return false;
          }
          var textContentLength = node.textContent.trim().length;
          if (textContentLength < options.minContentLength) {
            return false;
          }
          score += Math.sqrt(textContentLength - options.minContentLength);
          if (score > options.minScore) {
            return true;
          }
          return false;
        });
      }
      if (typeof module === "object") {
        module.exports = isProbablyReaderable;
      }
    }
  });

  // node_modules/@mozilla/readability/index.js
  var require_readability = __commonJS({
    "node_modules/@mozilla/readability/index.js"(exports, module) {
      var Readability2 = require_Readability();
      var isProbablyReaderable = require_Readability_readerable();
      module.exports = {
        Readability: Readability2,
        isProbablyReaderable
      };
    }
  });

  // node_modules/dom-to-semantic-markdown/dist/node/core/ElementNode.js
  var require_ElementNode = __commonJS({
    "node_modules/dom-to-semantic-markdown/dist/node/core/ElementNode.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports._Node = void 0;
      exports._Node = {
        /** node is an element. */
        ELEMENT_NODE: 1,
        ATTRIBUTE_NODE: 2,
        /** node is a Text node. */
        TEXT_NODE: 3,
        /** node is a CDATASection node. */
        CDATA_SECTION_NODE: 4,
        ENTITY_REFERENCE_NODE: 5,
        ENTITY_NODE: 6,
        /** node is a ProcessingInstruction node. */
        PROCESSING_INSTRUCTION_NODE: 7,
        /** node is a Comment node. */
        COMMENT_NODE: 8,
        /** node is a document. */
        DOCUMENT_NODE: 9,
        /** node is a doctype. */
        DOCUMENT_TYPE_NODE: 10,
        /** node is a DocumentFragment node. */
        DOCUMENT_FRAGMENT_NODE: 11,
        NOTATION_NODE: 12,
        /** Set when node and other are not in the same tree. */
        DOCUMENT_POSITION_DISCONNECTED: 1,
        /** Set when other is preceding node. */
        DOCUMENT_POSITION_PRECEDING: 2,
        /** Set when other is following node. */
        DOCUMENT_POSITION_FOLLOWING: 4,
        /** Set when other is an ancestor of node. */
        DOCUMENT_POSITION_CONTAINS: 8,
        /** Set when other is a descendant of node. */
        DOCUMENT_POSITION_CONTAINED_BY: 16,
        DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32
      };
    }
  });

  // node_modules/dom-to-semantic-markdown/dist/node/core/htmlToMarkdownAST.js
  var require_htmlToMarkdownAST = __commonJS({
    "node_modules/dom-to-semantic-markdown/dist/node/core/htmlToMarkdownAST.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.htmlToMarkdownAST = htmlToMarkdownAST;
      var ElementNode_1 = require_ElementNode();
      function htmlToMarkdownAST(element, options, indentLevel = 0) {
        let result = [];
        const debugLog = (message) => {
          if (options?.debug) {
            console.log(message);
          }
        };
        element.childNodes.forEach((childElement) => {
          const overriddenElementProcessing = options?.overrideElementProcessing?.(childElement, options, indentLevel);
          if (overriddenElementProcessing) {
            debugLog(`Element Processing Overridden: '${childElement.nodeType}'`);
            result.push(...overriddenElementProcessing);
          } else if (childElement.nodeType === ElementNode_1._Node.TEXT_NODE) {
            const textContent = escapeMarkdownCharacters(childElement.textContent?.trim() ?? "");
            if (textContent && !!childElement.textContent) {
              debugLog(`Text Node: '${textContent}'`);
              result.push({ type: "text", content: childElement.textContent?.trim() });
            }
          } else if (childElement.nodeType === ElementNode_1._Node.ELEMENT_NODE) {
            const elem = childElement;
            if (/^h[1-6]$/i.test(elem.tagName)) {
              const level = parseInt(elem.tagName.substring(1));
              debugLog(`Heading ${level}`);
              result.push({
                type: "heading",
                level,
                content: htmlToMarkdownAST(elem, options)
                // Process child elements
              });
            } else if (elem.tagName.toLowerCase() === "p") {
              debugLog("Paragraph");
              result.push(...htmlToMarkdownAST(elem, options));
              result.push({ type: "text", content: "\n\n" });
            } else if (elem.tagName.toLowerCase() === "a") {
              debugLog(`Link: '${elem.href}' with text '${elem.textContent}'`);
              if (typeof elem.href === "string" && elem.href.startsWith("data:image")) {
                result.push({
                  type: "link",
                  href: "-",
                  content: htmlToMarkdownAST(elem, options)
                });
              } else {
                let href = elem.href;
                if (typeof href === "string") {
                  href = options?.websiteDomain && href.startsWith(options.websiteDomain) ? href.substring(options.websiteDomain.length) : href;
                } else {
                  href = "#";
                }
                if (Array.from(elem.childNodes).every((_) => _.nodeType === ElementNode_1._Node.TEXT_NODE)) {
                  result.push({
                    type: "link",
                    href,
                    content: [{ type: "text", content: elem.textContent?.trim() ?? "" }]
                  });
                } else {
                  result.push({
                    type: "link",
                    href,
                    content: htmlToMarkdownAST(elem, options)
                  });
                }
              }
            } else if (elem.tagName.toLowerCase() === "img") {
              debugLog(`Image: src='${elem.src}', alt='${elem.alt}'`);
              if (elem.src?.startsWith("data:image")) {
                result.push({
                  type: "image",
                  src: "-",
                  alt: escapeMarkdownCharacters(elem.alt)
                });
              } else {
                const src = options?.websiteDomain && elem.src?.startsWith(options.websiteDomain) ? elem.src?.substring(options.websiteDomain.length) : elem.src;
                result.push({ type: "image", src, alt: escapeMarkdownCharacters(elem.alt) });
              }
            } else if (elem.tagName.toLowerCase() === "video") {
              debugLog(`Video: src='${elem.src}', poster='${elem.poster}', controls='${elem.controls}'`);
              result.push({
                type: "video",
                src: elem.src,
                poster: escapeMarkdownCharacters(elem.poster),
                controls: elem.controls
              });
            } else if (elem.tagName.toLowerCase() === "ul" || elem.tagName.toLowerCase() === "ol") {
              debugLog(`${elem.tagName.toLowerCase() === "ul" ? "Unordered" : "Ordered"} List`);
              result.push({
                type: "list",
                ordered: elem.tagName.toLowerCase() === "ol",
                items: Array.from(elem.children).map((li) => ({
                  type: "listItem",
                  content: htmlToMarkdownAST(li, options, indentLevel + 1)
                }))
              });
            } else if (elem.tagName.toLowerCase() === "br") {
              debugLog("Line Break");
              result.push({ type: "text", content: "\n" });
            } else if (elem.tagName.toLowerCase() === "table") {
              debugLog("Table");
              let colIds = [];
              if (options?.enableTableColumnTracking) {
                const headerCells = Array.from(elem.querySelectorAll("th, td"));
                headerCells.forEach((_, index) => {
                  colIds.push(`col-${index}`);
                });
              }
              const tableRows = Array.from(elem.querySelectorAll("tr"));
              const markdownTableRows = tableRows.map((row) => {
                let columnIndex = 0;
                const cells = Array.from(row.querySelectorAll("th, td")).map((cell) => {
                  const colspan = parseInt(cell.getAttribute("colspan") || "1", 10);
                  const rowspan = parseInt(cell.getAttribute("rowspan") || "1", 10);
                  const cellNode = {
                    type: "tableCell",
                    content: cell.nodeType === ElementNode_1._Node.TEXT_NODE ? escapeMarkdownCharacters(cell.textContent?.trim() ?? "") : htmlToMarkdownAST(cell, options, indentLevel + 1),
                    colId: colIds[columnIndex],
                    colspan: colspan > 1 ? colspan : void 0,
                    rowspan: rowspan > 1 ? rowspan : void 0
                  };
                  columnIndex += colspan;
                  return cellNode;
                });
                return { type: "tableRow", cells };
              });
              if (markdownTableRows.length > 0) {
                const hasHeaders = tableRows[0].querySelector("th") !== null;
                if (hasHeaders) {
                  const headerSeparatorCells = Array.from(tableRows[0].querySelectorAll("th, td")).map(() => ({
                    type: "tableCell",
                    content: "---",
                    colId: void 0,
                    colspan: void 0,
                    rowspan: void 0
                  }));
                  const headerSeparatorRow = {
                    type: "tableRow",
                    cells: headerSeparatorCells
                  };
                  markdownTableRows.splice(1, 0, headerSeparatorRow);
                }
              }
              result.push({ type: "table", rows: markdownTableRows, colIds });
            } else if (elem.tagName.toLowerCase() === "head" && !!options?.includeMetaData) {
              const node = {
                type: "meta",
                content: {
                  standard: {},
                  openGraph: {},
                  twitter: {}
                }
              };
              elem.querySelectorAll("title").forEach((titleElem) => {
                node.content.standard["title"] = escapeMarkdownCharacters(titleElem.text);
              });
              const metaTags = elem.querySelectorAll("meta");
              const nonSemanticTagNames = [
                "viewport",
                "referrer",
                "Content-Security-Policy"
              ];
              metaTags.forEach((metaTag) => {
                const name = metaTag.getAttribute("name");
                const property = metaTag.getAttribute("property");
                const content = metaTag.getAttribute("content");
                if (property && property.startsWith("og:") && content) {
                  if (options.includeMetaData === "extended") {
                    node.content.openGraph[property.substring(3)] = content;
                  }
                } else if (name && name.startsWith("twitter:") && content) {
                  if (options.includeMetaData === "extended") {
                    node.content.twitter[name.substring(8)] = content;
                  }
                } else if (name && !nonSemanticTagNames.includes(name) && content) {
                  node.content.standard[name] = content;
                }
              });
              if (options.includeMetaData === "extended") {
                const jsonLdData = [];
                const jsonLDScripts = elem.querySelectorAll('script[type="application/ld+json"]');
                jsonLDScripts.forEach((script) => {
                  try {
                    const jsonContent = script.textContent;
                    if (jsonContent) {
                      const parsedData = JSON.parse(jsonContent);
                      jsonLdData.push(parsedData);
                    }
                  } catch (error) {
                    console.error("Failed to parse JSON-LD", error);
                  }
                });
                node.content.jsonLd = jsonLdData;
              }
              result.push(node);
            } else {
              const content = escapeMarkdownCharacters(elem.textContent || "");
              switch (elem.tagName.toLowerCase()) {
                case "noscript":
                case "script":
                case "style":
                case "html":
                  break;
                case "strong":
                case "b":
                  if (content) {
                    debugLog(`Bold: '${content}'`);
                    result.push({
                      type: "bold",
                      content: htmlToMarkdownAST(elem, options, indentLevel + 1)
                    });
                  }
                  break;
                case "em":
                case "i":
                  if (content) {
                    debugLog(`Italic: '${content}'`);
                    result.push({
                      type: "italic",
                      content: htmlToMarkdownAST(elem, options, indentLevel + 1)
                    });
                  }
                  break;
                case "s":
                case "strike":
                  if (content) {
                    debugLog(`Strikethrough: '${content}'`);
                    result.push({
                      type: "strikethrough",
                      content: htmlToMarkdownAST(elem, options, indentLevel + 1)
                    });
                  }
                  break;
                case "code":
                  if (content) {
                    const isCodeBlock = elem.parentNode && elem.parentNode.nodeName.toLowerCase() === "pre";
                    debugLog(`${isCodeBlock ? "Code Block" : "Inline Code"}: '${content}'`);
                    const languageClass = elem.className?.split(" ").find((cls) => cls.startsWith("language-"));
                    const language = languageClass ? languageClass.replace("language-", "") : "";
                    result.push({
                      type: "code",
                      content: elem.textContent?.trim() ?? "",
                      language,
                      inline: !isCodeBlock
                    });
                  }
                  break;
                case "blockquote":
                  debugLog(`Blockquote`);
                  result.push({
                    type: "blockquote",
                    content: htmlToMarkdownAST(elem, options)
                  });
                  break;
                case "article":
                case "aside":
                case "details":
                case "figcaption":
                case "figure":
                case "footer":
                case "header":
                case "main":
                case "mark":
                case "nav":
                case "section":
                case "summary":
                case "time":
                  debugLog(`Semantic HTML Element: '${elem.tagName}'`);
                  result.push({
                    type: "semanticHtml",
                    htmlType: elem.tagName.toLowerCase(),
                    content: htmlToMarkdownAST(elem, options)
                  });
                  break;
                default:
                  const unhandledElementProcessing = options?.processUnhandledElement?.(elem, options, indentLevel);
                  if (unhandledElementProcessing) {
                    debugLog(`Processing Unhandled Element: '${elem.tagName}'`);
                    result.push(...unhandledElementProcessing);
                  } else {
                    debugLog(`Generic HTMLElement: '${elem.tagName}'`);
                    result.push(...htmlToMarkdownAST(elem, options, indentLevel + 1));
                  }
                  break;
              }
            }
          }
        });
        return result;
      }
      function escapeMarkdownCharacters(text, isInlineCode = false) {
        if (isInlineCode || !text?.trim()) {
          return text;
        }
        let escapedText = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        escapedText = escapedText.replace(/([\\`*_{}[\]#+!|])/g, "\\$1");
        return escapedText;
      }
    }
  });

  // node_modules/dom-to-semantic-markdown/dist/node/core/markdownASTToString.js
  var require_markdownASTToString = __commonJS({
    "node_modules/dom-to-semantic-markdown/dist/node/core/markdownASTToString.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.markdownASTToString = markdownASTToString;
      var index_1 = require_node();
      function aggressiveTrim(str) {
        if (typeof str !== "string")
          return "";
        return str.replace(/^[\s\u00A0\u200B]+|[\s\u00A0\u200B]+$/g, "");
      }
      function renderSimpleMetaObject(obj, indent = "") {
        if (!obj || Object.keys(obj).length === 0)
          return "";
        let metaString = "";
        Object.keys(obj).forEach((key) => {
          const value = String(obj[key] ?? "");
          metaString += `${indent}${key}: "${value.replace(/"/g, '\\"')}"
`;
        });
        return metaString;
      }
      function markdownMetaASTToString(nodes, options) {
        if (!options?.includeMetaData) {
          return "";
        }
        const metaNode = (0, index_1.findInMarkdownAST)(nodes, (_) => _.type === "meta");
        if (!metaNode) {
          return "---\n---\n\n";
        }
        let markdownString = "---\n";
        if (metaNode.content.standard) {
          markdownString += renderSimpleMetaObject(metaNode.content.standard);
        }
        if (options.includeMetaData === "extended") {
          if (metaNode.content.openGraph && Object.keys(metaNode.content.openGraph).length > 0) {
            markdownString += "openGraph:\n";
            markdownString += renderSimpleMetaObject(metaNode.content.openGraph, "  ");
          }
          if (metaNode.content.twitter && Object.keys(metaNode.content.twitter).length > 0) {
            markdownString += "twitter:\n";
            markdownString += renderSimpleMetaObject(metaNode.content.twitter, "  ");
          }
          if (metaNode.content.jsonLd && metaNode.content.jsonLd.length > 0) {
            markdownString += "schema:\n";
            metaNode.content.jsonLd.forEach((item) => {
              if (!item)
                return;
              const { "@context": _jldContext, "@type": jldType, ...semanticData } = item;
              markdownString += `  ${jldType ?? "(unknown type)"}:
`;
              Object.keys(semanticData).forEach((key) => {
                const value = semanticData[key];
                markdownString += `    ${key}: ${JSON.stringify(value ?? null)}
`;
              });
            });
          }
        }
        markdownString += "---\n\n\n";
        return markdownString;
      }
      function processNodeContent(content, renderChildren, options, indentLevel) {
        if (typeof content === "string") {
          return content;
        }
        if (Array.isArray(content)) {
          return renderChildren(content, options, indentLevel);
        }
        return "";
      }
      var nodeRenderers = {
        text: (node) => {
          return typeof node.content === "string" ? node.content : "";
        },
        bold: (node, options, renderChildren, indentLevel) => {
          const contentString = processNodeContent(node.content, renderChildren, options, indentLevel);
          return `**${aggressiveTrim(contentString)}**`;
        },
        italic: (node, options, renderChildren, indentLevel) => {
          const contentString = processNodeContent(node.content, renderChildren, options, indentLevel);
          return `*${aggressiveTrim(contentString)}*`;
        },
        strikethrough: (node, options, renderChildren, indentLevel) => {
          const contentString = processNodeContent(node.content, renderChildren, options, indentLevel);
          return `~~${aggressiveTrim(contentString)}~~`;
        },
        link: (node, options, renderChildren, indentLevel) => {
          const linkNode = node;
          const contentString = processNodeContent(linkNode.content, renderChildren, options, indentLevel);
          const trimmedLinkContent = aggressiveTrim(contentString);
          const href = linkNode.href ? encodeURI(linkNode.href) : "";
          if (trimmedLinkContent && (Array.isArray(linkNode.content) && linkNode.content.length === 1 && linkNode.content[0].type === "text" && linkNode.content[0].content === trimmedLinkContent || typeof linkNode.content === "string" && linkNode.content === trimmedLinkContent || !Array.isArray(linkNode.content) && !trimmedLinkContent.includes("<") && !trimmedLinkContent.includes("\n"))) {
            return `[${trimmedLinkContent}](${href})`;
          }
          return `<a href="${href}">${trimmedLinkContent}</a>`;
        },
        heading: (node, options, renderChildren, indentLevel) => {
          const headingNode = node;
          const contentString = processNodeContent(headingNode.content, renderChildren, options, indentLevel);
          return `${"#".repeat(headingNode.level)} ${contentString.trim()}

`;
        },
        image: (node) => {
          const imageNode = node;
          const altText = aggressiveTrim(imageNode.alt);
          const srcText = imageNode.src ? encodeURI(imageNode.src) : "";
          return `![${altText}](${srcText})
`;
        },
        list: (node, options, renderChildren, indentLevel) => {
          const listNode = node;
          let listString = "";
          const itemIndent = " ".repeat(indentLevel * 2);
          (listNode.items || []).forEach((item, i) => {
            if (!item || !item.content)
              return;
            const listItemPrefix = listNode.ordered ? `${i + 1}.` : "-";
            const itemContentString = renderChildren(item.content, options, indentLevel + 1).trim();
            listString += `${itemIndent}${listItemPrefix} ${itemContentString}
`;
          });
          return listString;
        },
        video: (node) => {
          const videoNode = node;
          let videoString = "";
          const videoSrc = videoNode.src ? encodeURI(videoNode.src) : "";
          videoString += `
![Video](${videoSrc})
`;
          if (videoNode.poster) {
            const posterSrc = typeof videoNode.poster === "string" ? encodeURI(videoNode.poster) : "";
            videoString += `![Poster](${posterSrc})
`;
          }
          if (videoNode.controls !== void 0) {
            videoString += `Controls: ${videoNode.controls}
`;
          }
          return videoString;
        },
        table: (node, options, renderChildren, indentLevel) => {
          const tableNode = node;
          const rows = tableNode.rows || [];
          if (rows.length === 0)
            return "";
          const maxColumns = Math.max(0, ...rows.map((row) => (row.cells || []).reduce((sum, cell) => sum + Math.max(1, cell?.colspan || 1), 0)));
          if (maxColumns === 0)
            return "";
          let tableString = "";
          rows.forEach((row, rowIndex) => {
            if (!row || !row.cells)
              return;
            let currentColumn = 0;
            let rowString = "";
            row.cells.forEach((cell) => {
              if (!cell)
                return;
              let cellContent = processNodeContent(cell.content, renderChildren, options, indentLevel + 1).trim();
              cellContent = cellContent.replace(/\|/g, "\\|");
              if (cell.colId)
                cellContent += ` <!-- ${cell.colId} -->`;
              const colspan = Math.max(1, cell.colspan || 1);
              const rowspan = Math.max(1, cell.rowspan || 1);
              if (colspan > 1)
                cellContent += ` <!-- colspan: ${colspan} -->`;
              if (rowspan > 1)
                cellContent += ` <!-- rowspan: ${rowspan} -->`;
              rowString += `| ${cellContent} `;
              currentColumn += colspan;
              for (let i = 1; i < colspan; i++) {
                rowString += "| ";
              }
            });
            while (currentColumn < maxColumns) {
              rowString += "|  ";
              currentColumn++;
            }
            tableString += rowString + "|\n";
          });
          return tableString;
        },
        code: (node) => {
          const codeNode = node;
          const codeContent = codeNode.content || "";
          if (codeNode.inline) {
            return `\`${codeContent}\``;
          } else {
            return `\`\`\`${codeNode.language || ""}
${codeContent}
\`\`\`
`;
          }
        },
        blockquote: (node, options, renderChildren, indentLevel) => {
          const rawBqContent = renderChildren(node.content, options, indentLevel);
          const processedBqContent = rawBqContent.trim().split("\n").map((line) => `> ${line.trim()}`).join("\n");
          if (processedBqContent.length > 0 && processedBqContent !== ">") {
            return processedBqContent + "\n";
          }
          return "> \n";
        },
        semanticHtml: (node, options, renderChildren, indentLevel) => {
          const htmlNode = node;
          const contentString = renderChildren(htmlNode.content, options, indentLevel);
          switch (htmlNode.htmlType) {
            case "article":
              return contentString;
            case "section":
              return `---

${contentString}

---
`;
            case "summary":
            case "time":
            case "aside":
            case "nav":
            case "figcaption":
            case "main":
            case "mark":
            case "header":
            case "footer":
            case "details":
            case "figure":
              return `<!-- <${htmlNode.htmlType}> -->
${contentString}
<!-- </${htmlNode.htmlType}> -->
`;
            default:
              return void 0;
          }
        }
        // 'meta' is handled by markdownMetaASTToString, not here.
        // 'custom' is handled by options.renderCustomNode in the main loop.
      };
      var INLINE_NODE_TYPES = /* @__PURE__ */ new Set(["text", "bold", "italic", "strikethrough", "link", "code"]);
      var BLOCK_NODE_TYPES = /* @__PURE__ */ new Set(["heading", "image", "list", "video", "table", "code", "blockquote", "semanticHtml"]);
      function markdownContentASTToStringRecursive(nodes, options, indentLevel = 0) {
        let markdownString = "";
        const renderChildren = (childNodes, childOptions = options, childIndent = indentLevel) => {
          if (typeof childNodes === "string")
            return childNodes;
          if (!childNodes || childNodes.length === 0)
            return "";
          return markdownContentASTToStringRecursive(childNodes, childOptions, childIndent);
        };
        nodes.forEach((node, index) => {
          if (node.type === "meta")
            return;
          const nodeRenderingOverride = options?.overrideNodeRenderer?.(node, options, indentLevel);
          if (nodeRenderingOverride !== void 0) {
            markdownString += nodeRenderingOverride;
            return;
          }
          let renderedNodeString;
          if (nodeRenderers[node.type]) {
            renderedNodeString = nodeRenderers[node.type]?.(node, options, renderChildren, indentLevel);
          } else if (node.type === "custom" && options?.renderCustomNode) {
            renderedNodeString = options.renderCustomNode(node, options, indentLevel);
          } else {
            console.warn(`Unhandled Markdown AST node type: ${node.type}`);
            renderedNodeString = "";
          }
          if (renderedNodeString === void 0 || renderedNodeString === null) {
            renderedNodeString = "";
          }
          const isCurrentNodeInline = INLINE_NODE_TYPES.has(node.type) && !(node.type === "code" && !node.inline);
          const isCurrentNodeBlock = BLOCK_NODE_TYPES.has(node.type) && !(node.type === "code" && node.inline);
          if (isCurrentNodeInline) {
            let addSpaceBeforeCurrentNode = false;
            if (markdownString.length > 0 && renderedNodeString.length > 0) {
              const lastCharOfPrevOutput = markdownString.slice(-1);
              const firstCharOfCurrentRenderedNode = renderedNodeString.charAt(0);
              const prevEndsWithSpace = /\s/.test(lastCharOfPrevOutput);
              const currentStartsWithSpace = /\s/.test(firstCharOfCurrentRenderedNode);
              const currentStartsWithClingingPunctuation = /^[.,!?;:)]/.test(firstCharOfCurrentRenderedNode);
              const prevEndsWithOpeningBracket = /[([]$/.test(lastCharOfPrevOutput);
              if (!prevEndsWithSpace && !currentStartsWithSpace && !currentStartsWithClingingPunctuation && !prevEndsWithOpeningBracket) {
                addSpaceBeforeCurrentNode = true;
              }
            }
            if (addSpaceBeforeCurrentNode) {
              markdownString += " ";
            }
            markdownString += renderedNodeString;
          } else if (isCurrentNodeBlock) {
            if (markdownString.length > 0 && !markdownString.endsWith("\n")) {
              markdownString += "\n";
            }
            if (renderedNodeString.length > 0 && markdownString.length > 0 && !markdownString.endsWith("\n\n") && !renderedNodeString.startsWith("\n")) {
              if (!markdownString.endsWith("\n"))
                markdownString += "\n";
            }
            markdownString += renderedNodeString;
            if (renderedNodeString.length > 0 && index < nodes.length - 1) {
              const nextNode = nodes[index + 1];
              const isNextNodeBlock = BLOCK_NODE_TYPES.has(nextNode.type) && !(nextNode.type === "code" && nextNode.inline);
              if (isNextNodeBlock || nextNode.type === "code" && !nextNode.inline) {
                if (!renderedNodeString.endsWith("\n\n")) {
                  if (!renderedNodeString.endsWith("\n")) {
                    markdownString += "\n\n";
                  } else {
                    markdownString += "\n";
                  }
                }
              } else if (!renderedNodeString.endsWith("\n")) {
                markdownString += "\n";
              }
            }
          } else {
            markdownString += renderedNodeString;
          }
        });
        return markdownString;
      }
      function markdownASTToString(nodes, options, indentLevel = 0) {
        if (!Array.isArray(nodes)) {
          console.warn("markdownASTToString received non-array input for nodes:", nodes);
          return "";
        }
        const metaOutput = markdownMetaASTToString(nodes, options);
        const contentOutput = markdownContentASTToStringRecursive(nodes, options, indentLevel);
        if (!metaOutput && !contentOutput) {
          return "";
        }
        if (contentOutput) {
          return (metaOutput + contentOutput).trimEnd();
        } else {
          return metaOutput;
        }
      }
    }
  });

  // node_modules/dom-to-semantic-markdown/dist/node/core/domUtils.js
  var require_domUtils = __commonJS({
    "node_modules/dom-to-semantic-markdown/dist/node/core/domUtils.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.findMainContent = findMainContent;
      exports.wrapMainContent = wrapMainContent;
      exports.calculateScore = calculateScore;
      var enableDebug = false;
      var debugMessage = (message) => {
        if (enableDebug) {
          console.log(message);
        }
      };
      function findMainContent(document2) {
        debugMessage("Entering findMainContent function");
        const mainElement = document2.querySelector("main") || document2.querySelector('[role="main"]');
        if (mainElement) {
          debugMessage("Existing <main> element found");
          return mainElement;
        }
        debugMessage("No <main> element found. Detecting main content.");
        if (!document2.body) {
          debugMessage("No body element found, returning document.documentElement");
          return document2.documentElement;
        }
        return detectMainContent(document2.body);
      }
      function wrapMainContent(mainContentElement, document2) {
        if (mainContentElement.tagName.toLowerCase() !== "main") {
          debugMessage("Wrapping main content in <main> element");
          const mainElement = document2.createElement("main");
          mainContentElement.before(mainElement);
          mainElement.appendChild(mainContentElement);
          mainElement.id = "detected-main-content";
          debugMessage("Main content wrapped successfully");
        } else {
          debugMessage("Main content already wrapped");
        }
      }
      function detectMainContent(rootElement) {
        const candidates = [];
        const minScore = 20;
        debugMessage(`Collecting candidates with minimum score: ${minScore}`);
        collectCandidates(rootElement, candidates, minScore);
        debugMessage(`Total candidates found: ${candidates.length}`);
        if (candidates.length === 0) {
          debugMessage("No suitable candidates found, returning root element");
          return rootElement;
        }
        candidates.sort((a, b) => calculateScore(b) - calculateScore(a));
        debugMessage("Candidates sorted by score");
        let bestIndependentCandidate = candidates[0];
        for (let i = 1; i < candidates.length; i++) {
          if (!candidates.some((otherCandidate, j) => j !== i && otherCandidate.contains(candidates[i]))) {
            if (calculateScore(candidates[i]) > calculateScore(bestIndependentCandidate)) {
              bestIndependentCandidate = candidates[i];
              debugMessage(`New best independent candidate found: ${elementToString(bestIndependentCandidate)}`);
            }
          }
        }
        debugMessage(`Final main content candidate: ${elementToString(bestIndependentCandidate)}`);
        return bestIndependentCandidate;
      }
      function elementToString(element) {
        if (!element) {
          return "No element";
        }
        return `${element.tagName}#${element.id || "no-id"}.${Array.from(element.classList).join(".")}`;
      }
      function collectCandidates(element, candidates, minScore) {
        const score = calculateScore(element);
        if (score >= minScore) {
          candidates.push(element);
          debugMessage(`Candidate found: ${elementToString(element)}, score: ${score}`);
        }
        Array.from(element.children).forEach((child) => {
          collectCandidates(child, candidates, minScore);
        });
      }
      function calculateScore(element) {
        let score = 0;
        let scoreLog = [];
        const highImpactAttributes = ["article", "content", "main-container", "main", "main-content"];
        highImpactAttributes.forEach((attr) => {
          if (element.classList.contains(attr) || element.id === attr) {
            score += 10;
            scoreLog.push(`High impact attribute found: [${attr}] [${[...element.classList.values()].join(",")}], score increased by 10`);
          }
        });
        const highImpactTags = ["article", "main", "section"];
        if (highImpactTags.includes(element.tagName.toLowerCase())) {
          score += 5;
          scoreLog.push(`High impact tag found: [${element.tagName}], score increased by 5`);
        }
        const paragraphCount = element.getElementsByTagName("p").length;
        const paragraphScore = Math.min(paragraphCount, 5);
        if (paragraphScore > 0) {
          score += paragraphScore;
          scoreLog.push(`Paragraph count: ${paragraphCount}, score increased by ${paragraphScore}`);
        }
        const textContentLength = element.textContent?.trim().length || 0;
        if (textContentLength > 200) {
          const textScore = Math.min(Math.floor(textContentLength / 200), 5);
          score += textScore;
          scoreLog.push(`Text content length: ${textContentLength}, score increased by ${textScore}`);
        }
        const linkDensity = calculateLinkDensity(element);
        if (linkDensity < 0.3) {
          score += 5;
          scoreLog.push(`Link density: ${linkDensity.toFixed(2)}, score increased by 5`);
        }
        if (element.hasAttribute("data-main") || element.hasAttribute("data-content")) {
          score += 10;
          scoreLog.push("Data attribute for main content found, score increased by 10");
        }
        if (element.getAttribute("role")?.includes("main")) {
          score += 10;
          scoreLog.push("Role attribute indicating main content found, score increased by 10");
        }
        if (scoreLog.length > 0) {
          debugMessage(`Scoring for ${elementToString(element)}:`);
          scoreLog.forEach((log) => debugMessage("  " + log));
          debugMessage(`  Final score: ${score}`);
        }
        return score;
      }
      function calculateLinkDensity(element) {
        const linkLength = Array.from(element.getElementsByTagName("a")).reduce((sum, link) => sum + (link.textContent?.length || 0), 0);
        const textLength = element.textContent?.length || 1;
        return linkLength / textLength;
      }
    }
  });

  // node_modules/dom-to-semantic-markdown/dist/node/core/urlUtils.js
  var require_urlUtils = __commonJS({
    "node_modules/dom-to-semantic-markdown/dist/node/core/urlUtils.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.refifyUrls = refifyUrls;
      var mediaSuffixes = [
        "jpeg",
        "jpg",
        "png",
        "gif",
        "bmp",
        "tiff",
        "tif",
        "svg",
        "webp",
        "ico",
        "avi",
        "mov",
        "mp4",
        "mkv",
        "flv",
        "wmv",
        "webm",
        "mpeg",
        "mpg",
        "mp3",
        "wav",
        "aac",
        "ogg",
        "flac",
        "m4a",
        "pdf",
        "doc",
        "docx",
        "ppt",
        "pptx",
        "xls",
        "xlsx",
        "txt",
        "css",
        "js",
        "xml",
        "json",
        "html",
        "htm"
      ];
      var addRefPrefix = (prefix, prefixesToRefs) => {
        if (!prefixesToRefs[prefix]) {
          prefixesToRefs[prefix] = "ref" + Object.values(prefixesToRefs).length;
        }
        return prefixesToRefs[prefix];
      };
      var processUrl = (url, prefixesToRefs) => {
        if (!url.startsWith("http")) {
          return url;
        } else {
          const mediaSuffix = url.split(".").slice(-1)[0];
          if (mediaSuffix && mediaSuffixes.includes(mediaSuffix)) {
            const parts = url.split("/");
            const prefix = parts.slice(0, -1).join("/");
            const refPrefix = addRefPrefix(prefix, prefixesToRefs);
            return `${refPrefix}://${parts.slice(-1).join("")}`;
          } else {
            if (url.split("/").length > 4) {
              return addRefPrefix(url, prefixesToRefs);
            } else {
              return url;
            }
          }
        }
      };
      function refifyUrls(markdownElement, prefixesToRefs = {}) {
        if (Array.isArray(markdownElement)) {
          markdownElement.forEach((element) => refifyUrls(element, prefixesToRefs));
        } else {
          switch (markdownElement.type) {
            case "link":
              markdownElement.href = processUrl(markdownElement.href, prefixesToRefs);
              refifyUrls(markdownElement.content, prefixesToRefs);
              break;
            case "image":
            case "video":
              markdownElement.src = processUrl(markdownElement.src, prefixesToRefs);
              break;
            case "list":
              markdownElement.items.forEach((item) => item.content.forEach((_) => refifyUrls(_, prefixesToRefs)));
              break;
            case "table":
              markdownElement.rows.forEach((row) => row.cells.forEach((cell) => typeof cell.content === "string" ? null : refifyUrls(cell.content, prefixesToRefs)));
              break;
            case "blockquote":
            case "semanticHtml":
              refifyUrls(markdownElement.content, prefixesToRefs);
              break;
          }
        }
        return prefixesToRefs;
      }
    }
  });

  // node_modules/dom-to-semantic-markdown/dist/node/core/astUtils.js
  var require_astUtils = __commonJS({
    "node_modules/dom-to-semantic-markdown/dist/node/core/astUtils.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isNot = exports.getMainContent = void 0;
      exports.findInAST = findInAST;
      exports.findAllInAST = findAllInAST;
      var getMainContent = (markdownStr) => {
        if (markdownStr.includes("<-main->")) {
          const regex = /(?<=<-main->)[\s\S]*?(?=<\/-main->)/;
          const match = markdownStr.match(regex);
          return match?.[0] ?? "";
        } else {
          const removeSectionsRegex = /(<-nav->[\s\S]*?<\/-nav->)|(<-footer->[\s\S]*?<\/-footer->)|(<-header->[\s\S]*?<\/-header->)|(<-aside->[\s\S]*?<\/-aside->)/g;
          return markdownStr.replace(removeSectionsRegex, "");
        }
      };
      exports.getMainContent = getMainContent;
      var isNot = (tPred) => (t) => !tPred(t);
      exports.isNot = isNot;
      var isString = (x) => typeof x === "string";
      function findInAST(markdownElement, checker) {
        const loopCheck = (z) => {
          for (const element of z) {
            const found = findInAST(element, checker);
            if (found) {
              return found;
            }
          }
          return void 0;
        };
        if (Array.isArray(markdownElement)) {
          return loopCheck(markdownElement);
        } else {
          if (checker(markdownElement)) {
            return markdownElement;
          }
          switch (markdownElement.type) {
            case "link":
              return loopCheck(markdownElement.content);
            case "list":
              return loopCheck(markdownElement.items.map((_) => _.content).flat());
            case "table":
              return loopCheck(markdownElement.rows.map((row) => row.cells.map((_) => _.content).filter((0, exports.isNot)(isString))).flat());
            case "blockquote":
            case "semanticHtml":
              return loopCheck(markdownElement.content);
          }
          return void 0;
        }
      }
      function findAllInAST(markdownElement, checker) {
        const loopCheck = (z) => {
          let out = [];
          for (const element of z) {
            const found = findAllInAST(element, checker);
            out = [...out, ...found];
          }
          return out;
        };
        if (Array.isArray(markdownElement)) {
          return loopCheck(markdownElement);
        } else {
          if (checker(markdownElement)) {
            return [markdownElement];
          }
          switch (markdownElement.type) {
            case "link":
              return loopCheck(markdownElement.content);
            case "list":
              return loopCheck(markdownElement.items.map((_) => _.content).flat());
            case "table":
              return loopCheck(markdownElement.rows.map((row) => row.cells.map((_) => _.content).filter((0, exports.isNot)(isString))).flat());
            case "blockquote":
            case "semanticHtml":
              return loopCheck(markdownElement.content);
          }
          return [];
        }
      }
    }
  });

  // node_modules/dom-to-semantic-markdown/dist/node/index.js
  var require_node = __commonJS({
    "node_modules/dom-to-semantic-markdown/dist/node/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.wrapMainContent = exports.refifyUrls = exports.findMainContent = exports.markdownASTToString = exports.htmlToMarkdownAST = void 0;
      exports.convertHtmlToMarkdown = convertHtmlToMarkdown2;
      exports.convertElementToMarkdown = convertElementToMarkdown;
      exports.findInMarkdownAST = findInMarkdownAST;
      exports.findAllInMarkdownAST = findAllInMarkdownAST;
      var htmlToMarkdownAST_1 = require_htmlToMarkdownAST();
      Object.defineProperty(exports, "htmlToMarkdownAST", { enumerable: true, get: function() {
        return htmlToMarkdownAST_1.htmlToMarkdownAST;
      } });
      var markdownASTToString_1 = require_markdownASTToString();
      Object.defineProperty(exports, "markdownASTToString", { enumerable: true, get: function() {
        return markdownASTToString_1.markdownASTToString;
      } });
      var domUtils_1 = require_domUtils();
      Object.defineProperty(exports, "findMainContent", { enumerable: true, get: function() {
        return domUtils_1.findMainContent;
      } });
      Object.defineProperty(exports, "wrapMainContent", { enumerable: true, get: function() {
        return domUtils_1.wrapMainContent;
      } });
      var urlUtils_1 = require_urlUtils();
      Object.defineProperty(exports, "refifyUrls", { enumerable: true, get: function() {
        return urlUtils_1.refifyUrls;
      } });
      var astUtils_1 = require_astUtils();
      function convertHtmlToMarkdown2(html, options) {
        const parser = options?.overrideDOMParser ?? (typeof DOMParser !== "undefined" ? new DOMParser() : null);
        if (!parser) {
          throw new Error("DOMParser is not available. Please provide an overrideDOMParser in options.");
        }
        const doc = parser.parseFromString(html, "text/html");
        let element;
        if (options?.extractMainContent) {
          element = (0, domUtils_1.findMainContent)(doc);
          if (options.includeMetaData && !!doc.querySelector("head")?.innerHTML && !element.querySelector("head")) {
            element = parser.parseFromString(`<html>${doc.head.outerHTML}${element.outerHTML}`, "text/html").documentElement;
          }
        } else {
          if (options?.includeMetaData && !!doc.querySelector("head")?.innerHTML) {
            element = doc.documentElement;
          } else {
            element = doc.body || doc.documentElement;
          }
        }
        return convertElementToMarkdown(element, options);
      }
      function convertElementToMarkdown(element, options) {
        let ast = (0, htmlToMarkdownAST_1.htmlToMarkdownAST)(element, options);
        if (options?.refifyUrls) {
          options.urlMap = (0, urlUtils_1.refifyUrls)(ast);
        }
        return (0, markdownASTToString_1.markdownASTToString)(ast, options);
      }
      function findInMarkdownAST(ast, predicate) {
        return (0, astUtils_1.findInAST)(ast, predicate);
      }
      function findAllInMarkdownAST(ast, predicate) {
        return (0, astUtils_1.findAllInAST)(ast, predicate);
      }
    }
  });

  // src/scraper.js
  var import_readability = __toESM(require_readability(), 1);
  var import_dom_to_semantic_markdown = __toESM(require_node(), 1);
  (function() {
    "use strict";
    const BACKEND_URL = document.currentScript?.getAttribute("data-backend-url") || "http://localhost:9002/api/content";
    const INTERVAL_MS = 5e3;
    function parsePageToMarkdown() {
      const url = window.location.href;
      const timestamp = (/* @__PURE__ */ new Date()).toISOString();
      try {
        const docClone = document.cloneNode(true);
        const scraperScripts = docClone.querySelectorAll("script[data-scraper]");
        scraperScripts.forEach((el) => el.remove());
        const reader = new import_readability.Readability(docClone, {
          charThreshold: 100,
          keepClasses: false
        });
        const article = reader.parse();
        if (article && article.content) {
          const markdown = (0, import_dom_to_semantic_markdown.convertHtmlToMarkdown)(article.content, {
            extractMainContent: true,
            includeMetaData: "extended"
          });
          return {
            title: article.title || document.title,
            content: markdown,
            excerpt: article.excerpt || void 0,
            byline: article.byline || void 0,
            url,
            timestamp,
            source: "script"
          };
        }
      } catch (e) {
        console.warn("[Scraper] Readability parsing failed, falling back:", e);
      }
      const fallbackMarkdown = (0, import_dom_to_semantic_markdown.convertHtmlToMarkdown)(document.body.innerHTML, {
        extractMainContent: true,
        includeMetaData: "extended"
      });
      return {
        title: document.title,
        content: fallbackMarkdown,
        url,
        timestamp,
        source: "script"
      };
    }
    async function sendToBackend(data) {
      try {
        const response = await fetch(BACKEND_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
        if (response.ok) {
          console.log("[Scraper] Content sent successfully");
        } else {
          console.warn("[Scraper] Backend responded with:", response.status);
        }
      } catch (e) {
        console.error("[Scraper] Failed to send data:", e);
      }
    }
    function scrapeAndSend() {
      const data = parsePageToMarkdown();
      sendToBackend(data);
    }
    function start() {
      console.log("[Scraper] Starting auto-scraper, interval:", INTERVAL_MS, "ms");
      scrapeAndSend();
      setInterval(scrapeAndSend, INTERVAL_MS);
    }
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", start);
    } else {
      start();
    }
  })();
})();

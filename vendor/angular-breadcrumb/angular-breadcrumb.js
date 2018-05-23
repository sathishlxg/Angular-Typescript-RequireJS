/*! angular-breadcrumb - v0.4.1-dev-2016-04-12
* http://ncuillery.github.io/angular-breadcrumb
* Copyright (c) 2016 Nicolas Cuillery; Licensed MIT */
!(function(a, b, c) {
  "use strict";
  function d(a, c) {
    return b.equals(a.length, c.length) ? a > c : a.length > c.length;
  }
  function e(a) {
    var b = a.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/);
    if (!b || 4 !== b.length) throw new Error("Invalid state ref '" + a + "'");
    return { state: b[1], paramExpr: b[3] || null };
  }
  function f(a, b, d, e) {
    var f = k[a];
    f !== c && f(), (f = b.$on(d, e)), (k[a] = f);
  }
  function g() {
    var a = {
      prefixStateName: null,
      template: "bootstrap3",
      templateUrl: null,
      templateLast: "default",
      templateLastUrl: null,
      includeAbstract: !1
    };
    (this.setOptions = function(c) {
      b.extend(a, c);
    }),
      (this.$get = [
        "$state",
        "$stateParams",
        "$rootScope",
        function(b, g, h) {
          var i = h;
          f("$Breadcrumb.$viewContentLoaded", h, "$viewContentLoaded", function(
            a
          ) {
            !a.targetScope.ncyBreadcrumbIgnore &&
              d(a.targetScope.$id, i.$id) &&
              (i = a.targetScope);
          });
          var j = function(a) {
              var b = a.parent || (/^(.+)\.[^.]+$/.exec(a.name) || [])[1],
                c = "object" == typeof b;
              return c ? b.name : b;
            },
            k = function(c, d) {
              for (
                var f, h, j = e(d), k = !1, l = !1, m = 0, n = c.length;
                n > m;
                m += 1
              )
                if (c[m].name === j.state) return;
              (f = b.get(j.state)),
                f.ncyBreadcrumb &&
                  (f.ncyBreadcrumb.force && (k = !0),
                  f.ncyBreadcrumb.skip && (l = !0)),
                (f["abstract"] && !a.includeAbstract && !k) ||
                  l ||
                  (j.paramExpr && (h = i.$eval(j.paramExpr)),
                  (f.ncyBreadcrumbLink = b.href(j.state, h || g || {})),
                  (f.ncyBreadcrumbStateRef = d),
                  c.unshift(f));
            },
            l = function(a) {
              var c = e(a),
                d = b.get(c.state);
              if (d.ncyBreadcrumb && d.ncyBreadcrumb.parent) {
                var f = "function" == typeof d.ncyBreadcrumb.parent,
                  g = f ? d.ncyBreadcrumb.parent(i) : d.ncyBreadcrumb.parent;
                if (g) return g;
              }
              return j(d);
            };
          return {
            getTemplate: function(b) {
              return a.templateUrl
                ? null
                : b[a.template]
                  ? b[a.template]
                  : a.template;
            },
            getTemplateUrl: function() {
              return a.templateUrl;
            },
            getTemplateLast: function(b) {
              return a.templateLastUrl
                ? null
                : b[a.templateLast]
                  ? b[a.templateLast]
                  : a.templateLast;
            },
            getTemplateLastUrl: function() {
              return a.templateLastUrl;
            },
            getStatesChain: function(c) {
              for (var d = [], e = b.$current.self.name; e; e = l(e))
                if ((k(d, e), c && d.length)) return d;
              return a.prefixStateName && k(d, a.prefixStateName), d;
            },
            getLastStep: function() {
              var a = this.getStatesChain(!0);
              return a.length ? a[0] : c;
            },
            $getLastViewScope: function() {
              return i;
            }
          };
        }
      ]);
  }
  function h(a, c, d) {
    var e = {
      bootstrap2:
        '<ul class="breadcrumb"><li ng-repeat="step in steps" ng-switch="$last || !!step.abstract" ng-class="{active: $last}"><a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a><span ng-switch-when="true">{{step.ncyBreadcrumbLabel}}</span><span class="divider" ng-hide="$last">/</span></li></ul>',
      bootstrap3:
        '<ol class="breadcrumb"><li ng-repeat="step in steps" ng-class="{active: $last}" ng-switch="$last || !!step.abstract"><a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a><span ng-switch-when="true">{{step.ncyBreadcrumbLabel}}</span></li></ol>'
    };
    return {
      restrict: "AE",
      replace: !0,
      scope: {},
      template: c.getTemplate(e),
      templateUrl: c.getTemplateUrl(),
      link: {
        post: function(e) {
          var g = [],
            h = function() {
              n(g), (g = []);
              var d = c.$getLastViewScope();
              (e.steps = c.getStatesChain()),
                b.forEach(e.steps, function(b) {
                  if (b.ncyBreadcrumb && b.ncyBreadcrumb.label) {
                    var c = a(b.ncyBreadcrumb.label);
                    (b.ncyBreadcrumbLabel = c(d)), m(g, c, d, b);
                  } else b.ncyBreadcrumbLabel = b.name;
                });
            };
          f(
            "BreadcrumbDirective.$viewContentLoaded",
            d,
            "$viewContentLoaded",
            function(a) {
              a.targetScope.ncyBreadcrumbIgnore || h();
            }
          ),
            h();
        }
      }
    };
  }
  function i(a, b, c) {
    var d = { default: "{{ncyBreadcrumbLabel}}" };
    return {
      restrict: "A",
      scope: {},
      template: b.getTemplateLast(d),
      templateUrl: b.getTemplateLastUrl(),
      compile: function(d, e) {
        var g = d.attr(e.$attr.ncyBreadcrumbLast);
        return (
          g && d.html(g),
          {
            post: function(d) {
              var e = [],
                g = function() {
                  n(e), (e = []);
                  var c = b.$getLastViewScope(),
                    f = b.getLastStep();
                  if (f)
                    if (
                      ((d.ncyBreadcrumbLink = f.ncyBreadcrumbLink),
                      f.ncyBreadcrumb && f.ncyBreadcrumb.label)
                    ) {
                      var g = a(f.ncyBreadcrumb.label);
                      (d.ncyBreadcrumbLabel = g(c)), m(e, g, c, d);
                    } else d.ncyBreadcrumbLabel = f.name;
                };
              f(
                "BreadcrumbLastDirective.$viewContentLoaded",
                c,
                "$viewContentLoaded",
                function(a) {
                  a.targetScope.ncyBreadcrumbIgnore || g();
                }
              ),
                g();
            }
          }
        );
      }
    };
  }
  function j(a, c, d) {
    return {
      restrict: "A",
      scope: {},
      template: "{{ncyBreadcrumbChain}}",
      compile: function(e, g) {
        var h = e.attr(g.$attr.ncyBreadcrumbText);
        h && e.html(h);
        var i = e.attr(g.$attr.ncyBreadcrumbTextSeparator) || " / ";
        return {
          post: function(e) {
            var g = [],
              h = function(a, c, d) {
                b.forEach(l(c), function(b) {
                  var c = d.$watch(b, function(a, b) {
                    a !== b && j();
                  });
                  a.push(c);
                });
              },
              j = function() {
                n(g), (g = []);
                var d = c.$getLastViewScope(),
                  f = c.getStatesChain(),
                  j = [];
                b.forEach(f, function(b) {
                  if (b.ncyBreadcrumb && b.ncyBreadcrumb.label) {
                    var c = a(b.ncyBreadcrumb.label);
                    j.push(c(d)), h(g, c, d);
                  } else j.push(b.name);
                }),
                  (e.ncyBreadcrumbChain = j.join(i));
              };
            f(
              "BreadcrumbTextDirective.$viewContentLoaded",
              d,
              "$viewContentLoaded",
              function(a) {
                a.targetScope.ncyBreadcrumbIgnore || j();
              }
            ),
              j();
          }
        };
      }
    };
  }
  var k = {},
    l = function(a) {
      if (a.expressions) return a.expressions;
      var c = [];
      return (
        b.forEach(a.parts, function(a) {
          b.isFunction(a) && c.push(a.exp);
        }),
        c
      );
    },
    m = function(a, c, d, e) {
      b.forEach(l(c), function(b) {
        var f = d.$watch(b, function() {
          e.ncyBreadcrumbLabel = c(d);
        });
        a.push(f);
      });
    },
    n = function(a) {
      b.forEach(a, function(a) {
        a();
      });
    };
  (h.$inject = ["$interpolate", "$breadcrumb", "$rootScope"]),
    (i.$inject = ["$interpolate", "$breadcrumb", "$rootScope"]),
    (j.$inject = ["$interpolate", "$breadcrumb", "$rootScope"]),
    b
      .module("ncy-angular-breadcrumb", ["ui.router.state"])
      .provider("$breadcrumb", g)
      .directive("ncyBreadcrumb", h)
      .directive("ncyBreadcrumbLast", i)
      .directive("ncyBreadcrumbText", j);
})(window, window.angular);

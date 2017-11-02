(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Vue.component('data-list', {
    props: ['resdatas'],
    template: '\n        <ul>\n            <li v-for="(obj,idx) in resdatas" :key="idx">\n                <h2>{{obj.name}}</h2>\n                <h3>\u76F8\u4F3C\u5EA6 {{obj.accurate}}%</h3>\n            </li>\n        </ul>\n    '
});

new Vue({
    el: '#app',
    data: {
        imageData: 'https://picsum.photos/362',
        targetVal: null,
        loadingStatus: false,
        resData: [{
            id: null,
            name: "無樣本",
            accurate: "0"
        }]
    },
    methods: {
        fileChange: function fileChange(e) {
            var _this = this;

            var input = e.target;
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    _this.imageData = e.target.result;
                    _this.submitDataImg();
                };
                reader.readAsDataURL(input.files[0]);
            }
        },
        submitDataImg: function submitDataImg() {
            var formData = new FormData();
            formData.append("img", this.imageData);
            this.loadingStatus = true;
            axios.post('/ai_api', formData).then(this.aiResFn);
        },
        aiResFn: function aiResFn(res) {
            var _this2 = this;

            this.resData.length = 0;
            res.data.map(function (obj) {
                _this2.resData.push({
                    name: obj.name,
                    accurate: (Number(obj.accurate) * 100).toFixed(2)
                });
            });
            this.loadingStatus = false;
        }
    }
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9lczYvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFJLFNBQUosQ0FBYyxXQUFkLEVBQTJCO0FBQ3ZCLFdBQU8sQ0FBQyxVQUFELENBRGdCO0FBRXZCO0FBRnVCLENBQTNCOztBQVlBLElBQUksR0FBSixDQUFRO0FBQ0osUUFBSSxNQURBO0FBRUosVUFBSztBQUNELG1CQUFXLDJCQURWO0FBRUQsbUJBQVcsSUFGVjtBQUdELHVCQUFlLEtBSGQ7QUFJRCxpQkFBUyxDQUNMO0FBQ0ksZ0JBQUksSUFEUjtBQUVJLGtCQUFNLEtBRlY7QUFHSSxzQkFBVTtBQUhkLFNBREs7QUFKUixLQUZEO0FBY0osYUFBUztBQUNMLGtCQURLLHNCQUNNLENBRE4sRUFDUztBQUFBOztBQUNWLGdCQUFJLFFBQVEsRUFBRSxNQUFkO0FBQ0EsZ0JBQUksTUFBTSxLQUFOLElBQWUsTUFBTSxLQUFOLENBQVksQ0FBWixDQUFuQixFQUFtQztBQUMvQixvQkFBSSxTQUFTLElBQUksVUFBSixFQUFiO0FBQ0EsdUJBQU8sTUFBUCxHQUFnQixVQUFDLENBQUQsRUFBTztBQUNuQiwwQkFBSyxTQUFMLEdBQWlCLEVBQUUsTUFBRixDQUFTLE1BQTFCO0FBQ0EsMEJBQUssYUFBTDtBQUNILGlCQUhEO0FBSUEsdUJBQU8sYUFBUCxDQUFxQixNQUFNLEtBQU4sQ0FBWSxDQUFaLENBQXJCO0FBQ0g7QUFDSixTQVhJO0FBWUwscUJBWkssMkJBWVc7QUFDWixnQkFBSSxXQUFXLElBQUksUUFBSixFQUFmO0FBQ0EscUJBQVMsTUFBVCxDQUFnQixLQUFoQixFQUF1QixLQUFLLFNBQTVCO0FBQ0EsaUJBQUssYUFBTCxHQUFxQixJQUFyQjtBQUNBLGtCQUFNLElBQU4sQ0FBVyxTQUFYLEVBQXNCLFFBQXRCLEVBQWdDLElBQWhDLENBQXFDLEtBQUssT0FBMUM7QUFDSCxTQWpCSTtBQWtCTCxlQWxCSyxtQkFrQkcsR0FsQkgsRUFrQlE7QUFBQTs7QUFDVCxpQkFBSyxPQUFMLENBQWEsTUFBYixHQUFzQixDQUF0QjtBQUNBLGdCQUFJLElBQUosQ0FBUyxHQUFULENBQWEsZUFBTztBQUNoQix1QkFBSyxPQUFMLENBQWEsSUFBYixDQUFrQjtBQUNkLDBCQUFNLElBQUksSUFESTtBQUVkLDhCQUFVLENBQUMsT0FBTyxJQUFJLFFBQVgsSUFBdUIsR0FBeEIsRUFBNkIsT0FBN0IsQ0FBcUMsQ0FBckM7QUFGSSxpQkFBbEI7QUFJSCxhQUxEO0FBTUEsaUJBQUssYUFBTCxHQUFxQixLQUFyQjtBQUNIO0FBM0JJO0FBZEwsQ0FBUiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJWdWUuY29tcG9uZW50KCdkYXRhLWxpc3QnLCB7XG4gICAgcHJvcHM6IFsncmVzZGF0YXMnXSxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8dWw+XG4gICAgICAgICAgICA8bGkgdi1mb3I9XCIob2JqLGlkeCkgaW4gcmVzZGF0YXNcIiA6a2V5PVwiaWR4XCI+XG4gICAgICAgICAgICAgICAgPGgyPnt7b2JqLm5hbWV9fTwvaDI+XG4gICAgICAgICAgICAgICAgPGgzPuebuOS8vOW6piB7e29iai5hY2N1cmF0ZX19JTwvaDM+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICA8L3VsPlxuICAgIGBcbn0pXG5cbm5ldyBWdWUoe1xuICAgIGVsOiAnI2FwcCcsXG4gICAgZGF0YTp7XG4gICAgICAgIGltYWdlRGF0YTogJ2h0dHBzOi8vcGljc3VtLnBob3Rvcy8zNjInLFxuICAgICAgICB0YXJnZXRWYWw6IG51bGwsXG4gICAgICAgIGxvYWRpbmdTdGF0dXM6IGZhbHNlLFxuICAgICAgICByZXNEYXRhOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IG51bGwsXG4gICAgICAgICAgICAgICAgbmFtZTogXCLnhKHmqKPmnKxcIixcbiAgICAgICAgICAgICAgICBhY2N1cmF0ZTogXCIwXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgZmlsZUNoYW5nZShlKSB7XG4gICAgICAgICAgICBsZXQgaW5wdXQgPSBlLnRhcmdldDtcbiAgICAgICAgICAgIGlmIChpbnB1dC5maWxlcyAmJiBpbnB1dC5maWxlc1swXSkge1xuICAgICAgICAgICAgICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICAgICAgICAgIHJlYWRlci5vbmxvYWQgPSAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmltYWdlRGF0YSA9IGUudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWJtaXREYXRhSW1nKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGlucHV0LmZpbGVzWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc3VibWl0RGF0YUltZygpIHtcbiAgICAgICAgICAgIGxldCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKFwiaW1nXCIsIHRoaXMuaW1hZ2VEYXRhKTtcbiAgICAgICAgICAgIHRoaXMubG9hZGluZ1N0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICBheGlvcy5wb3N0KCcvYWlfYXBpJywgZm9ybURhdGEpLnRoZW4odGhpcy5haVJlc0ZuKVxuICAgICAgICB9LFxuICAgICAgICBhaVJlc0ZuKHJlcykge1xuICAgICAgICAgICAgdGhpcy5yZXNEYXRhLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICByZXMuZGF0YS5tYXAob2JqID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc0RhdGEucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG9iai5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBhY2N1cmF0ZTogKE51bWJlcihvYmouYWNjdXJhdGUpICogMTAwKS50b0ZpeGVkKDIpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmdTdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn0pIl19

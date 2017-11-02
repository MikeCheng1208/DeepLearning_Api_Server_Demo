(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Vue.component('data-list', {
    props: ['resdatas'],
    template: '\n        <ul>\n            <li v-for="(obj,idx) in resdatas" :key="idx">\n                <h2>{{obj.name}} ({{obj.zh_name}})</h2>\n                <h3>\u76F8\u4F3C\u5EA6 {{obj.accurate}}%</h3>\n            </li>\n        </ul>\n    '
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
            zh_name: "",
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
                    zh_name: obj.zh_name,
                    accurate: (Number(obj.accurate) * 100).toFixed(2)
                });
            });
            this.loadingStatus = false;
        }
    }
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9lczYvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFJLFNBQUosQ0FBYyxXQUFkLEVBQTJCO0FBQ3ZCLFdBQU8sQ0FBQyxVQUFELENBRGdCO0FBRXZCO0FBRnVCLENBQTNCOztBQVlBLElBQUksR0FBSixDQUFRO0FBQ0osUUFBSSxNQURBO0FBRUosVUFBSztBQUNELG1CQUFXLDJCQURWO0FBRUQsbUJBQVcsSUFGVjtBQUdELHVCQUFlLEtBSGQ7QUFJRCxpQkFBUyxDQUNMO0FBQ0ksZ0JBQUksSUFEUjtBQUVJLGtCQUFNLEtBRlY7QUFHSSxxQkFBUyxFQUhiO0FBSUksc0JBQVU7QUFKZCxTQURLO0FBSlIsS0FGRDtBQWVKLGFBQVM7QUFDTCxrQkFESyxzQkFDTSxDQUROLEVBQ1M7QUFBQTs7QUFDVixnQkFBSSxRQUFRLEVBQUUsTUFBZDtBQUNBLGdCQUFJLE1BQU0sS0FBTixJQUFlLE1BQU0sS0FBTixDQUFZLENBQVosQ0FBbkIsRUFBbUM7QUFDL0Isb0JBQUksU0FBUyxJQUFJLFVBQUosRUFBYjtBQUNBLHVCQUFPLE1BQVAsR0FBZ0IsVUFBQyxDQUFELEVBQU87QUFDbkIsMEJBQUssU0FBTCxHQUFpQixFQUFFLE1BQUYsQ0FBUyxNQUExQjtBQUNBLDBCQUFLLGFBQUw7QUFDSCxpQkFIRDtBQUlBLHVCQUFPLGFBQVAsQ0FBcUIsTUFBTSxLQUFOLENBQVksQ0FBWixDQUFyQjtBQUNIO0FBQ0osU0FYSTtBQVlMLHFCQVpLLDJCQVlXO0FBQ1osZ0JBQUksV0FBVyxJQUFJLFFBQUosRUFBZjtBQUNBLHFCQUFTLE1BQVQsQ0FBZ0IsS0FBaEIsRUFBdUIsS0FBSyxTQUE1QjtBQUNBLGlCQUFLLGFBQUwsR0FBcUIsSUFBckI7QUFDQSxrQkFBTSxJQUFOLENBQVcsU0FBWCxFQUFzQixRQUF0QixFQUFnQyxJQUFoQyxDQUFxQyxLQUFLLE9BQTFDO0FBQ0gsU0FqQkk7QUFrQkwsZUFsQkssbUJBa0JHLEdBbEJILEVBa0JRO0FBQUE7O0FBQ1QsaUJBQUssT0FBTCxDQUFhLE1BQWIsR0FBc0IsQ0FBdEI7QUFDQSxnQkFBSSxJQUFKLENBQVMsR0FBVCxDQUFhLGVBQU87QUFDaEIsdUJBQUssT0FBTCxDQUFhLElBQWIsQ0FBa0I7QUFDZCwwQkFBTSxJQUFJLElBREk7QUFFZCw2QkFBUyxJQUFJLE9BRkM7QUFHZCw4QkFBVSxDQUFDLE9BQU8sSUFBSSxRQUFYLElBQXVCLEdBQXhCLEVBQTZCLE9BQTdCLENBQXFDLENBQXJDO0FBSEksaUJBQWxCO0FBS0gsYUFORDtBQU9BLGlCQUFLLGFBQUwsR0FBcUIsS0FBckI7QUFDSDtBQTVCSTtBQWZMLENBQVIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiVnVlLmNvbXBvbmVudCgnZGF0YS1saXN0Jywge1xuICAgIHByb3BzOiBbJ3Jlc2RhdGFzJ10sXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPHVsPlxuICAgICAgICAgICAgPGxpIHYtZm9yPVwiKG9iaixpZHgpIGluIHJlc2RhdGFzXCIgOmtleT1cImlkeFwiPlxuICAgICAgICAgICAgICAgIDxoMj57e29iai5uYW1lfX0gKHt7b2JqLnpoX25hbWV9fSk8L2gyPlxuICAgICAgICAgICAgICAgIDxoMz7nm7jkvLzluqYge3tvYmouYWNjdXJhdGV9fSU8L2gzPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgPC91bD5cbiAgICBgXG59KVxuXG5uZXcgVnVlKHtcbiAgICBlbDogJyNhcHAnLFxuICAgIGRhdGE6e1xuICAgICAgICBpbWFnZURhdGE6ICdodHRwczovL3BpY3N1bS5waG90b3MvMzYyJyxcbiAgICAgICAgdGFyZ2V0VmFsOiBudWxsLFxuICAgICAgICBsb2FkaW5nU3RhdHVzOiBmYWxzZSxcbiAgICAgICAgcmVzRGF0YTogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBudWxsLFxuICAgICAgICAgICAgICAgIG5hbWU6IFwi54Sh5qij5pysXCIsXG4gICAgICAgICAgICAgICAgemhfbmFtZTogXCJcIixcbiAgICAgICAgICAgICAgICBhY2N1cmF0ZTogXCIwXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgZmlsZUNoYW5nZShlKSB7XG4gICAgICAgICAgICBsZXQgaW5wdXQgPSBlLnRhcmdldDtcbiAgICAgICAgICAgIGlmIChpbnB1dC5maWxlcyAmJiBpbnB1dC5maWxlc1swXSkge1xuICAgICAgICAgICAgICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICAgICAgICAgIHJlYWRlci5vbmxvYWQgPSAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmltYWdlRGF0YSA9IGUudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWJtaXREYXRhSW1nKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGlucHV0LmZpbGVzWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc3VibWl0RGF0YUltZygpIHtcbiAgICAgICAgICAgIGxldCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKFwiaW1nXCIsIHRoaXMuaW1hZ2VEYXRhKTtcbiAgICAgICAgICAgIHRoaXMubG9hZGluZ1N0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICBheGlvcy5wb3N0KCcvYWlfYXBpJywgZm9ybURhdGEpLnRoZW4odGhpcy5haVJlc0ZuKVxuICAgICAgICB9LFxuICAgICAgICBhaVJlc0ZuKHJlcykge1xuICAgICAgICAgICAgdGhpcy5yZXNEYXRhLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICByZXMuZGF0YS5tYXAob2JqID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc0RhdGEucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG9iai5uYW1lLFxuICAgICAgICAgICAgICAgICAgICB6aF9uYW1lOiBvYmouemhfbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgYWNjdXJhdGU6IChOdW1iZXIob2JqLmFjY3VyYXRlKSAqIDEwMCkudG9GaXhlZCgyKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nU3RhdHVzID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59KSJdfQ==

// 위젯 상태 관리자
window.WidgetManager = (function() {
    var currentOpenWidget = null; // 현재 열린 위젯
    var widgets = {}; // 등록된 위젯들

    return {
        // 위젯 등록
        registerWidget: function(widgetName, toggleCallback) {
            widgets[widgetName] = {
                name: widgetName,
                isOpen: false,
                toggle: toggleCallback
            };
        },

        // 위젯 열기 (다른 위젯들은 자동으로 닫힘)
        openWidget: function(widgetName) {
            // 현재 열린 위젯이 있고, 다른 위젯이면 닫기
            if (currentOpenWidget && currentOpenWidget !== widgetName) {
                this.closeWidget(currentOpenWidget);
            }

            // 요청된 위젯 열기
            if (widgets[widgetName]) {
                widgets[widgetName].isOpen = true;
                currentOpenWidget = widgetName;
                widgets[widgetName].toggle(true); // true = 열기
            }
        },

        // 위젯 닫기
        closeWidget: function(widgetName) {
            if (widgets[widgetName] && widgets[widgetName].isOpen) {
                widgets[widgetName].isOpen = false;
                widgets[widgetName].toggle(false); // false = 닫기
                
                if (currentOpenWidget === widgetName) {
                    currentOpenWidget = null;
                }
            }
        },

        // 위젯 토글 (열림/닫힘 전환)
        toggleWidget: function(widgetName) {
            if (widgets[widgetName]) {
                if (widgets[widgetName].isOpen) {
                    this.closeWidget(widgetName);
                } else {
                    this.openWidget(widgetName);
                }
            }
        },

        // 현재 상태 조회
        getCurrentWidget: function() {
            return currentOpenWidget;
        },

        isWidgetOpen: function(widgetName) {
            return widgets[widgetName] ? widgets[widgetName].isOpen : false;
        },

        // 모든 위젯 닫기
        closeAllWidgets: function() {
            for (var widgetName in widgets) {
                this.closeWidget(widgetName);
            }
        }
    };
})();

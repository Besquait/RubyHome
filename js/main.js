var $tabs = function (target) {
  var
    _elemTabs = (typeof target === 'string' ? document.querySelector(target) : target),
    _eventTabsShow,
    _showTab = function (tabsLinkTarget) {
      var tabsPaneTarget, tabsLinkActive, tabsPaneShow;
      tabsPaneTarget = document.querySelector(tabsLinkTarget.getAttribute('href'));
      tabsLinkActive = tabsLinkTarget.parentElement.querySelector('.tabs__link-active');
      tabsPaneShow = tabsPaneTarget.parentElement.querySelector('.tabs__pane-show');
      // если следующая вкладка равна активной, то завершаем работу
      if (tabsLinkTarget === tabsLinkActive) {
        return;
      }
      // удаляем классы у текущих активных элементов
      if (tabsLinkActive !== null) {
        tabsLinkActive.classList.remove('tabs__link-active');
      }
      if (tabsPaneShow !== null) {
        tabsPaneShow.classList.remove('tabs__pane-show');
      }
      // добавляем классы к элементам (в завимости от выбранной вкладки)
      tabsLinkTarget.classList.add('tabs__link-active');
      tabsPaneTarget.classList.add('tabs__pane-show');
      document.dispatchEvent(_eventTabsShow);
    },
    _switchTabTo = function (tabsLinkIndex) {
      var tabsLinks = _elemTabs.querySelectorAll('.tabs__link');
      if (tabsLinks.length > 0) {
        if (tabsLinkIndex > tabsLinks.length) {
          tabsLinkIndex = tabsLinks.length;
        } else if (tabsLinkIndex < 1) {
          tabsLinkIndex = 1;
        }
        _showTab(tabsLinks[tabsLinkIndex - 1]);
      }
    };
  
  _eventTabsShow = new CustomEvent('tab.show', { detail: _elemTabs });
  
  _elemTabs.addEventListener('click', function (e) {
    var tabsLinkTarget = e.target;
    // завершаем выполнение функции, если кликнули не по ссылке
    if (!tabsLinkTarget.classList.contains('tabs__link')) {
      return;
    }
    // отменяем стандартное действие
    e.preventDefault();
    _showTab(tabsLinkTarget);
  });
  
  return {
    showTab: function (target) {
      _showTab(target);
    },
    switchTabTo: function (index) {
      _switchTabTo(index);
    }
  }
  
  };
  
  $tabs('.tabs');
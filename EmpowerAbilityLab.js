//Template Function that can be used to run JavaScript on the page
//Note: This can be changed to whatever JavaScript formatting you would like
let tabBtns = [];
let tabPanels = {};
let documenTitles = ["Home", "Service", "Schedule a Service"];

tabBtns = Array.from(document.querySelectorAll("#v-pills-tab a"));

for (let i = 0; i < tabBtns.length; i++) {
  tabBtns[i].addEventListener("click", selectTab, false);
}

let x = document.querySelectorAll(".tab-pane");
for (let i = 0; i < x.length; i++) {
  tabPanels[x[i].id] = x[i];
}


function applyTab(id) {
  for (var i = 0; i < tabBtns.length; i++) {
    if (tabBtns[i].id == id) {
      let tabPanelID = tabBtns[i].id.replace("-tab", "-panel");
      tabPanels[tabPanelID].classList.add("show");
      tabPanels[tabPanelID].classList.add("active");
      tabBtns[i].setAttribute("aria-selected", "true");
      tabBtns[i].parentNode.classList.add("selectedTab");
      tabBtns[i].classList.add("active");
      document.title = documenTitles[i];
    } else {
      let tabPanelID = tabBtns[i].id.replace("-tab", "-panel");
      tabPanels[tabPanelID].classList.remove("show");
      tabPanels[tabPanelID].classList.remove("active");
      tabBtns[i].setAttribute("aria-selected", "false");
      tabBtns[i].parentNode.classList.remove("selectedTab");
      tabBtns[i].classList.remove("active");
    }
  }
}

function selectTab(e) {
  applyTab(e.target.id);
}

function historyTabs(selector) {
  var elements = document.querySelectorAll(selector);
  window.addEventListener("popstate", function (event) {
    if (event.state) {
      var targetTab = Array.from(elements).find(function (element) {
        return element.getAttribute("href") === event.state.url;
      });

      if (targetTab) {
        // Manually implement tab showing logic (e.g., add 'active' class).
        showTab(targetTab);
      }
    }
  });
  Array.from(elements).forEach(function (element) {
    element.addEventListener("click", function (event) {
      event.preventDefault();
      showTab(element);
      var stateObject = { url: element.getAttribute("href") };
      if (!window.location.hash || stateObject.url !== window.location.hash) {
        var newUrl = window.location.pathname + stateObject.url;
        window.history.pushState(stateObject, document.title, newUrl);
      } else {
        window.history.replaceState(
          stateObject,
          document.title,
          window.location.href
        );
      }
    });

    if (!window.location.hash && element.classList.contains("active")) {
      // Shows the first element if there are no query parameters.
      var stateObject = { url: element.getAttribute("href") };
      if (!window.location.hash || stateObject.url !== window.location.hash) {
        var newUrl = window.location.pathname + stateObject.url;
        window.history.pushState(stateObject, document.title, newUrl);
      } else {
        window.history.replaceState(
          stateObject,
          document.title,
          window.location.href
        );
      }
      showTab(element);
    } else if (element.getAttribute("href") === window.location.hash) {
      // Manually implement tab showing logic.
      showTab(element);
    }
  });

  function showTab(tabElement) {
    applyTab(tabElement.id);
  }
}

// Usage
historyTabs('a[data-toggle="pill"]');

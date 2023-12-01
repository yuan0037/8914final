//Template Function that can be used to run JavaScript on the page
//Note: This can be changed to whatever JavaScript formatting you would like
let tabBtns = [];
let tabPanels = {};

tabBtns = Array.from(document.querySelectorAll("#v-pills-tab a"));


for (let i =0 ; i < tabBtns.length; i++) {
	tabBtns[i].addEventListener("click", selectTab, false);
	tabBtns[i].addEventListener("keyup", focusTab, false);
}

// If left (37) or right (39) arrow keys are pressed, change the focus on the tab buttons, but do not activate.
function focusTab (e) {
	if (e.keyCode == 39) {
		tabBtns[(tabBtns.indexOf(e.target) + 1) % 3].focus();
	} else if (e.keyCode == 37) {
		tabBtns[((tabBtns.indexOf(e.target) - 1) < 0 ? 2 : tabBtns.indexOf(e.target) - 1)].focus();
	}
} // End of focusTab


function selectTab(e) {

	for (var i = 0; i < tabBtns.length; i++) {
		if (tabBtns[i].id == e.target.id) {
			tabBtns[i].setAttribute("aria-selected", "true");
			tabBtns[i].parentNode.classList.add("selectedTab");			
		} else {
			tabBtns[i].setAttribute("aria-selected", "false");			
			tabBtns[i].parentNode.classList.remove("selectedTab");
            tabBtns[i].classList.remove("active");
		}
	}
} // End of selectTab
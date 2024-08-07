function checkBranch() {
    chrome.storage.sync.get(({ branchesList: [] }), (data) => {  
        const targetBranch = document.querySelector("span.commit-ref span.css-truncate-target").innerText;
        if (data.branchesList.includes(targetBranch)) {
            const squashButton = document.querySelector("button.btn-group-squash");
            const autoSquashSelectItem = document.querySelector("button.select-menu-item[value='squash']")
            const squashSelectItem = document.querySelector("button.js-merge-box-button-squash");

            if (squashButton) squashButton.disabled = true;
            if (autoSquashSelectItem) autoSquashSelectItem.disabled = true;
            if (squashSelectItem) squashSelectItem.disabled = true;
        }    
    });
}


window.onload = function() {
    if (window.location.href.includes("github.com") && window.location.href.includes("/pull/")) {
        // Needs to be an interval instead of just set timeouts until disable because
        //   a rerender on the page can flip it back.
        setInterval(checkBranch, 500);
    }
}

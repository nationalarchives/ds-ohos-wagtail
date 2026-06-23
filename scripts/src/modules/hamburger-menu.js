/* eslint-disable max-lines-per-function, func-names, max-statements, no-param-reassign, no-magic-numbers, no-inline-comments, no-unused-expressions, no-ternary, no-plusplus, id-length */
import debounce from "./debounce.js";

export default function () {
    const $headerMenu = document.querySelector('[data-id="site-menu"]');
    const $headerMenuList = document.querySelector(
        '[data-id="site-menu-list"]',
    );
    const $headerElementsToHide = document.querySelectorAll(
        '[data-isSearch="false"]',
    );
    const $searchListItem = document.querySelector("#js-site-menu-search");
    const $globalSearchButton = document.querySelector("#gs-show-hide");
    const $globalSearch = document.querySelector("#gs-component");
    if (!$headerMenu || !$headerMenuList || !$searchListItem) {
        return;
    }

    const isGlobalSearchFocused = function () {
        /* Global search doesn't exist on Etna search pages (/search/), so we must check if it exists before we check if it's focused. */
        if (!$globalSearchButton) {
            return false;
        }

        // This has to be calculated outside of placeSearchAtIndex(), as I believe the debounce delay was causing an document.activeElement to be incorrect
        return $globalSearchButton.id === document.activeElement.id;
    };

    const placeSearchAtIndex = function (newIndex, isFocused) {
        if (newIndex === "end") {
            newIndex = $headerMenuList.childNodes.length - 1;
        }

        // Only move the element if it's in the wrong place
        if ($headerMenuList.childNodes[newIndex].id !== $searchListItem.id) {
            $headerMenuList.insertBefore(
                $searchListItem,
                $headerMenuList.childNodes[newIndex],
            ); //IE11 compatible prepend

            isFocused ? $globalSearchButton.focus() : null;
        }
    };

    const $showHideListItem = document.createElement("li");
    $showHideListItem.classList.add("header__nav-list-item");
    $showHideListItem.setAttribute("data-id", "menu-show-hide-button");

    const $showHideButton = document.createElement("button");
    $showHideButton.innerHTML =
        '<span class="sr-only">Show or hide navigation menu</span>';
    $showHideButton.classList.add("header__show-hide-button");
    $showHideButton.setAttribute("aria-expanded", false);

    $showHideListItem.appendChild($showHideButton);

    $searchListItem.style.display = "inline-block";
    $searchListItem.style.verticalAlign = "bottom";

    $headerMenuList.insertBefore(
        $showHideListItem,
        $headerMenuList.childNodes[0],
    ); //IE11 compatible prepend

    if (window.innerWidth >= 768) {
        $showHideButton.hidden = "true";
    } else {
        // Move search button to the 2nd DOM element, so that the CSS can work as intended.
        placeSearchAtIndex(1, isGlobalSearchFocused());
    }

    let ariaControls = "";
    for (let i = 0; i < $headerElementsToHide.length; i++) {
        const id = `menu-item-${i}`;
        $headerElementsToHide[i].id = id;
        ariaControls += ` ${id}`;
        if (window.innerWidth < 768) {
            $headerElementsToHide[i].hidden = "true";
        }
    }

    $showHideButton.setAttribute("aria-controls", ariaControls);

    $showHideButton.addEventListener("click", () => {
        const ariaExpandedBoolean =
            $showHideButton.getAttribute("aria-expanded") === "true";
        $showHideButton.setAttribute("aria-expanded", !ariaExpandedBoolean);

        for (let i = 0; i < $headerElementsToHide.length; i++) {
            $headerElementsToHide[i].hidden = !$headerElementsToHide[i].hidden;
        }

        // Hide global search component when the navigation menu is expanded
        if ($globalSearch && $globalSearchButton) {
            $globalSearch.hidden = true;
            $globalSearchButton.setAttribute("aria-expanded", "false");
        }
    });

    const setMenuItemsHidden = function (hidden) {
        for (let i = 0; i < $headerElementsToHide.length; i++) {
            $headerElementsToHide[i].hidden = hidden;
        }
    };

    window.addEventListener(
        "resize",
        debounce(() => {
            const ariaExpanded = $showHideButton.getAttribute("aria-expanded");

            if (window.innerWidth < 768) {
                $showHideButton.hidden = false;

                if (ariaExpanded === "false") {
                    setMenuItemsHidden(true);
                } else {
                    setMenuItemsHidden(false);
                }

                placeSearchAtIndex(1, isGlobalSearchFocused());
            } else {
                // Hide button on desktop, but keep menu items visible
                $showHideButton.hidden = true;
                setMenuItemsHidden(false);
                placeSearchAtIndex("end", isGlobalSearchFocused());
            }
        }, 200),
    );
}

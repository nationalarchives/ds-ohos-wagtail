/* global $buttonHtml $noOfFilters */

import debounce from "../debounce.js";

export default function () {
    const $searchGrid = document.querySelector(
        'div[data-id="catalogue-search-grid"]',
    );
    const $searchFilterContainer = document.querySelector(
        'div[data-id="catalogue-search-sidebar"]',
    );
    const $main = document.querySelector("main");

    if (!$searchFilterContainer || !$searchGrid || !$main) {
        return;
    }

    //need case where validation warning is invoked

    const $showHideButton = document.createElement("button");
    //check the query string to populate the number of selected filters
    if (window.location.href.indexOf("filter_keyword") != -1) {
        $showHideButton.innerHTML = $buttonHtml;
    } else {
        // no filters selected
        $showHideButton.innerHTML = "Filters";
    }
    $showHideButton.classList.add("search-results__filter-button");
    $showHideButton.setAttribute("aria-expanded", false);
    $showHideButton.setAttribute("aria-controls", "searchFilterContainer");
    $showHideButton.setAttribute("aria-label", "Show or hide filters");
    $showHideButton.setAttribute("data-link-type", "Link");
    $showHideButton.setAttribute("data-link", "Show search filters");
    $showHideButton.hidden = true;
    $main.insertBefore($showHideButton, $searchGrid);

    $searchFilterContainer.id = "searchFilterContainer";

    $showHideButton.addEventListener("click", (e) => {
        e.preventDefault();
        const ariaExpanded =
            $showHideButton.getAttribute("aria-expanded") == "true";
        $showHideButton.setAttribute("aria-expanded", !ariaExpanded);
        const newAriaExpanded =
            $showHideButton.getAttribute("aria-expanded") == "true";
        $searchFilterContainer.hidden = !$searchFilterContainer.hidden;

        if (newAriaExpanded) {
            $showHideButton.innerHTML = "Hide filters";
        } else {
            $showHideButton.innerHTML =
                `Filters<span class="filter-indicator">${ 
                $noOfFilters 
                }</span>`;
        }
    });

    if (window.innerWidth <= 1200) {
        $showHideButton.hidden = false;
        $searchFilterContainer.hidden = true;
    }

    window.addEventListener(
        "resize",
        debounce(() => {
            const ariaExpanded = $showHideButton.getAttribute("aria-expanded");
            if (window.innerWidth <= 1200) {
                $showHideButton.hidden = false;

                if (ariaExpanded === "false") {
                    $searchFilterContainer.hidden = true;
                } else {
                    $searchFilterContainer.hidden = false;
                }
            } else {
                $showHideButton.hidden = true;
                $searchFilterContainer.hidden = false;
            }
        }, 200),
    );
}

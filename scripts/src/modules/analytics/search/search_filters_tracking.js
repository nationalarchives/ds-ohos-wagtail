import push_to_data_layer from "./../push_to_data_layer";

const pushActiveFilterDataOnLoad = () => {
    // get filters after DOM has loaded and they have rendered on page
    window.addEventListener('load', () => {
        const filterList = document.querySelector('.search-results__selected-filters')
        if(filterList !== null) {
            pushActiveFilterData(filterList);
        }
    });
}

const pushActiveFilterData = (filterList) => {
    // get current search bucket
    const searchBucket = filterList.getAttribute('data-search-bucket');

    const filters = filterList.querySelectorAll("[data-filter]");

    // create array to store currently active filters
    const activeFilters = [];

    // loop through all currently active filters
    filters.forEach((filter) => {
        let value = filter.getAttribute('data-filter-value');
        const name = filter.getAttribute('data-filter-name');

        // if filter is a start or end date, set its value to 'Yes'
        if (name === 'opening_start_date' || name === 'opening_end_date') {
            value = 'Yes';
        }

        // setup the dataLayer variables for each filter
        let filterData = {
            'event': 'search-filters',
            'search_bucket': searchBucket || '',
            'search_filter_name': name || '',
            'search_filter_value': value || '',
        };

        // add currently active filters to activeFilters array
        activeFilters.push(filterData);
    });

    // loop through the updated filters array and send each item to the dataLayer
    activeFilters.forEach((filter) => {
        push_to_data_layer(filter);
    });
}

export default pushActiveFilterDataOnLoad;

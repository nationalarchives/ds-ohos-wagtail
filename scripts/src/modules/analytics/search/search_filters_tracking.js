import push_to_data_layer from "./../push_to_data_layer";

const getFilters = () => {
    // get filters after DOM has loaded and they have rendered on page
    window.addEventListener('load', () => {
        const filters = document.querySelectorAll('[data-filter]');

        loopFilters(filters);
    });
}

const loopFilters = (filters) => {
    // get current search bucket
    const searchBucket = document.querySelector('[data-search-bucket]').getAttribute('data-search-bucket');
    
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
            'search_bucket': searchBucket || '',
            'search_filter_value': value || '',
            'search_filter_name': name || '',
        };

        // add currently active filters to activeFilters array
        activeFilters.push(filterData);
    });

    // check if start and end date filters are active (do they already exist in array?)
    let startDate = activeFilters.some(e => e.search_filter_name === 'opening_start_date');
    let endDate = activeFilters.some(e => e.search_filter_name === 'opening_end_date');
    
    // if start date isn't active, create a custom object with the value 'No'
    if (!startDate) {
        startDate = {
            'search_bucket': searchBucket || '',
            'search_filter_value': 'No',
            'search_filter_name': 'opening_start_date',
        };

        activeFilters.push(startDate);
    }

    // if end date isn't active, create a custom object with the value 'No'
    if (!endDate) {
        endDate = {
            'search_bucket': searchBucket || '',
            'search_filter_value': 'No',
            'search_filter_name': 'opening_end_date',
        };

        activeFilters.push(endDate);
    }

    // loop through the updated filters array and send each item to the dataLayer
    activeFilters.forEach((filter) => {
        push_to_data_layer(filter);
    });
}

const searchFiltersTracking = () => {
    getFilters();
};

export default searchFiltersTracking;
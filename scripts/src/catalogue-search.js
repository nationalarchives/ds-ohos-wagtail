import mobileFilterExpander from './modules/search/mobile-filter-expander.js';
import searchBucketsExpander from './modules/search/search-buckets-expander.js';
import searchLongFilters from './modules/search/search-long-filters';
import intialiseSearchResultTracking from './modules/analytics/search/search_result_interaction'

mobileFilterExpander();
searchBucketsExpander();
searchLongFilters();
intialiseSearchResultTracking();

/* eslint-disable camelcase, no-undef */
export default function remove_event(element, event) {
    $(element).off(event);
}

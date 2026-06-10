/* eslint-disable camelcase, func-names, no-undef, no-invalid-this */
export default function remove_aria_roles(sectionHeadings) {
    sectionHeadings.each(function () {
        $(this).removeAttr("role");
        $(this).removeAttr("tabindex");
        $(this).removeAttr("aria-expanded");
        $(this).removeAttr("aria-controls");
    });
}

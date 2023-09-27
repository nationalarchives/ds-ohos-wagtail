from django.core.paginator import Paginator
from django.http import FileResponse
from django.shortcuts import Http404, render
from django.views.decorators.cache import cache_control

from ...ciim.exceptions import ClientAPIError, DoesNotExist
from ...ciim.utils import convert_sort_key_to_index
from ..api import records_client
from ..models import Image


def image_viewer(request, iaid, sort):
    """View to render a single image for a record."""

    try:
        record = records_client.fetch(iaid=iaid)
    except DoesNotExist:
        raise Http404

    if not record.is_digitised:
        raise Http404

    images = Image.search.filter(rid=record.media_reference_id)

    # Sort key generated by CIIM is prefixed by a number to avoid issues
    # when sorting alphabetically, i.e ordering 1 , 11, 2 instead of 1, 2, 11
    # convert to index to use as offset in a Client API query
    index = convert_sort_key_to_index(sort)

    try:
        previous_image = images[index - 1]
    except ClientAPIError:
        # Subscripting for the previous image will trigger a request to Client API.
        # If the query isn't valid, this is where the exception will be raised..
        raise Http404

    try:
        image = images[index]
    except IndexError:
        raise Http404

    try:
        next_image = images[index + 1]
    except IndexError:
        next_image = None

    return render(
        request,
        "records/image-viewer.html",
        {
            "page": record,
            "image": image,
            "images": images,
            "index": index,
            "next_image": next_image,
            "previous_image": previous_image,
        },
    )


def image_browse(request, iaid):
    try:
        record = records_client.fetch(iaid=iaid)
    except DoesNotExist:
        raise Http404

    if not record.is_digitised:
        raise Http404

    images = Image.search.filter(rid=record.media_reference_id)
    if not images:
        raise Http404

    page_number = request.GET.get("page", 1)
    paginator = Paginator(images, 20)
    images = paginator.get_page(page_number)

    return render(
        request,
        "records/image-browse.html",
        {
            "page": record,
            "images": images,
            # Obtaining the count requires a network request.
            # Pass the value to the template to prevent
            # unexpected performance issues
            "images_count": paginator.count,
        },
    )


# Cache assets indefinitely if browser supports it
# NOTE: core.cache_control.apply_default_cache_control will add to this
@cache_control(max_age="259200", immutable=True)
def image_serve(request, location):
    """Relay content served from Client API's /media endpoint"""
    response = Image.media.serve(location)

    if not response.ok:
        raise Http404

    return FileResponse(
        response.raw,
        content_type="image/jpeg",
        reason=response.reason,
    )

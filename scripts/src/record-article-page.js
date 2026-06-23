/* eslint-disable no-new */
import imageGalleryTracking from "./modules/analytics/record_tracking/image_gallery_tracking";
import ImageGallery from "./modules/image-gallery";
import RecordMatters from "./modules/record-matter";

const imageGallery = document.querySelector("[data-image-gallery]");

if (imageGallery) {
    new ImageGallery(imageGallery);
    imageGalleryTracking();
}

const recordMatters = document.querySelector(".record-matters");

if (recordMatters) {
    new RecordMatters(recordMatters);
}

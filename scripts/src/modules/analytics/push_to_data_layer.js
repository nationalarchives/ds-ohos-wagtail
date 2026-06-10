const push_to_data_layer = (obj) => {
    if (!window.dataLayer) {
        return;
    }

    if (Boolean(obj) || typeof obj === "object") {
        window.dataLayer.push(obj);
    }

    return obj;
};

export default push_to_data_layer;

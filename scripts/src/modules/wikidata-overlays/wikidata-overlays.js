const fetchData = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
}

const fetchAllData = async (urls) => {
  try {
    const dataPromises = urls.map(url => fetchData(url));

    const results = await Promise.all(dataPromises);

    return results;

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

const wikidataLinks = document.querySelectorAll('[data-js-wikidata-url]');

const wikidataIds = [...wikidataLinks].map(link => link.getAttribute('data-js-wikidata-url').replace('https://www.wikidata.org/wiki/', ''));

const wikidataUrls = wikidataIds.map(id => `https://www.wikidata.org/w/rest.php/wikibase/v0/entities/items/${id}`);

const wikidata = await fetchAllData(wikidataUrls);

const getEntryImage = (entry) => {
  const imageName = entry?.statements?.P18?.[0]?.value?.content;

  if (imageName) {
    const image = encodeURI(`https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/${imageName}&width=74`);

    return image;
  }
}

const createTemplate = (data) => {
  const template = document.createElement('template');
  const image = getEntryImage(data);

  const templateContainerClass = data.templateClass ? `${data.templateClass}` : '';
  const labelTemplate = data.label ? `<p>${data.label}</p>` : '';
  const imageTemplate = image ? `<img src="${image}" alt="">` : '';
  const titleTemplate = data.labels.en ? `<h3>${data.labels.en}</h3>` : '';
  const descriptionTemplate = data.descriptions.en ? `<p>${data.descriptions.en}</p>` : '';
  const idTemplate = data.id ? `<p>${data.id}</p>` : '';

  template.innerHTML = `
    <div class="${templateContainerClass}">
      ${labelTemplate}
      ${imageTemplate}
      ${titleTemplate}
      ${descriptionTemplate}
      ${idTemplate}
    </div>
  `;

  return template;
}

wikidataLinks.forEach(link => {
  const wikidataUrl = link.getAttribute('data-js-wikidata-url');
  const id = wikidataUrl.replace('https://www.wikidata.org/wiki/', '');
  const label = link.getAttribute('data-js-wikidata-tag-type-label');
  const templateClass = link.getAttribute('data-js-wikidata-tag-type');

  const data = {
    label,
    templateClass,
    ...wikidata.find(entry => entry.id === id)
  };

  const template = createTemplate(data);

  const overlayContainer = document.querySelector(`[data-js-wikidata-overlay="${wikidataUrl}"]`);

  overlayContainer.appendChild(template.content);
});

// Ensures webpack will treat the file as a module and handle async/await correctly
export {}

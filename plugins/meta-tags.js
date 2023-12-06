// plugins/meta-tags.js
export default ({ app, store, route, params, error, redirect }) => {
  app.head = function (meta) {
    return {
      title: meta.title || 'Default Title',
      meta: [
        { hid: 'description', name: 'description', content: meta.description || 'Default Description' },
        { property: 'og:title', content: meta.ogTitle || 'Default OG Title' },
        { property: 'og:description', content: meta.ogDescription || 'Default OG Description' },
        { property: 'og:image', content: meta.ogImage || 'URL to Default Image' },
        { property: 'og:url', content: meta.ogUrl || 'URL to Current Page' },
      ],
    };
  };
};

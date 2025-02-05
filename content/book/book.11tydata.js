export default {
	tags: [
		"books"
	],
	"layout": "post.njk",
  eleventyComputed: {
    permalink: data => `/${data.page.fileSlug}/`
  }
};

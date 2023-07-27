function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/[^\w-]+/g, "") // Remove special characters
    .replace(/--+/g, "-") // Replace multiple dashes with single dash
    .replace(/^-+/, "") // Remove leading dash
    .replace(/-+$/, ""); // Remove trailing dash
}

export { slugify };

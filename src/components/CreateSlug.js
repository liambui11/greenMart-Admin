function CreateSlug(title) {
  const slugify = require("slugify");

  const slug = slugify(title, {
    replacement: "-",
    remove: /[*+~.()'"!:@]/g,
    lower: true,
    strict: true,
    trim: true,
  });
  return slug;
}

export default CreateSlug;

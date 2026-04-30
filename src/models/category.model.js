const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const slugify = require("slugify");

const categorySchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4
  },

  name: {
    type: String, 
    required: true,
    trim: true
  },

  slug: {
    type: String,
    unique: true,
    lowercase: true
  },

  parentId: {
    type: String,
    default: null
  },

  isActive: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

/**
 * Auto-generate unique slug
 */
categorySchema.pre("save", async function (next) {
  if (this.name) {
    let baseSlug = slugify(this.name, { lower: true, strict: true });
    let slug = baseSlug;

    let count = 1;

    const Category = mongoose.model("Category");

    while (await Category.findOne({ slug })) {
      slug = `${baseSlug}-${count++}`;
    }

    this.slug = slug;
  }
  next();
});

module.exports = mongoose.model("Category", categorySchema);
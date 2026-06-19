const HeroBanner = require("../models/heroBanner.model");
const { uploadToCloud } = require("../utils/uploadFileToS3");
const catchAsync = require("../utils/catchAsync");

// ─── Admin: Create a new hero banner slide ────────────────────────────────────
const createHeroBanner = catchAsync(async (req, res) => {
  const { altText, order, isActive } = req.body;

  const desktopFile = req.files?.desktopImage?.[0];
  const mobileFile = req.files?.mobileImage?.[0];

  if (!desktopFile || !mobileFile) {
    return res.status(400).json({
      success: false,
      message: "Both desktopImage and mobileImage are required.",
    });
  }

  const [desktopUrl, mobileUrl] = await Promise.all([
    uploadToCloud(desktopFile, "hero-banners/desktop"),
    uploadToCloud(mobileFile, "hero-banners/mobile"),
  ]);

  const banner = await HeroBanner.create({
    desktopImage: desktopUrl,
    mobileImage: mobileUrl,
    altText: altText || "Hero Banner",
    order: order ? Number(order) : 0,
    isActive: isActive !== undefined ? isActive === "true" || isActive === true : true,
  });

  res.status(201).json({ success: true, message: "Banner created.", data: banner });
});

// ─── Admin: Get all hero banners ──────────────────────────────────────────────
const getAllHeroBanners = catchAsync(async (req, res) => {
  const banners = await HeroBanner.find().sort({ order: 1, createdAt: -1 });
  res.status(200).json({ success: true, data: banners });
});

// ─── Admin: Update a hero banner ──────────────────────────────────────────────
const updateHeroBanner = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { altText, order, isActive } = req.body;

  const banner = await HeroBanner.findById(id);
  if (!banner) {
    return res.status(404).json({ success: false, message: "Banner not found." });
  }

  // Upload new images if provided
  const desktopFile = req.files?.desktopImage?.[0];
  const mobileFile = req.files?.mobileImage?.[0];

  const [desktopUrl, mobileUrl] = await Promise.all([
    desktopFile ? uploadToCloud(desktopFile, "hero-banners/desktop") : Promise.resolve(null),
    mobileFile ? uploadToCloud(mobileFile, "hero-banners/mobile") : Promise.resolve(null),
  ]);

  if (desktopUrl) banner.desktopImage = desktopUrl;
  if (mobileUrl) banner.mobileImage = mobileUrl;
  if (altText !== undefined) banner.altText = altText;
  if (order !== undefined) banner.order = Number(order);
  if (isActive !== undefined) banner.isActive = isActive === "true" || isActive === true;

  await banner.save();
  res.status(200).json({ success: true, message: "Banner updated.", data: banner });
});

// ─── Admin: Toggle banner active status ───────────────────────────────────────
const toggleHeroBanner = catchAsync(async (req, res) => {
  const { id } = req.params;
  const banner = await HeroBanner.findById(id);
  if (!banner) {
    return res.status(404).json({ success: false, message: "Banner not found." });
  }
  banner.isActive = !banner.isActive;
  await banner.save();
  res.status(200).json({
    success: true,
    message: `Banner ${banner.isActive ? "activated" : "deactivated"}.`,
    data: banner,
  });
});

// ─── Admin: Delete a hero banner ──────────────────────────────────────────────
const deleteHeroBanner = catchAsync(async (req, res) => {
  const { id } = req.params;
  const banner = await HeroBanner.findByIdAndDelete(id);
  if (!banner) {
    return res.status(404).json({ success: false, message: "Banner not found." });
  }
  res.status(200).json({ success: true, message: "Banner deleted." });
});

// ─── Public: Get active hero banners (for user site) ─────────────────────────
const getActiveHeroBanners = catchAsync(async (req, res) => {
  const banners = await HeroBanner.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
  res.status(200).json({ success: true, data: banners });
});

module.exports = {
  createHeroBanner,
  getAllHeroBanners,
  updateHeroBanner,
  toggleHeroBanner,
  deleteHeroBanner,
  getActiveHeroBanners,
};

const {
  aboutUsData,
  getAboutUs,
} = require("../services/admin Services/aboutUs.service");
const {
  getAllUserQueries,
} = require("../services/admin Services/userQueries/userQueries.JS");
const adminService = require("../services/admin.service");
const { createOrUpdateShippingCharge,getShippingCharge } = require( "../services/admin Services/shippingCharge/shippingCharge.service");



const productSerives = require("../services/admin Services/products/products.service");
const catchAsync = require("../utils/catchAsync");
const web = require("../services/admin Services/webSettings.service");
const {
  getActiveProducts,
} = require("../services/admin Services/products/products.service");
const {
  faqData,
  getFAQ,
  deleteFAQ,
} = require("../services/admin Services/faq/faq.service");
const {
  deleteTestimonial,
  updateTestimonial,
  getTestimonial,
  createTestimonial,
} = require("../services/admin Services/testimonial");
const {
  createTopbarMessage,
  getAllTopbarMessages,
  getActiveTopbarMessages,
  updateTopbarMessage,
  toggleTopbarMessage,
  deleteTopbarMessage,
} = require("../services/admin Services/topbarMessage/topbarMessage.service");

const patternService = require("../services/admin Services/pattern.service")
const bulkEnquiryService = require("../services/bulkEnquiry.service");

const createBanner = catchAsync(async (req, res) => {
  const data = await adminService.createBanner(req);
  res.status(200).send(data);
});

const updateBanner = catchAsync(async (req, res) => {
  const data = await adminService.updateBanner(req);
  res.status(200).send(data);
});

const getBanner = catchAsync(async (req, res) => {
  const data = await adminService.getBanner(req);
  res.status(200).send(data);
});

const editBanner = catchAsync(async (req, res) => {
  const data = await adminService.editBanner(req);
  res.status(200).send(data);
});

const deleteBanner = catchAsync(async (req, res) => {
  const data = await adminService.deleteBanner(req);
  res.status(200).send(data);
});

const createCoupone = catchAsync(async (req, res) => {
  const data = await adminService.createCoupen(req);
  res.status(201).send(data);
});

const getCoupon = catchAsync(async (req, res) => {
  const data = await adminService.getCoupon(req);
  res.status(200).send(data);
});

const getOneCoupon = catchAsync(async (req, res) => {
  const data = await adminService.getOneCoupon(req);
  res.status(200).send(data);
});

const editCoupon = catchAsync(async (req, res) => {
  const data = await adminService.editCoupon(req);
  res.status(200).send(data);
});

const updateCouponStatus = catchAsync(async (req, res) => {
  const data = await adminService.updateCouponStatus(req);
  res.status(200).send(data);
});

const deleteCoupon = catchAsync(async (req, res) => {
  const data = await adminService.deleteCoupon(req);
  res.status(200).send(data);
});

const createCategory = catchAsync(async (req, res) => {
  const data = await adminService.AddCategory(req);
  res.status(200).send(data);
});
const fetchCategory = catchAsync(async (req, res) => {
  const data = await adminService.getAllCategory(req);
  res.status(200).send(data);
});

const fetchSingleCategory = catchAsync(async (req, res) => {
  const data = await adminService.getOneCategory(req);
  res.status(200).send(data);
});

const fetchSingleAdmin = catchAsync(async (req, res) => {
  const data = await adminService.getAdminById(req); // req.params.id must exist
  res.status(200).send(data);
});

const changeCategory = catchAsync(async (req, res) => {
  const data = await adminService.editCategory(req);
  res.status(200).send(data);
});

const removeCategory = catchAsync(async (req, res) => {
  const data = await adminService.deleteCategory(req);
  res.status(200).send(data);
});

const createDigitalZone = catchAsync(async (req, res) => {
  const data = await adminService.createDigitalZone(req);
  res.status(201).send(data);
});

const getDigitalZone = catchAsync(async (req, res) => {
  const data = await adminService.getDigitalZone(req);
  res.status(200).send(data);
});

const createTemplate = catchAsync(async (req, res) => {
  const data = await adminService.createTemplate(req);
  res.status(201).send(data);
});

const getTemplate = catchAsync(async (req, res) => {
  const data = await adminService.getTemplate(req);
  res.status(200).send(data);
});

const createProducts = catchAsync(async (req, res) => {
  const data = await adminService.createProducts(req);
  res.status(200).send(data);
});

const getAllProducts = catchAsync(async (req, res) => {
  const data = await adminService.getAllProducts(req);
  res.status(200).send(data);
});

const getOneProducts = catchAsync(async (req, res) => {
  const data = await adminService.getOneProducts(req);
  res.status(200).send(data);
});

const editProducts = catchAsync(async (req, res) => {
  const data = await adminService.editProducts(req);
  res.status(200).send(data);
});

const toggleProductStatus = catchAsync(async (req, res) => {
  const data = await adminService.toggleProductStatus(req);
  res.status(200).send(data);
});

const deleteProducts = catchAsync(async (req, res) => {
  const data = await adminService.deleteProducts(req);
  res.status(200).send(data);
});

const getFilterOptions = catchAsync(async (req, res) => {
  const data = await adminService.getFilterOptions(req);
  res.status(200).send(data);
});

const createPattern = catchAsync(async (req, res) => {
  const result = await patternService.createPattern(req);

  res.status(201).json(result);
});

const getPatterns = catchAsync(async (req, res) => {
  const result = await patternService.getPatterns();

  res.status(200).json(result);
});

const deletePattern = catchAsync(async (req, res) => {
  const result = await patternService.deletePattern(req);

  res.status(200).json(result);
});


const getPatternsByIds = catchAsync(async (req, res) => {
  const result = await patternService.getPatternsByIds(req);

  res.status(200).json(result);
});

const createSubCategory = catchAsync(async (req, res) => {
  const data = await adminService.createSubCategory(req);
  res.status(201).send(data);
});

const getSubCategory = catchAsync(async (req, res) => {
  const data = await adminService.getSubCategory(req);
  res.status(200).send(data);
});

const updateSubCategory = catchAsync(async (req, res) => {
  const data = await adminService.updateSubCategory(req);
  res.status(200).send(data);
});

const getOneSubCategory = catchAsync(async (req, res) => {
  const data = await adminService.getOneSubCategory(req);
  res.status(200).send(data);
});

const deleteSubCategory = catchAsync(async (req, res) => {
  const data = await adminService.deleteSubCategory(req);
  res.status(200).send(data);
});

const getCustomer = catchAsync(async (req, res) => {
  const data = await adminService.Customer(req);
  res.status(200).send(data);
});

const changeCustomer = catchAsync(async (req, res) => {
  const data = await adminService.editCustomer(req);
  res.status(200).send(data);
});

const singleCustomer = catchAsync(async (req, res) => {
  const data = await adminService.oneCustomer(req);
  res.status(200).send(data);
});

const createBrand = catchAsync(async (req, res) => {
  const data = await adminService.brand(req);
  res.status(200).send(data);
});

const getAllBrand = catchAsync(async (req, res) => {
  const data = await adminService.getBrand(req);
  res.status(200).send(data);
});

const changeBrand = catchAsync(async (req, res) => {
  const data = await adminService.editBrand(req);
  res.status(200).send(data);
});

const getSingleBrand = catchAsync(async (req, res) => {
  const data = await adminService.getOneBrand(req);
  res.status(200).send(data);
});

const removeBrand = catchAsync(async (req, res) => {
  const data = await adminService.deleteBrand(req);
  res.status(200).send(data);
});

const createOffer = catchAsync(async (req, res) => {
  const data = await adminService.createOffer(req);
  res.status(200).send(data);
});

const getOffers = catchAsync(async (req, res) => {
  const data = await adminService.getOffers(req);
  res.status(200).send(data);
});

const getOneOffer = catchAsync(async (req, res) => {
  const data = await adminService.getOneOffer(req);
  res.status(200).send(data);
});

const updateOffers = catchAsync(async (req, res) => {
  const data = await adminService.updateOffers(req);
  res.status(200).send(data);
});

const updateOfferStatus = catchAsync(async (req, res) => {
  const data = await adminService.updateOfferStatus(req);
  res.status(200).send(data);
});

const deleteOffers = catchAsync(async (req, res) => {
  const data = await adminService.deleteOffers(req);
  res.status(200).send(data);
});

const getReport = catchAsync(async (req, res) => {
  const data = await adminService.getReport(req);

  if (data.isPdf) {
    // Set response headers for PDF file download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="Order_Report.pdf"',
    );

    // Send the PDF buffer as the response
    return res.send(data.buffer);
  }
  res.status(200).send(data);
});

const approveRejectReturns = catchAsync(async (req, res) => {
  const data = await adminService.editReturnStatus(req);
  res.status(200).send(data);
});

const getOrder = catchAsync(async (req, res) => {
  const data = await adminService.getOrder(req);
  res.status(200).send(data);
});

const editOrders = catchAsync(async (req, res) => {
  const data = await adminService.editOrders(req);
  res.status(200).send(data);
});

const createSystemUser = catchAsync(async (req, res) => {
  const data = await adminService.systemUser(req);
  res.status(200).send(data);
});

const userLogin = catchAsync(async (req, res) => {
  const data = await adminService.Login(req);
  res.status(200).send(data);
});

const allAdmin = catchAsync(async (req, res) => {
  const data = await adminService.getAllAdmin(req);
  res.status(200).send(data);
});

const forgotPasswordController = catchAsync(async (req, res) => {
  const data = await adminService.forgotPassword(req);
  res.status(200).send(data);
});

const resendOtpController = catchAsync(async (req, res) => {
  const data = await adminService.resendOtp(req);
  res.status(200).send(data);
});

const verifyResetOtpController = catchAsync(async (req, res) => {
  const data = await adminService.verifyResetOtp(req);
  res.status(200).send(data);
});

const resetPasswordController = catchAsync(async (req, res) => {
  const data = await adminService.resetPassword(req);
  res.status(200).send(data);
});

const editAdmin = catchAsync(async (req, res) => {
  const data = await adminService.editSystemUser(req);
  res.status(200).send(data);
});

const deleteAdmin = catchAsync(async (req, res) => {
  const data = await adminService.deleteSystemUser(req);
  res.status(200).send(data);
});

const getReviewRatings = catchAsync(async (req, res) => {
  const data = await adminService.getReviewRatings(req);
  res.status(200).send(data);
});

const deleteReviewsRatings = catchAsync(async (req, res) => {
  const data = await adminService.deleteReviewsRatings(req);
  res.status(200).send(data);
});

const fetchActiveProducts = catchAsync(async (req, res) => {
  const data = await getActiveProducts(req);
  res.status(200).send(data);
});

const addNotification = catchAsync(async (req, res) => {
  const data = await adminService.notification(req);
  res.status(200).send(data);
});

const fetchNotification = catchAsync(async (req, res) => {
  const data = await adminService.getNotification(req);
  res.status(200).send(data);
});

const createFeaturedSection = catchAsync(async (req, res) => {
  const data = await adminService.createFeaturedSection(req);
  res.status(201).send(data);
});

const getFeaturedSection = catchAsync(async (req, res) => {
  const data = await adminService.getFeaturedSection(req);
  res.status(200).send(data);
});

const updateFeaturedSection = catchAsync(async (req, res) => {
  const data = await adminService.updateFeaturedSection(req);
  res.status(200).send(data);
});

const updateStatusFeatureSection = catchAsync(async (req, res) => {
  const data = await adminService.updateStatusFeatureSection(req);
  res.status(200).send(data);
});

const deleteFeaturedSection = catchAsync(async (req, res) => {
  const data = await adminService.deleteFeaturedSection(req);
  res.status(200).send(data);
});

const addOfferProducts = catchAsync(async (req, res) => {
  const data = await adminService.addOfferProducts(req);
  res.status(201).send(data);
});

const getOfferProducts = catchAsync(async (req, res) => {
  const data = await adminService.getOfferProducts(req);
  res.status(200).send(data);
});

const getOfferAndNotAppliedProducts = catchAsync(async (req, res) => {
  const data = await adminService.getOfferAndNotAppliedProducts(req);
  res.status(200).send(data);
});

const updateOfferProducts = catchAsync(async (req, res) => {
  const data = await adminService.updateOfferProducts(req);
  res.status(200).send(data);
});

const addFeaturedProducts = catchAsync(async (req, res) => {
  const data = await adminService.addFeaturedProducts(req);
  res.status(201).send(data);
});

const getFeaturedProducts = catchAsync(async (req, res) => {
  const data = await adminService.getFeaturedProducts(req);
  res.status(200).send(data);
});

const getFeaturedAndNotAppliedProducts = catchAsync(async (req, res) => {
  const data = await adminService.getFeaturedAndNotAppliedProducts(req);
  res.status(200).send(data);
});

const updateFeaturedProducts = catchAsync(async (req, res) => {
  const data = await adminService.updateFeaturedProducts(req);
  res.status(200).send(data);
});

const getSubCategoryBasedOnCategory = catchAsync(async (req, res) => {
  const data = await adminService.getSubCategoryBasedOnCategory(req);
  res.status(200).send(data);
});

const storeSettingsData = catchAsync(async (req, res) => {
  const data = await adminService.storeSettingsData(req);
  res.status(200).send(data);
});
const getStoreSettingData = catchAsync(async (req, res) => {
  const data = await adminService.getStoreSettingData(req);
  res.status(200).send(data);
});

const editStoreSettingsData = catchAsync(async (req, res) => {
  const data = await adminService.editStoreSettingsData(req);
  res.status(200).send(data);
});

const getfilterNotification = catchAsync(async (req, res) => {
  const data = await adminService.getSubCategoryBasedOnCategory(req);
  res.status(200).send(data);
});

const CreateEmailSetting = catchAsync(async (req, res) => {
  const data = await adminService.createEmailSetting(req);
  res.status(201).send(data);
});

const GetEmailSetting = catchAsync(async (req, res) => {
  const data = await adminService.getEmailSetting(req);
  res.status(200).send(data);
});

const CreateShippingMethod = catchAsync(async (req, res) => {
  const data = await adminService.createShippingMethod(req);
  res.status(201).send(data);
});

const GetShippingMethod = catchAsync(async (req, res) => {
  const data = await adminService.getShippingMethod(req);
  res.status(200).send(data);
});

const Createaboutus = catchAsync(async (req, res) => {
  const data = await aboutUsData(req);
  res.status(200).send(data);
});
const Getaboutus = catchAsync(async (req, res) => {
  const data = await getAboutUs(req);
  res.status(200).send(data);
});

const Createcontactus = catchAsync(async (req, res) => {
  const data = await adminService.createContactus(req);
  res.status(200).send(data);
});
const Getcontactus = catchAsync(async (req, res) => {
  const data = await adminService.getContactus(req);
  res.status(200).send(data);
});

const CreatePrivacyPolicy = catchAsync(async (req, res) => {
  const data = await adminService.createprivacypolicy(req);
  res.status(200).send(data);
});
const GetPrivacyPolicy = catchAsync(async (req, res) => {
  const data = await adminService.getprivacypolicy(req);
  res.status(200).send(data);
});

const CreateTermsAndCondition = catchAsync(async (req, res) => {
  const data = await adminService.createtermsandcondition(req);
  res.status(200).send(data);
});
const GetTermsAndCondition = catchAsync(async (req, res) => {
  const data = await adminService.gettermsandcondition(req);
  res.status(200).send(data);
});

const CreateReturnPolicy = catchAsync(async (req, res) => {
  const data = await adminService.createreturnpolicy(req);
  res.status(200).send(data);
});
const GetReturnPolicy = catchAsync(async (req, res) => {
  const data = await adminService.getreturnpolicy(req);
  res.status(200).send(data);
});

const CreateShippingPolicy = catchAsync(async (req, res) => {
  const data = await adminService.createshippingpolicy(req);
  res.status(200).send(data);
});
const GetShippingPolicy = catchAsync(async (req, res) => {
  const data = await adminService.getshippingpolicy(req);
  res.status(200).send(data);
});

const CreateAdminPolicy = catchAsync(async (req, res) => {
  const data = await adminService.createadminpolicy(req);
  res.status(200).send(data);
});
const GetAdminPolicy = catchAsync(async (req, res) => {
  const data = await adminService.getadminpolicy(req);
  res.status(200).send(data);
});

const CreateDeliveryPolicy = catchAsync(async (req, res) => {
  const data = await adminService.createdeliverypolicy(req);
  res.status(200).send(data);
});
const GetDeliveryPolicy = catchAsync(async (req, res) => {
  const data = await adminService.getdeliverypolicy(req);
  res.status(200).send(data);
});

const dashBoardData = catchAsync(async (req, res) => {
  const data = await adminService.dashboard(req);
  res.status(200).send(data);
});

const getInventoryReport = catchAsync(async (req, res) => {
  const data = await adminService.getInventoryReport(req);
  res.status(200).send(data);
});

const paymentMethods = catchAsync(async (req, res) => {
  const data = await adminService.paymentMethods(req);
  res.status(200).send(data);
});

const getPaymentMethod = catchAsync(async (req, res) => {
  const data = await adminService.getPaymentMethod(req);
  res.status(200).send(data);
});

const fetchProfile = catchAsync(async (req, res) => {
  const data = await adminService.getProfile(req);
  res.status(200).send(data);
});

const updateProfile = catchAsync(async (req, res) => {
  const data = await adminService.editProfile(req);
  res.status(200).send(data);
});

const changePurchaseCode = catchAsync(async (req, res) => {
  const data = await adminService.updatePurchaseCode(req);
  res.status(200).send(data);
});

const fetchPurchaseCode = catchAsync(async (req, res) => {
  const data = await adminService.getPurchaseCode(req);
  res.status(200).send(data);
});

const changeModuleManger = catchAsync(async (req, res) => {
  const data = await adminService.editmoduleManager(req);
  res.status(200).send(data);
});

const fetchmoduleManager = catchAsync(async (req, res) => {
  const data = await adminService.getModuleManager(req);
  res.status(200).send(data);
});

const getoneUser = catchAsync(async (req, res) => {
  const data = await adminService.getUserById(req);
  res.status(200).send(data);
});

const shippingTimeSlots = catchAsync(async (req, res) => {
  const data = await adminService.shippingTimeSlots(req);
  res.status(201).send(data);
});

const getShippingTimeSlots = catchAsync(async (req, res) => {
  const data = await adminService.getShippingTimeSlots(req);
  res.status(200).send(data);
});

const createHolidayDateSlot = catchAsync(async (req, res) => {
  const data = await adminService.createHolidayDateSlot(req);
  res.status(201).send(data);
});

const getHolidayTimeSlot = catchAsync(async (req, res) => {
  const data = await adminService.getHolidayTimeSlot(req);
  res.status(200).send(data);
});

const hoildayTimeSlotStatus = catchAsync(async (req, res) => {
  const data = await adminService.hoildayTimeSlotStatus(req);
  res.status(200).send(data);
});

const editHolidayTimeSlot = catchAsync(async (req, res) => {
  const data = await adminService.editHolidayTimeSlot(req);
  res.status(200).send(data);
});

const deleteHolidayTimeSlot = catchAsync(async (req, res) => {
  const data = await adminService.deleteHolidayTimeSlot(req);
  res.status(200).send(data);
});

const GetAllUserQueries = catchAsync(async (req, res) => {
  const data = await getAllUserQueries(req);
  res.status(200).send(data);
});

const addWebUi = catchAsync(async (req, res) => {
  const data = await web.websettings(req);
  res.status(200).send(data);
});

const getWebUi = catchAsync(async (req, res) => {
  const data = await web.getWebSettings(req);
  res.status(200).send(data);
});

const createFaq = catchAsync(async (req, res) => {
  const data = await faqData(req);
  res.status(200).send(data);
});

const FetchedFAQ = catchAsync(async (req, res) => {
  const data = await getFAQ(req);
  res.status(200).send(data);
});

const removeFAQ = catchAsync(async (req, res) => {
  const data = await deleteFAQ(req);
  res.status(200).send(data);
});

const CreateTestimonial = catchAsync(async (req, res) => {
  const data = await createTestimonial(req);
  res.status(200).send(data);
});

const getTestimonials = catchAsync(async (req, res) => {
  const data = await getTestimonial(req);
  res.status(200).send(data);
});

const updateTestimonials = catchAsync(async (req, res) => {
  const data = await updateTestimonial(req);
  res.status(200).send(data);
});

const deleteTestimonials = catchAsync(async (req, res) => {
  const data = await deleteTestimonial(req);
  res.status(200).send(data);
});

const createTopbarController = catchAsync(async (req, res) => {
  const data = await createTopbarMessage(req);
  res.status(201).send(data);
});

const getTopbarsController = catchAsync(async (req, res) => {
  const data = await getAllTopbarMessages();
  res.status(200).send(data);
});

const updateTopbarController = catchAsync(async (req, res) => {
  const data = await updateTopbarMessage(req);
  res.status(200).send(data);
});

const toggleTopbarController = catchAsync(async (req, res) => {
  const data = await toggleTopbarMessage(req);
  res.status(200).send(data);
});

const deleteTopbarController = catchAsync(async (req, res) => {
  const data = await deleteTopbarMessage(req);
  res.status(200).send(data);
});


const getUsersWithCustomizations = catchAsync(async (req, res) => {
  const data = await adminService.getUsersWithCustomizations(req);
  res.status(200).send(data);
});

const getBulkEnquiries = catchAsync(async (req, res) => {
  const data = await bulkEnquiryService.getBulkEnquiries();
  res.status(200).send(data);
});

const CreateOrUpdateShippingCharge = catchAsync(async (req, res) => {
    const data = await createOrUpdateShippingCharge(req);
    res.status(200).send(data);
  });


const GetShippingCharge = catchAsync(async (req, res) => {
    const data = await getShippingCharge();
  res.status(200).send(data);
  });


module.exports = {
  GetAllUserQueries,
  CreateDeliveryPolicy,
  GetDeliveryPolicy,
  CreateAdminPolicy,
  GetAdminPolicy,
  CreateShippingPolicy,
  GetShippingPolicy,
  CreateReturnPolicy,
  GetReturnPolicy,
  CreateTermsAndCondition,
  GetTermsAndCondition,
  CreatePrivacyPolicy,
  GetPrivacyPolicy,
  Createcontactus,
  Getcontactus,
  Createaboutus,
  Getaboutus,
  CreateShippingMethod,
  GetShippingMethod,
  CreateEmailSetting,
  GetEmailSetting,
  createBanner,
  updateBanner,
  getBanner,
  editBanner,
  deleteBanner,
  createCoupone,
  getCoupon,
  getOneCoupon,
  editCoupon,
  updateCouponStatus,
  deleteCoupon,
  createSubCategory,
  getSubCategory,
  getOneSubCategory,
  updateSubCategory,
  deleteSubCategory,
  createCategory,
  fetchCategory,
  fetchSingleCategory,
  changeCategory,
  removeCategory,
  getCustomer,
  changeCustomer,
  singleCustomer,
  createBrand,
  getAllBrand,
  changeBrand,
  getSingleBrand,
  removeBrand,
  createOffer,
  getOffers,
  getOneOffer,
  updateOffers,
  updateOfferStatus,
  deleteOffers,
  getReport,
  getOrder,
  editOrders,
  approveRejectReturns,
  createSystemUser,
  userLogin,
  allAdmin,
  editAdmin,
  deleteAdmin,
  getReviewRatings,
  addNotification,
  fetchNotification,
  createFeaturedSection,
  getFeaturedSection,
  updateFeaturedSection,
  fetchSingleAdmin,
  updateStatusFeatureSection,
  deleteFeaturedSection,
  addOfferProducts,
  getOfferProducts,
  updateOfferProducts,
  getOfferAndNotAppliedProducts,
  addFeaturedProducts,
  getFeaturedProducts,
  getFeaturedAndNotAppliedProducts,
  updateFeaturedProducts,
  getSubCategoryBasedOnCategory,
  storeSettingsData,
  getfilterNotification,
  dashBoardData,
  getStoreSettingData,
  editStoreSettingsData,
  fetchProfile,
  updateProfile,
  getInventoryReport,
  paymentMethods,
  getPaymentMethod,
  changePurchaseCode,
  fetchPurchaseCode,
  shippingTimeSlots,
  getShippingTimeSlots,
  createHolidayDateSlot,
  getHolidayTimeSlot,
  hoildayTimeSlotStatus,
  editHolidayTimeSlot,
  deleteHolidayTimeSlot,
  changeModuleManger,
  fetchmoduleManager,
  getoneUser,
  addWebUi,
  getWebUi,
  fetchActiveProducts,
  createFaq,
  FetchedFAQ,
  removeFAQ,
  CreateTestimonial,
  getTestimonials,
  updateTestimonials,
  deleteTestimonials,
  deleteReviewsRatings,
  forgotPasswordController,
  resendOtpController,
  verifyResetOtpController,
  resetPasswordController,
  createTopbarController,
  getTopbarsController,
  updateTopbarController,
  toggleTopbarController,
  deleteTopbarController,
  createDigitalZone,
  getDigitalZone,
  createTemplate,
  getTemplate,
  createProducts,
  getAllProducts,
  getOneProducts,
  editProducts,
  toggleProductStatus,
  deleteProducts,
  createPattern,
  getPatterns,
  deletePattern,
  getPatternsByIds,

  getUsersWithCustomizations,
  getBulkEnquiries,
  getFilterOptions,
  CreateOrUpdateShippingCharge,
  GetShippingCharge

};

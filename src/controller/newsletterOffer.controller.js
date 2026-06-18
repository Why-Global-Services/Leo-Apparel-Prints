const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const newsletterOfferService = require("../services/newsletterOffer.service");

const claimOffer = catchAsync(async (req, res) => {
  const result = await newsletterOfferService.claimOffer(req.body.email);
  if (result.success) {
    res.status(httpStatus.CREATED).send(result);
  } else {
    // If already claimed, we can just return OK to not show an error to user, 
    // or return 400. We'll return 200 with success: false.
    res.status(httpStatus.OK).send(result);
  }
});

module.exports = {
  claimOffer,
};

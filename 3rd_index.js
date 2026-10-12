function evaluateTravelExpense(claim) {
  const { employeeId, travelType, distance, claimedAmount, documentsSubmitted } = claim;

  let eligibleAmount = 0;
  let claimStatus = "Rejected";
  let remarks = "Supporting documents not submitted";

  // 1. If supporting documents are not submitted, the claim should be rejected
  if (!documentsSubmitted) {
    claimStatus = "Rejected";
    remarks = "Claim rejected due to missing supporting documents";
  } else {
    // 2. Calculate reimbursement based on travel type and distance rate
    let ratePerKm = 0;
    if (travelType.toLowerCase() === "local") {
      ratePerKm = 8; // ₹8 per kilometre for local travel[span_1](start_span)[span_1](end_span)
    } else if (travelType.toLowerCase() === "outstation") {
      ratePerKm = 12; // ₹12 per kilometre for outstation travel[span_2](start_span)[span_2](end_span)
    }

    let calculatedAmount = distance * ratePerKm;

    // 3. Maximum amount that can be reimbursed for a single claim is ₹10,000[span_3](start_span)[span_3](end_span)
    const maxLimit = 10000;
    eligibleAmount = Math.min(calculatedAmount, maxLimit);

    // 4. Determine Status (Approved, Partially Approved, or Rejected)[span_4](start_span)[span_4](end_span)
    if (claimedAmount <= eligibleAmount) {
      claimStatus = "Approved";
      remarks = "Claim approved as per company policy";
    } else {
      claimStatus = "Partially Approved";
      remarks = `Claim partially approved (Capped at maximum limit of ₹${eligibleAmount})`;
    }
  }

  // Expected Output Format[span_5](start_span)[span_5](end_span)
  return {
    "Employee ID": employeeId,
    "Travel Type": travelType,
    "Distance": `${distance} km`,
    "Claimed Amount": `₹${claimedAmount}`,
    "Eligible Amount": `₹${eligibleAmount}`,
    "Claim Status": claimStatus,
    "Remarks": remarks
  };
}

// Example usage:
const employeeClaim = {
  employeeId: "EMP402",
  travelType: "Outstation",
  distance: 900,
  claimedAmount: 11000,
  documentsSubmitted: true
};

console.log(evaluateTravelExpense(employeeClaim));
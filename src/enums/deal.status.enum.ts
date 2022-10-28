export enum DealStatus {
  Created = "Created",
  ApprovedByBuyer = "ApprovedByBuyer",
  ApprovedBySeller = "ApprovedBySeller",
  Rejected = "Rejected",
  Cancelled = "Cancelled",
  Complete = "Complete",
}

export const DealStatusEnum: { [key: string]: number } = {
  Created: 1,
  ApprovedByBuyer: 2,
  ApprovedBySeller: 3,
  Rejected: 4,
  Cancelled: 5,
  Complete: 6,
};

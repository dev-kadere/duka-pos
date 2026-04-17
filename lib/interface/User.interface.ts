export interface IUser {
  _id: string;
  firstName: string;
  feduid: string;
  username: string;
  lastName: string;
  email: string;
  uid: string;
  token: string;
  roles: any[];
  active: boolean;
  authToken: string;
  approved: boolean;
  _date: {
    $date: string;
  };
  _timestamp: number;
  phoneNumber?: string;
  _utimestamp: number;
  profileImageUrl?: string;
  status: string;
  disabled: boolean;
  faceCaptureImageUrl?: string;
}

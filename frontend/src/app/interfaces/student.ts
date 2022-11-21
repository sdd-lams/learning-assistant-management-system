export interface Student {
  // Data that is parsed directly
  fname: string;
  lname: string;
  rin: number;
  email: string;
  dorm: string;
  room: string;
  ewsdate: Date;
  ewsreason: string;
  cname: string;
  csubject: string;
  ccode: string;
  cprof?: string;
  profcomment?: string;
  // Data that is computed or set by the LA
  emailcount: number; // Should init to 0
  ewscount: number; // Should be computed automatically when an entry is added to DB
  status?: string;
  lacomment?: string;
  assignedla?: string;
}

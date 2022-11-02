export interface Student {
  // Data that is parsed directly
  fname: String;
  lname: String;
  rin: Number;
  email: String;
  dorm: String;
  room: String;
  ewsdate: String;
  ewsreason: String;
  cname: String;
  csubject: String;
  ccode: String;
  cprof?: String;
  profcomment?: String;
  // Data that is computed or set by the LA
  emailcount: Number; // Should init to 0
  ewscount: number; // Should be computed automatically when an entry is added to DB
  status?: String;
  lacomment?: String;
  assignedla?: String;
}

//@desc get all contacts
//@route GET /api/contacts
//@access public
const getContacts = (req, res) => {
  res.status(200).json({ message: "get all contact" });
};

//@desc create contact
//@route POST /api/contact
//@access public
const createContact = (req, res) => {
  console.log("the request body is : ", req.body);
  res.status(201).json({ message: "create contact" });
}; //201 as ressource created

//@desc get one contact
//@route GET /api/contacts/:id
//@access public
const getContact = (req, res) => {
  res.status(200).json({ message: `get contact for ${req.params.id}` });
};

//@desc update contact
//@route PUT /api/contacts
//@access public
const updateContact = (req, res) => {
  res.status(200).json({ message: `update contact for ${req.params.id}` });
};

//@desc delete contact
//@route DELETE /api/contacts
//@access public
const deleteContact = (req, res) => {
  res.status(200).json({ message: `delete contact for ${req.params.id}` });
};

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};

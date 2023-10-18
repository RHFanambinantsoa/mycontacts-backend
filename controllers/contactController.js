//@desc get all contacts
//@route GET /api/contacts
//@access public
const getContacts = asynchandler(async (req, res) => {
  res.status(200).json({ message: "get all contact" });
});

//@desc create contact
//@route POST /api/contact
//@access public
const createContact = asynchandler(async (req, res) => {
  console.log("the request body is : ", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("all fields are mandator"); //error handling
  }
  res.status(201).json({ message: "create contact" }); //201 as ressource created
});
//@desc get one contact
//@route GET /api/contacts/:id
//@access public
const getContact = asynchandler(async (req, res) => {
  res.status(200).json({ message: `get contact for ${req.params.id}` });
});

//@desc update contact
//@route PUT /api/contacts
//@access public
const updateContact = asynchandler(async (req, res) => {
  res.status(200).json({ message: `update contact for ${req.params.id}` });
});

//@desc delete contact
//@route DELETE /api/contacts
//@access public
const deleteContact = asynchandler(async (req, res) => {
  res.status(200).json({ message: `delete contact for ${req.params.id}` });
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};

export default (req, res) => {
  if (req.method === 'POST') {
    const { name, email, companySize } = req.body
    return res.status(200).json({ name, email })
  }

  return res.status(404)
}

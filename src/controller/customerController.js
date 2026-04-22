const pool = require('../db');

// ─── GET /customers ───────────────────────────────────────────────
// Returns all customers, newest first
const getAllCustomers = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM customers ORDER BY created_at DESC'
    );
    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (err) {
    console.error('getAllCustomers error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ─── GET /customers/:id ───────────────────────────────────────────
// Returns a single customer by ID
const getCustomerById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM customers WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error('getCustomerById error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  getAllCustomers,
  getCustomerById
};
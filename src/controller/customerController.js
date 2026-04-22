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

// ─── POST /customers ──────────────────────────────────────────────
// Creates a new customer
const createCustomer = async (req, res) => {
  const { name, email, phone, city } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO customers (name, email, phone, city)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, email, phone || null, city || null]
    );

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    // PostgreSQL unique constraint violation = duplicate email
    if (err.code === '23505') {
      return res.status(409).json({ success: false, message: 'Email already exists' });
    }
    console.error('createCustomer error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ─── PUT /customers/:id ───────────────────────────────────────────
// Updates an existing customer (only fields provided are changed)
const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, city } = req.body;

  try {
    // Check the customer exists first
    const existing = await pool.query('SELECT * FROM customers WHERE id = $1', [id]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    // Merge incoming fields with existing values (so partial updates work)
    const current = existing.rows[0];
    const updatedName  = name  ?? current.name;
    const updatedEmail = email ?? current.email;
    const updatedPhone = phone ?? current.phone;
    const updatedCity  = city  ?? current.city;

    const result = await pool.query(
      `UPDATE customers
       SET name = $1, email = $2, phone = $3, city = $4
       WHERE id = $5
       RETURNING *`,
      [updatedName, updatedEmail, updatedPhone, updatedCity, id]
    );

    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ success: false, message: 'Email already exists' });
    }
    console.error('updateCustomer error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ─── DELETE /customers/:id ────────────────────────────────────────
// Deletes a customer by ID
const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM customers WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    res.status(200).json({
      success: true,
      message: `Customer "${result.rows[0].name}" deleted`,
    });
  } catch (err) {
    console.error('deleteCustomer error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer
};
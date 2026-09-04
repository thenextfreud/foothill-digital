// Foothill Digital — Review Automation Tool
// Sends SMS to customers after their visit with a link to leave a Google review
// Dashboard for business owner to add customers and track review growth

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// In production, use Twilio for SMS. For demo, we log to console.
// const twilio = require('twilio');
// const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory store (replace with database in production)
const customers = [];
const reviews = [];
const stats = {
  totalSent: 0,
  totalClicked: 0,
  totalReviewed: 0,
  averageRating: 0
};

// Business config — would be per-client in production
const businessConfig = {
  name: 'Sahara Restaurant',
  googleReviewUrl: 'https://g.page/r/CXXXXXXXXX/review',
  smsTemplate: (name) => `Hi ${name}! Thanks for visiting ${businessConfig.name} today. How was your experience? Tap here to leave a quick Google review: ${businessConfig.googleReviewUrl}`
};

// API: Add a customer and send review request
app.post('/api/customers', (req, res) => {
  const { name, phone, visitDate } = req.body;
  
  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }

  const customer = {
    id: Date.now().toString(),
    name,
    phone,
    visitDate: visitDate || new Date().toISOString(),
    smsSent: false,
    smsSentAt: null,
    reviewClicked: false,
    reviewClickedAt: null,
    reviewed: false,
    rating: null,
    createdAt: new Date().toISOString()
  };

  customers.push(customer);

  // Send SMS (demo mode — log to console)
  const message = businessConfig.smsTemplate(name);
  console.log(`[SMS] To: ${phone} | Message: ${message}`);
  
  // In production:
  // client.messages.create({
  //   body: message,
  //   from: process.env.TWILIO_PHONE,
  //   to: phone
  // }).then(() => { ... });

  customer.smsSent = true;
  customer.smsSentAt = new Date().toISOString();
  stats.totalSent++;

  res.json({ success: true, customer });
});

// API: Track when customer clicks the review link
app.get('/r/:customerId', (req, res) => {
  const customer = customers.find(c => c.id === req.params.customerId);
  if (customer && !customer.reviewClicked) {
    customer.reviewClicked = true;
    customer.reviewClickedAt = new Date().toISOString();
    stats.totalClicked++;
  }
  // Redirect to Google review page
  res.redirect(businessConfig.googleReviewUrl);
});

// API: Webhook for review completion (would integrate with Google API in production)
app.post('/api/review-webhook', (req, res) => {
  const { customerId, rating } = req.body;
  const customer = customers.find(c => c.id === customerId);
  if (customer) {
    customer.reviewed = true;
    customer.rating = rating;
    stats.totalReviewed++;
    recalcAverage();
  }
  res.json({ success: true });
});

// API: Get dashboard stats
app.get('/api/stats', (req, res) => {
  res.json({
    ...stats,
    recentCustomers: customers.slice(-10).reverse()
  });
});

// API: Get all customers
app.get('/api/customers', (req, res) => {
  res.json({ customers, count: customers.length });
});

function recalcAverage() {
  const rated = customers.filter(c => c.rating);
  if (rated.length > 0) {
    stats.averageRating = (rated.reduce((sum, c) => sum + c.rating, 0) / rated.length).toFixed(1);
  }
}

app.listen(PORT, () => {
  console.log(`Foothill Review Tool running on http://localhost:${PORT}`);
  console.log(`Business: ${businessConfig.name}`);
});

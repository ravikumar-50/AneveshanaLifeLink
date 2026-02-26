const mongoose = require('mongoose');

const guideSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, default: 'General' },
  imageUrl: { type: String, required: true },
  description: { type: String, default: '' },
  badge: { type: String, default: 'Guide' },
  badgeColor: { type: String, default: '#1E3A8A' },
  duration: { type: String, default: '5 min read' },
  steps: [{ type: String }],
});

module.exports = mongoose.model('Guide', guideSchema);

const express = require('express');
const router = express.Router();
const Guide = require('../models/Guide');

// GET /api/guides  – returns all help guides
router.get('/', async (req, res) => {
  try {
    let guides = await Guide.find();

    // Seed default guides if DB is empty
    if (!guides.length) {
      guides = await Guide.insertMany([
        {
          title: 'CPR Emergency',
          category: 'Life Support',
          imageUrl: 'https://images.unsplash.com/photo-1622115297822-a3798fdbe1f6?w=600',
          badge: 'Critical',
          badgeColor: '#E53935',
          duration: '5 min read',
          description: 'Cardiopulmonary resuscitation (CPR) is a lifesaving technique.',
          steps: [
            'Check if the person is responsive.',
            'Call 112 or 108 immediately.',
            'Tilt head back, lift chin to open airway.',
            'Begin 30 chest compressions at center of chest.',
            'Give 2 rescue breaths after every 30 compressions.',
            'Continue until help arrives.',
          ],
        },
        {
          title: 'First Aid for Bleeding',
          category: 'Wound Care',
          imageUrl: 'https://images.unsplash.com/photo-1650532092996-05eaf4a5381d?w=600',
          badge: 'Important',
          badgeColor: '#D97706',
          duration: '3 min read',
          description: 'Control bleeding to prevent life-threatening blood loss.',
          steps: [
            'Apply firm direct pressure with a clean cloth.',
            'Do not remove the cloth if soaked — add more.',
            'Elevate the injured limb above heart level.',
            'Call 108 for severe bleeding.',
          ],
        },
        {
          title: 'Stroke Warning Signs',
          category: 'Neurological',
          imageUrl: 'https://images.unsplash.com/photo-1579043327150-862ad8f6c72d?w=600',
          badge: 'Time Critical',
          badgeColor: '#7C3AED',
          duration: '4 min read',
          description: 'Recognizing a stroke early can save lives.',
          steps: [
            'FACE: Ask to smile — is one side drooping?',
            'ARMS: Ask to raise both arms — does one drift?',
            'SPEECH: Is it slurred?',
            'TIME: If YES to any, call 108 immediately.',
          ],
        },
        {
          title: 'Accident Support',
          category: 'Trauma Care',
          imageUrl: 'https://images.unsplash.com/photo-1673187139211-1e7ec3dd60ec?w=600',
          badge: 'Essential',
          badgeColor: '#059669',
          duration: '6 min read',
          description: 'Immediate correct action after a road accident.',
          steps: [
            'Ensure your own safety — use hazard lights.',
            'Call 108 and 112 immediately.',
            'Do not move the injured person unless in danger.',
            'Control bleeding with firm pressure.',
          ],
        },
      ]);
    }

    res.json(guides);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

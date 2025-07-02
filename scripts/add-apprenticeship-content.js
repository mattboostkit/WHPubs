// Script to add Apprenticeship Scheme content to Sanity
// Run this after logging into Sanity

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'it7wwto3',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN || 'sk1PHVISf0xNjFVLvY2fIetm6gTXv3iL85joYcLqRnXGN3aO0pets0Md3EzVCy8ZAZc8AKB2FG0pNzdXV6zZBj5MQNNw4A1CBhUH9IslFxc3aHOSwveeBVk5ryWFPzesC8P6O2QwtWPtQnXKyT88ejVzwDBDmwa4F7DLmajI4NFaUoWgbf7G',
  useCdn: false
});

async function createApprenticeshipContent() {
  try {
    console.log('Creating Apprenticeship Scheme content...');
    
    await client.create({
      _type: 'career',
      position: 'Apprentice Chef Programme',
      location: 'Multiple Locations',
      roleRequirements: [
        {
          _type: 'block',
          _key: 'block1',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'span1',
            marks: ['strong'],
            text: 'Launch Your Culinary Career with WH Pubs'
          }]
        },
        {
          _type: 'block',
          _key: 'block2',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'span2',
            text: 'Our comprehensive Apprentice Chef Programme offers aspiring chefs the opportunity to learn from experienced professionals while working in our award-winning kitchens. This 18-24 month programme combines hands-on training with formal qualifications.'
          }]
        },
        {
          _type: 'block',
          _key: 'block3',
          style: 'h4',
          children: [{
            _type: 'span',
            _key: 'span3',
            text: 'What We Offer:'
          }]
        },
        {
          _type: 'block',
          _key: 'block4',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'span4',
            text: '• Level 2 or 3 Professional Cookery qualification\n• Mentorship from our Head Chefs\n• Rotation through all kitchen sections\n• Development Kitchen experience\n• Competitive apprentice wages\n• Career progression opportunities\n• Staff meals and benefits package'
          }]
        },
        {
          _type: 'block',
          _key: 'block5',
          style: 'h4',
          children: [{
            _type: 'span',
            _key: 'span5',
            text: 'Requirements:'
          }]
        },
        {
          _type: 'block',
          _key: 'block6',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'span6',
            text: '• Passion for food and cooking\n• Willingness to learn and work hard\n• Good communication skills\n• Able to work as part of a team\n• Minimum age 16 (no upper age limit)\n• No previous experience necessary'
          }]
        },
        {
          _type: 'block',
          _key: 'block7',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'span7',
            text: 'Join our kitchen brigade and learn traditional cooking techniques alongside modern culinary innovation. Many of our current Head Chefs started as apprentices with us!'
          }]
        }
      ],
      salary: 'Competitive apprentice rates + tips',
      applyUrl: 'mailto:careers@whpubs.co.uk?subject=Apprentice Chef Programme Application'
    });

    await client.create({
      _type: 'career',
      position: 'Front of House Apprenticeship',
      location: 'All WH Pubs Locations',
      roleRequirements: [
        {
          _type: 'block',
          _key: 'block1',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'span1',
            marks: ['strong'],
            text: 'Build Your Hospitality Career from the Ground Up'
          }]
        },
        {
          _type: 'block',
          _key: 'block2',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'span2',
            text: 'Our Front of House Apprenticeship Programme is perfect for those who love working with people and want to develop a career in hospitality. Learn every aspect of pub operations while earning a recognized qualification.'
          }]
        },
        {
          _type: 'block',
          _key: 'block3',
          style: 'h4',
          children: [{
            _type: 'span',
            _key: 'span3',
            text: 'Programme Includes:'
          }]
        },
        {
          _type: 'block',
          _key: 'block4',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'span4',
            text: '• Level 2 Hospitality Team Member qualification\n• Bar service and cocktail training\n• Wine and beverage knowledge\n• Customer service excellence\n• Food service skills\n• Till and payment systems\n• Health & safety certification'
          }]
        },
        {
          _type: 'block',
          _key: 'block5',
          style: 'h4',
          children: [{
            _type: 'span',
            _key: 'span5',
            text: 'What We\'re Looking For:'
          }]
        },
        {
          _type: 'block',
          _key: 'block6',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'span6',
            text: '• Friendly, outgoing personality\n• Enthusiasm for hospitality\n• Strong work ethic\n• Flexibility to work various shifts\n• Desire to learn and progress\n• Must be 18+ (due to alcohol service)'
          }]
        },
        {
          _type: 'block',
          _key: 'block7',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'span7',
            text: 'This 12-month programme provides the perfect foundation for a management career in hospitality. Previous apprentices have progressed to supervisory and management roles within our group.'
          }]
        }
      ],
      salary: '£6.62-£11.64 per hour (depending on age) + tips',
      applyUrl: 'mailto:careers@whpubs.co.uk?subject=Front of House Apprenticeship Application'
    });

    console.log('Apprenticeship content created successfully!');
  } catch (error) {
    console.error('Error creating apprenticeship content:', error);
  }
}

createApprenticeshipContent();
import React from 'react';

interface Faq {
  question: string;
  answer: string;
}

const faqData: Faq[] = [
  {
    question: "How do I create a vehicle reminder?",
    answer: "To create a vehicle reminder, simply log in to the system, enter your vehicle details, select the type of reminder, and set the date and time for the reminder."
  },
  {
    question: "What types of reminders can I set?",
    answer: "You can set reminders for oil changes, tire checks, servicing, and more. Choose the reminder type when setting up the reminder."
  },
  {
    question: "Can I edit or delete a reminder?",
    answer: "Yes, you can edit or delete any existing reminder from the 'My Reminders' section. Just click on the reminder and make changes or remove it."
  },
  {
    question: "How will I be notified for reminders?",
    answer: "You will receive notifications via email or SMS based on your preferred settings when the reminder time is approaching."
  },
  {
    question: "Is there a mobile app for this service?",
    answer: "Currently, we offer the service via our website. However, a mobile app is in development and will be available soon."
  }
];

const FaqPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 sm:p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-gray-600">Find answers to common questions about our vehicle reminder system and services.</p>
      </header>

      <div className="space-y-8">
        {faqData.map((faq, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-3xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{faq.question}</h3>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqPage;

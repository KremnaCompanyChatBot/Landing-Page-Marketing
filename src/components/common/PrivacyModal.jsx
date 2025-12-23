// components/common/PrivacyModal.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PrivacyModal = ({ isOpen, onClose, onAccept }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-content"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="modal-header">
            <h2>Privacy Policy</h2>
            <button className="close-btn" onClick={onClose}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="modal-body">
            <p className="last-updated">Last Updated: November 22, 2025</p>

            <section>
              <h3>1. Introduction</h3>
              <p>
                This Privacy Policy describes how Kremna ("we," "us") collects, uses, and shares your personal 
                information when you use our Service.
              </p>
            </section>

            <section>
              <h3>2. Information We Collect</h3>
              <p>We collect information in the following ways:</p>
              <ul>
                <li>
                  <strong>Information You Provide:</strong> When you sign up, we collect your Full Name, Email Address, 
                  Password, and Company/Brand Name.
                </li>
                <li>
                  <strong>User Content (Assistant Data):</strong> We collect the data, files, and text you upload to 
                  train and operate your AI assistant. We treat this content as confidential.
                </li>
                <li>
                  <strong>Usage Data:</strong> We automatically collect information about how you interact with our Service, 
                  such as your IP address, browser type, and pages viewed.
                </li>
              </ul>
            </section>

            <section>
              <h3>3. How We Use Your Information</h3>
              <p>We use your information to:</p>
              <ul>
                <li>Provide, operate, and maintain our Service.</li>
                <li>Process your login and manage your account.</li>
                <li>Improve and personalize the Service, including analyzing usage.</li>
                <li>Communicate with you, including sending service updates and marketing messages (with your consent).</li>
                <li>Respond to your inquiries and provide customer support.</li>
              </ul>
            </section>

            <section>
              <h3>4. How We Share Your Information</h3>
              <p>We do not sell your personal information. We may share information with:</p>
              <ul>
                <li>
                  <strong>Service Providers:</strong> Third-party vendors who help us operate our Service 
                  (e.g., cloud hosting, payment processing).
                </li>
                <li>
                  <strong>Legal Compliance:</strong> If required by law or to protect our rights.
                </li>
              </ul>
            </section>

            <section>
              <h3>5. Data Security</h3>
              <p>
                We implement industry-standard security measures to protect your information. However, no method of 
                transmission or storage is 100% secure.
              </p>
            </section>

            <section>
              <h3>6. Your Rights</h3>
              <p>
                Depending on your location (e.g., KVKK/GDPR), you may have rights to access, correct, update, or 
                request deletion of your personal information. Please contact us to exercise these rights.
              </p>
            </section>

            <section>
              <h3>7. Contact Us</h3>
              <p>
                If you have any questions about this Privacy Policy, please contact us at{' '}
                <a href="mailto:support@kremna.com">support@kremna.com</a>
              </p>
            </section>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button className="btn-secondary" onClick={onClose}>
              Close
            </button>
            {onAccept && (
              <button className="btn-primary" onClick={onAccept}>
                I have read and accept
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PrivacyModal;
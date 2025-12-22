// components/common/TermsModal.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TermsModal = ({ isOpen, onClose, onAccept }) => {
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
            <h2>Terms of Service</h2>
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
              <h3>1. Acceptance of Terms</h3>
              <p>
                By accessing or using the Kremna ("Service"), you agree to be bound by these Terms of Service ("Terms"). 
                If you do not agree to all of these Terms, do not use the Service.
              </p>
            </section>

            <section>
              <h3>2. Description of Service</h3>
              <p>
                Kremna provides an all-in-one platform to create and manage intelligent AI assistants. 
                You are responsible for all data, text, and content you upload or use to train your assistant ("User Content").
              </p>
            </section>

            <section>
              <h3>3. User Accounts</h3>
              <p>
                To use the Service, you must register for an account. You agree to provide accurate, current, and complete 
                information during the registration process, including your Full Name, Email Address, and Company Name. 
                You are responsible for safeguarding your password and for all activities that occur under your account.
              </p>
            </section>

            <section>
              <h3>4. Acceptable Use Policy</h3>
              <p>You agree not to use the Service to:</p>
              <ul>
                <li>Violate any laws or regulations.</li>
                <li>Infringe upon the rights of others (e.g., intellectual property, privacy).</li>
                <li>Transmit viruses, malware, or other harmful code.</li>
                <li>Attempt to reverse-engineer or disrupt the integrity of the Service.</li>
              </ul>
            </section>

            <section>
              <h3>5. Termination</h3>
              <p>
                We may suspend or terminate your access to the Service at any time, with or without cause, 
                if you violate these Terms. You may terminate your account at any time by contacting us.
              </p>
            </section>

            <section>
              <h3>6. Limitation of Liability</h3>
              <p>
                The Service is provided "as is." Kremna and its suppliers make no warranties, either express or implied, 
                about the Service. To the fullest extent permitted by law, Kremna shall not be liable for any indirect, 
                incidental, or consequential damages arising out of your use of the Service.
              </p>
            </section>

            <section>
              <h3>7. Changes to Terms</h3>
              <p>
                We reserve the right to modify these Terms at any time. We will notify you of any changes by posting 
                the new Terms on this page.
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

export default TermsModal;
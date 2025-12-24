/**
 * Google Tag Manager Analytics Utilities
 * Centralized event tracking for all user interactions
 */

// Initialize dataLayer if not already present
window.dataLayer = window.dataLayer || [];

/**
 * Generic event tracking function
 * @param {string} event - Event name
 * @param {Object} data - Additional event data
 */
export const trackEvent = (event, data = {}) => {
  try {
    window.dataLayer.push({
      event,
      ...data,
    });

    // Console log for debugging (remove in production)
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 GTM Event Tracked:', { event, ...data });
    }
  } catch (error) {
    console.error('❌ GTM Tracking Error:', error);
  }
};

/**
 * Track CTA button clicks
 * @param {string} buttonName - Name of the CTA button
 * @param {string} location - Where the button is located (e.g., 'header', 'hero')
 * @param {string} destination - Where the button leads to
 */
export const trackCTAClick = (buttonName, location, destination = '') => {
  trackEvent('cta_click', {
    event_category: 'engagement',
    event_action: 'click',
    event_label: buttonName,
    cta_location: location,
    cta_destination: destination,
  });
};

/**
 * Track user authentication events
 * @param {string} action - Type of auth action (login, signup, logout)
 * @param {string} status - Status of the action (success, failed)
 * @param {string} method - Auth method (email, google, etc.)
 */
export const trackAuthEvent = (action, status, method = 'email') => {
  trackEvent('user_authentication', {
    event_category: 'authentication',
    event_action: action,
    event_label: status,
    auth_method: method,
  });
};

/**
 * Track form interactions
 * @param {string} formName - Name of the form
 * @param {string} action - Form action (start, submit, error, abandon)
 * @param {string} errorType - Type of error if action is 'error'
 */
export const trackFormEvent = (formName, action, errorType = '') => {
  trackEvent('form_interaction', {
    event_category: 'forms',
    event_action: action,
    event_label: formName,
    form_error_type: errorType,
  });
};

/**
 * Track scroll depth
 * @param {number} depth - Scroll depth percentage (25, 50, 75, 100)
 * @param {string} page - Current page path
 */
export const trackScrollDepth = (depth, page) => {
  trackEvent('scroll_depth', {
    event_category: 'engagement',
    event_action: 'scroll',
    event_label: `${depth}%`,
    page_path: page,
  });
};

/**
 * Track page views (for SPA)
 * @param {string} pagePath - Page path
 * @param {string} pageTitle - Page title
 */
export const trackPageView = (pagePath, pageTitle) => {
  trackEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle,
  });
};

/**
 * Track navigation events
 * @param {string} from - Previous page
 * @param {string} to - Destination page
 * @param {string} trigger - What triggered the navigation
 */
export const trackNavigation = (from, to, trigger = 'click') => {
  trackEvent('navigation', {
    event_category: 'navigation',
    event_action: trigger,
    event_label: `${from} -> ${to}`,
    from_page: from,
    to_page: to,
  });
};

/**
 * Track link clicks (email, phone, etc.)
 * @param {string} linkType - Type of link (email, phone, external)
 * @param {string} linkValue - The actual link value
 * @param {string} location - Where the link is located
 */
export const trackLinkClick = (linkType, linkValue, location) => {
  trackEvent('link_click', {
    event_category: 'engagement',
    event_action: 'click',
    event_label: linkType,
    link_value: linkValue,
    link_location: location,
  });
};

/**
 * Track user profile events
 * @param {string} action - Action performed (view, edit, update)
 * @param {string} status - Status of action (success, failed)
 */
export const trackProfileEvent = (action, status) => {
  trackEvent('profile_interaction', {
    event_category: 'user_profile',
    event_action: action,
    event_label: status,
  });
};

/**
 * Track session data
 * @param {number} duration - Session duration in seconds
 * @param {number} pageViews - Number of pages viewed
 */
export const trackSessionEnd = (duration, pageViews) => {
  trackEvent('session_end', {
    event_category: 'engagement',
    event_action: 'session_end',
    session_duration: duration,
    page_views: pageViews,
  });
};

/**
 * Track errors
 * @param {string} errorType - Type of error
 * @param {string} errorMessage - Error message
 * @param {string} location - Where the error occurred
 */
export const trackError = (errorType, errorMessage, location) => {
  trackEvent('error', {
    event_category: 'errors',
    event_action: errorType,
    event_label: errorMessage,
    error_location: location,
  });
};

// Export all functions as default
export default {
  trackEvent,
  trackCTAClick,
  trackAuthEvent,
  trackFormEvent,
  trackScrollDepth,
  trackPageView,
  trackNavigation,
  trackLinkClick,
  trackProfileEvent,
  trackSessionEnd,
  trackError,
};

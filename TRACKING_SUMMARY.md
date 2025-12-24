# 📊 ملخص نظام التتبع - Kremna Landing Page

## ✅ الملفات التي تم إنشاؤها/تعديلها

### **ملفات جديدة:**
1. ✅ `src/utils/analytics.js` - مكتبة مركزية لتتبع الأحداث
2. ✅ `src/hooks/useScrollDepth.js` - Hook لتتبع عمق التمرير
3. ✅ `GTM_SETUP_GUIDE.md` - دليل شامل لإعداد GTM
4. ✅ `TRACKING_SUMMARY.md` - هذا الملف

### **ملفات معدلة:**
1. ✅ `index.html` - إضافة GTM Container
2. ✅ `src/App.jsx` - إضافة Page View و Scroll Depth Tracking
3. ✅ `src/components/sections/HeroSection.jsx` - تتبع أزرار CTA
4. ✅ `src/components/layout/Header.jsx` - تتبع Login/Logout/SignUp
5. ✅ `src/components/sections/ContactSection.jsx` - تتبع Email & Phone clicks
6. ✅ `src/components/auth/LoginForm.jsx` - تتبع أحداث Login
7. ✅ `src/components/auth/SignUpForm.jsx` - تتبع أحداث Sign Up

---

## 🎯 الأحداث المتتبعة (Events Tracked)

### **1. CTA Clicks (6 أزرار)**
```javascript
- "Let's Get Started" (Hero Section) → /signup
- "Read How It Works" (Hero Section) → #how-it-works
- "Log In" (Header) → /login
- "Sign Up" (Header) → /signup
- Email Link (Contact) → support@kremna.com
- Phone Link (Contact) → +905073818048
```

### **2. Authentication Events (5 أحداث)**
```javascript
- Login Success
- Login Failed
- Sign Up Success
- Sign Up Failed
- Logout Success
```

### **3. Form Events**
```javascript
- Form Submit (Login & SignUp)
- Validation Errors
- API Errors
```

### **4. Scroll Depth (4 مستويات)**
```javascript
- 25% scroll
- 50% scroll
- 75% scroll
- 100% scroll (bottom of page)
```

### **5. Page Views (6 صفحات)**
```javascript
- Home (/)
- Login (/login)
- Sign Up (/signup)
- Forgot Password (/forgot-password)
- Profile (/profile)
- 404 Error (*)
```

---

## 🔧 كيفية الاختبار

### **طريقة 1: Development Mode (Console Logs)**

1. شغل المشروع:
   ```bash
   npm run dev
   ```

2. افتح Console في المتصفح (F12)

3. قم بأي إجراء (مثل: اضغط زر، سجل دخول، امرر الصفحة)

4. ستشاهد رسائل مثل:
   ```javascript
   📊 GTM Event Tracked: {
     event: 'cta_click',
     event_category: 'engagement',
     event_action: 'click',
     event_label: "Let's Get Started",
     cta_location: 'hero_section',
     cta_destination: '/signup'
   }
   ```

---

### **طريقة 2: GTM Preview Mode**

1. افتح [Google Tag Manager](https://tagmanager.google.com/)
2. اختر Container: `GTM-PF3975V4`
3. اضغط **Preview**
4. أدخل URL: `http://localhost:5173`
5. سيفتح الموقع في Debug Mode
6. راقب الأحداث في نافذة Tag Assistant

---

### **طريقة 3: Google Analytics Real-Time**

1. افتح [Google Analytics](https://analytics.google.com/)
2. اذهب إلى **Reports** → **Real-time** → **Events**
3. قم بإجراءات على الموقع
4. شاهد الأحداث تظهر فوراً

---

## 📈 Data Layer Structure

جميع الأحداث تُرسل بهذا الشكل:

```javascript
window.dataLayer.push({
  event: 'event_name',           // اسم الحدث
  event_category: 'category',    // الفئة
  event_action: 'action',        // الإجراء
  event_label: 'label',          // التسمية
  // معلومات إضافية حسب نوع الحدث
  cta_location: 'location',      // للأزرار CTA
  cta_destination: 'path',       // للأزرار CTA
  auth_method: 'email',          // للمصادقة
  form_error_type: 'validation', // للنماذج
  page_path: '/path',            // لعرض الصفحات
  page_title: 'Title'            // لعرض الصفحات
});
```

---

## 🚀 الخطوات التالية

### **1. إعداد GTM (مطلوب)**
اتبع الدليل الكامل في: **[GTM_SETUP_GUIDE.md](GTM_SETUP_GUIDE.md)**

### **2. إنشاء Tags في GTM**
- GA4 Configuration Tag
- CTA Click Event Tag
- User Authentication Event Tag
- Form Interaction Event Tag
- Scroll Depth Event Tag
- Page View Event Tag
- Link Click Event Tag

### **3. إنشاء Triggers**
- Custom Event Triggers لكل نوع حدث
- All Pages Trigger للـ GA4 Config

### **4. إنشاء Variables**
- Data Layer Variables لكل parameter
- Built-in Variables (Page Path, Page URL, etc.)

### **5. اختبار ونشر**
1. اختبر باستخدام Preview Mode
2. تأكد من وصول الأحداث إلى GA4
3. اضغط **Submit** لنشر Container
4. راقب البيانات في GA4 Real-Time

---

## 📊 التقارير الموصى بها في GA4

بعد جمع البيانات، أنشئ هذه التقارير:

### **1. CTA Performance**
- أي الأزرار تحصل على أكثر clicks؟
- Conversion rate من كل CTA

### **2. User Funnel**
```
Page View (Home)
  → CTA Click (Let's Get Started)
    → Page View (Sign Up)
      → Form Submit
        → Sign Up Success/Failed
```

### **3. Authentication Analytics**
- Login Success Rate
- Sign Up Success Rate
- Most Common Errors

### **4. Engagement Metrics**
- Average Scroll Depth per Page
- Pages with best engagement
- Bounce Rate by Page

### **5. Contact Form Analysis**
- Email clicks vs Phone clicks
- Contact section engagement

---

## 🎓 نصائح مهمة

### **Production vs Development**
```javascript
// في Development Mode (npm run dev)
// سترى console logs: 📊 GTM Event Tracked...

// في Production Mode (npm run build)
// لن تظهر console logs (إلا إذا كانت errors)
```

### **Privacy & GDPR**
- ✅ لا نجمع PII (Personally Identifiable Information)
- ✅ لا نتتبع passwords أو sensitive data
- ✅ Email و Phone يُتتبعان كـ "link clicked" فقط
- ⚠️ إذا كان لديك مستخدمون في EU، فكر في Consent Management

### **Performance**
- ✅ Scroll Tracking مُحسَّن باستخدام throttling
- ✅ Events خفيفة ولا تؤثر على الأداء
- ✅ GTM يُحمَّل asynchronously

---

## 🔍 Troubleshooting

### **الأحداث لا تظهر في Console؟**
✅ تأكد من تشغيل المشروع في Development mode:
```bash
npm run dev
```

### **الأحداث تظهر في Console لكن ليس في GTM؟**
✅ تأكد من:
1. GTM Container ID صحيح: `GTM-PF3975V4`
2. استخدام Preview Mode في GTM
3. URL في Preview يطابق URL المشروع

### **الأحداث في GTM لكن ليس في GA4؟**
✅ تأكد من:
1. GA4 Configuration Tag منشور
2. Measurement ID صحيح: `G-RJP99ZX25S`
3. Events Tags تستخدم الـ Configuration Tag

---

## 📞 الدعم الفني

إذا واجهت مشاكل:

1. **تحقق من Console**: ابحث عن أخطاء JavaScript
2. **استخدم GTM Preview**: لمعرفة أي Tag لا يعمل
3. **GA4 DebugView**: لمعرفة إذا كانت الأحداث تصل
4. **راجع الدليل**: [GTM_SETUP_GUIDE.md](GTM_SETUP_GUIDE.md)

---

**تاريخ الإنشاء:** 2025-12-24
**الإصدار:** 1.0
**GTM Container:** GTM-PF3975V4
**GA4 Measurement ID:** G-RJP99ZX25S

# 📊 دليل إعداد Google Tag Manager - Kremna Landing Page

## ✅ ما تم إنجازه

تم تنفيذ نظام تتبع احترافي شامل باستخدام Google Tag Manager و Google Analytics 4:

### 1️⃣ **البنية التحتية**
- ✅ إضافة Google Tag Manager (GTM-PF3975V4) إلى `index.html`
- ✅ إنشاء `src/utils/analytics.js` - مكتبة مركزية لتتبع الأحداث
- ✅ إنشاء `src/hooks/useScrollDepth.js` - Hook لتتبع عمق التمرير
- ✅ تفعيل Page View Tracking في `App.jsx`

### 2️⃣ **الأحداث المتتبعة**

#### **أ) أزرار CTA (Call-to-Action)**
| الزر | الموقع | Event Name | Destination |
|-----|--------|-----------|-------------|
| Let's Get Started | Hero Section | `cta_click` | /signup |
| Read How It Works | Hero Section | `cta_click` | #how-it-works |
| Log In | Header | `cta_click` | /login |
| Sign Up | Header | `cta_click` | /signup |
| Email Link | Contact Section | `link_click` | support@kremna.com |
| Phone Link | Contact Section | `link_click` | +905073818048 |

#### **ب) أحداث المصادقة (Authentication)**
| Event | Event Name | Category | Status |
|-------|-----------|----------|--------|
| تسجيل دخول ناجح | `user_authentication` | authentication | success |
| تسجيل دخول فاشل | `user_authentication` | authentication | failed |
| تسجيل جديد ناجح | `user_authentication` | authentication | success |
| تسجيل جديد فاشل | `user_authentication` | authentication | failed |
| تسجيل خروج | `user_authentication` | authentication | success |

#### **ج) أحداث النماذج (Forms)**
| Form | Event Name | Actions Tracked |
|------|-----------|-----------------|
| Login Form | `form_interaction` | submit, error, validation_error, api_error |
| Sign Up Form | `form_interaction` | submit, error, validation_error, api_error |

#### **د) Scroll Depth Tracking**
| Depth | Event Name | Tracked At |
|-------|-----------|-----------|
| 25% | `scroll_depth` | User scrolls 25% of page |
| 50% | `scroll_depth` | User scrolls 50% of page |
| 75% | `scroll_depth` | User scrolls 75% of page |
| 100% | `scroll_depth` | User scrolls to bottom |

#### **هـ) Page Views**
| Page | Path | Event Name |
|------|------|-----------|
| Home | `/` | `page_view` |
| Login | `/login` | `page_view` |
| Sign Up | `/signup` | `page_view` |
| Forgot Password | `/forgot-password` | `page_view` |
| Profile | `/profile` | `page_view` |
| 404 Error | `/*` | `page_view` |

---

## 🚀 خطوات الإعداد في Google Tag Manager

### **الخطوة 1: تفعيل Google Analytics 4**

1. افتح [Google Tag Manager Console](https://tagmanager.google.com/)
2. اختر Container: `GTM-PF3975V4`
3. اذهب إلى **Tags** → **New**
4. اضغط على **Tag Configuration**
5. اختر **Google Analytics: GA4 Configuration**
6. أدخل Measurement ID: `G-RJP99ZX25S`
7. في **Triggering**، اختر `All Pages`
8. احفظ باسم: `GA4 - Configuration`

---

### **الخطوة 2: إنشاء Data Layer Variables**

اذهب إلى **Variables** → **New** → **User-Defined Variables**

أنشئ المتغيرات التالية:

| Variable Name | Type | Data Layer Variable Name |
|--------------|------|-------------------------|
| `DL - Event Category` | Data Layer Variable | `event_category` |
| `DL - Event Action` | Data Layer Variable | `event_action` |
| `DL - Event Label` | Data Layer Variable | `event_label` |
| `DL - CTA Location` | Data Layer Variable | `cta_location` |
| `DL - CTA Destination` | Data Layer Variable | `cta_destination` |
| `DL - Auth Method` | Data Layer Variable | `auth_method` |
| `DL - Form Error Type` | Data Layer Variable | `form_error_type` |
| `DL - Page Path` | Data Layer Variable | `page_path` |
| `DL - Page Title` | Data Layer Variable | `page_title` |

---

### **الخطوة 3: إنشاء Custom Events Triggers**

اذهب إلى **Triggers** → **New** → **Custom Event**

أنشئ الـ Triggers التالية:

| Trigger Name | Event Name | Type |
|-------------|-----------|------|
| `CE - CTA Click` | `cta_click` | Custom Event |
| `CE - User Authentication` | `user_authentication` | Custom Event |
| `CE - Form Interaction` | `form_interaction` | Custom Event |
| `CE - Scroll Depth` | `scroll_depth` | Custom Event |
| `CE - Page View` | `page_view` | Custom Event |
| `CE - Link Click` | `link_click` | Custom Event |

---

### **الخطوة 4: إنشاء GA4 Event Tags**

#### **1. CTA Click Event**
- **Tag Type**: Google Analytics: GA4 Event
- **Configuration Tag**: `GA4 - Configuration`
- **Event Name**: `cta_click`
- **Event Parameters**:
  - `event_category`: `{{DL - Event Category}}`
  - `event_action`: `{{DL - Event Action}}`
  - `event_label`: `{{DL - Event Label}}`
  - `cta_location`: `{{DL - CTA Location}}`
  - `cta_destination`: `{{DL - CTA Destination}}`
- **Trigger**: `CE - CTA Click`

#### **2. User Authentication Event**
- **Tag Type**: Google Analytics: GA4 Event
- **Configuration Tag**: `GA4 - Configuration`
- **Event Name**: `user_authentication`
- **Event Parameters**:
  - `event_category`: `{{DL - Event Category}}`
  - `event_action`: `{{DL - Event Action}}`
  - `event_label`: `{{DL - Event Label}}`
  - `auth_method`: `{{DL - Auth Method}}`
- **Trigger**: `CE - User Authentication`

#### **3. Form Interaction Event**
- **Tag Type**: Google Analytics: GA4 Event
- **Configuration Tag**: `GA4 - Configuration`
- **Event Name**: `form_interaction`
- **Event Parameters**:
  - `event_category`: `{{DL - Event Category}}`
  - `event_action`: `{{DL - Event Action}}`
  - `event_label`: `{{DL - Event Label}}`
  - `form_error_type`: `{{DL - Form Error Type}}`
- **Trigger**: `CE - Form Interaction`

#### **4. Scroll Depth Event**
- **Tag Type**: Google Analytics: GA4 Event
- **Configuration Tag**: `GA4 - Configuration`
- **Event Name**: `scroll_depth`
- **Event Parameters**:
  - `event_category`: `{{DL - Event Category}}`
  - `event_action`: `{{DL - Event Action}}`
  - `event_label`: `{{DL - Event Label}}`
  - `page_path`: `{{DL - Page Path}}`
- **Trigger**: `CE - Scroll Depth`

#### **5. Page View Event**
- **Tag Type**: Google Analytics: GA4 Event
- **Configuration Tag**: `GA4 - Configuration`
- **Event Name**: `page_view`
- **Event Parameters**:
  - `page_path`: `{{DL - Page Path}}`
  - `page_title`: `{{DL - Page Title}}`
- **Trigger**: `CE - Page View`

#### **6. Link Click Event**
- **Tag Type**: Google Analytics: GA4 Event
- **Configuration Tag**: `GA4 - Configuration`
- **Event Name**: `link_click`
- **Event Parameters**:
  - `event_category`: `{{DL - Event Category}}`
  - `event_action`: `{{DL - Event Action}}`
  - `event_label`: `{{DL - Event Label}}`
  - `link_value`: `{{DL - Link Value}}`
  - `link_location`: `{{DL - Link Location}}`
- **Trigger**: `CE - Link Click`

---

### **الخطوة 5: إضافة متغير Link Value**

في **Variables** → **New**:
- **Variable Name**: `DL - Link Value`
- **Type**: Data Layer Variable
- **Data Layer Variable Name**: `link_value`

وكذلك:
- **Variable Name**: `DL - Link Location`
- **Type**: Data Layer Variable
- **Data Layer Variable Name**: `link_location`

---

## 🧪 اختبار التتبع

### **1. استخدام GTM Preview Mode**

1. في Google Tag Manager، اضغط على **Preview**
2. أدخل URL الموقع: `http://localhost:5173` (أو عنوان الموقع)
3. سيفتح الموقع في وضع التصحيح
4. في نافذة GTM Debug، ستشاهد جميع الأحداث المُطلقة

### **2. اختبار الأحداث**

قم بالتحقق من الأحداث التالية:

#### **أ) CTA Clicks**
- ✅ اضغط على "Let's Get Started" في Hero Section
- ✅ اضغط على "Log In" في Header
- ✅ اضغط على "Sign Up" في Header
- ✅ اضغط على Email في Contact Section
- ✅ اضغط على Phone في Contact Section

#### **ب) Authentication Events**
- ✅ سجل دخول بمعلومات خاطئة (يجب أن ترى `user_authentication` مع `status: failed`)
- ✅ سجل دخول بمعلومات صحيحة (يجب أن ترى `user_authentication` مع `status: success`)
- ✅ سجل خروج (يجب أن ترى `user_authentication` مع `action: logout`)
- ✅ سجل حساب جديد

#### **ج) Scroll Depth**
- ✅ امرر الصفحة لـ 25% (يجب أن ترى `scroll_depth` مع `label: 25%`)
- ✅ امرر لـ 50%, 75%, 100%

#### **د) Page Views**
- ✅ انتقل بين الصفحات المختلفة
- ✅ تحقق من إطلاق `page_view` لكل صفحة

### **3. التحقق في Google Analytics Real-Time**

1. افتح [Google Analytics](https://analytics.google.com/)
2. اذهب إلى **Reports** → **Real-time**
3. قم بتنفيذ الأحداث على الموقع
4. يجب أن تظهر الأحداث فوراً في Real-Time Report

---

## 📈 التقارير المتاحة في GA4

بعد جمع البيانات، ستتمكن من إنشاء التقارير التالية:

### **1. CTA Performance Report**
- أي الأزرار تحصل على أكثر النقرات؟
- ما هي معدلات التحويل من كل CTA؟

### **2. User Journey Analysis**
- كيف يتنقل المستخدمون في الموقع؟
- ما هي المسارات الأكثر شيوعاً؟

### **3. Authentication Funnel**
- كم مستخدم بدأ عملية التسجيل؟
- كم منهم أكمل التسجيل بنجاح؟
- ما هي نسبة الفشل؟

### **4. Form Analytics**
- ما هي الأخطاء الأكثر شيوعاً؟
- أين يتعثر المستخدمون في النماذج؟

### **5. Engagement Metrics**
- ما هو متوسط عمق التمرير لكل صفحة؟
- كم مستخدم وصل لنهاية الصفحة؟

---

## 🔧 Troubleshooting

### **المشكلة: الأحداث لا تظهر في GTM Preview**

**الحل:**
1. تأكد من أن الكود يعمل في Development Mode
2. افتح Console في المتصفح وابحث عن رسائل:
   ```
   📊 GTM Event Tracked: { event: 'cta_click', ... }
   ```
3. تأكد من أن GTM Container ID صحيح: `GTM-PF3975V4`

### **المشكلة: الأحداث تظهر في GTM لكن لا تصل إلى GA4**

**الحل:**
1. تأكد من إعداد GA4 Configuration Tag
2. تأكد من أن Measurement ID صحيح: `G-RJP99ZX25S`
3. تحقق من أن جميع Tags تستخدم `GA4 - Configuration` كـ Configuration Tag

### **المشكلة: Scroll Depth لا يعمل**

**الحل:**
1. تأكد من استيراد `useScrollDepth` في `App.jsx`
2. تأكد من أن Hook يعمل داخل Router Context

---

## 📝 ملاحظات مهمة

1. **Privacy & GDPR**: النظام الحالي لا يجمع معلومات شخصية حساسة
2. **Development Mode**: في وضع التطوير، ستظهر رسائل تتبع في Console
3. **Production Mode**: في Production، الرسائل لن تظهر في Console
4. **Data Retention**: تأكد من ضبط إعدادات Data Retention في GA4

---

## 🎯 الخطوات التالية

1. ✅ تفعيل جميع Tags في GTM Console
2. ✅ اختبار جميع الأحداث باستخدام Preview Mode
3. ✅ نشر Container في GTM (اضغط **Submit**)
4. ✅ التحقق من البيانات في GA4 Real-Time
5. ✅ إنشاء Custom Reports في GA4
6. ✅ إعداد Conversion Goals
7. ✅ ضبط Consent Mode (إذا لزم الأمر للـ GDPR)

---

## 📞 الدعم

إذا واجهت أي مشاكل:
1. تحقق من Console للبحث عن أخطاء
2. استخدم GTM Preview Mode للتصحيح
3. راجع GA4 DebugView للتحقق من الأحداث

---

**تم إنشاء هذا الدليل بواسطة:** Claude Code
**التاريخ:** 2025-12-24
**الإصدار:** 1.0

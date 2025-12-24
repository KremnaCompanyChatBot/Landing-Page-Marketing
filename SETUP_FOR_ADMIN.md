# 🎯 دليل سريع لمسؤول Google Tag Manager

## معلومات الحساب
- **GTM Container ID**: `GTM-PF3975V4`
- **GA4 Measurement ID**: `G-RJP99ZX25S`

---

## ✅ الخطوة 1: تفعيل Google Analytics 4

1. افتح [Google Tag Manager Console](https://tagmanager.google.com/)
2. اختر Container: `GTM-PF3975V4`
3. اذهب إلى **Tags** → اضغط **New**
4. **Tag Configuration**:
   - النوع: **Google Analytics: GA4 Configuration**
   - Measurement ID: `G-RJP99ZX25S`
5. **Triggering**: اختر `All Pages`
6. احفظ باسم: `GA4 - Configuration`

---

## ✅ الخطوة 2: إنشاء Data Layer Variables

اذهب إلى **Variables** → **User-Defined Variables** → **New**

أنشئ هذه المتغيرات (كل واحد منفصل):

| اسم المتغير | النوع | Data Layer Variable Name |
|------------|------|-------------------------|
| DL - Event Category | Data Layer Variable | `event_category` |
| DL - Event Action | Data Layer Variable | `event_action` |
| DL - Event Label | Data Layer Variable | `event_label` |
| DL - CTA Location | Data Layer Variable | `cta_location` |
| DL - CTA Destination | Data Layer Variable | `cta_destination` |
| DL - Auth Method | Data Layer Variable | `auth_method` |
| DL - Form Error Type | Data Layer Variable | `form_error_type` |
| DL - Page Path | Data Layer Variable | `page_path` |
| DL - Page Title | Data Layer Variable | `page_title` |
| DL - Link Value | Data Layer Variable | `link_value` |
| DL - Link Location | Data Layer Variable | `link_location` |

**كيف تنشئ متغير:**
1. اضغط **New**
2. اختر **Variable Configuration** → **Data Layer Variable**
3. في خانة **Data Layer Variable Name**، أدخل الاسم من الجدول (بدون `DL - `)
4. احفظ باسم المتغير من الجدول

---

## ✅ الخطوة 3: إنشاء Custom Event Triggers

اذهب إلى **Triggers** → **New** → **Custom Event**

أنشئ هذه الـ Triggers:

| اسم الـ Trigger | Event Name |
|----------------|-----------|
| CE - CTA Click | `cta_click` |
| CE - User Authentication | `user_authentication` |
| CE - Form Interaction | `form_interaction` |
| CE - Scroll Depth | `scroll_depth` |
| CE - Page View | `page_view` |
| CE - Link Click | `link_click` |

**كيف تنشئ Trigger:**
1. اضغط **New**
2. اختر **Trigger Configuration** → **Custom Event**
3. في **Event name**، أدخل Event Name من الجدول
4. احفظ باسم الـ Trigger من الجدول

---

## ✅ الخطوة 4: إنشاء Event Tags (مهم جداً!)

الآن أنشئ 6 Tags للأحداث:

### **Tag 1: CTA Click Event**
1. اذهب إلى **Tags** → **New**
2. **Tag Configuration**:
   - النوع: **Google Analytics: GA4 Event**
   - Configuration Tag: اختر `GA4 - Configuration`
   - Event Name: اكتب `cta_click`
   - **Event Parameters** (اضغط Add Row لكل parameter):
     - Parameter Name: `event_category` | Value: `{{DL - Event Category}}`
     - Parameter Name: `event_action` | Value: `{{DL - Event Action}}`
     - Parameter Name: `event_label` | Value: `{{DL - Event Label}}`
     - Parameter Name: `cta_location` | Value: `{{DL - CTA Location}}`
     - Parameter Name: `cta_destination` | Value: `{{DL - CTA Destination}}`
3. **Triggering**: اختر `CE - CTA Click`
4. احفظ باسم: `GA4 - CTA Click`

---

### **Tag 2: User Authentication Event**
1. **Tags** → **New**
2. **Tag Configuration**:
   - النوع: **Google Analytics: GA4 Event**
   - Configuration Tag: `GA4 - Configuration`
   - Event Name: `user_authentication`
   - **Event Parameters**:
     - `event_category` → `{{DL - Event Category}}`
     - `event_action` → `{{DL - Event Action}}`
     - `event_label` → `{{DL - Event Label}}`
     - `auth_method` → `{{DL - Auth Method}}`
3. **Triggering**: `CE - User Authentication`
4. احفظ باسم: `GA4 - User Authentication`

---

### **Tag 3: Form Interaction Event**
1. **Tags** → **New**
2. **Tag Configuration**:
   - النوع: **Google Analytics: GA4 Event**
   - Configuration Tag: `GA4 - Configuration`
   - Event Name: `form_interaction`
   - **Event Parameters**:
     - `event_category` → `{{DL - Event Category}}`
     - `event_action` → `{{DL - Event Action}}`
     - `event_label` → `{{DL - Event Label}}`
     - `form_error_type` → `{{DL - Form Error Type}}`
3. **Triggering**: `CE - Form Interaction`
4. احفظ باسم: `GA4 - Form Interaction`

---

### **Tag 4: Scroll Depth Event**
1. **Tags** → **New**
2. **Tag Configuration**:
   - النوع: **Google Analytics: GA4 Event**
   - Configuration Tag: `GA4 - Configuration`
   - Event Name: `scroll_depth`
   - **Event Parameters**:
     - `event_category` → `{{DL - Event Category}}`
     - `event_action` → `{{DL - Event Action}}`
     - `event_label` → `{{DL - Event Label}}`
     - `page_path` → `{{DL - Page Path}}`
3. **Triggering**: `CE - Scroll Depth`
4. احفظ باسم: `GA4 - Scroll Depth`

---

### **Tag 5: Page View Event**
1. **Tags** → **New**
2. **Tag Configuration**:
   - النوع: **Google Analytics: GA4 Event**
   - Configuration Tag: `GA4 - Configuration`
   - Event Name: `page_view`
   - **Event Parameters**:
     - `page_path` → `{{DL - Page Path}}`
     - `page_title` → `{{DL - Page Title}}`
3. **Triggering**: `CE - Page View`
4. احفظ باسم: `GA4 - Page View`

---

### **Tag 6: Link Click Event**
1. **Tags** → **New**
2. **Tag Configuration**:
   - النوع: **Google Analytics: GA4 Event**
   - Configuration Tag: `GA4 - Configuration`
   - Event Name: `link_click`
   - **Event Parameters**:
     - `event_category` → `{{DL - Event Category}}`
     - `event_action` → `{{DL - Event Action}}`
     - `event_label` → `{{DL - Event Label}}`
     - `link_value` → `{{DL - Link Value}}`
     - `link_location` → `{{DL - Link Location}}`
3. **Triggering**: `CE - Link Click`
4. احفظ باسم: `GA4 - Link Click`

---

## ✅ الخطوة 5: اختبار ونشر

### **الاختبار:**
1. في GTM، اضغط **Preview** (زر في الزاوية اليمنى العليا)
2. أدخل URL الموقع (مثلاً: https://yourwebsite.com)
3. سيفتح الموقع في وضع Debug
4. قم بإجراءات على الموقع (اضغط أزرار، امرر الصفحة، إلخ)
5. في نافذة Tag Assistant، تحقق من:
   - ✅ Tags تُطلق بشكل صحيح
   - ✅ Variables تحتوي على القيم الصحيحة
   - ✅ لا توجد أخطاء

### **النشر:**
1. إذا كل شيء يعمل بشكل صحيح، اضغط **Submit** (أعلى اليمين)
2. أضف وصفاً للـ Version: `Initial GTM setup with GA4 tracking`
3. اضغط **Publish**

---

## ✅ التحقق من Google Analytics

بعد النشر:
1. افتح [Google Analytics](https://analytics.google.com/)
2. اذهب إلى **Reports** → **Real-time**
3. افتح الموقع في تبويب آخر
4. قم بإجراءات على الموقع
5. يجب أن ترى الأحداث تظهر في Real-Time Reports

---

## 📊 الأحداث المتتبعة

بعد الإعداد، ستتتبع هذه الأحداث تلقائياً:

### **CTA Buttons:**
- Let's Get Started
- Read How It Works
- Log In
- Sign Up
- Email Click
- Phone Click

### **Authentication:**
- Login Success/Failed
- Sign Up Success/Failed
- Logout

### **Forms:**
- Form Submissions
- Validation Errors
- API Errors

### **Engagement:**
- Page Views (كل الصفحات)
- Scroll Depth (25%, 50%, 75%, 100%)

---

## 🆘 المساعدة

إذا واجهت مشاكل:
1. تحقق من GTM Preview Mode
2. ابحث عن أخطاء في Console
3. راجع الدليل الشامل: `GTM_SETUP_GUIDE.md`

---

**الوقت المتوقع للإعداد:** 30-45 دقيقة

**تاريخ الإنشاء:** 2025-12-24

# كيفية معرفة سبب الـ 500 Error في الـ Backend

## المشكلة:
- `/api/register` و `/api/login` يعطيان **500 Internal Server Error**
- هذا يعني أن **كود الـ backend فيه مشكلة**

---

## الخطوات لمعرفة السبب:

### 1. SSH إلى الـ Server
```bash
ssh root@104.248.192.222
# أو
ssh username@104.248.192.222
```

### 2. فحص الـ Backend Logs

#### إذا كان الـ Backend يستخدم PM2:
```bash
pm2 logs
# أو
pm2 logs [app-name] --lines 100
```

#### إذا كان الـ Backend يستخدم systemd:
```bash
journalctl -u [service-name] -f
# مثال:
journalctl -u node-app -f
```

#### فحص Nginx Error Logs:
```bash
tail -f /var/log/nginx/error.log
```

#### فحص Application Logs:
```bash
# إذا كان Node.js
tail -f /var/www/api/logs/error.log

# إذا كان Laravel
tail -f /var/www/api/storage/logs/laravel.log
```

---

## الأخطاء المتوقعة في الـ Logs:

### 1. Database Connection Error:
```
Error: connect ECONNREFUSED 127.0.0.1:5432
MongoNetworkError: failed to connect to server
MySQL connection error
```
**الحل:** تشغيل الـ database أو تصحيح connection string

### 2. Missing Environment Variables:
```
TypeError: Cannot read property 'JWT_SECRET' of undefined
process.env.DATABASE_URL is undefined
```
**الحل:** إضافة المتغيرات الناقصة في `.env`

### 3. Validation Error:
```
ValidationError: "firstName" is required
Missing required field: company
```
**الحل:** تصحيح validation rules في الـ backend

### 4. Missing Package:
```
Error: Cannot find module 'bcrypt'
Module not found: 'jsonwebtoken'
```
**الحل:** تثبيت الـ packages:
```bash
npm install bcrypt jsonwebtoken
```

---

## الحلول الشائعة:

### تأكد من تشغيل الـ Database:
```bash
# PostgreSQL
sudo systemctl status postgresql
sudo systemctl start postgresql

# MySQL
sudo systemctl status mysql
sudo systemctl start mysql

# MongoDB
sudo systemctl status mongod
sudo systemctl start mongod
```

### تأكد من وجود .env file:
```bash
cd /var/www/api  # أو مسار الـ backend
cat .env
```

### إعادة تشغيل الـ Backend:
```bash
# إذا كان PM2
pm2 restart all

# إذا كان systemd
sudo systemctl restart [service-name]
```

---

## إذا لم تستطع الوصول للـ Server:

أرسل هذه الأسئلة لمطور الـ Backend:

1. **ما هي رسالة الخطأ في الـ server logs؟**
2. **هل الـ database يعمل ومتصل؟**
3. **هل الـ environment variables (.env) مُعَدَّة بشكل صحيح؟**
4. **هل endpoints أخرى تعمل؟** (مثلاً `/api/user` يعمل ويعطي 401)
5. **هل الـ /api/register endpoint تم اختباره من قبل؟**

---

## معلومات مفيدة للـ Backend Developer:

### الـ Frontend جاهز وصحيح:
- ✅ CORS مُحَل
- ✅ Form validation يعمل
- ✅ Data يُرسَل بشكل صحيح
- ✅ Token storage جاهز

### البيانات المُرسَلة من الـ Frontend:
```json
{
  "firstName": "Test",
  "lastName": "User",
  "email": "test@example.com",
  "company": "TestCo",
  "password": "password123"
}
```

### Endpoints التي لا تعمل:
- ❌ `POST /api/register` → 500 Error
- ❌ `POST /api/login` → 500 Error

### Endpoints التي تعمل:
- ✅ `GET /api/user` → 401 Unauthorized (صحيح)
- ✅ `GET /api/google` → Redirect to Google OAuth (يعمل)

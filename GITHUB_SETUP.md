# 📋 خطوات رفع المشروع على GitHub

## 1. إنشاء حساب GitHub
- اذهب إلى https://github.com
- سجل حساب جديد (مجاني)

## 2. إنشاء مستودع جديد
- اضغط "New Repository"
- اسم المستودع: spac-ai-pro
- اجعله Public
- لا تضف README (لدينا واحد)

## 3. رفع الملفات

### الطريقة A: عبر الموقع (الأسهل)
1. اضغط "uploading an existing file"
2. اسحب جميع ملفات المشروع
3. اضغط "Commit changes"

### الطريقة B: عبر Terminal
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/spac-ai-pro.git
git push -u origin main
```

## 4. ربط Expo Snack
1. اذهب إلى https://snack.expo.dev
2. سجل دخول بحساب GitHub
3. اضغط "Import from GitHub"
4. اختر المستودع: your-username/spac-ai-pro
5. سيظهر QR Code تلقائياً

## 5. مشاركة QR Code
- انسخ رابط Snack
- أو امسح QR Code مباشرة
- أرسله لأي شخص

## ✅ التطبيق جاهز للمشاركة!

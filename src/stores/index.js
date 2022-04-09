import { defineStore } from 'pinia';

// server route
var url = '';
if ( process.env.NODE_ENV === 'production' ) url = 'https://api.yaroofie.ir/';
else url = 'http://localhost/';
// end

export const useStore = defineStore( {
  id: 'store',
  state: () => ( {
  } ),
  getters: {
    web ()
    {
      return url;
    },
    api ()
    {
      return url + "api/";
    },
    name ()
    {
      return "HistoMe";
    },
    languages ()
    {
      return [
        {
          id: 'fa',
          name: 'فارسی',
          dir: 'rtl'
        },
        {
          id: 'en',
          name: 'English',
          dir: 'ltr'
        }
      ];
    },
    dictionary ()
    {
      return [
        { lang: "fa", key: "Sign-in", value: "ورود", },
        { lang: "fa", key: "Register", value: "ثبت نام", },
        { lang: "fa", key: "Profile", value: "پروفایل", },
        { lang: "fa", key: "Logout", value: "خروج", },
        { lang: "fa", key: "Login form", value: "فرم ورود", },
        { lang: "fa", key: "Use this form to login", value: "از این فرم برای ورود استفاده کنید", },
        { lang: "fa", key: "Email", value: "ایمیل", },
        { lang: "fa", key: "Password", value: "رمز عبور", },
        { lang: "fa", key: "Forgot your password ?", value: "رمز عبور خود را فراموش کرده اید؟", },
        { lang: "fa", key: "Sending", value: "در حال ارسال", },
        { lang: "fa", key: "Login", value: "ورود", },
        { lang: "fa", key: "Please fill the form currectly", value: "لطفا فرم را به درستی پر کنید", },
        { lang: "fa", key: "Error", value: "خطا", },
        { lang: "fa", key: "Getting user information", value: "در حال دریافت اطلاعات کاربر", },
        { lang: "fa", key: "Logging in", value: "در حال ورود", },
        { lang: "fa", key: "Registering", value: "در حال ثبت نام", },
        { lang: "fa", key: "Logging out", value: "در حال خروج", },
        { lang: "fa", key: "Updating your password", value: "در حال به روز رسانی رمز عبور", },
        { lang: "fa", key: "Username", value: "نام کاربری", },
        { lang: "fa", key: "get reset link", value: "دریافت لینک بازیابی", },
        { lang: "fa", key: "Current Password", value: "رمز عبور فعلی", },
        { lang: "fa", key: "New Password", value: "رمز عبور جدید", },
        { lang: "fa", key: "Confirm Password", value: "تایید رمز عبور", },
        { lang: "fa", key: "Update Password", value: "به روز رسانی رمز عبور", },
        { lang: "fa", key: "Are you ready to start another beautiful and productive day ?", value: "آیا آماده به شروع روز جدید خوب و بهتری هستید؟", },
        { lang: "fa", key: "Please wait", value: "لطفا منتظر بمانید", },
        { lang: "fa", key: "I'm ready", value: "بزن بریم", },
        { lang: "fa", key: "Select Standard", value: "انتخاب استاندارد", },
        { lang: "fa", key: "Standard", value: "استاندارد", },
        { lang: "fa", key: "Description", value: "توضیحات", },
        { lang: "fa", key: "Time", value: "زمان", },
        { lang: "fa", key: "how many 15 minutes did you spent ?", value: "چندتا 15 دقیقه صرف این کار کردی ؟", },
        { lang: "fa", key: "how many ?", value: "چندتا؟", },
        { lang: "fa", key: "Update", value: "به روز رسانی", },
        { lang: "fa", key: "Create", value: "ایجاد", },
        { lang: "fa", key: "Name", value: "نام", },
        { lang: "fa", key: "Type", value: "نوع", },
        { lang: "fa", key: "Countable", value: "شمارشی", },
        { lang: "fa", key: "It consumes time", value: "زمان می برد" },
        { lang: "fa", key: "How many xp does it have ?", value: "چند xp داره؟", },
        { lang: "fa", key: "Dashboard", value: "داشبورد", },
        { lang: "fa", key: "Productivities", value: "فعالیت ها" },
        { lang: "fa", key: "Standards", value: "استانداردها" },
        { lang: "fa", key: "NO DESCRIPTION", value: "بدون توضیحات" },
        { lang: "fa", key: "Delete", value: "حذف" },
        { lang: "fa", key: "Enter your email to reset your password", value: "لطفا ایمیل خود را وارد کنید تا رمز عبور خود را بازیابی کنید", },
        { lang: "fa", key: "Registeration Form", value: "فرم ثبت نام", },
        { lang: "fa", key: "Use this form to register", value: "از این فرم برای ثبت نام استفاده کنید", },
        { lang: "fa", key: "This field is required", value: "این فیلد الزامی است" },
      ];
    }
  }
} );
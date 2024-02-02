import axios from "axios";
import { useEffect, useState } from "react";



const remindersLang = (state = [], action) => {

    //  here we should replace all this data by data from backEnd


    const useShareState = () => {
        const [lang, setLang] = useState('en')

        const arraylang = [
            // Header => 0
            {
                "Delivery_requests": lang == 'en' ? "Delivery requests" : "طلبات التوصيل",
                "Delivery_request": lang == 'en' ? "Delivery request" : "طلب التوصيل",
                "Goods": lang == 'en' ? "Goods" : "البضائع",
                "Services": lang == 'en' ? "Services" : " الخدمات",
                "Contact_Us": lang == 'en' ? "Contact Us" : "تواصل معنا",
                "Tracking_cars": lang == 'en' ? "Tracking cars" : "تتبع السيارات",
                "Log_In": lang == 'en' ? "Log In" : "تسجيل دخول",
                "Log_Out": lang == 'en' ? "Log Out" : "تسجيل خروج",


            },
            // Footer => 1
            {
                "Quick_Links": lang == 'en' ? "Quick Links" : "روابط سريعة",
                "About_Us": lang == 'en' ? "About Us" : "معلومات عنا",
                "AboutUsCont": lang == 'en' ? "a company  that delivers all types of orders throughout the UAE 🚕  , in addition to the feature of REFRIGERATED during delivery ❄️" : "شركة توصيل كافة انواع الطلبات في جميع انحاء الامارات العربية المتحدة🚕 بالاضافة الى ميزة التبريد اثناء التوصيل ❄️",
                "All_Rights_Reserved": lang == 'en' ? "All Rights Reserved" : "جميع الحقوق محفوظة",


            },
            // Delivery request  => 2
            {
                "Delivery_request_title": lang == 'en' ? "Your delivery " : "طلب التوصيل ",
                "Delivery_request_title1": lang == 'en' ? " request" : " الخاص بك",
                "Delivery_request_suptitle": lang == 'en' ? "Please enter all fields to help us reach you, and specify exactly what you want" : "الرجاء ادخال جميع الحقول لمساعدتنا في الوصول إليك, و تحديد ما تريد بدقة ",
                "err": lang == 'en' ? "Please Enter All Data" : "الرجاء ادخال جميع البيانات",
                "Your_Information": lang == 'en' ? "Your Information" : "معلوماتك الخاصة",
                "Full_Name": lang == 'en' ? "Full Name" : "الاسم الكامل",
                "Feild_Full_Name": lang == 'en' ? "Enter Your Full Name..." : " ادخل اسمك الكامل...",
                "Mobile_Fax": lang == 'en' ? "Mobile / Fax" : " موبايل/ فاكس",
                "Field_Mobile_Fax": lang == 'en' ? "Enter Your Mobile / Fax..." : "ادخل رقمك موبايل/ فاكس...",
                "Delivery_Details": lang == 'en' ? "Delivery Details" : "تفاصيل الطلب",
                "From": lang == 'en' ? "From Where?" : "من اين ؟",
                "To": lang == 'en' ? "To Where?" : "الى اين؟",
                "FieldFromCity": lang == 'en' ? "City" : "المدينة",
                "Location_link": lang == 'en' ? " Location link" : "رابط المكان",
                "details": lang == 'en' ? "Details you want to add" : "تفاصيل تريد اضافتها",
                "detailsCont": lang == 'en' ? "Enter the details of the items..." : "ادخل تفاصيل الغرض...",
                "Send": lang == 'en' ? "Send" : "ارسال",
                "Abu_Dhabi": lang == 'en' ? "Abu Dhabi" : "ابو ظبي",
                "Dubai": lang == 'en' ? "Dubai" : "دبي",
                "Ajman": lang == 'en' ? "Ajman" : "عجمان",
                "Sharjah": lang == 'en' ? "Sharjah" : "الشارقة",
                "Fujairah": lang == 'en' ? "Fujairah" : "الفجيرة",
                "Umm_Al_Qaiwain": lang == 'en' ? "Umm Al Qaiwain" : "ام القيوين",
                "Ras_Al_Khaimah": lang == 'en' ? "Ras Al Khaimah" : "رأس الخيمة",
                "alert1": lang == 'en' ? "Working 24 hours" : "نعمل 24 ساعة",
                "alert2": lang == 'en' ? "We have received your order" : "لقد استلمنا طلبك",
                "alert3": lang == 'en' ? "We will contact you within a few minutes" : "سوف نقوم بالتواصل معك خلال دقائق",






            },
            // Goods  => 3
            {
                "Search": lang == 'en' ? "Search..." : "بحث...",
                "No_Goods": lang == 'en' ? "No Goods!!" : "لا توجد بضائع!!",
                "AddBtn": lang == 'en' ? "Add" : "اضافة",
                "EditBtn": lang == 'en' ? "Edit" : "تعديل",
                "CloseBtn": lang == 'en' ? "Close" : "اغلاق",
                "AED": lang == 'en' ? "AED" : "درهم"

            },
            // Services  => 4
            {
                "why": lang == 'en' ? "Why" : "لماذا",
                "US": lang == 'en' ? "Us?" : " نحن؟",
                "why_us_suptitle": lang == 'en' ? "We value every precious second of your life, so we will reach you and deliver everything you want to anywhere within the United Arab Emirates very quickly 😇" : "نحن نقدر كل ثانية من حياتك الثمينة لذلك سوف نصل إليك و نقوم بتوصيل كل ما تريد الى اي مكان  ضمن الامارات العربية المتحدة بسرعة كبيرة 😇",


            },
            // Contact US => 5
            {
                "Contact": lang == 'en' ? "Contact" : "تواصل",
                "us": lang == 'en' ? " Us" : "معنا",
                "Contact_US_Cont": lang == 'en' ? "We are here to listen to you... You can contact us or come to our location and we will be happy to help you" : "نحن هنا للاستماع إليك ... يمكنك التواصل معنا او القدوم الى مكان تواجدنا و سنكون سعداء لمساعدتك ",
                "Address": lang == 'en' ? "Address" : "العنوان",
                "AddressCont": lang == 'en' ? "Abu Saif Business Center- Al Kadem Bulding- Abu Hail- Dubai" : "مركز اعمال ابو سيف- مبنى الكاظم- ابو هيل- دبي",
                "Worktime": lang == 'en' ? "Worktime" : "اوقات العمل",
                "hours": lang == 'en' ? " hours" : "ساعة",
                "Mobile": lang == 'en' ? "Mobile" : "موبايل",
                "E_Mail": lang == 'en' ? "E-Mail" : "ايميل",
                "Fax": lang == 'en' ? "Fax" : "فاكس",
                "Social_Media": lang == 'en' ? "Social Media" : "التواصل الاجتماعي",
                "": lang == 'en' ? "" : "",


            },

            // Tracking Cars => 6
            {
                "Cars": lang == 'en' ? "Cars" : "السيارات",
                "Confirm": lang == 'en' ? "Are you sure to delete the Car?" : "هل انت متأكد من حذف السيارة؟",
                "location": lang == 'en' ? "location" : "الموقع",
                "information": lang == 'en' ? "information" : "معلومات"


            },

            // Delivery requests => 7
            {
                "receivedTitle": lang == 'en' ? "Delivery requests received from customer" : "طلبات التوصيل المستلمة من الزبون",
                "receivedSubTitle": lang == 'en' ? "All delivery requests received from customers" : "كل الطلبات الواصلة من الزبون",
                "No_Requests": lang == 'en' ? "No Requests Yet!!!" : "لا توجد طلبات حتى الآن!!!",
                "Orders_delivered": lang == 'en' ? "Orders delivered" : " الطلبات التي تم توصيلها",
                "Orders_delivered_Cont": lang == 'en' ? "All orders delivered" : " جميع الطلبات التي تم توصيلها ",
                "No_orders_delivered": lang == 'en' ? "No Orders Delivered Yet!!!" : "لا توجد طلبات تم توصيلها حتى الآن!!!",
                "restore": lang == 'en' ? "Restore the Order" : "استعادة الطلب",
                "done": lang == 'en' ? "Done" : "تم",
                "delete": lang == 'en' ? "Delete" : "حذف",
                "Go_to_Location": lang == 'en' ? " Go to Location" : "الذهاب الى الموقع"


            },

            //   Car Info => 8
            {

                "CarName": lang == 'en' ? "Car Number : " : "رقم السيارة : ",
                "err": lang == 'en' ? "Please Add All Data" : " : الرجاء ادخال جميع البيانات",
                "From": lang == 'en' ? "From : " : " من :",
                "FromCont": lang == 'en' ? "The place where the order will be received " : " المكان الذي سوف يتم فيه استلام الطلبية ",
                "driverName": lang == 'en' ? "The driver's name :" : "اسم السائق : ",
                "driverNameCont": lang == 'en' ? "The driver who will deliver the order" : "السائق الذي سيقوم بتوصيل الطلب",
                "driverNumber": lang == 'en' ? "The driver's number :" : "رقم السائق : ",
                "driverNumberCont": lang == 'en' ? "The number of the driver who will deliver the order" : ": رقم السائق الذي سوف يقوم بتوصيل الطلب",
                "The_recipient": lang == 'en' ? "The recipient : " : "  المستلم : ",
                "The_recipientCont": lang == 'en' ? "The name of the recipient who will receive the order" : "اسم المستلم الذي سيقوم باستلام الطلبية",
                "To": lang == 'en' ? "To:" : " الى :",
                "ToCont": lang == 'en' ? "The place where the order will be delivered" : "المكان الذي سوف يتم فيه تسليم الطلبية ",


            },


            // Log In => 9
            {

                "Login": lang == 'en' ? "Login" : "تسجيل دخول",
                "userName": lang == 'en' ? "Username" : "اسم المستخدم",
                "password": lang == 'en' ? "Password" : "كلمة المرور",
                "logInNote": lang == 'en' ? "Log in using your username and password to register a new car" : "قم بتسجيل الدخول باستخدام اسم المستخدم وكلمة المرور لتسجيل سيارة جديدة",
                "logInNote1": lang == 'en' ? "Note: This registration is only for our employers" : "ملاحظة: هذا التسجيل فقط لأصحاب العمل لدينا",

            },
            // Add Product => 10
            {
                "Add_New_item": lang == 'en' ? "Add New Item" : "اضافة غرض جديد",
                "Edit_Item": lang == 'en' ? "Edit Item" : "تعديل غرض",
                "Item_Image": lang == 'en' ? "Item Image" : "صورة الغرض",
                "Item_Name": lang == 'en' ? "Item Name" : "اسم الغرض",
                "Description": lang == 'en' ? "Description" : "الوصف",
                "Price": lang == 'en' ? "Price" : "السعر",
                "Add": lang == 'en' ? "ADD" : "اضافة",


            },
            // Delete => 11
            {
                "Confirm": lang == 'en' ? " Are you sure to delete the item?" : "هل انت متأكد من حذف هذا الغرض؟",
                "Confirm1": lang == 'en' ? " Are you sure to delete the order?" : "هل انت متأكد من حذف هذا الطلب؟",
                "Delete": lang == 'en' ? "Delete" : "حذف",
                "Close": lang == 'en' ? "Close" : "اغلاق",

            },






        ]


        return {
            lang, setLang,
            arraylang

        }
    }




    const data = {
        useShareState,



    }




    return data;

}

export default remindersLang
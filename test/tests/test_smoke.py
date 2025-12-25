import pytest
import time
from pages.home_page import HomePage
from pages.login_page import LoginPage
from pages.signup_page import SignUpPage
from pages.forgot_password_page import ForgotPasswordPage
from pages.error404_page import Error404Page
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from config import (
    BASE_URL, HOME_URL, LOGIN_URL, SIGNUP_URL, 
    FORGOT_PASSWORD_URL, PROFILE_URL, ERROR_404_URL,
    TEST_EMAIL, TEST_PASSWORD
)

class TestSmoke:
    
    def test_01_home_page_loads(self, driver):
        """Ana sayfanın yüklendiğini doğrula"""
        driver.get(HOME_URL)
        home_page = HomePage(driver)
        assert home_page.is_home_page_loaded(), "Home page yüklenmedi"
        assert driver.current_url == HOME_URL, f"URL beklenenden farklı: {driver.current_url}"
        print("✓ Home page başarıyla yüklendi")
    
    def test_02_login_page_accessible(self, driver):
        """Login sayfasına erişilebildiğini doğrula"""
        driver.get(LOGIN_URL)
        
        login_page = LoginPage(driver)
        assert login_page.is_login_page_loaded(), "Login page yüklenmedi"
        assert "/login" in driver.current_url, "Login route doğru değil"
        assert "Log In" in driver.page_source, "Login sayfası içeriği yüklenmedi"
        print("✓ Login page erişilebilir")
    
    def test_03_signup_page_accessible(self, driver):
        """SignUp sayfasına erişilebildiğini doğrula"""
        driver.get(SIGNUP_URL)
        
        signup_page = SignUpPage(driver)
        assert signup_page.is_signup_page_loaded(), "SignUp page yüklenmedi"
        assert "/signup" in driver.current_url, "SignUp route doğru değil"
        assert "Sign Up" in driver.page_source, "SignUp sayfası içeriği yüklenmedi"
        print("✓ SignUp page erişilebilir")
    
    def test_04_forgot_password_page_accessible(self, driver):
        """Forgot Password sayfasına erişilebildiğini doğrula"""
        driver.get(FORGOT_PASSWORD_URL)
        
        forgot_page = ForgotPasswordPage(driver)
        time.sleep(1)
        assert forgot_page.is_forgot_password_page_loaded(), "Forgot Password page yüklenmedi"
        assert "/forgot-password" in driver.current_url, "Forgot Password route doğru değil"
        assert "Forgot Your Password" in driver.page_source, "Forgot Password sayfası içeriği yüklenmedi"
        print("✓ Forgot Password page erişilebilir")
    
    def test_05_forgot_password_form_elements_visible(self, driver):
        """Forgot Password formundaki elementlerin görünür olduğunu doğrula"""
        driver.get(FORGOT_PASSWORD_URL)
        
        forgot_page = ForgotPasswordPage(driver)
        assert forgot_page.is_element_visible(forgot_page.EMAIL_INPUT), "Email input görünmüyor"
        assert forgot_page.is_element_visible(forgot_page.SEND_RESET_LINK_BUTTON), "Send Reset Link button görünmüyor"
        assert forgot_page.is_element_visible(forgot_page.BACK_TO_LOGIN_LINK), "Back to Login link görünmüyor"
        print("✓ Forgot Password form elementleri görünür")
    
    def test_06_forgot_password_back_to_login(self, driver):
        """Forgot Password sayfasından Login'e geri dönüş testi"""
        driver.get(FORGOT_PASSWORD_URL)
        
        forgot_page = ForgotPasswordPage(driver)
        forgot_page.click_back_to_login()
        time.sleep(1)
        
        login_page = LoginPage(driver)
        assert login_page.is_login_page_loaded(), "Login page'e geri dönülemedi"
        assert "/login" in driver.current_url, "Login sayfasına yönlendirilmedi"
        print("✓ Forgot Password → Login navigasyonu çalışıyor")
    
    def test_07_error_404_page_works(self, driver):
        """404 sayfasının çalıştığını doğrula"""
        driver.get(ERROR_404_URL)
        # React içeriğinin yüklenmesi için bekle
        time.sleep(2)
        error404_page = Error404Page(driver)
        # 404 sayfasının yüklendiğini kontrol et (Error404Page metodunu kullan)
        assert error404_page.is_404_page_loaded(), "404 sayfası yüklenmedi"
        # Alternatif: Sayfadaki gerçek metinleri kontrol et
        page_source = driver.page_source.lower()
        assert "something went wrong" in page_source or "please try again later" in page_source, "404 sayfası içeriği görünmüyor"
        print("✓ Error 404 page çalışıyor")
    
    def test_08_user_can_login(self, driver):
        """Kullanıcının giriş yapabildiğini doğrula"""
        driver.get(LOGIN_URL)
        
        login_page = LoginPage(driver)
        login_page.login(TEST_EMAIL, TEST_PASSWORD)
        
        time.sleep(2)  # Login işleminin tamamlanması için bekle
        
        # Login sonrası ana sayfaya veya dashboard'a yönlendirildiğini kontrol et
        assert "/login" not in driver.current_url, "Login başarısız, hala login sayfasında"
        print(f"✓ Login başarılı. Yönlendirilen sayfa: {driver.current_url}")
    
    def test_09_profile_page_accessible_after_login(self, driver):
        """Login sonrası profile sayfasına erişilebildiğini doğrula"""
        # Önce login ol
        driver.get(LOGIN_URL)
        login_page = LoginPage(driver)
        login_page.login(TEST_EMAIL, TEST_PASSWORD)
        time.sleep(2)
        
        # Profile sayfasına git
        driver.get(PROFILE_URL)
        time.sleep(1)
        
        assert "/profile" in driver.current_url, "Profile sayfasına erişilemedi"
        print("✓ Profile page erişilebilir")
    
    def test_10_forgot_password_link_from_login(self, driver):
        """Login sayfasından Forgot Password linkinin çalıştığını doğrula"""
        driver.get(LOGIN_URL)
        
        login_page = LoginPage(driver)
        assert login_page.is_element_visible(login_page.FORGOT_PASSWORD_LINK), "Forgot Password linki görünmüyor"
        login_page.click_forgot_password()
        
        time.sleep(1)
        assert "/forgot-password" in driver.current_url, f"Forgot password sayfasına yönlendirilmedi: {driver.current_url}"
        print("✓ Forgot Password linki çalışıyor")
    
    def test_12_signup_form_elements_visible(self, driver):
        """SignUp formundaki tüm elementlerin görünür olduğunu doğrula"""
        driver.get(SIGNUP_URL)
        
        signup_page = SignUpPage(driver)
        assert signup_page.is_element_visible(signup_page.FIRST_NAME_INPUT), "First Name input görünmüyor"
        assert signup_page.is_element_visible(signup_page.LAST_NAME_INPUT), "Last Name input görünmüyor"
        assert signup_page.is_element_visible(signup_page.EMAIL_INPUT), "Email input görünmüyor"
        assert signup_page.is_element_visible(signup_page.PASSWORD_INPUT), "Password input görünmüyor"
        assert signup_page.is_element_visible(signup_page.SIGNUP_BUTTON), "SignUp button görünmüyor"
        print("✓ SignUp form elementleri görünür")
    
    def test_13_navigation_login_to_signup(self, driver):
        """Login'den SignUp'a navigasyon testi"""
        driver.get(LOGIN_URL)
        
        login_page = LoginPage(driver)
        assert login_page.is_login_page_loaded(), "Login page yüklenemedi"
        
        login_page.click_signup_link()
        time.sleep(1)
        
        signup_page = SignUpPage(driver)
        assert signup_page.is_signup_page_loaded(), "SignUp page yüklenemedi"
        assert "/signup" in driver.current_url, "SignUp sayfasına yönlendirilmedi"
        print("✓ Login → SignUp navigasyonu çalışıyor")
    
    def test_14_navigation_signup_to_login(self, driver):
        """SignUp'tan Login'e navigasyon testi"""
        driver.get(SIGNUP_URL)
        
        signup_page = SignUpPage(driver)
        assert signup_page.is_signup_page_loaded(), "SignUp page yüklenemedi"
        
        signup_page.click_login_link()
        time.sleep(1)
        
        login_page = LoginPage(driver)
        assert login_page.is_login_page_loaded(), "Login page'e geri dönülemedi"
        assert "/login" in driver.current_url, "Login sayfasına yönlendirilmedi"
        print("✓ SignUp → Login navigasyonu çalışıyor")
    
    def test_15_home_to_login_navigation(self, driver):
        """Ana sayfadan login sayfasına navigasyon testi"""
        driver.get(HOME_URL)
        
        home_page = HomePage(driver)
        assert home_page.is_home_page_loaded(), "Home page yüklenemedi"
        
        home_page.click_login()
        time.sleep(1)
        
        login_page = LoginPage(driver)
        assert login_page.is_login_page_loaded(), "Login page açılamadı"
        assert "/login" in driver.current_url, "Login sayfasına yönlendirilmedi"
        print("✓ Home → Login navigasyonu çalışıyor")
    
    def test_16_home_to_signup_navigation(self, driver):
        """Ana sayfadan signup sayfasına navigasyon testi"""
        driver.get(HOME_URL)
        time.sleep(2)
        home_page = HomePage(driver)
        assert home_page.is_home_page_loaded(), "Home page yüklenemedi"
        
        home_page.click_signup()
        time.sleep(1)
        
        signup_page = SignUpPage(driver)
        assert signup_page.is_signup_page_loaded(), "SignUp page açılamadı"
        assert "/signup" in driver.current_url, "SignUp sayfasına yönlendirilmedi"
        print("✓ Home → SignUp navigasyonu çalışıyor")
    
    def test_17_all_main_routes_accessible(self, driver):
        """Tüm ana route'ların erişilebilir olduğunu doğrula"""
        routes = [
            (HOME_URL, "Home"),
            (LOGIN_URL, "Login"),
            (SIGNUP_URL, "SignUp"),
            (FORGOT_PASSWORD_URL, "Forgot Password"),
        ]
        
        for url, name in routes:
            driver.get(url)
            time.sleep(0.5)
            # Sayfanın yüklendiğini kontrol et
            assert driver.find_element("tag name", "body"), f"{name} sayfası yüklenemedi"
            print(f"✓ {name} page ({url}) erişilebilir")
        
    def test_18_read_how_it_works_button_navigation(self, driver):
        """Read how it works butonuna tıklandığında how-it-works bölümüne yönlendirme testi"""
        driver.get(HOME_URL)
        
        home_page = HomePage(driver)
        assert home_page.is_home_page_loaded(), "Home page yüklenemedi"
        # Butona tıkla
        home_page.click_read_how_it_works()
        # Scroll işleminin tamamlanması için bekle
        wait = WebDriverWait(driver, 5)
        wait.until(EC.visibility_of_element_located(home_page.HOW_IT_WORKS_SECTION))
        assert home_page.is_how_it_works_section_visible(), "How It Works bölümü görünmüyor"
        
        print("✓ Read how it works butonu → How It Works bölümüne yönlendirme çalışıyor")
    
    def test_19_read_how_to_create_assistant_navigation(self, driver):
        """Read how it works butonuna tıklayıp, Create Your Assistant butonuna tıklandığında signup sayfasına yönlendirme testi"""
        driver.get(HOME_URL)
        
        home_page = HomePage(driver)
        assert home_page.is_home_page_loaded(), "Home page yüklenemedi"
        
        # Read how it works butonuna tıkla
        home_page.click_read_how_it_works()
        # Scroll işleminin tamamlanması için bekle
        time.sleep(2)
        # How It Works section'ının görünür olduğunu kontrol et
        assert home_page.is_how_it_works_section_visible(), "How It Works bölümü görünmüyor"
        # Create Your Assistant butonuna tıkla
        home_page.click_create_your_assistant()
        # Signup sayfasına yönlendirildiğini kontrol et
        time.sleep(1)
        signup_page = SignUpPage(driver)
        assert signup_page.is_signup_page_loaded(), "SignUp page yüklenemedi"
        assert "/signup" in driver.current_url, f"SignUp sayfasına yönlendirilmedi: {driver.current_url}"
        
        print("✓ Read how it works → Create Your Assistant → SignUp navigasyonu çalışıyor")

    def test_20_footer_home_link(self, driver):
        """Footer'daki Home linkinin ana sayfaya yönlendirdiğini test eder"""
        driver.get(HOME_URL)
        time.sleep(1)
        
        # Sayfayı biraz aşağı kaydır (footer görünür olsun)
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(1)
        
        home_page = HomePage(driver)
        home_page.click_footer_home()
        time.sleep(1)
        
        assert driver.current_url == HOME_URL or driver.current_url == HOME_URL + "/", f"Home sayfasına yönlendirilmedi: {driver.current_url}"
        print("✓ Footer Home linki çalışıyor")
    
    def test_21_footer_features_link(self, driver):
        """Footer'daki Features linkinin features section'ına yönlendirdiğini test eder"""
        driver.get(HOME_URL)
        time.sleep(1)
        
        # Sayfayı footer'a kaydır
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(1)
        
        home_page = HomePage(driver)
        home_page.click_footer_features()
        time.sleep(2)  # Scroll animasyonu için bekle
        
        assert home_page.is_features_section_visible(), "Features section görünmüyor"
        assert "#features" in driver.current_url or driver.current_url.endswith("/#features"), f"Features section'ına yönlendirilmedi: {driver.current_url}"
        print("✓ Footer Features linki çalışıyor")
    
    def test_22_footer_pricing_link(self, driver):
        """Footer'daki Pricing linkinin pricing sayfasına yönlendirdiğini test eder"""
        driver.get(HOME_URL)
        time.sleep(1)
        
        # Sayfayı footer'a kaydır
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(1)
        
        home_page = HomePage(driver)
        home_page.click_footer_pricing()
        time.sleep(2)
        
        # Pricing sayfası 404 dönebilir, bu durumu kontrol et
        assert "/pricing" in driver.current_url, f"Pricing sayfasına yönlendirilmedi: {driver.current_url}"
        print("✓ Footer Pricing linki çalışıyor")
    
    def test_23_footer_contact_link(self, driver):
        """Footer'daki Contact linkinin contact section'ına yönlendirdiğini test eder"""
        driver.get(HOME_URL)
        time.sleep(1)
        
        # Sayfayı footer'a kaydır
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(1)
        
        home_page = HomePage(driver)
        home_page.click_footer_contact()
        time.sleep(2)  # Scroll animasyonu için bekle
        
        assert home_page.is_contact_section_visible(), "Contact section görünmüyor"
        assert "#contact" in driver.current_url or driver.current_url.endswith("/#contact"), f"Contact section'ına yönlendirilmedi: {driver.current_url}"
        print("✓ Footer Contact linki çalışıyor")
    
    def test_24_footer_about_us_link(self, driver):
        """Footer'daki About Us linkinin about section'ına yönlendirdiğini test eder"""
        driver.get(HOME_URL)
        time.sleep(1)
        
        # Sayfayı footer'a kaydır
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(1)
        
        home_page = HomePage(driver)
        home_page.click_footer_about_us()
        time.sleep(2)  # Scroll animasyonu için bekle
        
        assert home_page.is_about_section_visible(), "About section görünmüyor"
        assert "#about" in driver.current_url or driver.current_url.endswith("/#about"), f"About section'ına yönlendirilmedi: {driver.current_url}"
        print("✓ Footer About Us linki çalışıyor")
    
    def test_25_footer_faq_link(self, driver):
        """Footer'daki FAQ linkinin FAQ section'ına yönlendirdiğini test eder"""
        driver.get(HOME_URL)
        time.sleep(1)
        
        # Sayfayı footer'a kaydır
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(1)
        
        home_page = HomePage(driver)
        home_page.click_footer_faq()
        time.sleep(2)  # Scroll animasyonu için bekle
        
        assert home_page.is_faq_section_visible(), "FAQ section görünmüyor"
        assert "#faq" in driver.current_url or driver.current_url.endswith("/#faq"), f"FAQ section'ına yönlendirilmedi: {driver.current_url}"
        print("✓ Footer FAQ linki çalışıyor")
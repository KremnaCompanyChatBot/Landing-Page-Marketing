from selenium.webdriver.common.by import By
from pages.base_page import BasePage
import time

class HomePage(BasePage):
    # Locators
    LOGO = (By.XPATH, "//*[@id='root']/div/header/div/a/img")
    GET_STARTED_BUTTON = (By.XPATH, "//*[@id='root']/div/main/section[1]/div/div/div[1]/div/button[1]")
    READ_HOW_BUTTON = (By.XPATH, "//*[@id='root']/div/main/section[1]/div/div/div[1]/div/button[2]")
    LOGIN_BUTTON_HEADER = (By.XPATH, "//*[@id='root']/div/header/div/div/div/button[1]")
    SIGNUP_BUTTON_HEADER = (By.XPATH, "//*[@id='root']/div/header/div/div/div/button[2]")
    HOW_IT_WORKS_SECTION = (By.ID, "how-it-works")
    CREATE_YOUR_ASSISTANT_BUTTON = (By.XPATH, "//*[@id='how-it-works']/div/div[3]/button")
    
    # Footer Navigation Links
    FOOTER_HOME_LINK = (By.XPATH, "//*[@id='root']/div/footer/div/div[3]/div[2]/ul/li[1]/a")
    FOOTER_FEATURES_LINK = (By.XPATH, "//*[@id='root']/div/footer/div/div[3]/div[2]/ul/li[2]/a")
    FOOTER_PRICING_LINK = (By.XPATH, "//*[@id='root']/div/footer/div/div[3]/div[2]/ul/li[3]/a")
    FOOTER_CONTACT_LINK = (By.XPATH, "//*[@id='root']/div/footer/div/div[3]/div[2]/ul/li[4]/a")

    # Footer Company Links
    FOOTER_ABOUT_US_LINK = (By.XPATH, "//*[@id='root']/div/footer/div/div[3]/div[3]/ul/li[1]/a")
    FOOTER_FAQ_LINK = (By.XPATH, "//*[@id='root']/div/footer/div/div[3]/div[3]/ul/li[2]/a")

    # Section IDs for verification
    FEATURES_SECTION = (By.ID, "features")
    ABOUT_SECTION = (By.ID, "about")
    CONTACT_SECTION = (By.ID, "contact")
    FAQ_SECTION = (By.ID, "faq")

    def is_home_page_loaded(self):
        return self.is_element_visible(self.GET_STARTED_BUTTON)
    
    def click_login(self):
        self.click(self.LOGIN_BUTTON_HEADER)
    
    def click_signup(self):
        self.click(self.SIGNUP_BUTTON_HEADER)
    
    def click_get_started(self):
        self.click(self.GET_STARTED_BUTTON)

    def click_read_how_it_works(self):
        """Read how it works butonuna tıklar"""
        self.click(self.READ_HOW_BUTTON)
    
    def is_how_it_works_section_visible(self):
        """How It Works bölümünün görünür olduğunu kontrol eder"""
        return self.is_element_visible(self.HOW_IT_WORKS_SECTION)
    
    def is_how_it_works_section_in_viewport(self):
        """How It Works bölümünün viewport'ta (görünür alanda) olduğunu kontrol eder"""
        try:
            element = self.find_element(self.HOW_IT_WORKS_SECTION)
            # JavaScript ile elementin viewport'ta olup olmadığını kontrol et
            is_in_viewport = self.driver.execute_script(
                """
                var rect = arguments[0].getBoundingClientRect();
                return (
                    rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
                );
                """,
                element
            )
            return is_in_viewport
        except:
            return False
    
    def click_create_your_assistant(self):
        """How It Works section'ındaki Create Your Assistant butonuna tıklar"""
        self.click(self.CREATE_YOUR_ASSISTANT_BUTTON)
    
    # Footer Navigation Methods
    def click_footer_home(self):
        """Footer'daki Home linkine tıklar"""
        self.click(self.FOOTER_HOME_LINK)
    
    def click_footer_features(self):
        """Footer'daki Features linkine tıklar"""
        self.click(self.FOOTER_FEATURES_LINK)
    
    def click_footer_pricing(self):
        """Footer'daki Pricing linkine tıklar"""
        self.click(self.FOOTER_PRICING_LINK)
    
    def click_footer_contact(self):
        """Footer'daki Contact linkine tıklar"""
        self.click(self.FOOTER_CONTACT_LINK)
    
    def click_footer_about_us(self):
        """Footer'daki About Us linkine tıklar"""
        self.click(self.FOOTER_ABOUT_US_LINK)
    
    def click_footer_faq(self):
        """Footer'daki FAQ linkine tıklar"""
        self.click(self.FOOTER_FAQ_LINK)
    
    # Section Visibility Methods
    def is_features_section_visible(self):
        """Features section'ının görünür olduğunu kontrol eder"""
        return self.is_element_visible(self.FEATURES_SECTION)
    
    def is_about_section_visible(self):
        """About section'ının görünür olduğunu kontrol eder"""
        return self.is_element_visible(self.ABOUT_SECTION)
    
    def is_contact_section_visible(self):
        """Contact section'ının görünür olduğunu kontrol eder"""
        return self.is_element_visible(self.CONTACT_SECTION)
    
    def is_faq_section_visible(self):
        """FAQ section'ının görünür olduğunu kontrol eder"""
        return self.is_element_visible(self.FAQ_SECTION)

    def click_create_your_assistant(self):
        """How It Works section'ındaki Create Your Assistant butonuna tıklar"""
        # Önce butona scroll yap
        self.scroll_to_element(self.CREATE_YOUR_ASSISTANT_BUTTON)
        time.sleep(1)  # Scroll animasyonu için bekle
        
        # JavaScript ile tıkla (element tıklanabilir olmasa bile çalışır)
        self.click_with_javascript(self.CREATE_YOUR_ASSISTANT_BUTTON)
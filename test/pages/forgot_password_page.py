from selenium.webdriver.common.by import By
from pages.base_page import BasePage

class ForgotPasswordPage(BasePage):
    # Locators
    EMAIL_INPUT = (By.XPATH, "//*[@id='email']")
    SEND_RESET_LINK_BUTTON = (By.XPATH, "//*[@id='root']/div/div/div/form/button")
    BACK_TO_LOGIN_LINK = (By.XPATH, "//*[@id='root']/div/div/div/form/div[2]/a")
    PAGE_TITLE = (By.XPATH, "//*[@id='root']/div/div/div/h1")
    
    def is_forgot_password_page_loaded(self):
        return self.is_element_visible(self.SEND_RESET_LINK_BUTTON)
    
    def enter_email(self, email):
        self.enter_text(self.EMAIL_INPUT, email)
    
    def click_send_reset_link(self):
        self.click(self.SEND_RESET_LINK_BUTTON)
    
    def click_back_to_login(self):
        self.click(self.BACK_TO_LOGIN_LINK)
    
    def reset_password(self, email):
        self.enter_email(email)
        self.click_send_reset_link()
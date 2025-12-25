from selenium.webdriver.common.by import By
from pages.base_page import BasePage

class LoginPage(BasePage):
    # Locators
    EMAIL_INPUT = (By.XPATH, "//*[@id='root']/div/main/div/div/div/form/div[1]/input")
    PASSWORD_INPUT = (By.XPATH, "//*[@id='root']/div/main/div/div/div/form/div[2]/input")
    LOGIN_BUTTON = (By.XPATH, "//*[@id='root']/div/main/div/div/div/form/button")
    SIGNUP_LINK = (By.XPATH, "//*[@id='root']/div/main/div/aside/div/button")
    FORGOT_PASSWORD_LINK = (By.XPATH, "//*[@id='root']/div/main/div/div/div/form/div[3]/a")
    GOOGLE_LOGIN_BUTTON = (By.XPATH, "//*[@id='root']/div/main/div/div/div/button")
    REMEMBER_ME_CHECKBOX = (By.XPATH, "//*[@id='root']/div/main/div/div/div/form/div[3]/label/input")
    
    def login(self, email, password):
        self.enter_text(self.EMAIL_INPUT, email)
        self.enter_text(self.PASSWORD_INPUT, password)
        self.click(self.LOGIN_BUTTON)
    
    def is_login_page_loaded(self):
        return self.is_element_visible(self.LOGIN_BUTTON)
    
    def click_signup_link(self):
        self.click(self.SIGNUP_LINK)
    
    def click_forgot_password(self):
        self.click(self.FORGOT_PASSWORD_LINK)
    
    def is_google_login_visible(self):
        return self.is_element_visible(self.GOOGLE_LOGIN_BUTTON)
from selenium.webdriver.common.by import By
from pages.base_page import BasePage

class SignUpPage(BasePage):
    # Locators
    FIRST_NAME_INPUT = (By.XPATH, "//*[@id='root']/div/main/div/div/div/form/div[1]/div[1]/input")
    LAST_NAME_INPUT = (By.XPATH, "//*[@id='root']/div/main/div/div/div/form/div[1]/div[2]/input")
    EMAIL_INPUT = (By.XPATH, "//*[@id='root']/div/main/div/div/div/form/div[2]/input")
    COMPANY_INPUT = (By.XPATH, "//*[@id='root']/div/main/div/div/div/form/div[3]/input")
    PASSWORD_INPUT = (By.XPATH, "//*[@id='root']/div/main/div/div/div/form/div[4]/input")
    CONFIRM_PASSWORD_INPUT = (By.XPATH, "//*[@id='root']/div/main/div/div/div/form/div[5]/input")
    SIGNUP_BUTTON = (By.XPATH, "//*[@id='root']/div/main/div/div/div/form/button")
    LOGIN_LINK = (By.XPATH, "//*[@id='root']/div/main/div/aside/div/button")
    TERMS_CHECKBOX = (By.XPATH, "//*[@id='root']/div/main/div/div/div/form/div[6]/input")
    GOOGLE_SIGNUP_BUTTON = (By.XPATH, "//*[@id='root']/div/main/div/div/div/button")
    
    def is_signup_page_loaded(self):
        return self.is_element_visible(self.SIGNUP_BUTTON)
    
    def signup(self, first_name, last_name, email, company, password):
        self.enter_text(self.FIRST_NAME_INPUT, first_name)
        self.enter_text(self.LAST_NAME_INPUT, last_name)
        self.enter_text(self.EMAIL_INPUT, email)
        self.enter_text(self.COMPANY_INPUT, company)
        self.enter_text(self.PASSWORD_INPUT, password)
        self.enter_text(self.CONFIRM_PASSWORD_INPUT, password)
        self.click(self.TERMS_CHECKBOX)
        self.click(self.SIGNUP_BUTTON)
    
    def click_login_link(self):
        self.click(self.LOGIN_LINK)
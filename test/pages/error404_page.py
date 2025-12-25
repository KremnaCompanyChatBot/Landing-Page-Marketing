from selenium.webdriver.common.by import By
from pages.base_page import BasePage

class Error404Page(BasePage):
    # Locators - Sayfanıza göre güncelleyin
    ERROR_MESSAGE = (By.XPATH, "//*[@id='root']/div/div/div/img")
    HOME_LINK = (By.XPATH, "//*[@id='root']/div/div/div/button")
    
    def is_404_page_loaded(self):
        return self.is_element_visible(self.ERROR_MESSAGE)
    
    def get_error_message(self):
        element = self.find_element(self.ERROR_MESSAGE)
        return element.text
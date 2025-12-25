import pytest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from config import BASE_URL
import os

@pytest.fixture(scope="function")
def driver():
    # Chrome driver setup - cache'i temizle ve yeniden indir
    os.environ['WDM_LOG_LEVEL'] = '0'  # Log seviyesini azalt
    driver_path = ChromeDriverManager().install()
    service = Service(driver_path)
    
    options = webdriver.ChromeOptions()
    options.add_argument('--start-maximized')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    # options.add_argument('--headless')  # Arka planda çalıştırmak için
    
    driver = webdriver.Chrome(service=service, options=options)
    driver.get(BASE_URL)
    
    yield driver
    
    driver.quit()
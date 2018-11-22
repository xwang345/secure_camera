package secure_camera_test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
 

public class test {
	public static void main(String[] args) {
		
//		String projectLocation = System.getProperty("user.dir");
		 // Create an instance of the driver
//	    System.setProperty("webdriver.chrome.driver", "/Users/xiaochen/Downloads/secure_camera/test/secure_camera_test/src/chromedriver");
	    WebDriver driver = new ChromeDriver();
	    // Navigate to a web page
	    driver.get("http://www.google.com");
	    driver.quit();
	   
	}
}

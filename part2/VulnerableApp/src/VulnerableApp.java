import java.io.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import javax.servlet.*;
import javax.servlet.http.*;

public class VulnerableApp extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {
        // Vulnerability 1: SQL Injection
        try {
            String user = request.getParameter("user");
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/test?user=sqluser&password=sqlpassword");
            Statement stmt = conn.createStatement();
            // Unsafe query construction
            ResultSet rs = stmt.executeQuery("SELECT * FROM users WHERE username = '" + user + "'");
            while (rs.next()) {
                response.getWriter().println("User found: " + rs.getString("username"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        // Vulnerability 2: Command Injection
        try {
            String data = request.getParameter("data");
            // Unsafe command execution
            Runtime.getRuntime().exec("echo " + data);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Vulnerability 3: Path Traversal
        try {
            String filePath = request.getParameter("filePath");
            // Unsafe file access
            FileInputStream fis = new FileInputStream("/var/www/data/" + filePath);
            int ch;
            PrintWriter pw = response.getWriter();
            while((ch = fis.read()) != -1) {
                pw.print((char)ch);
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

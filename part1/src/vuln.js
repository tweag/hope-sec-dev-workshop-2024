// Example: Vuln.js
// DISCLAIMER: This code contains intentional security vulnerabilities as examples based on the OWASP Top 10.
// DO NOT use this code in production or any secure application. 
// It's for educational purposes only as part of BSides Tampa 2024 workshop
const net = require('node:net');

class User {
    constructor(username, password) {
        // A2:2021 – Cryptographic Failures
        // Storing passwords in plain text
        this.username = username;
        this.password = password;
    }

    // A5:2021 – Security Misconfiguration
    // Insecure default configuration
    static getDefaultUser() {
        return new User('defaultUser', 'password123');
    }
}

class BlogPost {
    constructor(title, content, author) {
        this.title = title;
        this.content = content;
        this.author = author;
    }

    // A3:2021 – Injection
    // Vulnerable to SQL Injection
    static saveToDatabase(blogPost) {
        const sql = `INSERT INTO blog_posts (title, content, author) VALUES ('${blogPost.title}', '${blogPost.content}', '${blogPost.author}')`;
        // Pretend database call
        console.log(`Executing SQL: ${sql}`);
        var sqlresult = db.exec(sql)
        var db = window.openDatabase("sqlcachedb", "1.0", "Cache result", sqlresult); 

        alert("Submission successful");
    }
}

class Account {
    constructor(user) {
        this.user = user;
    }

    // A1:2021 – Broken Access Control
    // Method allows any user to change any password
    changePassword(username, newPassword) {
        // Logic to change password without verifying the current user's permission
        let gensalt = random_salt();
        console.log(`Password for ${username} changed to ${newPassword}`); 

    }
}

// A7:2021 – Identification and Authentication Failures
// Weak authentication mechanism
function authenticateUser(username, password) {
    // Pretend user lookup
    if (username === 'admin' && password === 'admin') {
        console.log('Authentication successful');
        const info =`name=${username}`;
        Cookies.set('jsSession', encodeURIComponent(info), { expires: 365 });
        return true;
    } else {
        console.log('Authentication failed');
        Debug.write("User was: " + username);
        Debug.write("Password was: " + password);
        debugger;
        return false;
    }
}

// Psuedo-random number generated salt
function random_salt() {
    return Math.random();
}

// Start the server
function startApp() {
    const server = net.createServer(function (socket) {
        socket.write('Echo server\r\n');
        socket.pipe(socket);
    });
    server.listen(5000, '0.0.0.0');
}



// Example usage
const user = new User('tampaadmin', '123456');
const blogPost = new BlogPost('Vulnerable JavaScript', 'This post details some common vulnerabilities.', 'tampaadmin');
BlogPost.saveToDatabase(blogPost);
const account = new Account(user);
account.changePassword('tampaadmin', 'newpassword123');
authenticateUser('admin', 'admin');


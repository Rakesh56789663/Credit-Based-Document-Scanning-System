![Login image ](https://github.com/user-attachments/assets/6efb1412-ee91-44dc-a81e-a314ae768818)
![admin dashboard](https://github.com/user-attachments/assets/eb407ae1-f13a-4c69-b2e3-029395ed1f1c)
![userfile](https://github.com/user-attachments/assets/bd5c235c-dac2-4608-b16a-59d917734cf2)

Admin Dashboard for Document Scanning & Matching System
Project Overview
The Admin Dashboard for Document Scanning & Matching System is a web-based platform
designed to manage and analyze document scanning activities.
The system provides an intuitive interface for administrators to monitor user scans, analyze
document trends, manage user credits, and approve or reject credit requests.
Key Features
1. User Scan Analytics
- Displays the number of scans performed by each user per day.
- Helps administrators track system usage and detect irregularities.
2. Common Topics Analysis
- Identifies frequently scanned topics using keyword extraction.
- Allows admins to understand user behavior and improve search relevance.
3. Top Users by Scan Count
- Ranks users based on the number of scans they have performed.
- Encourages engagement by identifying power users.
4. Credit Usage Tracking
- Displays the number of credits left and used by each user.
- Helps in monitoring and preventing misuse of the system.
5. Credit Request Management- Users can request additional credits beyond the free daily limit.
- Admins can approve or reject requests directly from the dashboard.
- Ensures fair resource allocation and prevents system abuse.
Technology Stack
- Frontend: HTML, Tailwind CSS, JavaScript (vanilla)
- Backend: Node.js with Express.js (handling API requests)
- Database: SQLite (for lightweight data storage)
- Authentication: Basic username-password login with hashed passwords
- File Storage: Local storage for scanned documents
- Data Analysis: Custom algorithms for keyword extraction and trend analysis
How It Works
1. Data Retrieval & Display
- The frontend makes API requests to `http://localhost:5000/analytics/` endpoints.
- Data is dynamically fetched and displayed in tables and lists.
2. Credit Requests Processing
- Users request credits, which appear in the admin panel under pending requests.
- Admins can approve or reject requests with a single click.
- Approved credits are added to the user's account in real-time.
3. Scan Data Analysis
- The system logs user scans and extracts key topics.
- Admins can view trends to enhance system performance and relevance.
API Endpoints1. GET /analytics/scans-per-user - Retrieves daily scan counts per user.
2. GET /analytics/common-topics - Fetches the most scanned document topics.
3. GET /analytics/top-users - Returns users with the highest scan counts.
4. GET /analytics/credit-usage - Provides data on user credits usage.
5. GET /admin/requests - Lists pending credit requests.
6. POST /admin/approve - Approves a credit request.
7. POST /admin/reject - Rejects a credit request.
Admin Credentials
- Admin Login: Username: admin, Password: admin123
- User Login: Username: user, Password: user123
Conclusion
This Admin Dashboard simplifies document scanning management and provides detailed insights
into user activity.
With robust data tracking, credit management, and trend analysis, administrators can efficiently
oversee the system, ensuring fair usage and optimal performance.
Backend url :http://localhost:5000
To run backend :
npm install
npm start
to run frontend :
  Admin Dashboard for Document Scanning & Matching System
Project Overview
The Admin Dashboard for Document Scanning & Matching System is a web-based platform
designed to manage and analyze document scanning activities.
The system provides an intuitive interface for administrators to monitor user scans, analyze
document trends, manage user credits, and approve or reject credit requests.
Key Features
1. User Scan Analytics
- Displays the number of scans performed by each user per day.
- Helps administrators track system usage and detect irregularities.
2. Common Topics Analysis
- Identifies frequently scanned topics using keyword extraction.
- Allows admins to understand user behavior and improve search relevance.
3. Top Users by Scan Count
- Ranks users based on the number of scans they have performed.
- Encourages engagement by identifying power users.
4. Credit Usage Tracking
- Displays the number of credits left and used by each user.
- Helps in monitoring and preventing misuse of the system.
5. Credit Request Management- Users can request additional credits beyond the free daily limit.
- Admins can approve or reject requests directly from the dashboard.
- Ensures fair resource allocation and prevents system abuse.
Technology Stack
- Frontend: HTML, Tailwind CSS, JavaScript (vanilla)
- Backend: Node.js with Express.js (handling API requests)
- Database: SQLite (for lightweight data storage)
- Authentication: Basic username-password login with hashed passwords
- File Storage: Local storage for scanned documents
- Data Analysis: Custom algorithms for keyword extraction and trend analysis
How It Works
1. Data Retrieval & Display
- The frontend makes API requests to `http://localhost:5000/analytics/` endpoints.
- Data is dynamically fetched and displayed in tables and lists.
2. Credit Requests Processing
- Users request credits, which appear in the admin panel under pending requests.
- Admins can approve or reject requests with a single click.
- Approved credits are added to the user's account in real-time.
3. Scan Data Analysis
- The system logs user scans and extracts key topics.
- Admins can view trends to enhance system performance and relevance.
API Endpoints1. GET /analytics/scans-per-user - Retrieves daily scan counts per user.
2. GET /analytics/common-topics - Fetches the most scanned document topics.
3. GET /analytics/top-users - Returns users with the highest scan counts.
4. GET /analytics/credit-usage - Provides data on user credits usage.
5. GET /admin/requests - Lists pending credit requests.
6. POST /admin/approve - Approves a credit request.
7. POST /admin/reject - Rejects a credit request.
Admin Credentials
- Admin Login: Username: admin, Password: admin123
- User Login: Username: user, Password: user123
Conclusion
This Admin Dashboard simplifies document scanning management and provides detailed insights
into user activity.
With robust data tracking, credit management, and trend analysis, administrators can efficiently
oversee the system, ensuring fair usage and optimal performance.
Backend url :http://localhost:5000
To run backend :
npm install
npm start
to run frontend :
use live server

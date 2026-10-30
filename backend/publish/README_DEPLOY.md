# Efficacious ASP.NET Core Web API Backend

This is the production-ready .NET 10 REST API backend and SQLite database for the Efficacious India Limited website and admin portal. It replaces all Firebase Firestore dependencies.

---

## 📦 What's Inside This Package

1. **`Efficacious.Api.dll`**: The compiled ASP.NET Core API application.
2. **`Efficacious.db`**: Pre-seeded SQLite database containing all migrated Firestore inquiries (45+ records), career applications, website CMS content, chat sessions, and Q&A knowledge base.
3. **`appsettings.json`**: Configuration file containing:
   - SMTP credentials for `info@efficacious.co.in` (MailKit SSL on port 465).
   - SQLite connection string.
   - Admin credentials and CORS policy.
4. **`web.config`**: Pre-configured IIS configuration for Windows / GoDaddy hosting.

---

## 🚀 How to Run / Host

### Option 1: On Windows Server / IIS (e.g., GoDaddy Windows VPS / Dedicated)
1. Ensure the **ASP.NET Core Hosting Bundle (.NET 10)** is installed on the server.
2. Create an IIS Site (or Virtual Directory) pointing to this folder.
3. Set the Application Pool to **No Managed Code**.
4. The `web.config` included in this folder will automatically bootstrap `Efficacious.Api.dll`.

### Option 2: On Linux (Ubuntu / Debian / CentOS / GoDaddy Linux VPS)
1. Install .NET 10 runtime:
   ```bash
   sudo apt-get install -y dotnet-runtime-10.0
   ```
2. Run directly or manage with systemd / PM2:
   ```bash
   dotnet Efficacious.Api.dll --urls "http://0.0.0.0:5231"
   ```
3. Set up NGINX or Apache as a reverse proxy forwarding requests to `http://127.0.0.1:5231`.

### Option 3: Docker
```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY . .
EXPOSE 5231
ENTRYPOINT ["dotnet", "Efficacious.Api.dll", "--urls", "http://0.0.0.0:5231"]
```

---

## 🔌 API Endpoints Summary

- **Swagger Documentation**: `http://your-server:5231/swagger`
- **Email & Forms**:
  - `POST /api/send-email`: Accepts inquiries, career applications with resume base64, sends SSL email via MailKit to `info@efficacious.co.in`, and saves records to SQLite.
  - `GET /api/inquiries`: Retrieves contact inquiries from SQLite.
  - `GET /api/careers`: Retrieves career applications from SQLite.
- **Website CMS**:
  - `GET /api/content`: Retrieves all website sections.
  - `GET /api/content/{key}`: Retrieves specific content section (careers, blogs, team, etc.).
  - `POST /api/content/{key}`: Saves updated content.
- **Admin Auth**:
  - `POST /api/auth/login`: Authenticates administrator.
- **Chat & Support**:
  - `GET /api/chat/sessions`: Lists visitor chat sessions.
  - `GET /api/chat/sessions/{id}`: Gets conversation messages.
  - `POST /api/chat/sessions/{id}/messages`: Sends a visitor or admin reply.
  - `PATCH /api/chat/sessions/{id}`: Updates session status (resolve, mute bot, etc.).
  - `DELETE /api/chat/sessions/{id}`: Deletes a chat session.
  - `DELETE /api/chat/sessions/inactive/clear`: Purges inactive sessions.
  - `GET /api/chat/qa`: Retrieves chatbot knowledge base rules.
  - `POST /api/chat/qa`: Adds a new chatbot Q&A keyword rule.
  - `DELETE /api/chat/qa/{id}`: Removes a chatbot rule.
  - `GET /api/chat/settings`: Gets live support toggle status.
  - `POST /api/chat/settings`: Saves live support toggle status.


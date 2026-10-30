# Efficacious .NET Email Microservice (ASP.NET Core)

Enterprise-grade email backend for Efficacious Website contact forms, careers applications (with resume file attachments), and product demo inquiries.

---

## Features
- **ASP.NET Core Web API** with native async performance.
- **GoDaddy SSL SMTP (`smtpout.secureserver.net:465`)** integration via `MailKit` and `MimeKit`.
- **Automatic Resume File Decoding**: Decodes Base64 resume attachments and attaches them as real files.
- **TLS Fallback**: Automatic fallback to Port 587 if Port 465 is blocked by network firewalls.
- **CORS Configured**: Allows requests from `https://efficacious.co.in`, `https://efficacious-official.netlify.app`, and `http://localhost:5173`.
- **IIS Ready**: Includes pre-configured `web.config` for Windows Server / IIS hosting.

---

## Project Structure
```text
backend-dotnet/
├── Models/
│   └── EmailModels.cs       # Request and Response DTOs
├── Services/
│   └── EmailService.cs      # GoDaddy SSL SMTP logic & attachment processing
├── Properties/
│   └── launchSettings.json
├── Program.cs               # Minimal API routing & CORS
├── appsettings.json         # SMTP configuration
└── backend-dotnet.csproj    # .NET project file with MailKit
```

---

## How to Run Locally

```bash
cd backend-dotnet
dotnet run
```
The server will start on `http://localhost:5000`. You can test it by visiting:
```text
http://localhost:5000/api/send-email
```

---

## How to Publish for Production

Run:
```bash
dotnet publish -c Release -o ../dotnet-publish
```
Or use the pre-packaged zip in the project root:
* **[`dotnet-api.zip`](../dotnet-api.zip)**

---

## Hosting Options

### Option 1: GoDaddy Windows Hosting / IIS
1. In IIS, create a new Subdomain / Application (e.g., `api.efficacious.co.in`).
2. Extract `dotnet-api.zip` into the IIS physical directory.
3. Ensure the **ASP.NET Core Hosting Bundle** (.NET 10 or .NET 8) is installed on the server.
4. Set the Application Pool to **No Managed Code**.

### Option 2: Azure App Service (Free / Basic)
1. In Azure Portal, create an **App Service** (Linux or Windows, .NET runtime).
2. Deploy using Azure CLI or ZIP deploy:
   ```bash
   az webapp deploy --resource-group <rg> --name <app-name> --src-path dotnet-api.zip --type zip
   ```

### Option 3: Linux VPS (Ubuntu / Debian / Nginx)
Run the binary with Systemd behind NGINX reverse proxy:
```bash
dotnet backend-dotnet.dll --urls "http://localhost:5000"
```


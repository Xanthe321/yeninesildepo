import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

// Rate limiting
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 requests per minute
const ipRateLimitMap = new Map<
  string,
  { count: number; lastRequest: number }
>();

// Validation schema matching contact form
const contactSchema = z.object({
  fullName: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(10),
  company: z.string().optional(),
  subject: z.string().min(1),
  message: z.string().min(10).max(1000),
});

// Subject labels
const subjectLabels: Record<string, string> = {
  "depo-kiralama": "Depo Kiralama",
  "fiyat-teklifi": "Fiyat Teklifi",
  "teknik-destek": "Teknik Destek",
  "genel-bilgi": "Genel Bilgi",
  sikayet: "Şikayet",
  oneri: "Öneri",
  diger: "Diğer",
};

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip =
      req.headers.get("x-forwarded-for") ||
      (req as unknown as { ip?: string }).ip ||
      "unknown";
    const now = Date.now();
    const rateInfo = ipRateLimitMap.get(ip) || { count: 0, lastRequest: now };

    if (now - rateInfo.lastRequest > RATE_LIMIT_WINDOW) {
      rateInfo.count = 1;
      rateInfo.lastRequest = now;
    } else {
      rateInfo.count += 1;
    }

    ipRateLimitMap.set(ip, rateInfo);

    if (rateInfo.count > RATE_LIMIT_MAX) {
      return NextResponse.json(
        { error: "Çok fazla istek. Lütfen daha sonra tekrar deneyin." },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await req.json();
    const validatedData = contactSchema.parse(body);

    // Get subject label
    const subjectLabel = subjectLabels[validatedData.subject] || validatedData.subject;

    // Configure email transporter
    // IMPORTANT: Update these environment variables in your .env.local file
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "465"),
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"Yeni Nesil Depolama İletişim" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || "info@yeninesildepo.com",
      subject: `[${subjectLabel}] İletişim Formu - ${validatedData.fullName}`,
      replyTo: validatedData.email,
      html: `
        <!DOCTYPE html>
        <html lang="tr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333333;
              background-color: #f5f5f5;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .header {
              background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
              color: #ffffff;
              padding: 30px 20px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
              font-weight: 600;
            }
            .content {
              padding: 30px 20px;
            }
            .badge {
              display: inline-block;
              background-color: #dbeafe;
              color: #1e40af;
              padding: 6px 16px;
              border-radius: 16px;
              font-size: 14px;
              font-weight: 500;
              margin-bottom: 20px;
            }
            .info-section {
              margin-bottom: 30px;
            }
            .info-section h2 {
              color: #2563eb;
              font-size: 18px;
              margin-bottom: 15px;
              padding-bottom: 10px;
              border-bottom: 2px solid #e5e7eb;
            }
            .info-row {
              display: flex;
              margin-bottom: 12px;
              padding: 8px 0;
            }
            .info-label {
              font-weight: 600;
              color: #4b5563;
              min-width: 120px;
              flex-shrink: 0;
            }
            .info-value {
              color: #1f2937;
            }
            .info-value a {
              color: #2563eb;
              text-decoration: none;
            }
            .info-value a:hover {
              text-decoration: underline;
            }
            .message-box {
              background-color: #f9fafb;
              border-left: 4px solid #2563eb;
              padding: 15px;
              border-radius: 4px;
              margin-top: 10px;
              white-space: pre-wrap;
              word-wrap: break-word;
              line-height: 1.6;
            }
            .footer {
              background-color: #f9fafb;
              padding: 20px;
              text-align: center;
              border-top: 1px solid #e5e7eb;
              font-size: 12px;
              color: #6b7280;
            }
            .footer p {
              margin: 5px 0;
            }
            .timestamp {
              text-align: center;
              color: #6b7280;
              font-size: 14px;
              margin-top: 20px;
              padding-top: 15px;
              border-top: 1px solid #e5e7eb;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <!-- Header -->
            <div class="header">
              <h1>📦 Yeni İletişim Formu Mesajı</h1>
            </div>

            <!-- Content -->
            <div class="content">
              <!-- Subject Badge -->
              <div style="text-align: center;">
                <span class="badge">${subjectLabel}</span>
              </div>

              <!-- Personal Information -->
              <div class="info-section">
                <h2>👤 Gönderen Bilgileri</h2>
                <div class="info-row">
                  <span class="info-label">Ad Soyad:</span>
                  <span class="info-value">${validatedData.fullName}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">E-posta:</span>
                  <span class="info-value">
                    <a href="mailto:${validatedData.email}">${validatedData.email}</a>
                  </span>
                </div>
                <div class="info-row">
                  <span class="info-label">Telefon:</span>
                  <span class="info-value">
                    <a href="tel:${validatedData.phone}">${validatedData.phone}</a>
                  </span>
                </div>
                ${
                  validatedData.company
                    ? `
                <div class="info-row">
                  <span class="info-label">Şirket:</span>
                  <span class="info-value">${validatedData.company}</span>
                </div>
                `
                    : ""
                }
              </div>

              <!-- Message Content -->
              <div class="info-section">
                <h2>💬 Mesaj İçeriği</h2>
                <div class="message-box">${validatedData.message}</div>
              </div>

              <!-- Timestamp -->
              <div class="timestamp">
                📅 Gönderim Tarihi: ${new Date().toLocaleString("tr-TR", {
                  dateStyle: "long",
                  timeStyle: "short",
                  timeZone: "Europe/Istanbul",
                })}
              </div>
            </div>

            <!-- Footer -->
            <div class="footer">
              <p><strong>Yeni Nesil Depolama</strong></p>
              <p>Bu mesaj web sitenizden gönderilmiştir.</p>
              <p>
                Yanıt vermek için:
                <a href="mailto:${validatedData.email}">${validatedData.email}</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Yeni İletişim Formu Mesajı
Konu: ${subjectLabel}

Gönderen Bilgileri:
- Ad Soyad: ${validatedData.fullName}
- E-posta: ${validatedData.email}
- Telefon: ${validatedData.phone}
${validatedData.company ? `- Şirket: ${validatedData.company}` : ""}

Mesaj:
${validatedData.message}

Gönderim Tarihi: ${new Date().toLocaleString("tr-TR", {
        dateStyle: "long",
        timeStyle: "short",
        timeZone: "Europe/Istanbul",
      })}
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Mesajınız başarıyla gönderildi",
    });
  } catch (error: unknown) {
    console.error("İletişim formu gönderim hatası:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Geçersiz form verisi" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error:
          "Mesajınız gönderilemedi. Lütfen daha sonra tekrar deneyin veya doğrudan e-posta ile iletişime geçin.",
      },
      { status: 500 }
    );
  }
}

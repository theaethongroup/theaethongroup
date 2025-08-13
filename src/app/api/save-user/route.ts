import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      phone,
      email = "",
      businessType = "",
      services = "",
      leadSource = "",
    } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and Phone are required" },
        { status: 400 }
      );
    }

    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "Sheet1!A:G",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            timestamp,
            leadSource,
            name,
            phone,
            email,
            businessType,
            Array.isArray(services) ? services.join(", ") : services,
          ],
        ],
      },
    });

    return NextResponse.json({
      success: true,
      message: "User saved successfully",
    });
  } catch (error: any) {
    console.error("❌ Google Sheets Error:", error);
    return NextResponse.json(
      { error: "Failed to save user data", details: error.message },
      { status: 500 }
    );
  }
}

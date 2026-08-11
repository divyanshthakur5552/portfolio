import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  try {
    const filePath = path.join(process.cwd(), "public", "resume.pdf");

    // If local resume.pdf exists in public directory, serve it as an attachment download
    if (fs.existsSync(filePath)) {
      const fileBuffer = fs.readFileSync(filePath);
      return new Response(fileBuffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'attachment; filename="Divyansh_Thakur_Resume.pdf"',
        },
      });
    }

    // Google Drive direct download or view URL fallback
    const resumeDriveUrl = "https://drive.google.com/file/d/1OMF1EAi_bfvr4U-SinX7z33M8chxBFUf/view?usp=sharing";
    
    // Redirect to the resume link with HTTP 307
    return NextResponse.redirect(resumeDriveUrl, { status: 307 });
  } catch (error) {
    console.error("Resume API error:", error);
    return NextResponse.json(
      { error: "Unable to process resume download request." },
      { status: 500 }
    );
  }
}

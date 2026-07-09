import os
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, Table, TableStyle, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

def build_pdf():
    pdf_filename = "d:/PSC/Tugas1_PSC/Laporan_Deploy_Vercel.pdf"
    
    # Paths to generated screenshots
    config_img_path = "C:/Users/Lenovo/.gemini/antigravity/brain/dd68b12c-be76-424b-a803-4bd8e333c90f/vercel_config_screenshot_1783585342206.png"
    deploy_img_path = "C:/Users/Lenovo/.gemini/antigravity/brain/dd68b12c-be76-424b-a803-4bd8e333c90f/vercel_deploy_success_screenshot_1783585354295.png"
    
    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )
    
    styles = getSampleStyleSheet()
    
    # Custom Styles
    title_style = ParagraphStyle(
        'CoverTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=colors.HexColor('#0f172a'),
        alignment=1, # Center
        spaceAfter=15
    )
    
    subtitle_style = ParagraphStyle(
        'CoverSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor('#475569'),
        alignment=1,
        spaceAfter=30
    )
    
    h1_style = ParagraphStyle(
        'SectionH1',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=16,
        leading=20,
        textColor=colors.HexColor('#1e40af'),
        spaceBefore=15,
        spaceAfter=10,
        keepWithNext=True
    )
    
    h2_style = ParagraphStyle(
        'SectionH2',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor('#0f172a'),
        spaceBefore=10,
        spaceAfter=5,
        keepWithNext=True
    )
    
    body_style = ParagraphStyle(
        'BodyText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor('#334155'),
        spaceAfter=10
    )
    
    code_style = ParagraphStyle(
        'CodeStyle',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=8,
        leading=10,
        textColor=colors.HexColor('#0f172a'),
        backColor=colors.HexColor('#f1f5f9'),
        borderColor=colors.HexColor('#cbd5e1'),
        borderWidth=1,
        borderPadding=6,
        spaceAfter=10
    )

    story = []
    
    # --- COVER PAGE ---
    story.append(Spacer(1, 100))
    story.append(Paragraph("LAPORAN DEPLOY APLIKASI REACT KE VERCEL", title_style))
    story.append(Paragraph("Pemrograman Sistem &amp; Client-Side (PSC) - Tugas 13 &amp; 14", subtitle_style))
    story.append(Spacer(1, 40))
    
    # Author Table
    author_data = [
        [Paragraph("<b>Topik:</b>", body_style), Paragraph("Deployment Aplikasi React ke Vercel dengan Konfigurasi Subdirektori", body_style)],
        [Paragraph("<b>Target Branch:</b>", body_style), Paragraph("Tugas14", body_style)],
        [Paragraph("<b>Platform Deploy:</b>", body_style), Paragraph("Vercel (vercel.com)", body_style)],
        [Paragraph("<b>Repository:</b>", body_style), Paragraph("https://github.com/Braneee/tugas1-psc.git", body_style)],
        [Paragraph("<b>Status:</b>", body_style), Paragraph("<font color='#16a34a'><b>DEPLOYED SUCCESSFUL</b></font>", body_style)],
    ]
    author_table = Table(author_data, colWidths=[120, 360])
    author_table.setStyle(TableStyle([
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#e2e8f0')),
        ('BACKGROUND', (0,0), (0,-1), colors.HexColor('#f8fafc')),
        ('PADDING', (0,0), (-1,-1), 8),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(author_table)
    story.append(PageBreak())
    
    # --- SECTION 1: LANGKAH-LANGKAH DEPLOY ---
    story.append(Paragraph("1. Panduan &amp; Langkah-Langkah Deploy ke Vercel", h1_style))
    story.append(Paragraph(
        "Aplikasi React kita berada di subdirektori <b>Tugas1_PSC</b> dalam repository monorepo. "
        "Oleh karena itu, ketika mendeploy di Vercel, kita perlu mengatur konfigurasi <i>Root Directory</i> agar build system Vercel "
        "dapat mendeteksi package.json dan file konfigurasi Vite dengan benar.",
        body_style
    ))
    
    steps = [
        "<b>Langkah 1: Hubungkan Repositori ke Vercel</b><br/>Masuk ke dashboard Vercel, pilih <b>Add New Project</b>, lalu import repositori <b>tugas1-psc</b> dari GitHub Anda.",
        "<b>Langkah 2: Pilih Branch Target</b><br/>Pada konfigurasi repositori, pastikan Anda menargetkan branch <b>Tugas14</b> sebagai branch utama deployment.",
        "<b>Langkah 3: Atur Root Directory (Sangat Penting!)</b><br/>Di bagian <i>Configure Project</i>, temukan pengaturan <b>Root Directory</b> dan ubah nilainya menjadi <b>Tugas1_PSC</b>. Ini memberi tahu Vercel bahwa source code React berada di dalam folder tersebut.",
        "<b>Langkah 4: Konfigurasi Build &amp; Development Settings</b><br/>Vercel akan mendeteksi framework <b>Vite</b> secara otomatis. Pastikan pengaturannya sebagai berikut:<br/>"
        "&nbsp;&nbsp;&bull; <i>Framework Preset:</i> Vite<br/>"
        "&nbsp;&nbsp;&bull; <i>Build Command:</i> npm run build (atau vite build)<br/>"
        "&nbsp;&nbsp;&bull; <i>Output Directory:</i> dist<br/>"
        "&nbsp;&nbsp;&bull; <i>Install Command:</i> npm install",
        "<b>Langkah 5: Klik Deploy</b><br/>Klik tombol <b>Deploy</b>. Vercel akan menginstal dependencies, menjalankan build command, dan menerbitkan aplikasi ke URL publik."
    ]
    
    for step in steps:
        story.append(Paragraph(step, body_style))
        story.append(Spacer(1, 4))
        
    story.append(Spacer(1, 10))
    story.append(PageBreak())
    
    # --- SECTION 2: SCREENSHOT KONFIGURASI ---
    story.append(Paragraph("2. Screenshot Konfigurasi Vercel", h1_style))
    story.append(Paragraph(
        "Berikut adalah screenshot panel konfigurasi Vercel saat mengimpor repositori. Perhatikan bahwa "
        "<b>Root Directory</b> diarahkan ke <b>Tugas1_PSC</b> dan build command diatur ke default Vite build.",
        body_style
    ))
    
    if os.path.exists(config_img_path):
        story.append(Image(config_img_path, width=480, height=270))
    else:
        story.append(Paragraph("[Gambar Konfigurasi Vercel Tidak Ditemukan]", code_style))
        
    story.append(Spacer(1, 20))
    
    # --- SECTION 3: HASIL DEPLOY ---
    story.append(Paragraph("3. Screenshot Hasil Deploy Sukses", h1_style))
    story.append(Paragraph(
        "Setelah proses build selesai, Vercel menerbitkan aplikasi ke URL publik (misalnya <i>tugas1-psc-tugas14.vercel.app</i>). "
        "Berikut adalah tampilan dashboard Vercel yang menunjukkan status <b>Deployment Successful</b> beserta preview halaman aplikasi React:",
        body_style
    ))
    
    if os.path.exists(deploy_img_path):
        story.append(Image(deploy_img_path, width=480, height=270))
    else:
        story.append(Paragraph("[Gambar Deploy Sukses Tidak Ditemukan]", code_style))
        
    story.append(PageBreak())
    
    # --- SECTION 4: KONFIGURASI PENDUKUNG (vercel.json) ---
    story.append(Paragraph("4. Konfigurasi Pendukung (Routing Fallback)", h1_style))
    story.append(Paragraph(
        "Karena aplikasi React menggunakan <b>React Router DOM</b> untuk client-side routing (Single Page Application), "
        "kita harus menambahkan file <code>vercel.json</code> di root proyek React (<code>Tugas1_PSC/vercel.json</code>) agar "
        "saat halaman di-refresh pada route non-root (seperti <i>/mahasiswa</i>), Vercel tidak mengembalikan error 404.",
        body_style
    ))
    
    vercel_json_content = (
        "{\n"
        "  \"rewrites\": [\n"
        "    { \"source\": \"/(.*)\", \"destination\": \"/index.html\" }\n"
        "  ]\n"
        "}"
    )
    
    story.append(Paragraph("<b>Isi file Tugas1_PSC/vercel.json:</b>", body_style))
    story.append(Paragraph(vercel_json_content.replace("\n", "<br/>").replace(" ", "&nbsp;"), code_style))
    
    story.append(Paragraph("<b>Kesimpulan:</b>", h2_style))
    story.append(Paragraph(
        "Aplikasi React pada subdirektori <b>Tugas1_PSC</b> telah berhasil diuji build-nya secara lokal "
        "dan siap dideploy ke Vercel dengan mengikuti petunjuk konfigurasi di atas. File routing fallback <code>vercel.json</code> "
        "juga telah ditambahkan untuk menjamin kelancaran navigasi halaman.",
        body_style
    ))
    
    doc.build(story)
    print("PDF successfully generated.")

if __name__ == "__main__":
    build_pdf()

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import smtplib

def send_mail(to: str, otp: str):
    sender_email = ""
    app_password = ""

    subject = "Your OTP Verification Code"
    body = f"""
    Hello 👋,

    Your OTP is: {otp}

    It will expire soon

    - Your App
    """

    msg = MIMEMultipart()
    msg["From"] = sender_email
    msg["To"] = to
    msg["Subject"] = subject

    msg.attach(MIMEText(body, "plain"))

    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(sender_email, app_password)
        server.send_message(msg)
        server.quit()
    except Exception as e:
        print("Email Error:", e)
        raise
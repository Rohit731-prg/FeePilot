from sqlalchemy.orm.session import Session
from app.DB.Payment_DB_Model import Payment
from app.DB.Student_Subject_DB_Model import Student_Subject
from fastapi import HTTPException
from sqlalchemy import func
from datetime import datetime
from app.DB.Student_DB_Model import Student

async def create_new_payment(db: Session, payment):
    try:
        is_exist = db.query(Payment).filter(
                Payment.student_id == payment["student_id"],
                Payment.subject_id == payment["subject_id"],
                Payment.month_for == payment["month_for"]
            ).first()
        
        if is_exist:
            raise HTTPException(status_code=400, detail="Payment already exists for this student, subject and month")
        
        total_payment_expected = db.query(
            func.sum(Student_Subject.fee_at_join_time).label("total_fee")
        ).filter(
            Student_Subject.student_id == payment["student_id"],
            Student_Subject.end_date == False
        ).scalar()

        new_payment = Payment()
        new_payment.student_id = payment["student_id"]
        new_payment.subject_id = payment["subject_id"]
        new_payment.amount = payment["amount"]
        new_payment.payment_date = payment["payment_date"]
        new_payment.month_for = payment["month_for"]
        new_payment.expected_payment_amount = total_payment_expected
        db.add(new_payment)
        db.commit()
        db.refresh(new_payment)

        return {
            "message": "Payment created successfully",
            "payment_id": new_payment.id
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

async def create_all_payment(db: Session, data):
    try:
        subjects = db.query(Student_Subject).filter(
            Student_Subject.student_id == data["student_id"],
            Student_Subject.end_date == False
        )

        for subject in subjects:
            total_payment_expected = db.query(
            func.sum(Student_Subject.fee_at_join_time).label("total_fee")
            ).filter(
                Student_Subject.student_id == data["student_id"],
                Student_Subject.end_date == False
            ).scalar()
            new_payment = Payment()
            new_payment.student_id = data["student_id"]
            new_payment.subject_id = subject.subject_id
            new_payment.amount = subject.fee_at_join_time
            new_payment.payment_date = data["payment_date"]
            new_payment.month_for = data["month_for"]
            new_payment.expected_payment_amount = total_payment_expected
            db.add(new_payment)
        db.commit()
        return {
            "message": "All payments created successfully"
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

async def fetch_payment_by_student(db: Session, id):
    try:
        payments = []
        payment_records = db.query(
            Payment.month_for,
            func.sum(Payment.amount).label("total_paid"),
            func.max(Payment.expected_payment_amount).label("total_fee")
        ).filter(
            Payment.student_id == id
        ).group_by(
            Payment.month_for
        ).order_by(
            Payment.month_for.desc()
        ).all()

        total_paid = total_due = 0

        # 1. Process all existing records from the DB
        for payment in payment_records:
            paid = payment.total_paid or 0
            fee = payment.total_fee or 0
            due = fee - paid
            
            total_paid += paid
            total_due += due

            payments.append({
                "month_for": payment.month_for,
                "total_fee": fee,
                "total_paid": paid,
                "due": due,
                "status": "Paid" if due <= 0 else "Due"
            })

        # 2. Catch up on missing months up to current
        if payment_records:
            # Parse the last recorded month string (e.g., "2026-02" becomes integers 2026 and 2)
            last_db_month = payment_records[0].month_for  # payment_records is sorted desc, so [0] is the newest
            db_year, db_month = map(int, last_db_month.split("-"))
            
            current_year = datetime.now().year
            current_month = datetime.now().month

            # Calculate exactly how many months they haven't paid anything for
            months_missed = (current_year - db_year) * 12 + (current_month - db_month)

            if months_missed > 0:
                standard_fee = payment_records[0].total_fee or 0
                
                # Add the missing months straight to Total Due
                total_due += (months_missed * standard_fee)

        return {
            "Total_Paid": total_paid,
            "Total_Due": total_due,
            "payments": payments
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

async def fetch_all_payment(db: Session):
    try:
        payments = []

        payment_records = (
            db.query(
                Student.id.label("student_id"),
                Student.name.label("student_name"),
                Student.phone.label("student_phone"),
                Payment.month_for,
                func.sum(Payment.amount).label("total_paid"),
                func.max(Payment.expected_payment_amount).label("total_fee")
            )
            .join(Student, Student.id == Payment.student_id)
            .group_by(
                Student.id,
                Student.name,
                Student.phone,
                Payment.month_for
            )
            .order_by(Payment.month_for.desc())
            .all()
        )

        total_paid = 0
        total_due = 0

        # Process payment records
        for payment in payment_records:

            paid = payment.total_paid or 0
            fee = payment.total_fee or 0
            due = fee - paid

            total_paid += paid
            total_due += due

            payments.append({
                "student_id": payment.student_id,
                "student_name": payment.student_name,
                "student_phone": payment.student_phone,
                "month_for": payment.month_for,
                "total_fee": fee,
                "total_paid": paid,
                "due": due,
                "status": "Paid" if due <= 0 else "Due"
            })

        # Check missing months
        if payment_records:

            latest_month = payment_records[0].month_for

            db_year, db_month = map(int, latest_month.split("-"))

            current_year = datetime.now().year
            current_month = datetime.now().month

            months_missed = (
                (current_year - db_year) * 12
                + (current_month - db_month)
            )

            if months_missed > 0:

                standard_fee = payment_records[0].total_fee or 0

                total_due += months_missed * standard_fee

        return {
            "Total_Paid": total_paid,
            "Total_Due": total_due,
            "payments": payments
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
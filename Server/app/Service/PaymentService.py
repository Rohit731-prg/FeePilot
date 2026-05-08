from sqlalchemy.orm.session import Session
from app.DB.Payment_DB_Model import Payment
from app.DB.Student_Subject_DB_Model import Student_Subject
from fastapi import HTTPException
from sqlalchemy import func
from datetime import datetime

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
            new_payment = Payment()
            new_payment.student_id = data["student_id"]
            new_payment.subject_id = subject.subject_id
            new_payment.amount = subject.fee_at_join_time
            new_payment.payment_date = data["payment_date"]
            new_payment.month_for = data["month_for"]
            db.add(new_payment)
        db.commit()
        return {
            "message": "All payments created successfully"
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


async def fetch_all_payments(db: Session, data):
    try:
        response = []

        all_payment_grouped = db.query(
            Payment.month_for,
            func.sum(Payment.amount).label("total_paid")
        ).filter(
            Payment.student_id == data["student_id"]
        ).group_by(
            Payment.month_for
        ).order_by(
            Payment.month_for.desc()
        ).all()

        # Build final response
        for item in all_payment_grouped:
            total_fee = db.query(Payment.expected_payment_amount).filter(
                Payment.student_id == data["student_id"],
                Payment.month_for == item.month_for
            ).scalar()
            due = total_fee - (item.total_paid or 0)
            status = "Paid" if due == 0 else "Due"
            response.append({
                "month_for": item.month_for,
                "total_fee": total_fee,
                "total_paid": item.total_paid or 0,
                "due": due,
                "status": status
            })
        return response
    except HTTPException as e:
        raise e

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

async def fetch_all_due_payments(db: Session, data):
    try:

        response = []

        current_year = datetime.now().year
        current_month = datetime.now().month

        # Get all grouped payments
        payments = db.query(
            Payment.month_for,
            func.sum(Payment.amount).label("total_paid"),
            func.max(Payment.expected_payment_amount).label("total_fee")
        ).filter(
            Payment.student_id == data["student_id"]
        ).group_by(
            Payment.month_for
        ).all()

        # Convert DB result into dictionary
        payment_map = {}

        for item in payments:
            payment_map[item.month_for] = {
                "total_paid": item.total_paid or 0,
                "total_fee": item.total_fee or 0
            }

        # Generate all months till current month
        for i in range(1, current_month + 1):

            month_for = f"{current_year}-{i:02d}"

            # Month exists in payment table
            if month_for in payment_map:

                total_paid = payment_map[month_for]["total_paid"]
                total_fee = payment_map[month_for]["total_fee"]

            else:
                # No payment at all
                total_paid = 0

                # fallback expected fee
                total_fee = db.query(
                    func.sum(Student_Subject.fee_at_join_time)
                ).filter(
                    Student_Subject.student_id == data["student_id"],
                    Student_Subject.end_date == None
                ).scalar() or 0

            due = total_fee - total_paid

            if due > 0:
                response.append({
                    "month_for": month_for,
                    "total_fee": total_fee,
                    "total_paid": total_paid,
                    "due": due,
                    "status": "Due"
                })

        return response

    except HTTPException as e:
        raise e

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

def fetch_payment_by_student(db: Session, data):
    try:
        payments = []
        payment_records = db.query(
            Payment.month_for,
            func.sum(Payment.amount).label("total_paid"),
            func.max(Payment.expected_payment_amount).label("total_fee")
        ).filter(
            Payment.student_id == data["student_id"]
        ).group_by(
            Payment.month_for
        ).group_by(
            Payment.month_for.desc()
        ).all()

        for payment in payment_records:
            due = payment.total_fee - (payment.total_paid or 0)
            status = "Paid" if due == 0 else "Due"
            payments.append({
                "month_for": payment.month_for,
                "total_fee": payment.total_fee,
                "total_paid": payment.total_paid or 0,
                "due": due,
                "status": status
            })

        return payments
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
import React, { useEffect } from 'react'
import usePaymentStore from '../../Store/PaymentStore';
import useStudentStore from '../../Store/StudentStore';

function Payment_Student() {
  const { payments, get_payments_by_Students } = usePaymentStore();
  const { student } = useStudentStore();

  const fetch_payments = () => {
    get_payments_by_Students(student.id);
  }
  useEffect(() => {
    fetch_payments()
  }, []);
  return (
    <div>
        
    </div>
  )
}

export default Payment_Student
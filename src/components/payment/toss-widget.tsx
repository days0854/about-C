'use client'

import { useEffect, useRef, useState } from 'react'
import { loadPaymentWidget, PaymentWidgetInstance } from '@tosspayments/payment-widget-sdk'
import { nanoid } from 'nanoid'
import { Button } from '@/components/ui/button'

const clientKey = "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq" // Test Client Key
const customerKey = nanoid()

interface TossPaymentWidgetProps {
    amount: number
    orderName: string
}

export function TossPaymentWidget({ amount, orderName }: TossPaymentWidgetProps) {
    const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null)
    const paymentMethodsWidgetRef = useRef<ReturnType<PaymentWidgetInstance['renderPaymentMethods']> | null>(null)
    const [price, setPrice] = useState(amount)

    useEffect(() => {
        (async () => {
            const paymentWidget = await loadPaymentWidget(clientKey, customerKey)

            const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
                '#payment-widget',
                { value: amount },
                { variantKey: 'DEFAULT' }
            )

            paymentWidget.renderAgreement(
                '#agreement',
                { variantKey: 'AGREEMENT' }
            )

            paymentWidgetRef.current = paymentWidget
            paymentMethodsWidgetRef.current = paymentMethodsWidget
        })()
    }, [])

    useEffect(() => {
        const paymentMethodsWidget = paymentMethodsWidgetRef.current

        if (paymentMethodsWidget == null) {
            return
        }

        paymentMethodsWidget.updateAmount(amount)
    }, [amount])

    const handlePayment = async () => {
        const paymentWidget = paymentWidgetRef.current

        try {
            await paymentWidget?.requestPayment({
                orderId: nanoid(),
                orderName: orderName,
                customerName: '김토스',
                customerEmail: 'customer123@gmail.com',
                customerMobilePhone: '01012345678',
                successUrl: `${window.location.origin}/payment/success`,
                failUrl: `${window.location.origin}/payment/fail`,
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="w-full">
            <div id="payment-widget" className="w-full" />
            <div id="agreement" className="w-full" />
            <Button onClick={handlePayment} className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 text-lg">
                결제하기
            </Button>
        </div>
    )
}

'use client';

import { Button } from '@/components/ui/button';
import * as PortOne from '@portone/browser-sdk/v2';

interface PaymentButtonProps {
    price: number;
    orderName: string;
    className?: string; // Allow custom styling
}

export function PaymentButton({ price, orderName, className }: PaymentButtonProps) {
    const handlePayment = async () => {
        if (!process.env.NEXT_PUBLIC_PORTONE_STORE_ID || !process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY) {
            alert('Payment configuration missing (Store ID or Channel Key).');
            return;
        }

        const paymentId = `ORD-${crypto.randomUUID()}`; // Unique order ID

        try {
            const response = await PortOne.requestPayment({
                storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_ID,
                channelKey: process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY,
                paymentId: paymentId,
                orderName: orderName,
                totalAmount: price,
                currency: 'CURRENCY_KRW',
                payMethod: 'CARD',
            });

            if (!response || response.code != null) {
                // Error occurred
                return alert(`결제 실패: ${response?.message || '알 수 없는 오류'}`);
            }

            // Success
            alert(`결제가 완료되었습니다!\n주문번호: ${paymentId}`);
            // TODO: Call backend verification API here
        } catch (error) {
            console.error('Payment Error:', error);
            alert('결제 중 오류가 발생했습니다.');
        }
    };

    return (
        <Button onClick={handlePayment} className={className} variant="default" size="default">
            구매하기 ({price.toLocaleString()}원)
        </Button>
    );
}

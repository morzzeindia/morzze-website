import SignaturePieces from '@/components/home/SignaturePieces';
import { getSignatureProducts } from '@/helper/product/action';
import React, { Suspense } from 'react'

const SignaturePiecesServer = async () => {
    const signatureProducts = await getSignatureProducts(8);

    return (
        <SignaturePieces products={signatureProducts} />
    )
}

export default SignaturePiecesServer
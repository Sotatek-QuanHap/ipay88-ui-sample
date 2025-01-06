import * as crypto from 'crypto-js';
import React, {useState} from 'react';

function App() {
  const merchantCode = ''
  const merchantKey = '';
  const [refNo, setRefNo] = useState('')
  const [signature, setSignature] = useState('')
  const [xFiled1, setPaymentId] = useState('')
  function generateHmacSha512Signature(merchantKey, merchantCode, refNo, amount, currency, Xfield1) {
    const data = `${merchantKey}${merchantCode}${refNo}${amount.replace('.', '')}${currency}${Xfield1}`;
    console.log("String to hash:", data)
    return crypto.HmacSHA512(data, merchantKey);
  }

  const updatePaymentId = (event) => {
    setPaymentId(event.target.value);
  };

  async function generateData() {
      const refNo = `ORDER_${Date.now()}`; // Unique reference number
      const amount = '1.00'; // Example: 100.00 (two decimal places)
      const currency = "MYR"; // Malaysian Ringgit
    const signature = generateHmacSha512Signature(
          merchantKey,
          merchantCode,
          refNo,
          amount,
          currency,
          xFiled1
        );
      const paymentData = {
          RefNo: refNo,
          Signature: signature.toString(),
      };
      setSignature(paymentData.Signature)
          setRefNo(paymentData.RefNo)
  }
  const handleGenerateData = async () => {
    await generateData()
  }

  return (
    <div>
      <button onClick={handleGenerateData}>Generate data</button>
      <form method="post" target='_blank' name="ePayment" action="https://payment.ipay88.com.my/ePayment/entry.asp">
        <input  name="MerchantCode" value="M35352" /> <br></br>
        <input  name="PaymentId" value="" /> <br></br>
        <input  name="RefNo" value={refNo} /> <br></br>
        <input  name="Amount" value="1.00" /> <br></br>
        <input  name="Currency" value="MYR" /> <br></br>
        <input  name="ProdDesc" value="Test Prods" /> <br></br>
        <input  name="UserName" value="Quan Hap" /> <br></br>
        <input  name="UserEmail" value="quan.hap@sotatek.com" /> <br></br>
        <input  name="UserContact" value="0126500100" /> <br></br>
        <input  name="Remark" value="" /> <br></br>
        <input  name="Lang" value="UTF-8" /> <br></br>
        <input  name="SignatureType" value="HMAC-SHA512" /> <br></br>
        <input  name="Signature" value={signature} /> <br></br>
        <input  name="ResponseURL" value="https://wf-ipay88-api.sotatek.works/response" /> <br></br>
        <input  name="BackendURL" value="https://wfstudiobe.morpheuslabs.io/api/v1/webhooks/0hwpxl0scjtkurg" /> <br></br>
        <input name='Xfield1' value={xFiled1} onChange={updatePaymentId}/><br/>
        <input type="submit" value="Proceed with Payment" name="Submit" />
      </form>
    </div>
  );
}

export default App;





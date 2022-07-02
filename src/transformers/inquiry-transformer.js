/* eslint-disable */
import moment from 'moment';
import { convertDateTime } from '../helpers/utilities';
import config from 'config';



class RequestPayloadTransformer {
    fields = ["InquiryReason", "InquiryStatus"]

    key = [
        'CompanyCode',
        'CustomerNumber',
        'RequestID',
        'AdditionalData',
        'CustomerName',
        'CurrencyCode',
        'TotalAmount',
        'SubCompany',
        'DetailBills',
        'FreeText',
        'TransactionDate'
    ]

    resultPayload = {}

    invalid = false

    constructor(payload) {
        this.payload = payload;
        this.setPayload();
    }
    setPayload() {
        this.key.forEach((key) => {
            if (Object.prototype.hasOwnProperty.call(this.payload, key)) {
                this.resultPayload[key] = this.payload[key];
            }
        });
    }
    getSuccessMessage() {
        this;
        return {
            Indonesia: 'Sukses',
            English: 'Success',
        };
    }
    __now() {
        return convertDateTime(new Date());
    }

    getExpiredMessage() {
        this;

        return {
            Indonesia: 'Va tidak berlaku',
            English: 'Va expired',
        };
    }

    getAlreadyPaidMessage() {
        this;
        return {
            Indonesia: 'Sudah dibayar',
            English: 'Already paid',
        }
    }

    getNotFoundMessage() {
        this;

        return {
            Indonesia: 'Va tidak ditemukan',
            English: 'Va not found',
        };
    }

    getNotEqualsMessage() {
        this;

        return {
            Indonesia: 'Total amount tidak sama',
            English: 'Total amount not equals',
        };
    }

    getInvalidCompanyCodeMessage() {
        this;
        return {
            Indonesia: 'Company Code tidak valid',
            English: 'Invalid Company Code'
        }
    }

    formSucessInquiryResponse() {
        this.resultPayload[this.fields[0]] = this.getSuccessMessage();
        this.resultPayload[this.fields[1]] = '00';
    }

    formExpiredInquiryResponse() {
        this.resultPayload[this.fields[0]] = this.getExpiredMessage();
        this.resultPayload[this.fields[1]] = '01';
        this.invalid = true;

    }

    formNotFoundInquiryResponse() {
        this.resultPayload[this.fields[0]] = this.getNotFoundMessage();
        this.resultPayload[this.fields[1]] = '01';
        this.invalid = true;

    }
    formAlreadyPaidResponse() {
        this.resultPayload[this.fields[0]] = this.getAlreadyPaidMessage();
        this.resultPayload[this.fields[1]] = '01';
        this.invalid = true;
    }

    formNotEqualsInquiryResponse() {
        this.resultPayload[this.fields[0]] = this.getNotEqualsMessage();
        this.resultPayload[this.fields[1]] = '01';
        this.invalid = true;

    }

    formSucessInquiryResponse() {
        this.resultPayload[this.fields[0]] = this.getSuccessMessage();
        this.resultPayload[this.fields[1]] = '00';
    }

    formExpiredInquiryResponse() {
        this.resultPayload[this.fields[0]] = this.getExpiredMessage();
        this.resultPayload[this.fields[1]] = '01';
        this.invalid = true;

    }


    formNotEqualsInquiryResponse() {
        this.resultPayload[this.fields[0]] = this.getNotEqualsMessage();
        this.resultPayload[this.fields[1]] = '01';
        this.invalid = true;

    }
    formWrongFlagAdviceResponse() {
        this.resultPayload[this.fields[0]] = this.getFlagAdviceMessage();
        this.resultPayload[this.fields[1]] = '01';
        this.invalid = true;

    }

    formInvalidCompanyCode() {
        this.resultPayload[this.fields[0]] = this.getInvalidCompanyCodeMessage();
        this.resultPayload[this.fields[1]] = '01';
        this.invalid = true;
    }


    formMissingkey(key) {
        this;
        this.resultPayload[this.fields[0]] = {
            Indonesia: `${key} tidak ada`,
            English: `${key} is missing`,
        }
        this.resultPayload[this.fields[1]] = '01';

    }

    getFlagAdviceMessage() {
        this;
        return {
            Indonesia: 'Flag advice tidak sesuai',
            English: 'Flag advice not equals',
        };
    }

    is_valid_company_code() {
        return this.payload.CompanyCode === config.accounts.bca;
    }

    isEqual(inquiry) {
        return inquiry.amount_to_pay.toFixed(2) === parseInt(this.resultPayload.PaidAmount).toFixed(2);
    }

    isExpired(inquiry) {
        this;
        const expirydate = moment(inquiry.expire_at);
        const now = moment(this.resultPayload.TransactionDate, 'DD/MM/YYYY HH:mm:ss');
        return now > expirydate;
    }

    isValidFlagadvice() {
        return this.resultPayload.FlagAdvice === 'Y' || this.resultPayload.FlagAdvice === 'N';
    }


}

class InquiryTransformer extends RequestPayloadTransformer {


    generatePayload(inquiry) {
        this.formSucessInquiryResponse();
        this.resultPayload.TotalAmount = inquiry.amount_to_pay.toFixed(2);
        this.resultPayload.CustomerName = inquiry.customer_name;
        this.resultPayload.CurrencyCode = inquiry.currency_code;
    }

    validateInquiry(inquiry) {
        if (this.isExpired(inquiry)) {
            this.formExpiredInquiryResponse();
            this.invalid = true;
            return;
        }
        if (!this.is_valid_company_code()) {
            this.formInvalidCompanyCode();
            this.invalid = true;
            return;
        }
        this.generatePayload(inquiry);

    }
}


class PaymentTransformer extends InquiryTransformer {
    fields = ["PaymentFlagReason", "PaymentFlagStatus"]
    constructor(payload) {
        let paymentKey = [
            "PaidAmount",
            "Reference",
            "FlagAdvice",
        ]
        super(payload);
        this.key = [...new Set([...this.key, ...paymentKey])];
        this.setPayload()
    }

    generatePayload() {
        this.formSucessInquiryResponse();
    }

    validatePayment(inquiry) {
        if (this.isExpired(inquiry)) {
            this.formExpiredInquiryResponse();
            this.invalid = true;
            return;
        }
        if (!this.isEqual(inquiry)) {
            this.formNotEqualsInquiryResponse();
            this.invalid = true;
            return;
        }
        if (!this.isValidFlagadvice()) {
            this.formWrongFlagAdviceResponse();
            this.invalid = true;
            return;
        }
        if (!this.is_valid_company_code()) {
            this.formInvalidCompanyCode();
            this.invalid = true;
            return;
        }

        this.generatePayload();
    }
}

export {
    RequestPayloadTransformer,
    InquiryTransformer,
    PaymentTransformer
};

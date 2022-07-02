from datetime import datetime, timedelta
import random
import requests
import uuid


NERO_ID, NERO_KEY = (
    "ENFKDCEXZTLQJUXTRXCMTHLUCRHYBFHD",
    "Ubj1vHlKHaAh7vJ5dHVsRehPcaq6JClR",
)
BCA_ID, BCA_KEY = (
    "ENFKDCEXZTLQJUXTRXMTCHLUCRHYBDFHH",
    "Ubj1vHlKHaAh7vJ5dHVsRehPcaq6JZck",
)
ADMIN_ID, ADMIN_KEY = (
    "ZTLQJUXTRXCHLUCRHYBDCEXZTLQYT",
    "VsRehPcaq6JZckaVsRevJ5caq6JZckca",
)


class TestRequest:
    _base_url = "http://localhost:24522/h2h-payment-gateway/v1/"

    def __init__(self, ID, KEY):
        self._auth = (ID, KEY)
        self._session = requests.Session()
        self._session.auth = self._auth

    def print_response(self, response):
        print(response.status_code)
        print(response.json())

    def get_token(self):
        response = self._session.post(self._base_url + "auth/token", json={})
        self.token = response.json()["access_token"]
        self.refresh_token = response.json()["refresh_token"]
        self.print_response(response)

    def update_header(self):
        self._session.auth = None
        self._session.headers.update({"Authorization": "Bearer " + self.token})

    def get_refresh_token(self):
        self.update_header()
        response = self._session.post(
            self._base_url + "auth/refresh-token",
            data={"refresh_token": self.refresh_token},
        )
        self.token = response.json()["data"]["access_token"]
        self.print_response(response)

    def create_channel(self, channel_name, channel_type=None):
        self.update_header()
        response = self._session.post(
            self._base_url + "channel",
            data={
                "name": channel_name,
                "role": channel_type,
                "url_callback": "http://localhost:8000/callback",
            },
        )
        self.print_response(response)

    def get_channel(self):
        response = self._session.get(self._base_url + "channel")
        self.print_response(response)

    def create_va(self):
        self.update_header()
        response = self._session.post(
            self._base_url + "order/request-va",
            data={
                "amount_to_pay": 10000.00,
            },
        )
        if response.status_code == 200:
            self.va_number = response.json()["data"]["va_number"]
        self.print_response(response)

    def inquiryva(self, customer_number: str = "381901654632478"):
        self.update_header()
        response = self._session.post(
            self._base_url + "order/inquiry",
            data={
                "CompanyCode": 38190,
                "CustomerNumber": customer_number,
                "RequestID": str(uuid.uuid4()),
                "ChannelType": 6014,
                "TransactionDate": datetime.now().strftime("%d/%m/%Y %H:%M:%S"),
            },
        )
        self.print_response(response)

    def paymentva(
        self,
        customer_number,
        paid_amount,
        flag,
        company_code=38190,
        additional_time=timedelta(minutes=1),
    ):
        self.update_header()
        response = self._session.post(
            self._base_url + "order/payment",
            data={
                "CompanyCode": company_code,
                "CustomerNumber": customer_number,
                "RequestID": str(uuid.uuid4()),
                "ChannelType": 6014,
                "CustomerName": "joko susanto",
                "CurrencyCode": "IDR",
                "PaidAmount": paid_amount,
                "TotalAmount": 10000.00,
                "TransactionDate": (datetime.now() + additional_time).strftime(
                    "%d/%m/%Y %H:%M:%S"
                ),
                "FlagAdvice": flag,
            },
        )
        self.print_response(response)

    def create_whitelist(self):
        self.update_header()
        response = self._session.post(
            self._base_url + "whitelist",
            data={
                "ip_cidr": [
                    "192.168.0.199/32",
                    "192.168.1.0/32",
                ]
            },
        )
        self.print_response(response)


nero = TestRequest(NERO_ID, NERO_KEY)
bca = TestRequest(BCA_ID, BCA_KEY)
admin = TestRequest(ADMIN_ID, ADMIN_KEY)


def success_scenario():
    admin.get_token()
    # accept
    admin.create_whitelist()
    # accept merchant
    admin.create_channel(f"AC_{random.randint(1, 100)}", "MERCHANT")
    nero.get_token()
    # deny
    nero.create_whitelist()
    nero.create_channel(f"AC_{random.randint(1, 100)}", "MERCHANT")
    nero.get_channel()
    nero.get_refresh_token()
    bca.get_token()
    nero.create_va()
    bca.inquiryva(nero.va_number)
    # invalid
    bca.paymentva(nero.va_number, 100000.00, "N")
    # wrong flag
    bca.paymentva(nero.va_number, 10000.00, "F")
    # wrong company code
    bca.paymentva(nero.va_number, 10000.00, "N", 38191)
    # expired
    bca.paymentva(nero.va_number, 10000.00, "N", additional_time=timedelta(hours=1))
    # # succeess
    bca.paymentva(nero.va_number, 10000.00, "N")
    # # error sudah di bayar
    bca.paymentva(nero.va_number, 10000.00, "N")


if __name__ == "__main__":
    success_scenario()

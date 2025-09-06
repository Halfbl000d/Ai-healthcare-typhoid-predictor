import requests

url = "http://localhost:5000/auth/login"
data = {"email": "karun2@example.com", "password": "test123"}

response = requests.post(url, json=data)
print(response.status_code)
print(response.json())

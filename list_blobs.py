import requests
import json

token = "vercel_blob_rw_YvUAka9dIyhj4FlQ_wEVEqELym204Duoh3IaJJW8PMMR9lU"
url = "https://blob.vercel-storage.com"

headers = {
    "Authorization": f"Bearer {token}"
}

# The Vercel Blob API list endpoint is GET /?limit=100
response = requests.get(url, headers=headers)

if response.status_code == 200:
    data = response.json()
    print(json.dumps(data, indent=2))
else:
    print(f"Error: {response.status_code}")
    print(response.text)

# Copyright (c) 2023, patoo and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
import requests

class RemoteSiteLogin(Document):
    pass

@frappe.whitelist()
def authenticate_with_remote_site(api_key, secret_key, site_url):
    headers = {
        "Authorization": f"token {api_key}:{secret_key}",
        "Content-Type": "application/json"
    }
    
    try:
        # Data for updating the expiry_date
        data = {
            "value": "01-12-2023"
        }
        
        # Update the expiry_date field in Gh Company Setup doctype using the custom API endpoint
        update_response = requests.post(f"{site_url}/api/method/gh_customize.api.set_expiry_date", headers=headers, json=data)
        
        if update_response.status_code == 200 and update_response.json().get('message') == "Updated successfully":
            return "Successful and expiry_date updated!"
        else:
            return f"Successful, but failed to update expiry_date. Reason: {update_response.text or 'Unknown error'}"
    except Exception as e:
        return f"An error occurred: {str(e)}"









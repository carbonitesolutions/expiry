// Copyright (c) 2023, patoo and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Remote Site Login", {
// 	refresh(frm) {

// 	},
// });

frappe.ui.form.on('Remote Site Login', {
    refresh: function(frm) {
        frm.add_custom_button('Authenticate', function() {
            frappe.call({
                method: 'expiry.expiry.doctype.remote_site_login.remote_site_login.authenticate_with_remote_site',
                args: {
                    'docname': frm.doc.name,
                    'api_key': frm.doc.api_key,
                    'secret_key': frm.doc.secret_key,
                    'site_url': frm.doc.site_url
                },
                callback: function(r) {
                    if (r.exc) {
                        frappe.msgprint(__("There was an error during authentication."));
                    } else if (r.message && r.message == "Successful") {
                        frappe.msgprint(__("Authentication successful!"));
                    } else if (r.message) {
                        frappe.msgprint(r.message);
                    } else {
                        frappe.msgprint(__("Unknown response from the server."));
                    }
                    frm.reload_doc();
                }
            });
        });
    }
});



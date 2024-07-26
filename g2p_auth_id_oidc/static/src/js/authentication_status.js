/** @odoo-module **/

import AbstractField from "web.AbstractField";
import {_t} from "@web/core/l10n/translation";
import fieldsRegistry from "web.field_registry";

var RegIdAuthStatus = AbstractField.extend({
    template: "g2p_auth_id_oidc.reg_id_auth_status",
    events: {
        "click button": "authenticateButtonClick",
    },

    init: function () {
        this._super.apply(this, arguments);

        this.statusClass = this.nodeOptions.statusClass;
        this.buttonClass = this.nodeOptions.buttonClass;

        this.showWidget = Boolean(this.recordData.auth_oauth_provider_id);

        this.statusSelectionObject = Object.fromEntries(this.field.selection);

        var self = this;
        this._rpc({
            model: this.model,
            method: "get_auth_oauth_provider",
            args: [this.res_id],
        }).then((result) => {
            self.authProvider = result;
        });
    },

    renderStatus: function () {
        const status = this.recordData.authentication_status;
        return _t(this.statusSelectionObject[status]);
    },

    authenticateButtonClick: function () {
        const windowFeatures = `popup,height=${(screen.height * 2) / 3},width=${screen.width / 2}`;
        window.open(this.authProvider.auth_link, "", windowFeatures);
    },
});

fieldsRegistry.add("g2p_auth_id_oidc.reg_id_auth_status", RegIdAuthStatus);

export {RegIdAuthStatus};

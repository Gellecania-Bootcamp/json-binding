sap.ui.define([
  "sap/m/library",
  "sap/ui/model/type/Currency",
  "sap/base/Log"
], function(mobileLibrary, Log) {
  "use strict";

  return {
    formatMail: function(sEid, sDomain, sSubject, sBody) {
      var oBundle = this.getView().getModel("i18n").getResourceBundle();
      var oModel = this.getView().getModel();
      var sEid = oModel.getProperty("/Eid");
      var sDomain = oBundle.getText("domain");
      var sSubject = oBundle.getText("mailSubject") + sEid; 
      var sBody = oBundle.getText("mailBody"); 

      try {
        if (!sEid) return "";
        return mobileLibrary.URLHelper.normalizeEmail(
          sEid + sDomain,
          sSubject,
          sBody
        );
      } catch (oError) {
        Log.error("Error in formatMail: " + oError.message);
        return "";
      }
    },

    formatStockValue(fUnitPrice, iStockLevel, sCurrCode) {
			return new Currency().formatValue([fUnitPrice * iStockLevel, sCurrCode], "string");
		},

    formatStockState: function(iStock) {
      if (iStock === undefined) return "None";
      if (iStock <= 5) return "Error";
      if (iStock <= 15) return "Warning";
      return "Success";
  }
  };
});
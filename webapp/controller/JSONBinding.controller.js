sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sapips/training/jsonbinding/model/formatter"
], function(Controller, JSONModel, formatter) {
  "use strict";

    return Controller.extend("sapips.training.jsonbinding.controller.JSONBinding", {
    formatter: formatter,

    onInit: function () {
      var that = this;
    
      var oMainModel = new JSONModel({
        Eid: "e.gellecania",
        Enabled: true,
        SalesAmount: 10345.67,
        CurrencyCode: "PHP",
        Address: {
          Street: "Violet St.",
          Zip: "6000",
          City: "Cebu",
          Country: "PH",
          SelectedProduct: {}
        },
      });
      this.getView().setModel(oMainModel);
    
      var oProductsModel = new JSONModel();
      oProductsModel.loadData("model/products.json").then(function() {
        that.getView().setModel(oProductsModel, "ProductsModel");
      }).catch(function(oError) {
        sap.m.MessageBox.error("Failed to load products: " + oError.message);
      });
    },

    onSendEmail: function () {
      var oBundle = this.getView().getModel("i18n").getResourceBundle();
      var oModel = this.getView().getModel();
      var sEid = oModel.getProperty("/Eid");
      var sDomain = oBundle.getText("domain");
    
      if (!sEid) {
        sap.m.MessageToast.show("EID is empty.");
        return;
      }
    var sSubject = oBundle.getText("mailSubject") + sEid; 
    var sBody = oBundle.getText("mailBody"); 
    
      var sMailTo = "mailto:" + encodeURIComponent(sEid + sDomain)
        + "?subject=" + encodeURIComponent(sSubject)
        + "&body=" + encodeURIComponent(sBody);
    
      sap.m.URLHelper.redirect(sMailTo, true);
    },

    onItemSelected(oEvent) {
			const oSelectedItem = oEvent.getSource();
			const oContext = oSelectedItem.getBindingContext("ProductsModel");
			const sPath = oContext.getPath();
			const oProductDetailPanel = this.byId("productDetailsPanel");
			oProductDetailPanel.bindElement({ path: sPath, model: "ProductsModel" });
		}
  });
});